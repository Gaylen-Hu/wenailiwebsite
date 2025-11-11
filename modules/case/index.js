export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '案例',
    pluralLabel: '案例列表',
    slugPrefix: 'case-'
  },
  fields: {
    add: {
      category: {
        type: 'string',
        label: '案例分类',
        required: true,
        choices: [
          { value: 'market', label: '市场代运营' },
          { value: 'tech', label: '技术服务' },
          { value: 'brand', label: '品牌服务' },
          { value: 'consulting', label: '管理咨询' },
          { value: 'digital', label: '数字化转型' }
        ]
      },
      company: {
        type: 'string',
        label: '客户公司',
        required: true
      },
      featured: {
        type: 'boolean',
        label: '首页推荐',
        def: false
      },
      coverImage: {
        type: 'url',
        label: '封面图片地址',
        required: true,
        help: '推荐 16:9 比例，支持外部链接或对象存储地址'
      },
      summary: {
        type: 'string',
        label: '案例概述',
        textarea: true,
        required: true
      },
      results: {
        type: 'array',
        label: '成果亮点',
        titleField: 'label',
        fields: {
          add: {
            label: {
              type: 'string',
              label: '成果标题',
              required: true
            },
            icon: {
              type: 'string',
              label: 'Font Awesome 图标',
              def: 'fa-check-circle'
            },
            value: {
              type: 'string',
              label: '成果描述',
              textarea: true,
              required: true
            }
          }
        }
      },
      ctaLabel: {
        type: 'string',
        label: 'CTA 按钮文本',
        def: '咨询类似方案'
      },
      ctaUrl: {
        type: 'url',
        label: 'CTA 链接地址',
        def: '/contact'
      },
      body: {
        type: 'area',
        label: '案例正文内容',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {},
            'react-services-widget': {},
            'react-advantages-widget': {},
            'react-contact-widget': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: '基础信息',
        fields: [ 'title', 'category', 'company', 'featured', 'coverImage', 'summary' ]
      },
      highlights: {
        label: '成果亮点',
        fields: [ 'results' ]
      },
      action: {
        label: '行动与内容',
        fields: [ 'ctaLabel', 'ctaUrl', 'body' ]
      }
    }
  }
};


