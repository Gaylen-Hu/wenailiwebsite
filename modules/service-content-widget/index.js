export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '服务内容网格',
    icon: 'grid',
    preview: true
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '市场部代运营服务内容'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '我们提供全面的市场部代运营服务，帮助您提升品牌影响力和业务增长。'
      },
      backgroundVariant: {
        type: 'select',
        label: '背景颜色',
        def: 'gray',
        choices: [
          {
            label: '浅灰色',
            value: 'gray'
          },
          {
            label: '白色',
            value: 'white'
          }
        ]
      },
      columns: {
        type: 'select',
        label: '卡片列数（桌面端）',
        def: '3',
        choices: [
          {
            label: '2 列',
            value: '2'
          },
          {
            label: '3 列',
            value: '3'
          },
          {
            label: '4 列',
            value: '4'
          }
        ]
      },
      items: {
        type: 'array',
        min: 1,
        label: '服务项目',
        titleField: 'title',
        def: [
          {
            iconClass: 'fa-solid fa-bullseye',
            title: '市场策划',
            description: '制定全面的市场战略规划，包括市场定位、目标客户分析、竞争分析和营销目标设定。'
          },
          {
            iconClass: 'fa-solid fa-share-nodes',
            title: '品牌推广',
            description: '设计品牌视觉形象，制定品牌传播策略，提升品牌知名度和美誉度。'
          },
          {
            iconClass: 'fa-solid fa-user-plus',
            title: '获客转化',
            description: '优化获客渠道，制定转化策略，提高线索转化率和客户获取效率。'
          },
          {
            iconClass: 'fa-solid fa-file-pen',
            title: '内容营销',
            description: '创建高质量的内容，包括文章、视频、社交媒体内容等，吸引目标客户。'
          },
          {
            iconClass: 'fa-solid fa-calendar-check',
            title: '活动策划',
            description: '策划和执行线上线下活动，提升品牌影响力，促进客户互动和转化。'
          },
          {
            iconClass: 'fa-solid fa-bullhorn',
            title: '媒体投放',
            description: '制定精准的媒体投放策略，选择合适的媒体渠道，优化投放效果和 ROI。'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-star'
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
            },
            iconBackgroundClass: {
              type: 'string',
              label: '图标背景类名',
              def: 'bg-blue-100'
            }
          }
        }
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'heading', 'subheading', 'items' ]
      },
      layout: {
        label: '布局设置',
        fields: [ 'backgroundVariant', 'columns' ]
      }
    }
  }
};

