export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '首页横幅 Banner',
    icon: 'bullhorn',
    preview: true
  },
  fields: {
    add: {
      eyebrow: {
        type: 'string',
        label: '顶部小标题',
        def: ''
      },
      heading: {
        type: 'string',
        label: '主标题（可换行使用<br>）',
        textarea: true,
        required: true,
        def: '货代企业运营专家<br><span class="text-blue-300">助力增长，共创未来</span>'
      },
      description: {
        type: 'string',
        label: '描述文案',
        textarea: true,
        def: '奈李（Wenaili）为物流货代公司提供专业的市场部及技术部代运营服务，从品牌建设到获客转化，从网站开发到系统优化，全方位助力货代企业提升竞争力。'
      },
      primaryCtaText: {
        type: 'string',
        label: '主按钮文案',
        def: '了解我们的服务'
      },
      primaryCtaLink: {
        type: 'string',
        label: '主按钮链接',
        def: '/services'
      },
      primaryCtaIcon: {
        type: 'string',
        label: '主按钮图标类名',
        def: 'fa-solid fa-arrow-right ml-2'
      },
      secondaryCtaText: {
        type: 'string',
        label: '次按钮文案',
        def: '立即联系我们'
      },
      secondaryCtaLink: {
        type: 'string',
        label: '次按钮链接',
        def: '/contact'
      },
      backgroundImageUrl: {
        type: 'string',
        label: '背景图片链接',
        textarea: true,
        required: true,
        def: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/287668515330/attachment/beautiful-architecture-office-business-building-with-glass-window-shape_20251102191224.jpg'
      },
      backgroundImageAlt: {
        type: 'string',
        label: '背景图片替代文本',
        def: '现代化办公楼 - 奈李信息技术办公环境'
      },
      overlayClasses: {
        type: 'string',
        label: '覆盖层渐变类名',
        def: 'bg-gradient-to-r from-blue-900/90 to-indigo-900/90'
      },
      wavePath: {
        type: 'string',
        label: '底部波浪 Path',
        textarea: true,
        def: 'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,142.04Z'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'eyebrow', 'heading', 'description' ]
      },
      actions: {
        label: '按钮配置',
        fields: [
          'primaryCtaText',
          'primaryCtaLink',
          'primaryCtaIcon',
          'secondaryCtaText',
          'secondaryCtaLink'
        ]
      },
      media: {
        label: '视觉样式',
        fields: [ 'backgroundImageUrl', 'backgroundImageAlt', 'overlayClasses', 'wavePath' ]
      }
    }
  }
};
