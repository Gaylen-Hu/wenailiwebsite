export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '常见问题列表页',
    perPage: 50,
    piecesFilters: [
      {
        name: 'category'
      },
      {
        name: 'isFeatured'
      }
    ]
  },
  fields: {
    add: {
      displayCategory: {
        type: 'select',
        label: '显示分类',
        choices: [
          {
            label: '全部',
            value: 'all'
          },
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
        def: 'all'
      },
      showFeaturedFirst: {
        type: 'boolean',
        label: '优先显示推荐问题',
        def: true,
        help: '开启后，推荐问题会显示在列表顶部'
      }
    },
    group: {
      basics: {
        label: '基础设置',
        fields: ['displayCategory', 'showFeaturedFirst']
      }
    }
  },
  extendMethods(self) {
    return {
      indexQuery(_super, req) {
        const query = _super(req);
        
        if (req.query.search) {
          return query.search(req.query.search);
        }
        
        return query;
      },
      filterByIndexPage(_super, query, page) {
        if (page.displayCategory && page.displayCategory !== 'all') {
          query.category(page.displayCategory);
        }
        
        if (page.showFeaturedFirst) {
          query.sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 });
        } else {
          query.sort({ sortOrder: 1, createdAt: -1 });
        }
        
        return query;
      },
      chooseParentPage(_super, pages, piece) {
        if (piece.category && pages.length > 1) {
          const pieceCategory = typeof piece.category === 'string' ? piece.category : 'all';
          return pages.find((page) => page.displayCategory === pieceCategory) || _super(pages, piece);
        }
        return _super(pages, piece);
      }
    };
  }
};

