# 修复支付流程 UI 和逻辑

## Why
当前支付流程存在两个问题：
1. 第三方支付页面有"取消"选项，但实际上只应有成功/失败两种结果，取消也应该算作失败
2. 支付结果页（success/fail）显示了过多内容和文案，应该只显示 loading 动画，写入 localStorage 后立即关闭

## What Changes
- 移除第三方支付页的"模拟取消"按钮，只保留成功/失败两个选项
- 简化支付结果页 UI，只显示 loading 转圈动画
- 移除支付结果页的多余文案和手动关闭按钮
- 优化 localStorage 写入逻辑，写入后立即关闭窗口
- 统一使用 `payment_result` 作为 localStorage key

## Impact
- 修改能力：payment-flow（支付流程）
- 影响文件：
  - `app/pages/thirdpay.vue` - 移除取消按钮
  - `app/pages/pay/success.vue` - 简化为 loading 动画
  - `app/pages/pay/fail.vue` - 简化为 loading 动画
- 无破坏性变更，优化用户体验

