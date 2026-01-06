/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-29 23:10:54
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-31 00:12:41
 * @FilePath: \wenaili\modules\faq-page\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: '常见问题列表页',
    perPage: 50,
    piecesFilters: [
      {
        name: 'isFeatured'
      }
    ]
  },
  fields: {
    add: {
     
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
        fields: ['showFeaturedFirst']
      }
    }
  },
  handlers(self) {
    return {
      async beforeIndex(req) {
        const cursor = req.data.cursor;
        
        // 如果URL查询参数中有_category，应用筛选
        if (req.query._category) {
          cursor.and({ _category: req.query._category });
        }
        
        // 如果URL查询参数中有isFeatured，应用筛选
        if (req.query.isFeatured === 'true') {
          cursor.and({ isFeatured: true });
        }
        
        // 如果URL查询参数中有search，应用搜索
        if (req.query.search) {
          cursor.search(req.query.search);
        }
        
        // 根据页面设置排序
        if (req.data.page && req.data.page.showFeaturedFirst) {
          cursor.sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 });
        } else {
          cursor.sort({ sortOrder: 1, createdAt: -1 });
        }
        
        // 加载所有已发布的问题类型，用于视图中的筛选按钮
        req.data.categories = await self.apos.modules['faq-category'].find(req, {
          archived: { $ne: true }
        })
          .project({ _id: 1, title: 1, value: 1, sortOrder: 1 })
          .sort({ sortOrder: 1, createdAt: 1 })
          .toArray();
        
        // 设置语言标识，优先使用 aposLocale，否则使用 URL 检查
        if (req.data.page && req.data.page.aposLocale) {
          const locale = String(req.data.page.aposLocale);
          req.data.isEnglish = locale === 'en' || locale === 'en:published' || locale === 'en:draft' || locale.startsWith('en:');
        } else {
          const rawUrl = (req.data.page && req.data.page._url) || req.url || '/';
          const urlStr = String(rawUrl);
          req.data.isEnglish = urlStr === '/en' || urlStr === '/en/' || urlStr.startsWith('/en/') || urlStr.startsWith('/en?');
        }
      }
    };
  }
};

