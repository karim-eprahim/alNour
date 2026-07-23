import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-KK7k7FV7.mjs';
import { _ as _sfc_main$2 } from './Label-fqACuvH5.mjs';
import { _ as _sfc_main$3 } from './Input-DA89G3IO.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$4, d as _sfc_main$4$1, c as _sfc_main$3$1 } from './CardTitle-St-iDBLB.mjs';
import { _ as __nuxt_component_10 } from './AppTable-Di4p6o0D.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-BVvkGjQ9.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { TrendingUp, Factory, Package, AlertTriangle, DollarSign, Scale } from '@lucide/vue';
import { g as getBatchReportColumns } from './column-CPM1ujEG.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useProductionStore } from './store-C09GJ09r.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
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
import 'perfect-debounce';
import '@vue/shared';
import '@vueuse/core';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';
import './Textarea-BYfzemxZ.mjs';
import './DropdownMenuTrigger-dnC_q6qg.mjs';
import './Checkbox-aOmH4bgm.mjs';
import './TableHeader-f7ALV9Yi.mjs';
import './LoadingState-y5B8zlzY.mjs';
import './SelectValue-CDW_Y5sR.mjs';
import '@tanstack/vue-table';
import './nuxt-link-B_K_Hg2R.mjs';
import './index-DcmArl0H.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "report",
  __ssrInlineRender: true,
  setup(__props) {
    const productionStore = useProductionStore();
    const warehousesStore = useWarehousesStore();
    const warehouseFilter = ref("__all__");
    const startDate = ref("");
    const endDate = ref("");
    const summary = computed(() => productionStore.reportSummary);
    const batchColumns = getBatchReportColumns();
    async function load() {
      await Promise.all([
        warehousesStore.fetchWarehouses(),
        productionStore.fetchReport({
          warehouseId: warehouseFilter.value !== "__all__" ? warehouseFilter.value : void 0,
          startDate: startDate.value || void 0,
          endDate: endDate.value || void 0
        })
      ]);
    }
    watch([warehouseFilter, startDate, endDate], load);
    const wasteColor = (pct) => {
      if (pct <= 10) return "text-green-600";
      if (pct <= 20) return "text-yellow-600";
      return "text-red-600";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiLabel = _sfc_main$2;
      const _component_UiInput = _sfc_main$3;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$4;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Production Reports",
        description: "Efficiency and output analytics"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              onClick: load
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TrendingUp), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Refresh `);
                } else {
                  return [
                    createVNode(unref(TrendingUp), { class: "size-4" }),
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
                onClick: load
              }, {
                default: withCtx(() => [
                  createVNode(unref(TrendingUp), { class: "size-4" }),
                  createTextVNode(" Refresh ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-wrap gap-3">`);
      _push(ssrRenderComponent(_component_LookupCombobox, {
        modelValue: unref(warehouseFilter),
        "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
        endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
        placeholder: "All Warehouses",
        "include-all": "",
        "all-value": "__all__",
        "all-label": "All Warehouses",
        class: "w-44"
      }, null, _parent));
      _push(`<div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UiLabel, { class: "text-sm sr-only" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`From`);
          } else {
            return [
              createTextVNode("From")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(startDate),
        "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
        type: "date",
        class: "w-40"
      }, null, _parent));
      _push(`<span class="text-muted-foreground">—</span>`);
      _push(ssrRenderComponent(_component_UiLabel, { class: "text-sm sr-only" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`To`);
          } else {
            return [
              createTextVNode("To")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(endDate),
        "onUpdate:modelValue": ($event) => isRef(endDate) ? endDate.value = $event : null,
        type: "date",
        class: "w-40"
      }, null, _parent));
      _push(`</div></div>`);
      if (unref(summary)) {
        _push(`<!--[--><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Total Batches`);
                        } else {
                          return [
                            createTextVNode("Total Batches")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Factory), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Total Batches")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Factory), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(summary).totalBatches)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(summary).totalBatches), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Batches")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Factory), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(summary).totalBatches), 1)
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
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Total Output`);
                        } else {
                          return [
                            createTextVNode("Total Output")
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
                          createTextVNode("Total Output")
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
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(summary).totalOutput.toFixed(3))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(summary).totalOutput.toFixed(3)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Output")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Package), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(summary).totalOutput.toFixed(3)), 1)
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
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Waste %`);
                        } else {
                          return [
                            createTextVNode("Waste %")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(AlertTriangle), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Waste %")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(AlertTriangle), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="${ssrRenderClass([wasteColor(unref(summary).wastePercentage), "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate(unref(summary).wastePercentage.toFixed(1))}% </p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(summary).totalWaste.toFixed(3))} units wasted</p>`);
                  } else {
                    return [
                      createVNode("p", {
                        class: ["text-2xl font-bold", wasteColor(unref(summary).wastePercentage)]
                      }, toDisplayString(unref(summary).wastePercentage.toFixed(1)) + "% ", 3),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(summary).totalWaste.toFixed(3)) + " units wasted", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Waste %")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(AlertTriangle), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", {
                      class: ["text-2xl font-bold", wasteColor(unref(summary).wastePercentage)]
                    }, toDisplayString(unref(summary).wastePercentage.toFixed(1)) + "% ", 3),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(summary).totalWaste.toFixed(3)) + " units wasted", 1)
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
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Avg Cost / Unit`);
                        } else {
                          return [
                            createTextVNode("Avg Cost / Unit")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(DollarSign), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Avg Cost / Unit")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(summary).averageCostPerUnit.toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Total cost: ${ssrInterpolate(unref(summary).totalCost.toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(summary).averageCostPerUnit.toFixed(2)), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Total cost: " + toDisplayString(unref(summary).totalCost.toFixed(2)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Avg Cost / Unit")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(summary).averageCostPerUnit.toFixed(2)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Total cost: " + toDisplayString(unref(summary).totalCost.toFixed(2)), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="grid gap-6 lg:grid-cols-2">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Consumption vs Output`);
                        } else {
                          return [
                            createTextVNode("Consumption vs Output")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Raw materials used vs finished goods produced`);
                        } else {
                          return [
                            createTextVNode("Raw materials used vs finished goods produced")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Consumption vs Output")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Raw materials used vs finished goods produced")
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
                    _push3(`<div class="space-y-3"${_scopeId2}><div${_scopeId2}><div class="flex justify-between text-sm mb-1"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Raw Materials Consumed</span><span class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(unref(summary).totalConsumption.toFixed(3))}</span></div><div class="h-2.5 bg-muted rounded-full overflow-hidden"${_scopeId2}><div class="h-full bg-amber-500 rounded-full" style="${ssrRenderStyle({ width: "100%" })}"${_scopeId2}></div></div></div><div${_scopeId2}><div class="flex justify-between text-sm mb-1"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Finished Output</span><span class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(unref(summary).totalOutput.toFixed(3))}</span></div><div class="h-2.5 bg-muted rounded-full overflow-hidden"${_scopeId2}><div class="h-full bg-green-500 rounded-full" style="${ssrRenderStyle({ width: unref(summary).totalConsumption > 0 ? unref(summary).totalOutput / unref(summary).totalConsumption * 100 + "%" : "0%" })}"${_scopeId2}></div></div></div><div${_scopeId2}><div class="flex justify-between text-sm mb-1"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Waste</span><span class="font-medium tabular-nums text-destructive"${_scopeId2}>${ssrInterpolate(unref(summary).totalWaste.toFixed(3))}</span></div><div class="h-2.5 bg-muted rounded-full overflow-hidden"${_scopeId2}><div class="h-full bg-red-500 rounded-full" style="${ssrRenderStyle({ width: unref(summary).totalConsumption > 0 ? unref(summary).totalWaste / unref(summary).totalConsumption * 100 + "%" : "0%" })}"${_scopeId2}></div></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "flex justify-between text-sm mb-1" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Raw Materials Consumed"),
                            createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(unref(summary).totalConsumption.toFixed(3)), 1)
                          ]),
                          createVNode("div", { class: "h-2.5 bg-muted rounded-full overflow-hidden" }, [
                            createVNode("div", {
                              class: "h-full bg-amber-500 rounded-full",
                              style: { width: "100%" }
                            })
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "flex justify-between text-sm mb-1" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Finished Output"),
                            createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(unref(summary).totalOutput.toFixed(3)), 1)
                          ]),
                          createVNode("div", { class: "h-2.5 bg-muted rounded-full overflow-hidden" }, [
                            createVNode("div", {
                              class: "h-full bg-green-500 rounded-full",
                              style: { width: unref(summary).totalConsumption > 0 ? unref(summary).totalOutput / unref(summary).totalConsumption * 100 + "%" : "0%" }
                            }, null, 4)
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "flex justify-between text-sm mb-1" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Waste"),
                            createVNode("span", { class: "font-medium tabular-nums text-destructive" }, toDisplayString(unref(summary).totalWaste.toFixed(3)), 1)
                          ]),
                          createVNode("div", { class: "h-2.5 bg-muted rounded-full overflow-hidden" }, [
                            createVNode("div", {
                              class: "h-full bg-red-500 rounded-full",
                              style: { width: unref(summary).totalConsumption > 0 ? unref(summary).totalWaste / unref(summary).totalConsumption * 100 + "%" : "0%" }
                            }, null, 4)
                          ])
                        ])
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
                        createTextVNode("Consumption vs Output")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Raw materials used vs finished goods produced")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "flex justify-between text-sm mb-1" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Raw Materials Consumed"),
                          createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(unref(summary).totalConsumption.toFixed(3)), 1)
                        ]),
                        createVNode("div", { class: "h-2.5 bg-muted rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: "h-full bg-amber-500 rounded-full",
                            style: { width: "100%" }
                          })
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "flex justify-between text-sm mb-1" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Finished Output"),
                          createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(unref(summary).totalOutput.toFixed(3)), 1)
                        ]),
                        createVNode("div", { class: "h-2.5 bg-muted rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: "h-full bg-green-500 rounded-full",
                            style: { width: unref(summary).totalConsumption > 0 ? unref(summary).totalOutput / unref(summary).totalConsumption * 100 + "%" : "0%" }
                          }, null, 4)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "flex justify-between text-sm mb-1" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Waste"),
                          createVNode("span", { class: "font-medium tabular-nums text-destructive" }, toDisplayString(unref(summary).totalWaste.toFixed(3)), 1)
                        ]),
                        createVNode("div", { class: "h-2.5 bg-muted rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: "h-full bg-red-500 rounded-full",
                            style: { width: unref(summary).totalConsumption > 0 ? unref(summary).totalWaste / unref(summary).totalConsumption * 100 + "%" : "0%" }
                          }, null, 4)
                        ])
                      ])
                    ])
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
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Cost Breakdown`);
                        } else {
                          return [
                            createTextVNode("Cost Breakdown")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Financial summary across all batches`);
                        } else {
                          return [
                            createTextVNode("Financial summary across all batches")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Cost Breakdown")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Financial summary across all batches")
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
                    _push3(`<div class="space-y-4"${_scopeId2}><div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(DollarSign), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-sm"${_scopeId2}>Total Production Cost</span></div><span class="font-bold text-lg tabular-nums"${_scopeId2}>${ssrInterpolate(unref(summary).totalCost.toFixed(2))}</span></div><div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Scale), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-sm"${_scopeId2}>Avg Cost Per Unit</span></div><span class="font-bold text-lg tabular-nums"${_scopeId2}>${ssrInterpolate(unref(summary).averageCostPerUnit.toFixed(2))}</span></div><div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Package), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-sm"${_scopeId2}>Total Batches</span></div><span class="font-bold text-lg tabular-nums"${_scopeId2}>${ssrInterpolate(unref(summary).totalBatches)}</span></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex items-center justify-between rounded-lg border p-3" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" }),
                            createVNode("span", { class: "text-sm" }, "Total Production Cost")
                          ]),
                          createVNode("span", { class: "font-bold text-lg tabular-nums" }, toDisplayString(unref(summary).totalCost.toFixed(2)), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between rounded-lg border p-3" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Scale), { class: "size-4 text-muted-foreground" }),
                            createVNode("span", { class: "text-sm" }, "Avg Cost Per Unit")
                          ]),
                          createVNode("span", { class: "font-bold text-lg tabular-nums" }, toDisplayString(unref(summary).averageCostPerUnit.toFixed(2)), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between rounded-lg border p-3" }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                            createVNode("span", { class: "text-sm" }, "Total Batches")
                          ]),
                          createVNode("span", { class: "font-bold text-lg tabular-nums" }, toDisplayString(unref(summary).totalBatches), 1)
                        ])
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
                        createTextVNode("Cost Breakdown")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Financial summary across all batches")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "flex items-center justify-between rounded-lg border p-3" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" }),
                          createVNode("span", { class: "text-sm" }, "Total Production Cost")
                        ]),
                        createVNode("span", { class: "font-bold text-lg tabular-nums" }, toDisplayString(unref(summary).totalCost.toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "flex items-center justify-between rounded-lg border p-3" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Scale), { class: "size-4 text-muted-foreground" }),
                          createVNode("span", { class: "text-sm" }, "Avg Cost Per Unit")
                        ]),
                        createVNode("span", { class: "font-bold text-lg tabular-nums" }, toDisplayString(unref(summary).averageCostPerUnit.toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "flex items-center justify-between rounded-lg border p-3" }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                          createVNode("span", { class: "text-sm" }, "Total Batches")
                        ]),
                        createVNode("span", { class: "font-bold text-lg tabular-nums" }, toDisplayString(unref(summary).totalBatches), 1)
                      ])
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
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Batch History`);
                        } else {
                          return [
                            createTextVNode("Batch History")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`All completed batches in this period`);
                        } else {
                          return [
                            createTextVNode("All completed batches in this period")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Batch History")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("All completed batches in this period")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_AppTable, {
                      data: unref(productionStore).reportBatches,
                      columns: unref(batchColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            title: "No batches found",
                            description: "Complete some production batches to see reports"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_EmptyState, {
                              title: "No batches found",
                              description: "Complete some production batches to see reports"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AppTable, {
                        data: unref(productionStore).reportBatches,
                        columns: unref(batchColumns),
                        "show-search": false,
                        "show-column-toggle": false,
                        "show-pagination": false
                      }, {
                        empty: withCtx(() => [
                          createVNode(_component_EmptyState, {
                            title: "No batches found",
                            description: "Complete some production batches to see reports"
                          })
                        ]),
                        _: 1
                      }, 8, ["data", "columns"])
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
                        createTextVNode("Batch History")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("All completed batches in this period")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "p-0" }, {
                  default: withCtx(() => [
                    createVNode(_component_AppTable, {
                      data: unref(productionStore).reportBatches,
                      columns: unref(batchColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No batches found",
                          description: "Complete some production batches to see reports"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "columns"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/production/report.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=report-DMAXlp0w.mjs.map
