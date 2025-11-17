export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '为什么选择奈李',
    icon: 'thumb-up',
    description: '展示企业的核心优势亮点。'
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '为什么选择奈李'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '在新媒体数字化营销的大趋势下，上海奈李在货代行业市场部代运营业务领域具有四大核心优势'
      },
      items: {
        type: 'array',
        label: '优势卡片',
        titleField: 'title',
        min: 1,
        def: [
          {
            iconClass: 'fa-solid fa-chart-line',
            title: '行业深耕',
            description: '10年专注货代行业，深刻理解行业特性和客户需求，能够精准把握市场脉搏。'
          },
          {
            iconClass: 'fa-solid fa-laptop-code',
            title: '数字化营销能力',
            description: '掌握最新的数字营销技术和工具，包括AI营销、大数据分析、社交媒体营销等。'
          },
          {
            iconClass: 'fa-solid fa-users',
            title: '专业团队',
            description: '拥有一支经验丰富的营销团队，成员来自业内知名企业，具备专业素养和创新能力。'
          },
          {
            iconClass: 'fa-solid fa-sliders-h',
            title: '定制化服务',
            description: '根据企业实际情况，量身定制营销方案，确保解决方案符合企业特点和需求。'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-star'
            },
            iconBackgroundClass: {
              type: 'string',
              label: '图标背景类名',
              def: 'bg-blue-100'
            },
            iconColorClass: {
              type: 'string',
              label: '图标颜色类名',
              def: 'text-blue-600'
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


