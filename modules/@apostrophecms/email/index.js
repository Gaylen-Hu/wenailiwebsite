/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-11 21:35:37
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2026-01-07 22:56:09
 * @FilePath: \wenaili\modules\@apostrophecms\email\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
    options: {
      nodemailer: {
        pool: true,
          host: 'smtp.exmail.qq.com',  
          port: 465,
          secure: true,
          auth: {
            user: 'melanie@wenaili.com',
            pass: 'Gq9KvpRRs2rJb5pp'
          }
      }
    }
  };