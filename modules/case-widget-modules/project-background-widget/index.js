export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '项目背景',
    icon: 'file-text',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '项目背景'
      },
      imageUrl: {
        type: 'url',
        label: '背景图片地址',
        required: true,
        help: '推荐 16:9 比例，支持外部链接或对象存储地址'
      },
      imageAlt: {
        type: 'string',
        label: '图片替代文本',
        def: '项目背景图片'
      },
      paragraph1: {
        type: 'string',
        label: '第一段描述',
        textarea: true,
        required: true
      },
      paragraph2: {
        type: 'string',
        label: '第二段描述',
        textarea: true,
        required: true
      },
      sloganTitle: {
        type: 'string',
        label: '品牌口号标题',
        def: '"通达全球，睿智服务"'
      },
      sloganDescription: {
        type: 'string',
        label: '品牌口号描述',
        def: '达睿贸易全新品牌口号'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'title', 'paragraph1', 'paragraph2', 'sloganTitle', 'sloganDescription' ]
      },
      media: {
        label: '媒体配置',
        fields: [ 'imageUrl', 'imageAlt' ]
      }
    }
  }
};

