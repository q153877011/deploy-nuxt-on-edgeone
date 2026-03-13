import { d as defineEventHandler, a as setHeader, g as getQuery } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const stream = defineEventHandler(async (event) => {
  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache");
  setHeader(event, "Connection", "keep-alive");
  setHeader(event, "X-Accel-Buffering", "no");
  const query = getQuery(event);
  const message = query.message || "\u8FD9\u662F\u4E00\u6761\u6D41\u5F0F\u6D88\u606F";
  const count = parseInt(query.count || "10", 10);
  const delay = parseInt(query.delay || "1000", 10);
  return new ReadableStream({
    async start(controller) {
      try {
        for (let i = 1; i <= count; i++) {
          const data = {
            index: i,
            message: `${message} - \u7B2C ${i} \u6761`,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            timestampZh: (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", {
              timeZone: "Asia/Shanghai"
            }),
            progress: Math.round(i / count * 100)
          };
          const sseData = `data: ${JSON.stringify(data)}

`;
          controller.enqueue(new TextEncoder().encode(sseData));
          if (i < count) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
        const endData = `data: ${JSON.stringify({ type: "done", message: "\u6D41\u5F0F\u4F20\u8F93\u5B8C\u6210" })}

`;
        controller.enqueue(new TextEncoder().encode(endData));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    }
  });
});

export { stream as default };
//# sourceMappingURL=stream.mjs.map
