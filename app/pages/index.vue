<template>
  <div style="padding: 24px; max-width: 1200px; margin: 0 auto;">
    <h1>Welcome to the homepage</h1>
    <p>This is an auto-imported component</p>
    
    <!-- 显示环境变量数据 -->
    <div v-if="pending" class="loading">
      正在加载环境变量数据...
    </div>
    <div v-else-if="error" class="error">
      加载失败: {{ error }}
    </div>
    <div v-else-if="envData" class="env-data">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2>环境变量信息</h2>
        <button @click="refresh()" :disabled="pending" class="refresh-btn">
          {{ pending ? '刷新中...' : '刷新数据' }}
        </button>
      </div>

      <!-- 统计信息 -->
      <div v-if="envData.stats" style="margin-bottom: 20px; padding: 16px; background: #e7f3ff; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0;">📊 统计信息</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div>
            <strong>环境变量总数:</strong> {{ envData.stats.totalEnvVars }}
          </div>
          <div>
            <strong>敏感变量数:</strong> {{ envData.stats.sensitiveCount }}
          </div>
        </div>
      </div>

      <!-- 运行环境信息 -->
      <div v-if="envData.runtime" style="margin-bottom: 20px; padding: 16px; background: #f0f9ff; border-radius: 8px;">
        <h3 style="margin: 0 0 12px 0;">⚙️ 运行环境</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div><strong>NODE_ENV:</strong> {{ envData.runtime.nodeEnv }}</div>
          <div><strong>平台:</strong> {{ envData.runtime.platform }}</div>
          <div><strong>Node 版本:</strong> {{ envData.runtime.nodeVersion }}</div>
          <div><strong>工作目录:</strong> {{ envData.runtime.cwd }}</div>
        </div>
      </div>

      <!-- 环境变量列表 -->
      <div style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 12px 0;">🔑 环境变量列表</h3>
        <div style="margin-bottom: 12px;">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索环境变量..."
            style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"
          />
        </div>
        <div class="env-list">
          <div 
            v-for="(value, key) in filteredEnvVars" 
            :key="key"
            class="env-item"
          >
            <div class="env-key">
              <strong>{{ key }}</strong>
              <span v-if="isSensitive(key)" class="sensitive-badge">敏感</span>
            </div>
            <div class="env-value">{{ value }}</div>
          </div>
        </div>
      </div>

      <!-- 原始 JSON 数据 -->
      <details style="margin-top: 20px;">
        <summary style="cursor: pointer; padding: 12px; background: #f5f5f5; border-radius: 4px; margin-bottom: 12px;">
          <strong>查看原始 JSON 数据</strong>
        </summary>
        <pre class="env-pre">{{ JSON.stringify(envData, null, 2) }}</pre>
      </details>
    </div>

    <div style="margin-top: 30px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
      <h3 style="margin: 0 0 12px 0;">🔗 快速链接</h3>
      <nav>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; gap: 16px; flex-wrap: wrap;">
          <li><NuxtLink to="/about">关于</NuxtLink></li>
          <li><NuxtLink to="/posts/1">文章 1</NuxtLink></li>
          <li><NuxtLink to="/posts/2">文章 2</NuxtLink></li>
          <li><NuxtLink to="/auth">认证</NuxtLink></li>
        </ul>
      </nav>
    </div>

    <div style="margin-top: 20px;">
      <img src="/avator.jpg" alt="Logo" width="100px" height="100px"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// 响应式数据
const envData = ref<any>(null)
const pending = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')

// 获取环境变量数据的函数
const fetchEnvData = async () => {
  pending.value = true
  error.value = null
  
  try {
    const response = await fetch('/api/env')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    envData.value = result
    console.log('环境变量数据:', result)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
    console.error('API 错误:', err)
  } finally {
    pending.value = false
  }
}

// 刷新数据的函数
const refresh = () => {
  fetchEnvData()
}

// 过滤环境变量（根据搜索查询）
const filteredEnvVars = computed(() => {
  if (!envData.value?.processEnv) return {}
  
  if (!searchQuery.value.trim()) {
    return envData.value.processEnv
  }
  
  const query = searchQuery.value.toLowerCase()
  const filtered: Record<string, string> = {}
  
  for (const [key, value] of Object.entries(envData.value.processEnv)) {
    if (key.toLowerCase().includes(query) || 
        String(value).toLowerCase().includes(query)) {
      filtered[key] = value as string
    }
  }
  
  return filtered
})

// 检查是否是敏感变量
const isSensitive = (key: string) => {
  const sensitiveKeywords = ['password', 'secret', 'key', 'token', 'api_key', 'private', 'credential']
  return sensitiveKeywords.some(keyword => 
    key.toLowerCase().includes(keyword.toLowerCase())
  )
}

// 组件挂载时获取数据
onMounted(() => {
  fetchEnvData()
})
</script>

<style scoped>
.loading {
  color: #666;
  font-style: italic;
  padding: 1rem;
  text-align: center;
}

.error {
  color: #e74c3c;
  background: #fdf2f2;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  border-left: 4px solid #e74c3c;
}

.env-data {
  margin: 1rem 0;
}

.refresh-btn {
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.refresh-btn:hover:not(:disabled) {
  background: #2980b9;
}

.refresh-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.env-pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.85rem;
  margin: 8px 0 0 0;
  max-height: 400px;
  overflow-y: auto;
}

.env-list {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
}

.env-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.env-item:hover {
  background: #f9f9f9;
}

.env-item:last-child {
  border-bottom: none;
}

.env-key {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 14px;
}

.env-key strong {
  color: #333;
  font-family: 'Courier New', monospace;
}

.sensitive-badge {
  background: #ffc107;
  color: #856404;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: bold;
}

.env-value {
  color: #666;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  word-break: break-all;
  padding-left: 8px;
}

h1 {
  margin: 0 0 12px 0;
  color: #333;
}

h2 {
  margin: 0;
  color: #555;
}

h3 {
  color: #555;
}
</style>
