import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, a as _sfc_main$4, d as _sfc_main$3$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$3, a as _sfc_main$1$2, b as _sfc_main$5, c as _sfc_main$2$1 } from './index-CsamvZIh.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$8, a as _sfc_main$7, b as _sfc_main$4$1, c as _sfc_main$1$3, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-Cc67ZnYT.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DEwgn_ii.mjs';
import { _ as _sfc_main$9 } from './index-CaQj38bB.mjs';
import { a as useRoute, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, isRef, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { ArrowLeft, Warehouse, MapPin, Package } from '@lucide/vue';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import { u as useStockStore } from './store-C963M0dS.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
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
import './api-CBXtItch.mjs';
import './api-CNHGsjgp.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    computed(() => route.params.id);
    const warehousesStore = useWarehousesStore();
    const stockStore = useStockStore();
    const activeTab = ref("stock");
    const totalItems = computed(() => warehousesStore.currentWarehouse?.stocks?.length ?? 0);
    const totalQuantity = computed(() => {
      if (!warehousesStore.currentWarehouse?.stocks) return 0;
      return warehousesStore.currentWarehouse.stocks.reduce((sum, s) => sum + Number(s.quantity), 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiTabs = _sfc_main$3;
      const _component_UiTabsList = _sfc_main$1$2;
      const _component_UiTabsTrigger = _sfc_main$5;
      const _component_UiTabsContent = _sfc_main$2$1;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$7;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$3;
      const _component_UiTableBody = _sfc_main$7$1;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiBadge = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/warehouses")
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
      _push(`<div class="flex items-center gap-3"><div class="size-9 flex items-center justify-center rounded-lg bg-muted">`);
      _push(ssrRenderComponent(unref(Warehouse), { class: "size-4 text-muted-foreground" }, null, _parent));
      _push(`</div><div><h1 class="text-lg font-semibold">${ssrInterpolate(unref(warehousesStore).currentWarehouse?.name || "Loading...")}</h1>`);
      if (unref(warehousesStore).currentWarehouse?.location) {
        _push(`<p class="text-xs text-muted-foreground flex items-center gap-1">`);
        _push(ssrRenderComponent(unref(MapPin), { class: "size-3" }, null, _parent));
        _push(` ${ssrInterpolate(unref(warehousesStore).currentWarehouse.location)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="grid gap-4 sm:grid-cols-3">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total Products`);
                      } else {
                        return [
                          createTextVNode("Total Products")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Products")
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(totalItems))}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalItems)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-2" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Total Products")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalItems)), 1)
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
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total Quantity`);
                      } else {
                        return [
                          createTextVNode("Total Quantity")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Quantity")
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(totalQuantity).toFixed(3))}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalQuantity).toFixed(3)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-2" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Total Quantity")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalQuantity).toFixed(3)), 1)
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
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Stock Keeping Units`);
                      } else {
                        return [
                          createTextVNode("Stock Keeping Units")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Stock Keeping Units")
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(totalItems))}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalItems)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-2" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Stock Keeping Units")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalItems)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiTabs, {
        modelValue: unref(activeTab),
        "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
        class: "space-y-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiTabsList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "stock" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Stock`);
                      } else {
                        return [
                          createTextVNode("Stock")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "movements" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Recent Movements`);
                      } else {
                        return [
                          createTextVNode("Recent Movements")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsTrigger, { value: "stock" }, {
                      default: withCtx(() => [
                        createTextVNode("Stock")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "movements" }, {
                      default: withCtx(() => [
                        createTextVNode("Recent Movements")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "stock" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Warehouse Stock`);
                                  } else {
                                    return [
                                      createTextVNode("Warehouse Stock")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Current inventory in this location`);
                                  } else {
                                    return [
                                      createTextVNode("Current inventory in this location")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Warehouse Stock")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Current inventory in this location")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!unref(warehousesStore).currentWarehouse?.stocks?.length) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_EmptyState, {
                                  title: "Empty warehouse",
                                  description: "No products have been added to this warehouse yet"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                _push5(ssrRenderComponent(_component_UiTable, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHeader, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_UiTableRow, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Product`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Product")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`SKU`);
                                                      } else {
                                                        return [
                                                          createTextVNode("SKU")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Type`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Type")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Quantity`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Quantity")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Product")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("SKU")
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
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_UiTableRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Product")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("SKU")
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
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableBody, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(unref(warehousesStore).currentWarehouse?.stocks, (stock) => {
                                              _push7(ssrRenderComponent(_component_UiTableRow, {
                                                key: stock.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_UiTableCell, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`<div class="flex items-center gap-2"${_scopeId8}><div class="size-8 flex items-center justify-center rounded bg-muted overflow-hidden"${_scopeId8}>`);
                                                          if (stock.product.image) {
                                                            _push9(`<img${ssrRenderAttr("src", stock.product.image)} alt="" class="size-full object-cover"${_scopeId8}>`);
                                                          } else {
                                                            _push9(ssrRenderComponent(unref(Package), { class: "size-4 text-muted-foreground" }, null, _parent9, _scopeId8));
                                                          }
                                                          _push9(`</div>`);
                                                          _push9(ssrRenderComponent(_component_NuxtLink, {
                                                            to: `/products/${stock.product.id}`,
                                                            class: "text-sm font-medium hover:underline"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate(stock.product.name)}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString(stock.product.name), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                          _push9(`</div>`);
                                                        } else {
                                                          return [
                                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                                              createVNode("div", { class: "size-8 flex items-center justify-center rounded bg-muted overflow-hidden" }, [
                                                                stock.product.image ? (openBlock(), createBlock("img", {
                                                                  key: 0,
                                                                  src: stock.product.image,
                                                                  alt: "",
                                                                  class: "size-full object-cover"
                                                                }, null, 8, ["src"])) : (openBlock(), createBlock(unref(Package), {
                                                                  key: 1,
                                                                  class: "size-4 text-muted-foreground"
                                                                }))
                                                              ]),
                                                              createVNode(_component_NuxtLink, {
                                                                to: `/products/${stock.product.id}`,
                                                                class: "text-sm font-medium hover:underline"
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode(toDisplayString(stock.product.name), 1)
                                                                ]),
                                                                _: 2
                                                              }, 1032, ["to"])
                                                            ])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(stock.product.sku)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(stock.product.sku), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_UiBadge, {
                                                            variant: "secondary",
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate(stock.product.type.replace("_", " "))}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString(stock.product.type.replace("_", " ")), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_UiBadge, {
                                                              variant: "secondary",
                                                              class: "text-xs"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(stock.product.type.replace("_", " ")), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(Number(stock.quantity).toFixed(3))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_UiTableCell, null, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                                            createVNode("div", { class: "size-8 flex items-center justify-center rounded bg-muted overflow-hidden" }, [
                                                              stock.product.image ? (openBlock(), createBlock("img", {
                                                                key: 0,
                                                                src: stock.product.image,
                                                                alt: "",
                                                                class: "size-full object-cover"
                                                              }, null, 8, ["src"])) : (openBlock(), createBlock(unref(Package), {
                                                                key: 1,
                                                                class: "size-4 text-muted-foreground"
                                                              }))
                                                            ]),
                                                            createVNode(_component_NuxtLink, {
                                                              to: `/products/${stock.product.id}`,
                                                              class: "text-sm font-medium hover:underline"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(stock.product.name), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["to"])
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(stock.product.sku), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_UiBadge, {
                                                            variant: "secondary",
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(stock.product.type.replace("_", " ")), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(warehousesStore).currentWarehouse?.stocks, (stock) => {
                                                return openBlock(), createBlock(_component_UiTableRow, {
                                                  key: stock.id
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiTableCell, null, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                                          createVNode("div", { class: "size-8 flex items-center justify-center rounded bg-muted overflow-hidden" }, [
                                                            stock.product.image ? (openBlock(), createBlock("img", {
                                                              key: 0,
                                                              src: stock.product.image,
                                                              alt: "",
                                                              class: "size-full object-cover"
                                                            }, null, 8, ["src"])) : (openBlock(), createBlock(unref(Package), {
                                                              key: 1,
                                                              class: "size-4 text-muted-foreground"
                                                            }))
                                                          ]),
                                                          createVNode(_component_NuxtLink, {
                                                            to: `/products/${stock.product.id}`,
                                                            class: "text-sm font-medium hover:underline"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(stock.product.name), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["to"])
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(stock.product.sku), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_UiBadge, {
                                                          variant: "secondary",
                                                          class: "text-xs"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(stock.product.type.replace("_", " ")), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHeader, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Product")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("SKU")
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
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableBody, null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(warehousesStore).currentWarehouse?.stocks, (stock) => {
                                              return openBlock(), createBlock(_component_UiTableRow, {
                                                key: stock.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableCell, null, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                                        createVNode("div", { class: "size-8 flex items-center justify-center rounded bg-muted overflow-hidden" }, [
                                                          stock.product.image ? (openBlock(), createBlock("img", {
                                                            key: 0,
                                                            src: stock.product.image,
                                                            alt: "",
                                                            class: "size-full object-cover"
                                                          }, null, 8, ["src"])) : (openBlock(), createBlock(unref(Package), {
                                                            key: 1,
                                                            class: "size-4 text-muted-foreground"
                                                          }))
                                                        ]),
                                                        createVNode(_component_NuxtLink, {
                                                          to: `/products/${stock.product.id}`,
                                                          class: "text-sm font-medium hover:underline"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(stock.product.name), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["to"])
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(stock.product.sku), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_UiBadge, {
                                                        variant: "secondary",
                                                        class: "text-xs"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(stock.product.type.replace("_", " ")), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                                }, _parent5, _scopeId4));
                              }
                            } else {
                              return [
                                !unref(warehousesStore).currentWarehouse?.stocks?.length ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_EmptyState, {
                                    title: "Empty warehouse",
                                    description: "No products have been added to this warehouse yet"
                                  })
                                ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHeader, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Product")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("SKU")
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
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableBody, null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(warehousesStore).currentWarehouse?.stocks, (stock) => {
                                          return openBlock(), createBlock(_component_UiTableRow, {
                                            key: stock.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiTableCell, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                                    createVNode("div", { class: "size-8 flex items-center justify-center rounded bg-muted overflow-hidden" }, [
                                                      stock.product.image ? (openBlock(), createBlock("img", {
                                                        key: 0,
                                                        src: stock.product.image,
                                                        alt: "",
                                                        class: "size-full object-cover"
                                                      }, null, 8, ["src"])) : (openBlock(), createBlock(unref(Package), {
                                                        key: 1,
                                                        class: "size-4 text-muted-foreground"
                                                      }))
                                                    ]),
                                                    createVNode(_component_NuxtLink, {
                                                      to: `/products/${stock.product.id}`,
                                                      class: "text-sm font-medium hover:underline"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(stock.product.name), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["to"])
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(stock.product.sku), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiBadge, {
                                                    variant: "secondary",
                                                    class: "text-xs"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(stock.product.type.replace("_", " ")), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiCardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Warehouse Stock")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Current inventory in this location")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              !unref(warehousesStore).currentWarehouse?.stocks?.length ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-6"
                              }, [
                                createVNode(_component_EmptyState, {
                                  title: "Empty warehouse",
                                  description: "No products have been added to this warehouse yet"
                                })
                              ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Product")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("SKU")
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
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableBody, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(warehousesStore).currentWarehouse?.stocks, (stock) => {
                                        return openBlock(), createBlock(_component_UiTableRow, {
                                          key: stock.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableCell, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                  createVNode("div", { class: "size-8 flex items-center justify-center rounded bg-muted overflow-hidden" }, [
                                                    stock.product.image ? (openBlock(), createBlock("img", {
                                                      key: 0,
                                                      src: stock.product.image,
                                                      alt: "",
                                                      class: "size-full object-cover"
                                                    }, null, 8, ["src"])) : (openBlock(), createBlock(unref(Package), {
                                                      key: 1,
                                                      class: "size-4 text-muted-foreground"
                                                    }))
                                                  ]),
                                                  createVNode(_component_NuxtLink, {
                                                    to: `/products/${stock.product.id}`,
                                                    class: "text-sm font-medium hover:underline"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(stock.product.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to"])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(stock.product.sku), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiBadge, {
                                                  variant: "secondary",
                                                  class: "text-xs"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(stock.product.type.replace("_", " ")), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCard, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Warehouse Stock")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Current inventory in this location")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            !unref(warehousesStore).currentWarehouse?.stocks?.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-6"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "Empty warehouse",
                                description: "No products have been added to this warehouse yet"
                              })
                            ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Product")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("SKU")
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
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableBody, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(warehousesStore).currentWarehouse?.stocks, (stock) => {
                                      return openBlock(), createBlock(_component_UiTableRow, {
                                        key: stock.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center gap-2" }, [
                                                createVNode("div", { class: "size-8 flex items-center justify-center rounded bg-muted overflow-hidden" }, [
                                                  stock.product.image ? (openBlock(), createBlock("img", {
                                                    key: 0,
                                                    src: stock.product.image,
                                                    alt: "",
                                                    class: "size-full object-cover"
                                                  }, null, 8, ["src"])) : (openBlock(), createBlock(unref(Package), {
                                                    key: 1,
                                                    class: "size-4 text-muted-foreground"
                                                  }))
                                                ]),
                                                createVNode(_component_NuxtLink, {
                                                  to: `/products/${stock.product.id}`,
                                                  class: "text-sm font-medium hover:underline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(stock.product.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to"])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(stock.product.sku), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiBadge, {
                                                variant: "secondary",
                                                class: "text-xs"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(stock.product.type.replace("_", " ")), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "movements" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Recent Movements`);
                                  } else {
                                    return [
                                      createTextVNode("Recent Movements")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Latest stock transactions in this warehouse`);
                                  } else {
                                    return [
                                      createTextVNode("Latest stock transactions in this warehouse")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Recent Movements")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Latest stock transactions in this warehouse")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(stockStore).movements.length === 0) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_EmptyState, {
                                  title: "No movements",
                                  description: "Stock movements will appear here"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                _push5(ssrRenderComponent(_component_UiTable, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHeader, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_UiTableRow, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Date`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Date")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Product`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Product")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Type`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Type")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Qty`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Qty")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`By`);
                                                      } else {
                                                        return [
                                                          createTextVNode("By")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Date")
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
                                                        createTextVNode("Type")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Qty")
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
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_UiTableRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Date")
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
                                                      createTextVNode("Type")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Qty")
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
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableBody, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(unref(stockStore).movements, (m) => {
                                              _push7(ssrRenderComponent(_component_UiTableRow, {
                                                key: m.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(new Date(m.createdAt).toLocaleString())}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_NuxtLink, {
                                                            to: `/products/${m.productId}`,
                                                            class: "hover:underline"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate(m.product?.name)}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString(m.product?.name), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_NuxtLink, {
                                                              to: `/products/${m.productId}`,
                                                              class: "hover:underline"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(m.product?.name), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["to"])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_UiBadge, {
                                                            variant: Number(m.quantity) > 0 ? "default" : "destructive",
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate(m.type.replace("_", " "))}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString(m.type.replace("_", " ")), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_UiBadge, {
                                                              variant: Number(m.quantity) > 0 ? "default" : "destructive",
                                                              class: "text-xs"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(m.type.replace("_", " ")), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["variant"])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, {
                                                      class: ["text-right font-medium", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(Number(m.quantity) > 0 ? "+" : "")}${ssrInterpolate(Number(m.quantity).toFixed(3))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(m.createdBy?.name)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_NuxtLink, {
                                                            to: `/products/${m.productId}`,
                                                            class: "hover:underline"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(m.product?.name), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["to"])
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
                                                              createTextVNode(toDisplayString(m.type.replace("_", " ")), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["variant"])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, {
                                                        class: ["text-right font-medium", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["class"]),
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
                                              }, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                                                return openBlock(), createBlock(_component_UiTableRow, {
                                                  key: m.id
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtLink, {
                                                          to: `/products/${m.productId}`,
                                                          class: "hover:underline"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(m.product?.name), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["to"])
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
                                                            createTextVNode(toDisplayString(m.type.replace("_", " ")), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["variant"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, {
                                                      class: ["text-right font-medium", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["class"]),
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
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHeader, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Date")
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
                                                    createTextVNode("Type")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Qty")
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
                                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtLink, {
                                                        to: `/products/${m.productId}`,
                                                        class: "hover:underline"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(m.product?.name), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["to"])
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
                                                          createTextVNode(toDisplayString(m.type.replace("_", " ")), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["variant"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, {
                                                    class: ["text-right font-medium", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["class"]),
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
                                }, _parent5, _scopeId4));
                              }
                            } else {
                              return [
                                unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_EmptyState, {
                                    title: "No movements",
                                    description: "Stock movements will appear here"
                                  })
                                ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHeader, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Date")
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
                                                createTextVNode("Type")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Qty")
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
                                              createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtLink, {
                                                    to: `/products/${m.productId}`,
                                                    class: "hover:underline"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(m.product?.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to"])
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
                                                      createTextVNode(toDisplayString(m.type.replace("_", " ")), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, {
                                                class: ["text-right font-medium", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiCardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Recent Movements")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Latest stock transactions in this warehouse")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-6"
                              }, [
                                createVNode(_component_EmptyState, {
                                  title: "No movements",
                                  description: "Stock movements will appear here"
                                })
                              ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Date")
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
                                              createTextVNode("Type")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Qty")
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
                                            createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtLink, {
                                                  to: `/products/${m.productId}`,
                                                  class: "hover:underline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(m.product?.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to"])
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
                                                    createTextVNode(toDisplayString(m.type.replace("_", " ")), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, {
                                              class: ["text-right font-medium", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"]),
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
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCard, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Recent Movements")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Latest stock transactions in this warehouse")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-6"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "No movements",
                                description: "Stock movements will appear here"
                              })
                            ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Date")
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
                                            createTextVNode("Type")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Qty")
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
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtLink, {
                                                to: `/products/${m.productId}`,
                                                class: "hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(m.product?.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to"])
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
                                                  createTextVNode(toDisplayString(m.type.replace("_", " ")), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, {
                                            class: ["text-right font-medium", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"]),
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
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiTabsList, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsTrigger, { value: "stock" }, {
                    default: withCtx(() => [
                      createTextVNode("Stock")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "movements" }, {
                    default: withCtx(() => [
                      createTextVNode("Recent Movements")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "stock" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Warehouse Stock")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Current inventory in this location")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          !unref(warehousesStore).currentWarehouse?.stocks?.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-6"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "Empty warehouse",
                              description: "No products have been added to this warehouse yet"
                            })
                          ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Product")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("SKU")
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
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableBody, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(warehousesStore).currentWarehouse?.stocks, (stock) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: stock.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                              createVNode("div", { class: "size-8 flex items-center justify-center rounded bg-muted overflow-hidden" }, [
                                                stock.product.image ? (openBlock(), createBlock("img", {
                                                  key: 0,
                                                  src: stock.product.image,
                                                  alt: "",
                                                  class: "size-full object-cover"
                                                }, null, 8, ["src"])) : (openBlock(), createBlock(unref(Package), {
                                                  key: 1,
                                                  class: "size-4 text-muted-foreground"
                                                }))
                                              ]),
                                              createVNode(_component_NuxtLink, {
                                                to: `/products/${stock.product.id}`,
                                                class: "text-sm font-medium hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(stock.product.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to"])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(stock.product.sku), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiBadge, {
                                              variant: "secondary",
                                              class: "text-xs"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(stock.product.type.replace("_", " ")), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "movements" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Recent Movements")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Latest stock transactions in this warehouse")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-6"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No movements",
                              description: "Stock movements will appear here"
                            })
                          ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Date")
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
                                          createTextVNode("Type")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Qty")
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
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtLink, {
                                              to: `/products/${m.productId}`,
                                              class: "hover:underline"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(m.product?.name), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["to"])
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
                                                createTextVNode(toDisplayString(m.type.replace("_", " ")), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, {
                                          class: ["text-right font-medium", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"]),
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
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/warehouses/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-IgXBSJJF.mjs.map
