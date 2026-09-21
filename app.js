/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-02 14:45:17
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2026-01-06 11:18:57
 * @FilePath: \wenaili\app.js
 * @Description: 鏉╂瑦妲告妯款吇鐠佸墽鐤?鐠囩柉顔曠純鐢ustomMade`, 閹垫挸绱慿oroFileHeader閺屻儳婀呴柊宥囩枂 鏉╂稖顢戠拋鍓х枂: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-11 18:59:09
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-02 14:29:05
 * @FilePath: \wenaili\app.js
 * @Description: 鏉╂瑦妲告妯款吇鐠佸墽鐤?鐠囩柉顔曠純鐢ustomMade`, 閹垫挸绱慿oroFileHeader閺屻儳婀呴柊宥囩枂 鏉╂稖顢戠拋鍓х枂: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import apostrophe from 'apostrophe';
import dotenv from 'dotenv';

// Local development overrides stay out of git and take precedence over .env.
dotenv.config({ path: [ '.env.local', '.env' ] });

const isProduction = process.env.NODE_ENV === 'production';
const appSecret = process.env.APOS_SECRET || (
  isProduction ? undefined : 'development-only-app-secret'
);

if (!appSecret) {
  throw new Error('APOS_SECRET must be set in production.');
}

apostrophe({
  root: import.meta,
  shortName: 'wenaili',
  secret: appSecret,
  baseUrl: process.env.APOS_BASE_URL || 'http://localhost:3000',
  nestedModuleSubdirs: true,
  modules: {
   
    // Apostrophe module configuration
    // *******************************
    //
    // NOTE: most configuration occurs in the respective modules' directories.
    // See modules/@apostrophecms/page/index.js for an example.
    //
    // Any modules that are not present by default in Apostrophe must at least
    // have a minimal configuration here to turn them on: `moduleName: {}`
    // ***********************************************************************
    // `className` options set custom CSS classes for Apostrophe core widgets.
    '@apostrophecms/favicon': {},
    '@apostrophecms/sitemap': {
      options: {
        // Generate off-request during deployment, then serve the cached XML.
        cacheLifetime: 24 * 60 * 60,
        piecesPerBatch: 500
      }
    },
    '@apostrophecms/seo': {},
    '@apostrophecms/global': {
      options: {
        seoGoogleAnalytics: true,
        seoGoogleTagManager: true,
        seoGoogleVerification: true
      }
    },
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'bp-rich-text',
        defaultOptions: {
          toolbar: [
            'styles',
            '|',
            'bold',
            'italic',
            'underline',
            'strike',
            '|',
            'blockquote',
            'bulletList',
            'orderedList',
            '|',
            'alignLeft',
            'alignCenter',
            'alignRight',
            '|',
            'link',
            'anchor',
            'image',
            'horizontalRule'
          ],
          styles: [
            {
              tag: 'p',
              label: '正文'
            },
            {
              tag: 'p',
              label: '导语',
              class: 'article-lead'
            },
            {
              tag: 'p',
              label: '提示框',
              class: 'article-note'
            },
            {
              tag: 'h2',
              label: '二级标题'
            },
            {
              tag: 'h3',
              label: '三级标题'
            },
            {
              tag: 'h4',
              label: '四级标题'
            },
            {
              tag: 'span',
              label: '品牌强调',
              class: 'article-highlight'
            }
          ],
          insert: [
            'image',
            'table',
            'horizontalRule'
          ]
        },
        imageStyles: [
          {
            value: 'article-image-wide',
            label: '通栏图片'
          },
          {
            value: 'article-image-center',
            label: '居中图片'
          },
          {
            value: 'article-image-float-left',
            label: '左侧环绕'
          },
          {
            value: 'article-image-float-right',
            label: '右侧环绕'
          }
        ],
        linkWithType: [
          '@apostrophecms/any-page-type',
          'news',
          'case'
        ]
      }
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'bp-image-widget'
      }
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'bp-video-widget'
      }
    },

    'case-widget-modules': { // 濡楀牅绶ュΟ鈥虫健
      options: {
        ignoreNoCodeWarning: true
      }
    },
    // 闁氨鏁ら崶鐐垼闁瀚ㄩ崳銊δ侀敓?
    'icon-picker-field': {},
    // 妫版粏澹婂〒鎰綁鐎涙顔屽Ο鈥虫健
    'color-gradient': {},
    // 閹存劗鍝楃€涙顔屽Ο鈥虫健
    'grade-field': {},
    // FontAwesome 閸ョ偓鐖ｉ敓?
    // 'fontawesome': {},
    // // FontAwesome 濞村鐦い鐢告桨
    // 'fontawesome-test': {},
    // 濞村鐦〒鎰綁鐎涙顔屽Ο鈥虫健

    // 娑撳搫绁垫總妤伳侀崸妤€鍨卞鍝勫焼閸氬秳浜掓笟澶稿▏閻劎鐣濋惌顓炴倳閿?

    'chart-data': {},
    'chart-widget': {},
    'basiclayout-widget': {},
    'about-section-widget': {},
    'banner-widget': {},
    'contact-wrap-widget': {},
    'contact-page-widget': {},
    'columns-widget': {},
    'html-content-widget': {},

    // `asset` supports the project's build for client-side assets.
    asset: {},
    // Redis 缂傛挸鐡ㄩ敓?- 閻劋绨导妯哄閺屻儴顕楅幀褑鍏?
    'cache-layer': {},
    news: {},
    "news-page":{},
    'llms-txt': {},
   'fixed-page':{},
    'json-ld': {},
    'seo-enhanced': {},
    'security-headers': {},
    'robots-txt': {},
    'legacy-doc-audit': {},
    'legacy-redirects': {},
    case:{},
    "case-page":{},
    faq:{},
    "faq-page":{},
    'faq-category': {},
    "about-page":{},
    // use vite for asset bundling and hot module reloading
    '@apostrophecms/vite': {},
    // The project's first custom page type.
    'default-page': {},
    'news-showcase-widget': {},
    'services-grid-widget': {},
    'advantages-grid-widget': {},
    "services-base-widget":{},
    "services-process-widget":{},
    "services-contact-widget":{},
    "service-content-widget":{},
    "tech-importance-widget":{},
    "case-showcase-widget":{},
    "brand-importance-widget":{},
    "data-visualization-widget":{},
    "data-assets-widget":{},
    "data-visualization-management-widget":{},
    "growth-partner-widget":{},
    "differentiation-widget":{},
    "why-choose-widget":{},
    'freight-forwarding-hero-widget': {},
    'ai-solutions-widget': {},
    // student:{}
  }
});

