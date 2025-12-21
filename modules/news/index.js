/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-10 09:29:27
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-19 20:57:09
 * @FilePath: \myapp\apos-app\modules\news\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '新闻资讯',
    pluralLabel: '新闻列表',
  },
  fields: {
    add: {
      category: {
        type: 'select',
        label: '资讯分类',
        required: true,
        choices: [
          { value: 'industry', label: '物流资讯' },
          { value: 'exhibition', label: '展会资讯' },
          { value: 'company', label: '公司新闻' }
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
          // 如果启用了定时发布，则发布时间必填
          if (data.scheduledPublish && !data.publishedAt) {
            return callback('启用定时发布时，发布时间为必填项');
          }
          // 否则发布时间也必填（原有逻辑）
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
        help: '如填写则“阅读全文”会跳转至此链接；否则使用内部详情页'
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
  },
  handlers(self) { 
    return {
      afterSave: {
        async sendEmail(req, piece) {
          const options = {
            from: 'wenailisender@163.com',
            to: 'hxyrkcy@outlook.com',
            subject: 'New Article added'
          };
          try {
            const res = await self.email(req, 'email.html', { piece }, options);
            console.log(res);
          } catch (err) {
            console.log(err);
            self.apos.util.error('email notification error: ', err);
          }
        }
      }
    };
  }
};


