import areaConfig from '../../lib/area.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: '关于我们页面'
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
        textarea: true
      },
      main: {
        type: 'area',
        options: {
          expanded: true,
          groups: {
            ...areaConfig.aboutExpandedGroup
          }
        }
      }
    },
    group: {
      basics: {
        label: '内容设置',
        fields: ['title', 'description', 'main']
      }
    }
  }
};

