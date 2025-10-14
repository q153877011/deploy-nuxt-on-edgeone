import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const test2 = defineEventHandler((event) => {
  return {
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
});

export { test2 as default };
//# sourceMappingURL=test2.mjs.map
