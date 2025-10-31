// // Ensure Nitro can read import.meta and env like in built index
// globalThis._importMeta_ = { url: import.meta.url, env: process.env };

// // Choose port
// process.env.NITRO_PORT = process.env.NITRO_PORT || '9000';
// // Configure static assets directory for _nuxt files
// process.env.NITRO_STATIC_DIR = process.env.NITRO_STATIC_DIR || '.edgeone/assets';
// process.env.PORT = process.env.PORT || process.env.NITRO_PORT;

// // Import and execute Nitro server (top-level code starts the server)
// const nitroModule = await import('./chunks/nitro/nitro.mjs');

// // Get useNitroApp (your build exports it as `k`)
// const useNitroApp = nitroModule.k || nitroModule.useNitroApp;
// // if (!useNitroApp) {
// //   console.error('useNitroApp not found in nitro module exports');
// //   process.exit(1);
// // }

// const nitroApp = useNitroApp();

// // Add static file handling for _nuxt assets
// // nitroApp.hooks.hook('request', async (event) => {
// //   const url = event.node.req.url;
  
// //   // Handle _nuxt static files
// //   if (url.startsWith('/_nuxt/')) {
// //     const fs = await import('fs');
// //     const path = await import('path');
    
// //     const filePath = path.join(process.cwd(), '.edgeone/assets', url);
    
// //     try {
// //       if (fs.existsSync(filePath)) {
// //         const stat = fs.statSync(filePath);
// //         if (stat.isFile()) {
// //           const content = fs.readFileSync(filePath);
          
// //           // Set appropriate content type
// //           const ext = path.extname(filePath).toLowerCase();
// //           const mimeTypes = {
// //             '.js': 'application/javascript',
// //             '.css': 'text/css',
// //             '.json': 'application/json'
// //           };
          
// //           event.node.res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
// //           event.node.res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
// //           event.node.res.end(content);
// //           return;
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Static file error:', error);
// //     }
// //   }
// // });

// // Request interceptor
// nitroApp.hooks.hook('request', async (event) => {
//   const { req } = event.node;
//   console.log(`📥 [${new Date().toISOString()}] ${req.method} ${req.url}`);
//   console.log('📋 Request Headers:', req.headers);
//   // Example: mark request source
//   req.headers['x-intercepted-by'] = 'custom-hooks';
// });

// // Response interceptor
// nitroApp.hooks.hook('beforeResponse', async (event, response) => {
//   const { res } = event.node;
//   console.log(`📤 [${new Date().toISOString()}] Status: ${res.statusCode}`);
//   console.log('📋 Response Headers:', res.getHeaders());
//   // Example: add a custom header
//   res.setHeader('x-intercepted', 'true');
//   return response;
// });

// console.log('🔍 Request/Response interception enabled (run-with-hooks)');

import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import 'node:http';
import 'node:https';
export { C as default } from './chunks/nitro/nitro.mjs';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
//# sourceMappingURL=index.mjs.map
