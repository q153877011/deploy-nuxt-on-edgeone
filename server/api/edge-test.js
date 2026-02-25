// 在 Nuxt 4 中，edge runtime 需要在文件顶部声明
// 注意：runtime 必须在 defineEventHandler 之前声明
export const runtime = 'edge'

export default defineEventHandler((event) => {
  return {
    hello: 'edge',
  }
})
