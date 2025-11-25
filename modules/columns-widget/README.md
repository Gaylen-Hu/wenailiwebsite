# Columns Widget - TailwindCSS 增强版

此小部件为 ApostropheCMS 提供强大的列布局功能，完全支持 TailwindCSS 和暗黑模式。

## ✨ 功能特性

### 🎨 布局选项
- **全宽布局**: 跨越整个视口宽度
- **容器布局**: 使用最大宽度容器，居中显示
- **列配置**:
  - 单列 (可调节宽度 10%-100% 和对齐方式)
  - 双列 (50%/50%)
  - 三列 (33%/33%/33%)
  - 四列 (25%/25%/25%/25%)

### 🌙 主题支持
- **自动暗黑模式检测**: 根据系统主题自动切换
- **平滑过渡**: 主题切换时的颜色过渡效果
- **高对比度支持**: 适配高对比度用户偏好

### 📱 响应式设计
- **移动优先**: 在小屏幕上自动堆叠
- **断点优化**: 针对不同屏幕尺寸优化布局
- **自适应列**: 根据内容自动调整列宽

### 🎯 交互增强
- **悬停效果**: 鼠标悬停时的缩放和阴影动画

## 📁 文件结构

```
modules/columns-widget/
├── index.js              # 小部件配置
├── views/
│   └── widget.html       # 模板文件（包含内联样式）
├── public/               # 静态资源
└── README.md            # 文档
```

## 🔧 配置选项

### 布局样式 (style)
- `full`: 全宽布局
- `contained`: 容器宽度布局

### 列配置 (cols)
- `single`: 单列布局
- `double`: 双列布局
- `triple`: 三列布局
- `quadruple`: 四列布局

### 单列选项 (仅在单列模式下)
- `singleAlign`: 对齐方式 (left/center/right)
- `singleWidth`: 宽度百分比 (10-100%)

## 🎨 样式特性

### TailwindCSS 集成
- 直接使用 TailwindCSS 类，无需自定义 CSS
- 支持所有 TailwindCSS 功能和响应式断点
- 内联样式增强，提供悬停和过渡效果

### 暗黑模式
```html
<!-- 自动应用暗黑模式 -->
<section class="bg-white dark:bg-slate-950 transition-colors">
  <div class="hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
    <!-- 内容区域 -->
  </div>
</section>
```

## 🚀 使用方法

### 在页面中使用
1. 在 ApostropheCMS 管理界面中添加 Columns Widget
2. 选择布局样式和列配置
3. 在每个列中添加内容小部件
4. 保存并预览

### 自定义样式
直接在 `widget.html` 中的 class 属性中修改 TailwindCSS 类：

```html
<div class="space-y-8 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
  <!-- 修改这里的类来定制样式 -->
</div>
```

## 📱 响应式断点

| 断点 | 列数 | 布局 |
|------|------|------|
| < 768px | 1 | 垂直堆叠 |
| 768px - 1024px | 2 | 两列 |
| > 1024px | 3-4 | 完整网格 |

## ♿ 无障碍支持

- **语义化 HTML**: 使用标准的 HTML 结构
- **主题适配**: 支持暗黑模式和系统偏好

## 🔍 浏览器支持

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📝 开发说明

### 添加新功能
1. 在 `index.js` 中添加配置选项
2. 在 `widget.html` 中更新模板逻辑和 TailwindCSS 类
3. 直接在 HTML 模板中调整样式

### 样式定制
所有样式都直接在 HTML 模板中使用 TailwindCSS 类，无需单独的样式文件。

## 🐛 故障排除

### 常见问题
1. **列不响应式**: 检查 TailwindCSS 配置和响应式类
2. **暗黑模式不工作**: 验证 `data-theme` 属性设置
3. **样式不生效**: 检查 TailwindCSS 类名是否正确
