# 修复支付结果流程

## Why
当前支付流程存在两个体验问题：
1. 第三方支付页面有三个按钮（成功、失败、取消），但实际上取消也应该算作支付失败
2. 支付结果页（success/fail）显示过多信息和手动关闭提示，应该只显示 loading 动画并立即自动关闭

## What Changes
- 第三方支付页面简化为两个按钮：支付成功、支付失败（移除取消按钮）
- 支付结果页（success/fail）只显示 loading 转圈动画
- 支付结果页写入 localStorage 后立即调用 window.close()
- 移除手动关闭提示，简化用户体验
- 修改 localStorage 键名从 `payment_result` 改为 `payment_status`（更简洁）

## Impact
- 修改能力：payment-flow（支付流程）
- 影响文件：
  - `app/pages/thirdpay.vue` - 移除取消按钮
  - `app/pages/pay/success.vue` - 只显示 loading 动画
  - `app/pages/pay/fail.vue` - 只显示 loading 动画
  - `app/pages/platform.vue` - 更新监听的键名
- 无破坏性变更，优化用户体验

