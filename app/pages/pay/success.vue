<template>
  <div class="container">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 支付结果数据类型
interface PaymentResult {
  status: 'success' | 'fail'
  orderId: string
  timestamp: string
  skuInfo?: {
    skuId: string
    skuName: string
    amount: string
  }
}

// 获取路由参数
const route = useRoute()

onMounted(() => {
  // 从 URL query 获取订单 ID
  const orderId = (route.query.orderId as string) || ''

  // 从 localStorage 读取订单信息
  const currentOrderStr = localStorage.getItem('current_order')
  let skuInfo = undefined

  if (currentOrderStr) {
    try {
      const orderData = JSON.parse(currentOrderStr)
      skuInfo = {
        skuId: orderData.skuId,
        skuName: orderData.skuName,
        amount: orderData.amount
      }
    } catch (err) {
      console.error('解析订单信息失败:', err)
    }
  }

  // 构建完整的支付结果数据
  const paymentResult: PaymentResult = {
    status: 'success',
    orderId: orderId,
    timestamp: new Date().toISOString(),
    skuInfo: skuInfo
  }

  setTimeout(() => {
    localStorage.setItem('payment_status', JSON.stringify(paymentResult))
    console.log('支付成功 - 写入数据:', paymentResult)
    window.close()
  }, 3000)
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Loading 转圈动画 */
.loader {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

