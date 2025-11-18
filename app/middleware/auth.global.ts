export default defineNuxtRouteMiddleware((to, from) => {
  // 全局中间件会在每个路由导航前执行
  console.log(`🛡️ 全局中间件执行: ${from.path} → ${to.path}`)
})