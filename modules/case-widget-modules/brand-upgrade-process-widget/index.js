export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '品牌升级流程',
    icon: 'list-ol',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '品牌升级流程'
      },
      description: {
        type: 'string',
        label: '副标题/描述',
        textarea: true,
        def: '我们采用系统化的品牌升级流程，确保每个环节都精准到位'
      },
      steps: {
        type: 'array',
        label: '流程步骤',
        titleField: 'title',
        min: 1,
        max: 10,
        fields: {
          add: {
            stepNumber: {
              type: 'integer',
              label: '步骤编号',
              required: true,
              min: 1
            },
            _image: {
              label: '步骤图片',
              type: 'relationship',
              withType: '@apostrophecms/image',
              max: 1
            },
            icon: {
              type: 'string',
              label: 'Font Awesome 图标类名',
              def: 'fa-solid fa-search',
              help: '例如：fa-solid fa-search, fa-solid fa-bullseye'
            },
            title: {
              type: 'string',
              label: '步骤标题',
              required: true
            },
            description: {
              type: 'string',
              label: '步骤描述',
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
        fields: [ 'title', 'description', 'steps' ]
      }
    }
  }
};

