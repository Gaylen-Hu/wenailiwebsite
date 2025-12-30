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
      title: {
        type: 'string',
        label: '标题',
        hidden: true,
        searchable: true,
        help: '常见问题的标题'
      },
      // 问题
      question: {
        type: 'string',
        label: '问题',
        required: true,
        searchable: true,
        help: '常见问题的标题'
      },
      answer2: {
        type: 'string',
        label: '答案',
        required: true,
        searchable: true,
        help: '常见问题的答案'
      },
      // 答案
      answer: {
        type: 'area',
        label: '答案',
        hidden: true,
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
          }
        }
      },
      // 分类
      _category: {
        type: 'relationship',
        label: '问题类型',
        withType: 'faq-category',
        max: 1,
        required: true,
        help: '选择问题所属的类型',
        builders: {
          project: {
            title: 1,
            value: 1
          }
        }
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
        fields: [ 'question','answer2', '_category']
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
      _category: {
        label: '问题类型'
      }
    }
  },
  columns: {
    add: {
      question: {
        label: '问题',
        component: 'AposCellBasic'
      },
      _category: {
        label: '问题类型',
        component: 'AposCellRelationship'
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

