# FontAwesome 本地部署指南

## 概述

项目已配置为使用本地 FontAwesome 7.1.0 文件，而不是 CDN。这样可以提高性能、减少外部依赖，并确保版本控制。

## 文件结构

```
modules/asset/ui/public/fontawesome/
├── css/
│   └── all.min.css          # FontAwesome 主 CSS 文件
└── webfonts/                # 字体文件目录（需要手动复制）
    ├── fa-brands-400.woff2  # 品牌图标字体
    ├── fa-regular-400.woff2 # 常规图标字体
    ├── fa-solid-900.woff2   # 实心图标字体
    └── fa-v4compatibility.woff2 # 兼容性字体
```

## 部署步骤

### 1. 复制字体文件

从你下载的 FontAwesome 包中复制字体文件：

```bash
# 从下载的包复制到项目
cp docs/fontawesome/webfonts/* modules/asset/ui/public/fontawesome/webfonts/
```

### 2. 验证文件

确认所有文件都已正确复制：

```bash
ls -la modules/asset/ui/public/fontawesome/webfonts/
```

应该看到：
- `fa-brands-400.woff2`
- `fa-regular-400.woff2`
- `fa-solid-900.woff2`
- `fa-v4compatibility.woff2`

### 3. 启动服务器

```bash
npm run dev
```

### 4. 验证部署

访问测试页面验证 FontAwesome 是否正常工作：
- 进入 FontAwesome 测试页面
- 检查所有图标是否正确显示
- 确认没有网络错误

## 配置详情

### 1. Layout 配置

`views/layout.html` 中的引用：
```html
<link rel="stylesheet" href="/modules/asset/fontawesome/css/all.min.css" />
```

### 2. Asset 模块

`modules/asset/index.js` 提供 FontAwesome 数据：
```javascript
handlers(self) {
  return {
    '@apostrophecms/page:beforeSend': {
      provideFontAwesome(req) {
        req.data.fontawesomeVersion = '7.1.0';
      }
    }
  };
}
```

### 3. CSS 字体路径

CSS 文件中的字体路径已更新为本地路径：
```css
@font-face {
  font-family: "Font Awesome 7 Brands";
  src: url(/modules/asset/fontawesome/webfonts/fa-brands-400.woff2);
}
```

## 使用方法

### 基本用法

```html
<!-- 实心图标 -->
<i class="fa-solid fa-star"></i>

<!-- 品牌图标 -->
<i class="fa-brands fa-github"></i>

<!-- 带样式的图标 -->
<i class="fa-solid fa-home text-blue-500 fa-lg"></i>
```

### 在组件中使用

```javascript
// 图标选择器
iconClass: {
  type: 'iconPicker',
  label: '选择图标',
  def: 'fa-solid fa-star'
}
```

## 故障排除

### 图标不显示

1. **检查字体文件**：
   ```bash
   ls modules/asset/ui/public/fontawesome/webfonts/
   ```

2. **检查浏览器控制台**：
   - 确认 CSS 文件加载成功
   - 检查字体文件请求是否成功

3. **清除缓存**：
   - 硬刷新页面 (Ctrl+F5)
   - 清除浏览器缓存

### 网络错误

如果看到字体文件请求失败：
1. 确认字体文件已正确复制
2. 检查文件权限
3. 确认服务器正常运行

## 版本信息

- **FontAwesome 版本**: 7.1.0
- **许可证**: CC BY 4.0 (图标), SIL OFL 1.1 (字体), MIT (代码)
- **包含**: Solid, Regular, Brands 图标集

## 更新说明

如需更新到新版本：

1. 下载新的 FontAwesome 包
2. 替换 `css/all.min.css` 文件
3. 复制新的字体文件到 `webfonts/` 目录
4. 更新版本号和配置
5. 测试所有功能

现在你已经成功将 FontAwesome 配置为本地部署！🎨✨