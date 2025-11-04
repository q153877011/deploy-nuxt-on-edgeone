import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync, statSync } from 'fs';
import { extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 静态资源目录
const ASSET_DIR = resolve(__dirname, '../assets');

// MIME 类型映射
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml'
};

/**
 * 获取文件的 MIME 类型
 */
function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * 处理静态资源请求
 */
function handleStaticFile(url) {
  try {
    // 移除查询参数
    const cleanUrl = url.split('?')[0];
    
    // 尝试多种可能的文件路径：
    // 1. 直接路径（如 /favicon.ico）
    // 2. 预渲染路由路径（如 /about -> /about/index.html）
    // 3. 根路径（如 / -> /index.html）
    const possiblePaths = [];
    
    // 直接文件路径
    const directPath = resolve(ASSET_DIR, cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl);
    possiblePaths.push(directPath);
    
    // 预渲染路由路径（如果不是根路径且不是以文件扩展名结尾）
    if (cleanUrl !== '/' && !cleanUrl.includes('.')) {
      const prerenderPath = resolve(ASSET_DIR, cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl, 'index.html');
      possiblePaths.push(prerenderPath);
    }
    
    // 根路径
    if (cleanUrl === '/') {
      const rootPath = resolve(ASSET_DIR, 'index.html');
      possiblePaths.push(rootPath);
    }
    
    // 尝试每个可能的路径
    for (const filePath of possiblePaths) {
      // 安全检查：确保文件在 asset 目录内
      if (!filePath.startsWith(ASSET_DIR)) {
        continue;
      }
      
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const content = readFileSync(filePath);
        const mimeType = getMimeType(filePath);
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': mimeType,
            'Content-Length': content.length.toString(),
            'Cache-Control': 'public, max-age=31536000' // 1年缓存
          },
          body: content
        };
      }
    }
  } catch (error) {
    console.error('Static file error:', error);
  }
  
  return null;
}

/**
 * 延迟加载 Nitro 应用
 */
let nitroApp = null;
async function getNitroApp() {
  if (!nitroApp) {
    // 设置环境变量防止自动启动服务器
    process.env.NITRO_PORT = '';
    process.env.PORT = '';
    
    // 设置正确的静态资源路径
    process.env.NITRO_PUBLIC_DIR = ASSET_DIR;
    
    const { n: useNitroApp } = await import('./chunks/nitro/nitro.mjs');
    nitroApp = useNitroApp();
  }
  return nitroApp;
}

/**
 * 处理 HTTP 响应
 */
function handleResponse(response, event) {
  if (!response) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Internal Server Error'
    };
  }

  const headers = {};
  
  response.headers = new Headers(response.headers);
  // 处理响应头
  if (response.headers) {
    for (const [key, value] of Object.entries(response.headers)) {
      headers[key] = Array.isArray(value) ? value.join(', ') : String(value);
    }
  }

  // 设置默认 Content-Type
  if (!headers['content-type'] && !headers['Content-Type']) {
    headers['Content-Type'] = 'text/html; charset=utf-8';
  }

  if (response.headers.has('set-cookie')) {
    const cookieArr = response.headers.getSetCookie();
    headers['set-cookie'] = Array.isArray(cookieArr) ? cookieArr : [cookieArr];
  }

  return {
    statusCode: response.status || response.statusCode || 200,
    headers,
    body: response.body || response._data || ''
  };
}

/**
 * EdgeOne 函数处理器
 */
export async function handler(event, context) {
  try {
    const url = event.path || '/';
    const method = event.httpMethod || event.method || 'GET';
    const headers = event.headers || {};
    const body = event.body || '';

    // 首先尝试处理静态资源
    if (method === 'GET') {
      const staticResponse = handleStaticFile(url);
      if (staticResponse) {
        return staticResponse;
      }
    }

    // 处理动态请求
    const app = await getNitroApp();
    
    try {
      const response = await app.localCall({
        url,
        method,
        headers,
        body
      });

      return handleResponse(response, event);
    } catch (nitroError) {
      // 处理 Nitro 静态文件读取错误（预渲染文件不存在的情况）
      // 检查错误及其 cause 属性（H3Error 可能将实际错误包装在 cause 中）
      const actualError = nitroError?.cause || nitroError;
      const errorPath = actualError?.path || nitroError?.path;
      const errorCode = actualError?.code || nitroError?.code;
      
      // 如果错误是因为找不到预渲染的静态文件，尝试动态渲染
      if (errorCode === 'ENOENT' && 
          errorPath && 
          (errorPath.includes('/assets/') || errorPath.includes('assets/')) &&
          (errorPath.includes('/index.html') || errorPath.includes('index.html'))) {
        console.warn(`Prerender file not found: ${errorPath}, falling back to dynamic rendering for ${url}`);
        
        // 如果静态文件处理已经尝试过但没有找到文件，说明应该进行动态渲染
        // Nitro 应该能够处理动态路由，但如果它仍然尝试读取静态文件，
        // 可能是因为配置问题。我们直接抛出错误，让用户知道需要构建或检查配置
        throw new Error(`Prerender route ${url} not found. Make sure to run build first or configure routeRules correctly. Original error: ${actualError?.message || nitroError?.message}`);
      }
      
      // 其他错误直接抛出
      throw nitroError;
    }
  } catch (error) {
    console.error('EdgeOne handler error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: `Internal Server Error: ${error.message}`
    };
  }
}

import('http').then((http) => {
  const { createServer } = http;
  // 动态导入 stream 模块以处理 ReadableStream
  import('stream').then(({ Readable, pipeline }) => {
    const server = createServer(async (req, res) => {
      try {
        const event = {
          path: req.url,
          httpMethod: req.method,
          headers: req.headers,
          body: ''
        };

        if (req.method !== 'GET' && req.method !== 'HEAD') {
          const chunks = [];
          for await (const chunk of req) {
            chunks.push(chunk);
          }
          event.body = Buffer.concat(chunks).toString();
        }

        const result = await handler(event, {});

        res.statusCode = result.statusCode;
        res.setHeader('from-server', 'true');
        Object.entries(result.headers).forEach(([key, value]) => {
          if(key === 'set-cookie') {
            res.setHeader('set-cookie', Array.isArray(value) ? value[0].split(',') : value);
          } else {
            res.setHeader(key, value);
          }
        });

        // 处理响应体：支持 Buffer、字符串和 ReadableStream
        if (Buffer.isBuffer(result.body)) {
          res.end(result.body);
        } else if (result.body && typeof result.body === 'object' && typeof result.body.getReader === 'function') {
          // 检测 ReadableStream (Web Streams API)
          try {
            const nodeStream = Readable.fromWeb(result.body);
            nodeStream.pipe(res);
          } catch (streamError) {
            console.error('Stream conversion error:', streamError);
            // 如果转换失败，尝试读取整个流
            const reader = result.body.getReader();
            const chunks = [];
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(Buffer.from(value));
              }
              res.end(Buffer.concat(chunks));
            } catch (readError) {
              console.error('Stream read error:', readError);
              res.end();
            }
          }
        } else {
          // 处理字符串或其他类型
          res.end(result.body || '');
        }
      } catch (error) {
        console.error('Local server error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Server Error: ${error.message}`);
      }
    });

    const port = process.env.DEV_PORT || 9000;
    server.listen(port, () => {
      console.log(`EdgeOne development server running at http://localhost:${port}`);
      console.log(`Static assets served from: ${ASSET_DIR}`);
    });
  });
});