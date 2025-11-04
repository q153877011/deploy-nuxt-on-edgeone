export default defineNuxtRouteMiddleware((to, from) => {
  

  // 记录中间件执行
  console.log(`🛡️ 全局中间件执行`)
  console.log(`   认证状态:`)
  
  // 返回 true 或 undefined 表示继续导航
  // 返回 false 或 navigateTo() 会阻止导航
})
