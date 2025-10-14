// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  nitro: {
    extends: 'node-server',
    // 默认node-functions下面文件夹必须以 api 或者 route 开头
    scanDirs: ['server', resolve(__dirname, './node-functions')],

    output: {
      dir: '.edgeone',
      publicDir: '.edgeone/asset',
      serverDir: '.edgeone/server-handler',
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
