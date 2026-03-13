import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "tencentcloud-images",
  __ssrInlineRender: true,
  setup(__props) {
    const images = [
      {
        src: "/tencentcloud/1.png",
        alt: "Tencent Cloud 图片 1",
        title: "图片 1",
        filename: "1.png"
      },
      {
        src: "/tencentcloud/2.png",
        alt: "Tencent Cloud 图片 2",
        title: "图片 2",
        filename: "2.png"
      },
      {
        src: "/tencentcloud/3.png",
        alt: "Tencent Cloud 图片 3",
        title: "图片 3",
        filename: "3.png"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tencentcloud-images" }, _attrs))} data-v-d6282208><div class="container" data-v-d6282208><h1 class="title" data-v-d6282208>Tencent Cloud 图片展示</h1><p class="description" data-v-d6282208>以下展示 public/tencentcloud 目录下的三张图片</p><div class="images-grid" data-v-d6282208><!--[-->`);
      ssrRenderList(images, (image, index) => {
        _push(`<div class="image-card" data-v-d6282208><div class="image-wrapper" data-v-d6282208><img${ssrRenderAttr("src", image.src)}${ssrRenderAttr("alt", image.alt)} class="image" loading="lazy" data-v-d6282208></div><div class="image-info" data-v-d6282208><h3 class="image-title" data-v-d6282208>${ssrInterpolate(image.title)}</h3><p class="image-filename" data-v-d6282208>${ssrInterpolate(image.filename)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tencentcloud-images.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tencentcloudImages = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6282208"]]);

export { tencentcloudImages as default };
//# sourceMappingURL=tencentcloud-images-RpTpZJK3.mjs.map
