# 支付流程规范 - Delta

## MODIFIED Requirements

### Requirement: 第三方支付页操作
系统 SHALL 在第三方支付页只提供两种支付结果选项。

#### Scenario: 支付成功
- **WHEN** 用户点击"模拟支付成功"按钮
- **THEN** 触发 302 重定向到 `/pay/success?orderId=xxx`

#### Scenario: 支付失败
- **WHEN** 用户点击"模拟支付失败"按钮
- **THEN** 触发 302 重定向到 `/pay/fail?orderId=xxx`

## REMOVED Requirements

### Requirement: 支付取消操作
**Reason**: 取消支付应该归类为支付失败，不需要单独的操作按钮  
**Migration**: 用户想取消支付时，直接关闭标签页或点击"模拟支付失败"

## MODIFIED Requirements

### Requirement: 支付结果页展示
系统 SHALL 在支付结果页只显示 loading 动画，并立即关闭窗口。

#### Scenario: 成功页面展示
- **WHEN** 用户访问 `/pay/success` 页面
- **THEN** 只显示 loading 转圈动画
- **AND** 不显示任何文字提示

#### Scenario: 失败页面展示
- **WHEN** 用户访问 `/pay/fail` 页面
- **THEN** 只显示 loading 转圈动画
- **AND** 不显示任何文字提示

#### Scenario: 自动关闭窗口
- **WHEN** 写入 localStorage 完成
- **THEN** 立即调用 `window.close()` 关闭当前标签页
- **AND** 不显示手动关闭提示

### Requirement: 支付状态数据
系统 SHALL 使用简化的 localStorage 键名和数据结构。

#### Scenario: 写入支付状态
- **WHEN** 支付结果页写入数据到 localStorage
- **THEN** 使用键名 `payment_status`
- **AND** 写入完整的支付结果对象（包含 status、orderId、timestamp、skuInfo）

#### Scenario: 监听支付状态
- **WHEN** 支付页面监听 localStorage 变化
- **THEN** 监听键名 `payment_status`
- **AND** 解析完整的支付结果对象

