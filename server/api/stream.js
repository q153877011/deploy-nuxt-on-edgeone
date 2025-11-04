export default defineEventHandler(async (event) => {
  // 设置 SSE 响应头
  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')
  setHeader(event, 'X-Accel-Buffering', 'no') // 禁用 Nginx 缓冲
  
  // 获取查询参数
  const query = getQuery(event)
  const message = query.message || '这是一条流式消息'
  const count = parseInt(query.count || '10', 10)
  const delay = parseInt(query.delay || '1000', 10) // 默认 1 秒延迟
  
  // 返回流式响应
  return new ReadableStream({
    async start(controller) {
      try {
        for (let i = 1; i <= count; i++) {
          const data = {
            index: i,
            message: `${message} - 第 ${i} 条`,
            timestamp: new Date().toISOString(),
            timestampZh: new Date().toLocaleString('zh-CN', {
              timeZone: 'Asia/Shanghai'
            }),
            progress: Math.round((i / count) * 100)
          }
          
          // SSE 格式：data: {json}\n\n
          const sseData = `data: ${JSON.stringify(data)}\n\n`
          controller.enqueue(new TextEncoder().encode(sseData))
          
          // 如果不是最后一条，等待指定时间
          if (i < count) {
            await new Promise(resolve => setTimeout(resolve, delay))
          }
        }
        
        // 发送结束标记
        const endData = `data: ${JSON.stringify({ type: 'done', message: '流式传输完成' })}\n\n`
        controller.enqueue(new TextEncoder().encode(endData))
        
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    }
  })
})
