export default defineEventHandler(async (event) => {
  // 获取当前时间
  const now = new Date()
  
  // 生成随机ID用于验证缓存
  const randomId = Math.floor(Math.random() * 10000)
  
  // 返回时间数据
  return {
    localTime: now.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    seconds: now.getSeconds(),
    randomId: randomId,
    generatedAt: now.toISOString(),
    timestamp: now.getTime(),
    timezone: 'Asia/Shanghai'
  }
})