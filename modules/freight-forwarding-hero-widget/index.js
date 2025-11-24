export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '智能货代 Hero 模块',
    icon: 'bullhorn',
    preview: true
  },
  fields: {
    add: {
      eyebrow: {
        label: '顶部提示文本',
        type: 'string'
      },
      title: {
        label: '主标题',
        type: 'string',
        textarea: true,
        required: true,
        max: 140,
        help: '例如：Say Goodbye to Repetitive Work...'
      },
      subtitle: {
        label: '副标题',
        type: 'string',
        textarea: true,
        required: true
      },
      primaryCtaLabel: {
        label: '主按钮文字',
        type: 'string',
        required: true,
        def: '立即咨询定制方案'
      },
      primaryCtaUrl: {
        label: '主按钮链接',
        type: 'url',
        required: true,
        def: '/contact'
      },
      primaryCtaIcon: {
        label: '主按钮图标类名',
        type: 'string',
        def: 'fa-solid fa-arrow-right ml-2'
      },
      secondaryCtaLabel: {
        label: '次按钮文字',
        type: 'string',
        def: '预约产品演示'
      },
      secondaryCtaUrl: {
        label: '次按钮链接',
        type: 'url',
        def: '/contact'
      },
      secondaryCtaIcon: {
        label: '次按钮图标类名',
        type: 'string',
        def: 'fa-solid fa-calendar-check ml-2'
      },
      backgroundGradientClasses: {
        label: '背景渐变类名',
        type: 'string',
        textarea: true,
        def: 'bg-gradient-to-r from-blue-800 to-indigo-900'
      },
      blobOneClasses: {
        label: '装饰元素一类名',
        type: 'string',
        textarea: true,
        def: 'absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-20'
      },
      blobTwoClasses: {
        label: '装饰元素二类名',
        type: 'string',
        textarea: true,
        def: 'absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-20'
      },
      wavePath: {
        label: '底部波浪 Path',
        type: 'string',
        textarea: true,
        def: 'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,142.04Z'
      }
    },
    group: {
      content: {
        label: '内容文本',
        fields: [
          'eyebrow',
          'title',
          'subtitle'
        ]
      },
      ctas: {
        label: '行动按钮',
        fields: [
          'primaryCtaLabel',
          'primaryCtaUrl',
          'secondaryCtaLabel',
          'secondaryCtaUrl',
          'primaryCtaIcon',
          'secondaryCtaIcon'
        ]
      },
      visual: {
        label: '视觉样式',
        fields: [
          'backgroundGradientClasses',
          'blobOneClasses',
          'blobTwoClasses',
          'wavePath'
        ]
      }
    }
  }
};