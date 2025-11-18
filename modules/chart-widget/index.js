import * as csv from 'csv';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    alias: 'charting',
    label: '图表组件',
    uploadfs: true
  },
  fields: {
    add: {
      chartTarget: {
        label: 'Target',
        type: 'string',
        required: true,
        htmlHelp: '渲染图表的canvas元素的ID。必须是一个单词，并且唯一存在于页面上。'
      },
      titleFields: {
        label: '标题字段',
        type: 'object',
        fields: {
          add: {
            chartTitle: {
              label: '图表标题',
              type: 'string',
              help: '如果为空，则不显示标题。'
            },
            titlePosition: {
              label: '标题位置',
              type: 'select',
              choices: [
                {
                  label: '顶部',
                  value: 'top'
                },
                {
                  label: '顶部靠左',
                  value: 'top-left'
                },
                {
                  label: '左侧',
                  value: 'left'
                },
                {
                  label: '右侧',
                  value: 'right'
                },
                {
                  label: '底部',
                  value: 'bottom'
                }
              ],
              def: 'top'
            },
            titleFontSize: {
              label: '标题字体大小',
              type: 'integer',
              def: 20,
              help: '图表标题的字体大小（像素）。'
            },
            titlePadding: {
              label: '标题间距',
              type: 'integer',
              def: 10,
              help: '标题与图表之间的间距（像素）。'
            },
          }
        }
      },
      chartLegend: {
        label: '添加图例',
        type: 'boolean',
        def: true
      },
      legendPosition: {
        label: '图例位置',
        if: {
          chartLegend: true
        },
        type: 'select',
        choices: [
          {
                  label: '顶部',
            value: 'top'
          },
          {
            label: '左侧',
            value: 'left'
          },
          {
            label: '右侧',
            value: 'right'
          },
          {
            label: '底部',
            value: 'bottom'
          }
        ],
        def: 'top'
      },
      legendTitle: {
        label: '图例标题',
        type: 'string',
        if: {
          chartLegend: true
        },
        help: '如果为空，则不显示标题。'
      },
      legendTitleFontSize: {
        label: '图例标题字体大小',
        type: 'integer',
        if: {
          chartLegend: true
        },
        def: 16,
        help: '图例标题的字体大小（像素）。'
      },
      legendFontSize: {
        label: '图例字体大小',
        type: 'integer',
        if: {
          chartLegend: true
        },
        def: 14,
        help: '图例的字体大小（像素）。'
      },
      chartType: {
        label: '图表类型',
        type: 'select',
        choices: [
          {
            label: '单轴数值图表（折线图或柱状图）',
            value: 'oneAxis'
          },
          {
            label: '双轴数值图表（散点图或气泡图）',
            value: 'twoAxes'
          },
          {
            label: '圆形图表（饼图或圆环图）',
            value: 'circular'
          }
        ],
        def: 'oneAxis'
      },
      axisOneLabel: {
        label: '轴一标签',
        help: '如果这是一个双轴图表，这是x轴的标签。如果这是一个单轴图表，这是类别轴的标签。（可选）',
        type: 'string',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      axisOneUnits: {
        label: '轴一单位',
        type: 'select',
        choices: [
          {
            label: '无 - 用于标签',
            value: 'none'
          },
          {
            label: '线性',
            value: 'linear'
          },
          {
            label: '对数',
            value: 'logarithmic'
          }
        ],
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      axisOneLabelFontSize: {
        label: '轴一标签字体大小',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 14,
        help: '轴一标签的字体大小（像素）。'
      },
      axisOneDataFontSize: {
        label: '轴一数据字体大小',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 14,
              help: '轴一数据的字体大小（像素）。'
      },
      axisOneColor: {
        label: '轴一颜色',
        type: 'color',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: '#000000'
      },
      axisOneWidth: {
        label: '轴一宽度',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 1,
        help: '轴一线条的宽度（像素）。'
      },
      axisTwoLabel: {
        label: '轴二标签',
        help: '如果这是一个双轴图表，这是y轴的标签。如果这是一个单轴图表，这是数值轴的标签。（可选）',
        type: 'string',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      axisTwoUnits: {
        label: '轴二单位',
        type: 'select',
        choices: [
          {
            label: '无 - 用于标签',
            value: 'none'
          },
          {
            label: '线性',
            value: 'linear'
          },
          {
            label: '对数',
            value: 'logarithmic'
          }
        ],
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      axisTwoLabelFontSize: {
        label: '轴二标签字体大小',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 14,
        help: '轴二标签的字体大小（像素）。'
      },
      axisTwoDataFontSize: {
        label: '轴二数据字体大小',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 14,
            help: '轴二数据的字体大小（像素）。'
      },
      axisTwoColor: {
        label: '轴二颜色',
        type: 'color',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: '#000000'
      },
      axisTwoWidth: {
        label: '轴二宽度',
        type: 'integer',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        },
        def: 1,
        help: '轴二线条的宽度（像素）。'
      },
      labelLocation: {
        label: '标签轴位置',
        type: 'select',
        choices: [
          {
            label: '顶部',
            value: 'top'
          },
          {
            label: '左侧',
            value: 'left'
          },
          {
            label: '右侧',
            value: 'right'
          },
          {
            label: '底部',
            value: 'bottom'
          }
        ],
        def: 'bottom',
        if: {
          chartType: 'oneAxis'
        }
      },
      showGridlines: {
        label: '网格线可见性',
        type: 'select',
        choices: [
          {
            label: '无',
            value: 'none'
          },
          {
            label: '水平 - 平行于x轴',
            value: 'horizontal'
          },
          {
            label: '垂直 - 平行于y轴',
            value: 'vertical'
          },
          {
              label: '两者',
            value: 'both'
          }
        ],
        def: 'none',
        if: {
          $or: [{ chartType: 'oneAxis' }, { chartType: 'twoAxes' }]
        }
      },
      horizontalGridlineColor: {
        label: '水平网格线颜色',
        type: 'color',
        if: {
          $or: [{ showGridlines: 'horizontal' }, { showGridlines: 'both' }]
        },
        def: '#aeaeaeff'
      },
      verticalGridlineColor: {
        label: '垂直网格线颜色',
        type: 'color',
        if: {
          $or: [{ showGridlines: 'vertical' }, { showGridlines: 'both' }]
        },
        def: '#aeaeaeff'
      },
      graphAnimation: {
        label: '图表动画',
        type: 'boolean',
        def: true
      },
      showPieLabels: {
        label: '显示饼图标签',
        type: 'boolean',
        def: false,
        help: '在饼图扇区外显示标签和数值（带连线）。',
        if: {
          chartType: 'circular'
        }
      },
      _chartdataSet: {
        label: '图表数据集',
        type: 'relationship',
        required: 'true',
        max: 1,
        withType: 'chart-data'
      },
      chartData: {
        label: '图表数据',
        type: 'array',
        fields: {
          add: {
            dataType: {
              label: '数据类型',
              type: 'select',
              choices: [
                {
                  label: '类别',
                  value: 'categories'
                },
                {
                  label: '数值',
                  value: 'numeric'
                }
              ],
              required: true
            },
            dataChartType: {
              label: '数据图表类型',
              htmlHelp: '<p style="color: grey;">You can combine line and bar types, or bubble and scatter types.</p><p style="color: grey;">You cannot mix pie and doughnut types.</p>',
              type: 'select',
              def: 'line',
              if: {
                dataType: 'numeric'
              },
              choices: [
                {
                  label: '折线',
                  value: 'line'
                },
                {
                  label: '柱状图',
                  value: 'bar'
                },
                {
                    label: '圆环图',
                  value: 'doughnut'
                },
                {
                  label: '饼图',
                  value: 'pie'
                },
                {
                  label: '气泡图',
                  value: 'bubble'
                },
                {
                  label: '散点图',
                  value: 'scatter'
                }
              ]
            },
            dataCategoryColumn: {
              label: '类别标签',
              type: 'chartSelect',
              help: '数据集中的类别列。',
              if: {
                dataType: 'categories'
              },
              following: ['<_chartdataSet']
            },
            dataCircularColumn: {
              label: '圆形数据列标签',
              type: 'chartSelect',
              if: {
                $or: [{ dataChartType: 'pie' }, { dataChartType: 'doughnut' }]
              },
              following: ['<_chartdataSet']
            },
            dataCircularLabelColumn: {
              label: '圆形图表类别列',
              type: 'chartSelect',
              help: '饼图或圆环图的类别标签列（用于显示扇区名称）。',
              if: {
                $and: [
                  { dataType: 'numeric' },
                  { $or: [{ dataChartType: 'pie' }, { dataChartType: 'doughnut' }] }
                ]
              },
              following: ['<_chartdataSet']
            },
            dataXColumn: {
              label: 'X轴数据列',
              type: 'chartSelect',
              if: {
                $or: [
                  { dataChartType: 'line' },
                  { dataChartType: 'bar' },
                  { dataChartType: 'bubble' },
                  { dataChartType: 'scatter' }
                ]
              },
              following: ['<_chartdataSet']
            },
            dataYColumn: {
              label: 'Y轴数据列',
              type: 'chartSelect',
              if: {
                $or: [{ dataChartType: 'bubble' }, { dataChartType: 'scatter' }]
              },
              following: ['<_chartdataSet']
            },
            dataRColumn: {
              label: 'R值数据列',
              type: 'chartSelect',
              if: {
                dataChartType: 'bubble'
              },
              following: ['<_chartdataSet']
            },
            dataChartLabel: {
              label: '数据标签',
              type: 'string',
              help: '图表中的数据标签（可选）。',
              if: {
                dataType: 'numeric'
              }
            },
            dataBackgroundColor: {
                label: '背景颜色',
              type: 'color',
              help: '图表中数据背景颜色（可选）。如果您为其中一个数据集添加自定义颜色，则所有其他数据集也需要自定义颜色。',
              if: {
                dataType: 'numeric',
                $or: [
                  { dataChartType: 'line' },
                  { dataChartType: 'bar' },
                  { dataChartType: 'bubble' },
                  { dataChartType: 'scatter' }
                ]
              }
            },
            dataBorderColor: {
              label: '边框颜色',
              type: 'color',
              help: '图表中数据边框颜色（可选）。',
              if: {
                dataType: 'numeric',
                $or: [
                  { dataChartType: 'line' },
                  { dataChartType: 'bar' },
                  { dataChartType: 'bubble' },
                  { dataChartType: 'scatter' }
                ]
              }
            },
            dataSymbol: {
              label: '数据点符号',
              type: 'select',
              help: '图表中数据点符号（可选）。',
              if: {
                $or: [{ dataChartType: 'scatter' }, { dataChartType: 'line' }]
              },
              choices: [
                {
                  label: '圆形',
                  value: 'circle'
                },
                {
                  label: '交叉',
                  value: 'cross'
                },
                {
                  label: '交叉旋转',
                  value: 'crossRot'
                },
                {
                  label: '虚线',
                  value: 'dash'
                },
                {
                  label: '折线',
                  value: 'line'
                },
                {
                  label: '矩形',
                  value: 'rect'
                },
                {
                  label: '矩形旋转',
                  value: 'rectRot'
                },
                {
                    label: '矩形圆角',
                  value: 'rectRounded'
                },
                {
                  label: '星形',
                  value: 'star'
                },
                {
                  label: '三角形',
                  value: 'triangle'
                },
                {
                  label: '假',
                  value: 'false'
                }
              ]
            },
            dataSymbolSize: {
              label: '数据点符号大小',
              type: 'integer',
              help: '图表中数据点符号大小（可选）。',
              if: {
                $or: [{ dataChartType: 'scatter' }, { dataChartType: 'line' }]
              }
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: '基础',
        fields: ['chartTarget', 'chartType', 'titleFields']
      },
      legend: {
        label: '图例',
        fields: ['chartLegend', 'legendPosition', 'legendTitle', 'legendTitleFontSize', 'legendFontSize']
      },
      axes: {
        label: '轴',
        fields: [
          'labelLocation',
          'axisOneLabel',
          'axisOneUnits',
          'axisOneLabelFontSize',
          'axisOneDataFontSize',
          'axisOneColor',
          'axisOneWidth',
          'axisTwoLabel',
          'axisTwoUnits',
          'axisTwoLabelFontSize',
          'axisTwoDataFontSize',
          'axisTwoColor',
          'axisTwoWidth'
        ]
      },
      gridlines: {
        label: '网格线',
        fields: [ 'showGridlines', 'horizontalGridlineColor', 'verticalGridlineColor']
      },
      animation: {
        label: '动画',
        fields: ['graphAnimation']
      },
      pieLabels: {
        label: '饼图标签',
        fields: ['showPieLabels'],
        if: {
          chartType: 'circular'
        }
      },
      data: {
        label: '数据',
        fields: ['_chartdataSet', 'chartData']
      }
    }
  },
  init(self) {
    // This adds the custom schema field for selecting the data column
    self.addChartSelectColumnType();
  },
  components(self) {
    return {
      async returnChartData(req, data) {
        const {
          titleFields,
          chartLegend,
          legendPosition,
          legendTitle,
          legendTitleFontSize,
          legendFontSize,
          chartType,
          chartTarget,
          axisOneLabel,
          axisOneUnits,
          axisOneLabelFontSize,
          axisOneDataFontSize,
          axisOneColor,
          axisOneWidth,
          axisTwoLabel,
          axisTwoUnits,
          axisTwoLabelFontSize,
          axisTwoDataFontSize,
          axisTwoColor,
          axisTwoWidth,
          labelLocation,
          showGridlines,
          horizontalGridlineColor,
          verticalGridlineColor,
          graphAnimation,
          showPieLabels,
          chartData
        } = data.data;
        const { chartTitle, titlePosition: titlePositionRaw, titleFontSize, titlePadding } = titleFields;
        // 处理标题位置（支持顶部靠左）
        const titlePosition = titlePositionRaw === 'top-left' ? 'top' : titlePositionRaw;
        const titleAlign = titlePositionRaw === 'top-left' ? 'start' : undefined;
        const dataFile = data.dataFile;
        const fileString = await self.apos.http.get(dataFile);
        const chartDataSet = [];
        try {
          const parsedData = await new Promise((resolve, reject) => {
            csv.parse(fileString, { columns: true }, function (err, data) {
              if (err) {
                reject(err);
              }
              resolve(data);
            });
          });
          chartDataSet.push(parsedData);
        } catch (err) {
          console.error(err);
          return { chartDataSet: [] };
        }

        const config = {
          data: {
            labels: [],
            datasets: []
          },
          options: {
            animation: graphAnimation,
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              title: chartTitle ? {
                display: true,
                text: chartTitle,
                position: titlePosition,
                align: titleAlign,
                font: {
                  size: titleFontSize
                },
                padding: {
                  top: titlePositionRaw === 'bottom' ? titlePadding : 0,
                  bottom: (titlePositionRaw === 'top' || titlePositionRaw === 'top-left') ? titlePadding : 0,
                  left: titlePositionRaw === 'right' ? titlePadding : 0,
                  right: titlePositionRaw === 'left' ? titlePadding : 0
                }
              }
              : {
                display: false
              },
              legend: chartLegend
                ? {
                  position: legendPosition,
                  labels: {
                    strokeStyle: 'black',
                    lineWidth: 2,
                    font: {
                      size: legendFontSize
                    },
                    usePointStyle: true
                  }
                }
                : {
                  display: false
                }
            },
            scales: {}
          }
        };
        if (legendTitle) {
          config.options.plugins.legend = {
            ...config.options.plugins.legend,
            title: {
              display: true,
              text: legendTitle,
              font: {
                size: legendTitleFontSize
              }
            }
          };
        }

        const chartTypes = [];
        let dataLabels, circularData, xData, yData, rData;

        chartData.forEach((col) => {
          let multicolumn = false;

          if (col.dataCategoryColumn) {
            dataLabels = chartDataSet[0].map(
              (item) => item[col.dataCategoryColumn]
            );
          }

          // 饼图/圆环图的类别列（用于 numeric 类型）
          if (col.dataCircularLabelColumn) {
            dataLabels = chartDataSet[0].map(
              (item) => item[col.dataCircularLabelColumn]
            );
          }

          if (col.dataCircularColumn) {
            circularData = chartDataSet[0].map(
              (item) => item[col.dataCircularColumn]
            );
          }

          if (col.dataXColumn) {
            xData = chartDataSet[0].map((item) => item[col.dataXColumn]);
          }

          if (col.dataYColumn) {
            yData = chartDataSet[0].map((item) => item[col.dataYColumn]);
            multicolumn = true;
          }

          if (col.dataRColumn) {
            rData = chartDataSet[0].map((item) => item[col.dataRColumn]);
            multicolumn = true;
          }

          const processedData = multicolumn
            ? xData.map((_, i) => ({
              x: xData[i],
              y: yData[i],
              ...(rData && { r: rData[i] })
            }))
            : xData;

          if (col.dataType === 'categories') {
            config.data.labels = dataLabels;
          } else if (col.dataType === 'numeric' && chartType === 'circular') {
            // 如果设置了类别列，使用它作为 labels
            if (dataLabels) {
              config.data.labels = dataLabels;
            }
            config.data.datasets.push({
              type: col.dataChartType,
              label: col.dataChartLabel ? col.dataChartLabel : undefined,
              data: circularData
            });
            chartTypes.push(col.chartType);
          } else {
            config.data.datasets.push({
              type: col.dataChartType,
              label: col.dataChartLabel ? col.dataChartLabel : undefined,
              data: processedData,
              indexAxis: col.selectedAxis ? col.selectedAxis : undefined,
              xAxisID: col.dataType === 'x' ? 'x' : undefined,
              yAxisID: col.dataType === 'y' ? 'y' : undefined,
              backgroundColor: col.dataBackgroundColor
                ? col.dataBackgroundColor
                : undefined,
              borderColor: col.dataBorderColor
                ? col.dataBorderColor
                : undefined,
              pointStyle: col.dataSymbol ? col.dataSymbol : undefined,
              pointRadius: col.dataSymbolSize ? col.dataSymbolSize : undefined
            });
            chartTypes.push(col.chartType);
          }
        });

        config.options.indexAxis =
          labelLocation === 'left' || labelLocation === 'right'
            ? 'y'
            : undefined;

        if (chartType !== 'circular') {
          const { scales } = config.options;

          const gridlines = {
            x: {
              display: false
            },
            y: {
              display: false
            }
          };
          if (showGridlines !== 'none') {
            if (showGridlines === 'both' || showGridlines === 'vertical') {
              gridlines.x.display = true;
              gridlines.x.color = verticalGridlineColor
                ? verticalGridlineColor
                : undefined;
            }
            if (showGridlines === 'both' || showGridlines === 'horizontal') {
              gridlines.y.display = true;
              gridlines.y.color = horizontalGridlineColor
                ? horizontalGridlineColor
                : undefined;
            }
          }

          scales.x = {
            type: axisOneUnits === 'logarithmic' ? 'logarithmic' : undefined,
            title: axisOneLabel
              ? {
                display: true,
                text: axisOneLabel,
                font: { size: axisOneLabelFontSize }
              }
              : undefined,
            position: labelLocation === 'top' ? labelLocation : 'bottom',
            ticks: axisOneDataFontSize
              ? { font: { size: axisOneDataFontSize } }
              : undefined,
            grid: gridlines.x,
            border: {
              color: axisOneColor ? axisOneColor : undefined,
              width: axisOneWidth ? axisOneWidth : undefined
            }
          };
          scales.y = {
            type: axisTwoUnits === 'logarithmic' ? 'logarithmic' : undefined,
            title: axisTwoLabel
              ? {
                display: true,
                text: axisTwoLabel,
                font: { size: axisTwoLabelFontSize }
              }
              : undefined,
            position: labelLocation === 'right' ? labelLocation : 'left',
            ticks: axisTwoDataFontSize
              ? { font: { size: axisTwoDataFontSize } }
              : undefined,
            grid: gridlines.y,
            border: {
              color: axisTwoColor ? axisTwoColor : undefined,
              width: axisTwoWidth ? axisTwoWidth : undefined
            }
          };
        }

        const noMixedChartTypes = (chartTypes) =>
          chartTypes.every((type) => type === chartTypes[0]);

        if (!noMixedChartTypes) {
          const forbiddenMix = chartTypes.find(
            (type) => type === 'doughnut' || type === 'pie'
          );
          if (forbiddenMix) {
            console.error(
              'Doughnut and pie charts cannot be mixed with other chart types.'
            );
            return { chartDataSet: [] };
          }
        }

         // Determine the type of the first non-category dataset and set the config type
        const firstNonCategoryDataset = config.data.datasets.find(dataset => dataset.type !== 'categories');
        if (firstNonCategoryDataset) {
          config.type = firstNonCategoryDataset.type;
        }

        // 配置饼图/圆环图的标签显示（带连线，类似 Recharts 样式）
        // 注意：由于函数无法序列化，动态逻辑需要在前端处理
        if (chartType === 'circular' && showPieLabels && (config.type === 'pie' || config.type === 'doughnut')) {
          // 设置标志，前端会根据这个标志来配置 datalabels
          config._showPieLabels = true;
        }

        return {
          target: chartTarget,
          config: config,
          chartType: chartType  // 传递图表类型到模板
        };
      }
    };
  },
  methods(self) {
    return {
      addChartSelectColumnType() {
        self.apos.schema.addFieldType({
          name: 'chartSelect',
          extend: 'select',
          vueComponent: 'ChartSelectInput',
          validate(field, options, warn, fail) {
            field.choices = field.choices || [];
            field.following = field.following || ['<_chartdataSet'];
          },
          async convert(req, field, data, destination) {
            if (typeof data[field.name] === 'string') {
              destination[field.name] = self.apos.launder.string(data[field.name]);
            }
          }
        });
      }
    };
  }
};
