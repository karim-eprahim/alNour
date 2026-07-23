import { _ as _sfc_main$6, b as _sfc_main$1, c as _sfc_main$2, a as _sfc_main$4, d as _sfc_main$3 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$5 } from './index-CaQj38bB.mjs';
import { u as useAuthStore, n as navigateTo } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { Package, DollarSign, ClipboardList, TrendingUp, PlusCircle, CreditCard, Eye } from '@lucide/vue';
import { u as useDistributorStore } from './store-c63gT4nW.mjs';
import 'class-variance-authority';
import '@vueuse/core';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const todaySales = ref(0);
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiBadge = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Dashboard</h1><p class="text-sm text-muted-foreground">Welcome back, ${ssrInterpolate(("useAuthStore" in _ctx ? _ctx.useAuthStore : unref(useAuthStore))().user?.name)}</p></div></div><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(store).custodyTotalItems.toFixed(1))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(store).custodies.length)} products</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(store).custodyTotalItems.toFixed(1)), 1),
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
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(store).custodyTotalItems.toFixed(1)), 1),
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
                  _push3(`<p class="text-2xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(unref(store).cashOnHand.toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Available cash</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(unref(store).cashOnHand.toFixed(2)), 1),
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
                  createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(unref(store).cashOnHand.toFixed(2)), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, "Available cash")
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
      _push(`</div>`);
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
                      _push3(`<p class="text-sm font-semibold"${_scopeId2}>${ssrInterpolate(order.totalAmount.toFixed(2))}</p></div></div>`);
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
                            createVNode("p", { class: "text-sm font-semibold" }, toDisplayString(order.totalAmount.toFixed(2)), 1)
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
                          createVNode("p", { class: "text-sm font-semibold" }, toDisplayString(order.totalAmount.toFixed(2)), 1)
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
      _push(`<div class="grid gap-4 sm:grid-cols-3">`);
      _push(ssrRenderComponent(_component_UiCard, {
        class: "cursor-pointer transition-colors hover:bg-accent/50",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/customers")
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
//# sourceMappingURL=index-DYz5QtKZ.mjs.map
