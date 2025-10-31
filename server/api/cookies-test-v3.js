import { setHeader } from 'h3'

export default defineEventHandler((event) => {
  const cookies = {
    token: 'abc123',
    theme: 'dark',
    lang: 'zh-CN'
  }

  // 方法2：使用 setHeader 直接设置 Set-Cookie 字符串（手动构造）
  // 注意：这种方式会将所有 cookies 合并成一个字符串
  const cookieString = [
    `token=${cookies.token}; Max-Age=604800; Path=/; HttpOnly`,
    `theme=${cookies.theme}; Max-Age=604800; Path=/`,
    `lang=${cookies.lang}; Max-Age=604800; Path=/`
  ].join(', ')
  
  setHeader(event, 'Set-Cookie', cookieString)

  return {
    success: true,
    cookies,
    method: 'setHeader-manual'
  }
})

