<template>
  <div class="isr-test-page">
    <div class="container">
      <h1>ISR 测试页面</h1>
      <div class="time-display">
        <h2>当前时间</h2>
        <div class="time-box">
          <div class="time-value">{{ currentTime }}</div>
          <div class="seconds">秒数: {{ seconds }}</div>
        </div>
      </div>
      
      <div class="info-section">
        <h3>页面信息</h3>
        <ul>
          <li><strong>API生成时间:</strong> {{ generatedAt }}</li>
          <li>
            <strong>页面生成时间:</strong> 
            <ClientOnly>
              {{ pageGeneratedAt }}
              <template #fallback>
                服务端渲染
              </template>
            </ClientOnly>
          </li>
          <li><strong>随机ID:</strong> {{ randomId }}</li>
          <li><strong>SWR 重新验证:</strong> 10秒</li>
          <li><strong>页面类型:</strong> 增量静态再生 (SWR)</li>
        </ul>
      </div>
      
      <div class="refresh-info">
        <p>🔄 此页面每10秒自动重新生成</p>
        <p>📊 在10秒内刷新页面，随机ID应该保持不变</p>
        <p>⏰ 超过10秒后刷新，随机ID会更新</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 使用useFetch确保数据在服务器端获取
const { data: timeData } = await useFetch('/api/time', {
  server: true, // 确保只在服务器端执行
  key: 'time-data' // 缓存键
})

// 从API响应中提取数据
const currentTime = computed(() => timeData.value?.localTime || '')
const seconds = computed(() => timeData.value?.seconds || 0)
const randomId = computed(() => timeData.value?.randomId || 0)
const generatedAt = computed(() => timeData.value?.generatedAt || '')

// 添加页面生成时间戳用于验证缓存
// 使用 computed 并在 ClientOnly 中显示，避免 hydration mismatch
// 服务端渲染时使用 API 的时间，客户端水合后显示实际时间
const pageGeneratedAt = computed(() => {
  // 使用 API 返回的时间作为基准，确保服务端和客户端一致
  // 如果 API 时间不可用，才使用当前时间
  return generatedAt.value || new Date().toISOString()
})

// 设置页面标题
useHead({
  title: 'ISR 测试页面 - SWR缓存',
  meta: [
    { name: 'description', content: 'Nuxt ISR 测试页面，使用SWR缓存验证功能' }
  ]
})
</script>

<style scoped>
.isr-test-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: bold;
}

.time-display {
  text-align: center;
  margin-bottom: 3rem;
}

.time-display h2 {
  color: #555;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.time-box {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(238, 90, 36, 0.3);
}

.time-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.seconds {
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  display: inline-block;
}

.info-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
}

.info-section h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.info-section ul {
  list-style: none;
  padding: 0;
}

.info-section li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
  color: #666;
}

.info-section li:last-child {
  border-bottom: none;
}

.refresh-info {
  text-align: center;
  background: #e3f2fd;
  padding: 1.5rem;
  border-radius: 15px;
  border-left: 4px solid #2196f3;
}

.refresh-info p {
  margin: 0.5rem 0;
  color: #1976d2;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 2rem;
    margin: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .time-value {
    font-size: 2rem;
  }
  
  .seconds {
    font-size: 1.2rem;
  }
}
</style>