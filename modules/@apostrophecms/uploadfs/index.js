/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-27 14:34:26
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-27 14:34:26
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
      key: process.env.APOS_S3_KEY || '',
      secret: process.env.APOS_S3_SECRET || '',
      bucket: process.env.APOS_S3_BUCKET || 'wenaili',
      endpoint: process.env.APOS_S3_ENDPOINT || '',
      
      // 阿里云OSS使用虚拟主机样式（不要使用path style）
      s3ForcePathStyle: false,
      
      // 使用HTTPS
      https: true,
      
      // region设置
      region: process.env.APOS_S3_REGION || 'oss-cn-hangzhou',
      
      // 设置bucket中对象的访问控制
      bucketObjectsACL: 'public-read',
      
      // 🟢 关键：启用S3直接上传
      direct: true,
      
      // 🟢 配置直传选项
      uploads: {
        // 允许的文件类型
        extensions: [ 'jpg', 'gif', 'png', 'pdf', 'svg', 'webp', 'mp4', 'mov', 'avi' ],
        // 文件大小限制（100MB）
        maxSize: 100 * 1024 * 1024
      },
      
      // 如果使用CDN，可以配置CDN URL
      ...(process.env.APOS_CDN_URL && {
        cdn: {
          url: process.env.APOS_CDN_URL,
          enabled: true
        }
      })
    }
  },
  
  // 🟢 重要：添加直传特定的handlers
  handlers(self) {
    return {
      s3: {
        // 生成预签名URL用于直接上传
        generatePresignedPost: async (req, file) => {
          const s3 = self.getClient();
          const key = self.getUploadfsPath(file);
          
          const params = {
            Bucket: self.options.uploadfs.bucket,
            Fields: {
              key,
              'Content-Type': file.type,
              'Cache-Control': 'public, max-age=31536000'
            },
            Conditions: [
              { 'Cache-Control': 'public, max-age=31536000' },
              ['content-length-range', 0, self.options.uploadfs.uploads.maxSize]
            ],
            Expires: 3600 // 1小时过期
          };
          
          return new Promise((resolve, reject) => {
            s3.createPresignedPost(params, (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          });
        }
      }
    };
  }
};