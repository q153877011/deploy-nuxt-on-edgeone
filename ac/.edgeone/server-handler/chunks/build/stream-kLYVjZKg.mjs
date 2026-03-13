import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "stream",
  __ssrInlineRender: true,
  setup(__props) {
    const config = ref({
      message: "这是一条流式消息",
      count: 10,
      delay: 1e3
    });
    const isStreaming = ref(false);
    const status = ref("");
    const messages = ref([]);
    ref(null);
    const stats = ref({
      total: 0,
      success: 0,
      error: 0,
      progress: 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ style: { "padding": "24px", "max-width": "1200px", "margin": "0 auto" } }, _attrs))} data-v-a223dac5><h1 data-v-a223dac5>流式传输示例页面</h1><div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "20px", "background": "#f5f5f5", "border-radius": "8px" })}" data-v-a223dac5><h2 data-v-a223dac5>配置参数</h2><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "1fr 1fr", "gap": "12px", "margin-top": "12px" })}" data-v-a223dac5><div data-v-a223dac5><label style="${ssrRenderStyle({ "display": "block", "margin-bottom": "4px", "font-weight": "500" })}" data-v-a223dac5>消息内容：</label><input${ssrRenderAttr("value", config.value.message)} type="text" style="${ssrRenderStyle({ "width": "100%", "padding": "8px", "border": "1px solid #ddd", "border-radius": "4px" })}" placeholder="输入消息内容" data-v-a223dac5></div><div data-v-a223dac5><label style="${ssrRenderStyle({ "display": "block", "margin-bottom": "4px", "font-weight": "500" })}" data-v-a223dac5>消息数量：</label><input${ssrRenderAttr("value", config.value.count)} type="number" min="1" max="100" style="${ssrRenderStyle({ "width": "100%", "padding": "8px", "border": "1px solid #ddd", "border-radius": "4px" })}" data-v-a223dac5></div><div data-v-a223dac5><label style="${ssrRenderStyle({ "display": "block", "margin-bottom": "4px", "font-weight": "500" })}" data-v-a223dac5>延迟时间（毫秒）：</label><input${ssrRenderAttr("value", config.value.delay)} type="number" min="100" max="5000" step="100" style="${ssrRenderStyle({ "width": "100%", "padding": "8px", "border": "1px solid #ddd", "border-radius": "4px" })}" data-v-a223dac5></div></div></div><div style="${ssrRenderStyle({ "margin": "20px 0" })}" data-v-a223dac5><button${ssrIncludeBooleanAttr(isStreaming.value) ? " disabled" : ""} style="${ssrRenderStyle([{ "padding": "10px 20px", "background": "#007bff", "color": "white", "border": "none", "border-radius": "4px", "cursor": "pointer", "margin-right": "10px" }, { opacity: isStreaming.value ? 0.6 : 1, cursor: isStreaming.value ? "not-allowed" : "pointer" }])}" data-v-a223dac5>${ssrInterpolate(isStreaming.value ? "传输中..." : "开始流式传输")}</button><button${ssrIncludeBooleanAttr(!isStreaming.value) ? " disabled" : ""} style="${ssrRenderStyle([{ "padding": "10px 20px", "background": "#dc3545", "color": "white", "border": "none", "border-radius": "4px", "cursor": "pointer", "margin-right": "10px" }, { opacity: !isStreaming.value ? 0.6 : 1, cursor: !isStreaming.value ? "not-allowed" : "pointer" }])}" data-v-a223dac5> 停止传输 </button><button style="${ssrRenderStyle({ "padding": "10px 20px", "background": "#6c757d", "color": "white", "border": "none", "border-radius": "4px", "cursor": "pointer" })}" data-v-a223dac5> 清空数据 </button></div>`);
      if (status.value) {
        _push(`<div style="${ssrRenderStyle({ "margin": "12px 0", "padding": "12px", "background": "#e7f3ff", "border-left": "4px solid #2196F3", "border-radius": "4px" })}" data-v-a223dac5><strong data-v-a223dac5>状态：</strong>${ssrInterpolate(status.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (stats.value.total > 0) {
        _push(`<div style="${ssrRenderStyle({ "margin": "12px 0", "padding": "12px", "background": "#f0f0f0", "border-radius": "4px" })}" data-v-a223dac5><strong data-v-a223dac5>统计信息：</strong> 总计：${ssrInterpolate(stats.value.total)} 条 | 成功：${ssrInterpolate(stats.value.success)} 条 | 错误：${ssrInterpolate(stats.value.error)} 条 | 进度：${ssrInterpolate(stats.value.progress)}% </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle({ "margin": "20px 0", "padding": "20px", "background": "white", "border": "1px solid #ddd", "border-radius": "8px", "max-height": "500px", "overflow-y": "auto" })}" data-v-a223dac5><h2 style="${ssrRenderStyle({ "margin-top": "0" })}" data-v-a223dac5>流式数据展示</h2>`);
      if (messages.value.length === 0) {
        _push(`<div style="${ssrRenderStyle({ "text-align": "center", "color": "#999", "padding": "40px" })}" data-v-a223dac5> 暂无数据，点击&quot;开始流式传输&quot;按钮开始接收数据 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(messages.value, (msg, index) => {
        _push(`<div style="${ssrRenderStyle({ "padding": "12px", "margin": "8px 0", "background": "#f9f9f9", "border-left": "4px solid #4CAF50", "border-radius": "4px" })}" data-v-a223dac5><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "margin-bottom": "8px" })}" data-v-a223dac5><strong style="${ssrRenderStyle({ "color": "#2196F3" })}" data-v-a223dac5>消息 #${ssrInterpolate(msg.index)}</strong><span style="${ssrRenderStyle({ "color": "#666", "font-size": "12px" })}" data-v-a223dac5>${ssrInterpolate(msg.timestampZh)}</span></div><div style="${ssrRenderStyle({ "margin-bottom": "8px" })}" data-v-a223dac5>${ssrInterpolate(msg.message)}</div><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px" })}" data-v-a223dac5><span style="${ssrRenderStyle({ "font-size": "12px", "color": "#666" })}" data-v-a223dac5>进度：</span><div style="${ssrRenderStyle({ "flex": "1", "height": "8px", "background": "#e0e0e0", "border-radius": "4px", "overflow": "hidden" })}" data-v-a223dac5><div style="${ssrRenderStyle([{ "height": "100%", "background": "linear-gradient(90deg, #4CAF50, #8BC34A)", "transition": "width 0.3s" }, { width: `${msg.progress}%` }])}" data-v-a223dac5></div></div><span style="${ssrRenderStyle({ "font-size": "12px", "color": "#666" })}" data-v-a223dac5>${ssrInterpolate(msg.progress)}%</span></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const stream = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a223dac5"]]);

export { stream as default };
//# sourceMappingURL=stream-kLYVjZKg.mjs.map
