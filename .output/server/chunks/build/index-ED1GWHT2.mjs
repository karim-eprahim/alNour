import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$4, a as _sfc_main$4$1, d as _sfc_main$3$1 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as _sfc_main$5 } from './index-BJ9JiLtz.mjs';
import { b as useAuthStore, n as navigateTo } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, watch, computed, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { Package, DollarSign, HandCoins, ClipboardList, TrendingUp, Users, Clock, PlusCircle, CreditCard, Eye } from '@lucide/vue';
import { _ as __nuxt_component_4, a as _sfc_main$2$1, c as componentToString, b as _sfc_main$7 } from './index-B5_nd5la.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CjZdJj9x.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { Donut } from '@unovis/ts';
import { VisSingleContainer, VisDonut, VisTooltip, VisXYContainer, VisGroupedBar, VisAxis, VisCrosshair, VisArea } from '@unovis/vue';
import { u as useDistributorStore } from './store-vpQQl8Ls.mjs';
import 'class-variance-authority';
import '@vueuse/core';
import 'reka-ui';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jsonwebtoken';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'vue-sonner';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';
import './index-CUpQupPt.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DistributorOrderStatusChart",
  __ssrInlineRender: true,
  setup(__props) {
    const CHART_COLORS = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)"
    ];
    const STATUS_LABELS = {
      PENDING: "Pending",
      ASSIGNED: "Assigned",
      ACCEPTED: "Accepted",
      OUT_FOR_DELIVERY: "Out for Delivery",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled"
    };
    const store = useDistributorStore();
    const period = ref("30d");
    watch(period, () => load());
    async function load() {
      try {
        await store.fetchDashboard({ period: period.value });
      } catch {
      }
    }
    const chartData = computed(() => {
      const items = store.dashboard?.orderStatus || [];
      return items.sort((a, b) => b.count - a.count).map((item, i) => ({
        name: STATUS_LABELS[item.status] || item.status,
        value: item.count,
        fill: CHART_COLORS[i % CHART_COLORS.length]
      }));
    });
    const totalOrders = computed(() => chartData.value.reduce((sum, d) => sum + d.value, 0));
    const chartConfig = {
      value: {
        label: "Orders",
        color: void 0
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_ChartPeriodSelect = __nuxt_component_4;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      _push(ssrRenderComponent(_component_UiCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Order Status`);
                      } else {
                        return [
                          createTextVNode("Order Status")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Distribution of your assigned orders`);
                      } else {
                        return [
                          createTextVNode("Distribution of your assigned orders")
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
                          createTextVNode("Order Status")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Distribution of your assigned orders")
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
                  if (unref(store).dashboardLoading && unref(chartData).length === 0) {
                    _push3(`<div class="flex justify-center py-16"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(chartData).length === 0) {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No orders",
                      description: "No orders assigned in this period"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$2$1), {
                      config: chartConfig,
                      class: "mx-auto aspect-square max-h-[200px]"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VisSingleContainer), {
                            data: unref(chartData),
                            margin: { top: 20, bottom: 20 }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(VisDonut), {
                                  value: (d) => d.value,
                                  color: (d) => d.fill,
                                  "arc-width": 32
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisTooltip), {
                                  triggers: {
                                    [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$7), { hideLabel: true })
                                  }
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(VisDonut), {
                                    value: (d) => d.value,
                                    color: (d) => d.fill,
                                    "arc-width": 32
                                  }, null, 8, ["value", "color"]),
                                  createVNode(unref(VisTooltip), {
                                    triggers: {
                                      [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$7), { hideLabel: true })
                                    }
                                  }, null, 8, ["triggers"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(VisSingleContainer), {
                              data: unref(chartData),
                              margin: { top: 20, bottom: 20 }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(VisDonut), {
                                  value: (d) => d.value,
                                  color: (d) => d.fill,
                                  "arc-width": 32
                                }, null, 8, ["value", "color"]),
                                createVNode(unref(VisTooltip), {
                                  triggers: {
                                    [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$7), { hideLabel: true })
                                  }
                                }, null, 8, ["triggers"])
                              ]),
                              _: 1
                            }, 8, ["data"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="mt-4 space-y-1.5 border-t pt-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(chartData), (d) => {
                      _push3(`<div class="flex items-center justify-between text-sm"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><span class="size-2.5 shrink-0 rounded-xs" style="${ssrRenderStyle({ backgroundColor: d.fill })}"${_scopeId2}></span><span class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(d.name)}</span></div><span class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(d.value)}</span></div>`);
                    });
                    _push3(`<!--]--><div class="flex items-center justify-between border-t pt-2 text-sm"${_scopeId2}><span class="font-medium"${_scopeId2}>Total</span><span class="font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(unref(totalOrders))}</span></div></div><!--]-->`);
                  }
                } else {
                  return [
                    unref(store).dashboardLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-16"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                      key: 1,
                      title: "No orders",
                      description: "No orders assigned in this period"
                    })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                      createVNode(unref(_sfc_main$2$1), {
                        config: chartConfig,
                        class: "mx-auto aspect-square max-h-[200px]"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VisSingleContainer), {
                            data: unref(chartData),
                            margin: { top: 20, bottom: 20 }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VisDonut), {
                                value: (d) => d.value,
                                color: (d) => d.fill,
                                "arc-width": 32
                              }, null, 8, ["value", "color"]),
                              createVNode(unref(VisTooltip), {
                                triggers: {
                                  [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$7), { hideLabel: true })
                                }
                              }, null, 8, ["triggers"])
                            ]),
                            _: 1
                          }, 8, ["data"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "mt-4 space-y-1.5 border-t pt-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(chartData), (d) => {
                          return openBlock(), createBlock("div", {
                            key: d.name,
                            class: "flex items-center justify-between text-sm"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", {
                                class: "size-2.5 shrink-0 rounded-xs",
                                style: { backgroundColor: d.fill }
                              }, null, 4),
                              createVNode("span", { class: "text-muted-foreground" }, toDisplayString(d.name), 1)
                            ]),
                            createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(d.value), 1)
                          ]);
                        }), 128)),
                        createVNode("div", { class: "flex items-center justify-between border-t pt-2 text-sm" }, [
                          createVNode("span", { class: "font-medium" }, "Total"),
                          createVNode("span", { class: "font-bold tabular-nums" }, toDisplayString(unref(totalOrders)), 1)
                        ])
                      ])
                    ], 64))
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
                        createTextVNode("Order Status")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Distribution of your assigned orders")
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
                  unref(store).dashboardLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-16"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                    key: 1,
                    title: "No orders",
                    description: "No orders assigned in this period"
                  })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createVNode(unref(_sfc_main$2$1), {
                      config: chartConfig,
                      class: "mx-auto aspect-square max-h-[200px]"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(VisSingleContainer), {
                          data: unref(chartData),
                          margin: { top: 20, bottom: 20 }
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VisDonut), {
                              value: (d) => d.value,
                              color: (d) => d.fill,
                              "arc-width": 32
                            }, null, 8, ["value", "color"]),
                            createVNode(unref(VisTooltip), {
                              triggers: {
                                [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$7), { hideLabel: true })
                              }
                            }, null, 8, ["triggers"])
                          ]),
                          _: 1
                        }, 8, ["data"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-4 space-y-1.5 border-t pt-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(chartData), (d) => {
                        return openBlock(), createBlock("div", {
                          key: d.name,
                          class: "flex items-center justify-between text-sm"
                        }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("span", {
                              class: "size-2.5 shrink-0 rounded-xs",
                              style: { backgroundColor: d.fill }
                            }, null, 4),
                            createVNode("span", { class: "text-muted-foreground" }, toDisplayString(d.name), 1)
                          ]),
                          createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(d.value), 1)
                        ]);
                      }), 128)),
                      createVNode("div", { class: "flex items-center justify-between border-t pt-2 text-sm" }, [
                        createVNode("span", { class: "font-medium" }, "Total"),
                        createVNode("span", { class: "font-bold tabular-nums" }, toDisplayString(unref(totalOrders)), 1)
                      ])
                    ])
                  ], 64))
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/distributor/components/DistributorOrderStatusChart.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DistributorPerformanceChart",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const period = ref("30d");
    watch(period, () => load());
    async function load() {
      try {
        await store.fetchDashboard({ period: period.value });
      } catch {
      }
    }
    const chartData = computed(() => {
      const performance = store.dashboard?.performance;
      if (!performance)
        return [];
      return [
        { category: "Orders", value: performance.orders, fill: "var(--chart-1)" },
        { category: "Delivered", value: performance.delivered, fill: "var(--chart-2)" }
      ];
    });
    const salesAmount = computed(() => store.dashboard?.performance.salesAmount || 0);
    const deliveredRate = computed(() => store.dashboard?.performance.deliveredRate || 0);
    function formatCategoryLabel(value) {
      return chartData.value[value]?.category ?? String(value);
    }
    const chartConfig = {
      value: {
        label: "Count",
        color: void 0
      }
    };
    function formatMoney(value) {
      return new Intl.NumberFormat(void 0, { maximumFractionDigits: 2 }).format(value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_ChartPeriodSelect = __nuxt_component_4;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      _push(ssrRenderComponent(_component_UiCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Performance`);
                      } else {
                        return [
                          createTextVNode("Performance")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Orders vs delivered this period`);
                      } else {
                        return [
                          createTextVNode("Orders vs delivered this period")
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
                          createTextVNode("Performance")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Orders vs delivered this period")
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
                  if (unref(store).dashboardLoading && unref(chartData).length === 0) {
                    _push3(`<div class="flex justify-center py-16"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(chartData).length === 0) {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No orders",
                      description: "No assigned orders in this period"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$2$1), { config: chartConfig }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VisXYContainer), {
                            data: unref(chartData),
                            margin: { left: -24 },
                            "y-domain": [0, void 0]
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(VisGroupedBar), {
                                  x: (d, i) => i,
                                  y: (d) => d.value,
                                  color: (d) => d.fill,
                                  "rounded-corners": 10
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "x",
                                  x: (d, i) => i,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false,
                                  "tick-values": unref(chartData).map((_5, i) => i),
                                  "tick-format": (d) => formatCategoryLabel(d)
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "y",
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisTooltip), null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "category" }),
                                  color: "#0000"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(VisGroupedBar), {
                                    x: (d, i) => i,
                                    y: (d) => d.value,
                                    color: (d) => d.fill,
                                    "rounded-corners": 10
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisAxis), {
                                    type: "x",
                                    x: (d, i) => i,
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": false,
                                    "tick-values": unref(chartData).map((_5, i) => i),
                                    "tick-format": (d) => formatCategoryLabel(d)
                                  }, null, 8, ["x", "tick-values", "tick-format"]),
                                  createVNode(unref(VisAxis), {
                                    type: "y",
                                    "num-ticks": 3,
                                    "tick-line": false,
                                    "domain-line": false
                                  }),
                                  createVNode(unref(VisTooltip)),
                                  createVNode(unref(VisCrosshair), {
                                    template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "category" }),
                                    color: "#0000"
                                  }, null, 8, ["template"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(VisXYContainer), {
                              data: unref(chartData),
                              margin: { left: -24 },
                              "y-domain": [0, void 0]
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(VisGroupedBar), {
                                  x: (d, i) => i,
                                  y: (d) => d.value,
                                  color: (d) => d.fill,
                                  "rounded-corners": 10
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisAxis), {
                                  type: "x",
                                  x: (d, i) => i,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false,
                                  "tick-values": unref(chartData).map((_4, i) => i),
                                  "tick-format": (d) => formatCategoryLabel(d)
                                }, null, 8, ["x", "tick-values", "tick-format"]),
                                createVNode(unref(VisAxis), {
                                  type: "y",
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false
                                }),
                                createVNode(unref(VisTooltip)),
                                createVNode(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "category" }),
                                  color: "#0000"
                                }, null, 8, ["template"])
                              ]),
                              _: 1
                            }, 8, ["data"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="mt-4 grid grid-cols-2 gap-4 border-t pt-4"${_scopeId2}><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Total Sales</p><p class="text-lg font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(formatMoney(unref(salesAmount)))}</p></div><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Delivery Rate</p><p class="text-lg font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(unref(deliveredRate))}%</p></div></div><!--]-->`);
                  }
                } else {
                  return [
                    unref(store).dashboardLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-16"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                      key: 1,
                      title: "No orders",
                      description: "No assigned orders in this period"
                    })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                      createVNode(unref(_sfc_main$2$1), { config: chartConfig }, {
                        default: withCtx(() => [
                          createVNode(unref(VisXYContainer), {
                            data: unref(chartData),
                            margin: { left: -24 },
                            "y-domain": [0, void 0]
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VisGroupedBar), {
                                x: (d, i) => i,
                                y: (d) => d.value,
                                color: (d) => d.fill,
                                "rounded-corners": 10
                              }, null, 8, ["x", "y", "color"]),
                              createVNode(unref(VisAxis), {
                                type: "x",
                                x: (d, i) => i,
                                "tick-line": false,
                                "domain-line": false,
                                "grid-line": false,
                                "tick-values": unref(chartData).map((_3, i) => i),
                                "tick-format": (d) => formatCategoryLabel(d)
                              }, null, 8, ["x", "tick-values", "tick-format"]),
                              createVNode(unref(VisAxis), {
                                type: "y",
                                "num-ticks": 3,
                                "tick-line": false,
                                "domain-line": false
                              }),
                              createVNode(unref(VisTooltip)),
                              createVNode(unref(VisCrosshair), {
                                template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "category" }),
                                color: "#0000"
                              }, null, 8, ["template"])
                            ]),
                            _: 1
                          }, 8, ["data"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "mt-4 grid grid-cols-2 gap-4 border-t pt-4" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Sales"),
                          createVNode("p", { class: "text-lg font-bold tabular-nums" }, toDisplayString(formatMoney(unref(salesAmount))), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Delivery Rate"),
                          createVNode("p", { class: "text-lg font-bold tabular-nums" }, toDisplayString(unref(deliveredRate)) + "%", 1)
                        ])
                      ])
                    ], 64))
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
                        createTextVNode("Performance")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Orders vs delivered this period")
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
                  unref(store).dashboardLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-16"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                    key: 1,
                    title: "No orders",
                    description: "No assigned orders in this period"
                  })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createVNode(unref(_sfc_main$2$1), { config: chartConfig }, {
                      default: withCtx(() => [
                        createVNode(unref(VisXYContainer), {
                          data: unref(chartData),
                          margin: { left: -24 },
                          "y-domain": [0, void 0]
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VisGroupedBar), {
                              x: (d, i) => i,
                              y: (d) => d.value,
                              color: (d) => d.fill,
                              "rounded-corners": 10
                            }, null, 8, ["x", "y", "color"]),
                            createVNode(unref(VisAxis), {
                              type: "x",
                              x: (d, i) => i,
                              "tick-line": false,
                              "domain-line": false,
                              "grid-line": false,
                              "tick-values": unref(chartData).map((_2, i) => i),
                              "tick-format": (d) => formatCategoryLabel(d)
                            }, null, 8, ["x", "tick-values", "tick-format"]),
                            createVNode(unref(VisAxis), {
                              type: "y",
                              "num-ticks": 3,
                              "tick-line": false,
                              "domain-line": false
                            }),
                            createVNode(unref(VisTooltip)),
                            createVNode(unref(VisCrosshair), {
                              template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "category" }),
                              color: "#0000"
                            }, null, 8, ["template"])
                          ]),
                          _: 1
                        }, 8, ["data"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-4 grid grid-cols-2 gap-4 border-t pt-4" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Sales"),
                        createVNode("p", { class: "text-lg font-bold tabular-nums" }, toDisplayString(formatMoney(unref(salesAmount))), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Delivery Rate"),
                        createVNode("p", { class: "text-lg font-bold tabular-nums" }, toDisplayString(unref(deliveredRate)) + "%", 1)
                      ])
                    ])
                  ], 64))
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/distributor/components/DistributorPerformanceChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DistributorDeliveriesChart",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const period = ref("30d");
    watch(period, () => load());
    async function load() {
      try {
        await store.fetchDashboard({ period: period.value });
      } catch {
      }
    }
    const chartData = computed(() => store.dashboard?.deliveries || []);
    const chartConfig = {
      delivered: {
        label: "Delivered",
        color: "var(--chart-2)"
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_ChartPeriodSelect = __nuxt_component_4;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      _push(ssrRenderComponent(_component_UiCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Deliveries`);
                      } else {
                        return [
                          createTextVNode("Deliveries")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Completed deliveries per day`);
                      } else {
                        return [
                          createTextVNode("Completed deliveries per day")
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
                          createTextVNode("Deliveries")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Completed deliveries per day")
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
                  if (unref(store).dashboardLoading && unref(chartData).length === 0) {
                    _push3(`<div class="flex justify-center py-16"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(chartData).length === 0) {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No deliveries",
                      description: "No completed deliveries in this period"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(_sfc_main$2$1), { config: chartConfig }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VisXYContainer), { data: unref(chartData) }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(VisArea), {
                                  x: (d) => toTime(d.date),
                                  y: (d) => d.delivered,
                                  color: chartConfig.delivered.color,
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
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisTooltip), null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "date" }),
                                  color: [chartConfig.delivered.color]
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(VisArea), {
                                    x: (d) => toTime(d.date),
                                    y: (d) => d.delivered,
                                    color: chartConfig.delivered.color,
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
                                    "num-ticks": 3,
                                    "tick-line": false,
                                    "domain-line": false
                                  }),
                                  createVNode(unref(VisTooltip)),
                                  createVNode(unref(VisCrosshair), {
                                    template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "date" }),
                                    color: [chartConfig.delivered.color]
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
                                  y: (d) => d.delivered,
                                  color: chartConfig.delivered.color,
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
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false
                                }),
                                createVNode(unref(VisTooltip)),
                                createVNode(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "date" }),
                                  color: [chartConfig.delivered.color]
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
                    unref(store).dashboardLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-16"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                      key: 1,
                      title: "No deliveries",
                      description: "No completed deliveries in this period"
                    })) : (openBlock(), createBlock(unref(_sfc_main$2$1), {
                      key: 2,
                      config: chartConfig
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(VisXYContainer), { data: unref(chartData) }, {
                          default: withCtx(() => [
                            createVNode(unref(VisArea), {
                              x: (d) => toTime(d.date),
                              y: (d) => d.delivered,
                              color: chartConfig.delivered.color,
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
                              "num-ticks": 3,
                              "tick-line": false,
                              "domain-line": false
                            }),
                            createVNode(unref(VisTooltip)),
                            createVNode(unref(VisCrosshair), {
                              template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "date" }),
                              color: [chartConfig.delivered.color]
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
                        createTextVNode("Deliveries")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Completed deliveries per day")
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
                  unref(store).dashboardLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-16"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                    key: 1,
                    title: "No deliveries",
                    description: "No completed deliveries in this period"
                  })) : (openBlock(), createBlock(unref(_sfc_main$2$1), {
                    key: 2,
                    config: chartConfig
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(VisXYContainer), { data: unref(chartData) }, {
                        default: withCtx(() => [
                          createVNode(unref(VisArea), {
                            x: (d) => toTime(d.date),
                            y: (d) => d.delivered,
                            color: chartConfig.delivered.color,
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
                            "num-ticks": 3,
                            "tick-line": false,
                            "domain-line": false
                          }),
                          createVNode(unref(VisTooltip)),
                          createVNode(unref(VisCrosshair), {
                            template: unref(componentToString)(chartConfig, unref(_sfc_main$7), { labelKey: "date" }),
                            color: [chartConfig.delivered.color]
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/distributor/components/DistributorDeliveriesChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const todaySales = ref(0);
    ref(0);
    const recentCustomers = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$4;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiBadge = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Dashboard</h1><p class="text-sm text-muted-foreground">Welcome back, ${ssrInterpolate(("useAuthStore" in _ctx ? _ctx.useAuthStore : unref(useAuthStore))().user?.name)}</p></div></div><div class="grid gap-4 grid-cols-2 lg:grid-cols-4">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`My Stock`);
                      } else {
                        return [
                          createTextVNode("My Stock")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Package), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("My Stock")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Package), { class: "size-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(store).custodyTotalItems)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(store).custodies.length)} products</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(store).custodyTotalItems), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(store).custodies.length) + " products", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("My Stock")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Package), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(store).custodyTotalItems), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(store).custodies.length) + " products", 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cash On Hand`);
                      } else {
                        return [
                          createTextVNode("Cash On Hand")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(DollarSign), { class: "size-4 text-green-500" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Cash On Hand")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(DollarSign), { class: "size-4 text-green-500" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(unref(store).cashOnHand)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Available cash</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(unref(store).cashOnHand), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Available cash")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Cash On Hand")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(DollarSign), { class: "size-4 text-green-500" })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(unref(store).cashOnHand), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Available cash")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, {
        class: "cursor-pointer transition-colors hover:bg-accent/50",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/settlements")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Distributor Custody`);
                      } else {
                        return [
                          createTextVNode("Distributor Custody")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(HandCoins), { class: "size-4 text-amber-500" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Distributor Custody")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(HandCoins), { class: "size-4 text-amber-500" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold text-amber-600 dark:text-amber-400"${_scopeId2}>${ssrInterpolate(Number(unref(store).custodyBalance).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Available to settle</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold text-amber-600 dark:text-amber-400" }, toDisplayString(Number(unref(store).custodyBalance).toFixed(2)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Available to settle")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Distributor Custody")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(HandCoins), { class: "size-4 text-amber-500" })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold text-amber-600 dark:text-amber-400" }, toDisplayString(Number(unref(store).custodyBalance).toFixed(2)), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Available to settle")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Assigned Orders`);
                      } else {
                        return [
                          createTextVNode("Assigned Orders")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ClipboardList), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Assigned Orders")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ClipboardList), { class: "size-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(store).orders.length)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Pending delivery</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(store).orders.length), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Pending delivery")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Assigned Orders")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ClipboardList), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(store).orders.length), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Pending delivery")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Today&#39;s Sales`);
                      } else {
                        return [
                          createTextVNode("Today's Sales")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(TrendingUp), { class: "size-4 text-blue-500" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Today's Sales")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TrendingUp), { class: "size-4 text-blue-500" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold text-blue-600"${_scopeId2}>${ssrInterpolate(unref(todaySales).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Total invoiced today</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold text-blue-600" }, toDisplayString(unref(todaySales).toFixed(2)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Total invoiced today")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Today's Sales")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(TrendingUp), { class: "size-4 text-blue-500" })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold text-blue-600" }, toDisplayString(unref(todaySales).toFixed(2)), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Total invoiced today")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid gap-6 lg:grid-cols-2">`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="grid gap-6 lg:grid-cols-2">`);
      if (unref(store).orders.length > 0) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Active Orders`);
                        } else {
                          return [
                            createTextVNode("Active Orders")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Orders assigned to you that need delivery`);
                        } else {
                          return [
                            createTextVNode("Orders assigned to you that need delivery")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx(() => [
                          createTextVNode("Active Orders")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Orders assigned to you that need delivery")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(store).orders.slice(0, 5), (order) => {
                      _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div class="min-w-0 flex-1"${_scopeId2}><p class="text-sm font-medium truncate"${_scopeId2}>${ssrInterpolate(order.orderNumber)}</p><p class="text-xs text-muted-foreground truncate"${_scopeId2}>${ssrInterpolate(order.customer?.name)}</p></div><div class="flex items-center gap-2 shrink-0"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiBadge, {
                        variant: "secondary",
                        class: "text-[10px]"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(order.status)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(order.status), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<p class="text-sm font-semibold"${_scopeId2}>${ssrInterpolate(Number(order.totalAmount).toFixed(2))}</p></div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(store).orders.slice(0, 5), (order) => {
                        return openBlock(), createBlock("div", {
                          key: order.id,
                          class: "flex items-center justify-between rounded-lg border p-3"
                        }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(order.orderNumber), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground truncate" }, toDisplayString(order.customer?.name), 1)
                          ]),
                          createVNode("div", { class: "flex items-center gap-2 shrink-0" }, [
                            createVNode(_component_UiBadge, {
                              variant: "secondary",
                              class: "text-[10px]"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(order.status), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode("p", { class: "text-sm font-semibold" }, toDisplayString(Number(order.totalAmount).toFixed(2)), 1)
                          ])
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Active Orders")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Orders assigned to you that need delivery")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(store).orders.slice(0, 5), (order) => {
                      return openBlock(), createBlock("div", {
                        key: order.id,
                        class: "flex items-center justify-between rounded-lg border p-3"
                      }, [
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(order.orderNumber), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground truncate" }, toDisplayString(order.customer?.name), 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-2 shrink-0" }, [
                          createVNode(_component_UiBadge, {
                            variant: "secondary",
                            class: "text-[10px]"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(order.status), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("p", { class: "text-sm font-semibold" }, toDisplayString(Number(order.totalAmount).toFixed(2)), 1)
                        ])
                      ]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(recentCustomers).length > 0) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Users), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` Recent Customers `);
                        } else {
                          return [
                            createVNode(unref(Users), { class: "size-4" }),
                            createTextVNode(" Recent Customers ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Your most recent sales`);
                        } else {
                          return [
                            createTextVNode("Your most recent sales")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                        default: withCtx(() => [
                          createVNode(unref(Users), { class: "size-4" }),
                          createTextVNode(" Recent Customers ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Your most recent sales")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(recentCustomers).slice(0, 5), (c) => {
                      _push3(`<div class="flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors hover:bg-accent/50"${_scopeId2}><div class="min-w-0 flex-1"${_scopeId2}><p class="text-sm font-medium truncate"${_scopeId2}>${ssrInterpolate(c.name)}</p><p class="text-xs text-muted-foreground flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Clock), { class: "size-3" }, null, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(new Date(c.lastVisit).toLocaleDateString())}</p></div><div class="text-right shrink-0 ml-2"${_scopeId2}><p class="${ssrRenderClass([(c.balance || 0) > 0 ? "text-green-600" : "", "text-sm font-semibold"])}"${_scopeId2}>${ssrInterpolate(Number(c.balance || 0).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(c.invoiceCount || 0)} invoices</p></div></div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(recentCustomers).slice(0, 5), (c) => {
                        return openBlock(), createBlock("div", {
                          key: c.id,
                          class: "flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors hover:bg-accent/50",
                          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/distributor/contacts/${c.id}`)
                        }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(c.name), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground flex items-center gap-1" }, [
                              createVNode(unref(Clock), { class: "size-3" }),
                              createTextVNode(" " + toDisplayString(new Date(c.lastVisit).toLocaleDateString()), 1)
                            ])
                          ]),
                          createVNode("div", { class: "text-right shrink-0 ml-2" }, [
                            createVNode("p", {
                              class: ["text-sm font-semibold", (c.balance || 0) > 0 ? "text-green-600" : ""]
                            }, toDisplayString(Number(c.balance || 0).toFixed(2)), 3),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(c.invoiceCount || 0) + " invoices", 1)
                          ])
                        ], 8, ["onClick"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "flex items-center gap-2 text-base" }, {
                      default: withCtx(() => [
                        createVNode(unref(Users), { class: "size-4" }),
                        createTextVNode(" Recent Customers ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Your most recent sales")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-2" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(recentCustomers).slice(0, 5), (c) => {
                      return openBlock(), createBlock("div", {
                        key: c.id,
                        class: "flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors hover:bg-accent/50",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/distributor/contacts/${c.id}`)
                      }, [
                        createVNode("div", { class: "min-w-0 flex-1" }, [
                          createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(c.name), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground flex items-center gap-1" }, [
                            createVNode(unref(Clock), { class: "size-3" }),
                            createTextVNode(" " + toDisplayString(new Date(c.lastVisit).toLocaleDateString()), 1)
                          ])
                        ]),
                        createVNode("div", { class: "text-right shrink-0 ml-2" }, [
                          createVNode("p", {
                            class: ["text-sm font-semibold", (c.balance || 0) > 0 ? "text-green-600" : ""]
                          }, toDisplayString(Number(c.balance || 0).toFixed(2)), 3),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(c.invoiceCount || 0) + " invoices", 1)
                        ])
                      ], 8, ["onClick"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid gap-4 sm:grid-cols-3">`);
      _push(ssrRenderComponent(_component_UiCard, {
        class: "cursor-pointer transition-colors hover:bg-accent/50",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/sales/new")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex flex-col items-center gap-2 py-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(PlusCircle), { class: "size-8 text-primary" }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm font-medium"${_scopeId2}>New Sale</p><p class="text-xs text-muted-foreground text-center"${_scopeId2}>Create a direct invoice</p>`);
                } else {
                  return [
                    createVNode(unref(PlusCircle), { class: "size-8 text-primary" }),
                    createVNode("p", { class: "text-sm font-medium" }, "New Sale"),
                    createVNode("p", { class: "text-xs text-muted-foreground text-center" }, "Create a direct invoice")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "flex flex-col items-center gap-2 py-6" }, {
                default: withCtx(() => [
                  createVNode(unref(PlusCircle), { class: "size-8 text-primary" }),
                  createVNode("p", { class: "text-sm font-medium" }, "New Sale"),
                  createVNode("p", { class: "text-xs text-muted-foreground text-center" }, "Create a direct invoice")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, {
        class: "cursor-pointer transition-colors hover:bg-accent/50",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/payments")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex flex-col items-center gap-2 py-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CreditCard), { class: "size-8 text-primary" }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm font-medium"${_scopeId2}>Collect Payment</p><p class="text-xs text-muted-foreground text-center"${_scopeId2}>Record a payment</p>`);
                } else {
                  return [
                    createVNode(unref(CreditCard), { class: "size-8 text-primary" }),
                    createVNode("p", { class: "text-sm font-medium" }, "Collect Payment"),
                    createVNode("p", { class: "text-xs text-muted-foreground text-center" }, "Record a payment")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "flex flex-col items-center gap-2 py-6" }, {
                default: withCtx(() => [
                  createVNode(unref(CreditCard), { class: "size-8 text-primary" }),
                  createVNode("p", { class: "text-sm font-medium" }, "Collect Payment"),
                  createVNode("p", { class: "text-xs text-muted-foreground text-center" }, "Record a payment")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, {
        class: "cursor-pointer transition-colors hover:bg-accent/50",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/orders")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex flex-col items-center gap-2 py-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Eye), { class: "size-8 text-primary" }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-sm font-medium"${_scopeId2}>View Orders</p><p class="text-xs text-muted-foreground text-center"${_scopeId2}>See assigned orders</p>`);
                } else {
                  return [
                    createVNode(unref(Eye), { class: "size-8 text-primary" }),
                    createVNode("p", { class: "text-sm font-medium" }, "View Orders"),
                    createVNode("p", { class: "text-xs text-muted-foreground text-center" }, "See assigned orders")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "flex flex-col items-center gap-2 py-6" }, {
                default: withCtx(() => [
                  createVNode(unref(Eye), { class: "size-8 text-primary" }),
                  createVNode("p", { class: "text-sm font-medium" }, "View Orders"),
                  createVNode("p", { class: "text-xs text-muted-foreground text-center" }, "See assigned orders")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ED1GWHT2.mjs.map
