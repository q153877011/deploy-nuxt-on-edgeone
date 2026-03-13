
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

      
      async function executeMiddleware(context) {
        return null; // 没有中间件，继续执行后续函数
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
          env: {"NVM_INC":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/include/node","TERM_PROGRAM":"codebuddy","NODE":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node","NVM_CD_FLAGS":"-q","INIT_CWD":"/Users/wenyiqing/Desktop/nuxt-project/test","SHELL":"/bin/zsh","TERM":"xterm-256color","TMPDIR":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/","HOMEBREW_REPOSITORY":"/opt/homebrew","npm_config_global_prefix":"/Users/wenyiqing/.nvm/versions/node/v22.21.1","TERM_PROGRAM_VERSION":"1.100.0","NODE_OPTIONS":" --require \"/Users/wenyiqing/Library/Application Support/CodeBuddy CN/User/workspaceStorage/7cd7746eca661992139665a90c171297/ms-vscode.js-debug/bootloader.js\" ","MallocNanoZone":"0","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","ZDOTDIR":"/Users/wenyiqing","COLOR":"1","npm_config_registry":"https://mirrors.tencent.com/npm/","npm_config_noproxy":"","npm_config_local_prefix":"/Users/wenyiqing/Desktop/nuxt-project/test","USER":"wenyiqing","NVM_DIR":"/Users/wenyiqing/.nvm","COMMAND_MODE":"unix2003","npm_config_globalconfig":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/etc/npmrc","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.BQRor4R2WB/Listeners","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","VSCODE_PROFILE_INITIALIZED":"1","npm_execpath":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/lib/node_modules/npm/bin/npm-cli.js","PATH":"/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.bin:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.bin:/Users/wenyiqing/Desktop/nuxt-project/node_modules/.bin:/Users/wenyiqing/Desktop/node_modules/.bin:/Users/wenyiqing/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/Applications/Visual Studio Code.app/Contents/Resources/app/bin","VSCODE_INSPECTOR_OPTIONS":"{\"inspectorIpc\":\"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/node-cdp.87671-264c0858-0.sock.deferred\",\"deferredMode\":true,\"waitForDebugger\":\"\",\"execPath\":\"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node\",\"onlyEntrypoint\":false,\"autoAttachMode\":\"always\",\"openerId\":\"1de5bcf18a31f8ac76bc2f81\"}","npm_package_json":"/Users/wenyiqing/Desktop/nuxt-project/test/package.json","__CFBundleIdentifier":"com.tencent.codebuddycn","USER_ZDOTDIR":"/Users/wenyiqing","npm_config_init_module":"/Users/wenyiqing/.npm-init.js","npm_config_userconfig":"/Users/wenyiqing/.npmrc","PWD":"/Users/wenyiqing/Desktop/nuxt-project/test","npm_command":"exec","EDITOR":"vi","npm_lifecycle_event":"npx","LANG":"zh_CN.UTF-8","npm_package_name":"test","NODE_PATH":"/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/edgeone@1.2.29_@edge-runtime+vm@3.2.0_@opentelemetry+api@1.9.0_@types+debug@4.1.12_@typ_a0f5240767199d75dea045b1770dcc07/node_modules/edgeone/edgeone-bin/node_modules:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/edgeone@1.2.29_@edge-runtime+vm@3.2.0_@opentelemetry+api@1.9.0_@types+debug@4.1.12_@typ_a0f5240767199d75dea045b1770dcc07/node_modules/edgeone/node_modules:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/edgeone@1.2.29_@edge-runtime+vm@3.2.0_@opentelemetry+api@1.9.0_@types+debug@4.1.12_@typ_a0f5240767199d75dea045b1770dcc07/node_modules:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/node_modules","XPC_FLAGS":"0x0","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"","npm_config_npm_version":"10.9.4","npm_config_node_gyp":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js","XPC_SERVICE_NAME":"0","VSCODE_INJECTION":"1","HOME":"/Users/wenyiqing","SHLVL":"2","VSCODE_GIT_ASKPASS_MAIN":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass-main.js","HOMEBREW_PREFIX":"/opt/homebrew","GK_GL_ADDR":"http://127.0.0.1:51336","LOGNAME":"wenyiqing","npm_config_cache":"/Users/wenyiqing/.npm","npm_lifecycle_script":"edgeone","VSCODE_GIT_IPC_HANDLE":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/vscode-git-48f7b3ff5a.sock","GK_GL_PATH":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/gitkraken/gitlens/gitlens-ipc-server-2761-51336.json","NVM_BIN":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin","npm_config_user_agent":"npm/10.9.4 node/v22.21.1 darwin arm64 workspaces/false","HOMEBREW_CELLAR":"/opt/homebrew/Cellar","INFOPATH":"/opt/homebrew/share/info:/opt/homebrew/share/info:","GIT_ASKPASS":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass.sh","VSCODE_GIT_ASKPASS_NODE":"/Applications/CodeBuddy CN.app/Contents/Frameworks/CodeBuddy CN Helper (Plugin).app/Contents/MacOS/CodeBuddy CN Helper (Plugin)","COLORTERM":"truecolor","npm_config_prefix":"/Users/wenyiqing/.nvm/versions/node/v22.21.1","npm_node_execpath":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node","TEXT_VALUE":"1","SHOPIFY_GRAPHQL_API_URL":"https://graphql.myshopify.com/api/2025-01/graphql.json","SHOPIFY_ACCESS_TOKEN":"ecdc7f91ed0970e733268535c828fbbe","EDGEONE_COLLECT_NUXT_HOOKS":"1"},
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
        const edgeFunctionResponse = await pagesFunctionResponse({request, params, env: {"NVM_INC":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/include/node","TERM_PROGRAM":"codebuddy","NODE":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node","NVM_CD_FLAGS":"-q","INIT_CWD":"/Users/wenyiqing/Desktop/nuxt-project/test","SHELL":"/bin/zsh","TERM":"xterm-256color","TMPDIR":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/","HOMEBREW_REPOSITORY":"/opt/homebrew","npm_config_global_prefix":"/Users/wenyiqing/.nvm/versions/node/v22.21.1","TERM_PROGRAM_VERSION":"1.100.0","NODE_OPTIONS":" --require \"/Users/wenyiqing/Library/Application Support/CodeBuddy CN/User/workspaceStorage/7cd7746eca661992139665a90c171297/ms-vscode.js-debug/bootloader.js\" ","MallocNanoZone":"0","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","ZDOTDIR":"/Users/wenyiqing","COLOR":"1","npm_config_registry":"https://mirrors.tencent.com/npm/","npm_config_noproxy":"","npm_config_local_prefix":"/Users/wenyiqing/Desktop/nuxt-project/test","USER":"wenyiqing","NVM_DIR":"/Users/wenyiqing/.nvm","COMMAND_MODE":"unix2003","npm_config_globalconfig":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/etc/npmrc","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.BQRor4R2WB/Listeners","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","VSCODE_PROFILE_INITIALIZED":"1","npm_execpath":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/lib/node_modules/npm/bin/npm-cli.js","PATH":"/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.bin:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.bin:/Users/wenyiqing/Desktop/nuxt-project/node_modules/.bin:/Users/wenyiqing/Desktop/node_modules/.bin:/Users/wenyiqing/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/Applications/Visual Studio Code.app/Contents/Resources/app/bin","VSCODE_INSPECTOR_OPTIONS":"{\"inspectorIpc\":\"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/node-cdp.87671-264c0858-0.sock.deferred\",\"deferredMode\":true,\"waitForDebugger\":\"\",\"execPath\":\"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node\",\"onlyEntrypoint\":false,\"autoAttachMode\":\"always\",\"openerId\":\"1de5bcf18a31f8ac76bc2f81\"}","npm_package_json":"/Users/wenyiqing/Desktop/nuxt-project/test/package.json","__CFBundleIdentifier":"com.tencent.codebuddycn","USER_ZDOTDIR":"/Users/wenyiqing","npm_config_init_module":"/Users/wenyiqing/.npm-init.js","npm_config_userconfig":"/Users/wenyiqing/.npmrc","PWD":"/Users/wenyiqing/Desktop/nuxt-project/test","npm_command":"exec","EDITOR":"vi","npm_lifecycle_event":"npx","LANG":"zh_CN.UTF-8","npm_package_name":"test","NODE_PATH":"/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/edgeone@1.2.29_@edge-runtime+vm@3.2.0_@opentelemetry+api@1.9.0_@types+debug@4.1.12_@typ_a0f5240767199d75dea045b1770dcc07/node_modules/edgeone/edgeone-bin/node_modules:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/edgeone@1.2.29_@edge-runtime+vm@3.2.0_@opentelemetry+api@1.9.0_@types+debug@4.1.12_@typ_a0f5240767199d75dea045b1770dcc07/node_modules/edgeone/node_modules:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/edgeone@1.2.29_@edge-runtime+vm@3.2.0_@opentelemetry+api@1.9.0_@types+debug@4.1.12_@typ_a0f5240767199d75dea045b1770dcc07/node_modules:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/node_modules","XPC_FLAGS":"0x0","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"","npm_config_npm_version":"10.9.4","npm_config_node_gyp":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js","XPC_SERVICE_NAME":"0","VSCODE_INJECTION":"1","HOME":"/Users/wenyiqing","SHLVL":"2","VSCODE_GIT_ASKPASS_MAIN":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass-main.js","HOMEBREW_PREFIX":"/opt/homebrew","GK_GL_ADDR":"http://127.0.0.1:51336","LOGNAME":"wenyiqing","npm_config_cache":"/Users/wenyiqing/.npm","npm_lifecycle_script":"edgeone","VSCODE_GIT_IPC_HANDLE":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/vscode-git-48f7b3ff5a.sock","GK_GL_PATH":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/gitkraken/gitlens/gitlens-ipc-server-2761-51336.json","NVM_BIN":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin","npm_config_user_agent":"npm/10.9.4 node/v22.21.1 darwin arm64 workspaces/false","HOMEBREW_CELLAR":"/opt/homebrew/Cellar","INFOPATH":"/opt/homebrew/share/info:/opt/homebrew/share/info:","GIT_ASKPASS":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass.sh","VSCODE_GIT_ASKPASS_NODE":"/Applications/CodeBuddy CN.app/Contents/Frameworks/CodeBuddy CN Helper (Plugin).app/Contents/MacOS/CodeBuddy CN Helper (Plugin)","COLORTERM":"truecolor","npm_config_prefix":"/Users/wenyiqing/.nvm/versions/node/v22.21.1","npm_node_execpath":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node","TEXT_VALUE":"1","SHOPIFY_GRAPHQL_API_URL":"https://graphql.myshopify.com/api/2025-01/graphql.json","SHOPIFY_ACCESS_TOKEN":"ecdc7f91ed0970e733268535c828fbbe","EDGEONE_COLLECT_NUXT_HOOKS":"1"}, waitUntil, eo });
        
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
      addEventListener('fetch', event=>{return event.respondWith(handleRequest({request:event.request,params: {}, env: {"NVM_INC":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/include/node","TERM_PROGRAM":"codebuddy","NODE":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node","NVM_CD_FLAGS":"-q","INIT_CWD":"/Users/wenyiqing/Desktop/nuxt-project/test","SHELL":"/bin/zsh","TERM":"xterm-256color","TMPDIR":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/","HOMEBREW_REPOSITORY":"/opt/homebrew","npm_config_global_prefix":"/Users/wenyiqing/.nvm/versions/node/v22.21.1","TERM_PROGRAM_VERSION":"1.100.0","NODE_OPTIONS":" --require \"/Users/wenyiqing/Library/Application Support/CodeBuddy CN/User/workspaceStorage/7cd7746eca661992139665a90c171297/ms-vscode.js-debug/bootloader.js\" ","MallocNanoZone":"0","ORIGINAL_XDG_CURRENT_DESKTOP":"undefined","ZDOTDIR":"/Users/wenyiqing","COLOR":"1","npm_config_registry":"https://mirrors.tencent.com/npm/","npm_config_noproxy":"","npm_config_local_prefix":"/Users/wenyiqing/Desktop/nuxt-project/test","USER":"wenyiqing","NVM_DIR":"/Users/wenyiqing/.nvm","COMMAND_MODE":"unix2003","npm_config_globalconfig":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/etc/npmrc","SSH_AUTH_SOCK":"/private/tmp/com.apple.launchd.BQRor4R2WB/Listeners","__CF_USER_TEXT_ENCODING":"0x1F5:0x19:0x34","VSCODE_PROFILE_INITIALIZED":"1","npm_execpath":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/lib/node_modules/npm/bin/npm-cli.js","PATH":"/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.bin:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.bin:/Users/wenyiqing/Desktop/nuxt-project/node_modules/.bin:/Users/wenyiqing/Desktop/node_modules/.bin:/Users/wenyiqing/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin:/Users/wenyiqing/.npm-global/bin:/Users/wenyiqing/.codebuddy/bin:/Users/wenyiqing/Tools/node/node-v23.9.0-darwin-arm64/bin:/Users/wenyiqing/Tools/dotnet:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:/Applications/Visual Studio Code.app/Contents/Resources/app/bin","VSCODE_INSPECTOR_OPTIONS":"{\"inspectorIpc\":\"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/node-cdp.87671-264c0858-0.sock.deferred\",\"deferredMode\":true,\"waitForDebugger\":\"\",\"execPath\":\"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node\",\"onlyEntrypoint\":false,\"autoAttachMode\":\"always\",\"openerId\":\"1de5bcf18a31f8ac76bc2f81\"}","npm_package_json":"/Users/wenyiqing/Desktop/nuxt-project/test/package.json","__CFBundleIdentifier":"com.tencent.codebuddycn","USER_ZDOTDIR":"/Users/wenyiqing","npm_config_init_module":"/Users/wenyiqing/.npm-init.js","npm_config_userconfig":"/Users/wenyiqing/.npmrc","PWD":"/Users/wenyiqing/Desktop/nuxt-project/test","npm_command":"exec","EDITOR":"vi","npm_lifecycle_event":"npx","LANG":"zh_CN.UTF-8","npm_package_name":"test","NODE_PATH":"/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/edgeone@1.2.29_@edge-runtime+vm@3.2.0_@opentelemetry+api@1.9.0_@types+debug@4.1.12_@typ_a0f5240767199d75dea045b1770dcc07/node_modules/edgeone/edgeone-bin/node_modules:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/edgeone@1.2.29_@edge-runtime+vm@3.2.0_@opentelemetry+api@1.9.0_@types+debug@4.1.12_@typ_a0f5240767199d75dea045b1770dcc07/node_modules/edgeone/node_modules:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/edgeone@1.2.29_@edge-runtime+vm@3.2.0_@opentelemetry+api@1.9.0_@types+debug@4.1.12_@typ_a0f5240767199d75dea045b1770dcc07/node_modules:/Users/wenyiqing/Desktop/nuxt-project/test/node_modules/.pnpm/node_modules","XPC_FLAGS":"0x0","VSCODE_GIT_ASKPASS_EXTRA_ARGS":"","npm_config_npm_version":"10.9.4","npm_config_node_gyp":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js","XPC_SERVICE_NAME":"0","VSCODE_INJECTION":"1","HOME":"/Users/wenyiqing","SHLVL":"2","VSCODE_GIT_ASKPASS_MAIN":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass-main.js","HOMEBREW_PREFIX":"/opt/homebrew","GK_GL_ADDR":"http://127.0.0.1:51336","LOGNAME":"wenyiqing","npm_config_cache":"/Users/wenyiqing/.npm","npm_lifecycle_script":"edgeone","VSCODE_GIT_IPC_HANDLE":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/vscode-git-48f7b3ff5a.sock","GK_GL_PATH":"/var/folders/bm/0x5xcgvs79n98lfrtj1sqyz40000gn/T/gitkraken/gitlens/gitlens-ipc-server-2761-51336.json","NVM_BIN":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin","npm_config_user_agent":"npm/10.9.4 node/v22.21.1 darwin arm64 workspaces/false","HOMEBREW_CELLAR":"/opt/homebrew/Cellar","INFOPATH":"/opt/homebrew/share/info:/opt/homebrew/share/info:","GIT_ASKPASS":"/Applications/CodeBuddy CN.app/Contents/Resources/app/extensions/git/dist/askpass.sh","VSCODE_GIT_ASKPASS_NODE":"/Applications/CodeBuddy CN.app/Contents/Frameworks/CodeBuddy CN Helper (Plugin).app/Contents/MacOS/CodeBuddy CN Helper (Plugin)","COLORTERM":"truecolor","npm_config_prefix":"/Users/wenyiqing/.nvm/versions/node/v22.21.1","npm_node_execpath":"/Users/wenyiqing/.nvm/versions/node/v22.21.1/bin/node","TEXT_VALUE":"1","SHOPIFY_GRAPHQL_API_URL":"https://graphql.myshopify.com/api/2025-01/graphql.json","SHOPIFY_ACCESS_TOKEN":"ecdc7f91ed0970e733268535c828fbbe","EDGEONE_COLLECT_NUXT_HOOKS":"1"}, waitUntil: event.waitUntil }))});