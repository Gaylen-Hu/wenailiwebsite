import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 注册 datalabels 插件（用于饼图外部标签显示）
Chart.register(ChartDataLabels);

export default () => {
  apos.util.widgetPlayers.chart = {
    selector: '[data-chart-widget]',
    player: function(el) {
      // 处理所有图表容器（支持多个图表）
      const chartContainers = el.querySelectorAll('[data-graph-canvas-wrapper]');
      
      chartContainers.forEach(container => {
        const chartData = JSON.parse(container.getAttribute('data-chart-data'));
        const ctx = container.querySelector('canvas');
        if (!ctx) return;
        
        const existingChart = Chart.getChart(ctx);
        
        // 配置响应式选项（类似 Recharts 的 ResponsiveContainer）
        if (!chartData.options) {
          chartData.options = {};
        }
        chartData.options.responsive = true;
        chartData.options.maintainAspectRatio = false;
        
        // 如果需要显示饼图标签（类似 Recharts 样式），配置 datalabels
        if (chartData._showPieLabels && (chartData.type === 'pie' || chartData.type === 'doughnut')) {
          // 获取扇区颜色函数
          const getSliceColor = (context) => {
            const dataset = context.dataset;
            const index = context.dataIndex;
            if (dataset.backgroundColor && Array.isArray(dataset.backgroundColor)) {
              return dataset.backgroundColor[index];
            } else if (typeof dataset.backgroundColor === 'string') {
              return dataset.backgroundColor;
            }
            // Chart.js 默认颜色（与 Recharts 类似的颜色）
            const defaultColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];
            return defaultColors[index % defaultColors.length];
          };

          // 配置 datalabels（外部标签，样式类似 Recharts）
          if (!chartData.options.plugins) {
            chartData.options.plugins = {};
          }
          chartData.options.plugins.datalabels = {
            display: true,
            // 标签颜色与对应扇区颜色匹配
            color: function(context) {
              return getSliceColor(context);
            },
            anchor: 'end',  // 锚点在外侧边缘
            align: function(context) {
              // 根据扇区位置智能对齐
              const chart = context.chart;
              const meta = chart.getDatasetMeta(0);
              const point = meta.data[context.dataIndex];
              if (!point) return 'end';
              
              // 获取扇区的角度中心
              const angle = (point.startAngle + point.endAngle) / 2;
              // 根据角度判断扇区在左侧还是右侧
              // 左侧（90度到270度）用 'end'，右侧（270度到90度）用 'start'
              const normalizedAngle = ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
              if (normalizedAngle > Math.PI / 2 && normalizedAngle < 3 * Math.PI / 2) {
                return 'end';  // 左侧扇区，标签右对齐（text-anchor="end"）
              } else {
                return 'start'; // 右侧扇区，标签左对齐（text-anchor="start"）
              }
            },
            offset: 8,     // 距离饼图的偏移
            font: {
              size: 13,
              weight: 'normal'
            },
            // 无背景框和边框（纯文本标签，类似 Recharts）
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 0,
            padding: 0,
            formatter: (value, context) => {
              const label = context.chart.data.labels[context.dataIndex];
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(0); // 整数百分比，与 Recharts 一致
              return `${label}: ${percentage}%`;
            },
            clip: false  // 允许标签显示在图表外部
          };
        }
        
        // 设置响应式尺寸（类似 Recharts 的 ResponsiveContainer）
        const containerElement = container;
        const updateChartSize = () => {
          if (ctx && existingChart) {
            const containerWidth = containerElement.clientWidth;
            const containerHeight = containerElement.clientHeight;
            ctx.width = containerWidth;
            ctx.height = containerHeight;
            existingChart.resize();
          }
        };
        
        // 初始设置尺寸
        if (ctx && !existingChart) {
          const containerWidth = containerElement.clientWidth;
          const containerHeight = containerElement.clientHeight;
          ctx.width = containerWidth;
          ctx.height = containerHeight;
        }
        
        // 监听窗口大小变化
        if (window.ResizeObserver) {
          const resizeObserver = new ResizeObserver(() => {
            if (existingChart) {
              existingChart.resize();
            }
          });
          resizeObserver.observe(containerElement);
        } else {
          window.addEventListener('resize', () => {
            if (existingChart) {
              existingChart.resize();
            }
          });
        }
        
        if (existingChart) {
          existingChart.data = chartData.data;
          existingChart.options = chartData.options;
          existingChart.update();
        } else {
          const chart = new Chart(ctx, chartData);
        }
      });
    }
  };
};
