export const runtime = 'nodejs'

export default defineEventHandler((event) => {
  return {
    hello: 'node'
  }
})
