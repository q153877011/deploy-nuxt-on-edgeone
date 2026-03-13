import { defineComponent, withAsyncContext, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-ClZhNorM.mjs';
import { _ as _export_sfc, e as useRequestHeaders } from './server.mjs';
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
  __name: "test-platform-middleware",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: headerValueData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("test-platform-middleware-header", async () => {
      const headers = useRequestHeaders();
      return headers["test-platform-middleware"] || "none";
    }, {
      server: true,
      // 确保在服务端执行
      default: () => "none"
      // 默认值
    })), __temp = await __temp, __restore(), __temp);
    const headerValue = computed(() => headerValueData.value || "none");
    useHead({
      title: "测试平台中间件 - 请求头检测"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-ee44838d><h1 data-v-ee44838d>测试平台中间件</h1><div class="result-box" data-v-ee44838d><div class="label" data-v-ee44838d>请求头 test-platform-middleware 的值：</div><div class="${ssrRenderClass([{ "has-value": headerValue.value !== "none", "no-value": headerValue.value === "none" }, "value"])}" data-v-ee44838d>${ssrInterpolate(headerValue.value)}</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-platform-middleware.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const testPlatformMiddleware = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee44838d"]]);

export { testPlatformMiddleware as default };
//# sourceMappingURL=test-platform-middleware-BJWHqpeU.mjs.map
