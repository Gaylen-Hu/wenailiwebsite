# 自定义颜色渐变字段 (Color Gradient Field)

这是一个为 ApostropheCMS 项目设计的自定义颜色渐变字段类型，提供直观的可视化颜色渐变创建界面。

## 功能特点

- 🎨 **可视化渐变预览**：实时显示创建的颜色渐变效果
- 🔧 **角度控制**：支持 0-360 度的渐变角度调整
- 🎯 **多色渐变**：支持添加多个颜色和位置控制
- 📱 **响应式设计**：支持桌面和移动设备
- 🌙 **深色模式支持**：自动适配深色主题

## 字段结构

颜色渐变字段包含以下配置：

```javascript
{
  angle: 90,        // 渐变角度 (0-360度)
  colors: [          // 颜色数组
    {
      color: '#ff0000',  // 颜色值
      stop: 0           // 位置百分比 (0-100%)
    },
    {
      color: '#0000ff',  // 颜色值
      stop: 100         // 位置百分比 (0-100%)
    }
  ]
}
```

## 使用方法

### 1. 在 app.js 中启用模块

```javascript
modules: {
  'color-gradient-field': {},
  // 其他模块...
}
```

### 2. 在字段定义中使用

```javascript
fields: {
  add: {
    gradient: {
      type: 'colorGradient',
      label: '颜色渐变',
      help: '选择或创建颜色渐变效果'
    }
  }
}
```

### 3. 在模板中使用

```nunjucks
{# 获取渐变数据 #}
{% set gradientData = piece.gradient %}
{% if gradientData %}
  {# 构建CSS渐变字符串 #}
  {% set gradientString = '' %}
  {% for color in gradientData.colors %}
    {% set gradientString = gradientString + color.color + ' ' + color.stop + '%,' %}
  {% endfor %}
  {% set gradientString = 'linear-gradient(' + gradientData.angle + 'deg, ' + gradientString | trim(',') + ')' %}

  {# 应用渐变样式 #}
  <div style="background: {{ gradientString }};">
    渐变背景内容
  </div>
{% endif %}
```

## 技术实现

### 服务器端
- 继承 `@apostrophecms/module`
- 注册 `colorGradient` 字段类型
- 提供数据验证和转换

### 浏览器端
- Vue 3 Composition API
- AposInputWrapper 和 AposSchema 组件
- 实时渐变预览

## 示例应用场景

### 1. Hero 区域背景
```css
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### 2. 按钮渐变效果
```css
.gradient-button {
  background: linear-gradient(45deg, #ff6b6b 0%, #ffa726 100%);
}
```

### 3. 文字渐变效果
```css
.gradient-text {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 测试

创建测试模块验证功能：

```javascript
// modules/test-gradient/index.js
export default {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      gradient: {
        type: 'colorGradient',
        label: '颜色渐变'
      }
    }
  }
}
```

## 注意事项

- 渐变效果在不同浏览器中可能有轻微差异
- 建议设置合理的默认值以提供更好的用户体验
- 颜色值支持 hex、rgb、hsl 等标准格式

## 扩展功能

可以根据需要扩展更多功能：

- 径向渐变支持 (radial-gradient)
- 渐变类型选择 (linear/radial/conic)
- 预设渐变模板
- 颜色透明度控制
