export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '服务联系 CTA',
    icon: 'handshake-angle',
    preview: true
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        required: true,
        def: '准备好提升您的货代企业市场影响力了吗？'
      },
      description: {
        type: 'string',
        label: '描述',
        textarea: true,
        def: '联系我们，获取专业的市场部代运营解决方案，助力您的企业实现业务增长'
      },
      backgroundColor: {
        type: 'color',
        label: '背景色',
        def: '#2563eb'
      },
      headingColor: {
        type: 'color',
        label: '标题文字颜色',
        def: '#ffffff'
      },
      descriptionColor: {
        type: 'color',
        label: '描述文字颜色',
        def: '#bfdbfe'
      },
      buttonText: {
        type: 'string',
        label: '按钮文本',
        required: true,
        def: '立即咨询'
      },
      buttonLink: {
        type: 'string',
        label: '按钮链接',
        required: true,
        def: '/contact'
      },
      buttonIconClass: {
        type: 'string',
        label: '按钮图标类名',
        def: 'fa-solid fa-arrow-right ml-2',
        help: '可选，Font Awesome 图标类名'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'heading', 'description' ]
      },
      appearance: {
        label: '外观设置',
        fields: [ 'backgroundColor', 'headingColor', 'descriptionColor' ]
      },
      action: {
        label: '按钮设置',
        fields: [ 'buttonText', 'buttonLink', 'buttonIconClass' ]
      }
    }
  }
};

