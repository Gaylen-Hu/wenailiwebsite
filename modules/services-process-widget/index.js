export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '服务流程',
    icon: 'sitemap',
    preview: true
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '服务流程'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '我们提供系统化的货代企业代运营服务流程，帮助企业提升运营效率，实现业务增长。'
      },
      steps: {
        type: 'array',
        label: '流程步骤',
        titleField: 'title',
        min: 1,
        max: 6,
        def: [
          {
            iconClass: 'fa-solid fa-search',
            title: '需求分析与评估',
            description: '全面分析货代企业现有运营状况、市场定位及业务需求'
          },
          {
            iconClass: 'fa-solid fa-lightbulb',
            title: '方案制定与规划',
            description: '制定个性化的市场和技术代运营方案，明确目标和实施路径'
          },
          {
            iconClass: 'fa-solid fa-cogs',
            title: '方案实施与执行',
            description: '专业团队驻场或远程执行代运营方案，确保服务质量'
          },
          {
            iconClass: 'fa-solid fa-chart-bar',
            title: '效果评估与优化',
            description: '定期评估代运营效果，根据数据分析结果持续优化方案'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-circle-check',
              help: '请输入 Font Awesome 图标类名，例如：fa-solid fa-lightbulb'
            },
            title: {
              type: 'string',
              label: '步骤标题',
              required: true
            },
            description: {
              type: 'string',
              label: '步骤描述',
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
        fields: [ 'heading', 'subheading', 'steps' ]
      }
    }
  }
};

