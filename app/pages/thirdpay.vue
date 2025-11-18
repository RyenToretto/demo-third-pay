<template>
  <div class="container">
    <h1>🏦 第三方支付模拟页</h1>
    <p class="subtitle">这是模拟的第三方支付平台</p>

    <!-- 订单信息 -->
    <div class="order-info">
      <div class="order-item">
        <span class="label">订单号：</span>
        <span class="value">{{ orderId || '未知' }}</span>
      </div>
    </div>

    <div class="tips">
      <p>请选择支付结果：</p>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="btn-success" @click="handleSuccess">
        ✓ 模拟支付成功
      </button>

      <button class="btn-danger" @click="handleFail">
        ✗ 模拟支付失败
      </button>
    </div>

    <div class="cancel-tip" @click="handleFail">
      <p>💡 取消支付</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 从 URL 获取订单号和 redirect URL
const route = useRoute()
const orderId = ref<string>('')
const redirectUrl = ref<string>('')

// 模拟支付成功 - 使用 302 重定向
const handleSuccess = () => {
  // 使用 useRouter 获取正确的路径（包含 baseURL）
  const router = useRouter()
  const successRoute = router.resolve({
    path: '/pay/success',
    query: { orderId: orderId.value }
  })
  // 使用 window.location.href 实现类似 302 重定向的效果
  window.location.href = successRoute.href
}

// 模拟支付失败 - 使用 302 重定向
const handleFail = () => {
  // 使用 useRouter 获取正确的路径（包含 baseURL）
  const router = useRouter()
  const failRoute = router.resolve({
    path: '/pay/fail',
    query: { orderId: orderId.value }
  })
  // 使用 window.location.href 实现类似 302 重定向的效果
  window.location.href = failRoute.href
}

onMounted(() => {
  // 获取 URL 中的订单号和 redirect URL
  orderId.value = (route.query.orderId as string) || ''
  redirectUrl.value = (route.query.redirect as string) || ''

  console.log('第三方支付页 - 订单ID:', orderId.value)
  console.log('第三方支付页 - Redirect URL:', redirectUrl.value)
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
  margin-bottom: 10px;
  font-size: 28px;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #909399;
  font-size: 14px;
  margin-bottom: 30px;
}

.order-info {
  background: #f5f7fa;
  padding: 15px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
}

.order-item .label {
  color: #606266;
}

.order-item .value {
  color: #303133;
  font-weight: 500;
}

.tips {
  text-align: center;
  color: #606266;
  margin: 20px 0;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.action-buttons button {
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-success {
  background: #67c23a;
  color: #fff;
}

.btn-success:hover {
  background: #85ce61;
}

.btn-success:active {
  background: #5daf34;
}

.btn-danger {
  background: #f56c6c;
  color: #fff;
}

.btn-danger:hover {
  background: #f78989;
}

.btn-danger:active {
  background: #dd6161;
}

.cancel-tip {
  margin-top: 30px;
  padding: 15px;
  background: #f4f4f5;
  border-radius: 4px;
  text-align: center;
}

.cancel-tip p {
  color: #909399;
  font-size: 14px;
  margin: 0;
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
</style>

