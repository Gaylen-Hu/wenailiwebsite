export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '横幅 Banner'
  },
  fields: {
    add: {
      sectionId: {
        type: 'string',
        label: '区块 ID',
        help: '用于锚点跳转，可选'
      },
      backgroundImage: {
        type: 'attachment',
        label: '背景图片',
        help: '建议尺寸 1920×1080 以上，支持 JPG/PNG/WebP',
        group: 'media'
      },
      backgroundImageUrl: {
        type: 'url',
        label: '外部背景图片地址',
        help: '若未上传图片，可填入外部图片 URL'
      },
      backgroundImageAlt: {
        type: 'string',
        label: '背景图替换文本',
        def: '企业形象展示图'
      },
      overlayPreset: {
        type: 'select',
        label: '遮罩渐变',
        choices: [
          {
            label: '深蓝到靛蓝（默认）',
            value: 'from-blue-900/90 to-indigo-900/90'
          },
          {
            label: '靛蓝到紫罗兰',
            value: 'from-indigo-900/85 to-purple-900/85'
          },
          {
            label: '深灰到黑色',
            value: 'from-slate-900/80 to-black/85'
          },
          {
            label: '自定义（禁用遮罩）',
            value: ''
          }
        ],
        def: 'from-blue-900/90 to-indigo-900/90'
      },
      eyebrow: {
        type: 'string',
        label: '顶部引导文字'
      },
      headlineMain: {
        type: 'string',
        label: '主标题',
        required: true
      },
      headlineHighlight: {
        type: 'string',
        label: '主标题高亮文字',
        help: '可选，显示为换行后的强调文字'
      },
      description: {
        type: 'string',
        label: '描述文案',
        textarea: true
      },
      alignment: {
        type: 'select',
        label: '内容对齐方式',
        choices: [
          {
            label: '左对齐',
            value: 'left'
          },
          {
            label: '居中对齐',
            value: 'center'
          }
        ],
        def: 'left'
      },
      buttons: {
        type: 'array',
        label: '按钮',
        titleField: 'label',
        min: 0,
        max: 3,
        fields: {
          add: {
            label: {
              type: 'string',
              label: '按钮文本',
              required: true
            },
            url: {
              type: 'url',
              label: '链接地址',
              required: true
            },
            style: {
              type: 'select',
              label: '按钮样式',
              def: 'primary',
              choices: [
                {
                  label: '主按钮（实心）',
                  value: 'primary'
                },
                {
                  label: '次按钮（描边）',
                  value: 'secondary'
                },
                {
                  label: '浅色按钮',
                  value: 'ghost'
                }
              ]
            },
            openInNewTab: {
              type: 'boolean',
              label: '新窗口打开',
              def: false
            }
          }
        }
      },
      showWaveDivider: {
        type: 'boolean',
        label: '底部波浪分割线',
        def: true
      },
      extraClasses: {
        type: 'string',
        label: '自定义额外 class',
        help: '可选，追加到最外层 section'
      }
    },
    group: {
      media: {
        label: '背景设置',
        fields: [
          'backgroundImage',
          'backgroundImageUrl',
          'backgroundImageAlt',
          'overlayPreset'
        ]
      },
      content: {
        label: '内容',
        fields: [
          'eyebrow',
          'headlineMain',
          'headlineHighlight',
          'description',
          'buttons'
        ]
      },
      layout: {
        label: '布局',
        fields: [
          'sectionId',
          'alignment',
          'showWaveDivider',
          'extraClasses'
        ]
      }
    }
  }
};


