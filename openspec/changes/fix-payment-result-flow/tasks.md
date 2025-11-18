# 实现任务清单

## 1. 第三方支付页面简化
- [x] 1.1 移除"模拟取消"按钮
- [x] 1.2 只保留"模拟支付成功"和"模拟支付失败"两个按钮
- [x] 1.3 移除取消提示相关代码

## 2. 支付结果页改造
- [x] 2.1 success 页面只显示 loading 动画（移除其他内容）
- [x] 2.2 success 页面写入 localStorage 后立即 window.close()
- [x] 2.3 移除手动关闭提示相关代码（success）
- [x] 2.4 fail 页面只显示 loading 动画（移除其他内容）
- [x] 2.5 fail 页面写入 localStorage 后立即 window.close()
- [x] 2.6 移除手动关闭提示相关代码（fail）

## 3. 支付页面监听更新
- [x] 3.1 更新监听的 localStorage 键名（payment_result → payment_status）
- [x] 3.2 更新清除 localStorage 的键名

## 4. 样式优化
- [x] 4.1 添加 loading 转圈动画样式
- [x] 4.2 优化 loading 页面居中布局

