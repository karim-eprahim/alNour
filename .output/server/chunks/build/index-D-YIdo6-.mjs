import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$5 } from './index-CaQj38bB.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DZSn3naz.mjs';
import { l as __nuxt_component_10 } from './server.mjs';
import { _ as __nuxt_component_11 } from './DistributorTrackingMap-DCPUw7bS.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { RefreshCw, Navigation, Map } from '@lucide/vue';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { defineStore } from 'pinia';
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
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

/* empty css                 */
async function fetchActiveTrackingApi() {
  return $fetch("/api/tracking/active");
}
async function fetchTrackingLocationsApi(id, params) {
  return $fetch(`/api/tracking/${id}/locations`, { params });
}
const useTrackingStore = defineStore("tracking", () => {
  const trackings = ref([]);
  const loading = ref(false);
  const lastFetchedAt = ref(null);
  const selectedTrackingId = ref(null);
  const history = ref(null);
  async function fetchActive() {
    loading.value = true;
    try {
      const data = await fetchActiveTrackingApi();
      trackings.value = data.trackings;
      lastFetchedAt.value = /* @__PURE__ */ new Date();
      if (selectedTrackingId.value && !trackings.value.some((t) => t.trackingId === selectedTrackingId.value)) {
        selectedTrackingId.value = null;
      }
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchHistory(id) {
    const data = await fetchTrackingLocationsApi(id);
    history.value = data;
    return data;
  }
  function setSelectedTracking(id) {
    selectedTrackingId.value = id;
  }
  function clear() {
    trackings.value = [];
    loading.value = false;
    lastFetchedAt.value = null;
    selectedTrackingId.value = null;
  }
  return {
    trackings,
    loading,
    lastFetchedAt,
    selectedTrackingId,
    history,
    fetchActive,
    fetchHistory,
    setSelectedTracking,
    clear
  };
});
function useTrackingPolling() {
  useTrackingStore();
  function start() {
    return;
  }
  function stop() {
  }
  return { start, stop };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useTrackingStore();
    useTrackingPolling();
    const now = ref(Date.now());
    function ago(iso) {
      const diff = Math.max(0, now.value - new Date(iso).getTime());
      const sec = Math.floor(diff / 1e3);
      if (sec < 5) return "just now";
      if (sec < 60) return `${sec} seconds ago`;
      const min = Math.floor(sec / 60);
      return `${min}m ${sec % 60}s ago`;
    }
    function selectTracking(id) {
      store.selectedTrackingId = store.selectedTrackingId === id ? null : id;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiBadge = _sfc_main$5;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_10;
      const _component_DistributorTrackingMap = __nuxt_component_11;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Distributor Tracking",
        description: "Live GPS locations of active deliveries (updates every 20 seconds)"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              size: "sm",
              disabled: unref(store).loading,
              onClick: ($event) => unref(store).fetchActive()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(RefreshCw), {
                    class: [unref(store).loading ? "animate-spin" : "", "size-4"]
                  }, null, _parent3, _scopeId2));
                  _push3(` Refresh `);
                } else {
                  return [
                    createVNode(unref(RefreshCw), {
                      class: [unref(store).loading ? "animate-spin" : "", "size-4"]
                    }, null, 8, ["class"]),
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
                size: "sm",
                disabled: unref(store).loading,
                onClick: ($event) => unref(store).fetchActive()
              }, {
                default: withCtx(() => [
                  createVNode(unref(RefreshCw), {
                    class: [unref(store).loading ? "animate-spin" : "", "size-4"]
                  }, null, 8, ["class"]),
                  createTextVNode(" Refresh ")
                ]),
                _: 1
              }, 8, ["disabled", "onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid gap-6 lg:grid-cols-[22rem_1fr]">`);
      _push(ssrRenderComponent(_component_UiCard, { class: "min-h-[60vh] lg:min-h-0 lg:h-[calc(100vh-11rem)] flex flex-col" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Active Deliveries`);
                      } else {
                        return [
                          createTextVNode("Active Deliveries")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(store).trackings.length)} distributor(s) currently out for delivery`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(store).trackings.length) + " distributor(s) currently out for delivery", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Active Deliveries")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(store).trackings.length) + " distributor(s) currently out for delivery", 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex-1 overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(store).loading && unref(store).trackings.length === 0) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(store).trackings.length === 0) {
                    _push3(`<div class="py-8"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No active deliveries",
                      description: "Active distributors will appear here once they start a delivery"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(store).trackings, (t) => {
                      _push3(`<button class="${ssrRenderClass([unref(store).selectedTrackingId === t.trackingId ? "border-primary bg-primary/5" : "hover:bg-muted", "w-full rounded-lg border p-3 text-left transition-colors"])}"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><span class="relative flex size-2.5"${_scopeId2}><span class="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"${_scopeId2}></span><span class="relative inline-flex size-2.5 rounded-full bg-green-500"${_scopeId2}></span></span><span class="truncate font-medium"${_scopeId2}>${ssrInterpolate(t.distributor.name)}</span>`);
                      _push3(ssrRenderComponent(_component_UiBadge, {
                        variant: "success",
                        class: "ml-auto text-[10px]"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Out for Delivery`);
                          } else {
                            return [
                              createTextVNode("Out for Delivery")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><p class="mt-1.5 truncate text-sm text-muted-foreground"${_scopeId2}> Order <span class="font-medium text-foreground"${_scopeId2}>${ssrInterpolate(t.order.orderNumber)}</span></p><div class="mt-1 flex items-center justify-between text-xs text-muted-foreground"${_scopeId2}><span${_scopeId2}>Last update: ${ssrInterpolate(ago(t.lastUpdatedAt))}</span>`);
                      if (t.currentLocation?.speed != null) {
                        _push3(`<span class="tabular-nums"${_scopeId2}>${ssrInterpolate(t.currentLocation.speed.toFixed(1))} km/h</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: `/gps-tracking/${t.trackingId}`,
                        class: "mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline",
                        onClick: () => {
                        }
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Navigation), { class: "size-3.5" }, null, _parent4, _scopeId3));
                            _push4(` View route history `);
                          } else {
                            return [
                              createVNode(unref(Navigation), { class: "size-3.5" }),
                              createTextVNode(" View route history ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</button>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                } else {
                  return [
                    unref(store).loading && unref(store).trackings.length === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(store).trackings.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-8"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No active deliveries",
                        description: "Active distributors will appear here once they start a delivery"
                      })
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(store).trackings, (t) => {
                        return openBlock(), createBlock("button", {
                          key: t.trackingId,
                          class: ["w-full rounded-lg border p-3 text-left transition-colors", unref(store).selectedTrackingId === t.trackingId ? "border-primary bg-primary/5" : "hover:bg-muted"],
                          onClick: ($event) => selectTracking(t.trackingId)
                        }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("span", { class: "relative flex size-2.5" }, [
                              createVNode("span", { class: "absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" }),
                              createVNode("span", { class: "relative inline-flex size-2.5 rounded-full bg-green-500" })
                            ]),
                            createVNode("span", { class: "truncate font-medium" }, toDisplayString(t.distributor.name), 1),
                            createVNode(_component_UiBadge, {
                              variant: "success",
                              class: "ml-auto text-[10px]"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Out for Delivery")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("p", { class: "mt-1.5 truncate text-sm text-muted-foreground" }, [
                            createTextVNode(" Order "),
                            createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(t.order.orderNumber), 1)
                          ]),
                          createVNode("div", { class: "mt-1 flex items-center justify-between text-xs text-muted-foreground" }, [
                            createVNode("span", null, "Last update: " + toDisplayString(ago(t.lastUpdatedAt)), 1),
                            t.currentLocation?.speed != null ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "tabular-nums"
                            }, toDisplayString(t.currentLocation.speed.toFixed(1)) + " km/h", 1)) : createCommentVNode("", true)
                          ]),
                          createVNode(_component_NuxtLink, {
                            to: `/gps-tracking/${t.trackingId}`,
                            class: "mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline",
                            onClick: withModifiers(() => {
                            }, ["stop"])
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Navigation), { class: "size-3.5" }),
                              createTextVNode(" View route history ")
                            ]),
                            _: 1
                          }, 8, ["to", "onClick"])
                        ], 10, ["onClick"]);
                      }), 128))
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-base" }, {
                    default: withCtx(() => [
                      createTextVNode("Active Deliveries")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(store).trackings.length) + " distributor(s) currently out for delivery", 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "flex-1 overflow-y-auto" }, {
                default: withCtx(() => [
                  unref(store).loading && unref(store).trackings.length === 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(store).trackings.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-8"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No active deliveries",
                      description: "Active distributors will appear here once they start a delivery"
                    })
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(store).trackings, (t) => {
                      return openBlock(), createBlock("button", {
                        key: t.trackingId,
                        class: ["w-full rounded-lg border p-3 text-left transition-colors", unref(store).selectedTrackingId === t.trackingId ? "border-primary bg-primary/5" : "hover:bg-muted"],
                        onClick: ($event) => selectTracking(t.trackingId)
                      }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("span", { class: "relative flex size-2.5" }, [
                            createVNode("span", { class: "absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" }),
                            createVNode("span", { class: "relative inline-flex size-2.5 rounded-full bg-green-500" })
                          ]),
                          createVNode("span", { class: "truncate font-medium" }, toDisplayString(t.distributor.name), 1),
                          createVNode(_component_UiBadge, {
                            variant: "success",
                            class: "ml-auto text-[10px]"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Out for Delivery")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("p", { class: "mt-1.5 truncate text-sm text-muted-foreground" }, [
                          createTextVNode(" Order "),
                          createVNode("span", { class: "font-medium text-foreground" }, toDisplayString(t.order.orderNumber), 1)
                        ]),
                        createVNode("div", { class: "mt-1 flex items-center justify-between text-xs text-muted-foreground" }, [
                          createVNode("span", null, "Last update: " + toDisplayString(ago(t.lastUpdatedAt)), 1),
                          t.currentLocation?.speed != null ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "tabular-nums"
                          }, toDisplayString(t.currentLocation.speed.toFixed(1)) + " km/h", 1)) : createCommentVNode("", true)
                        ]),
                        createVNode(_component_NuxtLink, {
                          to: `/gps-tracking/${t.trackingId}`,
                          class: "mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline",
                          onClick: withModifiers(() => {
                          }, ["stop"])
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Navigation), { class: "size-3.5" }),
                            createTextVNode(" View route history ")
                          ]),
                          _: 1
                        }, 8, ["to", "onClick"])
                      ], 10, ["onClick"]);
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
      _push(ssrRenderComponent(_component_UiCard, { class: "overflow-hidden" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Map), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Live Map `);
                      } else {
                        return [
                          createVNode(unref(Map), { class: "size-4" }),
                          createTextVNode(" Live Map ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` OpenStreetMap · refreshes automatically every 20 seconds `);
                      } else {
                        return [
                          createTextVNode(" OpenStreetMap · refreshes automatically every 20 seconds ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode(unref(Map), { class: "size-4" }),
                        createTextVNode(" Live Map ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" OpenStreetMap · refreshes automatically every 20 seconds ")
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
                  _push3(`<div class="relative h-[60vh] lg:h-[calc(100vh-15rem)] w-full"${_scopeId2}>`);
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
                    createVNode("div", { class: "relative h-[60vh] lg:h-[calc(100vh-15rem)] w-full" }, [
                      createVNode(_component_ClientOnly, null, {
                        fallback: withCtx(() => [
                          createVNode("div", { class: "flex h-full w-full items-center justify-center bg-muted/40" }, [
                            createVNode(_component_LoadingState)
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_DistributorTrackingMap, {
                            trackings: unref(store).trackings,
                            "selected-tracking-id": unref(store).selectedTrackingId
                          }, null, 8, ["trackings", "selected-tracking-id"])
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
              createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode(unref(Map), { class: "size-4" }),
                      createTextVNode(" Live Map ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" OpenStreetMap · refreshes automatically every 20 seconds ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "relative h-[60vh] lg:h-[calc(100vh-15rem)] w-full" }, [
                    createVNode(_component_ClientOnly, null, {
                      fallback: withCtx(() => [
                        createVNode("div", { class: "flex h-full w-full items-center justify-center bg-muted/40" }, [
                          createVNode(_component_LoadingState)
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_DistributorTrackingMap, {
                          trackings: unref(store).trackings,
                          "selected-tracking-id": unref(store).selectedTrackingId
                        }, null, 8, ["trackings", "selected-tracking-id"])
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/gps-tracking/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D-YIdo6-.mjs.map
