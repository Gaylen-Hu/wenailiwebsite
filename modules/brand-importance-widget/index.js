export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '品牌建设洞察',
    icon: 'bullhorn',
    preview: true
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '货代企业也要重视品牌建设'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '告别价格战，打赢价值战。货代企业长远发展的关键，在于将品牌故事转化为可信赖的市场形象。'
      },
      backgroundClass: {
        type: 'string',
        label: '背景类名',
        def: 'py-20 bg-gray-50'
      },
      importanceTitle: {
        type: 'string',
        label: '左列标题',
        def: '品牌建设对货代企业的重要性'
      },
      elementsTitle: {
        type: 'string',
        label: '右列标题',
        def: '品牌建设的关键要素'
      },
      importanceItems: {
        type: 'array',
        label: '品牌重要性要点',
        titleField: 'title',
        min: 1,
        def: [
          {
            iconClass: 'fa-solid fa-eye',
            title: '提升品牌认知度',
            description: '专业的品牌建设能够提高货代企业的市场认知度，让更多潜在客户了解和认识您的企业'
          },
          {
            iconClass: 'fa-solid fa-handshake',
            title: '增强客户信任',
            description: '良好的品牌形象能够增强客户的信任感，提高客户选择您的企业的可能性'
          },
          {
            iconClass: 'fa-solid fa-trophy',
            title: '提高市场竞争力',
            description: '独特的品牌定位和形象能够帮助您的企业在激烈的市场竞争中脱颖而出'
          },
          {
            iconClass: 'fa-solid fa-chart-line',
            title: '促进业务增长',
            description: '强大的品牌能够吸引更多优质客户，促进业务增长，提高企业的市场份额'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-circle'
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
      },
      elementItems: {
        type: 'array',
        label: '关键要素',
        titleField: 'title',
        min: 1,
        def: [
          {
            iconClass: 'fa-solid fa-book-open',
            title: '品牌故事',
            description: '提炼企业的核心价值观和独特故事，让客户产生情感共鸣，建立深厚的品牌认知'
          },
          {
            iconClass: 'fa-solid fa-paint-brush',
            title: '品牌格调',
            description: '通过专业的设计和传播，提升品牌的视觉形象和专业度，摆脱传统货代企业的低端形象'
          },
          {
            iconClass: 'fa-solid fa-thumbs-up',
            title: '品牌美誉度',
            description: '通过优质的服务和积极的品牌传播，提高客户满意度和口碑，增强品牌的美誉度'
          },
          {
            iconClass: 'fa-solid fa-shield-alt',
            title: '可信赖的品牌形象',
            description: '通过持续的品牌建设和维护，树立专业、可靠的品牌形象，赢得客户的长期信任'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-circle'
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
      basics: {
        label: '基础内容',
        fields: [ 'heading', 'subheading', 'backgroundClass' ]
      },
      importance: {
        label: '品牌重要性',
        fields: [ 'importanceTitle', 'importanceItems' ]
      },
      elements: {
        label: '关键要素',
        fields: [ 'elementsTitle', 'elementItems' ]
      }
    }
  }
};

