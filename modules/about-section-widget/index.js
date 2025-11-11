export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '关于我们统计模块'
  },
  fields: {
    add: {
      layout: {
        type: 'select',
        label: '版式布局',
        choices: [
          {
            value: 'image-left',
            label: '图片在左侧'
          },
          {
            value: 'image-right',
            label: '图片在右侧'
          }
        ],
        def: 'image-left'
      },
      backgroundStyle: {
        type: 'select',
        label: '背景样式',
        choices: [
          {
            value: 'light',
            label: '浅色背景'
          },
          {
            value: 'dark',
            label: '深色背景'
          }
        ],
        def: 'light'
      },
      eyebrow: {
        type: 'string',
        label: '章节小标题'
      },
      heading: {
        type: 'string',
        label: '主标题',
        required: true
      },
      descriptionOne: {
        type: 'string',
        label: '介绍段落一',
        textarea: true
      },
      descriptionTwo: {
        type: 'string',
        label: '介绍段落二',
        textarea: true
      },
      image: {
        type: 'attachment',
        label: '配图',
        required: true,
        group: 'media'
      },
      imageAlt: {
        type: 'string',
        label: '配图替代文本',
        def: '关于我们配图'
      },
      imageCaption: {
        type: 'string',
        label: '配图说明'
      },
      stats: {
        type: 'array',
        label: '统计数据',
        required: true,
        min: 1,
        titleField: 'label',
        fields: {
          add: {
            label: {
              type: 'string',
              label: '统计名称',
              required: true
            },
            targetValue: {
              type: 'float',
              label: '动画目标数值',
              required: true
            },
            prefix: {
              type: 'string',
              label: '前缀',
              help: '例如 ¥、约等'
            },
            suffix: {
              type: 'string',
              label: '后缀',
              help: '例如 +、%'
            },
            decimals: {
              type: 'integer',
              label: '小数位数',
              min: 0,
              max: 3,
              def: 0
            },
            duration: {
              type: 'integer',
              label: '动画时长（毫秒）',
              def: 2000
            }
          }
        }
      }
    },
    group: {
      layout: {
        label: '布局样式',
        fields: [
          'layout',
          'backgroundStyle'
        ]
      },
      content: {
        label: '文字内容',
        fields: [
          'eyebrow',
          'heading',
          'descriptionOne',
          'descriptionTwo'
        ]
      },
      media: {
        label: '媒体',
        fields: [
          'image',
          'imageAlt',
          'imageCaption'
        ]
      },
      statsGroup: {
        label: '统计数据',
        fields: [
          'stats'
        ]
      }
    }
  }
};

