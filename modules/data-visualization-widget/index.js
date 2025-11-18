/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-18 17:22:41
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-18 17:51:00
 * @FilePath: \wenaili\modules\data-visualization-widget\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '数据可视化示例',
    icon: 'chart-line',
    preview: true
  },
  fields: {
    add: {
      heading: {
        type: 'string',
        label: '标题',
        def: '数据可视化示例'
      },
      subheading: {
        type: 'string',
        label: '副标题',
        textarea: true,
        def: '通过直观的数据可视化，帮助您更好地理解业务状况和市场趋势'
      },
      backgroundClass: {
        type: 'string',
        label: '背景类名',
        def: 'py-20 bg-gray-50'
      },
      charts: {
        type: 'array',
        label: '图表卡片',
        titleField: 'title',
        min: 1,
        fields: {
          add: {
            title: {
              type: 'string',
              label: '卡片标题'
            },
            description: {
              type: 'string',
              label: '卡片描述',
              textarea: true
            },
            chartArea: {
              type: 'area',
              label: '图表内容',
              help: '使用 chart-widget 配置任意类型的 Chart.js 图表数据集',
              options: {
                  widgets: {
                    'chart': {},
                  '@apostrophecms/rich-text': {
                    toolbar: ['bold', 'italic', 'link'],
                    styles: [
                      { tag: 'p', label: '正文' },
                      { tag: 'h4', label: '小标题' }
                    ]
                  }
                },
                max: 1
              }
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: '基础设置',
        fields: [ 'heading', 'subheading', 'backgroundClass' ]
      },
      charts: {
        label: '图表内容',
        fields: [ 'charts' ]
      }
    }
  }
};

