import { _ as _export_sfc, a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import 'node:http';
import 'node:https';
import '../nitro/nitro.mjs';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _imports_0 = publicAssetsURL("/avator.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const envData = ref(null);
    const pending = ref(true);
    const error = ref(null);
    const searchQuery = ref("");
    const filteredEnvVars = computed(() => {
      if (!envData.value?.processEnv) return {};
      if (!searchQuery.value.trim()) {
        return envData.value.processEnv;
      }
      const query = searchQuery.value.toLowerCase();
      const filtered = {};
      for (const [key, value] of Object.entries(envData.value.processEnv)) {
        if (key.toLowerCase().includes(query) || String(value).toLowerCase().includes(query)) {
          filtered[key] = value;
        }
      }
      return filtered;
    });
    const isSensitive = (key) => {
      const sensitiveKeywords = ["password", "secret", "key", "token", "api_key", "private", "credential"];
      return sensitiveKeywords.some(
        (keyword) => key.toLowerCase().includes(keyword.toLowerCase())
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "padding": "24px", "max-width": "1200px", "margin": "0 auto" } }, _attrs))} data-v-b36d6117><h1 data-v-b36d6117>Welcome to the homepage</h1><p data-v-b36d6117>This is an auto-imported component</p>`);
      if (pending.value) {
        _push(`<div class="loading" data-v-b36d6117> 正在加载环境变量数据... </div>`);
      } else if (error.value) {
        _push(`<div class="error" data-v-b36d6117> 加载失败: ${ssrInterpolate(error.value)}</div>`);
      } else if (envData.value) {
        _push(`<div class="env-data" data-v-b36d6117><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "20px" })}" data-v-b36d6117><h2 data-v-b36d6117>环境变量信息</h2><button${ssrIncludeBooleanAttr(pending.value) ? " disabled" : ""} class="refresh-btn" data-v-b36d6117>${ssrInterpolate(pending.value ? "刷新中..." : "刷新数据")}</button></div>`);
        if (envData.value.stats) {
          _push(`<div style="${ssrRenderStyle({ "margin-bottom": "20px", "padding": "16px", "background": "#e7f3ff", "border-radius": "8px" })}" data-v-b36d6117><h3 style="${ssrRenderStyle({ "margin": "0 0 12px 0" })}" data-v-b36d6117>📊 统计信息</h3><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))", "gap": "12px" })}" data-v-b36d6117><div data-v-b36d6117><strong data-v-b36d6117>环境变量总数:</strong> ${ssrInterpolate(envData.value.stats.totalEnvVars)}</div><div data-v-b36d6117><strong data-v-b36d6117>敏感变量数:</strong> ${ssrInterpolate(envData.value.stats.sensitiveCount)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (envData.value.runtime) {
          _push(`<div style="${ssrRenderStyle({ "margin-bottom": "20px", "padding": "16px", "background": "#f0f9ff", "border-radius": "8px" })}" data-v-b36d6117><h3 style="${ssrRenderStyle({ "margin": "0 0 12px 0" })}" data-v-b36d6117>⚙️ 运行环境</h3><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))", "gap": "12px" })}" data-v-b36d6117><div data-v-b36d6117><strong data-v-b36d6117>NODE_ENV:</strong> ${ssrInterpolate(envData.value.runtime.nodeEnv)}</div><div data-v-b36d6117><strong data-v-b36d6117>平台:</strong> ${ssrInterpolate(envData.value.runtime.platform)}</div><div data-v-b36d6117><strong data-v-b36d6117>Node 版本:</strong> ${ssrInterpolate(envData.value.runtime.nodeVersion)}</div><div data-v-b36d6117><strong data-v-b36d6117>工作目录:</strong> ${ssrInterpolate(envData.value.runtime.cwd)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div style="${ssrRenderStyle({ "margin-bottom": "20px" })}" data-v-b36d6117><h3 style="${ssrRenderStyle({ "margin": "0 0 12px 0" })}" data-v-b36d6117>🔑 环境变量列表</h3><div style="${ssrRenderStyle({ "margin-bottom": "12px" })}" data-v-b36d6117><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="搜索环境变量..." style="${ssrRenderStyle({ "width": "100%", "padding": "8px 12px", "border": "1px solid #ddd", "border-radius": "4px", "font-size": "14px" })}" data-v-b36d6117></div><div class="env-list" data-v-b36d6117><!--[-->`);
        ssrRenderList(filteredEnvVars.value, (value, key) => {
          _push(`<div class="env-item" data-v-b36d6117><div class="env-key" data-v-b36d6117><strong data-v-b36d6117>${ssrInterpolate(key)}</strong>`);
          if (isSensitive(key)) {
            _push(`<span class="sensitive-badge" data-v-b36d6117>敏感</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="env-value" data-v-b36d6117>${ssrInterpolate(value)}</div></div>`);
        });
        _push(`<!--]--></div></div><details style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-b36d6117><summary style="${ssrRenderStyle({ "cursor": "pointer", "padding": "12px", "background": "#f5f5f5", "border-radius": "4px", "margin-bottom": "12px" })}" data-v-b36d6117><strong data-v-b36d6117>查看原始 JSON 数据</strong></summary><pre class="env-pre" data-v-b36d6117>${ssrInterpolate(JSON.stringify(envData.value, null, 2))}</pre></details></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "margin-top": "30px", "padding": "16px", "background": "#f9f9f9", "border-radius": "8px" })}" data-v-b36d6117><h3 style="${ssrRenderStyle({ "margin": "0 0 12px 0" })}" data-v-b36d6117>🔗 快速链接</h3><nav data-v-b36d6117><ul style="${ssrRenderStyle({ "list-style": "none", "padding": "0", "margin": "0", "display": "flex", "gap": "16px", "flex-wrap": "wrap" })}" data-v-b36d6117><li data-v-b36d6117>`);
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
      _push(`</li><li data-v-b36d6117>`);
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
      _push(`</li><li data-v-b36d6117>`);
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
      _push(`</li><li data-v-b36d6117>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/auth" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`认证`);
          } else {
            return [
              createTextVNode("认证")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav></div><div style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-b36d6117><img${ssrRenderAttr("src", _imports_0)} alt="Logo" width="100px" height="100px" data-v-b36d6117></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b36d6117"]]);

export { index as default };
//# sourceMappingURL=index-CNtbuvyi.mjs.map
