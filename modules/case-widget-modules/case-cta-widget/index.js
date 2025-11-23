export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '案例CTA',
    icon: 'phone',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '准备好提升您的品牌形象了吗？'
      },
      description: {
        type: 'string',
        label: '描述文字',
        textarea: true,
        def: '联系我们，获取专业的品牌设计与建设解决方案，让您的货代企业在竞争中脱颖而出'
      },
      buttonText: {
        type: 'string',
        label: '按钮文字',
        def: '立即咨询'
      },
      buttonUrl: {
        type: 'url',
        label: '按钮链接',
        def: '/contact',
        help: '按钮点击后跳转的链接地址'
      },
      icon: {
        type: 'string',
        label: '按钮图标',
        def: 'fa-solid fa-arrow-right',
        help: 'Font Awesome 图标类名，例如：fa-solid fa-arrow-right'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'title', 'description', 'buttonText', 'buttonUrl', 'icon' ]
      }
    }
  }
};

