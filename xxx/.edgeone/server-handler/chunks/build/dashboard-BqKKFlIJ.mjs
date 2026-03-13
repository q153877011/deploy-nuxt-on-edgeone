import { _ as _export_sfc, a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCookie } from './cookie-Bo49DHY8.mjs';
import { u as useHead } from './composables-DP-fTMN_.mjs';
import 'node:http';
import 'node:https';
import '../nitro/nitro.mjs';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const authToken = useCookie("auth-token", {
      default: () => null,
      httpOnly: false
    });
    const loginTime = useCookie("login-time", {
      default: () => null,
      httpOnly: false
    });
    useHead({
      title: "仪表板 - 受保护路由",
      meta: [
        { name: "description", content: "这是一个受全局中间件保护的路由" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ style: { "padding": "24px", "max-width": "800px", "margin": "0 auto" } }, _attrs))} data-v-95c885c1><h1 data-v-95c885c1>📊 仪表板（受保护路由）</h1><div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "20px", "background": "#d4edda", "border": "1px solid #c3e6cb", "border-radius": "8px", "color": "#155724" })}" data-v-95c885c1><h2 style="${ssrRenderStyle({ "margin": "0 0 12px 0" })}" data-v-95c885c1>✅ 访问成功</h2><p style="${ssrRenderStyle({ "margin": "0" })}" data-v-95c885c1> 您已成功访问受保护的路由。这说明全局中间件已经验证了您的认证状态。 </p></div><div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "20px", "background": "#f8f9fa", "border-radius": "8px" })}" data-v-95c885c1><h2 data-v-95c885c1>🔐 认证信息</h2><div style="${ssrRenderStyle({ "margin-top": "12px" })}" data-v-95c885c1><p data-v-95c885c1><strong data-v-95c885c1>认证 Token:</strong> ${ssrInterpolate(unref(authToken) || "无")}</p><p data-v-95c885c1><strong data-v-95c885c1>登录时间:</strong> ${ssrInterpolate(unref(loginTime) || "无")}</p></div></div><div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "20px", "background": "#e7f3ff", "border-left": "4px solid #2196F3", "border-radius": "4px" })}" data-v-95c885c1><h3 style="${ssrRenderStyle({ "margin": "0 0 12px 0" })}" data-v-95c885c1>📝 说明</h3><p style="${ssrRenderStyle({ "margin": "0", "color": "#555" })}" data-v-95c885c1> 这个页面是受保护的路由，只有在全局中间件验证通过后才能访问。 如果您未登录，中间件会自动重定向到 `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth",
        style: { "color": "#2196F3" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`认证页面`);
          } else {
            return [
              createTextVNode("认证页面")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`。 </p></div><div style="${ssrRenderStyle({ "margin": "20px 0" })}" data-v-95c885c1><button style="${ssrRenderStyle({ "padding": "12px 24px", "background": "#dc3545", "color": "white", "border": "none", "border-radius": "6px", "cursor": "pointer", "font-size": "16px", "font-weight": "500" })}" data-v-95c885c1> 🚪 退出登录 </button></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-95c885c1"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-BqKKFlIJ.mjs.map
