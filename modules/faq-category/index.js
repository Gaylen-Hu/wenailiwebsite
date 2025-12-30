/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-29 21:48:13
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-29 22:09:14
 * @FilePath: \wenaili\modules\faq-category\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: '问题类型',
    pluralLabel: '问题类型管理',
    i18n: {
      browser: true
    },
    managerApiProjection: true,
    quickCreate: true,
    autopublish: true,
    searchable: true
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '类型名称',
        required: true,
        searchable: true,
        help: '问题类型的名称，如：服务相关、价格相关等1111111'
      },
      value: {
        type: 'string',
        label: '字段值',
        textarea: true,
        help: '字段值，如：service、pricing、technical、account、other',
        required: true,
        pattern: /^[a-zA-Z0-9_]+$/,
        message: '字段值只能包含字母数字下划线'
      },
      sortOrder: {
        type: 'integer',
        label: '排序',
        def: 0,
        help: '数字越小越靠前，相同数字按创建时间排序'
      }
    },
    group: {
      basics: {
        label: '基本信息',
        fields: ['title', 'value']
      },
      meta: {
        label: '发布信息',
        fields: ['sortOrder']
      }
    }
  },
  columns: {
    add: {
      title: {
        label: '类型名称',
        component: 'AposCellBasic'
      },
      value: {
        label: '字段值',
        component: 'AposCellBasic'
      },
      sortOrder: {
        label: '排序',
        component: 'AposCellBasic'
      }
    }
  },
  filters: {
    add: {
      title: {
        label: '类型名称'
      }
    }
  }
};

