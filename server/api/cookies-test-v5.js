export default defineEventHandler((event) => {
  const cookies = {
    token: 'abc123',
    theme: 'dark',
    lang: 'zh-CN'
  }

  // 方法4：直接操作 response 对象的 headers
  // 通过 h3 的 response 对象直接设置
  const response = event.node.res
  
  // 使用 writeHead 的第三个参数（headers 数组）
  // 或者先设置 headers 再 writeHead
  response.setHeader('Set-Cookie', [
    `token=${cookies.token}; Max-Age=604800; Path=/; HttpOnly`,
    `theme=${cookies.theme}; Max-Age=604800; Path=/`,
    `lang=${cookies.lang}; Max-Age=604800; Path=/`
  ])

  return {
    success: true,
    cookies,
    method: 'direct-response-headers'
  }
})

