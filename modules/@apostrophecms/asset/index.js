export default {
  // When not in production, refresh the page on restart
  options: {
    // HMR 配置：'public' 用于项目 UI，'apos' 用于管理界面，false 禁用 HMR
    // 生产环境禁用 HMR，使用静态构建资源
    hmr: process.env.NODE_ENV === 'production' ? false : 'public',
    refreshOnRestart: true
  }
};
