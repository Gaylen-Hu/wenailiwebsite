/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-11 17:40:16
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-17 20:48:17
 * @FilePath: \wenaili\modules\@apostrophecms\express\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  options: {
    session: {
      // If this still says `undefined`, set a real secret!
      secret: process.env.APOSTROPHE_SESSION_SECRET || 'f3a7b9c8e5d2f1a0b4c6e8d9f2a1b3c5e7f9a8b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6',
      csrf:false
    }
    }
  };
