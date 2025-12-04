/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-04 12:30:00
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-04 12:30:00
 * @FilePath: \wenaili\modules\fontawesome-test\index.js
 * @Description: FontAwesome 测试页面
 */

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'FontAwesome 测试',
    pluralLabel: 'FontAwesome 测试',
    alias: 'fontawesomeTest'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '测试标题',
        required: true,
        def: 'FontAwesome 图标测试'
      }
    }
  }
};
