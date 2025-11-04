<template>
  <section style="padding: 24px;">
    <h1>SSR 示例页面</h1>
    
    <!-- 使用 ClientOnly 包装可能在服务端和客户端不一致的内容 -->
    <ClientOnly>
      <p>首次渲染：客户端</p>
      <template #fallback>
        <p>首次渲染：服务端</p>
      </template>
    </ClientOnly>

    <div v-if="error">加载失败：{{ error.message }}</div>
    <div v-else-if="pending">加载中...</div>
    <div v-else-if="data">
      <p>服务器时间：{{ data.serverTime }}</p>
      <p>用户代理：{{ data.userAgent }}</p>
    </div>

    <button @click="() => refresh()">刷新数据（客户端）</button>
  </section>
 </template>

<script setup lang="ts">
// 使用 useAsyncData，确保服务端和客户端使用相同的逻辑
const { data, pending, error, refresh } = useAsyncData('ssr-example', async () => {
  // 根据运行环境获取用户代理
  const isServer = typeof window === 'undefined'
  const ua = isServer
    ? (useRequestHeaders(['user-agent'])['user-agent'] || '')
    : (typeof navigator !== 'undefined' ? navigator.userAgent : '')

  return {
    serverTime: new Date().toISOString(),
    userAgent: ua
  }
}, { 
  // 只在服务端执行，客户端使用服务端返回的数据进行水合
  server: true,
  // 提供默认值，避免初始渲染时的错误
  default: () => ({ serverTime: '', userAgent: '' })
})
</script>

<style scoped>
h1 {
  margin: 0 0 12px;
}
button {
  margin-top: 12px;
}
</style>