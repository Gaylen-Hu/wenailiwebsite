export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '项目亮点',
    icon: 'star',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '项目亮点'
      },
      description: {
        type: 'string',
        label: '副标题/描述',
        textarea: true,
        def: '达睿贸易品牌升级项目的核心亮点和创新点'
      },
      highlights: {
        type: 'array',
        label: '亮点列表',
        titleField: 'title',
        min: 1,
        max: 12,
        fields: {
          add: {
            icon: {
              type: 'string',
              label: 'Font Awesome 图标类名',
              def: 'fa-solid fa-lightbulb',
              help: '例如：fa-solid fa-lightbulb, fa-solid fa-star'
            },
            title: {
              type: 'string',
              label: '亮点标题',
              required: true
            },
            description: {
              type: 'string',
              label: '亮点描述',
              textarea: true,
              required: true
            }
          }
        },
        def: [
          {
            icon: 'fa-solid fa-lightbulb',
            title: '创始人初心融入',
            description: '深入挖掘并融入创始人的创业故事和企业价值观，使品牌更具情感共鸣'
          },
          {
            icon: 'fa-solid fa-lightbulb',
            title: '行业特性体现',
            description: '结合国际货运代理行业特点，打造专业且现代的品牌形象'
          },
          {
            icon: 'fa-solid fa-lightbulb',
            title: '全面视觉升级',
            description: '从Logo到应用系统的全面升级，确保品牌形象一致性和辨识度'
          },
          {
            icon: 'fa-solid fa-lightbulb',
            title: '多渠道推广策略',
            description: '采用线上线下结合的多渠道推广方式，最大化品牌曝光度'
          },
          {
            icon: 'fa-solid fa-lightbulb',
            title: '数据驱动优化',
            description: '通过市场反馈数据不断优化品牌策略，确保最佳效果'
          },
          {
            icon: 'fa-solid fa-lightbulb',
            title: '长期品牌管理',
            description: '建立品牌管理体系，确保品牌形象的持续维护和发展'
          }
        ]
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'title', 'description', 'highlights' ]
      }
    }
  }
};

