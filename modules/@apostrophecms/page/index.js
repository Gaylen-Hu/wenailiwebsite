/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-17 16:37:26
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-02 19:01:16
 * @FilePath: \wenaili\modules\@apostrophecms\page\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

export default {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      },
      // news-page
      {
        name: 'news-page',  
        label:'新闻列表'
      },
      {
        name: 'case-page',
        label: '案例列表'
      },
      {
        name: 'faq-page',
        label: '常见问题列表'
      },
      {
        name: 'about-page',
        label: '关于我们页面'
      },
      {
        name: 'fixed-page',
        label: '固定页面'
      }
    ]
  }
};
