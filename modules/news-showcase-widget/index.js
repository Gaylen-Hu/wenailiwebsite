export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '新闻资讯展示',
    icon: 'newspaper'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '区块标题',
        def: '行业前沿资讯'
      },
      description: {
        type: 'string',
        label: '区块描述',
        textarea: true,
        def: '洞察全球货代与物流的最新动态，掌握行业趋势与实战策略。'
      },
      mode: {
        type: 'select',
        label: '资讯来源',
        choices: [
          { value: 'latest', label: '最新资讯' },
          { value: 'popular', label: '热门资讯（优先热门，数量不足自动补齐）' }
        ],
        def: 'latest'
      },
      limit: {
        type: 'select',
        label: '显示数量',
        choices: [
          { value: 3, label: '3 条' },
          { value: 6, label: '6 条' }
        ],
        def: 3
      },
      category: {
        type: 'select',
        label: '限定分类',
        choices: [
          { value: '', label: '全部分类' },
          { value: 'industry', label: '物流资讯' },
          { value: 'exhibition', label: '展会资讯' },
          { value: 'company', label: '公司新闻' }
        ],
        def: ''
      },
      showMore: {
        type: 'boolean',
        label: '显示“查看更多”按钮',
        def: true
      },
      buttonLabel: {
        type: 'string',
        label: '按钮文本',
        def: '查看全部资讯'
      },
      buttonUrl: {
        type: 'url',
        label: '按钮链接',
        def: '/news'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [
          'title',
          'description',
          'mode',
          'limit',
          'category'
        ]
      },
      action: {
        label: '操作与链接',
        fields: [
          'showMore',
          'buttonLabel',
          'buttonUrl'
        ]
      }
    }
  }
};

