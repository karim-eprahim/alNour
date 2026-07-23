import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs } from 'vue/server-renderer';
import { h as cn } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Skeleton",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "skeleton",
        class: unref(cn)("bg-muted rounded-md animate-pulse", props.class)
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/skeleton/Skeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoadingState",
  __ssrInlineRender: true,
  props: {
    text: { default: "Loading..." },
    count: { default: 1 }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiSkeleton = _sfc_main$1;
      _push(`<!--[--><div class="flex flex-col items-center justify-center py-16 text-center"><div class="mb-4">`);
      _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-10 w-10 rounded-full" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiSkeleton, { class: "mb-2 h-4 w-32" }, null, _parent));
      _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-3 w-48" }, null, _parent));
      _push(`</div>`);
      if (__props.count > 1) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(__props.count, (i) => {
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-12 w-full rounded-lg" }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/LoadingState.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "LoadingState" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=LoadingState-y5B8zlzY.mjs.map
