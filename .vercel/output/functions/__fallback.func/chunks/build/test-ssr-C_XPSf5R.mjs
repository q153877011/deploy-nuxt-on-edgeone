import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData, b as useRequestHeaders } from './asyncData-duxzp84R.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "test-ssr",
  __ssrInlineRender: true,
  setup(__props) {
    const { data, pending, error, refresh } = useAsyncData("ssr-example", async () => {
      const ua = useRequestHeaders(["user-agent"])["user-agent"] || "";
      return {
        serverTime: (/* @__PURE__ */ new Date()).toISOString(),
        userAgent: ua
      };
    }, { server: true, default: () => ({ serverTime: "", userAgent: "" }) });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ style: { "padding": "24px" } }, _attrs))} data-v-1113d2fb><h1 data-v-1113d2fb>SSR 示例页面</h1><p data-v-1113d2fb>首次渲染：${ssrInterpolate("服务端")}</p>`);
      if (unref(error)) {
        _push(`<div data-v-1113d2fb>加载失败：${ssrInterpolate(unref(error).message)}</div>`);
      } else if (unref(pending)) {
        _push(`<div data-v-1113d2fb>加载中...</div>`);
      } else if (unref(data)) {
        _push(`<div data-v-1113d2fb><p data-v-1113d2fb>服务器时间：${ssrInterpolate(unref(data).serverTime)}</p><p data-v-1113d2fb>用户代理：${ssrInterpolate(unref(data).userAgent)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button data-v-1113d2fb>刷新数据（客户端）</button></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-ssr.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const testSsr = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1113d2fb"]]);

export { testSsr as default };
//# sourceMappingURL=test-ssr-C_XPSf5R.mjs.map
