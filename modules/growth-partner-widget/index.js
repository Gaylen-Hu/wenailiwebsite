export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '增长伙伴介绍',
    icon: 'handshake',
    description: '展示营销与技术结合的增长伙伴内容版块。'
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '专业营销+智能技术，做您最懂行的增长伙伴'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '我们不仅是服务提供商，更是您企业增长的战略合作伙伴，帮助您在激烈的市场竞争中脱颖而出'
      },
      features: {
        type: 'array',
        label: '优势列表',
        titleField: 'title',
        min: 1,
        def: [
          {
            iconClass: 'fa-solid fa-bullhorn',
            title: '精准的市场定位',
            description: '深入了解货代行业市场特点和客户需求，帮助您明确市场定位，制定精准营销策略。'
          },
          {
            iconClass: 'fa-solid fa-laptop-code',
            title: '先进的技术支持',
            description: '专业技术团队与平台，为营销活动提供强大的技术支持与数据分析。'
          },
          {
            iconClass: 'fa-solid fa-handshake',
            title: '长期的合作关系',
            description: '注重长期稳定合作，持续输出价值，与客户共同成长。'
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
            }
          }
        }
      },
      image: {
        type: 'object',
        label: '右侧图片',
        fields: {
          add: {
            url: {
              type: 'url',
              label: '图片地址',
              def: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=business%20growth%2C%20marketing%20team%2C%20technology%20integration%2C%20partnership&sign=5e18b3596b8fc3618b00e461a466f4e7'
            },
            alt: {
              type: 'string',
              label: '图片描述',
              def: '专业营销与智能技术团队'
            }
          }
        }
      },
      showDecorations: {
        type: 'boolean',
        label: '显示背景装饰',
        def: true
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'heading', 'subheading', 'features', 'image', 'showDecorations' ]
      }
    }
  }
};


