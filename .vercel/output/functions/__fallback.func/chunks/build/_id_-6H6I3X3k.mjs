import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    console.log(route.params.id);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-eaef5840><div class="post-card" data-v-eaef5840><h1 class="title" data-v-eaef5840>📄 文章详情页</h1><div class="route-info" data-v-eaef5840><h2 data-v-eaef5840>🛣️ 路由信息</h2><div class="info-grid" data-v-eaef5840><div class="info-item" data-v-eaef5840><span class="label" data-v-eaef5840>文章ID:</span><span class="value" data-v-eaef5840>${ssrInterpolate(unref(route).params.id)}</span></div><div class="info-item" data-v-eaef5840><span class="label" data-v-eaef5840>完整路径:</span><span class="value" data-v-eaef5840>${ssrInterpolate(unref(route).fullPath)}</span></div><div class="info-item" data-v-eaef5840><span class="label" data-v-eaef5840>路由名称:</span><span class="value" data-v-eaef5840>${ssrInterpolate(unref(route).name || "未命名")}</span></div><div class="info-item" data-v-eaef5840><span class="label" data-v-eaef5840>查询参数:</span><span class="value" data-v-eaef5840>${ssrInterpolate(Object.keys(unref(route).query).length ? JSON.stringify(unref(route).query) : "无")}</span></div></div></div><div class="content-preview" data-v-eaef5840><h2 data-v-eaef5840>📝 文章内容预览</h2><p class="preview-text" data-v-eaef5840> 这里是文章 ID <strong data-v-eaef5840>${ssrInterpolate(unref(route).params.id)}</strong> 的内容预览。 <br data-v-eaef5840> 在实际应用中，您可以根据这个ID从API获取具体的文章数据。 </p></div><div class="actions" data-v-eaef5840><button class="btn btn-secondary" data-v-eaef5840>← 返回</button><button class="btn btn-primary" data-v-eaef5840>🏠 首页</button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/posts/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eaef5840"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-6H6I3X3k.mjs.map
