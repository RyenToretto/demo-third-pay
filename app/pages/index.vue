<template>
  <div class="shop-container">
    <h1>📦 SKU 列表页</h1>
    <p class="subtitle">选择您想要购买的 SKU 商品</p>

    <div class="product-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image">
          {{ product.emoji }}
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">¥{{ product.price }}</p>
          <button class="btn-buy" @click="buyProduct(product)">
            立即购买
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 商品数据类型
interface Product {
  id: string
  name: string
  price: string
  emoji: string
}

// 商品列表数据
const products = ref<Product[]>([
  {
    id: 'prod-001',
    name: 'iPhone 15 Pro',
    price: '7999.00',
    emoji: '📱'
  },
  {
    id: 'prod-002',
    name: 'MacBook Pro',
    price: '12999.00',
    emoji: '💻'
  },
  {
    id: 'prod-003',
    name: 'AirPods Pro',
    price: '1999.00',
    emoji: '🎧'
  },
  {
    id: 'prod-004',
    name: 'Apple Watch',
    price: '2999.00',
    emoji: '⌚'
  },
  {
    id: 'prod-005',
    name: 'iPad Air',
    price: '4799.00',
    emoji: '📲'
  },
  {
    id: 'prod-006',
    name: 'AirTag',
    price: '229.00',
    emoji: '🏷️'
  }
])

// 购买商品
const buyProduct = (product: Product) => {
  // 跳转到支付页面，传递商品信息
  navigateTo({
    path: '/platform',
    query: {
      productId: product.id,
      productName: product.name,
      productPrice: product.price
    }
  })
}
</script>

<style scoped>
.shop-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 40px 20px;
}

h1 {
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
  font-size: 36px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin-bottom: 40px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 30px;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.product-image {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
}

.product-info {
  padding: 20px;
}

.product-name {
  color: #303133;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  min-height: 48px;
  display: flex;
  align-items: center;
}

.product-price {
  color: #f56c6c;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.btn-buy {
  width: 100%;
  background: #409eff;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-buy:hover {
  background: #66b1ff;
  transform: scale(1.02);
}

.btn-buy:active {
  background: #3a8ee6;
  transform: scale(0.98);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .shop-container {
    padding: 20px 15px;
  }

  h1 {
    font-size: 28px;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
  }

  .product-image {
    height: 120px;
    font-size: 50px;
  }

  .product-info {
    padding: 12px;
  }

  .product-name {
    font-size: 14px;
    min-height: 36px;
  }

  .product-price {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .btn-buy {
    padding: 10px;
    font-size: 14px;
  }
}
</style>

