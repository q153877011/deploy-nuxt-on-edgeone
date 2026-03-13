import { _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { mergeProps, defineComponent, ref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const closeMobileMenu = () => {
      mobileMenuOpen.value = false;
      (void 0).body.style.overflow = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "app-header" }, _attrs))} data-v-e0f49a70><div class="header-container" data-v-e0f49a70><div class="logo" data-v-e0f49a70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "logo-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="logo-icon" data-v-e0f49a70${_scopeId}>⚡</span><span class="logo-text" data-v-e0f49a70${_scopeId}>Nuxt App</span>`);
          } else {
            return [
              createVNode("span", { class: "logo-icon" }, "⚡"),
              createVNode("span", { class: "logo-text" }, "Nuxt App")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="${ssrRenderClass([{ "mobile-open": mobileMenuOpen.value }, "navigation"])}" data-v-e0f49a70><ul class="nav-list" data-v-e0f49a70><li class="nav-item" data-v-e0f49a70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: ["nav-link", { active: _ctx.$route.path === "/" }],
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-icon" data-v-e0f49a70${_scopeId}>🏠</span><span data-v-e0f49a70${_scopeId}>首页</span>`);
          } else {
            return [
              createVNode("span", { class: "nav-icon" }, "🏠"),
              createVNode("span", null, "首页")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-e0f49a70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stream",
        class: ["nav-link", { active: _ctx.$route.path === "/stream" }],
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-icon" data-v-e0f49a70${_scopeId}>📡</span><span data-v-e0f49a70${_scopeId}>流式传输</span>`);
          } else {
            return [
              createVNode("span", { class: "nav-icon" }, "📡"),
              createVNode("span", null, "流式传输")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-e0f49a70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/test-ssr",
        class: ["nav-link", { active: _ctx.$route.path === "/test-ssr" }],
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-icon" data-v-e0f49a70${_scopeId}>🔄</span><span data-v-e0f49a70${_scopeId}>SSR测试</span>`);
          } else {
            return [
              createVNode("span", { class: "nav-icon" }, "🔄"),
              createVNode("span", null, "SSR测试")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-e0f49a70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/test-ssg",
        class: ["nav-link", { active: _ctx.$route.path === "/test-ssg" }],
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-icon" data-v-e0f49a70${_scopeId}>📄</span><span data-v-e0f49a70${_scopeId}>SSG测试</span>`);
          } else {
            return [
              createVNode("span", { class: "nav-icon" }, "📄"),
              createVNode("span", null, "SSG测试")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-e0f49a70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/test-isr",
        class: ["nav-link", { active: _ctx.$route.path === "/test-isr" }],
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-icon" data-v-e0f49a70${_scopeId}>⚙️</span><span data-v-e0f49a70${_scopeId}>ISR测试</span>`);
          } else {
            return [
              createVNode("span", { class: "nav-icon" }, "⚙️"),
              createVNode("span", null, "ISR测试")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-e0f49a70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cookies-ssr",
        class: ["nav-link", { active: _ctx.$route.path === "/cookies-ssr" }],
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-icon" data-v-e0f49a70${_scopeId}>🍪</span><span data-v-e0f49a70${_scopeId}>Cookies示例</span>`);
          } else {
            return [
              createVNode("span", { class: "nav-icon" }, "🍪"),
              createVNode("span", null, "Cookies示例")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-e0f49a70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/test-platform-middleware",
        class: ["nav-link", { active: _ctx.$route.path === "/test-platform-middleware" }],
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-icon" data-v-e0f49a70${_scopeId}>🔐</span><span data-v-e0f49a70${_scopeId}>平台中间件</span>`);
          } else {
            return [
              createVNode("span", { class: "nav-icon" }, "🔐"),
              createVNode("span", null, "平台中间件")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-e0f49a70>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tencentcloud-images",
        class: ["nav-link", { active: _ctx.$route.path === "/tencentcloud-images" }],
        onClick: closeMobileMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="nav-icon" data-v-e0f49a70${_scopeId}>☁️</span><span data-v-e0f49a70${_scopeId}>Tencent Cloud图片</span>`);
          } else {
            return [
              createVNode("span", { class: "nav-icon" }, "☁️"),
              createVNode("span", null, "Tencent Cloud图片")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav><button class="mobile-menu-btn"${ssrRenderAttr("aria-label", mobileMenuOpen.value ? "关闭菜单" : "打开菜单")} data-v-e0f49a70><span class="${ssrRenderClass([{ active: mobileMenuOpen.value }, "hamburger-line"])}" data-v-e0f49a70></span><span class="${ssrRenderClass([{ active: mobileMenuOpen.value }, "hamburger-line"])}" data-v-e0f49a70></span><span class="${ssrRenderClass([{ active: mobileMenuOpen.value }, "hamburger-line"])}" data-v-e0f49a70></span></button></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-e0f49a70"]]), { __name: "AppHeader" });
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
//# sourceMappingURL=default-DxRP-rmD.mjs.map
