export default {
  extend: '@apostrophecms/module',
  options: {
    alias: 'colorGradient'
  },
  init(self) {
    self.enableBrowserData();
    self.getBrowserData();
    self.addColorGradientFieldType();
  },
  methods(self) {
    return {
      exposeSchema() {
        const schema = [
          {
            name: 'angle',
            label: '角度',
            type: 'range',
            min: 0,
            max: 360,
            unit: 'deg',
            def: 90
          },
          {
            name: 'colors',
            label: '颜色',
            type: 'array',
            draggable: true,
            inline: true,
            schema: [
              {
                name: 'color',
                label: '选择颜色',
                type: 'color'
              },
              {
                name: 'stop',
                label: '位置',
                type: 'range',
                min: 0,
                max: 100,
                unit: '%',
                def: 0
              }
            ]
          }
        ];
        return schema;
      },
      addColorGradientFieldType() {
        self.apos.schema.addFieldType({
          name: 'colorGradient',
          convert: self.convertInput,
          vueComponent: 'InputColorGradientField'
        });
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
          gradientSchema: self.exposeSchema()
        };
      }
    };
  }
};