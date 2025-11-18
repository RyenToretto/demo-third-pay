// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  // 使用 Nuxt 4 的 /app 目录结构
  future: {
    compatibilityVersion: 4,
  },

  // TypeScript 配置
  typescript: {
    strict: true,
    typeCheck: false, // 开发时禁用类型检查以提高速度
  },

  // SSR 配置（默认启用）
  ssr: true,

  // 开发服务器配置
  devServer: {
    port: 3241,
  },

  // 应用配置
  app: {
    // GitHub Pages 部署时的基础路径
    baseURL: process.env.NODE_ENV === 'production' ? '/demo-third-pay/' : '/',
    
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '第三方支付流程演示',
      meta: [
        { name: 'description', content: '完整的第三方支付流程演示 Demo' }
      ],
    }
  },

  // Nitro 配置
  nitro: {
    preset: process.env.NITRO_PRESET || 'node-server',
  },

  // 静态生成配置（用于 GitHub Pages 等静态部署）
  generate: {
    routes: [
      '/',
      '/platform',
      '/thirdpay',
      '/pay/success',
      '/pay/fail',
    ],
  },

  devtools: {
    enabled: false
  },
})
