export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '关于我们区块',
    icon: 'id-card',
    preview: true
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '关于我们'
      },
      subheading: {
        type: 'string',
        label: '副标题说明',
        textarea: true,
        def: ''
      },
      heroTitle: {
        type: 'string',
        label: '主标题',
        textarea: true,
        def: '10年专注货代运营服务<br>值得信赖的货代增长战略伙伴'
      },
      descriptionPrimary: {
        type: 'string',
        label: '主要描述',
        textarea: true,
        def: '上海奈李信息技术有限公司（简称：奈李，英文：Wenaili）是一家专注于为物流货代公司提供市场部及技术部代运营服务的专业机构。凭借10年的货代行业经验和专业团队，服务合作客户50+，我们已经成为众多货代企业信赖的合作伙伴。'
      },
      descriptionSecondary: {
        type: 'string',
        label: '次要描述',
        textarea: true,
        def: '我们的服务涵盖市场策划、品牌推广、获客转化、网站建设、系统开发等多个领域，为货代企业提供全方位的运营支持，帮助他们提升品牌影响力和业务增长。'
      },
      imageUrl: {
        type: 'string',
        label: '右侧/左侧主图链接',
        textarea: true,
        def: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=freight%20forwarding%20business%20team%2C%20office%20environment%2C%20professional%20operation%20team&sign=7603482b21435acc82da94fa7868cfd0'
      },
      imageAlt: {
        type: 'string',
        label: '主图替代文本',
        def: '关于我们 - 专业的物流货代运营团队'
      },
      stats: {
        type: 'array',
        label: '统计信息',
        titleField: 'label',
        min: 1,
        max: 4,
        def: [
          { value: '10+', label: '行业经验', duration: 2000 },
          { value: '50+', label: '合作客户', duration: 2200 },
          { value: '30+', label: '覆盖城市', duration: 2000 },
          { value: '99.8%', label: '客户满意度', duration: 2400 }
        ],
        fields: {
          add: {
            value: {
              type: 'string',
              label: '数值',
              required: true
            },
            label: {
              type: 'string',
              label: '说明',
              required: true
            },
            duration: {
              type: 'integer',
              label: '动画时长（毫秒）',
              def: 2000,
              min: 0
            }
          }
        }
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [
          'heading',
          'subheading',
          'heroTitle',
          'descriptionPrimary',
          'descriptionSecondary',
          'stats'
        ]
      },
      media: {
        label: '媒体配置',
        fields: [ 'imageUrl', 'imageAlt' ]
      }
    }
  }
};
