import { _ as __nuxt_component_0$1 } from './nuxt-link-D9ZYz0Ku.mjs';
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "app-header" }, _attrs))} data-v-e06fecac><div class="header-container" data-v-e06fecac><div class="logo" data-v-e06fecac>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "logo-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="logo-text" data-v-e06fecac${_scopeId}>Nuxt App</span>`);
      } else {
        return [
          createVNode("span", { class: "logo-text" }, "Nuxt App")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><nav class="navigation" data-v-e06fecac><ul class="nav-list" data-v-e06fecac><li class="nav-item" data-v-e06fecac>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: ["nav-link", { active: _ctx.$route.path === "/" }]
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 首页 `);
      } else {
        return [
          createTextVNode(" 首页 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="nav-item" data-v-e06fecac>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/about",
    class: ["nav-link", { active: _ctx.$route.path === "/about" }]
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` 关于 `);
      } else {
        return [
          createTextVNode(" 关于 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="nav-item" data-v-e06fecac>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/test-isr",
    class: ["nav-link", { active: _ctx.$route.path === "/test-isr" }]
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` ISR测试 `);
      } else {
        return [
          createTextVNode(" ISR测试 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="nav-item" data-v-e06fecac>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/test-ssr",
    class: ["nav-link", { active: _ctx.$route.path === "/test-ssr" }]
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` SSR测试 `);
      } else {
        return [
          createTextVNode(" SSR测试 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></nav></div></header>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-e06fecac"]]), { __name: "AppHeader" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))} data-v-44360468>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`<main class="main-content" data-v-44360468>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main><footer class="app-footer" data-v-44360468><div class="footer-container" data-v-44360468><p data-v-44360468>© 2024 Nuxt App. All rights reserved.</p></div></footer></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-44360468"]]);

export { _default as default };
//# sourceMappingURL=default-o2QH8cov.mjs.map
