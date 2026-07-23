import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, d as _sfc_main$4, c as _sfc_main$3, e as __nuxt_component_7 } from './CardTitle-CgdNZisr.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DZSn3naz.mjs';
import { _ as _sfc_main$5 } from './index-CaQj38bB.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { History, Package, Warehouse, ArrowUp, AlertTriangle, ArrowDown } from '@lucide/vue';
import { M as MOVEMENT_TYPES } from './type-x9vthGPe.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useStockStore } from './store-BHVa8pyv.mjs';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
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
import './api-Czl-Z3XJ.mjs';
import './api-Dq8IcxCC.mjs';
import './api-CBXtItch.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const productsStore = useProductsStore();
    const warehousesStore = useWarehousesStore();
    const stockStore = useStockStore();
    const loading = ref(true);
    const totalProducts = computed(() => productsStore.total);
    const totalWarehouses = computed(() => warehousesStore.warehouses.length);
    const totalStockValue = computed(() => {
      let total = 0;
      for (const s of stockStore.stocks) {
        s.product ? 0 : 0;
        total += Number(s.quantity);
      }
      return total;
    });
    console.log("totalStock", stockStore);
    const lowStockItems = computed(
      () => stockStore.stocks.filter((s) => Number(s.quantity) <= 0)
    );
    const recentMovements = computed(() => stockStore.movements.slice(0, 10));
    async function fetchAll() {
      loading.value = true;
      try {
        await Promise.all([
          productsStore.fetchProducts(),
          warehousesStore.fetchWarehouses(),
          stockStore.fetchStocks(),
          stockStore.fetchMovements({ limit: 10 })
        ]);
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_EmptyState = __nuxt_component_7;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiBadge = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Inventory Dashboard",
        description: "Overview of stock levels, alerts, and activity"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              onClick: fetchAll
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
                onClick: fetchAll
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
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else {
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
                          _push4(`Total Products`);
                        } else {
                          return [
                            createTextVNode("Total Products")
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
                          createTextVNode("Total Products")
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
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(totalProducts))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalProducts)), 1)
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
                        createTextVNode("Total Products")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Package), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalProducts)), 1)
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
                          _push4(`Warehouses`);
                        } else {
                          return [
                            createTextVNode("Warehouses")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Warehouse), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Warehouses")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(totalWarehouses))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalWarehouses)), 1)
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
                        createTextVNode("Warehouses")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalWarehouses)), 1)
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
                          _push4(`Total Stock Qty`);
                        } else {
                          return [
                            createTextVNode("Total Stock Qty")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ArrowUp), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Total Stock Qty")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(ArrowUp), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(totalStockValue).toFixed(1))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalStockValue).toFixed(1)), 1)
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
                        createTextVNode("Total Stock Qty")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ArrowUp), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalStockValue).toFixed(1)), 1)
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
                          _push4(`Low Stock Items`);
                        } else {
                          return [
                            createTextVNode("Low Stock Items")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(AlertTriangle), { class: "size-4 text-destructive" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Low Stock Items")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(AlertTriangle), { class: "size-4 text-destructive" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="${ssrRenderClass([unref(lowStockItems).length > 0 ? "text-destructive" : "", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate(unref(lowStockItems).length)}</p>`);
                  } else {
                    return [
                      createVNode("p", {
                        class: ["text-2xl font-bold", unref(lowStockItems).length > 0 ? "text-destructive" : ""]
                      }, toDisplayString(unref(lowStockItems).length), 3)
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
                        createTextVNode("Low Stock Items")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(AlertTriangle), { class: "size-4 text-destructive" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", {
                      class: ["text-2xl font-bold", unref(lowStockItems).length > 0 ? "text-destructive" : ""]
                    }, toDisplayString(unref(lowStockItems).length), 3)
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
                          _push4(`Items with zero or negative stock levels`);
                        } else {
                          return [
                            createTextVNode("Items with zero or negative stock levels")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Low Stock Alerts")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Items with zero or negative stock levels")
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
                    if (unref(lowStockItems).length === 0) {
                      _push3(`<div class="py-6"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_EmptyState, {
                        title: "All stock levels healthy",
                        description: "No low stock alerts at this time"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(lowStockItems), (item) => {
                        _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(unref(AlertTriangle), { class: "size-4 text-destructive shrink-0" }, null, _parent3, _scopeId2));
                        _push3(`<div${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtLink, {
                          to: `/products/${item.productId}`,
                          class: "text-sm font-medium hover:underline"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(item.product?.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(item.product?.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(item.warehouse?.name)}</p></div></div>`);
                        _push3(ssrRenderComponent(_component_UiBadge, {
                          variant: "destructive",
                          class: "text-xs"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(Number(item.quantity).toFixed(3))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
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
                      unref(lowStockItems).length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "py-6"
                      }, [
                        createVNode(_component_EmptyState, {
                          title: "All stock levels healthy",
                          description: "No low stock alerts at this time"
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(lowStockItems), (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "flex items-center justify-between rounded-lg border p-3"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(unref(AlertTriangle), { class: "size-4 text-destructive shrink-0" }),
                              createVNode("div", null, [
                                createVNode(_component_NuxtLink, {
                                  to: `/products/${item.productId}`,
                                  class: "text-sm font-medium hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.product?.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.warehouse?.name), 1)
                              ])
                            ]),
                            createVNode(_component_UiBadge, {
                              variant: "destructive",
                              class: "text-xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
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
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Low Stock Alerts")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Items with zero or negative stock levels")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    unref(lowStockItems).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-6"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "All stock levels healthy",
                        description: "No low stock alerts at this time"
                      })
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(lowStockItems), (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "flex items-center justify-between rounded-lg border p-3"
                        }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(AlertTriangle), { class: "size-4 text-destructive shrink-0" }),
                            createVNode("div", null, [
                              createVNode(_component_NuxtLink, {
                                to: `/products/${item.productId}`,
                                class: "text-sm font-medium hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.product?.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.warehouse?.name), 1)
                            ])
                          ]),
                          createVNode(_component_UiBadge, {
                            variant: "destructive",
                            class: "text-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
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
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
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
                          createTextVNode("Latest inventory transactions")
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
                    if (unref(recentMovements).length === 0) {
                      _push3(`<div class="py-6"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_EmptyState, {
                        title: "No movements yet",
                        description: "Stock movements will appear here"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(recentMovements), (m) => {
                        _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><div class="${ssrRenderClass(["size-8 flex items-center justify-center rounded-lg", Number(m.quantity) > 0 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"])}"${_scopeId2}>`);
                        if (Number(m.quantity) > 0) {
                          _push3(ssrRenderComponent(unref(ArrowUp), { class: "size-4 text-green-600" }, null, _parent3, _scopeId2));
                        } else {
                          _push3(ssrRenderComponent(unref(ArrowDown), { class: "size-4 text-red-600" }, null, _parent3, _scopeId2));
                        }
                        _push3(`</div><div${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtLink, {
                          to: `/products/${m.productId}`,
                          class: "text-sm font-medium hover:underline"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(m.product?.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(m.product?.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(m.warehouse?.name)} · ${ssrInterpolate(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type)}</p></div></div><span class="${ssrRenderClass([Number(m.quantity) > 0 ? "text-green-600" : "text-red-600", "text-sm font-medium tabular-nums"])}"${_scopeId2}>${ssrInterpolate(Number(m.quantity) > 0 ? "+" : "")}${ssrInterpolate(Number(m.quantity).toFixed(3))}</span></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    }
                  } else {
                    return [
                      unref(recentMovements).length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "py-6"
                      }, [
                        createVNode(_component_EmptyState, {
                          title: "No movements yet",
                          description: "Stock movements will appear here"
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(recentMovements), (m) => {
                          return openBlock(), createBlock("div", {
                            key: m.id,
                            class: "flex items-center justify-between rounded-lg border p-3"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("div", {
                                class: ["size-8 flex items-center justify-center rounded-lg", Number(m.quantity) > 0 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"]
                              }, [
                                Number(m.quantity) > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                  key: 0,
                                  class: "size-4 text-green-600"
                                })) : (openBlock(), createBlock(unref(ArrowDown), {
                                  key: 1,
                                  class: "size-4 text-red-600"
                                }))
                              ], 2),
                              createVNode("div", null, [
                                createVNode(_component_NuxtLink, {
                                  to: `/products/${m.productId}`,
                                  class: "text-sm font-medium hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(m.product?.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(m.warehouse?.name) + " · " + toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                              ])
                            ]),
                            createVNode("span", {
                              class: ["text-sm font-medium tabular-nums", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                            }, toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 3)
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
                        createTextVNode("Recent Movements")
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
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    unref(recentMovements).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-6"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No movements yet",
                        description: "Stock movements will appear here"
                      })
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(recentMovements), (m) => {
                        return openBlock(), createBlock("div", {
                          key: m.id,
                          class: "flex items-center justify-between rounded-lg border p-3"
                        }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("div", {
                              class: ["size-8 flex items-center justify-center rounded-lg", Number(m.quantity) > 0 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"]
                            }, [
                              Number(m.quantity) > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
                                key: 0,
                                class: "size-4 text-green-600"
                              })) : (openBlock(), createBlock(unref(ArrowDown), {
                                key: 1,
                                class: "size-4 text-red-600"
                              }))
                            ], 2),
                            createVNode("div", null, [
                              createVNode(_component_NuxtLink, {
                                to: `/products/${m.productId}`,
                                class: "text-sm font-medium hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(m.product?.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(m.warehouse?.name) + " · " + toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                            ])
                          ]),
                          createVNode("span", {
                            class: ["text-sm font-medium tabular-nums", Number(m.quantity) > 0 ? "text-green-600" : "text-red-600"]
                          }, toDisplayString(Number(m.quantity) > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 3)
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
        _push(`</div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/inventory/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-0t7eqK-O.mjs.map
