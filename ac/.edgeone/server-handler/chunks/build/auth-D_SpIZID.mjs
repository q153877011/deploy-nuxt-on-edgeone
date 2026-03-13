import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { u as useCookie } from './cookie-Bo49DHY8.mjs';
import { _ as _export_sfc, u as useRoute } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    const authToken = useCookie("auth-token", {
      default: () => null,
      httpOnly: false,
      secure: true,
      sameSite: "lax"
    });
    const loginTime = useCookie("login-time", {
      default: () => null,
      httpOnly: false
    });
    const route = useRoute();
    const redirectFrom = computed(() => route.query.redirect || null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ style: { "padding": "24px", "max-width": "600px", "margin": "0 auto" } }, _attrs))} data-v-29d932cd><h1 data-v-29d932cd>🔐 认证页面</h1><div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "20px", "background": "#f5f5f5", "border-radius": "8px" })}" data-v-29d932cd><h2 data-v-29d932cd>全局中间件测试</h2><p style="${ssrRenderStyle({ "color": "#666", "margin": "12px 0" })}" data-v-29d932cd> 此页面用于测试全局中间件功能。全局中间件会在每个路由导航前自动执行。 </p></div>`);
      if (unref(authToken)) {
        _push(`<div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "16px", "background": "#d4edda", "border": "1px solid #c3e6cb", "border-radius": "8px", "color": "#155724" })}" data-v-29d932cd><h3 style="${ssrRenderStyle({ "margin": "0 0 8px 0" })}" data-v-29d932cd>✅ 已登录</h3><p style="${ssrRenderStyle({ "margin": "0" })}" data-v-29d932cd>Token: ${ssrInterpolate(unref(authToken))}</p><p style="${ssrRenderStyle({ "margin": "8px 0 0 0", "font-size": "0.9em", "opacity": "0.8" })}" data-v-29d932cd> 登录时间: ${ssrInterpolate(unref(loginTime))}</p></div>`);
      } else {
        _push(`<div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "16px", "background": "#fff3cd", "border": "1px solid #ffeaa7", "border-radius": "8px", "color": "#856404" })}" data-v-29d932cd><h3 style="${ssrRenderStyle({ "margin": "0 0 8px 0" })}" data-v-29d932cd>⚠️ 未登录</h3><p style="${ssrRenderStyle({ "margin": "0" })}" data-v-29d932cd>请登录以访问受保护的路由</p></div>`);
      }
      _push(`<div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "20px", "background": "white", "border": "1px solid #ddd", "border-radius": "8px" })}" data-v-29d932cd><h3 style="${ssrRenderStyle({ "margin": "0 0 16px 0" })}" data-v-29d932cd>操作</h3><div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "gap": "12px" })}" data-v-29d932cd>`);
      if (!unref(authToken)) {
        _push(`<button style="${ssrRenderStyle({ "padding": "12px 24px", "background": "#007bff", "color": "white", "border": "none", "border-radius": "6px", "cursor": "pointer", "font-size": "16px", "font-weight": "500" })}" data-v-29d932cd> 🔑 模拟登录 </button>`);
      } else {
        _push(`<button style="${ssrRenderStyle({ "padding": "12px 24px", "background": "#dc3545", "color": "white", "border": "none", "border-radius": "6px", "cursor": "pointer", "font-size": "16px", "font-weight": "500" })}" data-v-29d932cd> 🚪 退出登录 </button>`);
      }
      _push(`<button style="${ssrRenderStyle({ "padding": "12px 24px", "background": "#28a745", "color": "white", "border": "none", "border-radius": "6px", "cursor": "pointer", "font-size": "16px", "font-weight": "500" })}" data-v-29d932cd> 🧪 测试受保护路由（需要登录） </button><button style="${ssrRenderStyle({ "padding": "12px 24px", "background": "#6c757d", "color": "white", "border": "none", "border-radius": "6px", "cursor": "pointer", "font-size": "16px", "font-weight": "500" })}" data-v-29d932cd> 📋 查看中间件日志 </button></div></div><div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "20px", "background": "#e7f3ff", "border-left": "4px solid #2196F3", "border-radius": "4px" })}" data-v-29d932cd><h3 style="${ssrRenderStyle({ "margin": "0 0 12px 0" })}" data-v-29d932cd>📝 中间件说明</h3><ul style="${ssrRenderStyle({ "margin": "0", "padding-left": "20px", "color": "#555" })}" data-v-29d932cd><li data-v-29d932cd>全局中间件文件：<code data-v-29d932cd>app/middleware/auth.global.ts</code></li><li data-v-29d932cd>中间件会在每个路由导航前自动执行</li><li data-v-29d932cd>可以检查认证状态并控制导航</li><li data-v-29d932cd>可以重定向到其他路由</li><li data-v-29d932cd>可以阻止导航（返回 false）</li></ul></div><div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "20px", "background": "#fff3cd", "border-left": "4px solid #ffc107", "border-radius": "4px" })}" data-v-29d932cd><h3 style="${ssrRenderStyle({ "margin": "0 0 12px 0" })}" data-v-29d932cd>🧪 测试步骤</h3><ol style="${ssrRenderStyle({ "margin": "0", "padding-left": "20px", "color": "#555" })}" data-v-29d932cd><li data-v-29d932cd>点击&quot;模拟登录&quot;设置认证 Token</li><li data-v-29d932cd>点击&quot;测试受保护路由&quot;，观察中间件行为</li><li data-v-29d932cd>打开浏览器控制台查看中间件日志</li><li data-v-29d932cd>尝试访问其他页面，观察中间件执行</li><li data-v-29d932cd>点击&quot;退出登录&quot;后再次测试受保护路由</li></ol></div>`);
      if (redirectFrom.value) {
        _push(`<div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "16px", "background": "#f0f0f0", "border-radius": "8px" })}" data-v-29d932cd><h3 style="${ssrRenderStyle({ "margin": "0 0 8px 0" })}" data-v-29d932cd>📍 重定向信息</h3><p style="${ssrRenderStyle({ "margin": "0", "color": "#666" })}" data-v-29d932cd> 从 <code data-v-29d932cd>${ssrInterpolate(redirectFrom.value)}</code> 重定向到此页面 </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const auth = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-29d932cd"]]);

export { auth as default };
//# sourceMappingURL=auth-D_SpIZID.mjs.map
