export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '新闻资讯',
    pluralLabel: '新闻列表',
    managerApiProjection: {
      title: 1,
      category: 1,
      scheduledPublish: 1,
      publishedAt: 1,
      author: 1,
      _coverImage: 1,
      excerpt: 1,
      readUrl: 1,
      tags: 1,
      highlight: 1,
      aposMode: 1,
      archived: 1,
      createdAt: 1,
      updatedAt: 1,
      slug: 1,
      visibility: 1,
      seoTitle: 1,
      seoDescription: 1,
      seoKeywords: 1,
      updatedBy: 1,
      lastPublishedAt: 1
    },
    sort: {
      publishedAt: -1,
      createdAt: -1
    }
  },
  fields: {
    add: {
      category: {
        type: 'select',
        label: '资讯分类',
        required: true,
        choices: [
          { value: 'industry', label: '物流资讯', labelEn: 'Logistics News' },
          { value: 'exhibition', label: '展会资讯', labelEn: 'Exhibition News' },
          { value: 'company', label: '公司新闻', labelEn: 'Company News' }
        ],
        def: 'industry'
      },
      publishedAt: {
        type: 'date',
        label: '发布时间',
        required: function(data, name, object, field, callback) {
          if (!data.publishedAt) {
            return callback('发布时间为必填项');
          }
          return callback(null);
        }
      },
      author: {
        type: 'string',
        label: '作者',
        def: '奈李资讯团队'
      },  
      _coverImage: {
        label: '封面图片',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 1
      },
      excerpt: {
        type: 'string',
        label: '资讯摘要',
        textarea: true,
        required: true
      },
      readUrl: {
        type: 'url',
        label: '外部链接（可选）',
        help: '如填写则"阅读全文"会跳转至此链接；否则使用内部详情页'
      },
      tags: {
        type: 'array',
        label: '标签',
        titleField: 'tag',
        fields: {
          add: {
            tag: {
              type: 'string',
              label: '标签名称',
              required: true
            }
          }
        }
      },
      highlight: {
        type: 'boolean',
        label: '热门资讯',
        def: false
      },
      body: {
        type: 'area',
        label: '正文内容',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {},
            'columns': {},
            'html-content': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: '基础信息',
        fields: [ 'title', 'category', 'publishedAt', 'author', '_coverImage', 'excerpt', 'highlight' ]
      },
      metadata: {
        label: '附加信息',
        fields: [ 'readUrl', 'tags' ]
      },
      content: {
        label: '正文内容',
        fields: [ 'body' ]
      }
    }
  },
  filters: {
    add: {
      aposMode: {
        label: '发布状态',
        choices: [
          { value: 'published', label: '已发布' },
          { value: 'draft', label: '草稿' }
        ]
      }
    }
  },
  
  // 扩展查询构建器以支持发布状态筛选
  queries(self, query) {
    return {
      builders: {
      }
    };
  },
  
  init(self) {
    self.addScheduledPublishingMigration();
  },

  methods(self) {
    return {
      addScheduledPublishingMigration() {
        self.apos.migration.add('wenaili:news-scheduled-publishing-v2', async () => {
          await self.apos.migration.eachDoc({
            type: self.__meta.name,
            scheduledPublish: { $type: 'bool' }
          }, async doc => {
            let scheduledPublish = null;

            if (doc.scheduledPublish && doc.publishedAt) {
              const date = new Date(doc.publishedAt);
              if (!Number.isNaN(date.getTime())) {
                scheduledPublish = date.toISOString();
              }
            }

            await self.apos.doc.db.updateOne({ _id: doc._id }, {
              $set: { scheduledPublish }
            });
          });
        });
      }
    };
  },

  handlers(self) {
    return {
      afterSave: {
        async invalidateHomeShowcase() {
          const cache = self.apos.modules['cache-layer'];
          if (cache?.isConnected) {
            await cache.delPattern('news:home-showcase:*');
          }
        }
      }
    };
  },
  components(self) {
    return {
      async homeShowcase(req, data = {}) {
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
          const alt = attachment._alt || piece.title || '';

          return {
            attachment,
            url,
            alt
          };
        };

        const numericLimit = Number(data.limit);
        const allowedLimits = [3, 6];
        const limit = allowedLimits.includes(numericLimit) ? numericLimit : 3;

        const allowedModes = [ 'latest', 'popular' ];
        const mode = allowedModes.includes(data.mode) ? data.mode : 'latest';

        const category = (typeof data.category === 'string' && data.category.trim().length)
          ? data.category.trim()
          : null;

        const cache = self.apos.modules['cache-layer'];
        const cacheKey = cache?.makeKey(
          'news',
          'home-showcase',
          req.locale || req.data?.locale || 'default',
          JSON.stringify(data)
        );
        if (cacheKey && cache?.canCache(req)) {
          const cached = await cache.get(cacheKey);
          if (cached) return JSON.parse(cached);
        }
        const baseSort = { publishedAt: -1, createdAt: -1 };
        const categoryLabels = {
          industry: '物流资讯',
          exhibition: '展会资讯',
          company: '公司新闻'
        };

        const criteria = {};
        if (category) {
          criteria.category = category;
        }

        let pieces = [];

        if (mode === 'popular') {
          const popularCursor = self.find(req)
            .sort(baseSort)
            .and({ ...criteria, highlight: true })
            .limit(limit);

          pieces = await popularCursor.toArray();

          if (pieces.length < limit) {
            const excludeIds = new Set(pieces.map(piece => piece._id));

            const fallbackCursor = self.find(req)
              .sort(baseSort)
              .and(criteria)
              .limit(limit * 2);

            const fallbackPieces = await fallbackCursor.toArray();
            for (const item of fallbackPieces) {
              if (pieces.length >= limit) {
                break;
              }
              if (!excludeIds.has(item._id)) {
                pieces.push(item);
                excludeIds.add(item._id);
              }
            }
          }
        } else {
          const latestCursor = self.find(req)
            .sort(baseSort)
            .and(criteria)
            .limit(limit);

          pieces = await latestCursor.toArray();
        }

        const title = (typeof data.title === 'string' && data.title.trim().length)
          ? data.title.trim()
          : (mode === 'popular' ? '热门资讯' : '最新资讯');

        const description = (typeof data.description === 'string' && data.description.trim().length)
          ? data.description.trim()
          : '';

        const showMoreUrl = (typeof data.showMoreUrl === 'string' && data.showMoreUrl.trim().length)
          ? data.showMoreUrl.trim()
          : null;

        const buttonLabel = (typeof data.buttonLabel === 'string' && data.buttonLabel.trim().length)
          ? data.buttonLabel.trim()
          : '查看全部资讯';

        pieces = pieces.map(piece => {
          const cover = resolveCoverImage(piece);
          return {
            ...piece,
            _coverImageAttachment: cover.attachment,
            _coverImageUrl: cover.url,
            _coverImageAlt: cover.alt
          };
        });

        const result = {
          pieces,
          mode,
          limit,
          category,
          title,
          description,
          showMoreUrl,
          buttonLabel,
          categoryLabels
        };
        if (cacheKey && cache?.canCache(req)) await cache.set(cacheKey, JSON.stringify(result), 900);
        return result;
      }
    };
  }
};
