import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, a as _sfc_main$4, e as _sfc_main$2$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$3 } from './Input-pgd-3rGf.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$8, a as _sfc_main$5, b as _sfc_main$4$1, c as _sfc_main$1$2, d as _sfc_main$7, e as _sfc_main$5$1 } from './TableHeader-Cc67ZnYT.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DEwgn_ii.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, isRef, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { TrendingUp, FileText, DollarSign, ArrowUpRight } from '@lucide/vue';
import { u as useSuppliersStore, f as fetchSuppliersLookupApi } from './store-DXABWweC.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as usePurchasesStore } from './store-B0h3miBc.mjs';
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
import './Textarea-B_fNd96X.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "report",
  __ssrInlineRender: true,
  setup(__props) {
    const purchasesStore = usePurchasesStore();
    useSuppliersStore();
    useWarehousesStore();
    const supplierFilter = ref("all");
    const warehouseFilter = ref("all");
    const startDate = ref("");
    const endDate = ref("");
    const debouncedStart = ref("");
    const debouncedEnd = ref("");
    watch(startDate, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedStart.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    watch(endDate, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedEnd.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    watch([supplierFilter, warehouseFilter, debouncedStart, debouncedEnd], () => fetchReport());
    async function fetchReport() {
      await purchasesStore.fetchReport({
        supplierId: supplierFilter.value === "all" ? void 0 : supplierFilter.value,
        warehouseId: warehouseFilter.value === "all" ? void 0 : warehouseFilter.value,
        startDate: debouncedStart.value || void 0,
        endDate: debouncedEnd.value || void 0
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiInput = _sfc_main$3;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$5;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$2;
      const _component_UiTableBody = _sfc_main$7;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiCardFooter = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Purchases Report",
        description: "Analyze purchase invoices over time"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              onClick: fetchReport
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
                onClick: fetchReport
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
      if (unref(purchasesStore).reportSummary) {
        _push(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Total Invoices`);
                        } else {
                          return [
                            createTextVNode("Total Invoices")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(FileText), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Total Invoices")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FileText), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(purchasesStore).reportSummary.totalInvoices)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(purchasesStore).reportSummary.totalInvoices), 1)
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
                        createTextVNode("Total Invoices")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FileText), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(purchasesStore).reportSummary.totalInvoices), 1)
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
                          _push4(`Total Amount`);
                        } else {
                          return [
                            createTextVNode("Total Amount")
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
                          createTextVNode("Total Amount")
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
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(purchasesStore).reportSummary.totalAmount.toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(purchasesStore).reportSummary.totalAmount.toFixed(2)), 1)
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
                        createTextVNode("Total Amount")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(purchasesStore).reportSummary.totalAmount.toFixed(2)), 1)
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
                          _push4(`Total Paid`);
                        } else {
                          return [
                            createTextVNode("Total Paid")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ArrowUpRight), { class: "size-4 text-green-600" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Total Paid")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(ArrowUpRight), { class: "size-4 text-green-600" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(unref(purchasesStore).reportSummary.totalPaid.toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(unref(purchasesStore).reportSummary.totalPaid.toFixed(2)), 1)
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
                        createTextVNode("Total Paid")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ArrowUpRight), { class: "size-4 text-green-600" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(unref(purchasesStore).reportSummary.totalPaid.toFixed(2)), 1)
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
                          _push4(`Total Due`);
                        } else {
                          return [
                            createTextVNode("Total Due")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ArrowUpRight), { class: "size-4 text-destructive" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Total Due")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(ArrowUpRight), { class: "size-4 text-destructive" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold text-destructive"${_scopeId2}>${ssrInterpolate(unref(purchasesStore).reportSummary.totalDue.toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold text-destructive" }, toDisplayString(unref(purchasesStore).reportSummary.totalDue.toFixed(2)), 1)
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
                        createTextVNode("Total Due")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ArrowUpRight), { class: "size-4 text-destructive" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold text-destructive" }, toDisplayString(unref(purchasesStore).reportSummary.totalDue.toFixed(2)), 1)
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
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(supplierFilter),
                    "onUpdate:modelValue": ($event) => isRef(supplierFilter) ? supplierFilter.value = $event : null,
                    endpoint: unref(fetchSuppliersLookupApi),
                    placeholder: "All suppliers",
                    "include-all": "",
                    class: "w-44"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(warehouseFilter),
                    "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
                    endpoint: unref(fetchWarehousesLookupApi),
                    placeholder: "All warehouses",
                    "include-all": "",
                    class: "w-44"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(startDate),
                    "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
                    type: "date",
                    class: "w-40",
                    placeholder: "Start date"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(endDate),
                    "onUpdate:modelValue": ($event) => isRef(endDate) ? endDate.value = $event : null,
                    type: "date",
                    class: "w-40",
                    placeholder: "End date"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(supplierFilter),
                        "onUpdate:modelValue": ($event) => isRef(supplierFilter) ? supplierFilter.value = $event : null,
                        endpoint: unref(fetchSuppliersLookupApi),
                        placeholder: "All suppliers",
                        "include-all": "",
                        class: "w-44"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(warehouseFilter),
                        "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
                        endpoint: unref(fetchWarehousesLookupApi),
                        placeholder: "All warehouses",
                        "include-all": "",
                        class: "w-44"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                      createVNode(_component_UiInput, {
                        modelValue: unref(startDate),
                        "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
                        type: "date",
                        class: "w-40",
                        placeholder: "Start date"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiInput, {
                        modelValue: unref(endDate),
                        "onUpdate:modelValue": ($event) => isRef(endDate) ? endDate.value = $event : null,
                        type: "date",
                        class: "w-40",
                        placeholder: "End date"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(purchasesStore).loading && unref(purchasesStore).reportInvoices.length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(purchasesStore).reportInvoices.length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No invoices found",
                      description: "Try adjusting your filters"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(ssrRenderComponent(_component_UiTable, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiTableHeader, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiTableRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Invoice #`);
                                          } else {
                                            return [
                                              createTextVNode("Invoice #")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Supplier`);
                                          } else {
                                            return [
                                              createTextVNode("Supplier")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Warehouse`);
                                          } else {
                                            return [
                                              createTextVNode("Warehouse")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Date`);
                                          } else {
                                            return [
                                              createTextVNode("Date")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Items`);
                                          } else {
                                            return [
                                              createTextVNode("Items")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Amount`);
                                          } else {
                                            return [
                                              createTextVNode("Amount")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Paid`);
                                          } else {
                                            return [
                                              createTextVNode("Paid")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Due`);
                                          } else {
                                            return [
                                              createTextVNode("Due")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Invoice #")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Supplier")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Warehouse")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Date")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Items")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Amount")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Paid")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Due")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Invoice #")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Supplier")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Warehouse")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Date")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Items")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Amount")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Paid")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Due")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiTableBody, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(purchasesStore).reportInvoices, (inv) => {
                                  _push5(ssrRenderComponent(_component_UiTableRow, {
                                    key: inv.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_NuxtLink, {
                                                to: `/purchases/${inv.id}`,
                                                class: "text-sm font-mono font-medium hover:underline"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(inv.invoiceNumber)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_NuxtLink, {
                                                  to: `/purchases/${inv.id}`,
                                                  class: "text-sm font-mono font-medium hover:underline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(inv.supplier?.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(inv.warehouse?.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(new Date(inv.invoiceDate).toLocaleDateString())}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(inv.items?.length || 0)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(inv.items?.length || 0), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(Number(inv.totalAmount).toFixed(2))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right tabular-nums text-green-600" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(Number(inv.paidAmount).toFixed(2))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, {
                                          class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtLink, {
                                                to: `/purchases/${inv.id}`,
                                                class: "text-sm font-mono font-medium hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(inv.items?.length || 0), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right tabular-nums text-green-600" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, {
                                            class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(purchasesStore).reportInvoices, (inv) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: inv.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtLink, {
                                              to: `/purchases/${inv.id}`,
                                              class: "text-sm font-mono font-medium hover:underline"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["to"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(inv.items?.length || 0), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right tabular-nums text-green-600" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, {
                                          class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiTableHeader, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableRow, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Invoice #")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Supplier")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Warehouse")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Date")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Items")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Amount")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Paid")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Due")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiTableBody, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(purchasesStore).reportInvoices, (inv) => {
                                  return openBlock(), createBlock(_component_UiTableRow, {
                                    key: inv.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtLink, {
                                            to: `/purchases/${inv.id}`,
                                            class: "text-sm font-mono font-medium hover:underline"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["to"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(inv.items?.length || 0), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right tabular-nums text-green-600" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, {
                                        class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    unref(purchasesStore).loading && unref(purchasesStore).reportInvoices.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(purchasesStore).reportInvoices.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-6"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No invoices found",
                        description: "Try adjusting your filters"
                      })
                    ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiTableRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Invoice #")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Supplier")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Warehouse")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Date")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Items")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Amount")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Paid")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Due")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTableBody, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(purchasesStore).reportInvoices, (inv) => {
                              return openBlock(), createBlock(_component_UiTableRow, {
                                key: inv.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        to: `/purchases/${inv.id}`,
                                        class: "text-sm font-mono font-medium hover:underline"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["to"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right text-sm" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.items?.length || 0), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right tabular-nums text-green-600" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, {
                                    class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(purchasesStore).reportInvoices.length > 0) {
              _push2(ssrRenderComponent(_component_UiCardFooter, { class: "border-t px-4 py-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between w-full"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(purchasesStore).reportInvoices.length)} invoices · ${ssrInterpolate(unref(purchasesStore).reportSummary?.totalItems.toFixed(3))} total qty </p><p class="text-xs text-muted-foreground"${_scopeId2}>Total: ${ssrInterpolate(unref(purchasesStore).reportSummary?.totalAmount.toFixed(2))}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between w-full" }, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(purchasesStore).reportInvoices.length) + " invoices · " + toDisplayString(unref(purchasesStore).reportSummary?.totalItems.toFixed(3)) + " total qty ", 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Total: " + toDisplayString(unref(purchasesStore).reportSummary?.totalAmount.toFixed(2)), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(supplierFilter),
                      "onUpdate:modelValue": ($event) => isRef(supplierFilter) ? supplierFilter.value = $event : null,
                      endpoint: unref(fetchSuppliersLookupApi),
                      placeholder: "All suppliers",
                      "include-all": "",
                      class: "w-44"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(warehouseFilter),
                      "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
                      endpoint: unref(fetchWarehousesLookupApi),
                      placeholder: "All warehouses",
                      "include-all": "",
                      class: "w-44"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                    createVNode(_component_UiInput, {
                      modelValue: unref(startDate),
                      "onUpdate:modelValue": ($event) => isRef(startDate) ? startDate.value = $event : null,
                      type: "date",
                      class: "w-40",
                      placeholder: "Start date"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UiInput, {
                      modelValue: unref(endDate),
                      "onUpdate:modelValue": ($event) => isRef(endDate) ? endDate.value = $event : null,
                      type: "date",
                      class: "w-40",
                      placeholder: "End date"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx(() => [
                  unref(purchasesStore).loading && unref(purchasesStore).reportInvoices.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(purchasesStore).reportInvoices.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-6"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No invoices found",
                      description: "Try adjusting your filters"
                    })
                  ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                    default: withCtx(() => [
                      createVNode(_component_UiTableHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiTableRow, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Invoice #")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Supplier")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Warehouse")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Date")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Items")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Amount")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Paid")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Due")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTableBody, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(purchasesStore).reportInvoices, (inv) => {
                            return openBlock(), createBlock(_component_UiTableRow, {
                              key: inv.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      to: `/purchases/${inv.id}`,
                                      class: "text-sm font-mono font-medium hover:underline"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-right text-sm" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.items?.length || 0), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-right tabular-nums text-green-600" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, {
                                  class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["class"])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              unref(purchasesStore).reportInvoices.length > 0 ? (openBlock(), createBlock(_component_UiCardFooter, {
                key: 0,
                class: "border-t px-4 py-3"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between w-full" }, [
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(purchasesStore).reportInvoices.length) + " invoices · " + toDisplayString(unref(purchasesStore).reportSummary?.totalItems.toFixed(3)) + " total qty ", 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Total: " + toDisplayString(unref(purchasesStore).reportSummary?.totalAmount.toFixed(2)), 1)
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/purchases/report.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=report-DKQyTJch.mjs.map
