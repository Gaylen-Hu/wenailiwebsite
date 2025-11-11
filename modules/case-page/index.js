export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '案例列表页面',
    pieceModuleName: 'case',
    perPage: 9
  },
  fields: {
    add: {
      heroTitle: {
        type: 'string',
        label: '顶部标题',
        required: true,
        def: '成功案例'
      },
      heroSubtitle: {
        type: 'string',
        label: '顶部副标题',
        textarea: true,
        def: '我们如何帮助货代企业提升运营效率和业务增长'
      },
      filterLabel: {
        type: 'string',
        label: '筛选区标题',
        def: '案例分类'
      },
      filters: {
        type: 'array',
        label: '分类按钮',
        titleField: 'label',
        fields: {
          add: {
            label: {
              type: 'string',
              label: '按钮文本',
              required: true
            },
            value: {
              type: 'string',
              label: '对应分类值（与案例分类选项一致，可留空表示全部）'
            },
            primary: {
              type: 'boolean',
              label: '默认高亮',
              def: false
            }
          }
        },
        def: [
          { label: '全部', value: '', primary: true },
          { label: '市场代运营', value: 'market' },
          { label: '技术服务', value: 'tech' },
          { label: '品牌服务', value: 'brand' },
          { label: '管理咨询', value: 'consulting' },
          { label: '数字化转型', value: 'digital' }
        ]
      },
      testimonialTitle: {
        type: 'string',
        label: '客户评价标题',
        def: '客户评价'
      },
      testimonialDescription: {
        type: 'string',
        label: '客户评价描述',
        textarea: true,
        def: '听听我们的客户怎么说，他们的成功就是我们最大的成就。'
      },
      testimonialCards: {
        type: 'array',
        label: '客户评价卡片',
        titleField: 'name',
        fields: {
          add: {
            name: {
              type: 'string',
              label: '姓名',
              required: true
            },
            title: {
              type: 'string',
              label: '职位/公司',
              required: true
            },
            avatar: {
              type: 'url',
              label: '头像地址'
            },
            quote: {
              type: 'string',
              label: '评价内容',
              textarea: true,
              required: true
            }
          }
        }
      },
      partnerTitle: {
        type: 'string',
        label: '合作伙伴标题',
        def: '合作货代企业'
      },
      partnerDescription: {
        type: 'string',
        label: '合作伙伴描述',
        textarea: true,
        def: '我们已为多家物流货代公司提供运营服务，帮助他们提升品牌影响力和业务增长'
      },
      partners: {
        type: 'array',
        label: '合作伙伴列表',
        titleField: 'name',
        fields: {
          add: {
            name: {
              type: 'string',
              label: '企业名称',
              required: true
            }
          }
        }
      },
      ctaTitle: {
        type: 'string',
        label: '底部 CTA 标题',
        def: '准备好提升您的货代企业运营效率了吗？'
      },
      ctaDescription: {
        type: 'string',
        label: '底部 CTA 描述',
        textarea: true,
        def: '联系我们，获取为您量身定制的货代企业运营解决方案'
      },
      ctaLabel: {
        type: 'string',
        label: 'CTA 按钮文本',
        def: '立即咨询'
      },
      ctaUrl: {
        type: 'url',
        label: 'CTA 按钮链接',
        def: '/contact'
      }
    },
    group: {
      hero: {
        label: '顶部区域',
        fields: [ 'heroTitle', 'heroSubtitle' ]
      },
      filter: {
        label: '分类筛选',
        fields: [ 'filterLabel', 'filters' ]
      },
      testimonials: {
        label: '客户评价',
        fields: [ 'testimonialTitle', 'testimonialDescription', 'testimonialCards' ]
      },
      partners: {
        label: '合作伙伴',
        fields: [ 'partnerTitle', 'partnerDescription', 'partners' ]
      },
      cta: {
        label: '底部 CTA',
        fields: [ 'ctaTitle', 'ctaDescription', 'ctaLabel', 'ctaUrl' ]
      }
    }
  },
  handlers(self) {
    return {
      async beforeIndex(req) {
        const cursor = req.data.cursor;
        const category = self.apos.launder.string(req.query.category);
        const featuredOnly = self.apos.launder.boolean(req.query.featured);

        req.data.query = {
          category: category || '',
          featured: featuredOnly ? 'true' : ''
        };

        if (category) {
          cursor.and({ category });
        }
        if (featuredOnly) {
          cursor.and({ featured: true });
        }

        cursor.sort({ featured: -1, createdAt: -1 });
      }
    };
  }
};


