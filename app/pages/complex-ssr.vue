<template>
  <section style="padding: 24px; max-width: 1200px; margin: 0 auto;">
    <h1>复杂SSR性能测试页面</h1>
    <p style="color: #666; margin-bottom: 24px;">
      此页面包含复杂的数据处理逻辑，用于测试Vercel SSR性能
    </p>

    <!-- 性能指标 -->
    <div v-if="performanceMetrics" style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
      <h2 style="margin-top: 0;">性能指标</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        <div>
          <strong>总处理时间：</strong>{{ performanceMetrics.totalTime }}ms
        </div>
        <div>
          <strong>数据获取时间：</strong>{{ performanceMetrics.fetchTime }}ms
        </div>
        <div>
          <strong>数据处理时间：</strong>{{ performanceMetrics.processTime }}ms
        </div>
        <div>
          <strong>生成记录数：</strong>{{ performanceMetrics.recordsGenerated }}
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="pending" style="text-align: center; padding: 40px;">
      <p>正在执行复杂的数据处理逻辑...</p>
    </div>

    <!-- 错误状态 -->
    <div v-if="error" style="background: #fee; padding: 16px; border-radius: 8px; color: #c33;">
      <strong>错误：</strong>{{ error.message }}
    </div>

    <!-- 数据展示 -->
    <div v-else-if="processedData">
      <!-- 数据源统计 -->
      <div style="margin-bottom: 24px;">
        <h2>数据源统计</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0;">文章数据</h3>
            <p>总数：{{ processedData.sourceStats.posts.total }}</p>
            <p>已发布：{{ processedData.sourceStats.posts.published }}</p>
            <p>草稿：{{ processedData.sourceStats.posts.drafts }}</p>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0;">时间数据</h3>
            <p>时区：{{ processedData.sourceStats.time.timezone }}</p>
            <p>时间戳：{{ processedData.sourceStats.time.timestamp }}</p>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0;">环境信息</h3>
            <p>环境变量数：{{ processedData.sourceStats.env.totalVars }}</p>
            <p>平台：{{ processedData.sourceStats.env.platform }}</p>
          </div>
        </div>
      </div>

      <!-- 聚合数据展示 -->
      <div style="margin-bottom: 24px;">
        <h2>数据聚合结果</h2>
        <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p><strong>生成的用户记录数：</strong>{{ processedData.aggregatedData.userRecords.length }}</p>
          <p><strong>生成的订单记录数：</strong>{{ processedData.aggregatedData.orderRecords.length }}</p>
          <p><strong>生成的交易记录数：</strong>{{ processedData.aggregatedData.transactionRecords.length }}</p>
          <p><strong>总数据量：</strong>{{ processedData.aggregatedData.totalRecords }} 条</p>
        </div>
      </div>

      <!-- 统计分析 -->
      <div style="margin-bottom: 24px;">
        <h2>统计分析</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
          <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0;">用户统计</h3>
            <ul style="list-style: none; padding: 0;">
              <li>活跃用户：{{ processedData.statistics.users.active }}</li>
              <li>VIP用户：{{ processedData.statistics.users.vip }}</li>
              <li>平均年龄：{{ processedData.statistics.users.avgAge }}</li>
              <li>总积分：{{ processedData.statistics.users.totalPoints }}</li>
            </ul>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0;">订单统计</h3>
            <ul style="list-style: none; padding: 0;">
              <li>总订单数：{{ processedData.statistics.orders.total }}</li>
              <li>已完成：{{ processedData.statistics.orders.completed }}</li>
              <li>总金额：¥{{ processedData.statistics.orders.totalAmount.toLocaleString() }}</li>
              <li>平均金额：¥{{ processedData.statistics.orders.avgAmount.toFixed(2) }}</li>
            </ul>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="margin-top: 0;">交易统计</h3>
            <ul style="list-style: none; padding: 0;">
              <li>总交易数：{{ processedData.statistics.transactions.total }}</li>
              <li>成功交易：{{ processedData.statistics.transactions.success }}</li>
              <li>总交易额：¥{{ processedData.statistics.transactions.totalAmount.toLocaleString() }}</li>
              <li>成功率：{{ processedData.statistics.transactions.successRate }}%</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 标签分析 -->
      <div style="margin-bottom: 24px;">
        <h2>标签分析</h2>
        <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p><strong>热门标签（Top 10）：</strong></p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
            <span 
              v-for="tag in processedData.tagAnalysis.topTags" 
              :key="tag.name"
              style="background: #e3f2fd; padding: 4px 12px; border-radius: 16px; font-size: 14px;"
            >
              {{ tag.name }} ({{ tag.count }})
            </span>
          </div>
        </div>
      </div>

      <!-- 时间序列分析 -->
      <div style="margin-bottom: 24px;">
        <h2>时间序列分析</h2>
        <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p><strong>按日期分组的订单数：</strong></p>
          <div style="max-height: 300px; overflow-y: auto; margin-top: 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f5f5f5;">
                  <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">日期</th>
                  <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">订单数</th>
                  <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">总金额</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in processedData.timeSeriesAnalysis.dailyOrders" :key="index">
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ item.date }}</td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #eee;">{{ item.count }}</td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #eee;">¥{{ item.amount.toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 数据关联分析 -->
      <div style="margin-bottom: 24px;">
        <h2>数据关联分析</h2>
        <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p><strong>用户-订单关联统计：</strong></p>
          <p>平均每个用户订单数：{{ processedData.correlationAnalysis.avgOrdersPerUser.toFixed(2) }}</p>
          <p>最高订单数用户：{{ processedData.correlationAnalysis.maxOrdersUser.userId }} ({{ processedData.correlationAnalysis.maxOrdersUser.orderCount }} 单)</p>
          <p>用户订单分布：</p>
          <ul style="list-style: none; padding: 0;">
            <li v-for="(dist, index) in processedData.correlationAnalysis.orderDistribution" :key="index">
              {{ dist.range }}：{{ dist.count }} 用户
            </li>
          </ul>
        </div>
      </div>

      <!-- 刷新按钮 -->
      <div style="text-align: center; margin-top: 24px;">
        <button 
          @click="handleRefresh" 
          :disabled="pending"
          style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;"
        >
          {{ pending ? '处理中...' : '重新处理数据' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// 性能指标
const performanceMetrics = ref(null)

// 复杂数据处理函数
async function processComplexData() {
  const startTime = performance.now()
  const fetchStartTime = performance.now()

  try {
    // 1. 并发获取多个数据源
    const [postsResponse, timeResponse, envResponse] = await Promise.all([
      $fetch('/api/test-post?limit=100').catch(() => ({ success: false, data: { posts: [] } })),
      $fetch('/api/time').catch(() => ({ localTime: '', timestamp: 0 })),
      $fetch('/api/env').catch(() => ({ success: false, processEnv: {}, stats: { totalEnvVars: 0 } }))
    ])

    const fetchTime = performance.now() - fetchStartTime
    const processStartTime = performance.now()

    // 2. 提取数据
    const posts = postsResponse?.data?.posts || postsResponse?.posts || []
    const timeData = timeResponse || {}
    const envData = envResponse || {}

    // 3. 生成大量模拟数据（用于测试计算性能）
    const userRecords = generateUserRecords(500)
    const orderRecords = generateOrderRecords(800, userRecords)
    const transactionRecords = generateTransactionRecords(1000, userRecords, orderRecords)

    // 4. 复杂数据转换和映射
    const transformedUsers = transformUserData(userRecords)
    const transformedOrders = transformOrderData(orderRecords)
    const transformedTransactions = transformTransactionData(transactionRecords)

    // 5. 数据聚合和统计
    const userStats = calculateUserStatistics(transformedUsers)
    const orderStats = calculateOrderStatistics(transformedOrders)
    const transactionStats = calculateTransactionStatistics(transformedTransactions)

    // 6. 标签分析（从文章数据中提取）
    const tagAnalysis = analyzeTags(posts)

    // 7. 时间序列分析
    const timeSeriesAnalysis = analyzeTimeSeries(orderRecords)

    // 8. 数据关联分析
    const correlationAnalysis = analyzeCorrelations(userRecords, orderRecords)

    // 9. 数据排序和过滤
    const sortedUsers = sortUsersByPoints(transformedUsers)
    const filteredOrders = filterOrdersByAmount(transformedOrders, 100)

    const processTime = performance.now() - processStartTime
    const totalTime = performance.now() - startTime

    return {
      sourceStats: {
        posts: {
          total: posts.length,
          published: posts.filter(p => p.status === 'published').length,
          drafts: posts.filter(p => p.status === 'draft').length
        },
        time: {
          timezone: timeData.timezone || 'N/A',
          timestamp: timeData.timestamp || 0
        },
        env: {
          totalVars: envData.stats?.totalEnvVars || 0,
          platform: envData.runtime?.platform || 'N/A'
        }
      },
      aggregatedData: {
        userRecords: transformedUsers,
        orderRecords: transformedOrders,
        transactionRecords: transformedTransactions,
        totalRecords: transformedUsers.length + transformedOrders.length + transformedTransactions.length
      },
      statistics: {
        users: userStats,
        orders: orderStats,
        transactions: transactionStats
      },
      tagAnalysis,
      timeSeriesAnalysis,
      correlationAnalysis,
      performanceMetrics: {
        totalTime: Math.round(totalTime),
        fetchTime: Math.round(fetchTime),
        processTime: Math.round(processTime),
        recordsGenerated: transformedUsers.length + transformedOrders.length + transformedTransactions.length
      }
    }
  } catch (error) {
    console.error('数据处理错误:', error)
    throw error
  }
}

// 生成用户记录
function generateUserRecords(count) {
  const users = []
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十']
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安']
  
  for (let i = 1; i <= count; i++) {
    users.push({
      userId: `user_${i}`,
      name: `${names[i % names.length]}${Math.floor(i / names.length) + 1}`,
      age: 18 + Math.floor(Math.random() * 50),
      city: cities[Math.floor(Math.random() * cities.length)],
      points: Math.floor(Math.random() * 10000),
      isVip: Math.random() > 0.7,
      isActive: Math.random() > 0.3,
      joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString()
    })
  }
  return users
}

// 生成订单记录
function generateOrderRecords(count, users) {
  const orders = []
  const statuses = ['pending', 'processing', 'completed', 'cancelled']
  
  for (let i = 1; i <= count; i++) {
    const user = users[Math.floor(Math.random() * users.length)]
    const amount = Math.floor(Math.random() * 5000) + 10
    const date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
    
    orders.push({
      orderId: `order_${i}`,
      userId: user.userId,
      amount: amount,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: date.toISOString(),
      items: Math.floor(Math.random() * 10) + 1
    })
  }
  return orders
}

// 生成交易记录
function generateTransactionRecords(count, users, orders) {
  const transactions = []
  const types = ['payment', 'refund', 'transfer']
  
  for (let i = 1; i <= count; i++) {
    const user = users[Math.floor(Math.random() * users.length)]
    const order = orders[Math.floor(Math.random() * orders.length)]
    const success = Math.random() > 0.15
    
    transactions.push({
      transactionId: `txn_${i}`,
      userId: user.userId,
      orderId: order.orderId,
      type: types[Math.floor(Math.random() * types.length)],
      amount: Math.floor(Math.random() * 3000) + 5,
      success: success,
      createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString()
    })
  }
  return transactions
}

// 转换用户数据
function transformUserData(users) {
  return users.map(user => ({
    ...user,
    level: user.points > 5000 ? '高级' : user.points > 2000 ? '中级' : '初级',
    displayName: `${user.name} (${user.city})`,
    score: user.points * (user.isVip ? 1.5 : 1) * (user.isActive ? 1.2 : 1)
  }))
}

// 转换订单数据
function transformOrderData(orders) {
  return orders.map(order => ({
    ...order,
    formattedAmount: `¥${order.amount.toLocaleString()}`,
    statusText: {
      pending: '待处理',
      processing: '处理中',
      completed: '已完成',
      cancelled: '已取消'
    }[order.status] || order.status,
    isHighValue: order.amount > 1000
  }))
}

// 转换交易数据
function transformTransactionData(transactions) {
  return transactions.map(txn => ({
    ...txn,
    formattedAmount: `¥${txn.amount.toLocaleString()}`,
    statusText: txn.success ? '成功' : '失败',
    typeText: {
      payment: '支付',
      refund: '退款',
      transfer: '转账'
    }[txn.type] || txn.type
  }))
}

// 计算用户统计
function calculateUserStatistics(users) {
  const active = users.filter(u => u.isActive).length
  const vip = users.filter(u => u.isVip).length
  const totalAge = users.reduce((sum, u) => sum + u.age, 0)
  const totalPoints = users.reduce((sum, u) => sum + u.points, 0)
  
  return {
    active,
    vip,
    avgAge: Math.round(totalAge / users.length),
    totalPoints: totalPoints.toLocaleString()
  }
}

// 计算订单统计
function calculateOrderStatistics(orders) {
  const completed = orders.filter(o => o.status === 'completed').length
  const totalAmount = orders.reduce((sum, o) => sum + o.amount, 0)
  
  return {
    total: orders.length,
    completed,
    totalAmount: Math.round(totalAmount),
    avgAmount: totalAmount / orders.length
  }
}

// 计算交易统计
function calculateTransactionStatistics(transactions) {
  const success = transactions.filter(t => t.success).length
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0)
  
  return {
    total: transactions.length,
    success,
    totalAmount: Math.round(totalAmount),
    successRate: Math.round((success / transactions.length) * 100)
  }
}

// 分析标签
function analyzeTags(posts) {
  const tagCount = {}
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    }
  })
  
  const topTags = Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
  
  return { topTags }
}

// 时间序列分析
function analyzeTimeSeries(orders) {
  const dailyOrders = {}
  
  orders.forEach(order => {
    const date = new Date(order.createdAt).toISOString().split('T')[0]
    if (!dailyOrders[date]) {
      dailyOrders[date] = { date, count: 0, amount: 0 }
    }
    dailyOrders[date].count++
    dailyOrders[date].amount += order.amount
  })
  
  return {
    dailyOrders: Object.values(dailyOrders)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 30) // 只显示最近30天
  }
}

// 关联分析
function analyzeCorrelations(users, orders) {
  const userOrderCount = {}
  
  orders.forEach(order => {
    userOrderCount[order.userId] = (userOrderCount[order.userId] || 0) + 1
  })
  
  const orderCounts = Object.values(userOrderCount)
  const totalOrders = orderCounts.reduce((sum, count) => sum + count, 0)
  const avgOrdersPerUser = totalOrders / users.length
  
  const maxOrders = Math.max(...orderCounts)
  const maxUserId = Object.keys(userOrderCount).find(
    userId => userOrderCount[userId] === maxOrders
  )
  
  // 订单分布
  const distribution = {
    '0单': 0,
    '1-5单': 0,
    '6-10单': 0,
    '11-20单': 0,
    '20+单': 0
  }
  
  users.forEach(user => {
    const count = userOrderCount[user.userId] || 0
    if (count === 0) distribution['0单']++
    else if (count <= 5) distribution['1-5单']++
    else if (count <= 10) distribution['6-10单']++
    else if (count <= 20) distribution['11-20单']++
    else distribution['20+单']++
  })
  
  return {
    avgOrdersPerUser: avgOrdersPerUser,
    maxOrdersUser: {
      userId: maxUserId,
      orderCount: maxOrders
    },
    orderDistribution: Object.entries(distribution).map(([range, count]) => ({ range, count }))
  }
}

// 按积分排序用户
function sortUsersByPoints(users) {
  return [...users].sort((a, b) => b.points - a.points)
}

// 按金额过滤订单
function filterOrdersByAmount(orders, minAmount) {
  return orders.filter(o => o.amount >= minAmount)
}

// 使用 useAsyncData 执行复杂的数据处理
const { data: processedData, pending, error, refresh } = await useAsyncData(
  'complex-ssr-data',
  processComplexData,
  {
    server: true, // 确保在服务器端执行
    default: () => null
  }
)

// 更新性能指标
watch(processedData, (newData) => {
  if (newData?.performanceMetrics) {
    performanceMetrics.value = newData.performanceMetrics
  }
}, { immediate: true })

// 刷新处理函数
async function handleRefresh() {
  await refresh()
}
</script>

<style scoped>
h1 {
  margin: 0 0 12px;
  color: #333;
}

h2 {
  margin: 24px 0 16px;
  color: #444;
  font-size: 20px;
}

h3 {
  margin: 0 0 8px;
  color: #555;
  font-size: 16px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #0056b3;
}
</style>