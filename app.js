/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-11 18:59:09
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-16 23:43:01
 * @FilePath: \wenaili\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import apostrophe from 'apostrophe';

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
    'basiclayout-widget': {},
    'about-section-widget': {},
    'banner-widget': {},
    'contact-wrap-widget': {},

    // `asset` supports the project's build for client-side assets.
    asset: {},
    news: {},
    "news-page":{},
   'fixed-page':{},
    case:{},
    "case-page":{},
    // use vite for asset bundling and hot module reloading
    '@apostrophecms/vite': {
      options: {
        // 生产环境禁用 HMR，使用静态构建资源
        hmr: process.env.NODE_ENV === 'production' ? false : 'public'
      }
    },
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
  }
});
