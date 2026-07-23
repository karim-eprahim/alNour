import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { defineComponent, mergeProps, createVNode, resolveDynamicComponent, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderVNode, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { Inbox } from '@lucide/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EmptyState",
  __ssrInlineRender: true,
  props: {
    title: { default: "No data found" },
    description: { default: "There are no records to display yet." },
    icon: {},
    action: {}
  },
  emits: ["action"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center py-16 text-center" }, _attrs))}><div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon || unref(Inbox)), { class: "size-6 text-muted-foreground" }, null), _parent);
      _push(`</div><h3 class="mb-1 text-sm font-semibold">${ssrInterpolate(__props.title)}</h3><p class="mb-4 max-w-xs text-xs text-muted-foreground">${ssrInterpolate(__props.description)}</p>`);
      if (__props.action) {
        _push(ssrRenderComponent(_component_UiButton, {
          size: "sm",
          onClick: ($event) => emit("action")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.action)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.action), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/EmptyState.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main, { __name: "EmptyState" });

export { __nuxt_component_7 as _ };
//# sourceMappingURL=EmptyState-BVvkGjQ9.mjs.map
