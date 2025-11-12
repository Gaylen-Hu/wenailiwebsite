export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '我们的服务',
    icon: 'briefcase',
    preview: true
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '我们的服务'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '为物流货代企业提供市场与技术一体化运营支持'
      },
      items: {
        type: 'array',
        label: '服务卡片',
        titleField: 'title',
        max: 6,
        min: 1,
        def: [
          {
            title: '市场部代运营',
            description: '为货代企业提供全面的市场策划、品牌推广、获客转化等服务，帮助企业提升市场影响力。',
            imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=marketing%20department%20brand%20packaging%2C%20creative%20strategy%2C%20brand%20design%2C%20logo%20design&sign=f0c06336c4da2daacf94dc2f5e7d95f6',
            imageAlt: '市场部代运营',
            iconClass: 'fa-solid fa-bullhorn',
            linkLabel: '了解更多',
            linkUrl: '/services/marketing'
          },
          {
            title: '技术部代运营',
            description: '提供专业的技术支持，包括系统开发、维护、优化等服务，确保企业IT系统稳定高效运行。',
            imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=technology%20department%20system%20development%2C%20brand%20system%20integration%2C%20tech%20support%20team&sign=bfae9bf40b53ba982511ceb2bc36558f',
            imageAlt: '技术部代运营',
            iconClass: 'fa-solid fa-code',
            linkLabel: '了解更多',
            linkUrl: '/services/tech'
          },
          {
            title: '品牌设计与建设',
            description: '为货代企业提供品牌设计、视觉识别系统建设等服务，提升品牌形象和认知度。',
            imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=brand%20design%20agency%2C%20creative%20marketing%20design%2C%20brand%20identity%20system%2C%20logo%20design&sign=8373abf933116b77da0f8a9d704c8924',
            imageAlt: '品牌设计与建设',
            iconClass: 'fa-solid fa-paint-brush',
            linkLabel: '了解更多',
            linkUrl: '/services/brand'
          }
        ],
        fields: {
          add: {
            imageUrl: {
              type: 'string',
              label: '封面图片地址',
              textarea: true,
              required: true
            },
            imageAlt: {
              type: 'string',
              label: '封面图片替代文本',
              def: ''
            },
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-bullhorn',
              help: '输入 Font Awesome 图标类，例如：fa-solid fa-code'
            },
            badgePrimary: {
              type: 'string',
              label: '徽章一（可选）',
              help: '显示在图片覆盖层左侧'
            },
            badgeSecondary: {
              type: 'string',
              label: '徽章二（可选）',
              help: '显示在图片覆盖层右侧'
            },
            title: {
              type: 'string',
              label: '服务标题',
              required: true
            },
            description: {
              type: 'string',
              label: '服务描述',
              textarea: true,
              required: true
            },
            linkLabel: {
              type: 'string',
              label: '链接文本',
              def: '了解更多'
            },
            linkUrl: {
              type: 'string',
              label: '链接地址',
              def: '/services'
            }
          }
        }
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'heading', 'subheading', 'items' ]
      }
    }
  }
};

