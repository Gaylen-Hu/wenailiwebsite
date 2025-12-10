/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-05 18:42:56
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-05 18:42:57
 * @FilePath: \wenaili\modules\grade-field\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/module',
  options: {
    alias: 'gradeField'
  },
  init(self) {
    self.enableBrowserData();
    self.addGradeFieldType();
  },
  methods(self) {
    return {
      addGradeFieldType() {
        self.apos.schema.addFieldType({
          name: 'grade',
          convert: self.convertInput,
          vueComponent: 'InputGradeField'
        });
      },
      exposeSchema() {
        const schema = [
          {
            type: 'integer',
            name: 'midterm',
            label: '期中考试',
            required: true
          },
          {
            type: 'integer',
            name: 'midterm12',
            label: '期初考试',
            required: true
          },
          {
            type: 'integer',
            name: 'final',
            label: '期末考试',
            required: true
          }
        ];
        return schema;
      },
      async convertInput(req, field, data, object) {
        data = data[field.name];
        const schema = self.exposeSchema();
        const errors = [];
        const result = {};
        if (data == null || typeof data !== 'object' || Array.isArray(data)) {
          data = {};
        }
        try {
          await self.apos.schema.convert(req, schema, data, result);
        } catch (e) {
          for (const error of e) {
            errors.push({
              path: error.path,
              error: error.error
            });
          }
        }
        object[field.name] = result;
        if (errors.length) {
          throw errors;
        }
      },
      getBrowserData(req) {
        return {
          gradeSchema: self.exposeSchema()
        };
      }
    };
  }
};
