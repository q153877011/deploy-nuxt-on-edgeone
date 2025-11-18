import { setCookie } from 'h3'

export default defineEventHandler((event) => {
  const cookies = {
    token: 'abc123',
    theme: 'dark',
    lang: 'zh-CN'
  }

  // 设置三个 Cookie（示例：7 天过期，HttpOnly 仅对 token）
  setCookie(event, 'token', cookies.token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 })
  setCookie(event, 'theme', cookies.theme, { path: '/', sameSite: 'strict', maxAge: 60 * 60 * 24 * 7 })
  setCookie(event, 'lang', cookies.lang, { path: '/', secure: true, maxAge: 60 * 60 * 24 })

  return {
    success: true,
    cookies
  }
})


