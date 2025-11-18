# Data Visualization Widget

该组件现在通过 [@bodonkey/charting-extension](https://apostrophecms.com/extensions/charting) 提供的 `chart-widget` 来渲染图表数据，支持 Chart.js 的折线、柱状、散点、饼图等多种类型。

## 使用方式

1. 在 Apostrophe 后台先创建 `chart-data` pieces，并上传 CSV 数据集。
2. 编辑「数据可视化」小部件时，为「图表卡片」数组添加条目：
   - 输入卡片标题 / 描述。
   - 在「图表内容」区域中添加一个 `chart-widget`，选择对应的 `chart-data` 数据集并完成字段配置。
3. 保存后即可在前端按两列自适应网格展示多个图表；若未添加任何图表，会在界面显示提示信息。

> 由于 chart-widget 内部会根据数据集生成 Chart.js 配置，因此无需再手写脚本或引入 ECharts，只要按照扩展文档配置数据列即可。***

