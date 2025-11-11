/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-09-21 13:26:22
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-11 19:22:19
 * @FilePath: \my-app\modules\content-widget-modules\basiclayout-widget\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import areaConfig from '../../lib/area.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Basiclayout Widget',
    icon: 'layout-icon',
    previewImage: 'jpg'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        required: true
      },
      description: {
        type: 'string',
        label: '描述',
        textarea: true,
        required: true
      },
      main: {
        type: 'area',
        options: {
          expanded: true,
          groups: {
            ...areaConfig.fullExpandedGroup
          }
        }
      },
      backgroundColor: {
        type: 'color',
        label: '背景颜色',
        def: '#f9fafb'
      },
      textColor: {
        type: 'color',
        label: '文字颜色',
        def: '#111827'
      },
      paddingSize: {
        type: 'select',
        label: '内边距大小',
        choices: [
          { label: '小', value: 'py-8' },
          { label: '中', value: 'py-16' },
          { label: '大', value: 'py-24' },
          { label: '超大', value: 'py-32' }
        ],
        def: 'py-20'
      },
      containerWidth: {
        type: 'select',
        label: '容器宽度',
        choices: [
          { label: '窄', value: 'max-w-4xl' },
          { label: '中等', value: 'max-w-6xl' },
          { label: '宽', value: 'max-w-7xl' },
          { label: '全宽', value: 'max-w-none' }
        ],
        def: 'max-w-7xl'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: ['title', 'description', 'main']
      },
      design: {
        label: '设计设置',
        fields: ['backgroundColor', 'textColor', 'paddingSize', 'containerWidth']
      }
    }
  }
};