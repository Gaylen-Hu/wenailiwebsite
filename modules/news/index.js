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
      scheduledPublish: {
        type: 'boolean',
        label: '定时发布',
        def: false,
        help: '启用后，文章将在指定的发布时间自动发布'
      },
      publishedAt: {
        type: 'date',
        label: '发布时间',
        required: function(data, name, object, field, callback) {
          if (data.scheduledPublish && !data.publishedAt) {
            return callback('启用定时发布时，发布时间为必填项');
          }
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
            'columns': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: '基础信息',
        fields: [ 'title', 'category', 'scheduledPublish', 'publishedAt', 'author', '_coverImage', 'excerpt', 'highlight' ]
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
  
  // 添加定时发布方法
  methods(self) {
    return {
      async startScheduledCheck() {
        try {
          // 每小时检查一次（5 * 60 * 1000 毫秒）
          const CHECK_INTERVAL = 60 * 60 * 1000;
          
          console.log('新闻模块：启动定时发布检查，间隔：5分钟');
          
          // 立即执行一次检查（延迟5秒，让服务器完全启动）
          setTimeout(async () => {
            try {
              await self.publishScheduledNews();
            } catch (error) {
              console.error('首次定时发布检查失败:', error);
            }
          }, 5000);
          
          // 设置定时器
          self.scheduleInterval = setInterval(async () => {
            try {
              await self.publishScheduledNews();
            } catch (error) {
              console.error('定时发布检查失败:', error);
            }
          }, CHECK_INTERVAL);
          
          // 确保在应用关闭时清理定时器
          const cleanupInterval = () => {
            if (self.scheduleInterval) {
              clearInterval(self.scheduleInterval);
              self.scheduleInterval = null;
              console.log('新闻模块：已清理定时发布检查定时器');
            }
          };
          
          // 使用 once 确保只执行一次，避免重复注册
          process.once('SIGTERM', cleanupInterval);
          process.once('SIGINT', cleanupInterval);
          process.once('exit', cleanupInterval);
          
          console.log('新闻模块：定时发布检查服务已成功启动');
        } catch (error) {
          console.error('新闻模块：启动定时检查失败:', error);
        }
      },
        // 停止定时检查
        stopScheduledCheck() {
          if (self.scheduleInterval) {
            clearInterval(self.scheduleInterval);
            self.scheduleInterval = null;
            console.log('新闻模块：定时发布检查已停止');
          }
        },
        
      // 简化版：发布定时文章
      async publishScheduledNews() {
        try {
          const req = self.apos.task.getReq();
          const now = new Date();
          
          // 使用标准的 find 方法，不重写它
          const scheduledPieces = await self.find(req, {
            scheduledPublish: true,
            publishedAt: { $lte: now },
            aposMode: 'draft',
            archived: { $ne: true }
          }).toArray();
          
          if (scheduledPieces.length === 0) {
            console.log(`没有需要发布的文章`);
            return;
          }
          
          console.log(`找到 ${scheduledPieces.length} 篇文章`);
          
          let publishedCount = 0;
          
          for (const piece of scheduledPieces) {
            try {
              await self.update(req, {
                ...piece,
                aposMode: 'published'
              });
              
              publishedCount++;
              console.log(`✓ 已发布: ${piece.title}`);
              
            } catch (error) {
              console.error(`发布失败: ${piece.title}`, error.message);
            }
          }
          
          console.log(`完成，发布 ${publishedCount} 篇文章`);
          
        } catch (error) {
          console.error('定时发布失败:', error);
        }
      }
    };
  },

  tasks(self) {
    return {
      // 简化的命令行任务
      publishScheduled: {
        usage: '手动发布定时文章\n用法: node app news:publishScheduled',
        async task(argv) {
          await self.publishScheduledNews();
        }
      }
    };
  },

  
  // 使用 init 方法启动定时任务（更简单的方式）
  async init(self) {
    // 使用 setTimeout 延迟启动，确保所有模块都已初始化完成
    setTimeout(async () => {
      try {
        await self.startScheduledCheck();
      } catch (error) {
        console.error('新闻模块：定时发布服务启动失败:', error);
      }
    }, 10000); // 10秒后启动
  },
  
  // 其他方法保持不变...
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

        return {
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
      }
    };
  }
};