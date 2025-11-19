export default defineNuxtConfig({
  srcDir: 'app',

  routeRules: {
    '/about': {
      prerender: true
    },
    '/test-isr': {
      swr: 5
    },
    '/test/:id': {
      prerender: true
    }
  },
  devtools: { enabled: true },
  // nitro: {
  //   preset: 'node-server',
  //   prerender: {
  //     routes: ['/test-ssg', '/test/1']
  //   },
  //   output: {
  //     dir: '.edgeone',
  //     publicDir: '.edgeone/assets',
  //     serverDir: '.edgeone/server-handler'
  //   }
  // }
  // nitro: {
  //   preset: 'netlify'
  // }
})