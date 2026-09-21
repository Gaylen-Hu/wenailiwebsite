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
 * 这里在请求体进入 multer / sharp 之前，按 Content-Length 快速拒绝，
 * 让编辑立刻拿到一条可读的提示。
 *
 * 时序说明：核心 @apostrophecms/express 会把「所有模块的 middleware」整体排在
 * 「所有模块的 routes」之前注册（见其 index.js:766-825 中 labeledList 的构造
 * 顺序：先遍历 middleware，再遍历 routes），所以本中间件必然先于附件上传路由
 * 执行，无需额外声明顺序。
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

          // 没有 Content-Length（例如 chunked 编码）时无法预判，交给后续流程处理
          if (!Number.isFinite(declared) || declared <= self.limitBytes) {
            return next();
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
          return res.send({
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
        }
      }
    };
  }
};
