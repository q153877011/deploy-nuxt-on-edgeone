import { withAsyncContext, computed, mergeProps, unref, toValue, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { A as hash } from '../nitro/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { u as useAsyncData, a as useRequestFetch } from './asyncData-duxzp84R.mjs';
import { _ as _export_sfc, f as fetchDefaults } from './server.mjs';
import { u as useHead } from './composables-K13BPv89.mjs';
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

function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  let controller;
  const asyncData = useAsyncData(watchSources === false ? key.value : key, () => {
    controller?.abort?.(new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
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
    const pageGeneratedAt = (/* @__PURE__ */ new Date()).toISOString();
    useHead({
      title: "ISR 测试页面 - SWR缓存",
      meta: [
        { name: "description", content: "Nuxt ISR 测试页面，使用SWR缓存验证功能" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "isr-test-page" }, _attrs))} data-v-f8f88ee4><div class="container" data-v-f8f88ee4><h1 data-v-f8f88ee4>ISR 测试页面</h1><div class="time-display" data-v-f8f88ee4><h2 data-v-f8f88ee4>当前时间</h2><div class="time-box" data-v-f8f88ee4><div class="time-value" data-v-f8f88ee4>${ssrInterpolate(unref(currentTime))}</div><div class="seconds" data-v-f8f88ee4>秒数: ${ssrInterpolate(unref(seconds))}</div></div></div><div class="info-section" data-v-f8f88ee4><h3 data-v-f8f88ee4>页面信息</h3><ul data-v-f8f88ee4><li data-v-f8f88ee4><strong data-v-f8f88ee4>API生成时间:</strong> ${ssrInterpolate(unref(generatedAt))}</li><li data-v-f8f88ee4><strong data-v-f8f88ee4>页面生成时间:</strong> ${ssrInterpolate(unref(pageGeneratedAt))}</li><li data-v-f8f88ee4><strong data-v-f8f88ee4>随机ID:</strong> ${ssrInterpolate(unref(randomId))}</li><li data-v-f8f88ee4><strong data-v-f8f88ee4>SWR 重新验证:</strong> 10秒</li><li data-v-f8f88ee4><strong data-v-f8f88ee4>页面类型:</strong> 增量静态再生 (SWR)</li></ul></div><div class="refresh-info" data-v-f8f88ee4><p data-v-f8f88ee4>🔄 此页面每10秒自动重新生成</p><p data-v-f8f88ee4>📊 在10秒内刷新页面，随机ID应该保持不变</p><p data-v-f8f88ee4>⏰ 超过10秒后刷新，随机ID会更新</p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-isr.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const testIsr = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f8f88ee4"]]);

export { testIsr as default };
//# sourceMappingURL=test-isr-rx0R8iTX.mjs.map
