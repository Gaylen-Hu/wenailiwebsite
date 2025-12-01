/*
 * Chart Widget for ApostropheCMS
 * Supports multiple chart types using ECharts and Chart.js
 */
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: '图表组件',
    icon: 'chart-line',
    preview: true
  },
  fields: {
      add: {
        chartType: {
          type: 'select',
          label: '图表类型',
          required: true,
          choices: [
            {
              label: '线图 (Line Chart)',
              value: 'line'
            },
            {
              label: '柱状图 (Bar Chart)',
              value: 'bar'
            },
            {
              label: '饼图 (Pie Chart)',
              value: 'pie'
            },
            {
              label: '环形图 (Doughnut Chart)',
              value: 'doughnut'
            },
            {
              label: '面积图 (Area Chart)',
              value: 'area'
            },
            {
              label: '散点图 (Scatter Chart)',
              value: 'scatter'
            }
          ],
          def: 'line'
        },
        chartLibrary: {
          type: 'select',
          label: '图表库',
          choices: [
            {
              label: 'ECharts (推荐)',
              value: 'echarts'
            },
            {
              label: 'Chart.js',
              value: 'chartjs'
            }
          ],
          def: 'echarts',
          help: '选择使用的图表渲染库'
        },
        title: {
          type: 'string',
          label: '图表标题',
          help: '显示在图表上方的标题'
        },
      data: {
        type: 'string',
        label: '图表数据 (JSON)',
        textarea: true,
        required: false,
        help: '输入JSON格式的数据。支持数组和对象格式，参考右侧示例。留空将显示示例数据。'
      },
 
        xAxisKey: {
          type: 'string',
          label: 'X轴字段名',
          def: 'name',
          help: '数据中用作X轴的字段名'
        },
        yAxisKeys: {
          type: 'string',
          label: 'Y轴字段名',
          def: 'value',
          help: '数据中用作Y轴的字段名，多个字段用逗号分隔'
        },
        colors: {
          type: 'string',
          label: '颜色配置',
          textarea: true,
          def: '#0088FE,#00C49F,#FFBB28,#FF8042,#8884d8,#82ca9d',
          help: '用逗号分隔的颜色值，支持十六进制、RGB、颜色名'
        },
        height: {
          type: 'integer',
          label: '图表高度 (px)',
          def: 320,
          min: 200,
          max: 800
        },
        showLegend: {
          type: 'boolean',
          label: '显示图例',
          def: true
        },
        showTooltip: {
          type: 'boolean',
          label: '显示工具提示',
          def: true
        },
        showGrid: {
          type: 'boolean',
          label: '显示网格线',
          def: true
        },
        animation: {
          type: 'boolean',
          label: '启用动画',
          def: true
        },
        responsive: {
          type: 'boolean',
          label: '响应式',
          def: true
      }
    },
    group: {
      basic: {
        label: '基础设置',
        fields: ['chartType', 'chartLibrary', 'title']
      },
      data: {
        label: '数据配置',
        fields: ['data', 'xAxisKey', 'yAxisKeys']
      },
      style: {
        label: '样式配置',
        fields: ['colors', 'height', 'showLegend', 'showTooltip', 'showGrid', 'animation', 'responsive']
      }
    }
  }
};
