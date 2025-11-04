import { d as defineEventHandler, s as setHeader } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const cookiesTestV3 = defineEventHandler((event) => {
  const cookies = {
    token: "abc123",
    theme: "dark",
    lang: "zh-CN"
  };
  const cookieString = [
    `token=${cookies.token}; Max-Age=604800; Path=/; HttpOnly`,
    `theme=${cookies.theme}; Max-Age=604800; Path=/`,
    `lang=${cookies.lang}; Max-Age=604800; Path=/`
  ].join(", ");
  setHeader(event, "Set-Cookie", cookieString);
  return {
    success: true,
    cookies,
    method: "setHeader-manual"
  };
});

export { cookiesTestV3 as default };
//# sourceMappingURL=cookies-test-v3.mjs.map
