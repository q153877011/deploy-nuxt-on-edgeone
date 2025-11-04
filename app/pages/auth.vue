<template>
  <section style="padding: 24px; max-width: 600px; margin: 0 auto;">
    <h1>🔐 认证页面</h1>
    
    <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
      <h2>全局中间件测试</h2>
      <p style="color: #666; margin: 12px 0;">
        此页面用于测试全局中间件功能。全局中间件会在每个路由导航前自动执行。
      </p>
    </div>

    <div v-if="authToken" style="margin: 20px 0; padding: 16px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; color: #155724;">
      <h3 style="margin: 0 0 8px 0;">✅ 已登录</h3>
      <p style="margin: 0;">Token: {{ authToken }}</p>
      <p style="margin: 8px 0 0 0; font-size: 0.9em; opacity: 0.8;">
        登录时间: {{ loginTime }}
      </p>
    </div>

    <div v-else style="margin: 20px 0; padding: 16px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; color: #856404;">
      <h3 style="margin: 0 0 8px 0;">⚠️ 未登录</h3>
      <p style="margin: 0;">请登录以访问受保护的路由</p>
    </div>

    <div style="margin: 20px 0; padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px;">
      <h3 style="margin: 0 0 16px 0;">操作</h3>
      
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button 
          v-if="!authToken"
          @click="handleLogin"
          style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 500;"
        >
          🔑 模拟登录
        </button>
        
        <button 
          v-else
          @click="handleLogout"
          style="padding: 12px 24px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 500;"
        >
          🚪 退出登录
        </button>

        <button 
          @click="testProtectedRoute"
          style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 500;"
        >
          🧪 测试受保护路由（需要登录）
        </button>

        <button 
          @click="checkMiddlewareLog"
          style="padding: 12px 24px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 500;"
        >
          📋 查看中间件日志
        </button>
      </div>
    </div>

    <div style="margin: 20px 0; padding: 20px; background: #e7f3ff; border-left: 4px solid #2196F3; border-radius: 4px;">
      <h3 style="margin: 0 0 12px 0;">📝 中间件说明</h3>
      <ul style="margin: 0; padding-left: 20px; color: #555;">
        <li>全局中间件文件：<code>app/middleware/auth.global.ts</code></li>
        <li>中间件会在每个路由导航前自动执行</li>
        <li>可以检查认证状态并控制导航</li>
        <li>可以重定向到其他路由</li>
        <li>可以阻止导航（返回 false）</li>
      </ul>
    </div>

    <div style="margin: 20px 0; padding: 20px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
      <h3 style="margin: 0 0 12px 0;">🧪 测试步骤</h3>
      <ol style="margin: 0; padding-left: 20px; color: #555;">
        <li>点击"模拟登录"设置认证 Token</li>
        <li>点击"测试受保护路由"，观察中间件行为</li>
        <li>打开浏览器控制台查看中间件日志</li>
        <li>尝试访问其他页面，观察中间件执行</li>
        <li>点击"退出登录"后再次测试受保护路由</li>
      </ol>
    </div>

    <div v-if="redirectFrom" style="margin: 20px 0; padding: 16px; background: #f0f0f0; border-radius: 8px;">
      <h3 style="margin: 0 0 8px 0;">📍 重定向信息</h3>
      <p style="margin: 0; color: #666;">
        从 <code>{{ redirectFrom }}</code> 重定向到此页面
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

// 使用 Cookie 存储认证 Token
const authToken = useCookie('auth-token', {
  default: () => null,
  httpOnly: false,
  secure: true,
  sameSite: 'lax'
})

// 登录时间
const loginTime = useCookie('login-time', {
  default: () => null,
  httpOnly: false
})

// 获取路由查询参数（用于显示重定向来源）
const route = useRoute()
const redirectFrom = computed(() => route.query.redirect as string || null)

// 模拟登录
const handleLogin = () => {
  // 生成一个模拟的 Token
  const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  authToken.value = token
  loginTime.value = new Date().toLocaleString('zh-CN')
  
  console.log('✅ 登录成功，Token:', token)
  
  // 如果有重定向参数，跳转回去
  const redirect = route.query.redirect as string
  if (redirect) {
    navigateTo(redirect)
  } else {
    navigateTo('/')
  }
}

// 退出登录
const handleLogout = () => {
  authToken.value = null
  loginTime.value = null
  
  console.log('🚪 已退出登录')
  
  // 刷新页面
  navigateTo('/auth')
}

// 测试受保护路由（需要登录）
const testProtectedRoute = () => {
  if (!authToken.value) {
    alert('请先登录！')
    return
  }
  
  // 尝试访问一个受保护的路由（这个路由在中间件中定义）
  // 注意：如果 /dashboard 不存在，会显示 404，但中间件会先执行
  navigateTo('/dashboard')
}

// 查看中间件日志
const checkMiddlewareLog = () => {
  alert('请打开浏览器控制台（F12）查看中间件执行日志。\n\n中间件会在每次路由导航时输出日志。')
}

onMounted(() => {
  console.log('🔐 认证页面已加载')
  console.log('当前认证状态:', authToken.value ? '已登录' : '未登录')
  
  if (redirectFrom.value) {
    console.log('从受保护路由重定向:', redirectFrom.value)
  }
})
</script>

<style scoped>
h1 {
  margin: 0 0 20px;
  color: #333;
}

h2, h3 {
  color: #555;
}

code {
  background: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
}
</style>
