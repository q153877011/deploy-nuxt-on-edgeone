<template>
  <section style="padding: 24px;">
    <h1>SSR 示例页面</h1>
    <p>首次渲染：{{ isServer ? '服务端' : '客户端' }}</p>

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
import { useAsyncData, useRequestHeaders } from '#app'

const isServer = typeof window === 'undefined'

const { data, pending, error, refresh } = useAsyncData('ssr-example', async () => {
  const ua = isServer
    ? (useRequestHeaders(['user-agent'])['user-agent'] || '')
    : (typeof navigator !== 'undefined' ? navigator.userAgent : '')

  return {
    serverTime: new Date().toISOString(),
    userAgent: ua
  }
}, { server: true, default: () => ({ serverTime: '', userAgent: '' }) })
</script>

<style scoped>
h1 {
  margin: 0 0 12px;
}
button {
  margin-top: 12px;
}
</style>