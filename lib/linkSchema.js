const link = {
  linkText: {
    label: '链接文字',
    type: 'string'
  },
  linkType: {
    label: '链接类型',
    type: 'select',
    choices: [
      {
        label: '页面',
        value: 'page'
      },
      {
        label: '文件',
        value: 'file'
      },
      {
        label: '自定义URL',
        value: 'custom'
      }
    ]
  },
  _linkPage: {
    label: '链接页面',
    type: 'relationship',
    withType: '@apostrophecms/page',
    max: 1,
    builders: {
      project: {
        type: '@apostrophecms/page',
        title: 1,
        _url: 1
      }
    },
    if: {
      linkType: 'page'
    }
  },
  _linkFile: {
    label: '链接文件',
    type: 'relationship',
    withType: '@apostrophecms/file',
    max: 1,
    if: {
      linkType: 'file'
    }
  },
  linkUrl: {
    label: '自定义链接URL',
    type: 'url',
    if: {
      linkType: 'custom'
    }
  },
  linkTarget: {
    label: '链接目标',
    type: 'checkboxes',
    choices: [
      {
        label: '在新窗口打开',
        value: '_blank'
      }
    ]
  },
  ariaLabel: {
    label: 'ARIA标签',
    type: 'string',
    help: '用于屏幕阅读器和SEO'
  }
};

export default link;
