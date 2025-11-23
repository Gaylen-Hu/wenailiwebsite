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
        type: 'select',
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
      projectPeriod: {
        type: 'string',
        label: '项目周期',
        help: '例如：2025年3月-2025年6月'
      },
      industry: {
        type: 'string',
        label: '行业',
        help: '例如：国际货运代理'
      },
      featured: {
        type: 'boolean',
        label: '首页推荐',
        def: false
      },
      _coverImage: {
        label: '封面图片',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1
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
            'columns': {},
            'project-background': {},
            'project-results': {},
            'brand-upgrade-process': {},
            'brand-visual-showcase': {},
            'project-highlights': {},
            'client-testimonial': {},
            'case-cta': {},
          }
        }
      }
    },
    group: {
      basics: {
        label: '基础信息',
        fields: [ 'title', 'category', 'company', 'projectPeriod', 'industry', 'featured', '_coverImage', 'summary' ]
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
},
  components(self) {
    return {
      async homeShowcase(req, data = {}) {
        const allowedLimits = [ 2, 4 ];
        const numericLimit = Number(data.limit);
        const limit = allowedLimits.includes(numericLimit) ? numericLimit : 2;

        const allowedModes = [ 'featured', 'latest' ];
        const mode = allowedModes.includes(data.mode) ? data.mode : 'featured';

        const category =
          typeof data.category === 'string' && data.category.trim().length
            ? data.category.trim()
            : null;

        const criteria = {};
        if (category) {
          criteria.category = category;
        }

        const baseSort = { updatedAt: -1, createdAt: -1 };
        const categoryLabels = {
          market: '市场代运营',
          tech: '技术服务',
          brand: '品牌服务',
          consulting: '管理咨询',
          digital: '数字化转型'
        };

        const buildCursor = (extraCriteria = {}) =>
          self
            .find(req)
            .and({ ...criteria, ...extraCriteria })
            .sort(baseSort)
            .limit(limit);

        let pieces = [];

        if (mode === 'featured') {
          pieces = await buildCursor({ featured: true }).toArray();

          if (pieces.length < limit) {
            const seenIds = new Set(pieces.map(piece => piece._id));
            const fallbackCursor = await buildCursor().toArray();

            for (const piece of fallbackCursor) {
              if (pieces.length >= limit) {
                break;
              }
              if (!seenIds.has(piece._id)) {
                pieces.push(piece);
                seenIds.add(piece._id);
              }
            }
          }
        } else {
          pieces = await buildCursor().toArray();
        }

        const title =
          typeof data.title === 'string' && data.title.trim().length
            ? data.title.trim()
            : '技术部代运营成功案例';

        const description =
          typeof data.description === 'string' && data.description.trim().length
            ? data.description.trim()
            : '看看我们如何帮助货代企业提升 IT 系统性能和运营效率';

        const resolveCoverImage = (piece) => {
          const attachment = self.apos.image.first(piece._coverImage);
          if (!attachment) {
            return {
              attachment: null,
              url: null,
              alt: null
            };
          }

          const url = self.apos.attachment.url(attachment, { size: 'max' });
          const alt = attachment._alt || piece.title || piece.company || '案例封面';

          return {
            attachment,
            url,
            alt
          };
        };

        const mappedPieces = pieces.map(piece => {
          const results = Array.isArray(piece.results)
            ? piece.results
                .filter(item => item && (item.label || item.value))
                .slice(0, 3)
                .map(item => ({
                  icon: (() => {
                    const raw = (item.icon && item.icon.trim()) || '';
                    if (!raw.length) {
                      return 'fa-solid fa-check-circle';
                    }
                    return raw.includes('fa-') && raw.includes(' ')
                      ? raw
                      : `fa-solid ${raw}`;
                  })(),
                  label: item.label || '',
                  value: item.value || ''
                }))
            : [];

          const cover = resolveCoverImage(piece);

          return {
            _id: piece._id,
            title: piece.title,
            company: piece.company,
            category: piece.category,
            categoryLabel: categoryLabels[piece.category] || piece.category || '',
            summary: piece.summary,
            _coverImageAttachment: cover.attachment,
            coverImageUrl: cover.url,
            coverImageAlt: cover.alt,
            results,
            ctaLabel: piece.ctaLabel || '咨询类似方案',
            ctaUrl: piece.ctaUrl || '/contact'
          };
        });

        return {
          title,
          description,
          pieces: mappedPieces,
          categoryLabels,
          limit
        };
      }
    };
  }
};


