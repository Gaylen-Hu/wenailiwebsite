import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// 注册 datalabels 插件（用于饼图外部标签显示）
Chart.register(ChartDataLabels);

export default () => {
  apos.util.widgetPlayers.chart = {
    selector: '[data-chart-widget]',
    player: function(el) {
      // get the JSON data from a child div of el with the attribute data-graph-canvas-wrapper. That data comes from the value of the data-chart-data attribute

      const chartData = JSON.parse(el.querySelector('[data-graph-canvas-wrapper]').getAttribute('data-chart-data'));
      // get the id value of this first canvas in the el
      const ctx = el.querySelector('canvas');
      const existingChart = Chart.getChart(ctx);
      
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
      
      if (existingChart) {
        existingChart.data = chartData.data;
        existingChart.options = chartData.options;
        existingChart.update();
      } else {
        const chart = new Chart(ctx, chartData);
      }
    }
  };
};
