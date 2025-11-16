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
      lineChartTitle: {
        type: 'string',
        label: '折线图标题',
        def: '业务增长趋势'
      },
      lineChartData: {
        type: 'array',
        label: '折线图数据',
        titleField: 'month',
        def: [
          { month: '1月', business: 400, customers: 450 },
          { month: '2月', business: 500, customers: 480 },
          { month: '3月', business: 600, customers: 500 },
          { month: '4月', business: 800, customers: 550 },
          { month: '5月', business: 700, customers: 520 },
          { month: '6月', business: 900, customers: 480 }
        ],
        fields: {
          add: {
            month: {
              type: 'string',
              label: '月份',
              required: true
            },
            business: {
              type: 'integer',
              label: '业务量',
              def: 0
            },
            customers: {
              type: 'integer',
              label: '客户数',
              def: 0
            }
          }
        }
      },
      pieChartTitle: {
        type: 'string',
        label: '饼图标题',
        def: '客户来源渠道分布'
      },
      pieChartData: {
        type: 'array',
        label: '饼图数据',
        titleField: 'name',
        def: [
          { name: '搜索引擎', value: 31, color: '#0088FE' },
          { name: '社交媒体', value: 23, color: '#00C49F' },
          { name: '直接访问', value: 23, color: '#FFBB28' },
          { name: '合作伙伴', value: 15, color: '#FF8042' },
          { name: '其他渠道', value: 8, color: '#8884d8' }
        ],
        fields: {
          add: {
            name: {
              type: 'string',
              label: '渠道名称',
              required: true
            },
            value: {
              type: 'integer',
              label: '百分比',
              def: 0,
              min: 0,
              max: 100
            },
            color: {
              type: 'string',
              label: '颜色（十六进制）',
              def: '#0088FE'
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
      lineChart: {
        label: '折线图配置',
        fields: [ 'lineChartTitle', 'lineChartData' ]
      },
      pieChart: {
        label: '饼图配置',
        fields: [ 'pieChartTitle', 'pieChartData' ]
      }
    }
  }
};

