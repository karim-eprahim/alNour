import { _ as _sfc_main$1 } from './index-CUpQupPt.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CjZdJj9x.mjs';
import { _ as _sfc_main$6, a as _sfc_main$4, b as _sfc_main$1$1, c as _sfc_main$2 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { _ as _sfc_main$3 } from './index-BJ9JiLtz.mjs';
import { a as useRoute, n as navigateTo, m as __nuxt_component_10 } from './server.mjs';
import { _ as __nuxt_component_11 } from './DistributorTrackingMap-DCPUw7bS.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { ArrowLeft } from '@lucide/vue';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'vue-sonner';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';

/* empty css                 */
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[trackingId]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    route.params.trackingId;
    const loading = ref(true);
    const error = ref(null);
    const data = ref(null);
    const routeCustomer = computed(() => {
      const c = data.value?.tracking.customer;
      if (!c || c.latitude == null || c.longitude == null) return null;
      return { name: c.name, latitude: c.latitude, longitude: c.longitude };
    });
    function formatDuration(startedAt, endedAt) {
      const end = endedAt ? new Date(endedAt).getTime() : Date.now();
      const ms = Math.max(0, end - new Date(startedAt).getTime());
      const totalMin = Math.floor(ms / 6e4);
      const h = Math.floor(totalMin / 60);
      const m = totalMin % 60;
      if (h > 0) return `${h}h ${m}m`;
      return `${m}m`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiBadge = _sfc_main$3;
      const _component_ClientOnly = __nuxt_component_10;
      const _component_DistributorTrackingMap = __nuxt_component_11;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/gps-tracking")
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
      _push(ssrRenderComponent(PageHeader, {
        title: "Route History",
        description: unref(data) ? `${unref(data).tracking.distributor.name} · ${unref(data).tracking.order.orderNumber}` : "Delivery GPS history"
      }, null, _parent));
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-16">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else if (unref(error)) {
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "py-12" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "Unable to load history",
                      description: unref(error)
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_EmptyState, {
                        title: "Unable to load history",
                        description: unref(error)
                      }, null, 8, ["description"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardContent, { class: "py-12" }, {
                  default: withCtx(() => [
                    createVNode(_component_EmptyState, {
                      title: "Unable to load history",
                      description: unref(error)
                    }, null, 8, ["description"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(data)) {
        _push(`<!--[--><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Status`);
                        } else {
                          return [
                            createTextVNode("Status")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Status")
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
                    _push3(ssrRenderComponent(_component_UiBadge, {
                      variant: unref(data).tracking.status === "ACTIVE" ? "default" : unref(data).tracking.status === "COMPLETED" ? "success" : "destructive"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(data).tracking.status)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(data).tracking.status), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiBadge, {
                        variant: unref(data).tracking.status === "ACTIVE" ? "default" : unref(data).tracking.status === "COMPLETED" ? "success" : "destructive"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(data).tracking.status), 1)
                        ]),
                        _: 1
                      }, 8, ["variant"])
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
                        createTextVNode("Status")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiBadge, {
                      variant: unref(data).tracking.status === "ACTIVE" ? "default" : unref(data).tracking.status === "COMPLETED" ? "success" : "destructive"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(data).tracking.status), 1)
                      ]),
                      _: 1
                    }, 8, ["variant"])
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
                          _push4(`GPS Points`);
                        } else {
                          return [
                            createTextVNode("GPS Points")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("GPS Points")
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
                    _push3(`<p class="text-2xl font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(unref(data).total)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold tabular-nums" }, toDisplayString(unref(data).total), 1)
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
                        createTextVNode("GPS Points")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold tabular-nums" }, toDisplayString(unref(data).total), 1)
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
                          _push4(`Duration`);
                        } else {
                          return [
                            createTextVNode("Duration")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Duration")
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
                    _push3(`<p class="text-2xl font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(formatDuration(unref(data).tracking.startedAt, unref(data).tracking.endedAt))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold tabular-nums" }, toDisplayString(formatDuration(unref(data).tracking.startedAt, unref(data).tracking.endedAt)), 1)
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
                        createTextVNode("Duration")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold tabular-nums" }, toDisplayString(formatDuration(unref(data).tracking.startedAt, unref(data).tracking.endedAt)), 1)
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
                          _push4(`Customer`);
                        } else {
                          return [
                            createTextVNode("Customer")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Customer")
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
                    _push3(`<p class="truncate font-medium"${_scopeId2}>${ssrInterpolate(unref(data).tracking.customer?.name || "—")}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "truncate font-medium" }, toDisplayString(unref(data).tracking.customer?.name || "—"), 1)
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
                        createTextVNode("Customer")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "truncate font-medium" }, toDisplayString(unref(data).tracking.customer?.name || "—"), 1)
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
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="h-[70vh] w-full"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_ClientOnly, null, {
                      fallback: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex h-full w-full items-center justify-center bg-muted/40"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_LoadingState, null, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex h-full w-full items-center justify-center bg-muted/40" }, [
                              createVNode(_component_LoadingState)
                            ])
                          ];
                        }
                      })
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "h-[70vh] w-full" }, [
                        createVNode(_component_ClientOnly, null, {
                          fallback: withCtx(() => [
                            createVNode("div", { class: "flex h-full w-full items-center justify-center bg-muted/40" }, [
                              createVNode(_component_LoadingState)
                            ])
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_DistributorTrackingMap, {
                              route: unref(data).locations,
                              "route-customer": unref(routeCustomer)
                            }, null, 8, ["route", "route-customer"])
                          ]),
                          _: 1
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardContent, { class: "p-0" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "h-[70vh] w-full" }, [
                      createVNode(_component_ClientOnly, null, {
                        fallback: withCtx(() => [
                          createVNode("div", { class: "flex h-full w-full items-center justify-center bg-muted/40" }, [
                            createVNode(_component_LoadingState)
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_DistributorTrackingMap, {
                            route: unref(data).locations,
                            "route-customer": unref(routeCustomer)
                          }, null, 8, ["route", "route-customer"])
                        ]),
                        _: 1
                      })
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/gps-tracking/[trackingId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_trackingId_-JRgQcNUZ.mjs.map
