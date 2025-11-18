# Project Context

## Purpose
demo-third-pay 是一个完整的第三方支付流程演示项目。目标是在本地模拟真实的第三方支付体验，包括支付页面、第三方支付跳转、支付结果通知等完整流程。

## Tech Stack
- Nuxt 4（使用 /app 文件夹结构）
- TypeScript
- Nitro + SSR（默认配置）
- 原生 HTML/CSS（无 UI 框架）
- localStorage 跨标签页通信

## Project Conventions

### Code Style
- 使用 TypeScript 严格模式
- CSS 类名必须写完整，不允许使用 & 拼接（&.success 除外）
- 禁止：&-success、&__item、&--large 等类名拼接
- 代码中文注释优先
- 保持简洁，避免过度工程化

### Architecture Patterns
- 使用 Nuxt 4 的 /app 目录结构
- 页面路由基于文件系统
- SSR 默认渲染
- 无需外部服务依赖，所有功能均在本地实现

### Testing Strategy
- 开发模式下手动测试完整支付流程
- 确保所有页面可直接运行

### Git Workflow
- 主分支：master
- 遵循常规 Git 提交规范

## Domain Context
本项目模拟第三方支付流程，核心概念：
- **主支付页面**：发起支付请求的页面
- **第三方支付页**：模拟外部支付平台（新标签页打开）
- **支付结果页**：处理支付成功/失败的中间页
- **跨标签页通信**：使用 localStorage + storage 事件实现

## Important Constraints
- 纯本地运行，无需配置外部服务
- 所有逻辑必须在项目内完成
- 支持标准浏览器环境（支持 window.open、localStorage）

## External Dependencies
无外部依赖，完全自包含的演示项目
