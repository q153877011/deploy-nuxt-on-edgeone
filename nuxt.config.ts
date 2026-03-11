const options = {
  '/about': {
    prerender: true
  },
  '/test-isr': {
    swr: 5
  },
  '/test/:id': {
    prerender: true
  },
  '/test-ssg': {
    prerender: true
  }
}

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
    },
    '/test-ssg': {
      prerender: true,
      headers: {
        'Cache-Control': 'max-age=3600'
      },
    },
    '/api/cookies-test-cache': {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=300'
      }
    },
    '/api/cookies-test': {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    }
  },
  devtools: { enabled: true },
  // nitro: {
  //   output: {
  //     dir: '.edgeone',
  //     publicDir: '.edgeone/assets',
  //     serverDir: '.edgeone/server-handler'
  //   }
  // },
  // nitro: {
  //   output: {
  //     dir: '.edgeone',
  //     publicDir: '.edgeone/assets',
  //     serverDir: '.edgeone/server-handler'
  //   }
  // },
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
  // },
  nitro: {}
})