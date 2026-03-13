
      let global = globalThis;
      globalThis.global = globalThis;

      if (typeof global.navigator === 'undefined') {
        global.navigator = {
          userAgent: 'edge-runtime',
          language: 'en-US',
          languages: ['en-US'],
        };
      } else {
        if (typeof global.navigator.language === 'undefined') {
          global.navigator.language = 'en-US';
        }
        if (!global.navigator.languages || global.navigator.languages.length === 0) {
          global.navigator.languages = [global.navigator.language];
        }
        if (typeof global.navigator.userAgent === 'undefined') {
          global.navigator.userAgent = 'edge-runtime';
        }
      }

      class MessageChannel {
        constructor() {
          this.port1 = new MessagePort();
          this.port2 = new MessagePort();
        }
      }
      class MessagePort {
        constructor() {
          this.onmessage = null;
        }
        postMessage(data) {
          if (this.onmessage) {
            setTimeout(() => this.onmessage({ data }), 0);
          }
        }
      }
      global.MessageChannel = MessageChannel;

      // if ((typeof globalThis.fetch === 'undefined' || typeof globalThis.Headers === 'undefined' || typeof globalThis.Request === 'undefined' || typeof globalThis.Response === 'undefined') && typeof require !== 'undefined') {
      //   try {
      //     const undici = require('undici');
      //     if (undici.fetch && !globalThis.fetch) {
      //       globalThis.fetch = undici.fetch;
      //     }
      //     if (undici.Headers && typeof globalThis.Headers === 'undefined') {
      //       globalThis.Headers = undici.Headers;
      //     }
      //     if (undici.Request && typeof globalThis.Request === 'undefined') {
      //       globalThis.Request = undici.Request;
      //     }
      //     if (undici.Response && typeof globalThis.Response === 'undefined') {
      //       globalThis.Response = undici.Response;
      //     }
      //   } catch (polyfillError) {
      //     console.warn('Edge middleware polyfill failed:', polyfillError && polyfillError.message ? polyfillError.message : polyfillError);
      //   }
      // }

      '__MIDDLEWARE_BUNDLE_CODE__'

      function recreateRequest(request, overrides = {}) {
        const cloned = typeof request.clone === 'function' ? request.clone() : request;
        const headers = new Headers(cloned.headers);

        if (overrides.headerPatches) {
          Object.keys(overrides.headerPatches).forEach((key) => {
            const value = overrides.headerPatches[key];
            if (value === null || typeof value === 'undefined') {
              headers.delete(key);
            } else {
              headers.set(key, value);
            }
          });
        }

        if (overrides.headers) {
          const extraHeaders = new Headers(overrides.headers);
          extraHeaders.forEach((value, key) => headers.set(key, value));
        }

        const url = overrides.url || cloned.url;
        const method = overrides.method || cloned.method || 'GET';
        const canHaveBody = method && method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD';
        const body = overrides.body !== undefined ? overrides.body : canHaveBody ? cloned.body : undefined;

        // 如果rewrite传入的是完整URL（第三方地址），需要更新host
        if (overrides.url) {
          try {
            const newUrl = new URL(overrides.url, cloned.url);
            // 只有当新URL是绝对路径（包含协议和host）时才更新host
            if (overrides.url.startsWith('http://') || overrides.url.startsWith('https://')) {
              headers.set('host', newUrl.host);
            }
            // 相对路径时保持原有host不变
          } catch (e) {
            // URL解析失败时保持原有host
          }
        }

        const init = {
          method,
          headers,
          redirect: cloned.redirect,
          credentials: cloned.credentials,
          cache: cloned.cache,
          mode: cloned.mode,
          referrer: cloned.referrer,
          referrerPolicy: cloned.referrerPolicy,
          integrity: cloned.integrity,
          keepalive: cloned.keepalive,
          signal: cloned.signal,
        };

        if (canHaveBody && body !== undefined) {
          init.body = body;
        }

        if ('duplex' in cloned) {
          init.duplex = cloned.duplex;
        }

        return new Request(url, init);

      }

      
    const __middlewareModule = (() => {
      const module = { exports: {} };
      const exports = module.exports;
      const loader = new Function('module', 'exports', "var i=Object.defineProperty;var n=Object.getOwnPropertyDescriptor;var o=Object.getOwnPropertyNames;var l=Object.prototype.hasOwnProperty;var c=(r,e)=>{for(var t in e)i(r,t,{get:e[t],enumerable:!0})},m=(r,e,t,a)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let d of o(e))!l.call(r,d)&&d!==t&&i(r,d,{get:()=>e[d],enumerable:!(a=n(e,d))||a.enumerable});return r};var s=r=>m(i({},\"__esModule\",{value:!0}),r);var f={};c(f,{config:()=>u,middleware:()=>w});module.exports=s(f);function w(r){let{request:e,next:t,redirect:a,rewrite:d}=r;return a(\"/hello-edge\")}var u={matcher:[\"/test-middleware\"]};0&&(module.exports={config,middleware});\n");
      loader(module, exports);
      return module.exports || exports;
    })();

    const middlewareFunction = (() => {
      // 优先查找 middleware 导出
      if (__middlewareModule && typeof __middlewareModule.middleware === 'function') {
        return __middlewareModule.middleware;
      }
      // 支持 proxy 导出
      if (__middlewareModule && typeof __middlewareModule.proxy === 'function') {
        return __middlewareModule.proxy;
      }
      // 尝试从 default 导出获取
      if (
        __middlewareModule &&
        __middlewareModule.default &&
        typeof __middlewareModule.default.middleware === 'function'
      ) {
        return __middlewareModule.default.middleware;
      }
      if (
        __middlewareModule &&
        __middlewareModule.default &&
        typeof __middlewareModule.default.proxy === 'function'
      ) {
        return __middlewareModule.default.proxy;
      }
      throw new Error('Middleware bundle did not export a function named "middleware".');
    })();

    function toHeaders(initHeaders) {
      // if (initHeaders instanceof Headers) {
      //   return new Headers(initHeaders);
      // }
      return new Headers(initHeaders ?? {});
    }

    /**
     * ResponseCookies - 用于操作响应 cookies
     */
    class ResponseCookies {
      constructor(headers) {
        this._headers = headers;
      }

      /**
       * 设置 cookie
       * @param {string} name - cookie 名称
       * @param {string|object} value - cookie 值或包含 value 和选项的对象
       * @param {object} options - cookie 选项 (path, domain, maxAge, expires, httpOnly, secure, sameSite)
       */
      set(name, value, options = {}) {
        let cookieValue;
        let cookieOptions = options;

        if (typeof value === 'object' && value !== null && 'value' in value) {
          cookieValue = value.value;
          cookieOptions = { ...value, ...options };
          delete cookieOptions.value;
        } else {
          cookieValue = String(value);
        }

        const parts = [name + '=' + encodeURIComponent(cookieValue)];

        if (cookieOptions.path) {
          parts.push('Path=' + cookieOptions.path);
        }
        if (cookieOptions.domain) {
          parts.push('Domain=' + cookieOptions.domain);
        }
        if (cookieOptions.maxAge !== undefined) {
          parts.push('Max-Age=' + cookieOptions.maxAge);
        }
        if (cookieOptions.expires) {
          const expiresDate = cookieOptions.expires instanceof Date 
            ? cookieOptions.expires 
            : new Date(cookieOptions.expires);
          parts.push('Expires=' + expiresDate.toUTCString());
        }
        if (cookieOptions.httpOnly) {
          parts.push('HttpOnly');
        }
        if (cookieOptions.secure) {
          parts.push('Secure');
        }
        if (cookieOptions.sameSite) {
          parts.push('SameSite=' + cookieOptions.sameSite);
        }

        this._headers.append('Set-Cookie', parts.join('; '));
        return this;
      }

      /**
       * 删除 cookie
       * @param {string} name - cookie 名称
       * @param {object} options - cookie 选项 (path, domain)
       */
      delete(name, options = {}) {
        return this.set(name, '', {
          ...options,
          maxAge: 0,
          expires: new Date(0),
        });
      }

      /**
       * 获取 cookie (从 Set-Cookie 头中解析)
       * @param {string} name - cookie 名称
       */
      get(name) {
        const cookies = this._headers.getSetCookie ? this._headers.getSetCookie() : [];
        for (const cookie of cookies) {
          const [pair] = cookie.split(';');
          const [cookieName, cookieValue] = pair.split('=');
          if (cookieName.trim() === name) {
            return {
              name: cookieName.trim(),
              value: decodeURIComponent(cookieValue || ''),
            };
          }
        }
        return undefined;
      }

      /**
       * 获取所有 cookies
       */
      getAll() {
        const cookies = this._headers.getSetCookie ? this._headers.getSetCookie() : [];
        return cookies.map(cookie => {
          const [pair] = cookie.split(';');
          const [name, value] = pair.split('=');
          return {
            name: name.trim(),
            value: decodeURIComponent(value || ''),
          };
        });
      }

      /**
       * 检查是否存在某个 cookie
       * @param {string} name - cookie 名称
       */
      has(name) {
        return this.get(name) !== undefined;
      }

      /**
       * 清除所有 cookies (通过设置过期)
       */
      clear() {
        const allCookies = this.getAll();
        for (const cookie of allCookies) {
          this.delete(cookie.name);
        }
        return this;
      }
    }

    /**
     * createMiddlewareResponse - 创建增强的 Response 对象，支持 cookies API
     * 使用组合而非继承，避免 Edge 运行时中继承 Response 的兼容性问题
     */
    function createMiddlewareResponse(body, init) {
      const response = new Response(body, init);
      const cookies = new ResponseCookies(response.headers);
      
      // 添加 cookies 属性
      Object.defineProperty(response, 'cookies', {
        value: cookies,
        writable: false,
        enumerable: true,
        configurable: false,
      });
      
      return response;
    }

    // MiddlewareResponse 作为静态工具对象
    // const MiddlewareResponse = {
    //   /**
    //    * 创建新的中间件响应
    //    */
    //   new: (body, init) => createMiddlewareResponse(body, init),
      
    //   /**
    //    * 静态方法：创建 next 响应
    //    */
    //   next: (init) => next(init),
      
    //   /**
    //    * 静态方法：创建 redirect 响应
    //    */
    //   redirect: (url, status = 307) => redirect(url, status),
      
    //   /**
    //    * 静态方法：创建 rewrite 响应
    //    */
    //   rewrite: (url) => rewrite(url),
    // };

    function headersInitToRecord(input) {
      if (!input) {
        return {};
      }
      const record = {};
      const headers = new Headers(input);
      headers.forEach((value, key) => {
        record[key] = value;
      });
      return record;
    }

    function extractRequestHeaderPatch(requestOverrides, fallbackHeaders) {
      const directHeaders = requestOverrides?.headers ? headersInitToRecord(requestOverrides.headers) : null;
      if (directHeaders && Object.keys(directHeaders).length) {
        return directHeaders;
      }
      if (fallbackHeaders) {
        const fallback = headersInitToRecord(fallbackHeaders);
        if (Object.keys(fallback).length) {
          return fallback;
        }
      }
      return null;
    }

    /**
     * next() 函数 - 用于中间件继续执行后续逻辑
     * 返回带有 x-middleware-next 标记的增强响应（支持 cookies API）
     */
    function next(init) {
      const responseInit = init ?? {};
      const { request: requestOverrides, headers: headersOverrides, ...rest } = responseInit;
      const headers = toHeaders(headersOverrides);
      headers.set("x-middleware-next", "1");

      const requestHeadersPatch = extractRequestHeaderPatch(requestOverrides, headersOverrides);
      if (requestHeadersPatch) {
        try {
          headers.set(
            "x-middleware-request-headers",
            encodeURIComponent(JSON.stringify(requestHeadersPatch))
          );
        } catch (serializationError) {
          console.warn('Failed to serialize middleware request headers patch:', serializationError);
        }
      }
      return createMiddlewareResponse(null, {
        ...rest,
        headers,
      });
    }

    function redirect(url, status = 307) {
      return createMiddlewareResponse(null, {
        status,
        headers: {
          Location: url
        }
      });
    }

    function rewrite(url) {
      const headers = new Headers();
      headers.set("x-middleware-rewrite", url);
      return createMiddlewareResponse(null, { headers });
    }

    // 中间件配置
    const middlewareConfig = {"runtime":"edge","matcher":["/test-middleware"],"normalizedMatcher":[{"source":"/test-middleware","regex":"^\\/test-middleware[\\/#\\?]?$"}]};

    /**
     * 执行中间件并返回响应（如果中间件返回了响应）
     * @param {Object} context - 包含 request, urlInfo, env, waitUntil 的上下文
     * @returns {Response|null} 如果中间件返回响应则返回，否则返回 null
     */
    async function executeMiddleware(context) {
      const { request, urlInfo, env, waitUntil } = context;
      const pathname = urlInfo.pathname;
      
      // 检查路径是否匹配 matcher
      const matchers = [{"source":"/test-middleware","regex":"^\\/test-middleware[\\/#\\?]?$"}];
      let shouldExecute = matchers.length === 0; // 如果没有配置 matcher，默认执行
      
      for (const matcher of matchers) {
        if (matchPattern(pathname, matcher)) {
          shouldExecute = true;
          break;
        }
      }
      
      if (!shouldExecute) {
        return null; // 不匹配，继续执行后续函数
      }
      
      try {
        const middlewareContext = {
          request,
          urlInfo,
          env,
          waitUntil,
          next,
          redirect,
          rewrite,
          // MiddlewareResponse,
          geo: request.eo?.geo || {},
          clientIp: request.eo?.clientIp || '',
        };
        
        // 执行中间件
        const result = await middlewareFunction(middlewareContext);
        
        // 如果返回了 Response 对象，直接返回
        if (result && result instanceof Response) {
          return result;
        }
        
        return null; // 继续执行后续函数
      } catch (error) {
        console.error('Middleware error:', error);
        return null; // 出错时继续执行后续函数
      }
    }
    
    /**
     * 匹配路径模式
     * 支持通配符 * 和精确匹配
     */
    function matchPattern(pathname, matcher) {
      if (!matcher) {
        return false;
      }

      if (matcher.regex === '.*') {
        return true;
      }

      try {
        const regex = new RegExp(matcher.regex);
        return regex.test(pathname);
      } catch (_) {
        return pathname === matcher.source;
      }
    }
  

      async function handleRequest(context){
        let routeParams = {};
        let pagesFunctionResponse = null;
        let request = context.request;
        const waitUntil = context.waitUntil;
        let urlInfo = new URL(request.url);
        const eo = request.eo || {};

        const normalizePathname = () => {
          if (urlInfo.pathname !== '/' && urlInfo.pathname.endsWith('/')) {
            urlInfo.pathname = urlInfo.pathname.slice(0, -1);
          }
        };

        function getSuffix(pathname = '') {
          // Use a regular expression to extract the file extension from the URL
          const suffix = pathname.match(/.([^.]+)$/);
          // If an extension is found, return it, otherwise return an empty string
          return suffix ? '.' + suffix[1] : null;
        }

        normalizePathname();

        let matchedFunc = false;

        
        const runEdgeFunctions = () => {
          
          if(!matchedFunc && '/hello-edge' === urlInfo.pathname) {
            matchedFunc = true;
              (() => {
  // edge-functions/hello-edge.js
  function onRequest(context) {
    const { geo } = context;
    return new Response(JSON.stringify({
      message: "Hello Edge!",
      geo
    }), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

        pagesFunctionResponse = onRequest;
      })();
          }
        
        };
      

        
        const runMiddleware = typeof executeMiddleware !== 'undefined' ? executeMiddleware : async function() { return null; };
        let middlewareResponseHeaders = null; // 保存中间件设置的响应头
        const middlewareResponse = await runMiddleware({
          request,
          urlInfo: new URL(urlInfo.toString()),
          env: {"MallocNanoZone":"0","USER":"wenyiqing","COMMAND_MODE":"unix2003","__CFBundleIdentifier":"com.tencent.codebuddycn","PATH":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/Applications/Visual Studio Code.app/Contents/Resources/app/bin","LOGNAME":"wenyiqing","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.BQRor4R2WB/Listeners","HOME":"/Users/wenyiqing","SHELL":"/bin/zsh","TMPDIR":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","XPC_SERVICE_NAME":"0","XPC_FLAGS":"0x0","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","SHLVL":"1","PWD":"/Users/wenyiqing/Desktop/nuxt-project/test","OLDPWD":"/Users/wenyiqing/Desktop/nuxt-project/test","HOMEBREW_PREFIX":"/opt/homebrew","HOMEBREW_CELLAR":"/opt/homebrew/Cellar","HOMEBREW_REPOSITORY":"/opt/homebrew","INFOPATH":"/opt/homebrew/share/info:/opt/homebrew/share/info:","NVM_DIR":"/Users/wenyiqing/.nvm","NVM_CD_FLAGS":"-q","NVM_BIN":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin","NVM_INC":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/include/node","TERM_PROGRAM":"codebuddy","TERM_PROGRAM_VERSION":"1.100.0","LANG":"zh_CN.UTF-8","COLORTERM":"truecolor","NODE_OPTIONS":" --require \"/Users/wenyiqing/Library/Application Support/CodeBuddy CN/User/workspaceStorage/7cd7746eca661992139665a90c171297/ms-vscode.js-debug/bootloader.js\" ","VSCODE_INSPECTOR_OPTIONS":"{\"inspectorIpc\":\"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/node-cdp.87671-264c0858-0.sock.deferred\",\"deferredMode\":true,\"waitForDebugger\":\"\",\"execPath\":\"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node\",\"onlyEntrypoint\":false,\"autoAttachMode\":\"always\",\"openerId\":\"0d392c00b6027e9d6ef2164d\"}","GIT_ASKPASS":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass.sh","VSCODE_GIT_ASKPASS_NODE":"/Applications/CodeBuddy CN.app/Contents/Frameworks/CodeBuddy CN Helper (Plugin).app/Contents/MacOS/CodeBuddy CN Helper (Plugin)","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"","VSCODE_GIT_ASKPASS_MAIN":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass-main.js","VSCODE_GIT_IPC_HANDLE":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/vscode-git-48f7b3ff5a.sock","GK_GL_ADDR":"http://127.0.0.1:51336","GK_GL_PATH":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/gitkraken/gitlens/gitlens-ipc-server-2761-51336.json","VSCODE_INJECTION":"1","ZDOTDIR":"/Users/wenyiqing","USER_ZDOTDIR":"/Users/wenyiqing","TERM":"xterm-256color","VSCODE_PROFILE_INITIALIZED":"1","_":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/edgeone","TEXT_VALUE":"1","SHOPIFY_GRAPHQL_API_URL":"https://graphql.myshopify.com/api/2025-01/graphql.json","SHOPIFY_ACCESS_TOKEN":"ecdc7f91ed0970e733268535c828fbbe","EDGEONE_COLLECT_NUXT_HOOKS":"1"},
          waitUntil
        });

        if (middlewareResponse) {
          const headers = middlewareResponse.headers;
          const hasNext = headers && headers.get('x-middleware-next') === '1';
          const rewriteTarget = headers && headers.get('x-middleware-rewrite');
          const requestHeadersOverride = headers && headers.get('x-middleware-request-headers');
          // Next.js 使用 x-middleware-override-headers 传递需要修改的请求头列表
          const overrideHeadersList = headers && headers.get('x-middleware-override-headers');

          if (rewriteTarget) {
            try {
              const rewrittenUrl = rewriteTarget.startsWith('http://') || rewriteTarget.startsWith('https://')
                ? rewriteTarget
                : new URL(rewriteTarget, urlInfo.origin).toString();
              request = recreateRequest(request, { url: rewrittenUrl });
              urlInfo = new URL(rewrittenUrl);
              normalizePathname();
            } catch (rewriteError) {
              console.error('Middleware rewrite error:', rewriteError);
            }
          }

          // 处理 Next.js 的 x-middleware-override-headers 机制
          if (overrideHeadersList) {
            try {
              const headerPatch = {};
              const overrideKeys = overrideHeadersList.split(',').map(k => k.trim());
              for (const key of overrideKeys) {
                const newValue = headers.get('x-middleware-request-' + key);
                if (newValue !== null) {
                  headerPatch[key] = newValue;
                }
              }
              if (Object.keys(headerPatch).length > 0) {
                request = recreateRequest(request, { headerPatches: headerPatch });
              }
            } catch (overrideError) {
              console.error('Middleware override headers error:', overrideError);
            }
          }
          // 处理旧的 x-middleware-request-headers 机制（兼容）
          else if (requestHeadersOverride) {
            try {
              const decoded = decodeURIComponent(requestHeadersOverride);
              const headerPatch = JSON.parse(decoded);
              request = recreateRequest(request, { headerPatches: headerPatch });
            } catch (requestPatchError) {
              console.error('Middleware request header override error:', requestPatchError);
            }
          }

          if (!hasNext && !rewriteTarget) {
            return middlewareResponse;
          }

          if (hasNext) {
            middlewareResponseHeaders = new Headers();
            const skipHeaders = new Set([
              'x-middleware-next',
              'x-middleware-rewrite',
              'x-middleware-request-headers',
              'x-middleware-override-headers',
              'x-middleware-set-cookie',
              'date',
              'connection',
              'content-length',
              'transfer-encoding',
              'set-cookie', // Set-Cookie 需要特殊处理，避免重复
            ]);
            headers.forEach((value, key) => {
              const lowerKey = key.toLowerCase();
              // 过滤内部使用的 header：skipHeaders 中的 + x-middleware-request-* 前缀的请求头修改标记
              if (!skipHeaders.has(lowerKey) && !lowerKey.startsWith('x-middleware-request-')) {
                middlewareResponseHeaders.set(key, value);
              }
            });
            // 特殊处理 Set-Cookie，可能有多个，使用 getSetCookie 获取完整的 cookie 值
            const setCookies = headers.getSetCookie ? headers.getSetCookie() : [];
            setCookies.forEach(cookie => {
              middlewareResponseHeaders.append('Set-Cookie', cookie);
            });
          }
        }
      
        
        // 走到这里说明：
        // 1. 没有中间件响应（middlewareResponse 为 null/undefined）
        // 2. 或者中间件返回了 next
        // 需要判断是否命中边缘函数

        runEdgeFunctions();

        //没有命中边缘函数，执行回源
        if (!matchedFunc) {
          // 允许压缩的文件后缀白名单
          const ALLOW_COMPRESS_SUFFIXES = [
            '.html', '.htm', '.xml', '.txt', '.text', '.conf', '.def', '.list', '.log', '.in',
            '.css', '.js', '.json', '.rss', '.svg', '.tif', '.tiff', '.rtx', '.htc',
            '.java', '.md', '.markdown', '.ico', '.pl', '.pm', '.cgi', '.pb', '.proto',
            '.xhtml', '.xht', '.ttf', '.otf', '.woff', '.eot', '.wasm', '.binast', '.webmanifest'
          ];
          
          // 检查请求路径是否有允许压缩的后缀
          const pathname = urlInfo.pathname;
          const suffix = getSuffix(pathname);
          const hasCompressibleSuffix = ALLOW_COMPRESS_SUFFIXES.includes(suffix);
          
          // 如果不是可压缩的文件类型，删除 Accept-Encoding 头以禁用 CDN 压缩
          if (!hasCompressibleSuffix) {
              request.headers.delete('accept-encoding');
          }
          
          const originResponse = await fetch(request);
          
          // 如果中间件设置了响应头，合并到回源响应中
          if (middlewareResponseHeaders) {
            const mergedHeaders = new Headers(originResponse.headers);
            // 删除可能导致问题的编码相关头
            mergedHeaders.delete('content-encoding');
            mergedHeaders.delete('content-length');
            middlewareResponseHeaders.forEach((value, key) => {
              if (key.toLowerCase() === 'set-cookie') {
                mergedHeaders.append(key, value);
              } else {
                mergedHeaders.set(key, value);
              }
            });
            return new Response(originResponse.body, {
              status: originResponse.status,
              statusText: originResponse.statusText,
              headers: mergedHeaders,
            });
          }
          
          return originResponse;
        }
        
        // 命中了边缘函数，继续执行边缘函数逻辑

        const params = {};
        if (routeParams.id) {
          if (routeParams.mode === 1) {
            const value = urlInfo.pathname.match(routeParams.left);        
            for (let i = 1; i < value.length; i++) {
              params[routeParams.id[i - 1]] = value[i];
            }
          } else {
            const value = urlInfo.pathname.replace(routeParams.left, '');
            const splitedValue = value.split('/');
            if (splitedValue.length === 1) {
              params[routeParams.id] = splitedValue[0];
            } else {
              params[routeParams.id] = splitedValue;
            }
          }
          
        }
        const edgeFunctionResponse = await pagesFunctionResponse({request, params, env: {"MallocNanoZone":"0","USER":"wenyiqing","COMMAND_MODE":"unix2003","__CFBundleIdentifier":"com.tencent.codebuddycn","PATH":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/Applications/Visual Studio Code.app/Contents/Resources/app/bin","LOGNAME":"wenyiqing","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.BQRor4R2WB/Listeners","HOME":"/Users/wenyiqing","SHELL":"/bin/zsh","TMPDIR":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","XPC_SERVICE_NAME":"0","XPC_FLAGS":"0x0","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","SHLVL":"1","PWD":"/Users/wenyiqing/Desktop/nuxt-project/test","OLDPWD":"/Users/wenyiqing/Desktop/nuxt-project/test","HOMEBREW_PREFIX":"/opt/homebrew","HOMEBREW_CELLAR":"/opt/homebrew/Cellar","HOMEBREW_REPOSITORY":"/opt/homebrew","INFOPATH":"/opt/homebrew/share/info:/opt/homebrew/share/info:","NVM_DIR":"/Users/wenyiqing/.nvm","NVM_CD_FLAGS":"-q","NVM_BIN":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin","NVM_INC":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/include/node","TERM_PROGRAM":"codebuddy","TERM_PROGRAM_VERSION":"1.100.0","LANG":"zh_CN.UTF-8","COLORTERM":"truecolor","NODE_OPTIONS":" --require \"/Users/wenyiqing/Library/Application Support/CodeBuddy CN/User/workspaceStorage/7cd7746eca661992139665a90c171297/ms-vscode.js-debug/bootloader.js\" ","VSCODE_INSPECTOR_OPTIONS":"{\"inspectorIpc\":\"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/node-cdp.87671-264c0858-0.sock.deferred\",\"deferredMode\":true,\"waitForDebugger\":\"\",\"execPath\":\"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node\",\"onlyEntrypoint\":false,\"autoAttachMode\":\"always\",\"openerId\":\"0d392c00b6027e9d6ef2164d\"}","GIT_ASKPASS":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass.sh","VSCODE_GIT_ASKPASS_NODE":"/Applications/CodeBuddy CN.app/Contents/Frameworks/CodeBuddy CN Helper (Plugin).app/Contents/MacOS/CodeBuddy CN Helper (Plugin)","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"","VSCODE_GIT_ASKPASS_MAIN":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass-main.js","VSCODE_GIT_IPC_HANDLE":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/vscode-git-48f7b3ff5a.sock","GK_GL_ADDR":"http://127.0.0.1:51336","GK_GL_PATH":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/gitkraken/gitlens/gitlens-ipc-server-2761-51336.json","VSCODE_INJECTION":"1","ZDOTDIR":"/Users/wenyiqing","USER_ZDOTDIR":"/Users/wenyiqing","TERM":"xterm-256color","VSCODE_PROFILE_INITIALIZED":"1","_":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/edgeone","TEXT_VALUE":"1","SHOPIFY_GRAPHQL_API_URL":"https://graphql.myshopify.com/api/2025-01/graphql.json","SHOPIFY_ACCESS_TOKEN":"ecdc7f91ed0970e733268535c828fbbe","EDGEONE_COLLECT_NUXT_HOOKS":"1"}, waitUntil, eo });
        
        // 如果中间件设置了响应头，合并到边缘函数响应中
        if (middlewareResponseHeaders && edgeFunctionResponse) {
          const mergedHeaders = new Headers(edgeFunctionResponse.headers);
          // 删除可能导致问题的编码相关头
          mergedHeaders.delete('content-encoding');
          mergedHeaders.delete('content-length');
          middlewareResponseHeaders.forEach((value, key) => {
            if (key.toLowerCase() === 'set-cookie') {
              mergedHeaders.append(key, value);
            } else {
              mergedHeaders.set(key, value);
            }
          });
          return new Response(edgeFunctionResponse.body, {
            status: edgeFunctionResponse.status,
            statusText: edgeFunctionResponse.statusText,
            headers: mergedHeaders,
          });
        }
        
        return edgeFunctionResponse;
      }
      addEventListener('fetch', event=>{return event.respondWith(handleRequest({request:event.request,params: {}, env: {"MallocNanoZone":"0","USER":"wenyiqing","COMMAND_MODE":"unix2003","__CFBundleIdentifier":"com.tencent.codebuddycn","PATH":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/Applications/Visual Studio Code.app/Contents/Resources/app/bin","LOGNAME":"wenyiqing","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.BQRor4R2WB/Listeners","HOME":"/Users/wenyiqing","SHELL":"/bin/zsh","TMPDIR":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","XPC_SERVICE_NAME":"0","XPC_FLAGS":"0x0","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","SHLVL":"1","PWD":"/Users/wenyiqing/Desktop/nuxt-project/test","OLDPWD":"/Users/wenyiqing/Desktop/nuxt-project/test","HOMEBREW_PREFIX":"/opt/homebrew","HOMEBREW_CELLAR":"/opt/homebrew/Cellar","HOMEBREW_REPOSITORY":"/opt/homebrew","INFOPATH":"/opt/homebrew/share/info:/opt/homebrew/share/info:","NVM_DIR":"/Users/wenyiqing/.nvm","NVM_CD_FLAGS":"-q","NVM_BIN":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin","NVM_INC":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/include/node","TERM_PROGRAM":"codebuddy","TERM_PROGRAM_VERSION":"1.100.0","LANG":"zh_CN.UTF-8","COLORTERM":"truecolor","NODE_OPTIONS":" --require \"/Users/wenyiqing/Library/Application Support/CodeBuddy CN/User/workspaceStorage/7cd7746eca661992139665a90c171297/ms-vscode.js-debug/bootloader.js\" ","VSCODE_INSPECTOR_OPTIONS":"{\"inspectorIpc\":\"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/node-cdp.87671-264c0858-0.sock.deferred\",\"deferredMode\":true,\"waitForDebugger\":\"\",\"execPath\":\"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node\",\"onlyEntrypoint\":false,\"autoAttachMode\":\"always\",\"openerId\":\"0d392c00b6027e9d6ef2164d\"}","GIT_ASKPASS":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass.sh","VSCODE_GIT_ASKPASS_NODE":"/Applications/CodeBuddy CN.app/Contents/Frameworks/CodeBuddy CN Helper (Plugin).app/Contents/MacOS/CodeBuddy CN Helper (Plugin)","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"","VSCODE_GIT_ASKPASS_MAIN":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass-main.js","VSCODE_GIT_IPC_HANDLE":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/vscode-git-48f7b3ff5a.sock","GK_GL_ADDR":"http://127.0.0.1:51336","GK_GL_PATH":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/gitkraken/gitlens/gitlens-ipc-server-2761-51336.json","VSCODE_INJECTION":"1","ZDOTDIR":"/Users/wenyiqing","USER_ZDOTDIR":"/Users/wenyiqing","TERM":"xterm-256color","VSCODE_PROFILE_INITIALIZED":"1","_":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/edgeone","TEXT_VALUE":"1","SHOPIFY_GRAPHQL_API_URL":"https://graphql.myshopify.com/api/2025-01/graphql.json","SHOPIFY_ACCESS_TOKEN":"ecdc7f91ed0970e733268535c828fbbe","EDGEONE_COLLECT_NUXT_HOOKS":"1"}, waitUntil: event.waitUntil.bind(event) }))});