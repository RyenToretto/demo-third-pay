<template>
  <div class="container">
    <h1>支付页面</h1>

    <!-- 订单信息 -->
    <div class="order-info">
      <div class="order-item">
        <span class="label">SKU 名称：</span>
        <span class="value">{{ orderInfo.skuName }}</span>
      </div>
      <div class="order-item">
        <span class="label">SKU ID：</span>
        <span class="value sku-id">{{ orderInfo.skuId }}</span>
      </div>
      <div class="order-item">
        <span class="label">订单号：</span>
        <span class="value order-id">{{ orderId }}</span>
      </div>
      <div class="order-item">
        <span class="label">订单金额：</span>
        <span class="value amount">¥{{ amount }}</span>
      </div>
    </div>

    <!-- 支付结果提示 -->
    <div v-if="paymentResult" class="result-box" :class="paymentResultClass">
      <div class="result-icon">{{ paymentResult === 'success' ? '✓' : '✗' }}</div>
      <div v-if="paymentResult === 'success'" class="result-text">
        支付成功！
      </div>
      <button
        v-else
        :disabled="isPaymentPending"
        @click="openThirdPartyPay"
      >
        {{ isPaymentPending ? '支付中...' : '支付失败，请重试' }}
      </button>
    </div>
    <!-- 支付按钮 -->
    <button
      v-else
      class="btn-primary"
      :disabled="isPaymentPending"
      @click="openThirdPartyPay"
    >
      {{ isPaymentPending ? '支付中...' : '打开第三方支付页面（模拟）' }}
    </button>


    <!-- 返回首页 -->
    <button class="btn-secondary" @click="goHome">
      返回首页
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// 订单数据类型
interface OrderInfo {
  orderId: string
  skuId: string
  skuName: string
  amount: string
  createdAt: string
}

// 获取路由参数
const route = useRoute()

// 从 URL query 获取 SKU 信息
const skuId = ref(route.query.productId as string || 'prod-000')
const skuName = ref(route.query.productName as string || '演示商品')
const skuPrice = ref(route.query.productPrice as string || '99.00')

// 模拟创建订单
const createOrder = (): OrderInfo => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')

  return {
    orderId: `ORD-${timestamp}-${random}`,
    skuId: skuId.value,
    skuName: skuName.value,
    amount: skuPrice.value,
    createdAt: new Date().toISOString()
  }
}

// 创建订单（页面加载时创建）
const orderInfo = ref<OrderInfo>(createOrder())

// 订单号和金额（从订单信息中获取）
const orderId = computed(() => orderInfo.value.orderId)
const amount = computed(() => orderInfo.value.amount)

// 支付状态
const isPaymentPending = ref(false)
const paymentResult = ref<'success' | 'fail' | null>(null)

// 计算支付结果的样式类
const paymentResultClass = computed(() => ({
  'result-success': paymentResult.value === 'success',
  'result-fail': paymentResult.value === 'fail',
}))

// 打开第三方支付页面
const openThirdPartyPay = () => {
  if (isPaymentPending.value) return

  // 清除之前的支付结果
  localStorage.removeItem('payment_status')
  paymentResult.value = null
  isPaymentPending.value = true

  // 保存订单信息到 localStorage，供支付结果页使用
  localStorage.setItem('current_order', JSON.stringify(orderInfo.value))

  // 使用 useRouter 获取正确的路径（包含 baseURL）
  const router = useRouter()
  const thirdpayRoute = router.resolve({
    path: '/thirdpay',
    query: { orderId: orderId.value }
  })
  
  // 构建完整的 URL（包含 baseURL）
  const fullUrl = window.location.origin + thirdpayRoute.href
  window.open(fullUrl, '_blank')
}

// 监听 localStorage 变化
const handleStorageChange = (e: StorageEvent) => {
  if (e.key === 'payment_status') {
    try {
      const resultData = JSON.parse(e.newValue || '{}')
      if (resultData.status === 'success' || resultData.status === 'fail') {
        paymentResult.value = resultData.status as 'success' | 'fail'
        isPaymentPending.value = false

        // 可以在这里处理订单信息
        console.log('支付结果:', resultData)

        // 清除 localStorage 中的支付结果
        setTimeout(() => {
          localStorage.removeItem('payment_status')
          localStorage.removeItem('current_order')
        }, 1000)
      }
    } catch (err) {
      console.error('解析支付结果失败:', err)
    }
  }
}

// 返回首页
const goHome = () => {
  navigateTo('/')
}

// 生命周期
onMounted(() => {
  // 监听 storage 事件
  window.addEventListener('storage', handleStorageChange)

  // 清除之前可能残留的支付结果
  localStorage.removeItem('payment_status')
})

onUnmounted(() => {
  // 移除事件监听
  window.removeEventListener('storage', handleStorageChange)
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 80px auto;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
}

.order-info {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 16px;
}

.order-item .label {
  color: #606266;
  font-weight: 500;
}

.order-item .value {
  color: #303133;
}

.order-item .order-id,
.order-item .sku-id {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #606266;
}

.order-item .amount {
  color: #f56c6c;
  font-weight: bold;
  font-size: 20px;
}

.btn-primary {
  width: 100%;
  background: #409eff;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 15px;
}

.btn-primary:hover:not(:disabled) {
  background: #66b1ff;
}

.btn-primary:active:not(:disabled) {
  background: #3a8ee6;
}

.btn-primary:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

.btn-secondary {
  width: 100%;
  background: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
  padding: 12px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  color: #409eff;
  border-color: #409eff;
  background: #ecf5ff;
}

.result-box {
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0;
  text-align: center;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-success {
  background: #f0f9ff;
  border: 1px solid #b3d8ff;
}

.result-fail {
  background: #fef0f0;
  border: 1px solid #fbc4c4;
}

.result-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.result-success .result-icon {
  color: #67c23a;
}

.result-fail .result-icon {
  color: #f56c6c;
}

.result-text {
  font-size: 18px;
  font-weight: 500;
}

.result-success .result-text {
  color: #409eff;
}

.result-fail .result-text {
  color: #f56c6c;
}
</style>

