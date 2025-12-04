# 通用图标选择器字段 (Icon Picker Field)

这是一个为 ApostropheCMS 项目设计的通用图标选择器自定义字段类型，提供直观的可视化图标选择界面。

## 功能特点

- 🎨 **可视化选择**：通过点击图标进行选择，无需手动输入类名
- 📱 **响应式设计**：支持桌面和移动设备
- 🌙 **深色模式支持**：自动适配深色主题
- 🏷️ **分组显示**：图标按类别分组显示
- 💡 **悬停提示**：鼠标悬停显示图标名称
- 🎯 **多类别图标**：包含基础、业务、物流、技术、社交媒体等图标

## 使用方法

### 1. 在 app.js 中启用模块

```javascript
modules: {
  'icon-picker-field': {},
  // 其他模块...
}
```

### 2. 在字段定义中使用

```javascript
fields: {
  add: {
    iconClass: {
      type: 'iconPicker',
      label: '选择图标',
      def: 'fa-solid fa-star'
    }
  }
}
```

## 可用图标分类

### 基础图标
- 星标、爱心、点赞、对勾、关闭、加号、减号等

### 业务图标
- 火箭、灯泡、奖杯、盾牌、目标、图表、团队等

### 物流图标
- 卡车、飞机、轮船、包裹、路线、仓库等

### 技术图标
- 代码、电脑、服务器、数据库、云、机器人等

### 社交媒体图标
- Facebook、Twitter、Instagram、微信、微博等

## 技术实现

### 服务器端
- 继承 `@apostrophecms/module`
- 注册 `iconPicker` 字段类型
- 提供图标选项数据

### 浏览器端
- Vue 3 Composition API
- AposInputWrapper 和 AposInputMixin
- 响应式设计和事件处理

## 示例

在任何 Apostrophe 模块中使用：

```javascript
// 在 piece-type 或 widget-type 中
fields: {
  add: {
    myIcon: {
      type: 'iconPicker',
      label: '选择图标',
      def: 'fa-solid fa-heart'
    }
  }
}
```

这样用户就可以通过友好的界面选择图标，而不需要记住 Font Awesome 的类名了。

## 注意事项

- 确保项目中已包含 Font Awesome 图标库
- 图标选择器会自动处理数据验证和存储
- 支持字段的默认值设置
