import { defineComponent, ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DistributorTrackingMap",
  __ssrInlineRender: true,
  props: {
    trackings: {},
    selectedTrackingId: {},
    route: {},
    routeCustomer: {}
  },
  setup(__props) {
    const props = __props;
    const mapEl = ref(null);
    watch(
      () => props.trackings,
      () => {
      },
      { deep: true }
    );
    watch(
      () => [props.route, props.routeCustomer],
      () => {
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "mapEl",
        ref: mapEl,
        class: "tracking-map-root h-full w-full"
      }, _attrs))} data-v-1b813201></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tracking/DistributorTrackingMap.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_11 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-1b813201"]]), { __name: "DistributorTrackingMap" });

export { __nuxt_component_11 as _ };
//# sourceMappingURL=DistributorTrackingMap-DCPUw7bS.mjs.map
