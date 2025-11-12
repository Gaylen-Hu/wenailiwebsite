/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-12 21:44:13
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-12 22:59:37
 * @FilePath: \wenaili\modules\default-page\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import areaConfig from '../../lib/area.js';
export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: '标题',
        required: true
      },
      description: {
        type: 'string',
        label: '描述',
        required: true
      },
      main: {
        type: 'area',
        options: {
          expanded: true,
          groups: {
            ...areaConfig.serverExpandedGroup
          }
        },
       
    
    },
  },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main',
          'contacts',
          'contactInfo'
        ]
      }
    }
  }
};
