import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$3, a as _sfc_main$4, d as _sfc_main$3$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_10 } from './AppTable-fABlY_aP.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { a as useRoute, n as navigateTo } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { ArrowLeft, DollarSign, Package, TrendingUp, Scale } from '@lucide/vue';
import { a as getConsumptionColumns, b as getOutputColumns } from './column-DlfrMlov.mjs';
import { a as getDailyWageColumns } from './column-CMtsiFIc.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useProductionStore } from './store-C09GJ09r.mjs';
import { _ as _sfc_main$2 } from './index-CaQj38bB.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './Input-pgd-3rGf.mjs';
import '@vueuse/core';
import './DropdownMenuTrigger-MlqyivDB.mjs';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './SelectValue-CdUm-rR7.mjs';
import '@tanstack/vue-table';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';
import './nuxt-link-DEwgn_ii.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const productionStore = useProductionStore();
    const batch = computed(() => productionStore.currentBatch);
    const loading = computed(() => productionStore.loading);
    computed(() => {
      if (!batch.value?.consumptions) return 0;
      return batch.value.consumptions.reduce((s, c) => s + Number(c.quantity), 0);
    });
    const totalOutput = computed(() => {
      if (!batch.value?.outputs) return 0;
      return batch.value.outputs.reduce((s, o) => s + Number(o.quantity), 0);
    });
    const totalWaste = computed(() => {
      if (!batch.value?.outputs) return 0;
      return batch.value.outputs.reduce((s, o) => s + Number(o.waste), 0);
    });
    const efficiency = computed(() => {
      const total = totalOutput.value + totalWaste.value;
      if (total === 0) return 0;
      return totalOutput.value / total * 100;
    });
    const costPerUnit = computed(() => {
      if (totalOutput.value === 0) return 0;
      return Number(batch.value?.totalBatchCost || 0) / totalOutput.value;
    });
    const consumptionColumns = getConsumptionColumns();
    const outputColumns = getOutputColumns();
    const dailyWageColumns = getDailyWageColumns();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/production")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "size-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(batch)) {
        _push(ssrRenderComponent(PageHeader, {
          title: unref(batch).batchNumber,
          description: `Warehouse: ${unref(batch).warehouse?.name} · ${new Date(unref(batch).createdAt).toLocaleDateString()}`
        }, {
          actions: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: unref(batch).status === "COMPLETED" ? "default" : unref(batch).status === "CANCELLED" ? "destructive" : "secondary",
                class: "text-xs"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(batch).status)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(batch).status), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), {
                  variant: unref(batch).status === "COMPLETED" ? "default" : unref(batch).status === "CANCELLED" ? "destructive" : "secondary",
                  class: "text-xs"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(batch).status), 1)
                  ]),
                  _: 1
                }, 8, ["variant"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else if (unref(batch)) {
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
                          _push4(`Total Cost`);
                        } else {
                          return [
                            createTextVNode("Total Cost")
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
                          createTextVNode("Total Cost")
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
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(Number(unref(batch).totalBatchCost).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Raw: ${ssrInterpolate(Number(unref(batch).rawMaterialsCost).toFixed(2))} · Labor: ${ssrInterpolate(Number(unref(batch).laborCost).toFixed(2))} · Other: ${ssrInterpolate(Number(unref(batch).otherCosts).toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(batch).totalBatchCost).toFixed(2)), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Raw: " + toDisplayString(Number(unref(batch).rawMaterialsCost).toFixed(2)) + " · Labor: " + toDisplayString(Number(unref(batch).laborCost).toFixed(2)) + " · Other: " + toDisplayString(Number(unref(batch).otherCosts).toFixed(2)), 1)
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
                        createTextVNode("Total Cost")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(batch).totalBatchCost).toFixed(2)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Raw: " + toDisplayString(Number(unref(batch).rawMaterialsCost).toFixed(2)) + " · Labor: " + toDisplayString(Number(unref(batch).laborCost).toFixed(2)) + " · Other: " + toDisplayString(Number(unref(batch).otherCosts).toFixed(2)), 1)
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
                          _push4(`Output Qty`);
                        } else {
                          return [
                            createTextVNode("Output Qty")
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
                          createTextVNode("Output Qty")
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
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(totalOutput).toFixed(3))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Waste: ${ssrInterpolate(unref(totalWaste).toFixed(3))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalOutput).toFixed(3)), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Waste: " + toDisplayString(unref(totalWaste).toFixed(3)), 1)
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
                        createTextVNode("Output Qty")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Package), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalOutput).toFixed(3)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Waste: " + toDisplayString(unref(totalWaste).toFixed(3)), 1)
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
                          _push4(`Efficiency`);
                        } else {
                          return [
                            createTextVNode("Efficiency")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(TrendingUp), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Efficiency")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(TrendingUp), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="${ssrRenderClass([unref(efficiency) >= 80 ? "text-green-600" : unref(efficiency) >= 60 ? "text-yellow-600" : "text-red-600", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate(unref(efficiency).toFixed(1))}% </p>`);
                  } else {
                    return [
                      createVNode("p", {
                        class: ["text-2xl font-bold", unref(efficiency) >= 80 ? "text-green-600" : unref(efficiency) >= 60 ? "text-yellow-600" : "text-red-600"]
                      }, toDisplayString(unref(efficiency).toFixed(1)) + "% ", 3)
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
                        createTextVNode("Efficiency")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TrendingUp), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", {
                      class: ["text-2xl font-bold", unref(efficiency) >= 80 ? "text-green-600" : unref(efficiency) >= 60 ? "text-yellow-600" : "text-red-600"]
                    }, toDisplayString(unref(efficiency).toFixed(1)) + "% ", 3)
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
                          _push4(`Cost / Unit`);
                        } else {
                          return [
                            createTextVNode("Cost / Unit")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Scale), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Cost / Unit")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Scale), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(costPerUnit).toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(costPerUnit).toFixed(2)), 1)
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
                        createTextVNode("Cost / Unit")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Scale), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(costPerUnit).toFixed(2)), 1)
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
                          _push4(`Raw Materials Consumed`);
                        } else {
                          return [
                            createTextVNode("Raw Materials Consumed")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Input products used in this batch`);
                        } else {
                          return [
                            createTextVNode("Input products used in this batch")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Raw Materials Consumed")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Input products used in this batch")
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
                    _push3(ssrRenderComponent(_component_AppTable, {
                      data: unref(batch).consumptions || [],
                      columns: unref(consumptionColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            title: "No consumptions",
                            description: "No raw materials recorded"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_EmptyState, {
                              title: "No consumptions",
                              description: "No raw materials recorded"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AppTable, {
                        data: unref(batch).consumptions || [],
                        columns: unref(consumptionColumns),
                        "show-search": false,
                        "show-column-toggle": false,
                        "show-pagination": false
                      }, {
                        empty: withCtx(() => [
                          createVNode(_component_EmptyState, {
                            title: "No consumptions",
                            description: "No raw materials recorded"
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
                        createTextVNode("Raw Materials Consumed")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Input products used in this batch")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_AppTable, {
                      data: unref(batch).consumptions || [],
                      columns: unref(consumptionColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No consumptions",
                          description: "No raw materials recorded"
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
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Finished Products Output`);
                        } else {
                          return [
                            createTextVNode("Finished Products Output")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Packaged items produced`);
                        } else {
                          return [
                            createTextVNode("Packaged items produced")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Finished Products Output")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Packaged items produced")
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
                    _push3(ssrRenderComponent(_component_AppTable, {
                      data: unref(batch).outputs || [],
                      columns: unref(outputColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            title: "No outputs",
                            description: "No finished products recorded"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_EmptyState, {
                              title: "No outputs",
                              description: "No finished products recorded"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AppTable, {
                        data: unref(batch).outputs || [],
                        columns: unref(outputColumns),
                        "show-search": false,
                        "show-column-toggle": false,
                        "show-pagination": false
                      }, {
                        empty: withCtx(() => [
                          createVNode(_component_EmptyState, {
                            title: "No outputs",
                            description: "No finished products recorded"
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
                        createTextVNode("Finished Products Output")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Packaged items produced")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_AppTable, {
                      data: unref(batch).outputs || [],
                      columns: unref(outputColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No outputs",
                          description: "No finished products recorded"
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
                          _push4(`Worker Daily Wages`);
                        } else {
                          return [
                            createTextVNode("Worker Daily Wages")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Workers assigned to this batch and their daily wages`);
                        } else {
                          return [
                            createTextVNode("Workers assigned to this batch and their daily wages")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Worker Daily Wages")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Workers assigned to this batch and their daily wages")
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
                    _push3(ssrRenderComponent(_component_AppTable, {
                      data: unref(batch).workerDailyWages || [],
                      columns: unref(dailyWageColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            title: "No workers recorded",
                            description: "Log attendance and daily wages from the Workers page"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_EmptyState, {
                              title: "No workers recorded",
                              description: "Log attendance and daily wages from the Workers page"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AppTable, {
                        data: unref(batch).workerDailyWages || [],
                        columns: unref(dailyWageColumns),
                        "show-search": false,
                        "show-column-toggle": false,
                        "show-pagination": false
                      }, {
                        empty: withCtx(() => [
                          createVNode(_component_EmptyState, {
                            title: "No workers recorded",
                            description: "Log attendance and daily wages from the Workers page"
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
                        createTextVNode("Worker Daily Wages")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Workers assigned to this batch and their daily wages")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_AppTable, {
                      data: unref(batch).workerDailyWages || [],
                      columns: unref(dailyWageColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No workers recorded",
                          description: "Log attendance and daily wages from the Workers page"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/production/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-Cl9jCQ68.mjs.map
