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
      <p>服务器时间：{{ data.localTime }}</p>
      <p>生成时间：{{ data.generatedAt }}</p>
      <p>随机ID：{{ data.randomId }}</p>
      <p>时间戳：{{ data.timestamp }}</p>
      <p>时区：{{ data.timezone }}</p>
    </div>

    <button @click="() => refresh()">刷新数据（客户端）</button>
  </section>
 </template>

<script setup>
// 使用 useFetch 调用 API 端点获取服务器时间
const { data, pending, error, refresh } = await useFetch('/api/time', {
  server: true, // 确保在服务器端执行
  key: 'time-data', // 缓存键
  default: () => ({ 
    localTime: '', 
    randomId: 0, 
    generatedAt: '', 
    timestamp: 0, 
    timezone: '' 
  })
})
console.log(data.value, pending.value, error.value)
</script>

<style scoped>
h1 {
  margin: 0 0 12px;
}
button {
  margin-top: 12px;
}
</style>