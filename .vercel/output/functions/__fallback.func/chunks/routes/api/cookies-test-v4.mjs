import { d as defineEventHandler, a as setCookie } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const cookiesTestV4 = defineEventHandler((event) => {
  const cookies = {
    token: "abc123",
    theme: "dark",
    lang: "zh-CN"
  };
  const expires = /* @__PURE__ */ new Date();
  expires.setDate(expires.getDate() + 7);
  setCookie(event, "token", cookies.token, {
    httpOnly: true,
    path: "/",
    expires,
    sameSite: "lax"
  });
  setCookie(event, "theme", cookies.theme, {
    path: "/",
    expires,
    secure: false,
    sameSite: "strict"
  });
  setCookie(event, "lang", cookies.lang, {
    path: "/",
    expires,
    domain: void 0
    // 不设置 domain，让浏览器决定
  });
  return {
    success: true,
    cookies,
    method: "setCookie-expires"
  };
});

export { cookiesTestV4 as default };
//# sourceMappingURL=cookies-test-v4.mjs.map
