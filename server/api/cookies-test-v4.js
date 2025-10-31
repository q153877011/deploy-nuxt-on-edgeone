import { setCookie } from 'h3'

export default defineEventHandler((event) => {
  const cookies = {
    token: 'abc123',
    theme: 'dark',
    lang: 'zh-CN'
  }

  // 方法3：使用 setCookie 但使用不同的选项格式
  // 使用 expires 而不是 maxAge
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)
  
  setCookie(event, 'token', cookies.token, { 
    httpOnly: true, 
    path: '/', 
    expires,
    sameSite: 'lax'
  })
  
  // 使用 secure 标志
  setCookie(event, 'theme', cookies.theme, { 
    path: '/', 
    expires,
    secure: false,
    sameSite: 'strict'
  })
  
  // 使用 domain 选项
  setCookie(event, 'lang', cookies.lang, { 
    path: '/', 
    expires,
    domain: undefined, // 不设置 domain，让浏览器决定
  })

  return {
    success: true,
    cookies,
    method: 'setCookie-expires'
  }
})

