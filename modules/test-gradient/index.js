/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-04 10:30:00
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-04 10:30:00
 * @FilePath: \wenaili\modules\test-gradient\index.js
 * @Description: 测试颜色渐变字段的 piece 类型
 */

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '渐变测试',
    pluralLabel: '渐变测试',
    alias: 'testGradient'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        required: true
      },
      subtitle: {
        type: 'string',
        label: '副标题',
        textarea: true
      },
      gradient: {
        type: 'colorGradient',
        label: '颜色渐变',
        help: '选择或创建颜色渐变效果'
      },
      description: {
        type: 'string',
        label: '描述',
        textarea: true
      }
    },
    group: {
      basics: {
        label: '基本信息',
        fields: ['title', 'subtitle', 'gradient']
      },
      content: {
        label: '内容',
        fields: ['description']
      }
    }
  }
};
