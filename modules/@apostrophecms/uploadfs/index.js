/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-27 14:34:26
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-27 14:34:26
 * @FilePath: \wenaili\modules\@apostrophecms\uploadfs\index.js
 */
/*
 * ApostropheCMS Uploadfs 模块配置
 * 用于配置阿里云OSS存储
 *
 * ⚠️ 本文件原先包含一组「OSS 直传」配置（direct / uploads / handlers），
 * 它们从未生效过，且会误导后来者以为直传已经实现，已于本次清理中移除。
 * 具体情况：
 *   - `direct: true`        uploadfs 1.26.0 中不存在该选项（全文无 direct 字段），
 *                           该版本没有任何浏览器直传能力
 *   - `uploads: {...}`      uploadfs 不读取 uploads 键；其中的 extensions 也从未
 *                           生效（文件类型由 @apostrophecms/attachment 的
 *                           fileGroups 决定，未覆盖则为默认的 images/office 两组，
 *                           所以 mp4/mov/avi 实际会被拒收）
 *   - `s3ForcePathStyle`    真实选项名是 `style: 'path'`；且 false 本就是默认值，
 *                           删除后行为不变（阿里云 OSS 使用虚拟主机样式）
 *   - `handlers: { s3: ... }`  handlers 以「事件名」为键，而 s3 不是任何模块会
 *                           emit 的事件；其中的 self.getClient() /
 *                           self.getUploadfsPath() 在本模块上也不存在，
 *                           一旦触发即抛错
 *
 * 当前真正生效的上传链路是：浏览器 → Node(multer) → sharp 生成各档尺寸 →
 * uploadfs 的 S3 驱动 → 阿里云 OSS。即附件仍会经过应用服务器。
 */

// 这些值一律不做兜底。uploadfs 仅在 `secret` 为真时才设置显式凭据
// （见 node_modules/uploadfs/lib/storage/s3.js:42），空串会让 S3 客户端回退到
// AWS SDK 的默认凭据链（AWS_ACCESS_KEY_ID/SECRET、~/.aws/credentials、
// ECS/EC2 实例角色等）；endpoint 为空则会落到默认的 s3.amazonaws.com。
// 也就是说配置丢失时应用照常启动、不报任何错，却把附件写到非预期的位置，
// 直到很晚才以签名/网络错误的形式暴露。这与本仓库正在清理的
// `|| 'changeme'` 属于同一类静默兜底，因此改为启动即校验。
const REQUIRED = [ 'APOS_S3_KEY', 'APOS_S3_SECRET', 'APOS_S3_BUCKET', 'APOS_S3_ENDPOINT' ];
const missing = REQUIRED.filter((name) => !process.env[name]);

export default {
  init(self) {
    if (missing.length) {
      throw new Error(
        `[uploadfs] 缺少 OSS 配置：${missing.join(', ')}。` +
        '这些值不做兜底 —— 缺失时宁可启动失败，也不要静默回退到 AWS 默认凭据链。'
      );
    }
  },

  options: {
    uploadfs: {
      // 使用S3兼容模式（阿里云OSS兼容S3协议）
      storage: 's3',

      // 阿里云OSS配置
      key: process.env.APOS_S3_KEY,
      secret: process.env.APOS_S3_SECRET,
      bucket: process.env.APOS_S3_BUCKET,
      endpoint: process.env.APOS_S3_ENDPOINT,

      // 使用HTTPS
      https: true,

      // region设置
      region: process.env.APOS_S3_REGION || 'oss-cn-hangzhou',

      // 设置bucket中对象的访问控制
      bucketObjectsACL: 'public-read',

      // 如果使用CDN，可以配置CDN URL（cdn 是 uploadfs 支持的合法选项）
      ...(process.env.APOS_CDN_URL && {
        cdn: {
          url: process.env.APOS_CDN_URL,
          enabled: true
        }
      })
    }
  }
};
