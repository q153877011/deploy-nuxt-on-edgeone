import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync, statSync } from 'fs';
import { extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 静态资源目录
const ASSET_DIR = resolve(__dirname, '../asset');

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
    const filePath = resolve(ASSET_DIR, cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl);
    
    // 安全检查：确保文件在 asset 目录内
    if (!filePath.startsWith(ASSET_DIR)) {
      return null;
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
    
    const { k: useNitroApp } = await import('./chunks/nitro/nitro.mjs');
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
    
    const response = await app.localCall({
      url,
      method,
      headers,
      body
    });

    return handleResponse(response, event);
  } catch (error) {
    console.error('EdgeOne handler error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: `Internal Server Error: ${error.message}`
    };
  }
}

// 本地开发服务器（仅在非生产环境启动）
if (process.env.NODE_ENV !== 'production') {
  import('http').then(({ createServer }) => {
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
        Object.entries(result.headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
        
        // 处理二进制内容
        if (Buffer.isBuffer(result.body)) {
          res.end(result.body);
        } else {
          res.end(result.body);
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
}
