export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '常见问题',
    pluralLabel: '常见问题管理',
    i18n: {
      browser: true
    },
    quickCreate: true,
    autopublish: false,
    searchable: true
  },
  fields: {
    add: {
      // 问题
      question: {
        type: 'string',
        label: '问题',
        required: true,
        searchable: true,
        help: '常见问题的标题'
      },
      // 答案
      answer: {
        type: 'area',
        label: '答案',
        required: true,
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'Bold', 'Italic', 'Link', 'Unlink',
                'BulletedList', 'NumberedList',
                'Blockquote'
              ],
              className: 'faq-rich-text'
            },
            '@apostrophecms/image': {
              className: 'faq-image'
            }
          }
        }
      },
      // 分类
      category: {
        type: 'select',
        label: '分类',
        required: true,
        choices: [
          {
            label: '服务相关',
            value: 'service'
          },
          {
            label: '价格相关',
            value: 'pricing'
          },
          {
            label: '技术支持',
            value: 'technical'
          },
          {
            label: '账户相关',
            value: 'account'
          },
          {
            label: '其他',
            value: 'other'
          }
        ],
        def: 'other'
      },
      // 是否推荐
      isFeatured: {
        type: 'boolean',
        label: '推荐问题',
        def: false,
        help: '推荐的问题会在列表页优先显示'
      },
      // 排序
      sortOrder: {
        type: 'integer',
        label: '排序',
        def: 0,
        help: '数字越小越靠前，相同数字按创建时间排序'
      }
    },
    group: {
      basics: {
        label: '基本信息',
        fields: ['title', 'question', 'category']
      },
      content: {
        label: '内容',
        fields: ['answer']
      },
      meta: {
        label: '发布信息',
        fields: ['isFeatured', 'sortOrder']
      }
    }
  },
  filters: {
    add: {
      isFeatured: {
        label: '推荐问题'
      },
      category: {
        label: '分类'
      }
    }
  },
  columns: {
    add: {
      question: {
        label: '问题',
        component: 'AposCellBasic'
      },
      category: {
        label: '分类',
        component: 'AposCellBasic'
      },
      isFeatured: {
        label: '推荐',
        component: 'AposCellBoolean'
      },
      sortOrder: {
        label: '排序',
        component: 'AposCellBasic'
      }
    }
  },
  extendMethods(self) {
    return {
      // 重写title字段，使用question作为title
      async beforeSave(req, piece, options) {
        if (piece.question && !piece.title) {
          piece.title = piece.question;
        }
        return piece;
      }
    };
  }
};

