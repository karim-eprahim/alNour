import { _ as _sfc_main$5 } from './index-CUpQupPt.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CjZdJj9x.mjs';
import { _ as _sfc_main$6, a as _sfc_main$4$1, b as _sfc_main$1$1, c as _sfc_main$7, d as _sfc_main$3$1 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CAjNCayq.mjs';
import { _ as _sfc_main$9 } from './index-BJ9JiLtz.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, resolveDynamicComponent, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, watch, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderVNode, ssrRenderStyle } from 'vue/server-renderer';
import { Truck, ShoppingBag, DollarSign, Wallet, TrendingUp, Scale, Package, AlertTriangle, Warehouse, HandCoins, Users, Briefcase, RefreshCw, ArrowUp, ArrowDown, Receipt } from '@lucide/vue';
import { M as MOVEMENT_TYPES } from './type-x9vthGPe.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { _ as _sfc_main$8 } from './SalesOverviewChart-DPd5JhhZ.mjs';
import { a as _sfc_main$2$1, c as componentToString, b as _sfc_main$a, _ as __nuxt_component_4, d as _sfc_main$1$2 } from './index-B5_nd5la.mjs';
import { VisSingleContainer, VisDonut, VisTooltip, VisXYContainer, VisGroupedBar, VisAxis, VisCrosshair, VisLine } from '@unovis/vue';
import { u as useSalesStore } from './store-B7fLulRe.mjs';
import { Donut } from '@unovis/ts';
import { u as useStockStore } from './store-BxA_JtAf.mjs';
import { defineStore } from 'pinia';
import { b as useAuthStore, c as usePermissions } from './server.mjs';
import 'class-variance-authority';
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
import '@vueuse/core';
import './api-BBrn-wQZ.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import 'vue-sonner';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SalesByProductChart",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useSalesStore();
    const period = ref("30d");
    watch(period, () => load());
    async function load() {
      try {
        await store.fetchSalesByProduct({ period: period.value, limit: 8 });
      } catch {
      }
    }
    const chartData = computed(() => store.salesByProduct);
    const chartConfig = {
      sales: {
        label: "Sales",
        color: "var(--chart-1)"
      }
    };
    const xNumTicks = computed(() => Math.min(chartData.value.length, 8));
    function truncateLabel(value) {
      const label = String(value);
      return label.length > 14 ? `${label.slice(0, 14)}…` : label;
    }
    function formatProductLabel(value) {
      return truncateLabel(chartData.value[value]?.product ?? String(value));
    }
    function formatCompact(value) {
      return new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 }).format(value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$7;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_ChartPeriodSelect = __nuxt_component_4;
      const _component_UiCardContent = _sfc_main$4$1;
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
                        _push4(`Sales By Product`);
                      } else {
                        return [
                          createTextVNode("Sales By Product")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Top selling products by revenue`);
                      } else {
                        return [
                          createTextVNode("Top selling products by revenue")
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
                          createTextVNode("Sales By Product")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Top selling products by revenue")
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
                  if (unref(store).salesByProductLoading && unref(chartData).length === 0) {
                    _push3(`<div class="flex justify-center py-16"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(chartData).length === 0) {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No sales data",
                      description: "No products sold in this period"
                    }, null, _parent3, _scopeId2));
                  } else {
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
                                  y: (d) => d.sales,
                                  color: chartConfig.sales.color,
                                  "rounded-corners": 10
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "x",
                                  x: (d, i) => i,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false,
                                  "num-ticks": unref(xNumTicks),
                                  "tick-values": unref(chartData).map((_5, i) => i),
                                  "tick-format": (d) => formatProductLabel(d)
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "y",
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "tick-format": (d) => formatCompact(d)
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisTooltip), null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true }),
                                  color: "#0000"
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(VisGroupedBar), {
                                    x: (d, i) => i,
                                    y: (d) => d.sales,
                                    color: chartConfig.sales.color,
                                    "rounded-corners": 10
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisAxis), {
                                    type: "x",
                                    x: (d, i) => i,
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": false,
                                    "num-ticks": unref(xNumTicks),
                                    "tick-values": unref(chartData).map((_5, i) => i),
                                    "tick-format": (d) => formatProductLabel(d)
                                  }, null, 8, ["x", "num-ticks", "tick-values", "tick-format"]),
                                  createVNode(unref(VisAxis), {
                                    type: "y",
                                    "num-ticks": 3,
                                    "tick-line": false,
                                    "domain-line": false,
                                    "tick-format": (d) => formatCompact(d)
                                  }, null, 8, ["tick-format"]),
                                  createVNode(unref(VisTooltip)),
                                  createVNode(unref(VisCrosshair), {
                                    template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true }),
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
                                  y: (d) => d.sales,
                                  color: chartConfig.sales.color,
                                  "rounded-corners": 10
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisAxis), {
                                  type: "x",
                                  x: (d, i) => i,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false,
                                  "num-ticks": unref(xNumTicks),
                                  "tick-values": unref(chartData).map((_4, i) => i),
                                  "tick-format": (d) => formatProductLabel(d)
                                }, null, 8, ["x", "num-ticks", "tick-values", "tick-format"]),
                                createVNode(unref(VisAxis), {
                                  type: "y",
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "tick-format": (d) => formatCompact(d)
                                }, null, 8, ["tick-format"]),
                                createVNode(unref(VisTooltip)),
                                createVNode(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true }),
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
                  }
                } else {
                  return [
                    unref(store).salesByProductLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-16"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                      key: 1,
                      title: "No sales data",
                      description: "No products sold in this period"
                    })) : (openBlock(), createBlock(unref(_sfc_main$2$1), {
                      key: 2,
                      config: chartConfig
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(VisXYContainer), {
                          data: unref(chartData),
                          margin: { left: -24 },
                          "y-domain": [0, void 0]
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VisGroupedBar), {
                              x: (d, i) => i,
                              y: (d) => d.sales,
                              color: chartConfig.sales.color,
                              "rounded-corners": 10
                            }, null, 8, ["x", "y", "color"]),
                            createVNode(unref(VisAxis), {
                              type: "x",
                              x: (d, i) => i,
                              "tick-line": false,
                              "domain-line": false,
                              "grid-line": false,
                              "num-ticks": unref(xNumTicks),
                              "tick-values": unref(chartData).map((_3, i) => i),
                              "tick-format": (d) => formatProductLabel(d)
                            }, null, 8, ["x", "num-ticks", "tick-values", "tick-format"]),
                            createVNode(unref(VisAxis), {
                              type: "y",
                              "num-ticks": 3,
                              "tick-line": false,
                              "domain-line": false,
                              "tick-format": (d) => formatCompact(d)
                            }, null, 8, ["tick-format"]),
                            createVNode(unref(VisTooltip)),
                            createVNode(unref(VisCrosshair), {
                              template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true }),
                              color: "#0000"
                            }, null, 8, ["template"])
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
                        createTextVNode("Sales By Product")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Top selling products by revenue")
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
                  unref(store).salesByProductLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-16"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                    key: 1,
                    title: "No sales data",
                    description: "No products sold in this period"
                  })) : (openBlock(), createBlock(unref(_sfc_main$2$1), {
                    key: 2,
                    config: chartConfig
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(VisXYContainer), {
                        data: unref(chartData),
                        margin: { left: -24 },
                        "y-domain": [0, void 0]
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VisGroupedBar), {
                            x: (d, i) => i,
                            y: (d) => d.sales,
                            color: chartConfig.sales.color,
                            "rounded-corners": 10
                          }, null, 8, ["x", "y", "color"]),
                          createVNode(unref(VisAxis), {
                            type: "x",
                            x: (d, i) => i,
                            "tick-line": false,
                            "domain-line": false,
                            "grid-line": false,
                            "num-ticks": unref(xNumTicks),
                            "tick-values": unref(chartData).map((_2, i) => i),
                            "tick-format": (d) => formatProductLabel(d)
                          }, null, 8, ["x", "num-ticks", "tick-values", "tick-format"]),
                          createVNode(unref(VisAxis), {
                            type: "y",
                            "num-ticks": 3,
                            "tick-line": false,
                            "domain-line": false,
                            "tick-format": (d) => formatCompact(d)
                          }, null, 8, ["tick-format"]),
                          createVNode(unref(VisTooltip)),
                          createVNode(unref(VisCrosshair), {
                            template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true }),
                            color: "#0000"
                          }, null, 8, ["template"])
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/sales/components/SalesByProductChart.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const TOP_N = 8;
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "InventoryDistributionChart",
  __ssrInlineRender: true,
  setup(__props) {
    const CHART_COLORS = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)"
    ];
    const store = useStockStore();
    const chartData = computed(() => {
      const items = store.stockDistribution;
      if (items.length === 0)
        return [];
      const top = items.slice(0, TOP_N);
      const rest = items.slice(TOP_N).reduce((sum, d) => sum + d.value, 0);
      const rows = rest > 0 ? [...top, { product: "Other", value: rest }] : top;
      return rows.map((d, i) => ({
        name: d.product,
        value: d.value,
        fill: CHART_COLORS[i % CHART_COLORS.length]
      }));
    });
    const totalQuantity = computed(() => chartData.value.reduce((sum, d) => sum + d.value, 0));
    const chartConfig = {
      value: {
        label: "Quantity",
        color: void 0
      }
    };
    function formatQuantity(value) {
      return new Intl.NumberFormat(void 0, { maximumFractionDigits: 3 }).format(value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$7;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      _push(ssrRenderComponent(_component_UiCard, mergeProps({ class: "shadow-sm transition-shadow hover:shadow-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Inventory Distribution`);
                      } else {
                        return [
                          createTextVNode("Inventory Distribution")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Stock quantity by product across warehouses`);
                      } else {
                        return [
                          createTextVNode("Stock quantity by product across warehouses")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Inventory Distribution")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Stock quantity by product across warehouses")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(store).stockDistributionLoading && unref(chartData).length === 0) {
                    _push3(`<div class="flex justify-center py-16"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(chartData).length === 0) {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No inventory",
                      description: "No stock available to display"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(unref(_sfc_main$2$1), {
                      config: chartConfig,
                      class: "mx-auto aspect-square max-h-[240px]"
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
                                  "arc-width": 36
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisTooltip), {
                                  triggers: {
                                    [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true })
                                  }
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(VisDonut), {
                                    value: (d) => d.value,
                                    color: (d) => d.fill,
                                    "arc-width": 36
                                  }, null, 8, ["value", "color"]),
                                  createVNode(unref(VisTooltip), {
                                    triggers: {
                                      [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true })
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
                                  "arc-width": 36
                                }, null, 8, ["value", "color"]),
                                createVNode(unref(VisTooltip), {
                                  triggers: {
                                    [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true })
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
                      _push3(`<div class="flex items-center justify-between text-sm"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><span class="size-2.5 shrink-0 rounded-xs" style="${ssrRenderStyle({ backgroundColor: d.fill })}"${_scopeId2}></span><span class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(d.name)}</span></div><span class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(formatQuantity(d.value))}</span></div>`);
                    });
                    _push3(`<!--]--><div class="flex items-center justify-between border-t pt-2 text-sm"${_scopeId2}><span class="font-medium"${_scopeId2}>Total</span><span class="font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(formatQuantity(unref(totalQuantity)))}</span></div></div><!--]-->`);
                  }
                } else {
                  return [
                    unref(store).stockDistributionLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-16"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                      key: 1,
                      title: "No inventory",
                      description: "No stock available to display"
                    })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                      createVNode(unref(_sfc_main$2$1), {
                        config: chartConfig,
                        class: "mx-auto aspect-square max-h-[240px]"
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
                                "arc-width": 36
                              }, null, 8, ["value", "color"]),
                              createVNode(unref(VisTooltip), {
                                triggers: {
                                  [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true })
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
                            createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(formatQuantity(d.value)), 1)
                          ]);
                        }), 128)),
                        createVNode("div", { class: "flex items-center justify-between border-t pt-2 text-sm" }, [
                          createVNode("span", { class: "font-medium" }, "Total"),
                          createVNode("span", { class: "font-bold tabular-nums" }, toDisplayString(formatQuantity(unref(totalQuantity))), 1)
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
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Inventory Distribution")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Stock quantity by product across warehouses")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  unref(store).stockDistributionLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-16"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                    key: 1,
                    title: "No inventory",
                    description: "No stock available to display"
                  })) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createVNode(unref(_sfc_main$2$1), {
                      config: chartConfig,
                      class: "mx-auto aspect-square max-h-[240px]"
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
                              "arc-width": 36
                            }, null, 8, ["value", "color"]),
                            createVNode(unref(VisTooltip), {
                              triggers: {
                                [unref(Donut).selectors.segment]: unref(componentToString)(chartConfig, unref(_sfc_main$a), { hideLabel: true })
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
                          createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(formatQuantity(d.value)), 1)
                        ]);
                      }), 128)),
                      createVNode("div", { class: "flex items-center justify-between border-t pt-2 text-sm" }, [
                        createVNode("span", { class: "font-medium" }, "Total"),
                        createVNode("span", { class: "font-bold tabular-nums" }, toDisplayString(formatQuantity(unref(totalQuantity))), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/stock/components/InventoryDistributionChart.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
async function fetchFinancialOverviewApi(params) {
  return $fetch("/api/accounting/dashboard/overview", { params });
}
const useAccountingStore = defineStore("accounting", () => {
  const financialOverview = ref([]);
  const financialOverviewLoading = ref(false);
  async function fetchFinancialOverview(params) {
    financialOverviewLoading.value = true;
    try {
      const data = await fetchFinancialOverviewApi(params);
      financialOverview.value = data.data;
      return data.data;
    } finally {
      financialOverviewLoading.value = false;
    }
  }
  return {
    financialOverview,
    financialOverviewLoading,
    fetchFinancialOverview
  };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FinancialOverviewChart",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useAccountingStore();
    const period = ref("6m");
    watch(period, () => load());
    async function load() {
      try {
        await store.fetchFinancialOverview({ period: period.value });
      } catch {
      }
    }
    const chartData = computed(() => store.financialOverview);
    const chartConfig = {
      revenue: {
        label: "Revenue",
        color: "var(--chart-1)"
      },
      expenses: {
        label: "Expenses",
        color: "var(--chart-2)"
      },
      profit: {
        label: "Profit",
        color: "var(--chart-3)"
      }
    };
    const xNumTicks = computed(() => Math.min(chartData.value.length, 6));
    function toTime(value) {
      if (typeof value === "number") return value;
      const [y, m] = String(value).slice(0, 7).split("-").map(Number);
      return new Date(y || 0, (m || 1) - 1, 1).getTime();
    }
    function formatMonth(value) {
      if (typeof value === "number") {
        return new Date(value).toLocaleDateString(void 0, { month: "short" });
      }
      const [y, m] = String(value).slice(0, 7).split("-").map(Number);
      if (!y || !m)
        return String(value);
      return new Date(y, m - 1, 1).toLocaleDateString(void 0, { month: "short" });
    }
    function formatCompact(value) {
      return new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 }).format(value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$7;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_ChartPeriodSelect = __nuxt_component_4;
      const _component_UiCardContent = _sfc_main$4$1;
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
                        _push4(`Financial Overview`);
                      } else {
                        return [
                          createTextVNode("Financial Overview")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Monthly revenue, expenses, and profit`);
                      } else {
                        return [
                          createTextVNode("Monthly revenue, expenses, and profit")
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
                          createTextVNode("Financial Overview")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Monthly revenue, expenses, and profit")
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
                  if (unref(store).financialOverviewLoading && unref(chartData).length === 0) {
                    _push3(`<div class="flex justify-center py-16"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(chartData).length === 0) {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No financial data",
                      description: "No financial activity in this period"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(_sfc_main$2$1), { config: chartConfig }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VisXYContainer), { data: unref(chartData) }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(VisLine), {
                                  x: (d) => toTime(d.month),
                                  y: (d) => d.revenue,
                                  color: chartConfig.revenue.color,
                                  "line-width": 2
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisLine), {
                                  x: (d) => toTime(d.month),
                                  y: (d) => d.expenses,
                                  color: chartConfig.expenses.color,
                                  "line-width": 2
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisLine), {
                                  x: (d) => toTime(d.month),
                                  y: (d) => d.profit,
                                  color: chartConfig.profit.color,
                                  "line-width": 2
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "x",
                                  x: (d) => toTime(d.month),
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false,
                                  "num-ticks": unref(xNumTicks),
                                  "tick-format": (d) => formatMonth(d)
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisAxis), {
                                  type: "y",
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "tick-format": (d) => formatCompact(d)
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisTooltip), null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { labelKey: "month" }),
                                  color: [chartConfig.revenue.color, chartConfig.expenses.color, chartConfig.profit.color]
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(VisLine), {
                                    x: (d) => toTime(d.month),
                                    y: (d) => d.revenue,
                                    color: chartConfig.revenue.color,
                                    "line-width": 2
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisLine), {
                                    x: (d) => toTime(d.month),
                                    y: (d) => d.expenses,
                                    color: chartConfig.expenses.color,
                                    "line-width": 2
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisLine), {
                                    x: (d) => toTime(d.month),
                                    y: (d) => d.profit,
                                    color: chartConfig.profit.color,
                                    "line-width": 2
                                  }, null, 8, ["x", "y", "color"]),
                                  createVNode(unref(VisAxis), {
                                    type: "x",
                                    x: (d) => toTime(d.month),
                                    "tick-line": false,
                                    "domain-line": false,
                                    "grid-line": false,
                                    "num-ticks": unref(xNumTicks),
                                    "tick-format": (d) => formatMonth(d)
                                  }, null, 8, ["x", "num-ticks", "tick-format"]),
                                  createVNode(unref(VisAxis), {
                                    type: "y",
                                    "num-ticks": 3,
                                    "tick-line": false,
                                    "domain-line": false,
                                    "tick-format": (d) => formatCompact(d)
                                  }, null, 8, ["tick-format"]),
                                  createVNode(unref(VisTooltip)),
                                  createVNode(unref(VisCrosshair), {
                                    template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { labelKey: "month" }),
                                    color: [chartConfig.revenue.color, chartConfig.expenses.color, chartConfig.profit.color]
                                  }, null, 8, ["template", "color"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(VisXYContainer), { data: unref(chartData) }, {
                              default: withCtx(() => [
                                createVNode(unref(VisLine), {
                                  x: (d) => toTime(d.month),
                                  y: (d) => d.revenue,
                                  color: chartConfig.revenue.color,
                                  "line-width": 2
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisLine), {
                                  x: (d) => toTime(d.month),
                                  y: (d) => d.expenses,
                                  color: chartConfig.expenses.color,
                                  "line-width": 2
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisLine), {
                                  x: (d) => toTime(d.month),
                                  y: (d) => d.profit,
                                  color: chartConfig.profit.color,
                                  "line-width": 2
                                }, null, 8, ["x", "y", "color"]),
                                createVNode(unref(VisAxis), {
                                  type: "x",
                                  x: (d) => toTime(d.month),
                                  "tick-line": false,
                                  "domain-line": false,
                                  "grid-line": false,
                                  "num-ticks": unref(xNumTicks),
                                  "tick-format": (d) => formatMonth(d)
                                }, null, 8, ["x", "num-ticks", "tick-format"]),
                                createVNode(unref(VisAxis), {
                                  type: "y",
                                  "num-ticks": 3,
                                  "tick-line": false,
                                  "domain-line": false,
                                  "tick-format": (d) => formatCompact(d)
                                }, null, 8, ["tick-format"]),
                                createVNode(unref(VisTooltip)),
                                createVNode(unref(VisCrosshair), {
                                  template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { labelKey: "month" }),
                                  color: [chartConfig.revenue.color, chartConfig.expenses.color, chartConfig.profit.color]
                                }, null, 8, ["template", "color"])
                              ]),
                              _: 1
                            }, 8, ["data"]),
                            createVNode(unref(_sfc_main$1$2))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    unref(store).financialOverviewLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-16"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                      key: 1,
                      title: "No financial data",
                      description: "No financial activity in this period"
                    })) : (openBlock(), createBlock(unref(_sfc_main$2$1), {
                      key: 2,
                      config: chartConfig
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(VisXYContainer), { data: unref(chartData) }, {
                          default: withCtx(() => [
                            createVNode(unref(VisLine), {
                              x: (d) => toTime(d.month),
                              y: (d) => d.revenue,
                              color: chartConfig.revenue.color,
                              "line-width": 2
                            }, null, 8, ["x", "y", "color"]),
                            createVNode(unref(VisLine), {
                              x: (d) => toTime(d.month),
                              y: (d) => d.expenses,
                              color: chartConfig.expenses.color,
                              "line-width": 2
                            }, null, 8, ["x", "y", "color"]),
                            createVNode(unref(VisLine), {
                              x: (d) => toTime(d.month),
                              y: (d) => d.profit,
                              color: chartConfig.profit.color,
                              "line-width": 2
                            }, null, 8, ["x", "y", "color"]),
                            createVNode(unref(VisAxis), {
                              type: "x",
                              x: (d) => toTime(d.month),
                              "tick-line": false,
                              "domain-line": false,
                              "grid-line": false,
                              "num-ticks": unref(xNumTicks),
                              "tick-format": (d) => formatMonth(d)
                            }, null, 8, ["x", "num-ticks", "tick-format"]),
                            createVNode(unref(VisAxis), {
                              type: "y",
                              "num-ticks": 3,
                              "tick-line": false,
                              "domain-line": false,
                              "tick-format": (d) => formatCompact(d)
                            }, null, 8, ["tick-format"]),
                            createVNode(unref(VisTooltip)),
                            createVNode(unref(VisCrosshair), {
                              template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { labelKey: "month" }),
                              color: [chartConfig.revenue.color, chartConfig.expenses.color, chartConfig.profit.color]
                            }, null, 8, ["template", "color"])
                          ]),
                          _: 1
                        }, 8, ["data"]),
                        createVNode(unref(_sfc_main$1$2))
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
                        createTextVNode("Financial Overview")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Monthly revenue, expenses, and profit")
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
                  unref(store).financialOverviewLoading && unref(chartData).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-16"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(chartData).length === 0 ? (openBlock(), createBlock(_component_EmptyState, {
                    key: 1,
                    title: "No financial data",
                    description: "No financial activity in this period"
                  })) : (openBlock(), createBlock(unref(_sfc_main$2$1), {
                    key: 2,
                    config: chartConfig
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(VisXYContainer), { data: unref(chartData) }, {
                        default: withCtx(() => [
                          createVNode(unref(VisLine), {
                            x: (d) => toTime(d.month),
                            y: (d) => d.revenue,
                            color: chartConfig.revenue.color,
                            "line-width": 2
                          }, null, 8, ["x", "y", "color"]),
                          createVNode(unref(VisLine), {
                            x: (d) => toTime(d.month),
                            y: (d) => d.expenses,
                            color: chartConfig.expenses.color,
                            "line-width": 2
                          }, null, 8, ["x", "y", "color"]),
                          createVNode(unref(VisLine), {
                            x: (d) => toTime(d.month),
                            y: (d) => d.profit,
                            color: chartConfig.profit.color,
                            "line-width": 2
                          }, null, 8, ["x", "y", "color"]),
                          createVNode(unref(VisAxis), {
                            type: "x",
                            x: (d) => toTime(d.month),
                            "tick-line": false,
                            "domain-line": false,
                            "grid-line": false,
                            "num-ticks": unref(xNumTicks),
                            "tick-format": (d) => formatMonth(d)
                          }, null, 8, ["x", "num-ticks", "tick-format"]),
                          createVNode(unref(VisAxis), {
                            type: "y",
                            "num-ticks": 3,
                            "tick-line": false,
                            "domain-line": false,
                            "tick-format": (d) => formatCompact(d)
                          }, null, 8, ["tick-format"]),
                          createVNode(unref(VisTooltip)),
                          createVNode(unref(VisCrosshair), {
                            template: unref(componentToString)(chartConfig, unref(_sfc_main$a), { labelKey: "month" }),
                            color: [chartConfig.revenue.color, chartConfig.expenses.color, chartConfig.profit.color]
                          }, null, 8, ["template", "color"])
                        ]),
                        _: 1
                      }, 8, ["data"]),
                      createVNode(unref(_sfc_main$1$2))
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/accounting/components/FinancialOverviewChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RecentOrdersCard",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useSalesStore();
    const loading = ref(true);
    const orders = computed(() => store.orders);
    function orderStatusVariant(status) {
      const map = {
        COMPLETED: "default",
        CONFIRMED: "secondary",
        PENDING: "outline",
        CANCELLED: "destructive"
      };
      return map[status] || "secondary";
    }
    function formatMoney(value) {
      return new Intl.NumberFormat(void 0, { maximumFractionDigits: 2 }).format(value || 0);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$7;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiButton = _sfc_main$5;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiBadge = _sfc_main$9;
      _push(ssrRenderComponent(_component_UiCard, mergeProps({ class: "shadow-sm transition-shadow hover:shadow-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Recent Orders`);
                      } else {
                        return [
                          createTextVNode("Recent Orders")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Latest sales orders`);
                      } else {
                        return [
                          createTextVNode("Latest sales orders")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    as: "NuxtLink",
                    to: "/sales/orders",
                    variant: "ghost",
                    size: "sm",
                    class: "h-7 px-2 text-xs text-muted-foreground"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` View all `);
                      } else {
                        return [
                          createTextVNode(" View all ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Recent Orders")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Latest sales orders")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_UiButton, {
                      as: "NuxtLink",
                      to: "/sales/orders",
                      variant: "ghost",
                      size: "sm",
                      class: "h-7 px-2 text-xs text-muted-foreground"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" View all ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(loading)) {
                    _push3(`<div class="flex justify-center py-8"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(orders).length === 0) {
                    _push3(`<div class="py-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No orders yet",
                      description: "New sales orders will appear here"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(orders), (order) => {
                      _push3(`<div class="flex items-center justify-between gap-3 rounded-lg border p-3"${_scopeId2}><div class="flex min-w-0 items-center gap-3"${_scopeId2}><div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Receipt), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="min-w-0"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: `/sales/${order.id}`,
                        class: "block truncate text-sm font-medium hover:underline"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(order.orderNumber)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(order.orderNumber), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<p class="truncate text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(order.customer?.name || "—")}</p></div></div><div class="flex shrink-0 items-center gap-2"${_scopeId2}><span class="text-sm font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(formatMoney(order.totalAmount))}</span>`);
                      _push3(ssrRenderComponent(_component_UiBadge, {
                        variant: orderStatusVariant(order.status)
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
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                } else {
                  return [
                    unref(loading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-8"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(orders).length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-4"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No orders yet",
                        description: "New sales orders will appear here"
                      })
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(orders), (order) => {
                        return openBlock(), createBlock("div", {
                          key: order.id,
                          class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                        }, [
                          createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                            createVNode("div", { class: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted" }, [
                              createVNode(unref(Receipt), { class: "size-4 text-muted-foreground" })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode(_component_NuxtLink, {
                                to: `/sales/${order.id}`,
                                class: "block truncate text-sm font-medium hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(order.orderNumber), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"]),
                              createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(order.customer?.name || "—"), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                            createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(formatMoney(order.totalAmount)), 1),
                            createVNode(_component_UiBadge, {
                              variant: orderStatusVariant(order.status)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(order.status), 1)
                              ]),
                              _: 2
                            }, 1032, ["variant"])
                          ])
                        ]);
                      }), 128))
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Recent Orders")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Latest sales orders")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_UiButton, {
                    as: "NuxtLink",
                    to: "/sales/orders",
                    variant: "ghost",
                    size: "sm",
                    class: "h-7 px-2 text-xs text-muted-foreground"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" View all ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  unref(loading) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-8"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(orders).length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-4"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No orders yet",
                      description: "New sales orders will appear here"
                    })
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(orders), (order) => {
                      return openBlock(), createBlock("div", {
                        key: order.id,
                        class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                      }, [
                        createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                          createVNode("div", { class: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted" }, [
                            createVNode(unref(Receipt), { class: "size-4 text-muted-foreground" })
                          ]),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode(_component_NuxtLink, {
                              to: `/sales/${order.id}`,
                              class: "block truncate text-sm font-medium hover:underline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(order.orderNumber), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"]),
                            createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(order.customer?.name || "—"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                          createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(formatMoney(order.totalAmount)), 1),
                          createVNode(_component_UiBadge, {
                            variant: orderStatusVariant(order.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(order.status), 1)
                            ]),
                            _: 2
                          }, 1032, ["variant"])
                        ])
                      ]);
                    }), 128))
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("modules/sales/components/RecentOrdersCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const userRole = computed(() => authStore.userRole);
    const { can } = usePermissions();
    const isStorekeeper = computed(() => userRole.value === "STOREKEEPER");
    const isAccountant = computed(() => userRole.value === "ACCOUNTANT");
    const isAdmin = computed(() => userRole.value === "ADMIN" || userRole.value === "MANAGER");
    const isDistributor = computed(() => userRole.value === "DISTRIBUTOR");
    const canViewFinancial = computed(() => isAdmin.value || isAccountant.value);
    const canViewStock = computed(() => isAdmin.value || isStorekeeper.value);
    const showSalesCharts = computed(() => can("SALES", "READ"));
    const showStockCharts = computed(() => can("INVENTORY", "READ"));
    const showAccountingCharts = computed(() => can("ACCOUNTING", "READ"));
    const showGoodsInTransit = computed(() => (isAdmin.value || isAccountant.value) && !!data.value?.goodsInTransit);
    const loading = ref(true);
    const data = ref(null);
    const fmtMoney = (n) => new Intl.NumberFormat(void 0, { maximumFractionDigits: 2 }).format(n || 0);
    const fmtQty = (n) => new Intl.NumberFormat(void 0, { maximumFractionDigits: 3 }).format(n || 0);
    const fmtCount = (n) => new Intl.NumberFormat(void 0, { maximumFractionDigits: 0 }).format(n || 0);
    function invoiceStatusVariant(status) {
      const map = {
        PAID: "default",
        PARTIAL: "secondary",
        CANCELLED: "destructive"
      };
      return map[status] || "secondary";
    }
    const kpis = computed(() => {
      const d = data.value;
      if (!d) return [];
      if (isDistributor.value && d.distributor) {
        return [
          { label: "My Custody", value: fmtQty(d.distributor.totalCustody), icon: Truck, hint: "bags on truck" },
          { label: "Today's Sales", value: fmtCount(d.distributor.salesToday), icon: ShoppingBag, hint: "orders created today" },
          {
            label: "Outstanding",
            value: fmtMoney(d.distributor.outstanding),
            icon: DollarSign,
            hint: d.distributor.outstanding > 0 ? "balance due" : "no outstanding dues",
            negative: d.distributor.outstanding > 0
          },
          { label: "Cash Collected", value: fmtMoney(d.distributor.cashCollected), icon: Wallet, hint: `${fmtMoney(d.distributor.cashConfirmed)} confirmed` }
        ];
      }
      const items = [];
      const f = d.financials;
      items.push({ label: "Total Revenue", value: fmtMoney(f.totalRevenue), icon: TrendingUp, hint: "total invoiced" });
      items.push({ label: "Net Profit", value: fmtMoney(f.netProfit), icon: Scale, hint: "after costs & expenses", negative: f.netProfit < 0 });
      items.push({
        label: "Stock",
        value: fmtQty(d.inventory.totalStockQuantity),
        icon: Package,
        hint: `${d.inventory.warehouseCount || 0} warehouses`
      });
      items.push({
        label: "Low Stock",
        value: fmtCount(d.inventory.lowStockAlerts?.count || 0),
        icon: AlertTriangle,
        hint: "items to restock",
        negative: (d.inventory.lowStockAlerts?.count || 0) > 0
      });
      items.push({
        label: "Goods in Transit",
        value: fmtQty(d.goodsInTransit.totalQuantity),
        icon: Truck,
        hint: `${d.goodsInTransit.distributorCount || 0} distributors`
      });
      items.push({ label: "Warehouses", value: fmtCount(d.inventory?.warehouseCount || 0), icon: Warehouse, hint: "operational sites" });
      items.push({ label: "Cash & Bank", value: fmtMoney(d.financials.companyCash), icon: Wallet, hint: "money with the company" });
      const outstanding = (d.financials.totalRevenue || 0) - (d.financials.totalCollected || 0);
      items.push({ label: "Outstanding", value: fmtMoney(outstanding), icon: HandCoins, hint: "unpaid invoices", negative: outstanding > 0 });
      return items;
    });
    const cashRows = computed(() => {
      const dist = data.value?.distributor;
      if (!dist) return [];
      return [
        { label: "Cash Collected", value: fmtMoney(dist.cashCollected) },
        { label: "Cash Confirmed", value: fmtMoney(dist.cashConfirmed) },
        { label: "Cash Custody", value: fmtMoney(dist.cashCustody) }
      ];
    });
    const counts = computed(() => {
      const c = data.value?.counts;
      if (!c) return [];
      return [
        { label: "Products", value: fmtCount(c.totalProducts), icon: ShoppingBag },
        { label: "Customers", value: fmtCount(c.totalCustomers), icon: Users },
        { label: "Suppliers", value: fmtCount(c.totalSuppliers), icon: Truck },
        { label: "Workers", value: fmtCount(c.totalWorkers), icon: Briefcase }
      ];
    });
    async function fetchDashboard() {
      loading.value = true;
      try {
        data.value = await $fetch("/api/reports/dashboard");
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$5;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$7;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiBadge = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Dashboard",
        description: "Welcome back to Al Nour Management System"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              size: "sm",
              onClick: fetchDashboard
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(RefreshCw), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Refresh `);
                } else {
                  return [
                    createVNode(unref(RefreshCw), { class: "size-4" }),
                    createTextVNode(" Refresh ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiButton, {
                variant: "outline",
                size: "sm",
                onClick: fetchDashboard
              }, {
                default: withCtx(() => [
                  createVNode(unref(RefreshCw), { class: "size-4" }),
                  createTextVNode(" Refresh ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else if (unref(data)) {
        _push(`<!--[-->`);
        if (unref(kpis).length) {
          _push(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
          ssrRenderList(unref(kpis), (kpi) => {
            _push(ssrRenderComponent(_component_UiCard, {
              key: kpi.label,
              class: "shadow-sm transition-shadow hover:shadow-md"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex items-start justify-between gap-4 p-5" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="min-w-0"${_scopeId2}><p class="truncate text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(kpi.label)}</p><p class="${ssrRenderClass([kpi.negative ? "text-destructive" : "text-foreground", "mt-2 truncate text-2xl font-semibold tracking-tight tabular-nums"])}"${_scopeId2}>${ssrInterpolate(kpi.value)}</p>`);
                        if (kpi.hint) {
                          _push3(`<p class="mt-1 truncate text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(kpi.hint)}</p>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div><div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"${_scopeId2}>`);
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(kpi.icon), { class: "size-5 text-primary" }, null), _parent3, _scopeId2);
                        _push3(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("p", { class: "truncate text-sm text-muted-foreground" }, toDisplayString(kpi.label), 1),
                            createVNode("p", {
                              class: ["mt-2 truncate text-2xl font-semibold tracking-tight tabular-nums", kpi.negative ? "text-destructive" : "text-foreground"]
                            }, toDisplayString(kpi.value), 3),
                            kpi.hint ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 truncate text-xs text-muted-foreground"
                            }, toDisplayString(kpi.hint), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10" }, [
                            (openBlock(), createBlock(resolveDynamicComponent(kpi.icon), { class: "size-5 text-primary" }))
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UiCardContent, { class: "flex items-start justify-between gap-4 p-5" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("p", { class: "truncate text-sm text-muted-foreground" }, toDisplayString(kpi.label), 1),
                          createVNode("p", {
                            class: ["mt-2 truncate text-2xl font-semibold tracking-tight tabular-nums", kpi.negative ? "text-destructive" : "text-foreground"]
                          }, toDisplayString(kpi.value), 3),
                          kpi.hint ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 truncate text-xs text-muted-foreground"
                          }, toDisplayString(kpi.hint), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10" }, [
                          (openBlock(), createBlock(resolveDynamicComponent(kpi.icon), { class: "size-5 text-primary" }))
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isDistributor) && unref(data).distributor) {
          _push(`<div class="grid gap-6 lg:grid-cols-2">`);
          _push(ssrRenderComponent(_component_UiCard, { class: "shadow-sm transition-shadow hover:shadow-md" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`My Custody`);
                          } else {
                            return [
                              createTextVNode("My Custody")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Products currently loaded on your truck`);
                          } else {
                            return [
                              createTextVNode("Products currently loaded on your truck")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("My Custody")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Products currently loaded on your truck")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (!unref(data).distributor.custodies?.length) {
                        _push3(`<div class="py-4"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_EmptyState, {
                          title: "No custody",
                          description: "Your truck is empty"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(data).distributor.custodies, (c) => {
                          _push3(`<div class="flex items-center justify-between gap-3 rounded-lg border p-3"${_scopeId2}><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(c.productName)}</span><span class="text-sm font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(fmtQty(c.quantity))}</span></div>`);
                        });
                        _push3(`<!--]--></div>`);
                      }
                    } else {
                      return [
                        !unref(data).distributor.custodies?.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "py-4"
                        }, [
                          createVNode(_component_EmptyState, {
                            title: "No custody",
                            description: "Your truck is empty"
                          })
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data).distributor.custodies, (c) => {
                            return openBlock(), createBlock("div", {
                              key: c.productId,
                              class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                            }, [
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(c.productName), 1),
                              createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(fmtQty(c.quantity)), 1)
                            ]);
                          }), 128))
                        ]))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiCardHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("My Custody")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Products currently loaded on your truck")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      !unref(data).distributor.custodies?.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "py-4"
                      }, [
                        createVNode(_component_EmptyState, {
                          title: "No custody",
                          description: "Your truck is empty"
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(data).distributor.custodies, (c) => {
                          return openBlock(), createBlock("div", {
                            key: c.productId,
                            class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                          }, [
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(c.productName), 1),
                            createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(fmtQty(c.quantity)), 1)
                          ]);
                        }), 128))
                      ]))
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_UiCard, { class: "shadow-sm transition-shadow hover:shadow-md" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Cash &amp; Settlements`);
                          } else {
                            return [
                              createTextVNode("Cash & Settlements")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Collected, confirmed, and held funds`);
                          } else {
                            return [
                              createTextVNode("Collected, confirmed, and held funds")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Cash & Settlements")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Collected, confirmed, and held funds")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(cashRows), (row) => {
                        _push3(`<div class="flex items-center justify-between gap-3 rounded-lg border p-3"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(row.label)}</span><span class="text-sm font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(row.value)}</span></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "space-y-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(cashRows), (row) => {
                            return openBlock(), createBlock("div", {
                              key: row.label,
                              class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                            }, [
                              createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(row.label), 1),
                              createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(row.value), 1)
                            ]);
                          }), 128))
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiCardHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Cash & Settlements")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Collected, confirmed, and held funds")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-2" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(cashRows), (row) => {
                          return openBlock(), createBlock("div", {
                            key: row.label,
                            class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                          }, [
                            createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(row.label), 1),
                            createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(row.value), 1)
                          ]);
                        }), 128))
                      ])
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
          _push(`<!--[-->`);
          if (unref(showSalesCharts) || unref(showStockCharts)) {
            _push(`<div class="grid gap-6 lg:grid-cols-12">`);
            if (unref(showSalesCharts)) {
              _push(`<div class="${ssrRenderClass(unref(showStockCharts) ? "lg:col-span-8" : "lg:col-span-12")}">`);
              _push(ssrRenderComponent(_sfc_main$8, null, null, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            if (unref(showStockCharts)) {
              _push(`<div class="${ssrRenderClass(unref(showSalesCharts) ? "lg:col-span-4" : "lg:col-span-12")}">`);
              _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(showSalesCharts) || unref(showAccountingCharts)) {
            _push(`<div class="grid gap-6 lg:grid-cols-2">`);
            if (unref(showSalesCharts)) {
              _push(`<div class="${ssrRenderClass(unref(showAccountingCharts) ? "" : "lg:col-span-2")}">`);
              _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            if (unref(showAccountingCharts)) {
              _push(`<div class="${ssrRenderClass(unref(showSalesCharts) ? "" : "lg:col-span-2")}">`);
              _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(showSalesCharts) || unref(canViewStock) && unref(data).inventory) {
            _push(`<div class="grid gap-6 lg:grid-cols-2">`);
            if (unref(showSalesCharts)) {
              _push(`<div class="${ssrRenderClass(unref(canViewStock) && unref(data).inventory ? "" : "lg:col-span-2")}">`);
              _push(ssrRenderComponent(_sfc_main$1, { class: "h-full" }, null, _parent));
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            if (unref(canViewStock) && unref(data).inventory) {
              _push(`<div class="${ssrRenderClass(unref(showSalesCharts) ? "" : "lg:col-span-2")}">`);
              _push(ssrRenderComponent(_component_UiCard, { class: "h-full shadow-sm transition-shadow hover:shadow-md" }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<div${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`Low Stock Alerts`);
                              } else {
                                return [
                                  createTextVNode("Low Stock Alerts")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent3, _scopeId2));
                          _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`Items with zero or negative stock`);
                              } else {
                                return [
                                  createTextVNode("Items with zero or negative stock")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent3, _scopeId2));
                          _push3(`</div><div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10"${_scopeId2}>`);
                          _push3(ssrRenderComponent(unref(AlertTriangle), { class: "size-4 text-destructive" }, null, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Low Stock Alerts")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Items with zero or negative stock")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10" }, [
                              createVNode(unref(AlertTriangle), { class: "size-4 text-destructive" })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                    _push2(ssrRenderComponent(_component_UiCardContent, null, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          if (!unref(data).inventory.lowStockAlerts?.items?.length) {
                            _push3(`<div class="py-4"${_scopeId2}>`);
                            _push3(ssrRenderComponent(_component_EmptyState, {
                              title: "All stock levels healthy",
                              description: "No low stock alerts"
                            }, null, _parent3, _scopeId2));
                            _push3(`</div>`);
                          } else {
                            _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                            ssrRenderList(unref(data).inventory.lowStockAlerts.items, (item) => {
                              _push3(`<div class="flex items-center justify-between gap-3 rounded-lg border p-3"${_scopeId2}><div class="flex min-w-0 items-center gap-3"${_scopeId2}><div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10"${_scopeId2}>`);
                              _push3(ssrRenderComponent(unref(AlertTriangle), { class: "size-4 text-destructive" }, null, _parent3, _scopeId2));
                              _push3(`</div><div class="min-w-0"${_scopeId2}>`);
                              _push3(ssrRenderComponent(_component_NuxtLink, {
                                to: `/products/${item.productId}`,
                                class: "block truncate text-sm font-medium hover:underline"
                              }, {
                                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                                  if (_push4) {
                                    _push4(`${ssrInterpolate(item.productName)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(item.productName), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent3, _scopeId2));
                              _push3(`<p class="truncate text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(item.warehouseName)}</p></div></div>`);
                              _push3(ssrRenderComponent(_component_UiBadge, {
                                variant: "destructive",
                                class: "shrink-0"
                              }, {
                                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                                  if (_push4) {
                                    _push4(`${ssrInterpolate(fmtQty(item.quantity))}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(fmtQty(item.quantity)), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent3, _scopeId2));
                              _push3(`</div>`);
                            });
                            _push3(`<!--]--></div>`);
                          }
                        } else {
                          return [
                            !unref(data).inventory.lowStockAlerts?.items?.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "py-4"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "All stock levels healthy",
                                description: "No low stock alerts"
                              })
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(data).inventory.lowStockAlerts.items, (item) => {
                                return openBlock(), createBlock("div", {
                                  key: item.id,
                                  class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                                }, [
                                  createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                                    createVNode("div", { class: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10" }, [
                                      createVNode(unref(AlertTriangle), { class: "size-4 text-destructive" })
                                    ]),
                                    createVNode("div", { class: "min-w-0" }, [
                                      createVNode(_component_NuxtLink, {
                                        to: `/products/${item.productId}`,
                                        class: "block truncate text-sm font-medium hover:underline"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.productName), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["to"]),
                                      createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(item.warehouseName), 1)
                                    ])
                                  ]),
                                  createVNode(_component_UiBadge, {
                                    variant: "destructive",
                                    class: "shrink-0"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(fmtQty(item.quantity)), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]);
                              }), 128))
                            ]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Low Stock Alerts")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Items with zero or negative stock")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10" }, [
                            createVNode(unref(AlertTriangle), { class: "size-4 text-destructive" })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, null, {
                        default: withCtx(() => [
                          !unref(data).inventory.lowStockAlerts?.items?.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "py-4"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "All stock levels healthy",
                              description: "No low stock alerts"
                            })
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(data).inventory.lowStockAlerts.items, (item) => {
                              return openBlock(), createBlock("div", {
                                key: item.id,
                                class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                              }, [
                                createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                                  createVNode("div", { class: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10" }, [
                                    createVNode(unref(AlertTriangle), { class: "size-4 text-destructive" })
                                  ]),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode(_component_NuxtLink, {
                                      to: `/products/${item.productId}`,
                                      class: "block truncate text-sm font-medium hover:underline"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.productName), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"]),
                                    createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(item.warehouseName), 1)
                                  ])
                                ]),
                                createVNode(_component_UiBadge, {
                                  variant: "destructive",
                                  class: "shrink-0"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(fmtQty(item.quantity)), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]);
                            }), 128))
                          ]))
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
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(canViewStock) && unref(data).inventory || unref(showGoodsInTransit)) {
            _push(`<div class="grid gap-6 lg:grid-cols-2">`);
            if (unref(canViewStock) && unref(data).inventory) {
              _push(`<div class="${ssrRenderClass(unref(showGoodsInTransit) ? "" : "lg:col-span-2")}">`);
              _push(ssrRenderComponent(_component_UiCard, { class: "h-full shadow-sm transition-shadow hover:shadow-md" }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<div${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`Recent Stock Movements`);
                              } else {
                                return [
                                  createTextVNode("Recent Stock Movements")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent3, _scopeId2));
                          _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`Latest inventory transactions`);
                              } else {
                                return [
                                  createTextVNode("Latest inventory transactions")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent3, _scopeId2));
                          _push3(`</div>`);
                          _push3(ssrRenderComponent(_component_UiButton, {
                            as: "NuxtLink",
                            to: "/stock/movements",
                            variant: "ghost",
                            size: "sm",
                            class: "h-7 px-2 text-xs text-muted-foreground"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(` View all `);
                              } else {
                                return [
                                  createTextVNode(" View all ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Recent Stock Movements")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Latest inventory transactions")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(_component_UiButton, {
                              as: "NuxtLink",
                              to: "/stock/movements",
                              variant: "ghost",
                              size: "sm",
                              class: "h-7 px-2 text-xs text-muted-foreground"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" View all ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                    _push2(ssrRenderComponent(_component_UiCardContent, null, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          if (!unref(data).inventory.recentMovements?.length) {
                            _push3(`<div class="py-4"${_scopeId2}>`);
                            _push3(ssrRenderComponent(_component_EmptyState, {
                              title: "No movements yet",
                              description: "Stock movements will appear here"
                            }, null, _parent3, _scopeId2));
                            _push3(`</div>`);
                          } else {
                            _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                            ssrRenderList(unref(data).inventory.recentMovements, (m) => {
                              _push3(`<div class="flex items-center justify-between gap-3 rounded-lg border p-3"${_scopeId2}><div class="flex min-w-0 items-center gap-3"${_scopeId2}><div class="${ssrRenderClass([m.quantity > 0 ? "bg-primary/10" : "bg-destructive/10", "flex size-8 shrink-0 items-center justify-center rounded-lg"])}"${_scopeId2}>`);
                              if (m.quantity > 0) {
                                _push3(ssrRenderComponent(unref(ArrowUp), { class: "size-4 text-primary" }, null, _parent3, _scopeId2));
                              } else {
                                _push3(ssrRenderComponent(unref(ArrowDown), { class: "size-4 text-destructive" }, null, _parent3, _scopeId2));
                              }
                              _push3(`</div><div class="min-w-0"${_scopeId2}>`);
                              _push3(ssrRenderComponent(_component_NuxtLink, {
                                to: `/products/${m.productId}`,
                                class: "block truncate text-sm font-medium hover:underline"
                              }, {
                                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                                  if (_push4) {
                                    _push4(`${ssrInterpolate(m.productName)}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(m.productName), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent3, _scopeId2));
                              _push3(`<p class="truncate text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(m.warehouseName)} · ${ssrInterpolate(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type)}</p></div></div><span class="${ssrRenderClass([m.quantity > 0 ? "text-primary" : "text-destructive", "shrink-0 text-sm font-medium tabular-nums"])}"${_scopeId2}>${ssrInterpolate(m.quantity > 0 ? "+" : "")}${ssrInterpolate(fmtQty(m.quantity))}</span></div>`);
                            });
                            _push3(`<!--]--></div>`);
                          }
                        } else {
                          return [
                            !unref(data).inventory.recentMovements?.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "py-4"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "No movements yet",
                                description: "Stock movements will appear here"
                              })
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "space-y-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(data).inventory.recentMovements, (m) => {
                                return openBlock(), createBlock("div", {
                                  key: m.id,
                                  class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                                }, [
                                  createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                                    createVNode("div", {
                                      class: ["flex size-8 shrink-0 items-center justify-center rounded-lg", m.quantity > 0 ? "bg-primary/10" : "bg-destructive/10"]
                                    }, [
                                      m.quantity > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                        key: 0,
                                        class: "size-4 text-primary"
                                      })) : (openBlock(), createBlock(unref(ArrowDown), {
                                        key: 1,
                                        class: "size-4 text-destructive"
                                      }))
                                    ], 2),
                                    createVNode("div", { class: "min-w-0" }, [
                                      createVNode(_component_NuxtLink, {
                                        to: `/products/${m.productId}`,
                                        class: "block truncate text-sm font-medium hover:underline"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(m.productName), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["to"]),
                                      createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(m.warehouseName) + " · " + toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                    ])
                                  ]),
                                  createVNode("span", {
                                    class: ["shrink-0 text-sm font-medium tabular-nums", m.quantity > 0 ? "text-primary" : "text-destructive"]
                                  }, toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(fmtQty(m.quantity)), 3)
                                ]);
                              }), 128))
                            ]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Recent Stock Movements")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Latest inventory transactions")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_UiButton, {
                            as: "NuxtLink",
                            to: "/stock/movements",
                            variant: "ghost",
                            size: "sm",
                            class: "h-7 px-2 text-xs text-muted-foreground"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View all ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, null, {
                        default: withCtx(() => [
                          !unref(data).inventory.recentMovements?.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "py-4"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No movements yet",
                              description: "Stock movements will appear here"
                            })
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(data).inventory.recentMovements, (m) => {
                              return openBlock(), createBlock("div", {
                                key: m.id,
                                class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                              }, [
                                createVNode("div", { class: "flex min-w-0 items-center gap-3" }, [
                                  createVNode("div", {
                                    class: ["flex size-8 shrink-0 items-center justify-center rounded-lg", m.quantity > 0 ? "bg-primary/10" : "bg-destructive/10"]
                                  }, [
                                    m.quantity > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                      key: 0,
                                      class: "size-4 text-primary"
                                    })) : (openBlock(), createBlock(unref(ArrowDown), {
                                      key: 1,
                                      class: "size-4 text-destructive"
                                    }))
                                  ], 2),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode(_component_NuxtLink, {
                                      to: `/products/${m.productId}`,
                                      class: "block truncate text-sm font-medium hover:underline"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(m.productName), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"]),
                                    createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(m.warehouseName) + " · " + toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                  ])
                                ]),
                                createVNode("span", {
                                  class: ["shrink-0 text-sm font-medium tabular-nums", m.quantity > 0 ? "text-primary" : "text-destructive"]
                                }, toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(fmtQty(m.quantity)), 3)
                              ]);
                            }), 128))
                          ]))
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
            if (unref(showGoodsInTransit)) {
              _push(`<div class="${ssrRenderClass(unref(canViewStock) && unref(data).inventory ? "" : "lg:col-span-2")}">`);
              _push(ssrRenderComponent(_component_UiCard, { class: "h-full shadow-sm transition-shadow hover:shadow-md" }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<div${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`Goods in Transit`);
                              } else {
                                return [
                                  createTextVNode("Goods in Transit")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent3, _scopeId2));
                          _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`Inventory loaded on distributor trucks`);
                              } else {
                                return [
                                  createTextVNode("Inventory loaded on distributor trucks")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent3, _scopeId2));
                          _push3(`</div><div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"${_scopeId2}>`);
                          _push3(ssrRenderComponent(unref(Truck), { class: "size-4 text-primary" }, null, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Goods in Transit")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Inventory loaded on distributor trucks")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10" }, [
                              createVNode(unref(Truck), { class: "size-4 text-primary" })
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                    _push2(ssrRenderComponent(_component_UiCardContent, null, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<div class="mb-3 flex items-center justify-between gap-3 rounded-lg border p-3"${_scopeId2}><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Total in transit</p><p class="text-lg font-semibold tabular-nums"${_scopeId2}>${ssrInterpolate(fmtQty(unref(data).goodsInTransit.totalQuantity))}</p></div><div class="text-right"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Active distributors</p><p class="text-lg font-semibold tabular-nums"${_scopeId2}>${ssrInterpolate(unref(data).goodsInTransit.distributorCount)}</p></div></div>`);
                          if (unref(data).goodsInTransit.byDistributor?.length) {
                            _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                            ssrRenderList(unref(data).goodsInTransit.byDistributor, (d) => {
                              _push3(`<div class="rounded-lg border p-3"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(d.name)}</p><span class="text-sm font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(fmtQty(d.totalQty))}</span></div><div class="mt-1 space-y-0.5"${_scopeId2}><!--[-->`);
                              ssrRenderList(d.products, (p) => {
                                _push3(`<div class="flex justify-between pl-2 text-xs text-muted-foreground"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(p.name)}</span><span class="tabular-nums"${_scopeId2}>${ssrInterpolate(fmtQty(p.qty))}</span></div>`);
                              });
                              _push3(`<!--]--></div></div>`);
                            });
                            _push3(`<!--]--></div>`);
                          } else {
                            _push3(`<div class="py-4"${_scopeId2}>`);
                            _push3(ssrRenderComponent(_component_EmptyState, {
                              title: "No goods in transit",
                              description: "All distributor trucks are empty"
                            }, null, _parent3, _scopeId2));
                            _push3(`</div>`);
                          }
                        } else {
                          return [
                            createVNode("div", { class: "mb-3 flex items-center justify-between gap-3 rounded-lg border p-3" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-xs text-muted-foreground" }, "Total in transit"),
                                createVNode("p", { class: "text-lg font-semibold tabular-nums" }, toDisplayString(fmtQty(unref(data).goodsInTransit.totalQuantity)), 1)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground" }, "Active distributors"),
                                createVNode("p", { class: "text-lg font-semibold tabular-nums" }, toDisplayString(unref(data).goodsInTransit.distributorCount), 1)
                              ])
                            ]),
                            unref(data).goodsInTransit.byDistributor?.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "space-y-2"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(data).goodsInTransit.byDistributor, (d) => {
                                return openBlock(), createBlock("div", {
                                  key: d.name,
                                  class: "rounded-lg border p-3"
                                }, [
                                  createVNode("div", { class: "flex items-center justify-between" }, [
                                    createVNode("p", { class: "text-sm font-medium" }, toDisplayString(d.name), 1),
                                    createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(fmtQty(d.totalQty)), 1)
                                  ]),
                                  createVNode("div", { class: "mt-1 space-y-0.5" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(d.products, (p) => {
                                      return openBlock(), createBlock("div", {
                                        key: p.name,
                                        class: "flex justify-between pl-2 text-xs text-muted-foreground"
                                      }, [
                                        createVNode("span", null, toDisplayString(p.name), 1),
                                        createVNode("span", { class: "tabular-nums" }, toDisplayString(fmtQty(p.qty)), 1)
                                      ]);
                                    }), 128))
                                  ])
                                ]);
                              }), 128))
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "py-4"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "No goods in transit",
                                description: "All distributor trucks are empty"
                              })
                            ]))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Goods in Transit")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Inventory loaded on distributor trucks")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10" }, [
                            createVNode(unref(Truck), { class: "size-4 text-primary" })
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-3 flex items-center justify-between gap-3 rounded-lg border p-3" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "Total in transit"),
                              createVNode("p", { class: "text-lg font-semibold tabular-nums" }, toDisplayString(fmtQty(unref(data).goodsInTransit.totalQuantity)), 1)
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "Active distributors"),
                              createVNode("p", { class: "text-lg font-semibold tabular-nums" }, toDisplayString(unref(data).goodsInTransit.distributorCount), 1)
                            ])
                          ]),
                          unref(data).goodsInTransit.byDistributor?.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(data).goodsInTransit.byDistributor, (d) => {
                              return openBlock(), createBlock("div", {
                                key: d.name,
                                class: "rounded-lg border p-3"
                              }, [
                                createVNode("div", { class: "flex items-center justify-between" }, [
                                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString(d.name), 1),
                                  createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(fmtQty(d.totalQty)), 1)
                                ]),
                                createVNode("div", { class: "mt-1 space-y-0.5" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(d.products, (p) => {
                                    return openBlock(), createBlock("div", {
                                      key: p.name,
                                      class: "flex justify-between pl-2 text-xs text-muted-foreground"
                                    }, [
                                      createVNode("span", null, toDisplayString(p.name), 1),
                                      createVNode("span", { class: "tabular-nums" }, toDisplayString(fmtQty(p.qty)), 1)
                                    ]);
                                  }), 128))
                                ])
                              ]);
                            }), 128))
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "py-4"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No goods in transit",
                              description: "All distributor trucks are empty"
                            })
                          ]))
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
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(canViewFinancial) && unref(data).financials) {
            _push(`<div class="grid gap-6 lg:grid-cols-2">`);
            _push(ssrRenderComponent(_component_UiCard, { class: "shadow-sm transition-shadow hover:shadow-md" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Recent Invoices`);
                            } else {
                              return [
                                createTextVNode("Recent Invoices")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Latest 5 invoice totals`);
                            } else {
                              return [
                                createTextVNode("Latest 5 invoice totals")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(`</div>`);
                        _push3(ssrRenderComponent(_component_UiButton, {
                          as: "NuxtLink",
                          to: "/sales/invoices",
                          variant: "ghost",
                          size: "sm",
                          class: "h-7 px-2 text-xs text-muted-foreground"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(` View all `);
                            } else {
                              return [
                                createTextVNode(" View all ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Recent Invoices")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Latest 5 invoice totals")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_UiButton, {
                            as: "NuxtLink",
                            to: "/sales/invoices",
                            variant: "ghost",
                            size: "sm",
                            class: "h-7 px-2 text-xs text-muted-foreground"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View all ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_UiCardContent, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        if (!unref(data).financials.recentInvoices?.length) {
                          _push3(`<div class="py-4"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_EmptyState, {
                            title: "No invoices",
                            description: "No invoices created yet"
                          }, null, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                          ssrRenderList(unref(data).financials.recentInvoices, (inv) => {
                            _push3(`<div class="flex items-center justify-between gap-3 rounded-lg border p-3"${_scopeId2}><div class="min-w-0"${_scopeId2}>`);
                            _push3(ssrRenderComponent(_component_NuxtLink, {
                              to: "/sales/invoices",
                              class: "block truncate text-sm font-medium hover:underline"
                            }, {
                              default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                                if (_push4) {
                                  _push4(`${ssrInterpolate(inv.invoiceNumber)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent3, _scopeId2));
                            _push3(`<p class="truncate text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(inv.customer?.name || "—")} · ${ssrInterpolate(new Date(inv.createdAt).toLocaleDateString())}</p></div><div class="flex shrink-0 items-center gap-2"${_scopeId2}><span class="text-sm font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(fmtMoney(inv.totalAmount))}</span>`);
                            _push3(ssrRenderComponent(_component_UiBadge, {
                              variant: invoiceStatusVariant(inv.status)
                            }, {
                              default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                                if (_push4) {
                                  _push4(`${ssrInterpolate(inv.status)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(inv.status), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent3, _scopeId2));
                            _push3(`</div></div>`);
                          });
                          _push3(`<!--]--></div>`);
                        }
                      } else {
                        return [
                          !unref(data).financials.recentInvoices?.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "py-4"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No invoices",
                              description: "No invoices created yet"
                            })
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(data).financials.recentInvoices, (inv) => {
                              return openBlock(), createBlock("div", {
                                key: inv.id,
                                class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                              }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode(_component_NuxtLink, {
                                    to: "/sales/invoices",
                                    class: "block truncate text-sm font-medium hover:underline"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(inv.customer?.name || "—") + " · " + toDisplayString(new Date(inv.createdAt).toLocaleDateString()), 1)
                                ]),
                                createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                                  createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(fmtMoney(inv.totalAmount)), 1),
                                  createVNode(_component_UiBadge, {
                                    variant: invoiceStatusVariant(inv.status)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.status), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ])
                              ]);
                            }), 128))
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UiCardHeader, { class: "flex flex-row items-start justify-between gap-4" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Recent Invoices")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Latest 5 invoice totals")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(_component_UiButton, {
                          as: "NuxtLink",
                          to: "/sales/invoices",
                          variant: "ghost",
                          size: "sm",
                          class: "h-7 px-2 text-xs text-muted-foreground"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" View all ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardContent, null, {
                      default: withCtx(() => [
                        !unref(data).financials.recentInvoices?.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "py-4"
                        }, [
                          createVNode(_component_EmptyState, {
                            title: "No invoices",
                            description: "No invoices created yet"
                          })
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data).financials.recentInvoices, (inv) => {
                            return openBlock(), createBlock("div", {
                              key: inv.id,
                              class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                            }, [
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode(_component_NuxtLink, {
                                  to: "/sales/invoices",
                                  class: "block truncate text-sm font-medium hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(inv.customer?.name || "—") + " · " + toDisplayString(new Date(inv.createdAt).toLocaleDateString()), 1)
                              ]),
                              createVNode("div", { class: "flex shrink-0 items-center gap-2" }, [
                                createVNode("span", { class: "text-sm font-medium tabular-nums" }, toDisplayString(fmtMoney(inv.totalAmount)), 1),
                                createVNode(_component_UiBadge, {
                                  variant: invoiceStatusVariant(inv.status)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.status), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant"])
                              ])
                            ]);
                          }), 128))
                        ]))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(ssrRenderComponent(_component_UiCard, { class: "shadow-sm transition-shadow hover:shadow-md" }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Recent Expenses`);
                            } else {
                              return [
                                createTextVNode("Recent Expenses")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`Latest 5 expense entries`);
                            } else {
                              return [
                                createTextVNode("Latest 5 expense entries")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Recent Expenses")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Latest 5 expense entries")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_UiCardContent, null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        if (!unref(data).financials.recentExpenses?.length) {
                          _push3(`<div class="py-4"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_EmptyState, {
                            title: "No expenses",
                            description: "No expenses recorded yet"
                          }, null, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                          ssrRenderList(unref(data).financials.recentExpenses, (e) => {
                            _push3(`<div class="flex items-center justify-between gap-3 rounded-lg border p-3"${_scopeId2}><div class="min-w-0"${_scopeId2}><p class="truncate text-sm font-medium"${_scopeId2}>${ssrInterpolate(e.title)}</p><p class="truncate text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(e.category)} · ${ssrInterpolate(new Date(e.date).toLocaleDateString())}</p></div><span class="shrink-0 text-sm font-medium tabular-nums text-destructive"${_scopeId2}>${ssrInterpolate(fmtMoney(e.amount))}</span></div>`);
                          });
                          _push3(`<!--]--></div>`);
                        }
                      } else {
                        return [
                          !unref(data).financials.recentExpenses?.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "py-4"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No expenses",
                              description: "No expenses recorded yet"
                            })
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-2"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(data).financials.recentExpenses, (e) => {
                              return openBlock(), createBlock("div", {
                                key: e.id,
                                class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                              }, [
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(e.title), 1),
                                  createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(e.category) + " · " + toDisplayString(new Date(e.date).toLocaleDateString()), 1)
                                ]),
                                createVNode("span", { class: "shrink-0 text-sm font-medium tabular-nums text-destructive" }, toDisplayString(fmtMoney(e.amount)), 1)
                              ]);
                            }), 128))
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UiCardHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Recent Expenses")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Latest 5 expense entries")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardContent, null, {
                      default: withCtx(() => [
                        !unref(data).financials.recentExpenses?.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "py-4"
                        }, [
                          createVNode(_component_EmptyState, {
                            title: "No expenses",
                            description: "No expenses recorded yet"
                          })
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data).financials.recentExpenses, (e) => {
                            return openBlock(), createBlock("div", {
                              key: e.id,
                              class: "flex items-center justify-between gap-3 rounded-lg border p-3"
                            }, [
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "truncate text-sm font-medium" }, toDisplayString(e.title), 1),
                                createVNode("p", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(e.category) + " · " + toDisplayString(new Date(e.date).toLocaleDateString()), 1)
                              ]),
                              createVNode("span", { class: "shrink-0 text-sm font-medium tabular-nums text-destructive" }, toDisplayString(fmtMoney(e.amount)), 1)
                            ]);
                          }), 128))
                        ]))
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
          if (unref(counts).length) {
            _push(`<div class="grid grid-cols-2 gap-4 sm:grid-cols-4"><!--[-->`);
            ssrRenderList(unref(counts), (c) => {
              _push(`<div class="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm"><div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">`);
              ssrRenderVNode(_push, createVNode(resolveDynamicComponent(c.icon), { class: "size-4 text-muted-foreground" }, null), _parent);
              _push(`</div><div class="min-w-0"><p class="text-lg font-semibold leading-none tabular-nums">${ssrInterpolate(c.value)}</p><p class="mt-1 truncate text-xs text-muted-foreground">${ssrInterpolate(c.label)}</p></div></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`<!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D8ShACnX.mjs.map
