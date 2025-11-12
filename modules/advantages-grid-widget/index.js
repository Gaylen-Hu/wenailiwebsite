/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-12 22:32:58
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-12 22:32:59
 * @FilePath: \wenaili\modules\advantages-grid-widget\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '服务优势',
    icon: 'star',
    preview: true
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '我们的服务优势'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '选择奈李的服务，您的货代企业将获得专业、高效、全面的运营支持，帮助您提升品牌影响力，优化业务流程，实现业务增长。'
      },
      items: {
        type: 'array',
        label: '优势卡片',
        titleField: 'title',
        min: 1,
        max: 6,
        def: [
          {
            title: '行业经验',
            description: '10年专注货代行业，熟悉行业痛点和发展趋势。',
            iconClass: 'fa-solid fa-rocket'
          },
          {
            title: '专业团队',
            description: '由经验丰富的市场和技术专家组成的专业团队。',
            iconClass: 'fa-solid fa-user-tie'
          },
          {
            title: '定制方案',
            description: '根据企业实际情况，量身定制运营解决方案。',
            iconClass: 'fa-solid fa-sliders'
          },
          {
            title: '全程支持',
            description: '提供7×24小时客户服务，及时解决运营问题。',
            iconClass: 'fa-solid fa-message'
          }
        ],
        fields: {
          add: {
            iconClass: {
              type: 'string',
              label: '图标类名',
              def: 'fa-solid fa-rocket',
              help: '请输入 Font Awesome 图标类，例如：fa-solid fa-rocket'
            },
            title: {
              type: 'string',
              label: '优势标题',
              required: true
            },
            description: {
              type: 'string',
              label: '优势描述',
              textarea: true,
              required: true
            },
            highlight: {
              type: 'boolean',
              label: '高亮显示',
              def: false
            }
          }
        }
      }
    },
    group: {
      content: {
        label: '内容设置',
        fields: [ 'heading', 'subheading', 'items' ]
      }
    }
  }
};

