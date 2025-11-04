import { d as defineEventHandler, a as setCookie } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const cookiesTestV6 = defineEventHandler((event) => {
  const cookies = {
    token: "abc123",
    theme: "dark",
    lang: "zh-CN"
  };
  setCookie(event, "token", cookies.token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  const existingCookies = event.node.res.getHeader("Set-Cookie") || [];
  const newCookies = Array.isArray(existingCookies) ? [...existingCookies, `theme=${cookies.theme}; Max-Age=604800; Path=/`] : [existingCookies, `theme=${cookies.theme}; Max-Age=604800; Path=/`];
  event.node.res.setHeader("Set-Cookie", newCookies);
  setCookie(event, "lang", cookies.lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return {
    success: true,
    cookies,
    method: "mixed-approaches"
  };
});

export { cookiesTestV6 as default };
//# sourceMappingURL=cookies-test-v6.mjs.map
