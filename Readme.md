# 现代化弹窗组件

一个轻量级、现代化的弹窗组件，支持成功和错误提示，并具有深色模式支持。

## 特性

- 🎨 现代化设计风格
- 🌓 支持深色/浅色模式切换
- ✨ 平滑动画效果
- 📱 响应式设计
- 🎯 简单易用的API
- 🔒 防抖动处理

## 安装

将以下文件复制到你的项目中：
- `alert.css`
- `alert.js`

## 使用方法

1. 在HTML文件中引入必要文件：

```html
<link rel="stylesheet" href="alert.css">
<script src="alert.js"></script>
```

2. 调用弹窗函数：

```javascript
// 显示成功提示
showAlert('操作成功', 'success');

// 显示错误提示
showAlert('操作失败', 'error');
```

## API

### showAlert(message, type)

显示一个弹窗提示。

参数：
- `message` (String): 要显示的消息文本
- `type` (String): 弹窗类型，可选值：
  - `'success'`: 成功提示
  - `'error'`: 错误提示

## 样式定制

组件使用CSS变量进行样式定制，你可以通过覆盖以下类来自定义样式：

- `.alert-success`: 成功提示样式
- `.alert-error`: 错误提示样式
- `.dark-mode`: 深色模式样式

## 深色模式

组件支持深色模式，可以通过添加 `dark-mode` 类到 `body` 元素来启用：

```javascript
document.body.classList.toggle('dark-mode');
```

## 响应式设计

组件自动适应不同屏幕尺寸：
- 在移动设备上自动调整padding和间距
- 弹窗宽度自适应屏幕大小
- 最大宽度限制为90vw

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 示例

查看 `example.html` 文件获取完整使用示例。        