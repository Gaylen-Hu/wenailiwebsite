/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-11 17:40:16
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-11 17:40:23
 * @FilePath: \wenaili\modules\@apostrophecms\express\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  options: {
    session: {
      // If this still says `undefined`, set a real secret!
      secret: process.env.APOSTROPHE_SESSION_SECRET,
      csrf:false
    }
    }
  };
