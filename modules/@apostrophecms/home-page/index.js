/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-11 19:29:09
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-11 21:17:16
 * @FilePath: \wenaili\modules\@apostrophecms\home-page\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-11 19:21:04
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-11 19:29:09
 * @FilePath: \wenaili\modules\@apostrophecms\home-page\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import areaConfig from '../../../lib/area.js';
export default {
  options: {
    label: 'Home Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          expanded: true,
          groups: {
            ...areaConfig.fullExpandedGroup
          }
        }
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
