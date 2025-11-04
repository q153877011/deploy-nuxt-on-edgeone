import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const time = defineEventHandler(async (event) => {
  const now = /* @__PURE__ */ new Date();
  const randomId = Math.floor(Math.random() * 1e4);
  return {
    localTime: now.toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }),
    seconds: now.getSeconds(),
    randomId,
    generatedAt: now.toISOString(),
    timestamp: now.getTime(),
    timezone: "Asia/Shanghai"
  };
});

export { time as default };
//# sourceMappingURL=time.mjs.map
