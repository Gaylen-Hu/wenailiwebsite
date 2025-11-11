/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-11 21:35:37
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-11 21:35:39
 * @FilePath: \wenaili\modules\@apostrophecms\email\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
    options: {
      nodemailer: {
        pool: true,
          host: 'smtp.163.com',
          port: 465,
          secure: true,
          auth: {
            user: 'wenailisender@163.com',
            pass: process.env.APOS_EMAIL_SMTP_PASS||'TQnFsKcLLakGpnrQ'
          }
      }
    }
  };