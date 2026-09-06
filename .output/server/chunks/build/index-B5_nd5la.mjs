import { _ as _sfc_main$5 } from './index-CUpQupPt.mjs';
import { defineComponent, toRefs, computed, mergeProps, unref, h, render, createVNode, resolveDynamicComponent, ref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrRenderStyle } from 'vue/server-renderer';
import { isClient } from '@vueuse/core';
import { useId, createContext, Primitive } from 'reka-ui';
import { d as cn } from './server.mjs';

const DASHBOARD_PERIOD_OPTIONS = [
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "6m", label: "6M" },
  { value: "1y", label: "1Y" }
];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ChartPeriodSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-1" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(DASHBOARD_PERIOD_OPTIONS), (option) => {
        _push(ssrRenderComponent(_component_UiButton, {
          key: option.value,
          variant: __props.modelValue === option.value ? "default" : "ghost",
          size: "sm",
          onClick: ($event) => emit("update:modelValue", option.value)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(option.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(option.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/ChartPeriodSelect.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$4, { __name: "ChartPeriodSelect" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ChartStyle",
  __ssrInlineRender: true,
  props: {
    id: {}
  },
  setup(__props) {
    const { config } = useChart();
    const colorConfig = computed(() => {
      return Object.entries(config.value).filter(
        ([, config2]) => config2.theme || config2.color
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (colorConfig.value.length) {
        _push(ssrRenderComponent(unref(Primitive), mergeProps({ as: "style" }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(Object.entries(unref(THEMES)).map(
                ([theme, prefix]) => `
${prefix} [data-chart=${__props.id}] {
${colorConfig.value.map(([key, itemConfig]) => {
                  const color = itemConfig.theme?.[theme] || itemConfig.color;
                  return color ? `  --color-${key}: ${color};` : null;
                }).join("\n")}
}
`
              ).join("\n"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(Object.entries(unref(THEMES)).map(
                  ([theme, prefix]) => `
${prefix} [data-chart=${__props.id}] {
${colorConfig.value.map(([key, itemConfig]) => {
                    const color = itemConfig.theme?.[theme] || itemConfig.color;
                    return color ? `  --color-${key}: ${color};` : null;
                  }).join("\n")}
}
`
                ).join("\n")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/chart/ChartStyle.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ChartContainer",
  __ssrInlineRender: true,
  props: {
    id: {},
    class: { type: [Boolean, null, String, Object, Array] },
    config: {},
    cursor: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { config } = toRefs(props);
    const uniqueId = useId();
    const chartId = computed(() => `chart-${props.id || uniqueId.replace(/:/g, "")}`);
    provideChartContext({
      id: uniqueId,
      config
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "chart",
        "data-chart": chartId.value,
        class: unref(cn)(
          `cn-chart [&_.tick_text]:!fill-muted-foreground [&_.tick_line]:!stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex flex-col aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden [&_[data-vis-xy-container]]:h-full [&_[data-vis-single-container]]:h-full h-full [&_[data-vis-xy-container]]:w-full [&_[data-vis-single-container]]:w-full w-full `,
          props.class
        ),
        style: {
          "--vis-tooltip-padding": "0px",
          "--vis-tooltip-background-color": "transparent",
          "--vis-tooltip-border-color": "transparent",
          "--vis-tooltip-text-color": "none",
          "--vis-tooltip-shadow-color": "none",
          "--vis-tooltip-backdrop-filter": "none",
          "--vis-crosshair-circle-stroke-color": "#0000",
          "--vis-crosshair-line-stroke-width": __props.cursor ? "1px" : "0px",
          "--vis-font-family": "var(--font-sans)"
        }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {
        id: unref(uniqueId),
        config: unref(config)
      }, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$3, { id: chartId.value }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/chart/ChartContainer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ChartLegendContent",
  __ssrInlineRender: true,
  props: {
    hideIcon: { type: Boolean },
    nameKey: {},
    verticalAlign: { default: "bottom" },
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { id, config } = useChart();
    const payload = computed(() => Object.entries(config.value).map(([key, value]) => {
      return {
        key: props.nameKey || key,
        itemConfig: config.value[key]
      };
    }));
    const containerSelector = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      if (containerSelector.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: unref(cn)(
            "flex items-center justify-center gap-4",
            __props.verticalAlign === "top" ? "pb-3" : "pt-3",
            props.class
          )
        }, _attrs))}><!--[-->`);
        ssrRenderList(payload.value, ({ key, itemConfig }) => {
          _push(`<div class="${ssrRenderClass(unref(cn)(
            "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
          ))}">`);
          if (itemConfig?.icon) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(itemConfig?.icon), null, null), _parent);
          } else {
            _push(`<div class="h-2 w-2 shrink-0 rounded-xs" style="${ssrRenderStyle({
              backgroundColor: itemConfig?.color
            })}"></div>`);
          }
          _push(` ${ssrInterpolate(itemConfig?.label)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/chart/ChartLegendContent.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ChartTooltipContent",
  __ssrInlineRender: true,
  props: {
    hideLabel: { type: Boolean },
    hideIndicator: { type: Boolean },
    indicator: { default: "dot" },
    nameKey: {},
    labelKey: {},
    labelFormatter: {},
    payload: { default: () => ({}) },
    config: { default: () => ({}) },
    class: { type: [Boolean, null, String, Object, Array] },
    color: {},
    x: {}
  },
  setup(__props) {
    const props = __props;
    const payload = computed(() => {
      return Object.entries(props.payload).map(([key, value]) => {
        const itemConfig = props.config[key];
        const indicatorColor = props.config[key]?.color ?? props.payload.fill;
        return { key, value, itemConfig, indicatorColor };
      }).filter((i) => i.itemConfig);
    });
    const nestLabel = computed(() => Object.keys(props.payload).length === 1 && props.indicator !== "dot");
    const tooltipLabel = computed(() => {
      if (props.hideLabel)
        return null;
      if (props.labelFormatter && props.x !== void 0) {
        return props.labelFormatter(props.x);
      }
      return props.labelKey ? props.config[props.labelKey]?.label || props.payload[props.labelKey] : props.x;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "border-border/50 bg-background gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl grid min-w-32 items-start",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        if (!nestLabel.value && tooltipLabel.value) {
          _push(`<div class="font-medium">${ssrInterpolate(tooltipLabel.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid gap-1.5"><!--[-->`);
        ssrRenderList(payload.value, ({ value, itemConfig, indicatorColor, key }) => {
          _push(`<div class="${ssrRenderClass(
            unref(cn)(
              "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
              __props.indicator === "dot" && "items-center"
            )
          )}">`);
          if (itemConfig?.icon) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(itemConfig.icon), null, null), _parent);
          } else if (!__props.hideIndicator) {
            _push(`<div class="${ssrRenderClass(unref(cn)(
              "shrink-0 rounded-xs border-(--color-border) bg-(--color-bg)",
              {
                "h-2.5 w-2.5": __props.indicator === "dot",
                "w-1": __props.indicator === "line",
                "w-0 border-[1.5px] border-dashed bg-transparent": __props.indicator === "dashed",
                "my-0.5": nestLabel.value && __props.indicator === "dashed"
              }
            ))}" style="${ssrRenderStyle({
              "--color-bg": indicatorColor,
              "--color-border": indicatorColor
            })}"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="${ssrRenderClass(unref(cn)("flex flex-1 justify-between leading-none", nestLabel.value ? "items-end" : "items-center"))}"><div class="grid gap-1.5">`);
          if (nestLabel.value) {
            _push(`<div class="font-medium">${ssrInterpolate(tooltipLabel.value)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="text-muted-foreground">${ssrInterpolate(itemConfig?.label || value)}</span></div>`);
          if (value) {
            _push(`<span class="text-foreground font-mono font-medium tabular-nums">${ssrInterpolate(value.toLocaleString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/chart/ChartTooltipContent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cache = /* @__PURE__ */ new Map();
function serializeKey(key) {
  return JSON.stringify(key, Object.keys(key).sort());
}
function componentToString(config, component, props) {
  if (!isClient)
    return;
  const id = useId();
  return (_data, x) => {
    const data = "data" in _data ? _data.data : _data;
    const serializedKey = `${id}-${serializeKey(data)}`;
    const cachedContent = cache.get(serializedKey);
    if (cachedContent)
      return cachedContent;
    const vnode = h(component, { ...props, payload: data, config, x });
    const div = (void 0).createElement("div");
    render(vnode, div);
    cache.set(serializedKey, div.innerHTML);
    return div.innerHTML;
  };
}
const THEMES = { light: "", dark: ".dark" };
const [useChart, provideChartContext] = createContext("Chart");

export { __nuxt_component_4 as _, _sfc_main$2 as a, _sfc_main as b, componentToString as c, _sfc_main$1 as d };
//# sourceMappingURL=index-B5_nd5la.mjs.map
