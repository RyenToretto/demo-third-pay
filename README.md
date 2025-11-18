# demo-third-pay

> 第三方支付流程演示 Demo - 基于 Nuxt 4

## 🌐 在线 Demo

- **GitHub Pages**: `https://RyenToretto.github.io/demo-third-pay`

> 💡 项目已配置自动部署，代码 push 后会自动更新

## 📖 项目介绍

这是一个完整的本地第三方支付流程演示项目，用于展示和理解真实支付场景中的页面跳转、跨标签页通信、支付结果通知等核心交互流程。

### ✨ 功能特性

- ✅ 完整的支付流程演示（首页 → 支付页 → 第三方支付 → 结果通知）
- ✅ 跨标签页通信（localStorage + storage 事件）
- ✅ 防重复提交
- ✅ 自动关闭支付结果页
- ✅ 纯本地运行，无需外部服务

### 🛠️ 技术栈

- **Nuxt 4** - 使用最新的 `/app` 目录结构
- **TypeScript** - 类型安全
- **Nitro + SSR** - 服务端渲染
- **原生 HTML/CSS** - 无 UI 框架依赖

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 https://RyenToretto.github.io/demo-third-pay 查看效果

### 构建生产版本

```bash
# 生成静态站点（用于 GitHub Pages 部署）
npm run generate

# 预览生成的静态站点
npm run preview
```

## 🚀 部署到 GitHub Pages

本项目使用 **GitHub Pages** 进行静态部署，配置了自动化 CI/CD 流程。

### 快速部署步骤

1. **Push 代码到 GitHub**
   ```bash
   git add .
   git commit -m "feat: initial commit"
   git push origin main
   ```

2. **开启 GitHub Pages**
   - 进入仓库的 **Settings** → **Pages**
   - 在 **Source** 中选择 **GitHub Actions**
   - 保存设置

3. **自动部署**
   - GitHub Actions 会自动检测到代码推送
   - 自动构建并部署到 GitHub Pages
   - 2-3 分钟后访问：`https://RyenToretto.github.io/demo-third-pay`

### 详细部署文档

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取完整的部署指南，包括：
- ✅ 详细部署步骤
- ✅ 自定义域名配置
- ✅ 故障排除
- ✅ 常见问题解答

## 📁 项目结构

```
demo-third-pay/
├── app/                      # Nuxt 4 应用目录
│   ├── app.vue              # 应用入口
│   └── pages/               # 页面目录
│       ├── index.vue        # 首页
│       ├── pay.vue          # 支付页面
│       ├── thirdpay.vue     # 模拟第三方支付页
│       └── pay/
│           ├── success.vue  # 支付成功页
│           └── fail.vue     # 支付失败页
├── openspec/                # OpenSpec 规范文件
│   ├── project.md           # 项目上下文
│   ├── specs/               # 规范定义
│   └── changes/             # 变更提案
├── nuxt.config.ts           # Nuxt 配置
├── package.json             # 项目依赖
└── tsconfig.json            # TypeScript 配置
```

## 🎯 使用流程

1. **访问商城首页** (`/`)
   - 浏览商品列表（6 个演示商品）
   - 选择喜欢的商品，点击"立即购买"

2. **进入支付页** (`/platform`)
   - 查看订单信息（商品名称、订单号、金额）
   - 点击"打开第三方支付页面（模拟）"

3. **第三方支付页** (`/thirdpay`) - 新标签页打开
   - 选择操作：
     - ✓ 模拟支付成功
     - ✗ 模拟支付失败
     - ⊘ 模拟取消（不跳转）

4. **支付结果页** (`/pay/success` 或 `/pay/fail`)
   - 自动通知主支付页
   - 自动关闭当前标签页

5. **返回支付页**
   - 显示支付结果（成功/失败）

## 🔍 核心实现原理

### 跨标签页通信

使用 `localStorage` + `storage` 事件实现：

```typescript
// 支付结果页写入
localStorage.setItem('payment_status', 'success')

// 支付页监听
window.addEventListener('storage', (e) => {
  if (e.key === 'payment_status') {
    // 处理支付结果
  }
})
```

### 防重复提交

```typescript
const isPaymentPending = ref(false)

const openThirdPartyPay = () => {
  if (isPaymentPending.value) return
  isPaymentPending.value = true
  // 打开支付窗口...
}
```

### 自动关闭窗口

```typescript
window.close() // 尝试自动关闭

// 如果关闭失败，显示手动关闭提示
setTimeout(() => {
  if (!document.hidden) {
    statusMessage.value = '请手动关闭此页面'
  }
}, 100)
```

## 📝 开发规范

本项目遵循以下规范：

- CSS 类名必须写完整，不允许使用 `&` 拼接（`&.success` 除外）
- 使用 TypeScript 严格模式
- 代码注释使用中文
- 保持简洁，避免过度工程化

详见 `openspec/project.md`

## 📄 License

MIT

## 👨‍💻 开发者

本项目使用 OpenSpec 规范驱动开发，所有规范和变更提案位于 `openspec/` 目录
