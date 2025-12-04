/*
 * @Author: xinyuHu hxyrkcy@outlook.com
 * @Date: 2025-12-03 10:30:00
 * @LastEditors: xinyuHu hxyrkcy@outlook.com
 * @LastEditTime: 2025-12-03 10:30:00
 * @FilePath: \wenaili\modules\icon-picker-field\index.js
 * @Description: 通用图标选择器字段类型模块
 */

export default {
  extend: '@apostrophecms/module',
  options: {
    alias: 'iconPicker'
  },
  init(self) {
    // 启用浏览器数据
    self.enableBrowserData();
    self.addIconPickerFieldType();
  },
  methods(self) {
    return {
      addIconPickerFieldType() {
        self.apos.schema.addFieldType({
          name: 'iconPicker',
          convert: self.convertIconInput,
          vueComponent: 'InputIconPickerField'
        });
      },
      getIconOptions() {
        return [
          // 基础图标
          {
            label: '基础图标',
            icons: [
              { value: 'fa-solid fa-star', label: '星标' },
              { value: 'fa-solid fa-heart', label: '爱心' },
              { value: 'fa-solid fa-thumbs-up', label: '点赞' },
              { value: 'fa-solid fa-check', label: '对勾' },
              { value: 'fa-solid fa-times', label: '关闭' },
              { value: 'fa-solid fa-plus', label: '加号' },
              { value: 'fa-solid fa-minus', label: '减号' },
              { value: 'fa-solid fa-info', label: '信息' },
              { value: 'fa-solid fa-exclamation', label: '警告' },
              { value: 'fa-solid fa-question', label: '问题' },
              { value: 'fa-solid fa-search', label: '搜索' },
              { value: 'fa-solid fa-home', label: '首页' },
              { value: 'fa-solid fa-user', label: '用户' },
              { value: 'fa-solid fa-cog', label: '设置' },
              { value: 'fa-solid fa-envelope', label: '邮件' },
              { value: 'fa-solid fa-phone', label: '电话' }
            ]
          },
          // 业务图标
          {
            label: '业务图标',
            icons: [
              { value: 'fa-solid fa-rocket', label: '火箭' },
              { value: 'fa-solid fa-lightbulb', label: '灯泡' },
              { value: 'fa-solid fa-trophy', label: '奖杯' },
              { value: 'fa-solid fa-shield', label: '盾牌' },
              { value: 'fa-solid fa-target', label: '目标' },
              { value: 'fa-solid fa-chart-line', label: '图表' },
              { value: 'fa-solid fa-chart-bar', label: '柱状图' },
              { value: 'fa-solid fa-chart-pie', label: '饼图' },
              { value: 'fa-solid fa-users', label: '团队' },
              { value: 'fa-solid fa-user-tie', label: '商务人士' },
              { value: 'fa-solid fa-building', label: '建筑' },
              { value: 'fa-solid fa-briefcase', label: '公文包' },
              { value: 'fa-solid fa-handshake', label: '握手' },
              { value: 'fa-solid fa-money-bill', label: '钞票' },
              { value: 'fa-solid fa-credit-card', label: '信用卡' },
              { value: 'fa-solid fa-shopping-cart', label: '购物车' }
            ]
          },
          // 物流图标
          {
            label: '物流图标',
            icons: [
              { value: 'fa-solid fa-truck', label: '卡车' },
              { value: 'fa-solid fa-plane', label: '飞机' },
              { value: 'fa-solid fa-ship', label: '轮船' },
              { value: 'fa-solid fa-box', label: '包裹' },
              { value: 'fa-solid fa-boxes', label: '多个包裹' },
              { value: 'fa-solid fa-route', label: '路线' },
              { value: 'fa-solid fa-map-marker-alt', label: '地图标记' },
              { value: 'fa-solid fa-warehouse', label: '仓库' },
              { value: 'fa-solid fa-clipboard-list', label: '清单' },
              { value: 'fa-solid fa-dolly', label: '手推车' },
              { value: 'fa-solid fa-pallet', label: '托盘' },
              { value: 'fa-solid fa-shipping-fast', label: '快速发货' },
              { value: 'fa-solid fa-truck-moving', label: '搬运卡车' },
              { value: 'fa-solid fa-weight-hanging', label: '重量' },
              { value: 'fa-solid fa-tachometer-alt', label: '速度表' },
              { value: 'fa-solid fa-clock', label: '时钟' }
            ]
          },
          // 技术图标
          {
            label: '技术图标',
            icons: [
              { value: 'fa-solid fa-code', label: '代码' },
              { value: 'fa-solid fa-laptop', label: '笔记本电脑' },
              { value: 'fa-solid fa-mobile-alt', label: '手机' },
              { value: 'fa-solid fa-desktop', label: '台式电脑' },
              { value: 'fa-solid fa-server', label: '服务器' },
              { value: 'fa-solid fa-database', label: '数据库' },
              { value: 'fa-solid fa-cloud', label: '云' },
              { value: 'fa-solid fa-wifi', label: 'WiFi' },
              { value: 'fa-solid fa-robot', label: '机器人' },
              { value: 'fa-solid fa-brain', label: '大脑' },
              { value: 'fa-solid fa-microchip', label: '芯片' },
              { value: 'fa-solid fa-cogs', label: '齿轮组' },
              { value: 'fa-solid fa-sliders', label: '滑块' },
              { value: 'fa-solid fa-tools', label: '工具' },
              { value: 'fa-solid fa-wrench', label: '扳手' },
              { value: 'fa-solid fa-screwdriver', label: '螺丝刀' }
            ]
          },
          // 社交媒体图标
          {
            label: '社交媒体',
            icons: [
              { value: 'fa-brands fa-facebook', label: 'Facebook' },
              { value: 'fa-brands fa-twitter', label: 'Twitter' },
              { value: 'fa-brands fa-instagram', label: 'Instagram' },
              { value: 'fa-brands fa-linkedin', label: 'LinkedIn' },
              { value: 'fa-brands fa-youtube', label: 'YouTube' },
              { value: 'fa-brands fa-wechat', label: '微信' },
              { value: 'fa-brands fa-weibo', label: '微博' },
              { value: 'fa-brands fa-tiktok', label: 'TikTok' },
              { value: 'fa-solid fa-share', label: '分享' },
              { value: 'fa-solid fa-comment', label: '评论' },
              { value: 'fa-solid fa-thumbs-up', label: '点赞' },
              { value: 'fa-solid fa-heart', label: '爱心' }
            ]
          }
        ];
      },
      async convertIconInput(req, field, data, object) {
        // Icon picker field stores a simple string value
        const value = data[field.name];
        if (typeof value === 'string' && value.trim()) {
          object[field.name] = value.trim();
        } else {
          object[field.name] = field.def || '';
        }
      },
      getBrowserData(req) {
        return {
          iconOptions: self.getIconOptions()
        };
      }
    };
  }
};