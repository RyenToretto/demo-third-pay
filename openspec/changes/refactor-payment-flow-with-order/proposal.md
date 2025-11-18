# 重构支付流程增加订单创建机制

## Why
当前支付流程缺少订单创建环节，订单号只是简单展示，不够真实。需要模拟真实的电商支付场景：
1. 首页改为 SKU 列表页
2. 支付页面模拟创建订单，生成订单 ID
3. 携带订单 ID 和 redirect 参数跳转到第三方支付
4. 第三方支付使用 302 重定向而非前端路由跳转
5. 支付结果页写入完整的订单信息到 localStorage

## What Changes
- 更新首页标题为"SKU 列表页"
- 支付页面添加订单创建逻辑（模拟）
- 生成唯一订单 ID
- 打开第三方支付时携带订单 ID 和 redirect URL
- 第三方支付页改用服务端 302 重定向
- 支付结果页写入完整信息（支付结果、订单信息、SKU）
- 优化 localStorage 数据结构

## Impact
- 修改能力：payment-flow（支付流程）
- 影响文件：
  - `app/pages/index.vue` - 更新为 SKU 列表页
  - `app/pages/platform.vue` - 添加订单创建逻辑
  - `app/pages/thirdpay.vue` - 改用 302 重定向
  - `app/pages/pay/success.vue` - 写入完整订单信息
  - `app/pages/pay/fail.vue` - 写入完整订单信息
- 无破坏性变更，优化现有流程

