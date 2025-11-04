import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const cookiesTestV5 = defineEventHandler((event) => {
  const cookies = {
    token: "abc123",
    theme: "dark",
    lang: "zh-CN"
  };
  const response = event.node.res;
  response.setHeader("Set-Cookie", [
    `token=${cookies.token}; Max-Age=604800; Path=/; HttpOnly`,
    `theme=${cookies.theme}; Max-Age=604800; Path=/`,
    `lang=${cookies.lang}; Max-Age=604800; Path=/`
  ]);
  return {
    success: true,
    cookies,
    method: "direct-response-headers"
  };
});

export { cookiesTestV5 as default };
//# sourceMappingURL=cookies-test-v5.mjs.map
