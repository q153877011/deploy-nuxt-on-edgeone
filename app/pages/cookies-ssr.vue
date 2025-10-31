<script setup lang="ts">
import { ref, onMounted } from 'vue'

// SSR 页面：首次渲染后在客户端请求 API 设置并读取 Cookie
const data = ref<{ success: boolean; cookies: Record<string, string> } | null>(null)
const cookiesOnClient = ref<Record<string, string>>({})

// 在客户端发起请求，确保浏览器接收 Set-Cookie
onMounted(async () => {
  const res = await fetch('/api/cookies-test-v6', { method: 'GET' })
  try {
    data.value = (await res.json()) as any
  } catch {
    data.value = null
  }

  // 读取浏览器端 Cookie（token 为 HttpOnly 无法在 JS 中读取，展示时标记）
  const cookieMap = Object.fromEntries(document.cookie.split('; ').filter(Boolean).map(s => {
    const idx = s.indexOf('=')
    return idx === -1 ? [s, ''] : [decodeURIComponent(s.slice(0, idx)), decodeURIComponent(s.slice(idx + 1))]
  })) as Record<string, string>

  cookiesOnClient.value = {
    token: '(HttpOnly，不可在客户端JS读取)',
    theme: cookieMap.theme || '',
    lang: cookieMap.lang || ''
  }
})
</script>

<template>
  <div style="max-width:720px;margin:24px auto;padding:16px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;">
    <h1 style="margin:0 0 12px;font-size:22px;">SSR Cookies 示例</h1>
    <p style="margin:0 0 16px;color:#6b7280;">打开此页后将请求 <code>/api/cookies-test</code>，服务器返回并写入三个 Cookie，然后在页面展示。</p>

    <div v-if="!data" style="padding:12px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;">
      正在请求接口并设置 Cookie ...
    </div>

    <div v-else>
      <h2 style="font-size:18px;margin:16px 0 8px;">接口返回的 Cookies（响应体）</h2>
      <pre style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
{{ JSON.stringify(data.cookies, null, 2) }}
      </pre>

      <h2 style="font-size:18px;margin:16px 0 8px;">浏览器端可读取的 Cookies</h2>
      <pre style="white-space:pre-wrap;background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:12px;">
{{ JSON.stringify(cookiesOnClient, null, 2) }}
      </pre>

      <p style="color:#6b7280;margin-top:8px;">说明：<code>token</code> 为 HttpOnly，出于安全无法在客户端JS读取，但会随后续请求自动携带。</p>
    </div>
  </div>
  
</template>


