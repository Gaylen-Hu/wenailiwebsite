/**
 * 附件上传体积上限（服务端强制）
 *
 * 为什么需要这个模块：
 * 核心 @apostrophecms/attachment 的 maxSize 只是一个「前端提示文案」——
 * 它仅在 getBrowserData() 里被透传给浏览器，用于显示「最大 XX MB」，
 * 服务端和前端都不做任何校验（见该模块 index.js:1192）。
 * 因此当前唯一生效的上限是 nginx 的 client_max_body_size 100M，一个超大文件
 * 会被完整接收、完整跑完 sharp 切图、再完整写回 OSS，很久之后才失败；
 * 编辑侧的体感就是「卡很久，然后报错」。
 *
 * 这里在请求体进入 multer / sharp 之前拦截，让编辑立刻拿到一条可读的提示。
 *
 * 时序说明：核心 @apostrophecms/express 会把「所有模块的 middleware」整体排在
 * 「所有模块的 routes」之前注册（见其 index.js:766-825 中 labeledList 的构造
 * 顺序：先遍历 middleware，再遍历 routes），所以本中间件必然先于附件上传路由
 * 执行，无需额外声明顺序。
 *
 * 两道检查：
 *   1. Content-Length 快路径 —— 声明了就立刻拒绝，编辑不必等请求体传完。
 *   2. 字节计数兜底    —— Content-Length 可能缺失（Transfer-Encoding: chunked）
 *                        或与实际不符，因此按真实收到的字节数再兜一次。
 *                        这是修复 chunked 绕过的关键：只检查第 1 道时，
 *                        `Number(undefined)` 为 NaN，会直接放行。
 *
 * ⚠️ 已知边界：本中间件拒绝请求后，Express 不会继续执行上传路由，因此 sharp 切图
 * 与写 OSS 都不会发生；但 multer 写临时文件这一步仍可能已经开始。要彻底掐断，
 * 需要给核心内联创建的 multer 传 limits.fileSize（核心在 apiRoutes() 里内联
 * `require('multer')({ dest: tmpdir() })`，未开放配置入口），或调低 nginx 的
 * client_max_body_size。当前实际影响被 nginx 的 100M 上限兜住。
 */

// 未配置 maxSize 时的兜底上限
const FALLBACK_BYTES = 10 * 1024 * 1024;

export default {
  init(self) {
    const configured = self.apos.attachment && self.apos.attachment.options.maxSize;
    self.limitBytes = (typeof configured === 'number' && configured > 0)
      ? configured
      : FALLBACK_BYTES;
    self.limitMb = Math.round(self.limitBytes / (1024 * 1024));
  },

  middleware(self) {
    return {
      attachmentUploadSize: {
        url: '/api/v1/@apostrophecms/attachment/upload',
        middleware(req, res, next) {
          if (req.method !== 'POST') {
            return next();
          }

          const declared = Number(req.headers['content-length']);

          // 快路径：声明了 Content-Length 且超限，立刻拒绝
          if (Number.isFinite(declared) && declared > self.limitBytes) {
            return rejectTooLarge(req, res, self);
          }

          // 兜底：按真实字节数计数。
          // 这里只增加一个 'data' 监听器、不消费流 —— multer/busboy 会同时收到
          // 同样的数据，上传流程不受影响。之所以安全，是因为整条链
          // （本中间件 → self.canUpload → multer）都是同步的，流不可能在
          // 下游挂好监听器之前就发出 'data'。
          let received = 0;
          const onData = (chunk) => {
            received += chunk.length;
            if (received <= self.limitBytes) {
              return;
            }
            req.removeListener('data', onData);
            rejectTooLarge(req, res, self);
          };
          const cleanup = () => req.removeListener('data', onData);
          req.on('data', onData);
          req.once('end', cleanup);
          req.once('aborted', cleanup);

          return next();
        }
      }
    };
  }
};

function rejectTooLarge(req, res, self) {
  // 已经响应过就不要再写（例如两条路径同时命中）
  if (res.headersSent || res.writableEnded) {
    return;
  }

  const message = req.t('apostrophe:uploadTooLarge', {
    maxSize: self.limitMb
  });

  // 必须按核心 API 的错误体形状返回，且 message 与
  // data.errors[].message 都要给：
  //   - AposMediaUploader.vue 的 notifyErrors 只读 error.body.data.errors
  //   - AposInputAttachment.js 只读 error.body.message
  // 少给任何一个，对应入口都会静默失败、编辑看不到任何提示。
  res.statusCode = 413;
  res.send({
    name: 'invalid',
    message,
    data: {
      errors: [
        {
          name: 'invalid',
          code: 413,
          message,
          data: {}
        }
      ]
    }
  });

  // 响应刷出后再断开，避免客户端继续把超大请求体推完；
  // 放在 'finish' 之后是为了让上面的 413 能真正送达浏览器。
  res.once('finish', () => {
    if (!req.destroyed) {
      req.destroy();
    }
  });
}
