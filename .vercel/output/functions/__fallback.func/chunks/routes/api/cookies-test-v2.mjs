import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const cookiesTestV2 = defineEventHandler((event) => {
  const cookies = {
    token: "abc123",
    theme: "dark",
    lang: "zh-CN"
  };
  event.node.res.appendHeader("Set-Cookie", `token=${cookies.token}; Max-Age=604800; Path=/; HttpOnly`);
  event.node.res.appendHeader("Set-Cookie", `theme=${cookies.theme}; Max-Age=604800; Path=/`);
  event.node.res.appendHeader("Set-Cookie", `lang=${cookies.lang}; Max-Age=604800; Path=/`);
  return {
    success: true,
    cookies,
    method: "appendHeader"
  };
});

export { cookiesTestV2 as default };
//# sourceMappingURL=cookies-test-v2.mjs.map
