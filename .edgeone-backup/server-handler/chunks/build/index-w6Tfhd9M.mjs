import { defineComponent, ref, resolveComponent, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref(null);
    const pending = ref(true);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppAlert = resolveComponent("AppAlert");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d812bc3a><h1 data-v-d812bc3a>Welcome to the homepage</h1>`);
      _push(ssrRenderComponent(_component_AppAlert, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` This is an auto-imported component `);
          } else {
            return [
              createTextVNode(" This is an auto-imported component ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (pending.value) {
        _push(`<div class="loading" data-v-d812bc3a> 正在加载数据... </div>`);
      } else if (error.value) {
        _push(`<div class="error" data-v-d812bc3a> 加载失败: ${ssrInterpolate(error.value)}</div>`);
      } else if (data.value) {
        _push(`<div class="api-data" data-v-d812bc3a><h2 data-v-d812bc3a>API 数据:</h2><pre data-v-d812bc3a>${ssrInterpolate(JSON.stringify(data.value, null, 2))}</pre><button${ssrIncludeBooleanAttr(pending.value) ? " disabled" : ""} data-v-d812bc3a>${ssrInterpolate(pending.value ? "刷新中..." : "刷新数据")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d812bc3a"]]);

export { index as default };
//# sourceMappingURL=index-w6Tfhd9M.mjs.map
