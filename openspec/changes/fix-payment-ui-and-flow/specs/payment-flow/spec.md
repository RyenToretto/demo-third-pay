# 支付流程规范 - Delta

## MODIFIED Requirements

### Requirement: 第三方支付页操作选项
系统 SHALL 在第三方支付页只提供成功和失败两种操作选项。

#### Scenario: 展示支付操作按钮
- **WHEN** 用户访问第三方支付页
- **THEN** 显示"模拟支付成功"按钮
- **AND** 显示"模拟支付失败"按钮
- **AND** 不显示取消按钮

#### Scenario: 用户想要取消支付
- **WHEN** 用户不想完成支付
- **THEN** 用户可以直接关闭标签页
- **OR** 点击"模拟支付失败"按钮

### Requirement: 支付结果页面展示
系统 SHALL 在支付结果页只显示 loading 动画，不显示其他内容。

#### Scenario: 访问支付成功页
- **WHEN** 用户访问 `/pay/success` 页面
- **THEN** 显示 loading 转圈动画
- **AND** 不显示任何文案
- **AND** 不显示手动关闭按钮

#### Scenario: 访问支付失败页
- **WHEN** 用户访问 `/pay/fail` 页面
- **THEN** 显示 loading 转圈动画
- **AND** 不显示任何文案
- **AND** 不显示手动关闭按钮

### Requirement: 支付结果处理流程
系统 SHALL 在写入 localStorage 后立即关闭支付结果页。

#### Scenario: 处理支付成功结果
- **WHEN** 支付成功页加载完成
- **THEN** 立即写入 payment_result 到 localStorage
- **AND** 立即调用 window.close() 关闭窗口
- **AND** 不使用 setTimeout 延迟

#### Scenario: 处理支付失败结果
- **WHEN** 支付失败页加载完成
- **THEN** 立即写入 payment_result 到 localStorage
- **AND** 立即调用 window.close() 关闭窗口
- **AND** 不使用 setTimeout 延迟

