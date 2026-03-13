import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const runtime = "nodejs";
const serverTest = defineEventHandler((event) => {
  return {
    hello: "node"
  };
});

export { serverTest as default, runtime };
//# sourceMappingURL=server-test.mjs.map
