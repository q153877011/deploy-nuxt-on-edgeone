import { setCookie, setHeader } from 'h3'

export default defineEventHandler((event) => {
  const cookies = {
    token: 'abc123',
    theme: 'dark',
    lang: 'zh-CN'
  }

  // 方法1：直接使用 appendHeader 设置多个 Set-Cookie（每个单独设置）
  // 这种方式会在响应头中创建多个 Set-Cookie 条目
  event.node.res.appendHeader('Set-Cookie', `token=${cookies.token}; Max-Age=604800; Path=/; HttpOnly`)
  event.node.res.appendHeader('Set-Cookie', `theme=${cookies.theme}; Max-Age=604800; Path=/`)
  event.node.res.appendHeader('Set-Cookie', `lang=${cookies.lang}; Max-Age=604800; Path=/`)

  return {
    success: true,
    cookies,
    method: 'appendHeader'
  }
})

