# 支付流程规范

## ADDED Requirements

### Requirement: 首页展示
系统 SHALL 提供首页入口，引导用户进入支付流程。

#### Scenario: 访问首页
- **WHEN** 用户访问根路径 `/`
- **THEN** 显示页面标题"支付演示首页"
- **AND** 显示"去支付"按钮

#### Scenario: 点击去支付按钮
- **WHEN** 用户点击"去支付"按钮
- **THEN** 导航到 `/platform` 支付页面

### Requirement: 支付页面
系统 SHALL 提供支付页面，展示订单信息并允许用户打开第三方支付窗口。

#### Scenario: 展示订单信息
- **WHEN** 用户访问 `/platform` 页面
- **THEN** 显示订单号（示例：ORD-20231118-001）
- **AND** 显示订单金额（示例：¥99.00）
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

### Requirement: 模拟第三方支付页
系统 SHALL 提供模拟的第三方支付页面，允许用户选择支付结果。

#### Scenario: 展示第三方支付页
- **WHEN** 用户访问 `/thirdpay?orderId=xxx`
- **THEN** 显示"这是第三方支付模拟页"标题
- **AND** 显示订单号
- **AND** 显示三个操作按钮

#### Scenario: 模拟支付成功
- **WHEN** 用户点击"模拟支付成功"按钮
- **THEN** 跳转到 `/pay/success` 页面

#### Scenario: 模拟支付失败
- **WHEN** 用户点击"模拟支付失败"按钮
- **THEN** 跳转到 `/pay/fail` 页面

#### Scenario: 模拟取消支付
- **WHEN** 用户点击"模拟取消（不跳转）"按钮
- **THEN** 显示"您已取消支付"提示
- **AND** 不进行页面跳转

### Requirement: 支付成功结果页
系统 SHALL 提供支付成功结果页，通知主页面并尝试自动关闭。

#### Scenario: 展示成功页面
- **WHEN** 用户访问 `/pay/success` 页面
- **THEN** 显示"模拟支付成功：正在通知主支付页…"提示

#### Scenario: 通知主页面支付成功
- **WHEN** 页面加载完成
- **THEN** 将 `payment_status` 值 `success` 写入 localStorage

#### Scenario: 自动关闭窗口
- **WHEN** 写入 localStorage 完成
- **THEN** 调用 `window.close()` 尝试关闭当前标签页

#### Scenario: 关闭失败提示
- **WHEN** `window.close()` 无法关闭窗口（如非 JS 打开的窗口）
- **THEN** 显示"请手动关闭此页面"提示

### Requirement: 支付失败结果页
系统 SHALL 提供支付失败结果页，通知主页面并尝试自动关闭。

#### Scenario: 展示失败页面
- **WHEN** 用户访问 `/pay/fail` 页面
- **THEN** 显示"模拟支付失败：正在通知主支付页…"提示

#### Scenario: 通知主页面支付失败
- **WHEN** 页面加载完成
- **THEN** 将 `payment_status` 值 `fail` 写入 localStorage

#### Scenario: 自动关闭窗口
- **WHEN** 写入 localStorage 完成
- **THEN** 调用 `window.close()` 尝试关闭当前标签页

#### Scenario: 关闭失败提示
- **WHEN** `window.close()` 无法关闭窗口（如非 JS 打开的窗口）
- **THEN** 显示"请手动关闭此页面"提示

### Requirement: 项目可运行性
系统 SHALL 确保项目可以直接运行，无需额外配置。

#### Scenario: 安装依赖
- **WHEN** 开发者执行 `npm install`
- **THEN** 所有依赖成功安装

#### Scenario: 启动开发服务器
- **WHEN** 开发者执行 `npm run dev`
- **THEN** 开发服务器启动成功
- **AND** 可以通过浏览器访问应用

