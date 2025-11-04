export default defineNuxtConfig({
  srcDir: 'app',

  routeRules: {
    '/about': {
      prerender: true
    },
    '/test-isr': {
      swr: 5
    }
  },
  devtools: { enabled: true },
  nitro: {
    preset: 'vercel-edge',
    prerender: {
      routes: ['/test-ssg']
    }
  }
})