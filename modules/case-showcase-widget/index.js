export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '案例展示',
    icon: 'briefcase',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '技术部代运营成功案例'
      },
      description: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '看看我们如何帮助货代企业提升 IT 系统性能和运营效率'
      },
      mode: {
        type: 'select',
        label: '案例模式',
        def: 'featured',
        choices: [
          { label: '首页推荐案例', value: 'featured' },
          { label: '最新案例', value: 'latest' }
        ]
      },
      category: {
        type: 'select',
        label: '案例分类',
        choices: [
          { value: '', label: '全部分类' },
          { value: 'market', label: '市场代运营' },
          { value: 'tech', label: '技术服务' },
          { value: 'brand', label: '品牌服务' },
          { value: 'consulting', label: '管理咨询' },
          { value: 'digital', label: '数字化转型' }
        ],
        def: ''
      },
      limit: {
        type: 'select',
        label: '案例数量',
        def: '2',
        choices: [
          { label: '2 条', value: '2' },
          { label: '4 条', value: '4' }
        ]
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'title', 'description', 'mode', 'category', 'limit' ]
      }
    }
  }
};

