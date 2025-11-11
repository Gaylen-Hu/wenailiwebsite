# Basiclayout Widget

一个功能强大的基础布局小部件，提供灵活的标题、描述和内容区域配置。

## 功能特性

- 🎨 **自定义样式**: 支持背景颜色和文字颜色自定义
- 📱 **响应式设计**: 完全响应式，适配所有设备
- ⚡ **动画效果**: 内置滚动动画和交互效果
- 🎯 **灵活布局**: 可配置的内边距和容器宽度
- 🔧 **易于使用**: 直观的管理界面

## 字段配置

### 内容设置
- **标题**: 主要标题文本
- **描述**: 支持多行文本的描述内容
- **内容**: 富文本内容区域，支持各种小部件

### 设计设置
- **背景颜色**: 自定义背景颜色
- **文字颜色**: 自定义文字颜色
- **内边距大小**: 小、中、大、超大四种选择
- **容器宽度**: 窄、中等、宽、全宽四种选择

## 样式类

### 主题变体
- `.basiclayout-widget--dark`: 深色主题
- `.basiclayout-widget--light`: 浅色主题
- `.basiclayout-widget--accent`: 强调色主题

### 特殊效果
- `.basiclayout-widget--parallax`: 视差滚动效果
- `.basiclayout-widget--glass`: 毛玻璃效果

## 使用示例

### 基本用法
```html
<section data-basiclayout-widget class="basiclayout-widget py-20">
  <div class="basiclayout-widget__container max-w-7xl mx-auto px-4">
    <div class="basiclayout-widget__header text-center mb-16">
      <h2 class="basiclayout-widget__title">标题</h2>
      <div class="basiclayout-widget__divider"></div>
      <div class="basiclayout-widget__description">描述内容</div>
    </div>
    <div class="basiclayout-widget__content">
      <!-- 内容区域 -->
    </div>
  </div>
</section>
```

### 主题变体
```html
<!-- 深色主题 -->
<section data-basiclayout-widget class="basiclayout-widget basiclayout-widget--dark">

<!-- 毛玻璃效果 -->
<section data-basiclayout-widget class="basiclayout-widget basiclayout-widget--glass">

<!-- 视差效果 -->
<section data-basiclayout-widget class="basiclayout-widget basiclayout-widget--parallax">
```

## JavaScript API

### 初始化
```javascript
const widget = new BasiclayoutWidget(element);
```

### 公共方法
- `refresh()`: 刷新动画效果
- `destroy()`: 销毁实例并清理事件监听器

## 自定义样式

可以通过 SCSS 变量自定义样式：

```scss
.basiclayout-widget {
  // 自定义样式
  &__title {
    font-family: 'Custom Font', sans-serif;
  }
  
  &__divider {
    background: linear-gradient(90deg, transparent, currentColor, transparent);
  }
}
```

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 更新日志

### v1.1.0
- 添加了颜色自定义功能
- 增强了响应式设计
- 添加了动画效果
- 改进了模板结构

### v1.0.0
- 初始版本发布
- 基础布局功能
- 标题和描述支持
