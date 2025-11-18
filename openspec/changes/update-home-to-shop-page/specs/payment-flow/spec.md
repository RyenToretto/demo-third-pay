# 支付流程规范 - Delta

## MODIFIED Requirements

### Requirement: 首页展示
系统 SHALL 提供商城首页，展示商品列表并引导用户购买。

#### Scenario: 访问首页
- **WHEN** 用户访问根路径 `/`
- **THEN** 显示页面标题"商城首页"
- **AND** 显示商品列表（至少 3 个商品）

#### Scenario: 展示商品信息
- **WHEN** 页面加载完成
- **THEN** 每个商品卡片显示商品图片
- **AND** 显示商品名称
- **AND** 显示商品价格
- **AND** 显示"立即购买"按钮

#### Scenario: 点击立即购买按钮
- **WHEN** 用户点击某个商品的"立即购买"按钮
- **THEN** 导航到 `/platform` 支付页面
- **AND** 通过 URL query 传递商品 ID、名称和价格

### Requirement: 支付页面
系统 SHALL 提供支付页面，展示实际的商品订单信息并允许用户打开第三方支付窗口。

#### Scenario: 展示订单信息
- **WHEN** 用户访问 `/platform` 页面
- **THEN** 从 URL query 读取商品信息
- **AND** 显示实际的商品名称
- **AND** 显示实际的商品价格
- **AND** 生成唯一的订单号
- **AND** 显示"打开第三方支付页面（模拟）"按钮

#### Scenario: 打开第三方支付窗口
- **WHEN** 用户点击"打开第三方支付页面"按钮
- **THEN** 在新标签页打开 `/thirdpay?orderId=xxx`
- **AND** 当前页面保持打开状态
- **AND** 开始监听 localStorage 变化

#### Scenario: 接收支付成功通知
- **WHEN** localStorage 中 `payment_status` 值变为 `success`
- **THEN** 显示"支付成功"提示
- **AND** 停止监听

#### Scenario: 接收支付失败通知
- **WHEN** localStorage 中 `payment_status` 值变为 `fail`
- **THEN** 显示"支付失败"提示
- **AND** 停止监听

#### Scenario: 防止重复打开支付窗口
- **WHEN** 用户已点击"打开第三方支付页面"按钮
- **AND** 支付结果尚未返回
- **THEN** 按钮应禁用，防止重复打开

