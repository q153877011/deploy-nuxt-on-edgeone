import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const serverTest = defineEventHandler((event) => {
  return {
    hello: "world"
  };
});

export { serverTest as default };
//# sourceMappingURL=server-test.mjs.map
