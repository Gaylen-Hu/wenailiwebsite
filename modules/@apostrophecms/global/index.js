import linkSchema from '../../../lib/linkSchema.js';
import buttonSchema from '../../../lib/buttonSchema.js';

export default {
  helpers(self) {
    return {
      linkPath(item) {
        if (!item) return '#';
        
        if (item.linkType === 'page' && item._linkPage && item._linkPage[0]) {
          return item._linkPage[0]._url;
        } else if (item.linkType === 'file' && item._linkFile && item._linkFile[0]) {
          return item._linkFile[0]._url;
        } else if (item.linkType === 'custom' && item.linkUrl) {
          return item.linkUrl;
        }
        
        return '#';
      }
    };
  },
  fields: {
    add: {
      logo: {
        label: 'logo',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      title: {
        type: 'string',
        label: '网站标题',
        required: true
      },
      detail: {
        type: 'string',
        label: '详情',
        required: true,
        help: '公司简短介绍'
      },
      // 邮箱
      email: {
        type: 'string',
        label: '邮箱',
        required: true
      },
      // 电话
      phone: {
        type: 'string',
        label: '电话',
        required: true
      },
      // 地址
      address: {
        type: 'string',
        label: '地址',
        required: true
      },

      workTime: {
        type: 'string',
        label: '工作时间',
        required: true
      },
      // 版权
      copyright: {
        type: 'string',
        label: '版权',
        required: true
      },
      // 备
      filingNumber: {
        type: 'string',
        label: '备案号',
        required: true
      },
      // 备案号
      headerBtns: {
        label: '头部按钮',
        type: 'array',
        titleField: 'linkText',
        limit: 1,
        fields: {
          add: {
            ...buttonSchema.button
          }
        }
      },
      headerNav: {
        label: '头部导航项目',
        type: 'array',
        titleField: 'linkText',
        limit: 8,
        fields: {
          add: {
            ...linkSchema,
            hasSubmenu: {
              label: '有子菜单',
              type: 'boolean',
              def: false
            },
            submenuItems: {
              label: '子菜单项目',
              type: 'array',
              titleField: 'linkText',
              fields: {
                add: {
                  ...linkSchema
                }
              },
              if: {
                hasSubmenu: true
              }
            },
            badge: {
              label: '徽章文本',
              type: 'string',
              help: '可选徽章文本，显示在链接旁边'
            }
          }
        }
      },
      footerNavtitle: {
        label: '底部导航项目标题',
        type: 'string',
        required: true
      },
      footerNav: {
        label: '底部导航项目',
        type: 'array',
        titleField: 'linkText',
        limit: 5,
        fields: {
          add: {
            ...linkSchema
          }
        }
      },
      productCategories: {
        label: '产品分类',
        type: 'array',
        titleField: 'linkText',
        limit: 8,
        fields: {
          add: {
            ...linkSchema
          }
        }
      },

      footerNav2title: {
        label: '底部导航项目2标题',
        type: 'string',
        required: true
      },

      footerNav2: {
        label: '底部导航项目2',
        type: 'array',
        titleField: 'linkText',
        limit: 5,
        fields: {
          add: {
            ...linkSchema
          }
        }
      },
      social: {
        label: '社交媒体账户',
        type: 'array',
        limit: 5,
        inline: true,
        fields: {
          add: {
            link: {
              type: 'url',
              label: '社交媒体链接',
              required: true
            },
            icon: {
              label: '图标',
              type: 'select',
              required: true,
              choices: [
                {
                  label: 'Instagram',
                  value: 'instagram'
                },
                {
                  label: 'Facebook',
                  value: 'facebook'
                },
                {
                  label: 'Twitter',
                  value: 'twitter'
                },
                {
                  label: 'LinkedIn',
                  value: 'linkedin'
                }
              ]
            }
          }
        }
      },
      // 统计代码设置
      analytics: {
        label: '网站统计代码',
        type: 'object',
        fields: {
          add: {
            googleAnalytics: {
              type: 'string',
              label: 'Google Analytics 跟踪ID',
              help: '例如: G-XXXXXXXXXX 或 UA-XXXXXXXXX-X',
              placeholder: 'G-XXXXXXXXXX'
            },
            googleAnalytics4: {
              type: 'string',
              label: 'Google Analytics 4 测量ID',
              help: '例如: G-XXXXXXXXXX',
              placeholder: 'G-XXXXXXXXXX'
            },
            baiduAnalytics: {
              type: 'string',
              label: '百度统计 跟踪ID',
              help: '例如: 12345678',
              placeholder: '12345678'
            },
            baiduAnalyticsCode: {
              type: 'string',
              label: '百度统计代码',
              textarea: true,
              help: '完整的百度统计代码（包含script标签）',
              placeholder: '<script>var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?您的统计代码";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm, s);})();</script>'
            },
            customHeadCode: {
              type: 'string',
              label: '自定义头部代码',
              textarea: true,
              help: '添加到页面<head>标签中的自定义代码（如其他统计代码、验证代码等）',
              placeholder: '<!-- 自定义头部代码 -->'
            },
            customBodyCode: {
              type: 'string',
              label: '自定义底部代码',
              textarea: true,
              help: '添加到页面</body>标签前的自定义代码',
              placeholder: '<!-- 自定义底部代码 -->'
            }
          }
        }
      }
    },
    group: {
      brand: {
        label: '品牌',
        fields: [ 'title', 'logo', 'detail', 'social' ]
      },
      navigations: {
        label: '导航',
        fields: [ 'headerNav', 'footerNavtitle', 'footerNav', 'footerNav2title', 'footerNav2', 'productCategories', 'headerBtns' ]
      },
      basics: {
        label: '基础',
        fields: [ 'email', 'phone', 'address', 'copyright', 'filingNumber' ]
      },
      analytics: {
        label: '统计代码',
        fields: [ 'analytics' ]
      }
    }
  }
};
