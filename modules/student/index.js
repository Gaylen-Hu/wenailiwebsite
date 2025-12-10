/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-06 21:51:39
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-06 22:37:48
 * @FilePath: \wenaili\modules\student\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export default {
    extend: '@apostrophecms/piece-type',
    options: {
      label: 'Student'
    },
    fields: {
      add: {
        title: {
          label: 'Student Name',
          type: 'string',
          required: true
        },

        icon: {
          label: 'iconclass',
          type: 'iconPicker',
        },
        color:{
          label:'color',
          type:'colorGradient'
        }
       
        
      },
      group: {
        basics: {
          label: 'Basics',
          fields: [ 'title', 'gradesArray' ]
        }
      }
    },
    init(self) {
      self.addGradeFieldType();
    },
    methods(self) {
      return {
        addGradeFieldType() {
          self.apos.schema.addFieldType({
            name: 'grades',
            convert: self.convertInput,
            vueComponent: 'InputGradeField'
          });
        },
        exposeSchema() {
          const schema = [
            {
              type: 'integer',
              name: 'midterm',
              label: 'Midterm Test',
              required: true
            },
            {
              type: 'integer',
              name: 'final',
              label: 'Final Test',
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
        }
      };
    },
    extendMethods(self) {
      return {
        getBrowserData(_super, req) {
          const browserData = _super(req);
          browserData.gradeSchema = self.exposeSchema();
          return browserData;
        }
      };
    }
  };