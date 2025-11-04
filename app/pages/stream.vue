<template>
  <section style="padding: 24px; max-width: 1200px; margin: 0 auto;">
    <h1>流式传输示例页面</h1>
    
    <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
      <h2>配置参数</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">消息内容：</label>
          <input 
            v-model="config.message" 
            type="text" 
            style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
            placeholder="输入消息内容"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">消息数量：</label>
          <input 
            v-model.number="config.count" 
            type="number" 
            min="1" 
            max="100"
            style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
          />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">延迟时间（毫秒）：</label>
          <input 
            v-model.number="config.delay" 
            type="number" 
            min="100" 
            max="5000"
            step="100"
            style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
          />
        </div>
      </div>
    </div>

    <div style="margin: 20px 0;">
      <button 
        @click="startStream" 
        :disabled="isStreaming"
        style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;"
        :style="{ opacity: isStreaming ? 0.6 : 1, cursor: isStreaming ? 'not-allowed' : 'pointer' }"
      >
        {{ isStreaming ? '传输中...' : '开始流式传输' }}
      </button>
      <button 
        @click="stopStream"
        :disabled="!isStreaming"
        style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;"
        :style="{ opacity: !isStreaming ? 0.6 : 1, cursor: !isStreaming ? 'not-allowed' : 'pointer' }"
      >
        停止传输
      </button>
      <button 
        @click="clearData"
        style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        清空数据
      </button>
    </div>

    <div v-if="status" style="margin: 12px 0; padding: 12px; background: #e7f3ff; border-left: 4px solid #2196F3; border-radius: 4px;">
      <strong>状态：</strong>{{ status }}
    </div>

    <div v-if="stats.total > 0" style="margin: 12px 0; padding: 12px; background: #f0f0f0; border-radius: 4px;">
      <strong>统计信息：</strong>
      总计：{{ stats.total }} 条 | 
      成功：{{ stats.success }} 条 | 
      错误：{{ stats.error }} 条 |
      进度：{{ stats.progress }}%
    </div>

    <div 
      style="margin: 20px 0; padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px; max-height: 500px; overflow-y: auto;"
      ref="messagesContainer"
    >
      <h2 style="margin-top: 0;">流式数据展示</h2>
      
      <div v-if="messages.length === 0" style="text-align: center; color: #999; padding: 40px;">
        暂无数据，点击"开始流式传输"按钮开始接收数据
      </div>
      
      <div 
        v-for="(msg, index) in messages" 
        :key="index"
        style="padding: 12px; margin: 8px 0; background: #f9f9f9; border-left: 4px solid #4CAF50; border-radius: 4px;"
      >
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <strong style="color: #2196F3;">消息 #{{ msg.index }}</strong>
          <span style="color: #666; font-size: 12px;">{{ msg.timestampZh }}</span>
        </div>
        <div style="margin-bottom: 8px;">{{ msg.message }}</div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 12px; color: #666;">进度：</span>
          <div style="flex: 1; height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden;">
            <div 
              style="height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A); transition: width 0.3s;"
              :style="{ width: `${msg.progress}%` }"
            ></div>
          </div>
          <span style="font-size: 12px; color: #666;">{{ msg.progress }}%</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick, onUnmounted } from 'vue'

interface StreamMessage {
  index: number
  message: string
  timestamp: string
  timestampZh: string
  progress: number
  type?: string
}

const config = ref({
  message: '这是一条流式消息',
  count: 10,
  delay: 1000
})

const isStreaming = ref(false)
const status = ref('')
const messages = ref<StreamMessage[]>([])
const messagesContainer = ref<HTMLElement | null>(null)
let abortController: AbortController | null = null

const stats = ref({
  total: 0,
  success: 0,
  error: 0,
  progress: 0
})

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const startStream = async () => {
  if (isStreaming.value) return
  
  isStreaming.value = true
  status.value = '正在连接...'
  messages.value = []
  stats.value = { total: 0, success: 0, error: 0, progress: 0 }
  
  abortController = new AbortController()
  
  try {
    const queryParams = new URLSearchParams({
      message: config.value.message,
      count: config.value.count.toString(),
      delay: config.value.delay.toString()
    })
    
    const response = await fetch(`/api/stream?${queryParams}`, {
      signal: abortController.signal
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    status.value = '连接成功，开始接收数据...'
    
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    
    if (!reader) {
      throw new Error('无法获取响应流')
    }
    
    while (true) {
      const { done, value } = await reader.read()
      
      if (done) {
        status.value = '流式传输完成'
        break
      }
      
      buffer += decoder.decode(value, { stream: true })
      
      // 处理 SSE 格式的数据
      const lines = buffer.split('\n')
      buffer = lines.pop() || '' // 保留最后一行（可能不完整）
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            
            if (data.type === 'done') {
              status.value = '流式传输完成'
              isStreaming.value = false
            } else {
              messages.value.push(data)
              stats.value.total++
              stats.value.success++
              stats.value.progress = data.progress || 0
              scrollToBottom()
            }
          } catch (e) {
            console.error('解析数据失败:', e)
            stats.value.error++
          }
        }
      }
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      status.value = '传输已停止'
    } else {
      status.value = `错误: ${error.message}`
      stats.value.error++
    }
  } finally {
    isStreaming.value = false
    abortController = null
  }
}

const stopStream = () => {
  if (abortController) {
    abortController.abort()
    status.value = '正在停止传输...'
  }
}

const clearData = () => {
  messages.value = []
  stats.value = { total: 0, success: 0, error: 0, progress: 0 }
  status.value = ''
}

onUnmounted(() => {
  if (abortController) {
    abortController.abort()
  }
})
</script>

<style scoped>
h1 {
  margin: 0 0 20px;
  color: #333;
}

h2 {
  margin: 0 0 12px;
  color: #555;
}

label {
  font-size: 14px;
}

input[type="text"],
input[type="number"] {
  font-size: 14px;
}

input[type="text"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

button:disabled {
  cursor: not-allowed;
}
</style>
