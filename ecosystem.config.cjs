'use strict';

module.exports = {
  apps: [
    {
      name: 'wenaili-app',
      script: './app.js',
      cwd: __dirname,

      // Keep a single process until shared sessions and sticky routing are enabled.
      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: Number(process.env.PORT || 3000)
      },

      out_file: './logs/out.log',
      error_file: './logs/error.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      kill_timeout: 5000,
      listen_timeout: 10000,
      max_memory_restart: '2G',
      node_args: '--max-old-space-size=2048'
    }
  ]
};
