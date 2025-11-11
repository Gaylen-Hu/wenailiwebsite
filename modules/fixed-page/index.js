export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page'
  },
  fields: {
    add: {
      main: {
        type: 'select',
        label: '固定页面',
        help: '选择固定的页面',
        choices: [
          {
            label: '奈李介绍',
            value: 'aboutIntro'
          },
          {
            label: '服务内容',
            value: 'services'
          },
          {
            label: '市场部代运营',
            value: 'marketing'
          },
          {
            label: '技术部代运营',
            value: 'tech'
          },
          {
            label: '数据分析与运营',
            value: 'data'
          },
          {
            label: '网站建设与优化',
            value: 'website'
          },
          {
            label: '品牌设计与建设',
            value: 'brand'
          },
          {
            label: 'AI工具库',
            value: 'team'
          },
          {
            label: '奈李介绍',
            value: 'aboutIntro'
          }
        ],
      }
    },
    group: {
    }
  }
};
