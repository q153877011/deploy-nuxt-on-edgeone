export default defineEventHandler(async (event) => {
  // 敏感信息关键词，这些环境变量会被隐藏值
  const sensitiveKeywords = ['password', 'secret', 'key', 'token', 'api_key', 'private', 'credential']
  
  // 检查是否是敏感信息
  const isSensitiveKey = (key) => {
    return sensitiveKeywords.some(keyword => 
      key.toLowerCase().includes(keyword.toLowerCase())
    )
  }
  
  // 从 process.env 获取所有环境变量
  const envVars = {}
  for (const [key, value] of Object.entries(process.env)) {
    if (!key) continue
    
    // 如果是敏感信息，隐藏值
    envVars[key] = isSensitiveKey(key) 
      ? '***HIDDEN***' // 隐藏敏感信息的值
      : value
  }
  
  return {
    success: true,
    message: '环境变量读取成功',
    processEnv: envVars,
    // 统计信息
    stats: {
      totalEnvVars: Object.keys(process.env).length,
      sensitiveCount: Object.keys(process.env).filter(key => 
        isSensitiveKey(key)
      ).length
    },
    // 运行环境信息
    runtime: {
      nodeEnv: process.env.NODE_ENV || 'development',
      platform: process.platform,
      nodeVersion: process.version,
      cwd: process.cwd()
    }
  }
})
