export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '差异化优势',
    icon: 'sparkles',
    description: '突出我们与其他货代运营服务商的核心差异。'
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '我们与其他货代运营服务商有何不同？'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '我们凭借先进的技术和专业的团队，为客户提供卓越的产品和服务'
      },
      items: {
        type: 'array',
        label: '优势卡片',
        titleField: 'title',
        min: 1,
        def: [
          {
            title: '懂物流',
            description: '10年+国际物流行业经验，深谙海运、空运、跨境小包、海外仓、进口供应链等业务流程和痛点。',
            iconClass: 'fa-solid fa-truck-front',
            backgroundClass: 'bg-blue-500',
            textClass: 'text-white'
          },
          {
            title: '懂营销',
            description: '精通数字化内容营销、SEO/SEM、社交媒体，精准锁定目标客户，打造高质量线索引擎。',
            iconClass: 'fa-solid fa-bullhorn',
            backgroundClass: 'bg-green-500',
            textClass: 'text-white'
          },
          {
            title: '懂技术',
            description: '掌握系统、数据分析工具与自动化技术，量化每一步 ROI，让增长可持续。',
            iconClass: 'fa-solid fa-microchip',
            backgroundClass: 'bg-purple-500',
            textClass: 'text-white'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-star'
            },
            backgroundClass: {
              type: 'string',
              label: '图标背景类名',
              def: 'bg-blue-500'
            },
            textClass: {
              type: 'string',
              label: '图标颜色类名',
              def: 'text-white'
            },
            title: {
              type: 'string',
              label: '标题',
              required: true
            },
            description: {
              type: 'string',
              label: '描述',
              textarea: true,
              required: true
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


