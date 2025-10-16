// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import { promises as fs } from 'fs'

// export default defineNuxtConfig({
//   srcDir: 'app',
//   // nitro: {
//   //   // extends: 'node-server',
//   // }
//   nitro: {
//     extends: 'aws-lambda',
//     // 默认node-functions下面文件夹必须以 api 或者 route 开头
//     scanDirs: ['server', resolve(__dirname, './node-functions')],

//     output: {
//       dir: '.edgeone',
//       publicDir: '.edgeone/asset',
//       serverDir: '.edgeone/server-handler',
//     },

//     // 在这里使用 Nitro 的钩子
//     // hooks: {
//     //   // 正确的钩子名称是 'compiled'，没有 'nitro:' 前缀
//     //   'compiled': async (nitro) => {
//     //     console.log('Nitro build completed. Generating API metadata...');

//     //     // 1. 获取所有扫描到的服务器处理函数
//     //     const apiRoutes = nitro.scannedHandlers
//     //       .filter(handler => handler.route)
//     //       .map(handler => ({
//     //         route: handler.route,
//     //         source: handler.handler
//     //       }));

//     //     // 2. 定义输出目录和文件路径
//     //     const outputDir = resolve(nitro.options.rootDir, './.edgeone/generated-meta');
//     //     const outputFile = resolve(outputDir, 'meta.json');

//     //     // 3. 创建目录并写入文件
//     //     try {
//     //       await fs.mkdir(outputDir, { recursive: true });
//     //       await fs.writeFile(outputFile, JSON.stringify(apiRoutes, null, 2));
//     //       console.log(`✅ API metadata generated at: ${outputFile}`);
//     //     } catch (error) {
//     //       console.error('❌ Error generating API metadata:', error);
//     //     }
//     //   }
//     // }
//   },
//   devtools: { enabled: true },
//   //  注册 Nuxt 生命周期钩子
//   modules: [
//     './modules/meta-generator.ts'
//   ],
// })
// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: 'app',
  nitro: {
    // 使用 EdgeOne 兼容的预设
    preset: 'node-server',
    // EdgeOne 部署输出配置
    output: {
      dir: '.edgeone',
      publicDir: '.edgeone/asset',
      serverDir: '.edgeone/server-handler',
    },
  },
  
  routeRules: {
    '/about': {
      prerender: true
    }
  },
  
  devtools: { enabled: true },
})