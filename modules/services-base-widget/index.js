import linkSchema from '../../lib/linkSchema.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '服务基础项',
    icon: 'layer-group',
    description: '展示多个服务条目，包括图片、图标、描述、要点列表及行动按钮。'
  },
  icons: {
    'layer-group': 'LayerGroup'
  },
  fields: {
    add: {
      sectionId: {
        label: '区块锚点 ID',
        type: 'string',
        help: '可选，用于页面内锚点链接，例如“services”。'
      },
      sectionTitle: {
        label: '区块标题',
        type: 'string',
        required: true
      },
      sectionDescription: {
        label: '区块标题',
        type: 'string',
        required: true
      },
      backgroundColor: {
        label: '背景颜色',
        type: 'color',
        def: '#ffffff',
        help: '设置整个区块的背景色。'
      },
      verticalSpacing: {
        label: '上下内边距',
        type: 'select',
        def: 'relaxed',
        choices: [
          {
            label: '紧凑',
            value: 'compact'
          },
          {
            label: '适中',
            value: 'relaxed'
          },
          {
            label: '宽松',
            value: 'extended'
          }
        ]
      },
      services: {
        label: '服务项目',
        type: 'array',
        titleField: 'title',
        required: true,
        min: 1,
        fields: {
          add: {
            title: {
              label: '服务标题',
              type: 'string',
              required: true
            },
            icon: {
              label: '图标类名',
              type: 'string',
              help: '例如：fa-solid fa-bullhorn。'
            },
            colorTheme: {
              label: '配色主题',
              type: 'select',
              def: 'blue',
              choices: [
                {
                  label: '蓝色',
                  value: 'blue'
                },
                {
                  label: '绿色',
                  value: 'green'
                },
                {
                  label: '红色',
                  value: 'red'
                },
                {
                  label: '紫色',
                  value: 'purple'
                },
                {
                  label: '琥珀色',
                  value: 'amber'
                },
                {
                  label: '灰色',
                  value: 'gray'
                }
              ]
            },
            image: {
              label: '服务图片',
              type: 'area',
              required: true,
              options: {
                max: 1,
                widgets: {
                  '@apostrophecms/image': {}
                }
              }
            },
            imageAlt: {
              label: '图片替代文本',
              type: 'string',
              help: '用于屏幕阅读器和 SEO。'
            },
            description: {
              label: '服务描述',
              type: 'string',
              required: true  
            },
            highlights: {
              label: '服务要点',
              type: 'array',
              titleField: 'point',
              fields: {
                add: {
                  point: {
                    label: '要点内容',
                    type: 'string',
                    required: true
                  }
                }
              }
            },
            layout: {
              label: '布局方向',
              type: 'select',
              def: 'image-left',
              choices: [
                {
                  label: '图片在左',
                  value: 'image-left'
                },
                {
                  label: '图片在右',
                  value: 'image-right'
                }
              ]
            },
            cta: {
              label: '行动按钮',
              type: 'object',
              fields: {
                add: {
                  ...linkSchema
                }
              }
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: '基础设置',
        fields: [
          'sectionTitle',
          'sectionDescription',
          'services'
        ]
      },
      appearance: {
        label: '外观设置',
        fields: [
          'sectionId',
          'backgroundColor',
          'verticalSpacing'
        ]
      }
    }
  }
};

