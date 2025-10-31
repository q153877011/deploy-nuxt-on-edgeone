import { setCookie } from 'h3'

export default defineEventHandler((event) => {
  const cookies = {
    token: 'abc123',
    theme: 'dark',
    lang: 'zh-CN'
  }

  // 方法5：混合使用不同的 cookie 设置方式
  // 第一个使用 setCookie
  setCookie(event, 'token', cookies.token, { 
    httpOnly: true, 
    path: '/', 
    maxAge: 60 * 60 * 24 * 7 
  })
  
  // 第二个直接操作 headers（模拟某些中间件的行为）
  const existingCookies = event.node.res.getHeader('Set-Cookie') || []
  const newCookies = Array.isArray(existingCookies) 
    ? [...existingCookies, `theme=${cookies.theme}; Max-Age=604800; Path=/`]
    : [existingCookies, `theme=${cookies.theme}; Max-Age=604800; Path=/`]
  event.node.res.setHeader('Set-Cookie', newCookies)
  
  // 第三个再次使用 setCookie
  setCookie(event, 'lang', cookies.lang, { 
    path: '/', 
    maxAge: 60 * 60 * 24 * 7 
  })

  return {
    success: true,
    cookies,
    method: 'mixed-approaches'
  }
})

