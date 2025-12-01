/*
Chart Widget Frontend Component
Supports ECharts and Chart.js with beautiful styling
Plain JavaScript implementation for ApostropheCMS
*/

import * as echarts from 'echarts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 注册Chart.js组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

const WIDGET_SELECTOR = '[data-chart-widget]';

class ChartWidget {
  constructor(element, widget) {
    this.element = element;
    this.widget = widget;
    this.chartInstance = null;
    this.chartData = null;
    this.loading = true;
    this.error = null;

    this.init();
  }

  get chartType() {
    return this.widget.chartType || 'line';
  }

  get chartLibrary() {
    return this.widget.chartLibrary || 'echarts';
  }

  get title() {
    return this.widget.title;
  }

  get height() {
    return this.widget.height || 320;
  }

  get responsive() {
    return this.widget.responsive !== false;
  }

  get showLegend() {
    return this.widget.showLegend !== false;
  }

  get showTooltip() {
    return this.widget.showTooltip !== false;
  }

  get showGrid() {
    return this.widget.showGrid !== false;
  }

  get animation() {
    return this.widget.animation !== false;
  }

  get colors() {
    const colors = (this.widget.colors || '#0088FE,#00C49F,#FFBB28,#FF8042,#8884d8,#82ca9d')
      .split(',')
      .map(c => c.trim());
    return colors;
  }

  init() {
    console.log('initinit');
    this.render();
    this.initializeChart();
  }

  render() {
    console.log('renderrender');
    const container = this.element.querySelector('.chart-widget-container');
    if (!container) return;

    container.style.height = this.height + 'px';

    // 加载状态
    if (this.loading) {
      container.innerHTML = `
        <div class="chart-loading flex items-center justify-center h-full">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      `;
    }
    // 错误状态
    else if (this.error) {
      console.log('this.errorthis.error', this.error);
      container.innerHTML = `
        <div class="chart-error flex items-center justify-center h-full">
          <div class="text-center">
            <svg class="w-12 h-12 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-red-600 text-sm">${this.error}</p>
          </div>
        </div>
      `;
    }
    // 正常状态
    else {
      let html = '';

      // 图表标题
      if (this.title) {
        html += `
          <div class="chart-title mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">${this.title}</h3>
          </div>
        `;
      }

      // 图表容器
      html += `
        <div class="chart-content relative ${this.responsive ? 'chart-responsive' : ''}">
      `;

      if (this.chartLibrary === 'chartjs') {
        html += `<canvas class="chart-canvas ${this.responsive ? 'w-full h-full' : ''}"></canvas>`;
      } else {
        html += `<div class="echarts-container w-full h-full"></div>`;
      }

      html += '</div>';
      console.log('htmlhtml', html);
      container.innerHTML = html;
    }
  }

  async initializeChart() {
    try {
      this.loading = true;
      this.error = null;
      this.render();

      // 解析数据
      this.chartData = this.parseData(this.widget.data);

      // 渲染图表（现在总是会有数据，因为parseData会提供默认数据）
      await this.renderChart();
    } catch (error) {
      this.error = error.message;
      console.error('Chart initialization error:', error);
      this.render();
    } finally {
      this.loading = false;
    }
  }

  parseData(dataString) {
    // 如果没有提供数据，返回示例数据
    if (!dataString || dataString.trim() === '') {
      return this.getDefaultData();
    }

    try {
      const data = JSON.parse(dataString.trim());
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.warn('数据格式错误，使用示例数据:', error.message);
      return this.getDefaultData();
    }
  }

  getDefaultData() {
    const chartType = this.widget.chartType || 'line';

    switch (chartType) {
      case 'pie':
      case 'doughnut':
        return [
          { name: '示例数据A', value: 35 },
          { name: '示例数据B', value: 25 },
          { name: '示例数据C', value: 20 },
          { name: '示例数据D', value: 15 },
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
  }

  async renderChart() {
    if (this.chartLibrary === 'echarts') {
      await this.renderECharts();
    } else {
      await this.renderChartJS();
    }
  }

  async renderECharts() {
    const container = this.element.querySelector('.echarts-container');
    if (!container) return;

    // 销毁之前的实例
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }

    // 创建新实例
    this.chartInstance = echarts.init(container);

    // 生成配置
    const option = this.generateEChartsOption();

    // 设置配置
    this.chartInstance.setOption(option, true);

    // 响应式调整
    if (this.responsive) {
      this.handleResize = () => {
        if (this.chartInstance) {
          this.chartInstance.resize();
        }
      };
      window.addEventListener('resize', this.handleResize);
    }
  }

  async renderChartJS() {
    const canvas = this.element.querySelector('.chart-canvas');
    if (!canvas) return;

    // 销毁之前的实例
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    const config = this.generateChartJSConfig();

    // 创建图表
    this.chartInstance = new ChartJS(ctx, config);
  }

  generateEChartsOption() {
    const baseOption = {
      backgroundColor: 'transparent',
      animation: this.animation,
      legend: {
        show: this.showLegend,
        top: 10,
        textStyle: {
          color: '#333'
        }
      },
      tooltip: {
        show: this.showTooltip,
        trigger: this.chartType === 'pie' || this.chartType === 'doughnut' ? 'item' : 'axis'
      }
    };

    switch (this.chartType) {
      case 'line':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: this.chartData.map(item => item[this.widget.xAxisKey || 'name']),
            axisLine: { lineStyle: { color: '#ddd' } },
            axisLabel: { color: '#666' }
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#ddd' } },
            axisLabel: { color: '#666' },
            splitLine: { show: this.showGrid, lineStyle: { color: '#f0f0f0' } }
          },
          series: this.generateEChartsSeries('line')
        };

      case 'bar':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: this.chartData.map(item => item[this.widget.xAxisKey || 'name']),
            axisLine: { lineStyle: { color: '#ddd' } },
            axisLabel: { color: '#666' }
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#ddd' } },
            axisLabel: { color: '#666' },
            splitLine: { show: this.showGrid, lineStyle: { color: '#f0f0f0' } }
          },
          series: this.generateEChartsSeries('bar')
        };

      case 'area':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: this.chartData.map(item => item[this.widget.xAxisKey || 'name']),
            axisLine: { lineStyle: { color: '#ddd' } },
            axisLabel: { color: '#666' }
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#ddd' } },
            axisLabel: { color: '#666' },
            splitLine: { show: this.showGrid, lineStyle: { color: '#f0f0f0' } }
          },
          series: this.generateEChartsSeries('area')
        };

      case 'pie':
      case 'doughnut':
        return {
          ...baseOption,
          series: [{
            type: 'pie',
            data: this.chartData.map((item, index) => ({
              name: item.name,
              value: item.value,
              itemStyle: {
                color: this.colors[index % this.colors.length]
              }
            })),
            radius: this.chartType === 'doughnut' ? ['40%', '70%'] : '60%',
            center: ['50%', '50%'],
            label: {
              show: true,
              formatter: '{b}: {d}%'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };

      case 'scatter':
        return {
          ...baseOption,
          xAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#ddd' } },
            axisLabel: { color: '#666' },
            splitLine: { show: this.showGrid, lineStyle: { color: '#f0f0f0' } }
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#ddd' } },
            axisLabel: { color: '#666' },
            splitLine: { show: this.showGrid, lineStyle: { color: '#f0f0f0' } }
          },
          series: [{
            type: 'scatter',
            data: this.chartData.map(item => [item.x, item.y]),
            symbolSize: (val) => item.size || 10,
            itemStyle: {
              color: this.colors[0]
            }
          }]
        };

      default:
        return baseOption;
    }
  }

  generateEChartsSeries(type) {
    const yAxisKeys = (this.widget.yAxisKeys || 'value').split(',').map(k => k.trim());
    const series = [];

    yAxisKeys.forEach((key, index) => {
      const color = this.colors[index % this.colors.length];
      const seriesItem = {
        name: key,
        type: type === 'area' ? 'line' : type,
        data: this.chartData.map(item => item[key]),
        itemStyle: { color },
        lineStyle: { color },
        areaStyle: type === 'area' ? { color: this.adjustColor(color, 20) } : undefined,
        smooth: type === 'line' || type === 'area'
      };

      if (type === 'bar') {
        seriesItem.itemStyle = { color };
      }

      series.push(seriesItem);
    });

    return series;
  }

  generateChartJSConfig() {
    const baseConfig = {
      type: this.mapChartJSType(),
      data: {
        labels: this.chartData.map(item => item[this.widget.xAxisKey || 'name'] || item.name || item.x),
        datasets: []
      },
      options: {
        responsive: this.responsive,
        maintainAspectRatio: false,
        animation: this.animation ? {} : false,
        plugins: {
          legend: {
            display: this.showLegend,
            position: 'top'
          },
          tooltip: {
            enabled: this.showTooltip
          }
        },
        scales: this.chartType !== 'pie' && this.chartType !== 'doughnut' ? {
          x: {
            display: true,
            grid: {
              display: this.showGrid
            }
          },
          y: {
            display: true,
            grid: {
              display: this.showGrid
            }
          }
        } : {}
      }
    };

    // 配置数据集
    if (this.chartType === 'pie' || this.chartType === 'doughnut') {
      baseConfig.data.datasets.push({
        data: this.chartData.map(item => item.value),
        backgroundColor: this.colors,
        borderColor: this.colors.map(c => this.adjustColor(c, -20)),
        borderWidth: 2,
        hoverOffset: 10
      });
    } else if (this.chartType === 'scatter') {
      baseConfig.data.datasets.push({
        data: this.chartData.map(item => ({
          x: item.x,
          y: item.y,
          r: item.size || 5
        })),
        backgroundColor: this.colors[0],
        borderColor: this.colors[0],
        borderWidth: 2
      });
    } else {
      // 线图、柱状图、面积图
      const yAxisKeys = (this.widget.yAxisKeys || 'value').split(',').map(k => k.trim());

      yAxisKeys.forEach((key, index) => {
        const color = this.colors[index % this.colors.length];
        const dataset = {
          label: key,
          data: this.chartData.map(item => item[key]),
          backgroundColor: this.chartType === 'bar' ? color : this.adjustColor(color, 20),
          borderColor: color,
          borderWidth: 2,
          fill: this.chartType === 'area'
        };

        if (this.chartType === 'line' || this.chartType === 'area') {
          dataset.tension = 0.1;
        }

        baseConfig.data.datasets.push(dataset);
      });
    }

    return baseConfig;
  }

  mapChartJSType() {
    const typeMap = {
      'line': 'line',
      'bar': 'bar',
      'pie': 'pie',
      'doughnut': 'doughnut',
      'area': 'line',
      'scatter': 'bubble'
    };
    return typeMap[this.chartType] || 'line';
  }

  adjustColor(color, amount) {
    // 简单的颜色调整函数
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const num = parseInt(hex, 16);
      let r = (num >> 16) + amount;
      let g = (num >> 8 & 0x00FF) + amount;
      let b = (num & 0x0000FF) + amount;

      r = r > 255 ? 255 : r < 0 ? 0 : r;
      g = g > 255 ? 255 : g < 0 ? 0 : g;
      b = b > 255 ? 255 : b < 0 ? 0 : b;

      return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    }
    return color;
  }

  destroy() {
    if (this.chartInstance) {
      if (this.chartLibrary === 'echarts') {
        this.chartInstance.dispose();
      } else {
        this.chartInstance.destroy();
      }
      this.chartInstance = null;
    }

    if (this.responsive && this.handleResize) {
      window.removeEventListener('resize', this.handleResize);
    }
  }
}

// 初始化函数
export default () => {
  console.log('ChartWidget: Initializing...');
  const init = () => {
    console.log('ChartWidget: DOM ready, looking for widgets...');
    const widgets = document.querySelectorAll(WIDGET_SELECTOR);
    console.log('ChartWidget: Found widgets:', widgets.length);

    widgets.forEach((element) => {
      console.log('ChartWidget: Processing element:', element);
      // 获取widget数据
      const widgetId = element.id;
      console.log('ChartWidget: Widget ID:', widgetId);
      if (window.apos?.util?.widgets && window.apos.util.widgets[widgetId]) {
        const widget = window.apos.util.widgets[widgetId];
        console.log('ChartWidget: Widget data found:', widget);
        new ChartWidget(element, widget);
      } else {
        console.log('ChartWidget: No widget data found for ID:', widgetId);
        console.log('ChartWidget: Available widgets:', window.apos?.util?.widgets);
      }
    });
  };

  if (window.apos?.util?.onReady) {
    console.log('ChartWidget: Using apos.util.onReady');
    window.apos.util.onReady(init);
  } else {
    console.log('ChartWidget: Using DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', init, { once: true });
  }
};
