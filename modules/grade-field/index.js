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
