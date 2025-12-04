export default defineEventHandler(async (event) => {
  // 获取查询参数
  const query = getQuery(event)
  
  // 获取请求信息
  const method = getMethod(event)
  const url = getRequestURL(event)
  
  // 分析和转换查询参数
  const analyzedParams = {}
  const typeAnalysis = {}
  
  for (const [key, value] of Object.entries(query)) {
    // 原始值
    analyzedParams[key] = {
      original: value,
      type: typeof value
    }
    
    // 尝试类型转换
    if (typeof value === 'string') {
      // 检查是否为数字
      if (!isNaN(value) && !isNaN(parseFloat(value))) {
        analyzedParams[key].asNumber = parseFloat(value)
        analyzedParams[key].possibleTypes = ['string', 'number']
      }
      // 检查是否为布尔值
      else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
        analyzedParams[key].asBoolean = value.toLowerCase() === 'true'
        analyzedParams[key].possibleTypes = ['string', 'boolean']
      }
      // 检查是否为数组（逗号分隔）
      else if (value.includes(',')) {
        analyzedParams[key].asArray = value.split(',').map(item => item.trim())
        analyzedParams[key].possibleTypes = ['string', 'array']
      }
      else {
        analyzedParams[key].possibleTypes = ['string']
      }
    }
    
    // 统计类型
    const detectedType = analyzedParams[key].possibleTypes[analyzedParams[key].possibleTypes.length - 1]
    typeAnalysis[detectedType] = (typeAnalysis[detectedType] || 0) + 1
  }
  
  // 返回完整的分析结果
  return {
    success: true,
    timestamp: new Date().toISOString(),
    request: {
      method: method,
      url: url.toString(),
      pathname: url.pathname,
      search: url.search
    },
    query: {
      raw: query,
      count: Object.keys(query).length,
      analyzed: analyzedParams,
      typeStatistics: typeAnalysis
    },
    examples: {
      usage: [
        '?name=张三&age=25&active=true',
        '?tags=vue,nuxt,javascript&count=10',
        '?debug=false&limit=50&offset=0'
      ]
    }
  }
})
