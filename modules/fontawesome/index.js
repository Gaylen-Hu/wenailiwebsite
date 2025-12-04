/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-04 12:00:00
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-04 12:00:00
 * @FilePath: \wenaili\modules\fontawesome\index.js
 * @Description: FontAwesome 图标库模块
 */

export default {
  extend: '@apostrophecms/module',
  options: {
    alias: 'fontawesome'
  },
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        addFontAwesome(req) {
          // 添加 FontAwesome 版本信息到页面数据
          req.data.fontawesomeVersion = '6.7.2';
        }
      }
    };
  }
};
