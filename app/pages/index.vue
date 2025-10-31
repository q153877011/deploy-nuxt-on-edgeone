<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <p>This is an auto-imported component</p>
    
    <!-- 显示 API 数据 -->
    <div v-if="pending" class="loading">
      正在加载数据...
    </div>
    <div v-else-if="error" class="error">
      加载失败: {{ error }}
    </div>
    <div v-else-if="data" class="api-data">
      <h2>API 数据:</h2>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      <button @click="refresh()" :disabled="pending">
        {{ pending ? '刷新中...' : '刷新数据' }}
      </button>

    <div><nav>
      <ul>
        <li><NuxtLink to="/about">关于</NuxtLink></li>
        <li><NuxtLink to="/posts/1">文章 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">文章 2</NuxtLink></li>
      </ul>
    </nav></div>
    </div>

    <img src="/avator.jpg" alt="Logo" width="100px" height="100px"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 响应式数据
const data = ref<any>(null)
const pending = ref(true)
const error = ref<string | null>(null)

// 获取数据的函数
const fetchData = async () => {
  pending.value = true
  error.value = null
  
  try {
    const response = await fetch('/api/server-test')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    data.value = result
    console.log('API 数据:', result)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
    console.error('API 错误:', err)
  } finally {
    pending.value = false
  }
}

// 刷新数据的函数
const refresh = () => {
  fetchData()
}

// 组件挂载时获取数据
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.loading {
  color: #666;
  font-style: italic;
  padding: 1rem;
}

.error {
  color: #e74c3c;
  background: #fdf2f2;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.api-data {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.api-data pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.9rem;
}

.api-data button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.api-data button:hover:not(:disabled) {
  background: #2980b9;
}

.api-data button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
</style>
