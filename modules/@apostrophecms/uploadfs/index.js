/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-17 09:32:42
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-01 23:41:16
 * @FilePath: \wenaili\modules\@apostrophecms\uploadfs\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * ApostropheCMS Uploadfs 模块配置
 * 用于配置阿里云OSS存储
 */

export default {
  options: {
    uploadfs: {
      // 使用S3兼容模式（阿里云OSS兼容S3协议）
      storage: 's3',
      
      // 阿里云OSS配置
      // 注意：优先使用环境变量，这里的配置作为开发环境的默认值
      key: process.env.APOS_S3_KEY || '',
      secret: process.env.APOS_S3_SECRET || '',
      bucket: process.env.APOS_S3_BUCKET || 'wenaili',
      
      // 阿里云OSS的endpoint（替换为您的实际endpoint）
      // 格式：https://oss-{region}.aliyuncs.com
      // 例如：https://oss-cn-hangzhou.aliyuncs.com
      endpoint: process.env.APOS_S3_ENDPOINT || '',
      
      // 阿里云OSS使用虚拟主机样式（不要使用path style）
      s3ForcePathStyle: false,
      
      // 使用HTTPS
      https: true,
      
      // region设置（虽然使用了自定义endpoint，但某些场景仍需要）
      region: process.env.APOS_S3_REGION || 'oss-cn-hangzhou',
      
      // 设置bucket中对象的访问控制（可选）
      // 'public-read' - 公开读取
      // 'private' - 私有（需要配合CDN使用）
      bucketObjectsACL: 'public-read',
      
      // 如果使用CDN，可以配置CDN URL
      ...(process.env.APOS_CDN_URL && {
        cdn: {
          url: process.env.APOS_CDN_URL,
          enabled: true
        }
      })
    }
  }
};

