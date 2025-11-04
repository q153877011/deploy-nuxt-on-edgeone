<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-code">
        <span class="error-number">{{ error.statusCode || 404 }}</span>
      </div>
      
      <h1 class="error-title">{{ error.statusCode === 404 ? '页面未找到' : '出错了' }}</h1>
      
      <p class="error-message">
        {{ error.statusCode === 404 
          ? '抱歉，您访问的页面不存在或已被移除。' 
          : error.message || '服务器遇到了一个错误，请稍后再试。' 
        }}
      </p>
      
      <div class="error-actions">
        <button @click="goHome" class="btn btn-primary">
          🏠 返回首页
        </button>
        <button @click="goBack" class="btn btn-secondary">
          ← 返回上一页
        </button>
      </div>
      
      <div class="error-suggestions" v-if="error.statusCode === 404">
        <h3>您可能想要访问：</h3>
        <ul class="suggestion-links">
          <li><NuxtLink to="/">首页</NuxtLink></li>
          <li><NuxtLink to="/about">关于我们</NuxtLink></li>
          <li><NuxtLink to="/cookies-ssr">Cookies 测试</NuxtLink></li>
        </ul>
      </div>
    </div>
    
    <div class="error-illustration">
      <div class="illustration-circle circle-1"></div>
      <div class="illustration-circle circle-2"></div>
      <div class="illustration-circle circle-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

function goHome() {
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
}

function goBack() {
  if (typeof window !== 'undefined') {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }
}

// 如果是404错误，可以在这里记录日志
onMounted(() => {
  if (props.error.statusCode === 404) {
    console.warn('404 Error:', props.error.path || window.location.pathname)
  }
})
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.error-content {
  max-width: 600px;
  text-align: center;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.error-code {
  margin-bottom: 20px;
}

.error-number {
  font-size: 120px;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  display: block;
}

.error-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.error-message {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 32px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.error-suggestions {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.error-suggestions h3 {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
}

.suggestion-links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.suggestion-links li {
  margin: 0;
}

.suggestion-links a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.suggestion-links a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.error-illustration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.illustration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 20s infinite ease-in-out;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: -50px;
  animation-delay: 5s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 10%;
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

@media (max-width: 640px) {
  .error-content {
    padding: 40px 24px;
  }
  
  .error-number {
    font-size: 80px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .error-message {
    font-size: 16px;
  }
  
  .error-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>

