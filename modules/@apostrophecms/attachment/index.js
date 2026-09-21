/**
 * 附件模块配置
 *
 * ⚠️ maxSize 只是一个「前端提示文案」，不具拦截能力：
 * 核心 @apostrophecms/attachment 只在 getBrowserData() 里把它透传给浏览器
 * （见 node_modules/apostrophe/modules/@apostrophecms/attachment/index.js:1192），
 * 由 AposMediaUploaderUi.vue 显示「最大 XX MB」，服务端与前端都不做校验。
 *
 * 真正生效的服务端体积上限在 modules/@apostrophecms/express/index.js 的中间件里。
 *
 * 历史背景：本文件原为 index.cjs，存在两处致命问题，导致配置从未生效——
 *   1. 文件名：Apostrophe 的模块加载器只识别 index.js
 *      （见 node_modules/apostrophe/lib/moog-require.js:57,65）
 *   2. 内容：`import { module } from 'apostrophe'` 中 module 并非该包的具名导出
 *      （apostrophe 只导出 buildRoot/bundle/default/getNpmPath），
 *      即使被加载也会抛 TypeError
 */

export default {
  options: {
    maxSize: 10 * 1024 * 1024
  }
};
