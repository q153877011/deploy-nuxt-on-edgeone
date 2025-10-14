// 这是一个标准的 Nitro 事件处理函数
export default defineEventHandler((event) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString()
  }
})