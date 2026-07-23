import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, d as _sfc_main$4, e as _sfc_main$2$1 } from './CardTitle-St-iDBLB.mjs';
import { _ as _sfc_main$2 } from './Input-DA89G3IO.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-KK7k7FV7.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-y5B8zlzY.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-BVvkGjQ9.mjs';
import { _ as _sfc_main$8, a as _sfc_main$3, b as _sfc_main$4$1, c as _sfc_main$1$2, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-f7ALV9Yi.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-B_K_Hg2R.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, ref, watch, computed, resolveDirective, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, openBlock, createBlock, isRef, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Plus, FileText } from '@lucide/vue';
import { u as useSuppliersStore, f as fetchSuppliersLookupApi } from './store-DXABWweC.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as usePurchasesStore } from './store-B0h3miBc.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './Textarea-BYfzemxZ.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const purchasesStore = usePurchasesStore();
    useSuppliersStore();
    useWarehousesStore();
    const search = ref("");
    const supplierFilter = ref("all");
    const warehouseFilter = ref("all");
    const page = ref(1);
    const debouncedSearch = ref("");
    watch(search, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedSearch.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    watch([debouncedSearch, supplierFilter, warehouseFilter, page], () => fetchData());
    async function fetchData() {
      await purchasesStore.fetchPurchases({
        search: debouncedSearch.value || void 0,
        supplierId: supplierFilter.value === "all" ? void 0 : supplierFilter.value,
        warehouseId: warehouseFilter.value === "all" ? void 0 : warehouseFilter.value,
        page: page.value,
        limit: 20
      });
    }
    const totalPages = computed(() => Math.ceil(purchasesStore.total / 20));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiInput = _sfc_main$2;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$3;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$2;
      const _component_UiTableBody = _sfc_main$7;
      const _component_UiTableCell = _sfc_main$5;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiCardFooter = _sfc_main$2$1;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Purchase Invoices",
        description: "Manage supplier invoices and raw material purchases"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "PURCHASES", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` New Invoice `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "size-4" }),
                    createTextVNode(" New Invoice ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_UiButton, {
                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), { class: "size-4" }),
                  createTextVNode(" New Invoice ")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "PURCHASES", action: "CREATE" }]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(search),
                    "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                    placeholder: "Search by invoice # or supplier...",
                    class: "max-w-xs"
                  }, null, _parent3, _scopeId2));
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
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UiInput, {
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        placeholder: "Search by invoice # or supplier...",
                        class: "max-w-xs"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
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
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(purchasesStore).loading && unref(purchasesStore).invoices.length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(purchasesStore).invoices.length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No purchase invoices",
                      description: "Create your first purchase invoice",
                      action: "New Invoice",
                      onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
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
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-center" }, {
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
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "w-20 text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Action`);
                                          } else {
                                            return [
                                              createTextVNode("Action")
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
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-center" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Items")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Action")
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
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-center" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Items")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Action")
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
                                ssrRenderList(unref(purchasesStore).invoices, (inv) => {
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
                                              _push7(ssrRenderComponent(_component_NuxtLink, {
                                                to: `/suppliers/${inv.supplierId}`,
                                                class: "hover:underline"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(inv.supplier?.name)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_NuxtLink, {
                                                  to: `/suppliers/${inv.supplierId}`,
                                                  class: "hover:underline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(inv.supplier?.name), 1)
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
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
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
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-center text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(inv._count?.items ?? 0)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(inv._count?.items ?? 0), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_UiButton, {
                                                variant: "ghost",
                                                size: "icon-sm",
                                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/purchases/${inv.id}`)
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(FileText), { class: "size-4" }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(FileText), { class: "size-4" })
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiButton, {
                                                  variant: "ghost",
                                                  size: "icon-sm",
                                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/purchases/${inv.id}`)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(FileText), { class: "size-4" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])
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
                                              createVNode(_component_NuxtLink, {
                                                to: `/suppliers/${inv.supplierId}`,
                                                class: "hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to"])
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
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
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
                                          }, 1032, ["class"]),
                                          createVNode(_component_UiTableCell, { class: "text-center text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(inv._count?.items ?? 0), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiButton, {
                                                variant: "ghost",
                                                size: "icon-sm",
                                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/purchases/${inv.id}`)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(FileText), { class: "size-4" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(purchasesStore).invoices, (inv) => {
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
                                            createVNode(_component_NuxtLink, {
                                              to: `/suppliers/${inv.supplierId}`,
                                              class: "hover:underline"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["to"])
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
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
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
                                        }, 1032, ["class"]),
                                        createVNode(_component_UiTableCell, { class: "text-center text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(inv._count?.items ?? 0), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiButton, {
                                              variant: "ghost",
                                              size: "icon-sm",
                                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/purchases/${inv.id}`)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(FileText), { class: "size-4" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024)
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
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-center" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Items")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Action")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(purchasesStore).invoices, (inv) => {
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
                                          createVNode(_component_NuxtLink, {
                                            to: `/suppliers/${inv.supplierId}`,
                                            class: "hover:underline"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["to"])
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
                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
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
                                      }, 1032, ["class"]),
                                      createVNode(_component_UiTableCell, { class: "text-center text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(inv._count?.items ?? 0), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiButton, {
                                            variant: "ghost",
                                            size: "icon-sm",
                                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/purchases/${inv.id}`)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(FileText), { class: "size-4" })
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ]),
                                        _: 2
                                      }, 1024)
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
                    unref(purchasesStore).loading && unref(purchasesStore).invoices.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(purchasesStore).invoices.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-6"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No purchase invoices",
                        description: "Create your first purchase invoice",
                        action: "New Invoice",
                        onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                      }, null, 8, ["onAction"])
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
                                }),
                                createVNode(_component_UiTableHead, { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Items")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Action")
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(purchasesStore).invoices, (inv) => {
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
                                      createVNode(_component_NuxtLink, {
                                        to: `/suppliers/${inv.supplierId}`,
                                        class: "hover:underline"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["to"])
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
                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
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
                                  }, 1032, ["class"]),
                                  createVNode(_component_UiTableCell, { class: "text-center text-sm" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv._count?.items ?? 0), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiButton, {
                                        variant: "ghost",
                                        size: "icon-sm",
                                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/purchases/${inv.id}`)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(FileText), { class: "size-4" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1024)
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
            if (unref(purchasesStore).invoices.length > 0) {
              _push2(ssrRenderComponent(_component_UiCardFooter, { class: "border-t px-4 py-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between w-full"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(purchasesStore).total)} invoice${ssrInterpolate(unref(purchasesStore).total !== 1 ? "s" : "")}</p><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      size: "sm",
                      disabled: unref(page) <= 1,
                      onClick: ($event) => page.value--
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Previous`);
                        } else {
                          return [
                            createTextVNode("Previous")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<span class="text-xs text-muted-foreground"${_scopeId2}>Page ${ssrInterpolate(unref(page))} of ${ssrInterpolate(unref(totalPages))}</span>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      size: "sm",
                      disabled: unref(page) >= unref(totalPages),
                      onClick: ($event) => page.value++
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Next`);
                        } else {
                          return [
                            createTextVNode("Next")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between w-full" }, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(purchasesStore).total) + " invoice" + toDisplayString(unref(purchasesStore).total !== 1 ? "s" : ""), 1),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(_component_UiButton, {
                            variant: "outline",
                            size: "sm",
                            disabled: unref(page) <= 1,
                            onClick: ($event) => page.value--
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Previous")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"]),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "Page " + toDisplayString(unref(page)) + " of " + toDisplayString(unref(totalPages)), 1),
                          createVNode(_component_UiButton, {
                            variant: "outline",
                            size: "sm",
                            disabled: unref(page) >= unref(totalPages),
                            onClick: ($event) => page.value++
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Next")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"])
                        ])
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
                    createVNode(_component_UiInput, {
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      placeholder: "Search by invoice # or supplier...",
                      class: "max-w-xs"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
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
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx(() => [
                  unref(purchasesStore).loading && unref(purchasesStore).invoices.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(purchasesStore).invoices.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-6"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No purchase invoices",
                      description: "Create your first purchase invoice",
                      action: "New Invoice",
                      onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                    }, null, 8, ["onAction"])
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
                              }),
                              createVNode(_component_UiTableHead, { class: "text-center" }, {
                                default: withCtx(() => [
                                  createTextVNode("Items")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Action")
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(purchasesStore).invoices, (inv) => {
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
                                    createVNode(_component_NuxtLink, {
                                      to: `/suppliers/${inv.supplierId}`,
                                      class: "hover:underline"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.supplier?.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"])
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
                                createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
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
                                }, 1032, ["class"]),
                                createVNode(_component_UiTableCell, { class: "text-center text-sm" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv._count?.items ?? 0), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiButton, {
                                      variant: "ghost",
                                      size: "icon-sm",
                                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/purchases/${inv.id}`)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(FileText), { class: "size-4" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024)
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
              unref(purchasesStore).invoices.length > 0 ? (openBlock(), createBlock(_component_UiCardFooter, {
                key: 0,
                class: "border-t px-4 py-3"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between w-full" }, [
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(purchasesStore).total) + " invoice" + toDisplayString(unref(purchasesStore).total !== 1 ? "s" : ""), 1),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        disabled: unref(page) <= 1,
                        onClick: ($event) => page.value--
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Previous")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]),
                      createVNode("span", { class: "text-xs text-muted-foreground" }, "Page " + toDisplayString(unref(page)) + " of " + toDisplayString(unref(totalPages)), 1),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        disabled: unref(page) >= unref(totalPages),
                        onClick: ($event) => page.value++
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Next")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/purchases/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BBqaoYMU.mjs.map
