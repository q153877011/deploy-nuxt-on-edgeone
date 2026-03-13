import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cookies-ssr",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref(null);
    const cookiesOnClient = ref({});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "max-width": "720px", "margin": "24px auto", "padding": "16px", "border": "1px solid #e5e7eb", "border-radius": "10px", "background": "#fff" } }, _attrs))}><h1 style="${ssrRenderStyle({ "margin": "0 0 12px", "font-size": "22px" })}">SSR Cookies 示例</h1><p style="${ssrRenderStyle({ "margin": "0 0 16px", "color": "#6b7280" })}">打开此页后将请求 <code>/api/cookies-test</code>，服务器返回并写入三个 Cookie，然后在页面展示。</p>`);
      if (!data.value) {
        _push(`<div style="${ssrRenderStyle({ "padding": "12px", "background": "#f8fafc", "border": "1px solid #e5e7eb", "border-radius": "8px" })}"> 正在请求接口并设置 Cookie ... </div>`);
      } else {
        _push(`<div><h2 style="${ssrRenderStyle({ "font-size": "18px", "margin": "16px 0 8px" })}">接口返回的 Cookies（响应体）</h2><pre style="${ssrRenderStyle({ "white-space": "pre-wrap", "background": "#f8fafc", "border": "1px solid #e5e7eb", "border-radius": "8px", "padding": "12px" })}">${ssrInterpolate(JSON.stringify(data.value.cookies, null, 2))}
      </pre><h2 style="${ssrRenderStyle({ "font-size": "18px", "margin": "16px 0 8px" })}">浏览器端可读取的 Cookies</h2><pre style="${ssrRenderStyle({ "white-space": "pre-wrap", "background": "#fefce8", "border": "1px solid #fde68a", "border-radius": "8px", "padding": "12px" })}">${ssrInterpolate(JSON.stringify(cookiesOnClient.value, null, 2))}
      </pre><p style="${ssrRenderStyle({ "color": "#6b7280", "margin-top": "8px" })}">说明：<code>token</code> 为 HttpOnly，出于安全无法在客户端JS读取，但会随后续请求自动携带。</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cookies-ssr.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cookies-ssr-CMZPjFCv.mjs.map
