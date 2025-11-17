export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '数据资产建设',
    icon: 'chart-pie',
    description: '展示数据资产建设的官网与媒体矩阵方案。'
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '数据资产建设'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '帮助货代企业建立全面的数据资产，提升品牌影响力和市场竞争力'
      },
      websiteSection: {
        type: 'object',
        label: '官网建设',
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-globe'
            },
            iconBackgroundClass: {
              type: 'string',
              label: '图标背景类名',
              def: 'bg-blue-100'
            },
            iconColorClass: {
              type: 'string',
              label: '图标颜色类名',
              def: 'text-blue-600'
            },
            title: {
              type: 'string',
              label: '标题',
              def: '中英文官方网站搭建'
            },
            description: {
              type: 'string',
              label: '描述',
              textarea: true,
              def: '建设专业的中英文官方网站，提升企业品牌形象，吸引国内外客户'
            },
            cards: {
              type: 'array',
              label: '展示卡片',
              titleField: 'title',
              def: [
                {
                  title: '中文网站',
                  image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=chinese%20freight%20forwarder%20website%20design%2C%20professional%20interface%2C%20chinese%20content&sign=9ba304b57ec55b178bf9aa8aa6857581',
                  alt: '中文网站设计'
                },
                {
                  title: '中文网站详情页',
                  image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=chinese%20logistics%20website%20service%20page%2C%20professional%20design%2C%20detailed%20service%20information&sign=7409efd2d37db7932d5432ef5770d8a8',
                  alt: '中文网站详情页'
                },
                {
                  title: '英文网站',
                  image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=english%20freight%20forwarder%20website%20design%2C%20professional%20interface%2C%20english%20content&sign=3761b4e059a01a271f5cee3d7530c1b2',
                  alt: '英文网站'
                },
                {
                  title: '英文网站详情页',
                  image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=english%20logistics%20website%20service%20page%2C%20international%20design%2C%20global%20business%20content&sign=74def57747d7645208a382cc2b0028e3',
                  alt: '英文网站详情页'
                }
              ],
              fields: {
                add: {
                  title: {
                    type: 'string',
                    label: '卡片标题',
                    required: true
                  },
                  image: {
                    type: 'url',
                    label: '图片地址',
                    required: true
                  },
                  alt: {
                    type: 'string',
                    label: '图片描述'
                  }
                }
              }
            }
          }
        }
      },
      mediaSection: {
        type: 'object',
        label: '媒体矩阵',
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-share-alt'
            },
            iconBackgroundClass: {
              type: 'string',
              label: '图标背景类名',
              def: 'bg-blue-100'
            },
            iconColorClass: {
              type: 'string',
              label: '图标颜色类名',
              def: 'text-blue-600'
            },
            title: {
              type: 'string',
              label: '标题',
              def: '国内外媒体矩阵搭建'
            },
            description: {
              type: 'string',
              label: '描述',
              textarea: true,
              def: '构建全面的媒体矩阵，覆盖国内外主流平台，扩大品牌影响力'
            },
            domesticTitle: {
              type: 'string',
              label: '国内平台标题',
              def: '国内媒体平台'
            },
            domesticPlatforms: {
              type: 'array',
              label: '国内平台列表',
              titleField: 'name',
              def: [
                { name: '微信公众号', iconClass: 'fa-brands fa-weixin' },
                { name: '百家号', iconClass: 'fa-brands fa-pen-fancy' },
                { name: '头条号', iconClass: 'fa-brands fa-newspaper' },
                { name: '知乎号', iconClass: 'fa-brands fa-question-circle' },
                { name: '搜狐号', iconClass: 'fa-brands fa-fire' },
                { name: '百度知道', iconClass: 'fa-brands fa-search' },
                { name: '知乎问答', iconClass: 'fa-brands fa-comments' },
                { name: '抖音视频号', iconClass: 'fa-brands fa-video' },
                { name: '快手', iconClass: 'fa-brands fa-bolt' },
                { name: '小红书', iconClass: 'fa-brands fa-bookmark' }
              ],
              fields: {
                add: {
                  name: {
                    type: 'string',
                    label: '平台名称',
                    required: true
                  },
                  iconClass: {
                    type: 'string',
                    label: '图标类名',
                    def: 'fa-solid fa-star'
                  }
                }
              }
            },
            overseasTitle: {
              type: 'string',
              label: '国外平台标题',
              def: '国外媒体平台'
            },
            overseasPlatforms: {
              type: 'array',
              label: '国外平台列表',
              titleField: 'name',
              def: [
                { name: 'LinkedIn', iconClass: 'fa-brands fa-linkedin' },
                { name: 'Facebook', iconClass: 'fa-brands fa-facebook' },
                { name: 'X', iconClass: 'fa-brands fa-twitter' },
                { name: 'YouTube', iconClass: 'fa-brands fa-youtube' },
                { name: 'TikTok', iconClass: 'fa-brands fa-music' },
                { name: 'Instagram', iconClass: 'fa-brands fa-instagram' }
              ],
              fields: {
                add: {
                  name: {
                    type: 'string',
                    label: '平台名称',
                    required: true
                  },
                  iconClass: {
                    type: 'string',
                    label: '图标类名',
                    def: 'fa-solid fa-globe'
                  }
                }
              }
            }
          }
        }
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'heading', 'subheading', 'websiteSection', 'mediaSection' ]
      }
    }
  }
};


