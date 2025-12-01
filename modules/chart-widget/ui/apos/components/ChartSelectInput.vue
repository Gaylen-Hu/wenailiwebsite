<!--
Chart Widget Admin UI Component
-->
<template>
  <div class="chart-widget-admin">
    <!-- 图表预览区域 -->
    <div class="chart-preview mb-6" v-if="chartData && chartData.length > 0">
      <h4 class="text-lg font-semibold mb-3">图表预览</h4>
      <div class="border border-gray-200 rounded-lg p-4 bg-white" style="height: 300px;">
        <canvas ref="previewCanvas" class="w-full h-full"></canvas>
      </div>
    </div>

    <!-- 数据验证状态 -->
    <div class="data-validation mb-4" v-if="dataValidation">
      <div :class="['p-3 rounded-lg text-sm', dataValidation.isValid ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
        <div class="flex items-center">
          <svg :class="['w-4 h-4 mr-2', dataValidation.isValid ? 'text-green-500' : 'text-red-500']" fill="currentColor" viewBox="0 0 20 20">
            <path v-if="dataValidation.isValid" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          {{ dataValidation.message }}
        </div>
      </div>
    </div>

    <!-- 数据格式助手 -->
    <div class="data-format-helper mb-6">
      <details class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <summary class="cursor-pointer font-medium text-blue-900 mb-2">📋 数据格式帮助</summary>
        <div class="text-sm text-blue-800 space-y-3">
          <div>
            <h5 class="font-semibold mb-1">线图/柱状图/面积图:</h5>
            <pre class="bg-white p-2 rounded text-xs overflow-x-auto"><code>[
  { "name": "1月", "销售额": 12000, "利润": 8000 },
  { "name": "2月", "销售额": 15000, "利润": 10000 }
]</code></pre>
          </div>
          <div>
            <h5 class="font-semibold mb-1">饼图/环形图:</h5>
            <pre class="bg-white p-2 rounded text-xs overflow-x-auto"><code>[
  { "name": "搜索引擎", "value": 35 },
  { "name": "社交媒体", "value": 25 },
  { "name": "官网流量", "value": 20 }
]</code></pre>
          </div>
          <div>
            <h5 class="font-semibold mb-1">散点图:</h5>
            <pre class="bg-white p-2 rounded text-xs overflow-x-auto"><code>[
  { "x": 10, "y": 20, "size": 5 },
  { "x": 15, "y": 25, "size": 8 }
]</code></pre>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartSelectInput',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chartData: null,
      dataValidation: null,
      chartInstance: null
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.validateAndPreviewData(newVal);
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.validateAndPreviewData(this.value);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  },
  methods: {
    validateAndPreviewData(config) {
      // 如果没有配置数据，显示提示信息并使用示例数据预览
      if (!config.data || config.data.trim() === '') {
        const defaultData = this.getDefaultPreviewData(config);
        this.dataValidation = {
          isValid: true,
          message: '未配置数据，将显示示例数据预览'
        };
        this.chartData = defaultData;
        this.renderPreviewChart(config, defaultData);
        return;
      }

      try {
        const data = JSON.parse(config.data.trim());

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('数据必须是非空的数组');
        }

        // 验证数据结构
        this.validateDataStructure(data, config);

        this.dataValidation = {
          isValid: true,
          message: `数据验证通过，共 ${data.length} 个数据点`
        };

        this.chartData = data;
        this.renderPreviewChart(config, data);
      } catch (error) {
        // 如果JSON解析失败，使用示例数据但显示错误
        const defaultData = this.getDefaultPreviewData(config);
        this.dataValidation = {
          isValid: false,
          message: `数据格式错误: ${error.message}，显示示例数据预览`
        };
        this.chartData = defaultData;
        this.renderPreviewChart(config, defaultData);
      }
    },

    getDefaultPreviewData(config) {
      const chartType = config.chartType || 'line';

      switch (chartType) {
        case 'pie':
        case 'doughnut':
          return [
            { name: '示例A', value: 35 },
            { name: '示例B', value: 25 },
            { name: '示例C', value: 20 },
            { name: '示例D', value: 15 },
            { name: '其他', value: 5 }
          ];

        case 'scatter':
          return [
            { x: 10, y: 20, size: 5 },
            { x: 15, y: 25, size: 8 },
            { x: 20, y: 15, size: 6 },
            { x: 25, y: 30, size: 10 },
            { x: 30, y: 22, size: 7 }
          ];

        default: // line, bar, area
          return [
            { name: '1月', 销售额: 12000, 利润: 8000 },
            { name: '2月', 销售额: 15000, 利润: 10000 },
            { name: '3月', 销售额: 18000, 利润: 12000 },
            { name: '4月', 销售额: 20000, 利润: 14000 },
            { name: '5月', 销售额: 25000, 利润: 16000 },
            { name: '6月', 销售额: 28000, 利润: 18000 }
          ];
      }
    },

    validateDataStructure(data, config) {
      const firstItem = data[0];
      const chartType = config.chartType || 'line';

      switch (chartType) {
        case 'line':
        case 'bar':
        case 'area':
          if (!firstItem[config.xAxisKey || 'name']) {
            throw new Error(`缺少X轴字段 "${config.xAxisKey || 'name'}"`);
          }
          break;
        case 'pie':
        case 'doughnut':
          if (!firstItem.name || !firstItem.value) {
            throw new Error('饼图数据需要包含 "name" 和 "value" 字段');
          }
          break;
        case 'scatter':
          if (!firstItem.x || !firstItem.y) {
            throw new Error('散点图数据需要包含 "x" 和 "y" 字段');
          }
          break;
      }
    },

    renderPreviewChart(config, data) {
      if (!this.$refs.previewCanvas) return;

      // 销毁之前的图表实例
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = this.$refs.previewCanvas.getContext('2d');

      // 简单的预览图表配置
      const chartConfig = this.generatePreviewConfig(config, data);

      // 使用Chart.js创建预览
      this.chartInstance = new Chart(ctx, chartConfig);
    },

    generatePreviewConfig(config, data) {
      const chartType = config.chartType || 'line';
      const colors = (config.colors || '#0088FE,#00C49F,#FFBB28,#FF8042,#8884d8').split(',').map(c => c.trim());

      const baseConfig = {
        type: this.mapChartType(chartType),
        data: {
          labels: data.map(item => item[config.xAxisKey || 'name'] || item.name || item.x),
          datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: config.showLegend !== false
            },
            tooltip: {
              enabled: config.showTooltip !== false
            }
          },
          scales: chartType !== 'pie' && chartType !== 'doughnut' ? {
            x: {
              display: true,
              grid: {
                display: config.showGrid !== false
              }
            },
            y: {
              display: true,
              grid: {
                display: config.showGrid !== false
              }
            }
          } : {}
        }
      };

      // 根据图表类型配置数据集
      if (chartType === 'pie' || chartType === 'doughnut') {
        baseConfig.data.datasets.push({
          data: data.map(item => item.value),
          backgroundColor: colors,
          borderColor: colors.map(c => this.adjustColor(c, -20)),
          borderWidth: 1
        });
      } else if (chartType === 'scatter') {
        baseConfig.data.datasets.push({
          data: data.map(item => ({
            x: item.x,
            y: item.y,
            r: item.size || 5
          })),
          backgroundColor: colors[0],
          borderColor: colors[0]
        });
      } else {
        // 线图、柱状图、面积图
        const yAxisKeys = (config.yAxisKeys || 'value').split(',').map(k => k.trim());

        yAxisKeys.forEach((key, index) => {
          const color = colors[index % colors.length];
          const dataset = {
            label: key,
            data: data.map(item => item[key]),
            backgroundColor: chartType === 'bar' ? color : this.adjustColor(color, 20),
            borderColor: color,
            borderWidth: 2,
            fill: chartType === 'area'
          };

          if (chartType === 'line' || chartType === 'area') {
            dataset.tension = 0.1;
          }

          baseConfig.data.datasets.push(dataset);
        });
      }

      return baseConfig;
    },

    mapChartType(type) {
      const typeMap = {
        'line': 'line',
        'bar': 'bar',
        'pie': 'pie',
        'doughnut': 'doughnut',
        'area': 'line',
        'scatter': 'bubble'
      };
      return typeMap[type] || 'line';
    },

    adjustColor(color, amount) {
      // 简单的颜色调整函数
      if (color.startsWith('#')) {
        const hex = color.slice(1);
        const num = parseInt(hex, 16);
        const adjusted = Math.max(0, Math.min(255, num + amount));
        return '#' + adjusted.toString(16).padStart(6, '0');
      }
      return color;
    }
  }
};
</script>

<style scoped>
.chart-widget-admin {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chart-preview {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: #f9fafb;
}

.data-format-helper details {
  transition: all 0.2s ease;
}

.data-format-helper details[open] {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.data-format-helper summary {
  list-style: none;
  outline: none;
}

.data-format-helper pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
