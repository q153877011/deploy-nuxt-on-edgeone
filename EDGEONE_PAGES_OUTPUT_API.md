## EdgeOne Pages Output API（基于 `.edgeone/` 产物的反向工程草案）

> 说明：本文是对你当前仓库中 `.edgeone/` 目录产物的**反向工程**总结，目的在于描述“EdgeOne Pages 的 Output API（部署产物约定）”——类似 Vercel 的 Output API 文档。
>
> - **确定项**：能从文件内容直接证实的结构/字段/行为。
> - **【存疑】**：只能从上下文推断，或存在实现与示例不一致的地方。

---

## 1. 产物根目录约定（`.edgeone/`）

从当前产物看，EdgeOne Pages 的“输出目录”是一个可部署单元，核心由以下部分组成：

- **`assets/`**：静态资源根目录（站点静态文件、Nuxt client 产物、预渲染页面等）。
- **`server-handler/`**：SSR/动态请求处理（Nitro `node-server` preset 的适配层 + Nitro bundle）。
- **`edge-functions/`**：边缘函数（Edge Runtime）bundle + 路由 meta。
- **`node-functions/`**：Node 运行时函数（SCF/Node Runtime）bundle + 路由 meta。
- **`meta.json`**：全站级路由/静态判定/函数路由/中间件配置聚合。
- **`nitro.json`**：Nitro 构建元信息（框架版本、preset、预览命令等）。

与 Vercel Output API 的类比（仅为帮助理解）：

- **`assets/`** ≈ `.vercel/output/static/`
- **`server-handler/`** ≈ `.vercel/output/functions/<ssr>/`（但这里是一个“server-handler”目录而非函数目录）
- **`meta.json`** ≈ `.vercel/output/config.json`（用途相似：描述路由/资源归属；字段体系不同）

【存疑】：EdgeOne Pages 是否要求 `.edgeone/` 作为固定目录名，或仅是该 Nuxt 适配插件的默认输出目录；这需要平台/插件文档佐证。

---

## 2. Nitro/框架构建元信息（`nitro.json`）

当前 `nitro.json` 内容：

- **`preset`**：`node-server`
- **`framework`**：`nuxt@4.1.3`
- **`versions.nitro`**：`2.13.0`
- **`commands.preview`**：`node server-handler/index.mjs`

推导出的行为：

- **预览命令**：大概率需要在 `.edgeone/` 目录下执行（即 `cd .edgeone` 后运行），因为命令是相对路径。
- **运行模型**：并非传统“纯静态”，而是存在一个 Node 侧的 SSR handler（见 `server-handler/`）。

---

## 3. 全站路由与资源归属（`meta.json`）

`meta.json` 当前包含：

- **`conf`**：站点级规则集合
  - **`headers`**：数组，当前为空。
  - **`redirects`**：数组，当前为空。
  - **`rewrites`**：数组，当前为空。
  - **`caches`**：数组，当前为空。
  - **`has404`**：布尔值（`false`）。
  - **`ssr404`**：布尔值（`true`）。
- **`frameworkRoutes`**：由框架输出的路由归类（当前使用正则）
  - 典型模式：`/_nuxt/.*`、`/about(?:$|/_payload\.json)` 等标记 `isStatic: true`。
- **`nodeFunctionsRoutes`**：Node Functions 路由声明
- **`edgeFunctionsRoutes`**：Edge Functions 路由声明
- **`middleware`**：中间件声明
  - **`runtime`**：`edge`
  - **`matcher`**：`[{"source":"/api/time"}]`

### 3.1 函数路由记录结构（`nodeFunctionsRoutes` / `edgeFunctionsRoutes`）

每条记录形态为：

- **`routePath`**：对外暴露路径（例如 `/hello-node`、`/hello-edge`）
- **`mountPath`**：挂载点（当前为 `/`）
- **`method`**：允许的方法列表（GET/POST/PUT/DELETE/PATCH/HEAD/OPTIONS）
- **`module`**：模块引用数组（形如 `"node-functions/hello-node.js:onRequest"`）

【存疑】：`module` 字符串看起来像“源文件路径 + 导出名”的逻辑引用，但在你的产物里并不存在对应的 `hello-node.js` / `hello-edge.js` 实体文件；它更像是构建器用于生成 bundle 的元数据引用（bundle 内部会内联一个 `// node-functions/hello-node.js` 的片段）。

---

## 4. 静态资源输出（`assets/`）

从目录与 `frameworkRoutes` 可确认：

- **`assets/_nuxt/`**：Nuxt 客户端构建产物（JS/CSS/`builds/latest.json` 等）。
- **预渲染页面目录**：例如 `assets/about/index.html`、`assets/test-ssg/index.html`、`assets/test/:id/index.html`，并伴随 `/_payload.json`。
- **根静态文件**：`assets/robots.txt`、`assets/favicon.ico`、`assets/avator.jpg` 等。

静态资源的服务方式有两层：

- **平台层**（推断）：根据 `meta.json.frameworkRoutes` 将某些请求直接判定为静态命中。
- **SSR handler 层**（确定）：`server-handler/handler.js` 在处理动态请求前会先尝试从 `../assets` 读取静态文件并返回（仅 `GET`）。

---

## 5. SSR/动态处理输出（`server-handler/`）

### 5.1 入口与启动方式

- **入口**：`server-handler/index.mjs`
- **启动**：内部调用 `createFrameworkServer(handler)`，在 `localhost:9000` 启动一个 Node HTTP server。

这意味着：

- 平台可能以“可执行的 Node 服务”方式运行 SSR（而非把 SSR 逻辑当作单个函数入口）。
- `nitro.json.commands.preview` 也指向这一入口。

### 5.2 SSR handler 的核心契约（`server-handler/handler.js`）

确定行为：

- **静态优先**：对 `GET` 请求先查 `assets/`，命中则直接返回文件内容。
- **IPX 路径处理**：对 `/_ipx/...` 形式的路径进行解析并返回 `302` 跳转到推导出的原始资源路径（用于 `@nuxt/image` 的 IPX 兼容）。
- **Nitro 加载**：懒加载 `./chunks/nitro/nitro.mjs`，通过 `app.localCall({ url, method, headers, body })` 走 Nitro 内部处理。
- **Headers 处理**：特殊处理多值 `set-cookie`，避免丢失多个 cookie。

### 5.3 EdgeOne 内部头（从 `server-handler/bootstrap.js` 观察）

`bootstrap.js` 里出现了多组“平台内置 header”约定（用于日志/状态/调试）：

- **`functions-request-id`**：请求链路 ID（来自 `x-scf-request-id` 或已有 header）。
- **`eo-pages-inner-scf-status`**：看起来用于把真实 HTTP status 传回平台。
- **`eo-pages-inner-status-intercept`**：看起来用于标记是否需要平台拦截状态处理。
- **`eo-pages-host`**：用于还原生产环境的真实 host。

【存疑】：这些 header 的最终消费者是 EdgeOne Pages 的网关还是 SCF 运行时；以及它们对缓存/日志/错误页的具体影响，需要平台文档确认。

### 5.4 SSR 404 行为

- `meta.json.conf.ssr404 = true`
- `server-handler/meta.json.conf.ssr404 = true`

推断：

- 平台更倾向于把“404 是否由 SSR 决定”交给 SSR handler（而非纯静态 404）。

---

## 6. Node Functions 输出（`node-functions/`）

### 6.1 路由声明（`node-functions/meta.json`）

- 结构与 `meta.json.nodeFunctionsRoutes` 一致。

### 6.2 运行时入口与导出约定（从 `node-functions/index.mjs` 反推）

在 `/hello-node` 的内联示例里，构建器会把用户函数包装成可选导出集合：

- **通用入口**：`onRequest(context)`
- **方法分发入口**（可选）：`onRequestGet` / `onRequestPost` / `onRequestPut` / `onRequestDelete` / `onRequestPatch` / `onRequestHead` / `onRequestOptions`

当请求到达时，运行时按 HTTP method 优先选择对应的 `onRequestXxx`，否则回退 `onRequest`。

### 6.3 Node Functions 的 `context` 形态（确定）

从 bundle 中可直接看到 `context` 会包含：

- **`request`**：一个“EdgeOne 兼容”的 `Request`（由 `createEdgeoneCompatibleRequest(req, ...)` 构造）。
- **`env`**：环境变量集合（来自运行时注入 + 可能的构建期注入，见安全注意事项）。
- **`params`**：路由参数对象（当前示例为空对象）。
- **`uuid`**：来自 `eo-log-uuid` header（用于日志/追踪）。
- **`server.region` / `server.requestId`**：来自 `x-scf-region` 与 `x-scf-request-id`。
- **`clientIp`**：来自 `eo-connecting-ip`。
- **`geo`**：从 `eo-connecting-geo` 解析并规范化后的地理信息（例如 `countryName`、`regionName`、`latitude` 等）。

---

## 7. Edge Functions 输出（`edge-functions/`）

### 7.1 路由声明（`edge-functions/meta.json`）

- 结构与 `meta.json.edgeFunctionsRoutes` 一致。
- 目前只看到 `onRequest` 这一类入口（未看到 `onRequestGet` 等方法分发导出）。

### 7.2 运行时模型（从 `edge-functions/index.js` 反推）

`edge-functions/index.js` 采用典型的 Edge Runtime 模型：

- 通过 `addEventListener('fetch', ...)` 注册 fetch 事件。
- 内置了一个路由匹配器：
  - 命中某条边缘函数路由时，执行对应的 `onRequest`。
  - 未命中时，`fetch(request)` 回源（即交给后续链路/源站）。

### 7.3 中间件（Edge Middleware）语义（确定）

在你的产物中，中间件配置来自 `meta.json.middleware` 与 `edge-functions/meta.json.middleware`，并在 bundle 内实现了类似 Next.js middleware 的协议：

- **`config.matcher`**：声明哪些路径需要执行中间件（示例为 `/api/time`）。
- 中间件执行可返回：
  - **`next()`**：返回带 `x-middleware-next: 1` 的 Response，表示继续后续处理。
  - **`redirect(url, status?)`**：返回 30x 响应。
  - **`rewrite(url)`**：通过 `x-middleware-rewrite` 指示重写请求。
  - **请求头 patch**：通过 `x-middleware-request-headers` 传递要覆盖/增删的请求头集合（JSON 序列化后再 URL encode）。

执行顺序（按 bundle 逻辑）：

1. 对匹配路径先执行 middleware。
2. 若 middleware 返回非 `next()` 且不携带 rewrite 指令，则直接结束并返回该响应。
3. 若 middleware 指示 rewrite/patch，则会重建 `Request` 并继续匹配边缘函数。
4. 未命中边缘函数则回源 `fetch(request)`。

---

## 8. ISR（增量静态再生）信息（`server-handler/meta.json`）

在 `server-handler/meta.json.frameworkRoutes` 中出现：

- `{"path":"/test-isr","isStatic":false,"isr":5}`

推断：

- **`isr`** 字段单位应为秒，代表 revalidate 间隔（例如 5 秒）。

【存疑】：

- ISR 的缓存存储位置与一致性策略（边缘缓存/源站缓存/平台 KV 等）。
- 触发 revalidate 的方式（后台刷新/请求触发/定时任务）。

---

## 9. `edgeone.json` 与“动态路由扩展”（根目录）

你仓库根目录 `edgeone.json` 目前包含：

- `routesExtend.dynamic = ["/icon/avator2.jpg"]`

推断：

- 这可能用于“强制把某些路径按动态路由处理”，避免被静态路由规则误判。

【存疑】：

- `routesExtend.dynamic` 的完整语义、支持的字段、优先级（相对 `routeRules`、`nitro` 配置、`meta.json.frameworkRoutes` 等）。

---

## 10. 安全/隐私注意事项（强烈建议关注）

从 `edge-functions/index.js` 的实际内容可以看到：bundle 内出现了一个被内联的 `env` 对象（包含构建机/运行时环境变量）。

- **风险**：如果构建环境里存在敏感变量（例如访问令牌、私钥、第三方 API key），它们可能会被直接打包进产物并随部署泄露。
- **建议**：
  - 检查构建链路是否把 `process.env` 全量注入到了边缘 bundle。
  - 对敏感变量采用平台运行时注入（而不是构建期替换）。
  - 对 `.edgeone/` 产物做一次敏感信息扫描后再上传（例如查找常见 token 前缀、密钥格式）。

【存疑】：这是否仅发生在你本地调试/某个构建模式；但因为产物中已出现该模式，仍建议当作高风险点处理。

---

## 11. 最小“Output API”总结（你当前产物可复现的约定）

如果把它抽象成一个“部署协议”，你现在的 `.edgeone/` 至少满足：

- **静态文件**：放在 `assets/`，路径即 URL 路径。
- **SSR**：由 `server-handler/index.mjs` 启动服务，核心逻辑在 `server-handler/handler.js`，调用 Nitro bundle。
- **Edge Functions**：由 `edge-functions/index.js` 提供 fetch 事件入口；路由与 middleware 来自 `meta.json`/`edge-functions/meta.json`。
- **Node Functions**：由 `node-functions/index.mjs` 提供 Node 侧入口；路由来自 `meta.json`/`node-functions/meta.json`，支持方法分发导出。
- **全局路由 meta**：由 `meta.json` 聚合声明静态路由、函数路由、中间件与站点级规则。

---

## 12. 开放问题清单（需要平台/插件文档确认）

- **【存疑】`meta.json.conf.headers/redirects/rewrites/caches` 的精确 schema**：字段名、支持的匹配规则、优先级、是否支持正则等。
- **【存疑】Edge Functions 的 `context` 字段**：bundle 内 `onRequest` 示例读取 `geo`，但调用点未显式传入 `geo`；到底由运行时补齐还是示例遗留？
- **【存疑】SSR handler 的部署形态**：平台是启动 Node server 常驻，还是把它包装成某种函数/容器执行。
- **【存疑】`edgeone.json.routesExtend` 的完整能力**：可配置项范围、与路由 meta 的合并策略。

---

## 附：你这份产物中可定位的关键文件

- `.edgeone/meta.json`
- `.edgeone/nitro.json`
- `.edgeone/assets/`
- `.edgeone/server-handler/index.mjs`
- `.edgeone/server-handler/handler.js`
- `.edgeone/server-handler/bootstrap.js`
- `.edgeone/server-handler/meta.json`
- `.edgeone/edge-functions/index.js` / `.edgeone/edge-functions/meta.json`
- `.edgeone/node-functions/index.mjs` / `.edgeone/node-functions/meta.json`
