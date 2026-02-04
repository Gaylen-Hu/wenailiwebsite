export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '新闻资讯页面',
    pieceModuleName: 'news',
    perPage: 9
  },
  fields: {
    add: {
      heroTitle: {
        type: 'string',
        label: '顶部标题',
        required: true,
        def: '行业资讯'
      },
      heroSubtitle: {
        type: 'string',
        label: '顶部副标题',
        textarea: true,
        def: '了解最新的货代物流行业动态和运营趋势'
      },
      heroBackground: {
        type: 'url',
        label: '顶部背景图',
        def: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=logistics%20industry%2C%20global%20business%2C%20digital%20technology&sign=cc7d4ebd5e25e176303e843b82c730b8'
      },
      searchPlaceholder: {
        type: 'string',
        label: '搜索框占位文本',
        def: '搜索资讯...'
      },
      filters: {
        type: 'array',
        label: '分类筛选按钮',
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
              label: '对应分类值（与新闻分类一致，可留空表示全部）'
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
          { label: '物流资讯', value: 'industry' },
          { label: '展会资讯', value: 'exhibition' },
          { label: '公司新闻', value: 'company' }
        ]
      },
      popularTitle: {
        type: 'string',
        label: '热门资讯标题',
        def: '热门资讯'
      },
      popularItems: {
        type: 'array',
        label: '热门资讯（可选）',
        titleField: 'title',
        fields: {
          add: {
            title: {
              type: 'string',
              label: '标题',
              required: true
            },
            image: {
              type: 'url',
              label: '缩略图',
              required: true
            },
            url: {
              type: 'string',
              label: '链接'
            },
            publishedAt: {
              type: 'date',
              label: '日期'
            }
          }
        }
      },
      subscribeTitle: {
        type: 'string',
        label: '订阅标题',
        def: '订阅我们的行业资讯通讯'
      },
      subscribeDescription: {
        type: 'string',
        label: '订阅描述',
        textarea: true,
        def: '定期获取最新的货代物流行业动态、运营趋势和公司新闻，帮助您更好地了解行业发展。'
      },
      subscribeButtonLabel: {
        type: 'string',
        label: '订阅按钮文本',
        def: '立即订阅'
      },
      subscribeEndpoint: {
        type: 'string',
        label: '订阅提交地址',
        def: ''
      }
    },
    group: {
      hero: {
        label: '顶部区域',
        fields: [ 'heroTitle', 'heroSubtitle', 'heroBackground', 'searchPlaceholder' ]
      },
      filter: {
        label: '分类筛选',
        fields: [ 'filters' ]
      },
      sidebar: {
        label: '侧边栏',
        fields: [ 'popularTitle', 'popularItems', 'subscribeTitle', 'subscribeDescription', 'subscribeButtonLabel', 'subscribeEndpoint' ]
      }
    }
  },
  handlers(self) {
    return {
      async beforeIndex(req) {
        const cursor = req.data.cursor;
        const searchTerm = self.apos.launder.string(req.query.q);
        const category = self.apos.launder.string(req.query.category);
        const tag = self.apos.launder.string(req.query.tag);
        const highlightOnly = self.apos.launder.boolean(req.query.highlight);

        req.data.query = {
          q: searchTerm || '',
          category: category || '',
          tag: tag || '',
          highlight: highlightOnly ? 'true' : ''
        };

        if (searchTerm) {
          cursor.search(searchTerm);
        }
        if (category) {
          cursor.and({ category });
        }
        if (tag) {
          cursor.and({ 'tags.tag': tag });
        }
        if (highlightOnly) {
          cursor.and({ highlight: true });
        }

        cursor.sort({ publishedAt: -1, createdAt: -1 });

        // 使用缓存获取标签列表
        const cacheKey = 'news:tags:list';
        const cache = self.apos.modules['cache-layer'];

        let availableTags = [];

        if (cache && cache.isConnected) {
          // 尝试从缓存获取
          availableTags = await cache.getOrSet(
            cacheKey,
            async () => {
              // 缓存未命中，从数据库查询
              const tagDocs = await self.apos.modules.news.find(req)
                .project({ tags: 1 })
                .areas(false)
                .toArray();

              const tagSet = new Set();
              for (const doc of tagDocs) {
                if (doc.tags && doc.tags.length) {
                  for (const item of doc.tags) {
                    if (item && item.tag) {
                      tagSet.add(item.tag);
                    }
                  }
                }
              }

              const tags = Array.from(tagSet).sort((a, b) => {
                return String(a).localeCompare(String(b), 'zh-Hans-CN', { sensitivity: 'base' });
              });

              console.log(`[news-page] 标签缓存未命中，已从数据库加载 ${tags.length} 个标签`);
              return tags;
            },
            3600 // 缓存 1 小时
          );

          if (availableTags && availableTags.length > 0) {
            console.log(`[news-page] 标签缓存命中，返回 ${availableTags.length} 个标签`);
          }
        } else {
          // 缓存不可用，直接查询数据库
          const tagDocs = await self.apos.modules.news.find(req)
            .project({ tags: 1 })
            .areas(false)
            .toArray();

          const tagSet = new Set();
          for (const doc of tagDocs) {
            if (doc.tags && doc.tags.length) {
              for (const item of doc.tags) {
                if (item && item.tag) {
                  tagSet.add(item.tag);
                }
              }
            }
          }

          availableTags = Array.from(tagSet).sort((a, b) => {
            return String(a).localeCompare(String(b), 'zh-Hans-CN', { sensitivity: 'base' });
          });
        }

        req.data.availableTags = availableTags;
      }
    };
  }
};


