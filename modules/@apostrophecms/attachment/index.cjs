/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-17 14:21:36
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-17 14:21:38
 * @FilePath: \wenaili\modules\@apostrophecms\attachment\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { module } from 'apostrophe';

export default module({
  options: {
    maxSize: 10485760 // 10 MB in bytes
  }
}); 