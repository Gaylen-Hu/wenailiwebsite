/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-11-16 23:13:19
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2026-01-07 22:10:01
 * @FilePath: \wenaili\ecosystem.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

console.log('process.env.NODE_ENV',process.env)
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
        APOS_BASE_URL: process.env.APOS_BASE_URL || 'https://www.wenaili.com',
        // 阿里云 OSS 配置
        APOS_S3_KEY: process.env.APOS_S3_KEY || '',
        APOS_S3_SECRET: process.env.APOS_S3_SECRET || '',
        APOS_S3_BUCKET: process.env.APOS_S3_BUCKET || '',
        APOS_S3_REGION: process.env.APOS_S3_REGION || 'cn-beijing',
        APOS_S3_ENDPOINT: process.env.APOS_S3_ENDPOINT || 'https://oss-cn-beijing.aliyuncs.com',
        APOS_CDN_URL: process.env.APOS_CDN_URL || '',
        // Session 配置
        APOSTROPHE_SESSION_SECRET: process.env.APOSTROPHE_SESSION_SECRET || process.env.SESSION_SECRET || '',
        // MongoDB 配置
        APOS_MONGODB_URI: process.env.APOS_MONGODB_URI || '',
        // Email 配置
        APOS_EMAIL_SMTP_HOST: process.env.APOS_EMAIL_SMTP_HOST || 'smtp.exmail.qq.com',
        APOS_EMAIL_SMTP_PORT: process.env.APOS_EMAIL_SMTP_PORT || '465',
        APOS_EMAIL_SMTP_USER: process.env.APOS_EMAIL_SMTP_USER || 'melanie@wenaili.com',
        APOS_EMAIL_SMTP_PASS: process.env.APOS_EMAIL_SMTP_PASS || 'Gq9KvpRRs2rJb5pp'
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


