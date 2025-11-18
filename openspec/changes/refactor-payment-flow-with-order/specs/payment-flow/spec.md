# 支付流程规范 - Delta

## MODIFIED Requirements

### Requirement: SKU 列表页
系统 SHALL 提供 SKU 列表页，展示可选商品并引导用户购买。

#### Scenario: 访问 SKU 列表页
- **WHEN** 用户访问根路径 `/`
- **THEN** 显示页面标题"SKU 列表页"
- **AND** 显示多个 SKU 商品

#### Scenario: 选择 SKU 并购买
- **WHEN** 用户点击某个 SKU 的"立即购买"按钮
- **THEN** 导航到 `/platform` 支付页面
- **AND** 通过 URL query 传递 SKU 信息

### Requirement: 订单创建
系统 SHALL 在支付页面模拟创建订单，生成唯一订单 ID。

#### Scenario: 创建订单
- **WHEN** 用户进入支付页面
- **THEN** 系统生成唯一订单 ID（格式：ORD-{timestamp}-{random}）
- **AND** 创建订单数据对象（包含订单 ID、SKU ID、商品名、金额、创建时间）
- **AND** 在页面中展示订单信息

#### Scenario: 打开第三方支付
- **WHEN** 用户点击"打开第三方支付页面"按钮
- **THEN** 在新标签页打开 `/thirdpay`
- **AND** 携带订单 ID 参数
- **AND** 携带 redirect URL 参数

### Requirement: 第三方支付页重定向
系统 SHALL 在第三方支付页使用 302 重定向跳转到支付结果页。

#### Scenario: 支付成功重定向
- **WHEN** 用户点击"模拟支付成功"按钮
- **THEN** 触发 302 重定向到 `/pay/success?orderId=xxx`

#### Scenario: 支付失败重定向
- **WHEN** 用户点击"模拟支付失败"按钮
- **THEN** 触发 302 重定向到 `/pay/fail?orderId=xxx`

### Requirement: 支付结果数据写入
系统 SHALL 在支付结果页写入完整的订单信息到 localStorage。

#### Scenario: 写入支付成功数据
- **WHEN** 用户访问 `/pay/success` 页面
- **THEN** 从 URL query 读取订单 ID
- **AND** 构建完整的支付结果数据对象（包含 status、orderId、timestamp、skuInfo）
- **AND** 写入 localStorage 键名为 `payment_result`
- **AND** 尝试自动关闭窗口

#### Scenario: 写入支付失败数据
- **WHEN** 用户访问 `/pay/fail` 页面
- **THEN** 从 URL query 读取订单 ID
- **AND** 构建完整的支付结果数据对象（包含 status、orderId、timestamp、skuInfo）
- **AND** 写入 localStorage 键名为 `payment_result`
- **AND** 尝试自动关闭窗口

### Requirement: 支付结果监听
系统 SHALL 在支付页面监听 localStorage 变化并展示订单详情。

#### Scenario: 接收支付结果
- **WHEN** localStorage 中 `payment_result` 值发生变化
- **THEN** 解析支付结果数据
- **AND** 显示支付状态（成功/失败）
- **AND** 显示订单详细信息
- **AND** 停止监听

