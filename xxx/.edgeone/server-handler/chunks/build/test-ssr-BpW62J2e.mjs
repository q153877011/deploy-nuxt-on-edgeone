import { _ as __nuxt_component_0 } from './asyncData-ClZhNorM.mjs';
import { withAsyncContext, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-XdZZ5EoT.mjs';
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
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = {
  __name: "test-ssr",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/time", {
      server: true,
      // 确保在服务器端执行
      key: "time-data",
      // 缓存键
      default: () => ({
        localTime: "",
        randomId: 0,
        generatedAt: "",
        timestamp: 0,
        timezone: ""
      })
    }, "$4A8_noen7b")), __temp = await __temp, __restore(), __temp);
    const { data: testData } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/seconde/query-test?name=张三&age=25&active=true", {
      server: true,
      key: "test-data",
      default: () => ({
        name: "",
        age: 0,
        active: false
      })
    }, "$qqU53dMpzr")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ style: { "padding": "24px" } }, _attrs))} data-v-1521f6c7><h1 data-v-1521f6c7>Nuxt SSR 示例页面</h1>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-1521f6c7${_scopeId}>首次渲染：服务端</p>`);
          } else {
            return [
              createVNode("p", null, "首次渲染：服务端")
            ];
          }
        })
      }, _parent));
      if (unref(error)) {
        _push(`<div data-v-1521f6c7>加载失败：${ssrInterpolate(unref(error).message)}</div>`);
      } else if (unref(pending)) {
        _push(`<div data-v-1521f6c7>加载中...</div>`);
      } else if (unref(data)) {
        _push(`<div data-v-1521f6c7><p data-v-1521f6c7>服务器时间：${ssrInterpolate(unref(data).localTime)}</p><p data-v-1521f6c7>生成时间：${ssrInterpolate(unref(data).generatedAt)}</p><p data-v-1521f6c7>随机ID：${ssrInterpolate(unref(data).randomId)}</p><p data-v-1521f6c7>时间戳：${ssrInterpolate(unref(data).timestamp)}</p><p data-v-1521f6c7>时区：${ssrInterpolate(unref(data).timezone)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button data-v-1521f6c7>刷新数据（客户端）</button></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-ssr.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const testSsr = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1521f6c7"]]);

export { testSsr as default };
//# sourceMappingURL=test-ssr-BpW62J2e.mjs.map
