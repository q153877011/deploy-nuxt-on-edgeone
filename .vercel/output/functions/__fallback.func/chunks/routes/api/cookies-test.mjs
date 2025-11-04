import { d as defineEventHandler, a as setCookie } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const cookiesTest = defineEventHandler((event) => {
  const cookies = {
    token: "abc123",
    theme: "dark",
    lang: "zh-CN"
  };
  setCookie(event, "token", cookies.token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  setCookie(event, "theme", cookies.theme, { path: "/", maxAge: 60 * 60 * 24 * 7 });
  setCookie(event, "lang", cookies.lang, { path: "/", maxAge: 60 * 60 * 24 * 7 });
  return {
    success: true,
    cookies
  };
});

export { cookiesTest as default };
//# sourceMappingURL=cookies-test.mjs.map
