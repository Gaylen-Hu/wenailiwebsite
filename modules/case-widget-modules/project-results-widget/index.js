export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '项目成果',
    icon: 'chart-line',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '项目成果'
      },
      description: {
        type: 'string',
        label: '副标题/描述',
        textarea: true,
        def: '品牌升级后，达睿贸易在市场影响力和品牌认知度方面取得了显著提升'
      },
      results: {
        type: 'array',
        label: '成果列表',
        titleField: 'title',
        min: 1,
        max: 8,
        fields: {
          add: {
            value: {
              type: 'string',
              label: '数值',
              required: true,
              help: '例如：156%、89%、行业前20% 等'
            },
            title: {
              type: 'string',
              label: '成果标题',
              required: true
            },
            description: {
              type: 'string',
              label: '成果描述',
              textarea: true,
              required: true
            }
          }
        },
        def: [
          {
            value: '156%',
            title: '品牌知名度提升',
            description: '行业内品牌识别度显著提升'
          },
          {
            value: '89%',
            title: '客户咨询量增长',
            description: '品牌升级后新客户咨询大幅增加'
          },
          {
            value: '92%',
            title: '品牌形象评分',
            description: '客户对新品牌形象满意度高'
          },
          {
            value: '行业前20%',
            title: '品牌影响力',
            description: '跃升至行业前列'
          }
        ]
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'title', 'description', 'results' ]
      }
    }
  }
};

