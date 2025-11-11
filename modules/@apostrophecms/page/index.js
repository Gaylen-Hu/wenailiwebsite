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
        name: 'fixed-page',
        label: '固定页面'
      }
    ]
  }
};
