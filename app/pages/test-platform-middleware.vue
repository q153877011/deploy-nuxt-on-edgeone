<template>
  <div class="container">
    <h1>测试平台中间件</h1>
    <div class="result-box">
      <div class="label">请求头 test-platform-middleware 的值：</div>
      <div class="value" :class="{ 'has-value': headerValue !== 'none', 'no-value': headerValue === 'none' }">
        {{ headerValue }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 使用 useAsyncData 进行 SSR 渲染，确保服务端和客户端使用相同的值，避免水合错误
const { data: headerValueData } = await useAsyncData('test-platform-middleware-header', async () => {
  // 在服务端获取请求头值
  const headers = useRequestHeaders()
  return headers['test-platform-middleware'] || 'none'
}, {
  server: true, // 确保在服务端执行
  default: () => 'none' // 默认值
})

// 使用计算属性返回数据值
const headerValue = computed(() => headerValueData.value || 'none')

// 设置页面标题
useHead({
  title: '测试平台中间件 - 请求头检测'
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

h1 {
  margin: 0 0 24px 0;
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.result-box {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.label {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 12px;
  font-weight: 500;
}

.value {
  font-size: 20px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  padding: 12px 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.value.has-value {
  color: #28a745;
  background: #d4edda;
  border-color: #c3e6cb;
}

.value.no-value {
  color: #dc3545;
  background: #f8d7da;
  border-color: #f5c6cb;
}
</style>

