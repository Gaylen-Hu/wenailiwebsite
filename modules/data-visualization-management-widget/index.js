export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '数据可视化管理',
    icon: 'chart-bar',
    description: '展示业务数据可视化能力的核心要点。'
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '数据可视化管理'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '通过直观的数据可视化，帮助货代企业更好地理解业务状况和市场趋势'
      },
      items: {
        type: 'array',
        label: '内容卡片',
        titleField: 'title',
        min: 1,
        def: [
          {
            iconClass: 'fa-solid fa-chart-simple',
            title: '业务数据仪表盘',
            description: '定制开发业务数据仪表盘，实时监控关键业务指标'
          },
          {
            iconClass: 'fa-solid fa-users',
            title: '客户行为分析',
            description: '分析客户行为数据，了解客户需求和偏好，优化服务策略'
          },
          {
            iconClass: 'fa-solid fa-chart-line',
            title: '市场趋势分析',
            description: '分析市场趋势数据，把握市场动态，制定科学的市场策略'
          },
          {
            iconClass: 'fa-solid fa-tachometer',
            title: '运营效率分析',
            description: '分析运营数据，识别瓶颈，优化业务流程，提升运营效率'
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


