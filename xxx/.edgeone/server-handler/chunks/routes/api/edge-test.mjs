import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const runtime = "edge";
const edgeTest = defineEventHandler((event) => {
  return {
    hello: "edge"
  };
});

export { edgeTest as default, runtime };
//# sourceMappingURL=edge-test.mjs.map
