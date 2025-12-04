/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-02 14:45:17
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-03 00:12:56
 * @FilePath: \wenaili\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-11 18:59:09
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-02 14:29:05
 * @FilePath: \wenaili\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import apostrophe from 'apostrophe';
import dotenv from 'dotenv';

dotenv.config();
console.log('process.env.NODE_ENV',process.env.NODE_ENV)
console.log('process.env.APOS_BASE_URL',process.env.APOS_BASE_URL)
console.log('process.env.APOS_SECRET',process.env.APOS_SECRET)
console.log('process.env.APOS_BASE_URL',process.env.APOS_BASE_URL)
apostrophe({
  root: import.meta,
  shortName: 'wenaili',
  secret: process.env.APOS_SECRET||'my-app',
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
    '@apostrophecms/sitemap': {},
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
        className: 'bp-rich-text'
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

    'case-widget-modules': { // 案例模块
      options: {
        ignoreNoCodeWarning: true
      }
    },
    // 通用图标选择器模块
    'icon-picker-field': {},
    // 颜色渐变字段模块
    'color-gradient': {},
    // 成绩字段模块
    'grade-field': {},
    // FontAwesome 图标库
    'fontawesome': {},
    // FontAwesome 测试页面
    'fontawesome-test': {},
    // 测试渐变字段模块

    // 为嵌套模块创建别名以便使用简短名称

    'chart-data': {},
    'chart-widget': {},
    'basiclayout-widget': {},
    'about-section-widget': {},
    'banner-widget': {},
    'contact-wrap-widget': {},
    'contact-page-widget': {},
    'columns-widget': {},

    // `asset` supports the project's build for client-side assets.
    asset: {},
    news: {},
    "news-page":{},
   'fixed-page':{},
    case:{},
    "case-page":{},
    faq:{},
    "faq-page":{},
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
    'ai-solutions-widget': {}
  }
});
