import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, d as _sfc_main$4, e as __nuxt_component_7, f as _sfc_main$2$1 } from './CardTitle-CgdNZisr.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$2, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$8, a as _sfc_main$3, b as _sfc_main$4$1, c as _sfc_main$1$3, d as _sfc_main$7$1, e as _sfc_main$5 } from './TableHeader-Cc67ZnYT.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DZSn3naz.mjs';
import { _ as _sfc_main$b } from './index-CaQj38bB.mjs';
import { defineComponent, ref, watch, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { History, ArrowUp, ArrowDown } from '@lucide/vue';
import { M as MOVEMENT_TYPES } from './type-x9vthGPe.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useStockStore } from './store-BHVa8pyv.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
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
import './Input-pgd-3rGf.mjs';
import './Textarea-B_fNd96X.mjs';
import './api-Czl-Z3XJ.mjs';
import './api-Dq8IcxCC.mjs';

const limit = 30;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "movements",
  __ssrInlineRender: true,
  setup(__props) {
    const stockStore = useStockStore();
    useWarehousesStore();
    useProductsStore();
    const typeFilter = ref("all");
    const warehouseFilter = ref("all");
    const productSearch = ref("");
    const page = ref(1);
    watch([typeFilter, warehouseFilter, page], () => fetchData());
    const debouncedSearch = ref("");
    watch(productSearch, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedSearch.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    watch(debouncedSearch, () => {
      page.value = 1;
      fetchData();
    });
    async function fetchData() {
      await stockStore.fetchMovements({
        type: typeFilter.value === "all" ? void 0 : typeFilter.value,
        warehouseId: warehouseFilter.value === "all" ? void 0 : warehouseFilter.value,
        page: page.value,
        limit
      });
    }
    const totalPages = computed(() => Math.ceil(stockStore.totalMovements / limit));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$2;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$3;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$3;
      const _component_UiTableBody = _sfc_main$7$1;
      const _component_UiTableCell = _sfc_main$5;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiBadge = _sfc_main$b;
      const _component_UiCardFooter = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Stock Movements",
        description: "Complete inventory transaction log"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              onClick: fetchData
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(History), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Refresh `);
                } else {
                  return [
                    createVNode(unref(History), { class: "size-4" }),
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
                onClick: fetchData
              }, {
                default: withCtx(() => [
                  createVNode(unref(History), { class: "size-4" }),
                  createTextVNode(" Refresh ")
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
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(typeFilter),
                    "onUpdate:modelValue": ($event) => isRef(typeFilter) ? typeFilter.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "All types" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue, { placeholder: "All types" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "all" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`All types`);
                                  } else {
                                    return [
                                      createTextVNode("All types")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(MOVEMENT_TYPES), (mt) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: mt.value,
                                  value: mt.value
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(mt.label)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(mt.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "all" }, {
                                  default: withCtx(() => [
                                    createTextVNode("All types")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(MOVEMENT_TYPES), (mt) => {
                                  return openBlock(), createBlock(_component_UiSelectItem, {
                                    key: mt.value,
                                    value: mt.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(mt.label), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All types" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "all" }, {
                                default: withCtx(() => [
                                  createTextVNode("All types")
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(MOVEMENT_TYPES), (mt) => {
                                return openBlock(), createBlock(_component_UiSelectItem, {
                                  key: mt.value,
                                  value: mt.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(mt.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                      createVNode(_component_UiSelect, {
                        modelValue: unref(typeFilter),
                        "onUpdate:modelValue": ($event) => isRef(typeFilter) ? typeFilter.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All types" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "all" }, {
                                default: withCtx(() => [
                                  createTextVNode("All types")
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(MOVEMENT_TYPES), (mt) => {
                                return openBlock(), createBlock(_component_UiSelectItem, {
                                  key: mt.value,
                                  value: mt.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(mt.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
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
                  if (unref(stockStore).loading && unref(stockStore).movements.length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(stockStore).movements.length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No movements found",
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
                                            _push7(`Date &amp; Time`);
                                          } else {
                                            return [
                                              createTextVNode("Date & Time")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Product`);
                                          } else {
                                            return [
                                              createTextVNode("Product")
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
                                            _push7(`Type`);
                                          } else {
                                            return [
                                              createTextVNode("Type")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Quantity`);
                                          } else {
                                            return [
                                              createTextVNode("Quantity")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Reference`);
                                          } else {
                                            return [
                                              createTextVNode("Reference")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`By`);
                                          } else {
                                            return [
                                              createTextVNode("By")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Date & Time")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Product")
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
                                            createTextVNode("Type")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Quantity")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Reference")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("By")
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
                                          createTextVNode("Date & Time")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Product")
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
                                          createTextVNode("Type")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Quantity")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Reference")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("By")
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
                                ssrRenderList(unref(stockStore).movements, (m) => {
                                  _push5(ssrRenderComponent(_component_UiTableRow, {
                                    key: m.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground whitespace-nowrap" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(new Date(m.createdAt).toLocaleString())}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_NuxtLink, {
                                                to: `/products/${m.productId}`,
                                                class: "text-sm font-medium hover:underline"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(m.product?.name)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(m.product?.name), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(`<p class="text-xs text-muted-foreground font-mono"${_scopeId6}>${ssrInterpolate(m.product?.sku)}</p>`);
                                            } else {
                                              return [
                                                createVNode(_component_NuxtLink, {
                                                  to: `/products/${m.productId}`,
                                                  class: "text-sm font-medium hover:underline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(m.product?.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to"]),
                                                createVNode("p", { class: "text-xs text-muted-foreground font-mono" }, toDisplayString(m.product?.sku), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(m.warehouse?.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_UiBadge, {
                                                variant: Number(m.quantity) > 0 ? "default" : "destructive",
                                                class: "text-xs"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiBadge, {
                                                  variant: Number(m.quantity) > 0 ? "default" : "destructive",
                                                  class: "text-xs"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, {
                                          class: ["text-right font-medium tabular-nums", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="flex items-center justify-end gap-1"${_scopeId6}>`);
                                              if (Number(m.quantity) > 0) {
                                                _push7(ssrRenderComponent(unref(ArrowUp), { class: "size-3" }, null, _parent7, _scopeId6));
                                              } else {
                                                _push7(ssrRenderComponent(unref(ArrowDown), { class: "size-3" }, null, _parent7, _scopeId6));
                                              }
                                              _push7(` ${ssrInterpolate(Number(m.quantity) > 0 ? "+" : "")}${ssrInterpolate(Number(m.quantity).toFixed(3))}</div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "flex items-center justify-end gap-1" }, [
                                                  Number(m.quantity) > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                                    key: 0,
                                                    class: "size-3"
                                                  })) : (openBlock(), createBlock(unref(ArrowDown), {
                                                    key: 1,
                                                    class: "size-3"
                                                  })),
                                                  createTextVNode(" " + toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground font-mono" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(m.referenceId ? m.referenceId.slice(0, 8) + "..." : "—")}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(m.referenceId ? m.referenceId.slice(0, 8) + "..." : "—"), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(m.createdBy?.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground whitespace-nowrap" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtLink, {
                                                to: `/products/${m.productId}`,
                                                class: "text-sm font-medium hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(m.product?.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to"]),
                                              createVNode("p", { class: "text-xs text-muted-foreground font-mono" }, toDisplayString(m.product?.sku), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiBadge, {
                                                variant: Number(m.quantity) > 0 ? "default" : "destructive",
                                                class: "text-xs"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, {
                                            class: ["text-right font-medium tabular-nums", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center justify-end gap-1" }, [
                                                Number(m.quantity) > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                                  key: 0,
                                                  class: "size-3"
                                                })) : (openBlock(), createBlock(unref(ArrowDown), {
                                                  key: 1,
                                                  class: "size-3"
                                                })),
                                                createTextVNode(" " + toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["class"]),
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground font-mono" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(m.referenceId ? m.referenceId.slice(0, 8) + "..." : "—"), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(m.createdBy?.name), 1)
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: m.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground whitespace-nowrap" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtLink, {
                                              to: `/products/${m.productId}`,
                                              class: "text-sm font-medium hover:underline"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(m.product?.name), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["to"]),
                                            createVNode("p", { class: "text-xs text-muted-foreground font-mono" }, toDisplayString(m.product?.sku), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiBadge, {
                                              variant: Number(m.quantity) > 0 ? "default" : "destructive",
                                              class: "text-xs"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, {
                                          class: ["text-right font-medium tabular-nums", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center justify-end gap-1" }, [
                                              Number(m.quantity) > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                                key: 0,
                                                class: "size-3"
                                              })) : (openBlock(), createBlock(unref(ArrowDown), {
                                                key: 1,
                                                class: "size-3"
                                              })),
                                              createTextVNode(" " + toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1032, ["class"]),
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground font-mono" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(m.referenceId ? m.referenceId.slice(0, 8) + "..." : "—"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(m.createdBy?.name), 1)
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
                                        createTextVNode("Date & Time")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Product")
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
                                        createTextVNode("Type")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Quantity")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Reference")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("By")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                                  return openBlock(), createBlock(_component_UiTableRow, {
                                    key: m.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground whitespace-nowrap" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtLink, {
                                            to: `/products/${m.productId}`,
                                            class: "text-sm font-medium hover:underline"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(m.product?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["to"]),
                                          createVNode("p", { class: "text-xs text-muted-foreground font-mono" }, toDisplayString(m.product?.sku), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiBadge, {
                                            variant: Number(m.quantity) > 0 ? "default" : "destructive",
                                            class: "text-xs"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, {
                                        class: ["text-right font-medium tabular-nums", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center justify-end gap-1" }, [
                                            Number(m.quantity) > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                              key: 0,
                                              class: "size-3"
                                            })) : (openBlock(), createBlock(unref(ArrowDown), {
                                              key: 1,
                                              class: "size-3"
                                            })),
                                            createTextVNode(" " + toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]),
                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground font-mono" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(m.referenceId ? m.referenceId.slice(0, 8) + "..." : "—"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    unref(stockStore).loading && unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-6"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No movements found",
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
                                    createTextVNode("Date & Time")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Product")
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
                                    createTextVNode("Type")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Quantity")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Reference")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("By")
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                              return openBlock(), createBlock(_component_UiTableRow, {
                                key: m.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground whitespace-nowrap" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, {
                                        to: `/products/${m.productId}`,
                                        class: "text-sm font-medium hover:underline"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(m.product?.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["to"]),
                                      createVNode("p", { class: "text-xs text-muted-foreground font-mono" }, toDisplayString(m.product?.sku), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiBadge, {
                                        variant: Number(m.quantity) > 0 ? "default" : "destructive",
                                        class: "text-xs"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, {
                                    class: ["text-right font-medium tabular-nums", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center justify-end gap-1" }, [
                                        Number(m.quantity) > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                          key: 0,
                                          class: "size-3"
                                        })) : (openBlock(), createBlock(unref(ArrowDown), {
                                          key: 1,
                                          class: "size-3"
                                        })),
                                        createTextVNode(" " + toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]),
                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground font-mono" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(m.referenceId ? m.referenceId.slice(0, 8) + "..." : "—"), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(stockStore).movements.length > 0) {
              _push2(ssrRenderComponent(_component_UiCardFooter, { class: "border-t px-4 py-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between w-full"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(stockStore).totalMovements)} movement${ssrInterpolate(unref(stockStore).totalMovements !== 1 ? "s" : "")}</p><div class="flex items-center gap-2"${_scopeId2}>`);
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
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(stockStore).totalMovements) + " movement" + toDisplayString(unref(stockStore).totalMovements !== 1 ? "s" : ""), 1),
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
                    createVNode(_component_UiSelect, {
                      modelValue: unref(typeFilter),
                      "onUpdate:modelValue": ($event) => isRef(typeFilter) ? typeFilter.value = $event : null
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectValue, { placeholder: "All types" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelectContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectItem, { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("All types")
                              ]),
                              _: 1
                            }),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(MOVEMENT_TYPES), (mt) => {
                              return openBlock(), createBlock(_component_UiSelectItem, {
                                key: mt.value,
                                value: mt.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(mt.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
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
                  unref(stockStore).loading && unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-6"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No movements found",
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
                                  createTextVNode("Date & Time")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Product")
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
                                  createTextVNode("Type")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Quantity")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Reference")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("By")
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                            return openBlock(), createBlock(_component_UiTableRow, {
                              key: m.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground whitespace-nowrap" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, {
                                      to: `/products/${m.productId}`,
                                      class: "text-sm font-medium hover:underline"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(m.product?.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"]),
                                    createVNode("p", { class: "text-xs text-muted-foreground font-mono" }, toDisplayString(m.product?.sku), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiBadge, {
                                      variant: Number(m.quantity) > 0 ? "default" : "destructive",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, {
                                  class: ["text-right font-medium tabular-nums", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center justify-end gap-1" }, [
                                      Number(m.quantity) > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                        key: 0,
                                        class: "size-3"
                                      })) : (openBlock(), createBlock(unref(ArrowDown), {
                                        key: 1,
                                        class: "size-3"
                                      })),
                                      createTextVNode(" " + toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["class"]),
                                createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground font-mono" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(m.referenceId ? m.referenceId.slice(0, 8) + "..." : "—"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024))
                ]),
                _: 2
              }, 1024),
              unref(stockStore).movements.length > 0 ? (openBlock(), createBlock(_component_UiCardFooter, {
                key: 0,
                class: "border-t px-4 py-3"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between w-full" }, [
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(stockStore).totalMovements) + " movement" + toDisplayString(unref(stockStore).totalMovements !== 1 ? "s" : ""), 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stock/movements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=movements-DuDyuXPn.mjs.map
