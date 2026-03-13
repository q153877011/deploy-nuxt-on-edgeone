import { _ as __nuxt_component_0 } from './asyncData-ClZhNorM.mjs';
import { withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useFetch } from './fetch-XdZZ5EoT.mjs';
import { u as useHead } from './composables-DP-fTMN_.mjs';
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
  __name: "test-isr",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: timeData } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/time", {
      server: true,
      // 确保只在服务器端执行
      key: "time-data"
      // 缓存键
    }, "$wylAavoiIB")), __temp = await __temp, __restore(), __temp);
    const currentTime = computed(() => timeData.value?.localTime || "");
    const seconds = computed(() => timeData.value?.seconds || 0);
    const randomId = computed(() => timeData.value?.randomId || 0);
    const generatedAt = computed(() => timeData.value?.generatedAt || "");
    computed(() => {
      return generatedAt.value || (/* @__PURE__ */ new Date()).toISOString();
    });
    useHead({
      title: "ISR 测试页面 - SWR缓存",
      meta: [
        { name: "description", content: "Nuxt ISR 测试页面，使用SWR缓存验证功能" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "isr-test-page" }, _attrs))} data-v-d5dd30a3><div class="container" data-v-d5dd30a3><h1 data-v-d5dd30a3>ISR 测试页面</h1><div class="time-display" data-v-d5dd30a3><h2 data-v-d5dd30a3>当前时间</h2><div class="time-box" data-v-d5dd30a3><div class="time-value" data-v-d5dd30a3>${ssrInterpolate(unref(currentTime))}</div><div class="seconds" data-v-d5dd30a3>秒数: ${ssrInterpolate(unref(seconds))}</div></div></div><div class="info-section" data-v-d5dd30a3><h3 data-v-d5dd30a3>页面信息</h3><ul data-v-d5dd30a3><li data-v-d5dd30a3><strong data-v-d5dd30a3>API生成时间:</strong> ${ssrInterpolate(unref(generatedAt))}</li><li data-v-d5dd30a3><strong data-v-d5dd30a3>页面生成时间:</strong>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 服务端渲染 `);
          } else {
            return [
              createTextVNode(" 服务端渲染 ")
            ];
          }
        })
      }, _parent));
      _push(`</li><li data-v-d5dd30a3><strong data-v-d5dd30a3>随机ID:</strong> ${ssrInterpolate(unref(randomId))}</li><li data-v-d5dd30a3><strong data-v-d5dd30a3>SWR 重新验证:</strong> 10秒</li><li data-v-d5dd30a3><strong data-v-d5dd30a3>页面类型:</strong> 增量静态再生 (SWR)</li></ul></div><div class="refresh-info" data-v-d5dd30a3><p data-v-d5dd30a3>🔄 此页面每10秒自动重新生成</p><p data-v-d5dd30a3>📊 在10秒内刷新页面，随机ID应该保持不变</p><p data-v-d5dd30a3>⏰ 超过10秒后刷新，随机ID会更新</p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-isr.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const testIsr = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5dd30a3"]]);

export { testIsr as default };
//# sourceMappingURL=test-isr-CoirC9BN.mjs.map
