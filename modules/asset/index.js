/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-17 10:31:31
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-17 10:31:34
 * @FilePath: \wenaili\modules\asset\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack(req) {
          req.data.isDev = (process.env.NODE_ENV !== 'production');
        }
      }
    };
  }
};
