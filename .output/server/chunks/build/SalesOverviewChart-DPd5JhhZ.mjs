import { _ as _sfc_main$6, b as _sfc_main$1, c as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as __nuxt_component_4, a as _sfc_main$2$1, c as componentToString, b as _sfc_main$5 } from './index-B5_nd5la.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CjZdJj9x.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { defineComponent, ref, watch, computed, mergeProps, withCtx, createTextVNode, isRef, unref, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { VisXYContainer, VisArea, VisAxis, VisTooltip, VisCrosshair } from '@unovis/vue';
import { u as useSalesStore } from './store-B7fLulRe.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SalesOverviewChart",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useSalesStore();
    const period = ref("30d");
    watch(period, () => load());
    async function load() {
      try {
        await store.fetchSalesOverview({ period: period.value });
      } catch {
      }
    }
    const chartData = computed(() => store.salesOverview);
    console.log("chartData", chartData.value);
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "var(--chart-1)"
      }
    };
    const xNumTicks = computed(() => Math.min(chartData.value.length, 6));
    function toTime(value) {
      if (typeof value === "number") return value;
      const [y, m, d] = String(value).slice(0, 10).split("-").map(Number);
      return new Date(y || 0, (m || 1) - 1, d || 1).getTime();
    }
    function formatDateLabel(value) {
      if (typeof value === "number") {
        return new Date(value).toLocaleDateString(void 0, { month: "short", day: "numeric" });
      }
      const [y, m, d] = String(value).slice(0, 10).split("-").map(Number);
      if (!y || !m || !d)
        return String(value);
      return new Date(y, m - 1, d).toLocaleDateString(void 0, { month: "short", day: "numeric" });
    }
    function formatCompact(value) {
      return new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 }).format(value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_ChartPeriodSelect = __nuxt_component_4;
      const _component_UiCardContent = _sfc_main$4;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      _push(ssrRenderComponent(_component_UiCard, mergeProps({ class: "shadow-sm transition-shadow hover:shadow-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Sales Overview`);
                      } else {
                        return [
                          createTextVNode("Sales Overview")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Daily invoiced sales`);
                      } else {
                        return [
                          createTextVNode("Daily invoiced sales")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_ChartPeriodSelect, {
                    modelValue: unref(period),
                    "onUpdate:modelValue": ($event) => isRef(period) ? period.value = $event : null
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Sales Overview")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Daily invoiced sales")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_ChartPeriodSelect, {
                      modelValue: unref(period),
                      "onUpdate:modelValue": ($event) => isRef(period) ? period.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(store).salesOverviewLoading && unref(chartData).length === 0) {
                    _push3(`<div class="flex justify-center py-16"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(chartData).length === 0) {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No sales data",
                      description: "No invoices recorded in this period"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(_sfc_main$2$1), {
                      config: chartConfig,
                      class: "max-h-50 sm:max-h-88"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VisXYContainer), { data: unref(chartData) }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(VisArea), {
                                  x: (d) => toTime(d.date),
                                  y: (d) => d.sales,
                                  color: chartConfig.sales.color,
                                  opacity: 0.4
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "x",
                                  x: (d) => toTime(d.date),
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false,
                                  "num-ticks": unref(xNumTicks),
                                  "tick-format": (d) => formatDateLabel(d)
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "y",
                                  y: (d) => d.sales,
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "tick-format": (d) => formatCompact(d)
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisTooltip), null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$5), { labelKey: "date" }),
                                  color: [chartConfig.sales.color]
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(VisArea), {
                                    x: (d) => toTime(d.date),
                                    y: (d) => d.sales,
                                    color: chartConfig.sales.color,
                                    opacity: 0.4
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisAxis), {
                                    type: "x",
                                    x: (d) => toTime(d.date),
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": false,
                                    "num-ticks": unref(xNumTicks),
                                    "tick-format": (d) => formatDateLabel(d)
                                  }, null, 8, ["x", "num-ticks", "tick-format"]),
                                  createVNode(unref(VisAxis), {
                                    type: "y",
                                    y: (d) => d.sales,
                                    "num-ticks": 3,
                                    "tick-line": false,
                                    "domain-line": false,
                                    "tick-format": (d) => formatCompact(d)
                                  }, null, 8, ["y", "tick-format"]),
                                  createVNode(unref(VisTooltip)),
                                  createVNode(unref(VisCrosshair), {
                                    template: unref(componentToString)(chartConfig, unref(_sfc_main$5), { labelKey: "date" }),
                                    color: [chartConfig.sales.color]
                                  }, null, 8, ["template", "color"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(VisXYContainer), { data: unref(chartData) }, {
                              default: withCtx(() => [
                                createVNode(unref(VisArea), {
                                  x: (d) => toTime(d.date),
                                  y: (d) => d.sales,
                                  color: chartConfig.sales.color,
                                  opacity: 0.4
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisAxis), {
                                  type: "x",
                                  x: (d) => toTime(d.date),
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false,
                                  "num-ticks": unref(xNumTicks),
                                  "tick-format": (d) => formatDateLabel(d)
                                }, null, 8, ["x", "num-ticks", "tick-format"]),
                                createVNode(unref(VisAxis), {
                                  type: "y",
                                  y: (d) => d.sales,
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "tick-format": (d) => formatCompact(d)
                                }, null, 8, ["y", "tick-format"]),
                                createVNode(unref(VisTooltip)),
                                createVNode(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$5), { labelKey: "date" }),
                                  color: [chartConfig.sales.color]
                                }, null, 8, ["template", "color"])
                              ]),
                              _: 1
                            }, 8, ["data"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    unref(store).salesOverviewLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-16"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                      key: 1,
                      title: "No sales data",
                      description: "No invoices recorded in this period"
                    })) : (openBlock(), createBlock(unref(_sfc_main$2$1), {
                      key: 2,
                      config: chartConfig,
                      class: "max-h-50 sm:max-h-88"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(VisXYContainer), { data: unref(chartData) }, {
                          default: withCtx(() => [
                            createVNode(unref(VisArea), {
                              x: (d) => toTime(d.date),
                              y: (d) => d.sales,
                              color: chartConfig.sales.color,
                              opacity: 0.4
                            }, null, 8, ["x", "y", "color"]),
                            createVNode(unref(VisAxis), {
                              type: "x",
                              x: (d) => toTime(d.date),
                              "tick-line": false,
                              "domain-line": false,
                              "grid-line": false,
                              "num-ticks": unref(xNumTicks),
                              "tick-format": (d) => formatDateLabel(d)
                            }, null, 8, ["x", "num-ticks", "tick-format"]),
                            createVNode(unref(VisAxis), {
                              type: "y",
                              y: (d) => d.sales,
                              "num-ticks": 3,
                              "tick-line": false,
                              "domain-line": false,
                              "tick-format": (d) => formatCompact(d)
                            }, null, 8, ["y", "tick-format"]),
                            createVNode(unref(VisTooltip)),
                            createVNode(unref(VisCrosshair), {
                              template: unref(componentToString)(chartConfig, unref(_sfc_main$5), { labelKey: "date" }),
                              color: [chartConfig.sales.color]
                            }, null, 8, ["template", "color"])
                          ]),
                          _: 1
                        }, 8, ["data"])
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Sales Overview")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Daily invoiced sales")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_ChartPeriodSelect, {
                    modelValue: unref(period),
                    "onUpdate:modelValue": ($event) => isRef(period) ? period.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  unref(store).salesOverviewLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-16"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                    key: 1,
                    title: "No sales data",
                    description: "No invoices recorded in this period"
                  })) : (openBlock(), createBlock(unref(_sfc_main$2$1), {
                    key: 2,
                    config: chartConfig,
                    class: "max-h-50 sm:max-h-88"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(VisXYContainer), { data: unref(chartData) }, {
                        default: withCtx(() => [
                          createVNode(unref(VisArea), {
                            x: (d) => toTime(d.date),
                            y: (d) => d.sales,
                            color: chartConfig.sales.color,
                            opacity: 0.4
                          }, null, 8, ["x", "y", "color"]),
                          createVNode(unref(VisAxis), {
                            type: "x",
                            x: (d) => toTime(d.date),
                            "tick-line": false,
                            "domain-line": false,
                            "grid-line": false,
                            "num-ticks": unref(xNumTicks),
                            "tick-format": (d) => formatDateLabel(d)
                          }, null, 8, ["x", "num-ticks", "tick-format"]),
                          createVNode(unref(VisAxis), {
                            type: "y",
                            y: (d) => d.sales,
                            "num-ticks": 3,
                            "tick-line": false,
                            "domain-line": false,
                            "tick-format": (d) => formatCompact(d)
                          }, null, 8, ["y", "tick-format"]),
                          createVNode(unref(VisTooltip)),
                          createVNode(unref(VisCrosshair), {
                            template: unref(componentToString)(chartConfig, unref(_sfc_main$5), { labelKey: "date" }),
                            color: [chartConfig.sales.color]
                          }, null, 8, ["template", "color"])
                        ]),
                        _: 1
                      }, 8, ["data"])
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/sales/components/SalesOverviewChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SalesOverviewChart-DPd5JhhZ.mjs.map
