// export default defineNuxtConfig({
//   app: {
//     baseURL: '/test',
//   },
//   srcDir: 'app',
//   routeRules: {
//     '/about': {
//       prerender: true
//     },
//     '/test-isr': {
//       swr: 5
//     }
//   },
  
//   devtools: { enabled: true },
//   nitro: {
//     prerender: {
//       routes: [
//         '/test-ssg'
//       ]
//     },
//     output: {
//       dir: '.edgeone',
//       publicDir: '.edgeone/assets',
//       serverDir: '.edgeone/server-handler'
//     }
//   }
// })
export default defineNuxtConfig({
  app: {
    baseURL: '/test',
  },
  
  nitro: {
    preset: 'vercel'
  }
})