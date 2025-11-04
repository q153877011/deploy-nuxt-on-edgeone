import { _ as __nuxt_component_0 } from './nuxt-link-D9ZYz0Ku.mjs';
import { defineComponent, ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _imports_0 = publicAssetsURL("/avator.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref(null);
    const pending = ref(true);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-653f9ff8><h1 data-v-653f9ff8>Welcome to the homepage</h1><p data-v-653f9ff8>This is an auto-imported component</p>`);
      if (pending.value) {
        _push(`<div class="loading" data-v-653f9ff8> 正在加载数据... </div>`);
      } else if (error.value) {
        _push(`<div class="error" data-v-653f9ff8> 加载失败: ${ssrInterpolate(error.value)}</div>`);
      } else if (data.value) {
        _push(`<div class="api-data" data-v-653f9ff8><h2 data-v-653f9ff8>API 数据:</h2><pre data-v-653f9ff8>${ssrInterpolate(JSON.stringify(data.value, null, 2))}</pre><button${ssrIncludeBooleanAttr(pending.value) ? " disabled" : ""} data-v-653f9ff8>${ssrInterpolate(pending.value ? "刷新中..." : "刷新数据")}</button><div data-v-653f9ff8><nav data-v-653f9ff8><ul data-v-653f9ff8><li data-v-653f9ff8>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`关于`);
            } else {
              return [
                createTextVNode("关于")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li data-v-653f9ff8>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/posts/1" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`文章 1`);
            } else {
              return [
                createTextVNode("文章 1")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li data-v-653f9ff8>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/posts/2" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`文章 2`);
            } else {
              return [
                createTextVNode("文章 2")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></nav></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<img${ssrRenderAttr("src", _imports_0)} alt="Logo" width="100px" height="100px" data-v-653f9ff8></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-653f9ff8"]]);

export { index as default };
//# sourceMappingURL=index-DpeBYerC.mjs.map
