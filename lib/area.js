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
       'contact': {}
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
