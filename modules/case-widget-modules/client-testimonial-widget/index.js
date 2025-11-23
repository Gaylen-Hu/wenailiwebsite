export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '客户评价',
    icon: 'quote-left',
    preview: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        def: '客户评价'
      },
      quote: {
        type: 'string',
        label: '评价内容',
        textarea: true,
        required: true,
        help: '客户的评价文字'
      },
      avatarUrl: {
        type: 'url',
        label: '客户头像地址',
        required: true,
        help: '推荐正方形图片，支持外部链接或对象存储地址'
      },
      avatarAlt: {
        type: 'string',
        label: '头像替代文本',
        def: '客户头像'
      },
      clientName: {
        type: 'string',
        label: '客户姓名',
        required: true
      },
      clientPosition: {
        type: 'string',
        label: '客户职位/公司',
        required: true,
        help: '例如：达睿贸易（上海）有限公司 CEO'
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'title', 'quote', 'avatarUrl', 'avatarAlt', 'clientName', 'clientPosition' ]
      }
    }
  }
};

