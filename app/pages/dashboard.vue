<template>
  <section style="padding: 24px; max-width: 800px; margin: 0 auto;">
    <h1>📊 仪表板（受保护路由）</h1>
    
    <div style="margin: 20px 0; padding: 20px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; color: #155724;">
      <h2 style="margin: 0 0 12px 0;">✅ 访问成功</h2>
      <p style="margin: 0;">
        您已成功访问受保护的路由。这说明全局中间件已经验证了您的认证状态。
      </p>
    </div>

    <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
      <h2>🔐 认证信息</h2>
      <div style="margin-top: 12px;">
        <p><strong>认证 Token:</strong> {{ authToken || '无' }}</p>
        <p><strong>登录时间:</strong> {{ loginTime || '无' }}</p>
      </div>
    </div>

    <div style="margin: 20px 0; padding: 20px; background: #e7f3ff; border-left: 4px solid #2196F3; border-radius: 4px;">
      <h3 style="margin: 0 0 12px 0;">📝 说明</h3>
      <p style="margin: 0; color: #555;">
        这个页面是受保护的路由，只有在全局中间件验证通过后才能访问。
        如果您未登录，中间件会自动重定向到 <NuxtLink to="/auth" style="color: #2196F3;">认证页面</NuxtLink>。
      </p>
    </div>

    <div style="margin: 20px 0;">
      <button 
        @click="handleLogout"
        style="padding: 12px 24px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 500;"
      >
        🚪 退出登录
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
// 使用 Cookie 获取认证信息
const authToken = useCookie('auth-token', {
  default: () => null,
  httpOnly: false
})

const loginTime = useCookie('login-time', {
  default: () => null,
  httpOnly: false
})

// 退出登录
const handleLogout = () => {
  authToken.value = null
  loginTime.value = null
  navigateTo('/auth')
}

// 设置页面标题
useHead({
  title: '仪表板 - 受保护路由',
  meta: [
    { name: 'description', content: '这是一个受全局中间件保护的路由' }
  ]
})
</script>

<style scoped>
h1 {
  margin: 0 0 20px;
  color: #333;
}

h2 {
  color: #555;
  margin: 0 0 8px;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
