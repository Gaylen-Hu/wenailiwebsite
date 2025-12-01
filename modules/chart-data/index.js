/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-18 18:03:42
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-01 13:47:22
 * @FilePath: \wenaili\modules\chart-data\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as csv from 'csv';

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '图表数据',
    pluralLabel: '图表数据'
    // Additionally add a `pluralLabel` option if needed.
  },
  fields: {
    add: {
      dataFile: {
        label: 'Data File',
        type: 'attachment',
        fileGroup: 'office',
        required: true
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'dataFile']
      }
    }
  },
  handlers(self, options) {
    return {
      afterInsert: {
        async insertUpdate(req, doc, options) {
          self.storeColumns(req, doc, options);
        }
      },
      afterUpdate: {
        async updateUpdate(req, doc, options) {
          self.storeColumns(req, doc, options);
        }
      }
    };
  },
  methods(self) {
    return {
      async storeColumns(req, doc, options) {
        if (doc.type !== 'chart-data') {
          return;
        }
        const chartDataDocument = await self
          .find(req, {
            _id: doc._id
          })
          .toObject();
        if (!chartDataDocument) {
          return;
        }
        const dataFile = chartDataDocument.dataFile;
        if (chartDataDocument.fileId && chartDataDocument.fileId === dataFile._id) {
          return;
        }

        if (dataFile._url) {
          const fileString = await self.apos.http.get(dataFile._url);
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
          let columnArray = Object.keys(chartDataSet[0][0])
          columnArray = columnArray.filter(col => col.trim() !== '');
          chartDataDocument.columns = columnArray;
          chartDataDocument.fileId = dataFile._id;

          const updateWithColumns = await self.update(req, chartDataDocument);
          await self.publish(req, updateWithColumns);
          return updateWithColumns;
        }
      }
    };
  }
};
