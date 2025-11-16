/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-16 23:13:19
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-11-16 23:13:21
 * @FilePath: \wenaili\ecosystem.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  apps: [
    {
      name: 'wenaili-app',
      script: './app.js',

      // 多进程
      instances: 'max',           // 使用所有可用 CPU 核心
      exec_mode: 'cluster',       // 集群模式

      // 环境变量
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        },

      // 日志配置
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',

      // 高级与重启策略
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};


