export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '品牌视觉展示',
    icon: 'image',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '品牌视觉展示'
      },
      description: {
        type: 'string',
        label: '副标题/描述',
        textarea: true,
        def: '全新的品牌视觉系统，展现达睿贸易的专业形象和国际化视野'
      },
      items: {
        type: 'array',
        label: '展示项目',
        titleField: 'title',
        min: 1,
        max: 10,
        fields: {
          add: {
            imageUrl: {
              type: 'url',
              label: '图片地址',
              required: true,
              help: '推荐 4:3 比例，支持外部链接或对象存储地址'
            },
            imageAlt: {
              type: 'string',
              label: '图片替代文本',
              required: true
            },
            title: {
              type: 'string',
              label: '项目标题',
              required: true
            },
            description: {
              type: 'string',
              label: '项目描述',
              textarea: true,
              required: true
            }
          }
        },
        def: [
          {
            imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=freight%20forwarder%20brand%20logo%20design',
            imageAlt: '达睿贸易新品牌Logo',
            title: '新品牌Logo',
            description: '融合了航运、贸易和全球化元素，简洁有力地传达企业核心业务'
          },
          {
            imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=brand%20visual%20identity%20system',
            imageAlt: '达睿贸易品牌视觉系统',
            title: '品牌视觉系统',
            description: '统一的色彩体系、字体规范和视觉元素应用，确保品牌形象一致性'
          }
        ]
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'title', 'description', 'items' ]
      }
    }
  }
};

