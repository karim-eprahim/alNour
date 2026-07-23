import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-y5B8zlzY.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, d as _sfc_main$4, c as _sfc_main$3 } from './CardTitle-St-iDBLB.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-BVvkGjQ9.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-B_K_Hg2R.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { RefreshCw, Package, TrendingUp, Scale, ShoppingBag, Briefcase, Users, Truck, DollarSign, AlertTriangle, ArrowUp, ArrowDown, TrendingDown, Receipt } from '@lucide/vue';
import { M as MOVEMENT_TYPES } from './type-x9vthGPe.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useAuthStore } from './server.mjs';
import { _ as _sfc_main$5 } from './index-DcmArl0H.mjs';
import 'class-variance-authority';
import 'reka-ui';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const userRole = computed(() => authStore.userRole);
    const isStorekeeper = computed(() => userRole.value === "STOREKEEPER");
    const isAccountant = computed(() => userRole.value === "ACCOUNTANT");
    const isAdmin = computed(() => userRole.value === "ADMIN" || userRole.value === "MANAGER");
    const isDistributor = computed(() => userRole.value === "DISTRIBUTOR");
    const canViewFinancial = computed(() => isAdmin.value || isAccountant.value);
    const canViewStock = computed(() => isAdmin.value || isStorekeeper.value || true);
    const loading = ref(true);
    const data = ref(null);
    async function fetchDashboard() {
      loading.value = true;
      try {
        data.value = await $fetch("/api/reports/dashboard");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Dashboard",
        description: "Welcome back to Al Nour Management System"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
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
        _push(`<!--[--><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
        if (unref(canViewStock)) {
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Stock Quantity`);
                          } else {
                            return [
                              createTextVNode("Stock Quantity")
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
                            createTextVNode("Stock Quantity")
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
                      _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate((unref(data).inventory?.totalStockQuantity || 0).toFixed(1))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(data).inventory?.warehouseCount || 0)} warehouses</p>`);
                    } else {
                      return [
                        createVNode("p", { class: "text-2xl font-bold" }, toDisplayString((unref(data).inventory?.totalStockQuantity || 0).toFixed(1)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(data).inventory?.warehouseCount || 0) + " warehouses", 1)
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
                          createTextVNode("Stock Quantity")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Package), { class: "size-4 text-muted-foreground" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString((unref(data).inventory?.totalStockQuantity || 0).toFixed(1)), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(data).inventory?.warehouseCount || 0) + " warehouses", 1)
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(canViewFinancial)) {
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Total Revenue`);
                          } else {
                            return [
                              createTextVNode("Total Revenue")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(TrendingUp), { class: "size-4 text-green-500" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Revenue")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(TrendingUp), { class: "size-4 text-green-500" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="text-2xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate((unref(data).financials?.totalRevenue || 0).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate((unref(data).financials?.totalCollected || 0).toFixed(2))} collected</p>`);
                    } else {
                      return [
                        createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString((unref(data).financials?.totalRevenue || 0).toFixed(2)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString((unref(data).financials?.totalCollected || 0).toFixed(2)) + " collected", 1)
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
                          createTextVNode("Total Revenue")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(TrendingUp), { class: "size-4 text-green-500" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString((unref(data).financials?.totalRevenue || 0).toFixed(2)), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString((unref(data).financials?.totalCollected || 0).toFixed(2)) + " collected", 1)
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(canViewFinancial)) {
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Net Profit`);
                          } else {
                            return [
                              createTextVNode("Net Profit")
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
                            createTextVNode("Net Profit")
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
                      _push3(`<p class="${ssrRenderClass([(unref(data).financials?.netProfit || 0) >= 0 ? "text-green-600" : "text-destructive", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate((unref(data).financials?.netProfit || 0).toFixed(2))}</p>`);
                    } else {
                      return [
                        createVNode("p", {
                          class: ["text-2xl font-bold", (unref(data).financials?.netProfit || 0) >= 0 ? "text-green-600" : "text-destructive"]
                        }, toDisplayString((unref(data).financials?.netProfit || 0).toFixed(2)), 3)
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
                          createTextVNode("Net Profit")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Scale), { class: "size-4 text-muted-foreground" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("p", {
                        class: ["text-2xl font-bold", (unref(data).financials?.netProfit || 0) >= 0 ? "text-green-600" : "text-destructive"]
                      }, toDisplayString((unref(data).financials?.netProfit || 0).toFixed(2)), 3)
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Products`);
                        } else {
                          return [
                            createTextVNode("Products")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ShoppingBag), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Products")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(ShoppingBag), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(data).counts?.totalProducts || 0)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).counts?.totalProducts || 0), 1)
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
                        createTextVNode("Products")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ShoppingBag), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).counts?.totalProducts || 0), 1)
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
                          _push4(`Workers`);
                        } else {
                          return [
                            createTextVNode("Workers")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Briefcase), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Workers")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Briefcase), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(data).counts?.totalWorkers || 0)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).counts?.totalWorkers || 0), 1)
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
                        createTextVNode("Workers")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Briefcase), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).counts?.totalWorkers || 0), 1)
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
                          _push4(`Customers`);
                        } else {
                          return [
                            createTextVNode("Customers")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Users), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Customers")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Users), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(data).counts?.totalCustomers || 0)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).counts?.totalCustomers || 0), 1)
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
                        createTextVNode("Customers")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Users), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).counts?.totalCustomers || 0), 1)
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
                          _push4(`Suppliers`);
                        } else {
                          return [
                            createTextVNode("Suppliers")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Truck), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Suppliers")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Truck), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(data).counts?.totalSuppliers || 0)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).counts?.totalSuppliers || 0), 1)
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
                        createTextVNode("Suppliers")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Truck), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).counts?.totalSuppliers || 0), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(isDistributor) && unref(data).distributor) {
          _push(`<div class="grid gap-4 sm:grid-cols-3">`);
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
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
                      _push3(ssrRenderComponent(unref(Truck), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                          default: withCtx(() => [
                            createTextVNode("My Custody")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Truck), { class: "size-4 text-muted-foreground" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate((unref(data).distributor.totalCustody || 0).toFixed(3))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>bags currently on truck</p>`);
                      if (unref(data).distributor.custodies?.length) {
                        _push3(`<div class="mt-3 space-y-1 border-t pt-3"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(data).distributor.custodies, (c) => {
                          _push3(`<div class="flex justify-between text-xs"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>${ssrInterpolate(c.productName)}</span><span class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(c.quantity.toFixed(3))}</span></div>`);
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode("p", { class: "text-2xl font-bold" }, toDisplayString((unref(data).distributor.totalCustody || 0).toFixed(3)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "bags currently on truck"),
                        unref(data).distributor.custodies?.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-3 space-y-1 border-t pt-3"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data).distributor.custodies, (c) => {
                            return openBlock(), createBlock("div", {
                              key: c.productId,
                              class: "flex justify-between text-xs"
                            }, [
                              createVNode("span", { class: "text-muted-foreground" }, toDisplayString(c.productName), 1),
                              createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(c.quantity.toFixed(3)), 1)
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true)
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
                          createTextVNode("My Custody")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Truck), { class: "size-4 text-muted-foreground" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString((unref(data).distributor.totalCustody || 0).toFixed(3)), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "bags currently on truck"),
                      unref(data).distributor.custodies?.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-3 space-y-1 border-t pt-3"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(data).distributor.custodies, (c) => {
                          return openBlock(), createBlock("div", {
                            key: c.productId,
                            class: "flex justify-between text-xs"
                          }, [
                            createVNode("span", { class: "text-muted-foreground" }, toDisplayString(c.productName), 1),
                            createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(c.quantity.toFixed(3)), 1)
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true)
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
                            _push4(`Today&#39;s Sales`);
                          } else {
                            return [
                              createTextVNode("Today's Sales")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(unref(ShoppingBag), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                          default: withCtx(() => [
                            createTextVNode("Today's Sales")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(ShoppingBag), { class: "size-4 text-muted-foreground" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(data).distributor.salesToday || 0)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>orders created today</p>`);
                    } else {
                      return [
                        createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).distributor.salesToday || 0), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "orders created today")
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
                          createTextVNode("Today's Sales")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(ShoppingBag), { class: "size-4 text-muted-foreground" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).distributor.salesToday || 0), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "orders created today")
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
                            _push4(`Financial Outstanding`);
                          } else {
                            return [
                              createTextVNode("Financial Outstanding")
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
                            createTextVNode("Financial Outstanding")
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
                      _push3(`<p class="${ssrRenderClass([(unref(data).distributor.outstanding || 0) > 0 ? "text-destructive" : "text-green-600", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate((unref(data).distributor.outstanding || 0).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate((unref(data).distributor.outstanding || 0) > 0 ? "balance due" : "no outstanding dues")}</p>`);
                    } else {
                      return [
                        createVNode("p", {
                          class: ["text-2xl font-bold", (unref(data).distributor.outstanding || 0) > 0 ? "text-destructive" : "text-green-600"]
                        }, toDisplayString((unref(data).distributor.outstanding || 0).toFixed(2)), 3),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString((unref(data).distributor.outstanding || 0) > 0 ? "balance due" : "no outstanding dues"), 1)
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
                          createTextVNode("Financial Outstanding")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("p", {
                        class: ["text-2xl font-bold", (unref(data).distributor.outstanding || 0) > 0 ? "text-destructive" : "text-green-600"]
                      }, toDisplayString((unref(data).distributor.outstanding || 0).toFixed(2)), 3),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString((unref(data).distributor.outstanding || 0) > 0 ? "balance due" : "no outstanding dues"), 1)
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
        if ((unref(isAdmin) || unref(isAccountant)) && unref(data).goodsInTransit) {
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center gap-2" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Truck), { class: "size-5" }, null, _parent4, _scopeId3));
                            _push4(` Goods in Transit / With Distributors `);
                          } else {
                            return [
                              createVNode(unref(Truck), { class: "size-5" }),
                              createTextVNode(" Goods in Transit / With Distributors ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Total inventory currently loaded on distributor trucks`);
                          } else {
                            return [
                              createTextVNode("Total inventory currently loaded on distributor trucks")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, { class: "flex items-center gap-2" }, {
                          default: withCtx(() => [
                            createVNode(unref(Truck), { class: "size-5" }),
                            createTextVNode(" Goods in Transit / With Distributors ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Total inventory currently loaded on distributor trucks")
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
                      _push3(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4"${_scopeId2}><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Total Bags in Transit</p><p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate((unref(data).goodsInTransit.totalQuantity || 0).toFixed(3))}</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Active Distributors</p><p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(data).goodsInTransit.distributorCount || 0)}</p></div></div>`);
                      if (unref(data).goodsInTransit.byDistributor?.length) {
                        _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(data).goodsInTransit.byDistributor, (d) => {
                          _push3(`<div class="rounded-lg border p-3"${_scopeId2}><div class="flex items-center justify-between mb-1"${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(d.name)}</p><span class="text-sm font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(d.totalQty.toFixed(3))}</span></div><div class="space-y-0.5"${_scopeId2}><!--[-->`);
                          ssrRenderList(d.products, (p) => {
                            _push3(`<div class="flex justify-between text-xs text-muted-foreground pl-2"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(p.name)}</span><span class="tabular-nums"${_scopeId2}>${ssrInterpolate(p.qty.toFixed(3))}</span></div>`);
                          });
                          _push3(`<!--]--></div></div>`);
                        });
                        _push3(`<!--]--></div>`);
                      } else {
                        _push3(`<div${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_EmptyState, {
                          title: "No goods in transit",
                          description: "All distributor trucks are empty"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      }
                    } else {
                      return [
                        createVNode("div", { class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4" }, [
                          createVNode("div", { class: "rounded-lg border p-4" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Total Bags in Transit"),
                            createVNode("p", { class: "text-2xl font-bold" }, toDisplayString((unref(data).goodsInTransit.totalQuantity || 0).toFixed(3)), 1)
                          ]),
                          createVNode("div", { class: "rounded-lg border p-4" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground" }, "Active Distributors"),
                            createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).goodsInTransit.distributorCount || 0), 1)
                          ])
                        ]),
                        unref(data).goodsInTransit.byDistributor?.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data).goodsInTransit.byDistributor, (d) => {
                            return openBlock(), createBlock("div", {
                              key: d.name,
                              class: "rounded-lg border p-3"
                            }, [
                              createVNode("div", { class: "flex items-center justify-between mb-1" }, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(d.name), 1),
                                createVNode("span", { class: "text-sm font-bold tabular-nums" }, toDisplayString(d.totalQty.toFixed(3)), 1)
                              ]),
                              createVNode("div", { class: "space-y-0.5" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(d.products, (p) => {
                                  return openBlock(), createBlock("div", {
                                    key: p.name,
                                    class: "flex justify-between text-xs text-muted-foreground pl-2"
                                  }, [
                                    createVNode("span", null, toDisplayString(p.name), 1),
                                    createVNode("span", { class: "tabular-nums" }, toDisplayString(p.qty.toFixed(3)), 1)
                                  ]);
                                }), 128))
                              ])
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
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
                  createVNode(_component_UiCardHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardTitle, { class: "flex items-center gap-2" }, {
                        default: withCtx(() => [
                          createVNode(unref(Truck), { class: "size-5" }),
                          createTextVNode(" Goods in Transit / With Distributors ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Total inventory currently loaded on distributor trucks")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4" }, [
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Total Bags in Transit"),
                          createVNode("p", { class: "text-2xl font-bold" }, toDisplayString((unref(data).goodsInTransit.totalQuantity || 0).toFixed(3)), 1)
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Active Distributors"),
                          createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(data).goodsInTransit.distributorCount || 0), 1)
                        ])
                      ]),
                      unref(data).goodsInTransit.byDistributor?.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(data).goodsInTransit.byDistributor, (d) => {
                          return openBlock(), createBlock("div", {
                            key: d.name,
                            class: "rounded-lg border p-3"
                          }, [
                            createVNode("div", { class: "flex items-center justify-between mb-1" }, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(d.name), 1),
                              createVNode("span", { class: "text-sm font-bold tabular-nums" }, toDisplayString(d.totalQty.toFixed(3)), 1)
                            ]),
                            createVNode("div", { class: "space-y-0.5" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(d.products, (p) => {
                                return openBlock(), createBlock("div", {
                                  key: p.name,
                                  class: "flex justify-between text-xs text-muted-foreground pl-2"
                                }, [
                                  createVNode("span", null, toDisplayString(p.name), 1),
                                  createVNode("span", { class: "tabular-nums" }, toDisplayString(p.qty.toFixed(3)), 1)
                                ]);
                              }), 128))
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
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
        } else {
          _push(`<!---->`);
        }
        if (unref(canViewStock) && unref(data).inventory) {
          _push(`<div class="grid gap-6 lg:grid-cols-2">`);
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
                            _push4(`Items with zero or negative stock`);
                          } else {
                            return [
                              createTextVNode("Items with zero or negative stock")
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
                            createTextVNode("Items with zero or negative stock")
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
                      if (!unref(data).inventory.lowStockAlerts?.items?.length) {
                        _push3(`<div class="py-6"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_EmptyState, {
                          title: "All stock levels healthy",
                          description: "No low stock alerts"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(data).inventory.lowStockAlerts.items, (item) => {
                          _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}>`);
                          _push3(ssrRenderComponent(unref(AlertTriangle), { class: "size-4 text-destructive shrink-0" }, null, _parent3, _scopeId2));
                          _push3(`<div${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_NuxtLink, {
                            to: `/products/${item.productId}`,
                            class: "text-sm font-medium hover:underline"
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
                          _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(item.warehouseName)}</p></div></div>`);
                          _push3(ssrRenderComponent(unref(_sfc_main$5), {
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
                        !unref(data).inventory.lowStockAlerts?.items?.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "py-6"
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
                                      createTextVNode(toDisplayString(item.productName), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.warehouseName), 1)
                                ])
                              ]),
                              createVNode(unref(_sfc_main$5), {
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
                          createTextVNode("Items with zero or negative stock")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      !unref(data).inventory.lowStockAlerts?.items?.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "py-6"
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
                                    createTextVNode(toDisplayString(item.productName), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(item.warehouseName), 1)
                              ])
                            ]),
                            createVNode(unref(_sfc_main$5), {
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
                    } else {
                      return [
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
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (!unref(data).inventory.recentMovements?.length) {
                        _push3(`<div class="py-6"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_EmptyState, {
                          title: "No movements yet",
                          description: "Stock movements will appear here"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(data).inventory.recentMovements, (m) => {
                          _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><div class="${ssrRenderClass(["size-8 flex items-center justify-center rounded-lg", m.quantity > 0 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"])}"${_scopeId2}>`);
                          if (m.quantity > 0) {
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
                                _push4(`${ssrInterpolate(m.productName)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(m.productName), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                          _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(m.warehouseName)} · ${ssrInterpolate(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type)}</p></div></div><span class="${ssrRenderClass([m.quantity > 0 ? "text-green-600" : "text-red-600", "text-sm font-medium tabular-nums"])}"${_scopeId2}>${ssrInterpolate(m.quantity > 0 ? "+" : "")}${ssrInterpolate(Number(m.quantity).toFixed(3))}</span></div>`);
                        });
                        _push3(`<!--]--></div>`);
                      }
                    } else {
                      return [
                        !unref(data).inventory.recentMovements?.length ? (openBlock(), createBlock("div", {
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data).inventory.recentMovements, (m) => {
                            return openBlock(), createBlock("div", {
                              key: m.id,
                              class: "flex items-center justify-between rounded-lg border p-3"
                            }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("div", {
                                  class: ["size-8 flex items-center justify-center rounded-lg", m.quantity > 0 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"]
                                }, [
                                  m.quantity > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
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
                                      createTextVNode(toDisplayString(m.productName), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(m.warehouseName) + " · " + toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                ])
                              ]),
                              createVNode("span", {
                                class: ["text-sm font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                              }, toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 3)
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
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      !unref(data).inventory.recentMovements?.length ? (openBlock(), createBlock("div", {
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
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(data).inventory.recentMovements, (m) => {
                          return openBlock(), createBlock("div", {
                            key: m.id,
                            class: "flex items-center justify-between rounded-lg border p-3"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("div", {
                                class: ["size-8 flex items-center justify-center rounded-lg", m.quantity > 0 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"]
                              }, [
                                m.quantity > 0 ? (openBlock(), createBlock(unref(ArrowUp), {
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
                                    createTextVNode(toDisplayString(m.productName), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(m.warehouseName) + " · " + toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                              ])
                            ]),
                            createVNode("span", {
                              class: ["text-sm font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                            }, toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 3)
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
        if (unref(canViewFinancial) && unref(data).financials) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Financial Snapshot`);
                          } else {
                            return [
                              createTextVNode("Financial Snapshot")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Revenue, costs, expenses, and profit overview`);
                          } else {
                            return [
                              createTextVNode("Revenue, costs, expenses, and profit overview")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Financial Snapshot")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Revenue, costs, expenses, and profit overview")
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
                      _push3(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"${_scopeId2}><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(DollarSign), { class: "size-3.5" }, null, _parent3, _scopeId2));
                      _push3(` Revenue</p><p class="text-xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(unref(data).financials.totalRevenue.toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(data).financials.totalCollected.toFixed(2))} collected</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(TrendingDown), { class: "size-3.5" }, null, _parent3, _scopeId2));
                      _push3(` COGS</p><p class="text-xl font-bold text-amber-600"${_scopeId2}>${ssrInterpolate(unref(data).financials.totalCogs.toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Raw materials consumed</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Briefcase), { class: "size-3.5" }, null, _parent3, _scopeId2));
                      _push3(` Labor Costs</p><p class="text-xl font-bold text-orange-600"${_scopeId2}>${ssrInterpolate(unref(data).financials.totalLaborCosts.toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Worker daily wages</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Receipt), { class: "size-3.5" }, null, _parent3, _scopeId2));
                      _push3(` Expenses</p><p class="text-xl font-bold text-destructive"${_scopeId2}>${ssrInterpolate(unref(data).financials.totalExpenses.toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Operating expenses</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Scale), { class: "size-3.5" }, null, _parent3, _scopeId2));
                      _push3(` Gross Profit</p><p class="${ssrRenderClass([unref(data).financials.grossProfit >= 0 ? "text-green-600" : "text-destructive", "text-xl font-bold"])}"${_scopeId2}>${ssrInterpolate(unref(data).financials.grossProfit.toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Revenue − COGS</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Scale), { class: "size-3.5" }, null, _parent3, _scopeId2));
                      _push3(` Net Profit</p><p class="${ssrRenderClass([unref(data).financials.netProfit >= 0 ? "text-green-600" : "text-destructive", "text-xl font-bold"])}"${_scopeId2}>${ssrInterpolate(unref(data).financials.netProfit.toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Gross − Labor − Expenses</p></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4" }, [
                          createVNode("div", { class: "rounded-lg border p-4" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                              createVNode(unref(DollarSign), { class: "size-3.5" }),
                              createTextVNode(" Revenue")
                            ]),
                            createVNode("p", { class: "text-xl font-bold text-green-600" }, toDisplayString(unref(data).financials.totalRevenue.toFixed(2)), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(data).financials.totalCollected.toFixed(2)) + " collected", 1)
                          ]),
                          createVNode("div", { class: "rounded-lg border p-4" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                              createVNode(unref(TrendingDown), { class: "size-3.5" }),
                              createTextVNode(" COGS")
                            ]),
                            createVNode("p", { class: "text-xl font-bold text-amber-600" }, toDisplayString(unref(data).financials.totalCogs.toFixed(2)), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Raw materials consumed")
                          ]),
                          createVNode("div", { class: "rounded-lg border p-4" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                              createVNode(unref(Briefcase), { class: "size-3.5" }),
                              createTextVNode(" Labor Costs")
                            ]),
                            createVNode("p", { class: "text-xl font-bold text-orange-600" }, toDisplayString(unref(data).financials.totalLaborCosts.toFixed(2)), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Worker daily wages")
                          ]),
                          createVNode("div", { class: "rounded-lg border p-4" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                              createVNode(unref(Receipt), { class: "size-3.5" }),
                              createTextVNode(" Expenses")
                            ]),
                            createVNode("p", { class: "text-xl font-bold text-destructive" }, toDisplayString(unref(data).financials.totalExpenses.toFixed(2)), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Operating expenses")
                          ]),
                          createVNode("div", { class: "rounded-lg border p-4" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                              createVNode(unref(Scale), { class: "size-3.5" }),
                              createTextVNode(" Gross Profit")
                            ]),
                            createVNode("p", {
                              class: ["text-xl font-bold", unref(data).financials.grossProfit >= 0 ? "text-green-600" : "text-destructive"]
                            }, toDisplayString(unref(data).financials.grossProfit.toFixed(2)), 3),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Revenue − COGS")
                          ]),
                          createVNode("div", { class: "rounded-lg border p-4" }, [
                            createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                              createVNode(unref(Scale), { class: "size-3.5" }),
                              createTextVNode(" Net Profit")
                            ]),
                            createVNode("p", {
                              class: ["text-xl font-bold", unref(data).financials.netProfit >= 0 ? "text-green-600" : "text-destructive"]
                            }, toDisplayString(unref(data).financials.netProfit.toFixed(2)), 3),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Gross − Labor − Expenses")
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
                          createTextVNode("Financial Snapshot")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Revenue, costs, expenses, and profit overview")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4" }, [
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                            createVNode(unref(DollarSign), { class: "size-3.5" }),
                            createTextVNode(" Revenue")
                          ]),
                          createVNode("p", { class: "text-xl font-bold text-green-600" }, toDisplayString(unref(data).financials.totalRevenue.toFixed(2)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(data).financials.totalCollected.toFixed(2)) + " collected", 1)
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                            createVNode(unref(TrendingDown), { class: "size-3.5" }),
                            createTextVNode(" COGS")
                          ]),
                          createVNode("p", { class: "text-xl font-bold text-amber-600" }, toDisplayString(unref(data).financials.totalCogs.toFixed(2)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Raw materials consumed")
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                            createVNode(unref(Briefcase), { class: "size-3.5" }),
                            createTextVNode(" Labor Costs")
                          ]),
                          createVNode("p", { class: "text-xl font-bold text-orange-600" }, toDisplayString(unref(data).financials.totalLaborCosts.toFixed(2)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Worker daily wages")
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                            createVNode(unref(Receipt), { class: "size-3.5" }),
                            createTextVNode(" Expenses")
                          ]),
                          createVNode("p", { class: "text-xl font-bold text-destructive" }, toDisplayString(unref(data).financials.totalExpenses.toFixed(2)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Operating expenses")
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                            createVNode(unref(Scale), { class: "size-3.5" }),
                            createTextVNode(" Gross Profit")
                          ]),
                          createVNode("p", {
                            class: ["text-xl font-bold", unref(data).financials.grossProfit >= 0 ? "text-green-600" : "text-destructive"]
                          }, toDisplayString(unref(data).financials.grossProfit.toFixed(2)), 3),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Revenue − COGS")
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground flex items-center gap-1" }, [
                            createVNode(unref(Scale), { class: "size-3.5" }),
                            createTextVNode(" Net Profit")
                          ]),
                          createVNode("p", {
                            class: ["text-xl font-bold", unref(data).financials.netProfit >= 0 ? "text-green-600" : "text-destructive"]
                          }, toDisplayString(unref(data).financials.netProfit.toFixed(2)), 3),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Gross − Labor − Expenses")
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
          _push(`<div class="grid gap-6 lg:grid-cols-2">`);
          _push(ssrRenderComponent(_component_UiCard, null, {
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
                        _push3(`<div class="py-6"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_EmptyState, {
                          title: "No expenses",
                          description: "No expenses recorded yet"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(data).financials.recentExpenses, (e) => {
                          _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(e.title)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(e.category)} · ${ssrInterpolate(new Date(e.date).toLocaleDateString())}</p></div><span class="text-sm font-medium tabular-nums text-destructive"${_scopeId2}>${ssrInterpolate(Number(e.amount).toFixed(2))}</span></div>`);
                        });
                        _push3(`<!--]--></div>`);
                      }
                    } else {
                      return [
                        !unref(data).financials.recentExpenses?.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "py-6"
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
                              class: "flex items-center justify-between rounded-lg border p-3"
                            }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(e.title), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(e.category) + " · " + toDisplayString(new Date(e.date).toLocaleDateString()), 1)
                              ]),
                              createVNode("span", { class: "text-sm font-medium tabular-nums text-destructive" }, toDisplayString(Number(e.amount).toFixed(2)), 1)
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
                        class: "py-6"
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
                            class: "flex items-center justify-between rounded-lg border p-3"
                          }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-medium" }, toDisplayString(e.title), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(e.category) + " · " + toDisplayString(new Date(e.date).toLocaleDateString()), 1)
                            ]),
                            createVNode("span", { class: "text-sm font-medium tabular-nums text-destructive" }, toDisplayString(Number(e.amount).toFixed(2)), 1)
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
                    } else {
                      return [
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
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (!unref(data).financials.recentInvoices?.length) {
                        _push3(`<div class="py-6"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_EmptyState, {
                          title: "No invoices",
                          description: "No invoices created yet"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                        ssrRenderList(unref(data).financials.recentInvoices, (inv) => {
                          _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_NuxtLink, {
                            to: `/sales/invoices`,
                            class: "text-sm font-medium hover:underline"
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
                          _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(inv.customer?.name || "—")} · ${ssrInterpolate(new Date(inv.createdAt).toLocaleDateString())}</p></div><div class="text-right"${_scopeId2}><p class="text-sm font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(Number(inv.totalAmount).toFixed(2))}</p>`);
                          _push3(ssrRenderComponent(unref(_sfc_main$5), {
                            variant: inv.status === "PAID" ? "default" : inv.status === "PARTIAL" ? "secondary" : "destructive",
                            class: "text-[10px]"
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
                          class: "py-6"
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
                              class: "flex items-center justify-between rounded-lg border p-3"
                            }, [
                              createVNode("div", null, [
                                createVNode(_component_NuxtLink, {
                                  to: `/sales/invoices`,
                                  class: "text-sm font-medium hover:underline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(inv.customer?.name || "—") + " · " + toDisplayString(new Date(inv.createdAt).toLocaleDateString()), 1)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("p", { class: "text-sm font-medium tabular-nums" }, toDisplayString(Number(inv.totalAmount).toFixed(2)), 1),
                                createVNode(unref(_sfc_main$5), {
                                  variant: inv.status === "PAID" ? "default" : inv.status === "PARTIAL" ? "secondary" : "destructive",
                                  class: "text-[10px]"
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
                  createVNode(_component_UiCardHeader, null, {
                    default: withCtx(() => [
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
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      !unref(data).financials.recentInvoices?.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "py-6"
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
                            class: "flex items-center justify-between rounded-lg border p-3"
                          }, [
                            createVNode("div", null, [
                              createVNode(_component_NuxtLink, {
                                to: `/sales/invoices`,
                                class: "text-sm font-medium hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(inv.customer?.name || "—") + " · " + toDisplayString(new Date(inv.createdAt).toLocaleDateString()), 1)
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "text-sm font-medium tabular-nums" }, toDisplayString(Number(inv.totalAmount).toFixed(2)), 1),
                              createVNode(unref(_sfc_main$5), {
                                variant: inv.status === "PAID" ? "default" : inv.status === "PARTIAL" ? "secondary" : "destructive",
                                class: "text-[10px]"
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
          _push(`</div><!--]-->`);
        } else {
          _push(`<!---->`);
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
//# sourceMappingURL=index-BtK3TWFs.mjs.map
