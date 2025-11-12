/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-12 01:20:06
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-12 22:33:15
 * @FilePath: \wenaili\lib\area.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const apostropheWidgets = {
  '@apostrophecms/image': {
    className: 'img-fluid'
  },
  '@apostrophecms/video': {},
  '@apostrophecms/rich-text': {}
};

const area = {
  all: {
    
  },
  columnExpandedGroup: {
    basic: {
      label: '基础工具',
      widgets: {
        image: {},
        'rich-text': {}
      },
      columns: 2
    },
    layout: {
      label: 'Layout Tools',
      widgets: {
      
      },
      columns: 2
    },
    general: {
      label: '主题组件',
      widgets: {
       
      },
      columns: 3
    }
  },
  apos: {
    ...apostropheWidgets
  },
  richText: {
    '@apostrophecms/rich-text': {}
  },
  fullExpandedGroup: {
    layout: {
      label: '布局工具',
      widgets: {
        'basiclayout': {}
      },
      columns: 2
    },
    content: {
      label: '内容组件',
      widgets: {
        'about-section': {},
        'contact-wrap': {},
        'contact-info': {},
        'contact': {},
        'news-showcase': {},
        'services-grid': {},
        'services-process': {},
        'services-contact': {},
        'advantages-grid': {}
      },
      columns: 2
    },
    media: {
      label: '媒体组件',
      widgets: {
        image: {},
        '@apostrophecms/video': {},
      },
      columns: 2
    },
    general: {
      label: '内容组件',
      widgets: {
        '@apostrophecms/rich-text': {},
        '@apostrophecms/image': {},
        '@apostrophecms/video': {},
        'banner': {},
        'news-showcase': {},
        'services-grid': {},
        'services-process': {},
        'services-contact': {},
        'advantages-grid': {}
      },
      columns: 3
    }
  },
  serverExpandedGroup: {
    layout: {
      label: '布局工具',
      widgets: {
        'basiclayout': {}
      },
      columns: 2
    },
    content: {
      label: '内容组件',
      widgets: {
        'services-base': {},
        'services-grid': {},
        'services-process': {},
        'services-contact': {},
        'advantages-grid': {}
      },
      columns: 2
    },
    media: {
      label: '媒体组件',
      widgets: {
        image: {},
        '@apostrophecms/video': {},
      },
      columns: 2
    },
    general: {
      label: '内容组件',
      widgets: {
       '@apostrophecms/rich-text': {},
    '@apostrophecms/image': {},
    '@apostrophecms/video': {},
   
    
      },
      columns: 3
    }
  }
};

export default area;
