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

export default {
  options: {
    uploadfs: {
      // 使用S3兼容模式（阿里云OSS兼容S3协议）
      storage: 's3',

      // 阿里云OSS配置
      key: process.env.APOS_S3_KEY || '',
      secret: process.env.APOS_S3_SECRET || '',
      bucket: process.env.APOS_S3_BUCKET || 'wenaili',
      endpoint: process.env.APOS_S3_ENDPOINT || '',

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
