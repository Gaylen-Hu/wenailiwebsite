/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-17 10:31:31
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-04 02:22:17
 * @FilePath: \wenaili\modules\asset\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  build: {
    vite: {
      extensions: {
        buildSizeWarning: {
          // https://vite.dev/config/build-options.html#build-chunksizewarninglimit
          build: {
            chunkSizeWarningLimit: 650
          }
        }
      }
    }
  },
  init(self) {
    // self.addPublicAssets({
    //   'fontawesome': path.join(__dirname, 'ui/src/webfonts')
    // });
  },
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack(req) {
          req.data.isDev = (process.env.NODE_ENV !== 'production');
        },
        // 提供 FontAwesome 资源
        provideFontAwesome(req) {
          // FontAwesome 7.1.0 资源路径
          req.data.fontAwesome = {
            version: '7.1.0',
            cssUrl: '/modules/asset/fontawesome/css/all.min.css',
            webfontsUrl: '/modules/asset/fontawesome/webfonts/'
          };
        }
      }
    };
  }
};
