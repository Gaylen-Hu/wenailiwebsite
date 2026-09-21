/**
 * 后台上传前的图片压缩
 *
 * 背景：编辑在媒体库 / 图片字段上传 2–10MB 原图时，服务端需要生成 6 档尺寸
 * 并把它们写回跨地域 OSS，整个请求经常超过 nginx 的 proxy_read_timeout，
 * 表现为 504「上传失败」。
 *
 * 在浏览器侧先把图片压到合理尺寸，可以同时缩短三段耗时：
 *   浏览器 → 服务器   （上传体积变小）
 *   服务器 sharp 处理 （源图变小，生成 6 档尺寸更快）
 *   服务器 → OSS      （传输量变小）
 *
 * 实现方式：包装 apos.http.post，拦截发往附件上传端点的 FormData 请求。
 * 这样一处改动即可同时覆盖媒体库（AposMediaUploader.vue）与图片字段
 * （AposInputAttachment.js）两个入口，无需 fork 核心 Vue 组件，Apostrophe
 * 升级时也不会被覆盖。
 *
 * 任何环节出错都会静默回退到原文件——压缩本身绝不能阻断上传。
 */

const UPLOAD_URL = '/api/v1/@apostrophecms/attachment/upload';

// 长边上限。Apostrophe 最大的 imageSize 是 max: 1600，这里留出余量，
// 便于日后调整尺寸档位或用于社交分享大图。
const MAX_EDGE = 2560;

const JPEG_QUALITY = 0.85;

// 小于此体积不做处理，避免无意义的重编码
const MIN_BYTES = 500 * 1024;

// SVG 是矢量、GIF 用 canvas 重编码会丢掉动画，两者都必须原样放过
const SKIP_TYPES = [ 'image/svg+xml', 'image/gif' ];

// 判定「近乎不透明」的 alpha 阈值
const ALPHA_THRESHOLD = 250;

// 检测透明通道时的采样边长
const ALPHA_SAMPLE_EDGE = 128;

// apos.http 由其它模块初始化，时机不确定，因此做有界重试
const INSTALL_RETRY_MS = 100;
const MAX_INSTALL_ATTEMPTS = 50;

export default function () {
  installWhenReady(0);
}

function installWhenReady(attempt) {
  if (install()) {
    return;
  }
  if (attempt >= MAX_INSTALL_ATTEMPTS) {
    // 本模块所有失败路径都是静默的，这里留一条日志，
    // 便于日后排查「压缩为什么没生效」
    console.warn('[AposImageUploadCompression] 安装超时，本次上传不会压缩');
    return;
  }
  window.setTimeout(() => installWhenReady(attempt + 1), INSTALL_RETRY_MS);
}

// 幂等安装。返回 true 表示已经装好
function install() {
  const apos = window.apos;
  const http = apos && apos.http;
  if (!http || typeof http.post !== 'function') {
    return false;
  }
  if (http.post.__aposImageCompression) {
    return true;
  }

  const original = http.post;

  const wrapped = async function (url, options, callback) {
    // 保留 apos.http 原有的回调写法：带 callback 时直接放行
    if (callback || !shouldHandle(url, options)) {
      return original.call(this, url, options, callback);
    }

    // 只把「压缩」放进 try。上传请求本身绝不能落在 catch 的射程内：
    // 一旦上传失败（504 / 413 / 断网），会被 catch 吞掉并落到下面的
    // 「按原样上传」，用未压缩的原始文件再发一次同样的请求 —— 既让耗时翻倍、
    // 更容易再次失败，又可能在首次请求其实已在服务端成功（只是响应丢失）时
    // 留下一个孤儿附件。压缩成功就一律用压缩结果，只有压缩失败才回退原文件。
    let body = options.body;
    try {
      body = await compressFormData(options.body);
    } catch (e) {
      // 压缩失败 → 按原样上传，不影响功能
    }

    if (body === options.body) {
      return original.call(this, url, options, callback);
    }
    return original.call(this, url, Object.assign({}, options, { body }), callback);
  };

  wrapped.__aposImageCompression = true;
  http.post = wrapped;
  return true;
}

function shouldHandle(url, options) {
  return typeof url === 'string' &&
    url.indexOf(UPLOAD_URL) !== -1 &&
    !!options &&
    options.body instanceof window.FormData;
}

async function compressFormData(formData) {
  const file = formData.get('file');
  if (!shouldCompress(file)) {
    return formData;
  }

  const blob = await compressImage(file);

  // 压不小就保留原文件
  if (!blob || blob.size >= file.size) {
    return formData;
  }

  const next = new window.FormData();
  for (const [ key, value ] of formData.entries()) {
    if (key !== 'file') {
      next.append(key, value);
    }
  }
  next.append('file', new window.File(
    [ blob ],
    renameForType(file.name, blob.type),
    { type: blob.type }
  ));
  return next;
}

function shouldCompress(file) {
  if (!file || typeof file !== 'object') {
    return false;
  }
  if (typeof file.size !== 'number' || file.size < MIN_BYTES) {
    return false;
  }
  if (typeof file.type !== 'string' || file.type.indexOf('image/') !== 0) {
    return false;
  }
  return SKIP_TYPES.indexOf(file.type.toLowerCase()) === -1;
}

async function compressImage(file) {
  const decoded = await decode(file);
  if (!decoded) {
    return null;
  }
  try {
    const bounds = fitInside(decoded.width, decoded.height, MAX_EDGE);
    const canvas = document.createElement('canvas');
    canvas.width = bounds.width;
    canvas.height = bounds.height;

    const context = canvas.getContext('2d');
    if (!context) {
      return null;
    }
    context.drawImage(decoded.image, 0, 0, bounds.width, bounds.height);

    // PNG / WebP 可能带透明通道，转 JPEG 会变黑底，此时保留 PNG
    const sourceType = (file.type || '').toLowerCase();
    const mayHaveAlpha = sourceType === 'image/png' || sourceType === 'image/webp';
    const keepAlpha = mayHaveAlpha && canvasHasAlpha(canvas);
    const targetType = keepAlpha ? 'image/png' : 'image/jpeg';

    return await canvasToBlob(canvas, targetType, JPEG_QUALITY);
  } finally {
    decoded.release();
  }
}

// 解码必须应用 EXIF 方向，否则手机直出的照片会躺倒。
// 首选 <img> 路径：HTML 规范规定 <img> 默认按 EXIF 方向渲染
// （image-orientation: from-image），再经 drawImage 编码即可把方向「烧进」像素。
// createImageBitmap 的 { imageOrientation: 'from-image' } 在部分浏览器会被
// 静默忽略；一旦被忽略，重编码又会连 EXIF 方向标记一起丢掉，照片就永久躺倒，
// 服务端 sharp 也无从纠正，因此只把它作为兜底。
async function decode(file) {
  const viaImg = await decodeViaImg(file);
  if (viaImg) {
    return viaImg;
  }
  return decodeViaBitmap(file);
}

async function decodeViaBitmap(file) {
  if (typeof window.createImageBitmap !== 'function') {
    return null;
  }
  try {
    const bitmap = await window.createImageBitmap(file, { imageOrientation: 'from-image' });
    return {
      image: bitmap,
      width: bitmap.width,
      height: bitmap.height,
      release: () => bitmap.close && bitmap.close()
    };
  } catch (e) {
    return null;
  }
}

async function decodeViaImg(file) {
  const url = window.URL.createObjectURL(file);
  try {
    const image = await loadImage(url);
    return {
      image,
      width: image.naturalWidth,
      height: image.naturalHeight,
      release: () => window.URL.revokeObjectURL(url)
    };
  } catch (e) {
    window.URL.revokeObjectURL(url);
    return null;
  }
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('image decode failed'));
    image.src = url;
  });
}

function fitInside(width, height, maxEdge) {
  const longest = Math.max(width, height);
  if (!longest || longest <= maxEdge) {
    return {
      width,
      height
    };
  }
  const scale = maxEdge / longest;
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale))
  };
}

// 缩小后采样检测透明像素。判断不出时保守返回 true（保留 PNG），
// 宁可文件大一点，也不要出现黑底。
function canvasHasAlpha(canvas) {
  const edge = Math.min(ALPHA_SAMPLE_EDGE, canvas.width, canvas.height);
  if (!edge) {
    return true;
  }
  const scratch = document.createElement('canvas');
  scratch.width = edge;
  scratch.height = edge;

  const context = scratch.getContext('2d');
  if (!context) {
    return true;
  }
  context.drawImage(canvas, 0, 0, edge, edge);

  let data;
  try {
    data = context.getImageData(0, 0, edge, edge).data;
  } catch (e) {
    return true;
  }
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < ALPHA_THRESHOLD) {
      return true;
    }
  }
  return false;
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob || null), type, quality);
  });
}

function renameForType(name, type) {
  const extension = type === 'image/png' ? 'png' : 'jpg';
  const base = String(name || '').replace(/\.[^.]+$/, '') || 'upload';
  return `${base}.${extension}`;
}
