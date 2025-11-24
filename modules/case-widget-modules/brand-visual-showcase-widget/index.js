export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '品牌视觉展示',
    icon: 'image',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '品牌视觉展示'
      },
      description: {
        type: 'string',
        label: '副标题/描述',
        textarea: true,
        def: '全新的品牌视觉系统，展现达睿贸易的专业形象和国际化视野'
      },
      items: {
        type: 'array',
        label: '展示项目',
        titleField: 'title',
        min: 1,
        max: 10,
        fields: {
          add: {
            _image: {
              label: '图片',
              type: 'relationship',
              withType: '@apostrophecms/image',
              max: 1
            },
            title: {
              type: 'string',
              label: '项目标题',
              required: true
            },
            description: {
              type: 'string',
              label: '项目描述',
              textarea: true,
              required: true
            }
          }
        },
        def: []
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'title', 'description', 'items' ]
      }
    }
  }
};

