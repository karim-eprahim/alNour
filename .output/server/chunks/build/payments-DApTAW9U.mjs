import { _ as _sfc_main$6, b as _sfc_main$1, c as _sfc_main$2, a as _sfc_main$4, d as _sfc_main$3 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CjZdJj9x.mjs';
import { _ as _sfc_main$5 } from './index-CUpQupPt.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode, ssrRenderClass } from 'vue/server-renderer';
import { Wallet, History, ArrowUpRight, ArrowDownLeft } from '@lucide/vue';
import { u as useDistributorStore } from './store-D4WyITIu.mjs';
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
import 'class-variance-authority';
import 'reka-ui';

const limit = 50;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "payments",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const movementsPage = ref(1);
    const totalPages = computed(() => Math.max(1, Math.ceil(store.cashMovementsTotal / limit)));
    async function load() {
      await Promise.all([
        store.fetchCashOnHand(),
        store.fetchCashMovements({ page: movementsPage.value, limit })
      ]);
    }
    watch(movementsPage, load);
    const movementTypeIcon = (type) => {
      switch (type) {
        case "PAYMENT_COLLECTED":
          return ArrowDownLeft;
        case "CASH_HANDOVER":
          return ArrowUpRight;
        default:
          return History;
      }
    };
    const movementTypeLabel = (type) => {
      switch (type) {
        case "PAYMENT_COLLECTED":
          return "Payment Collected";
        case "CASH_HANDOVER":
          return "Cash Handover";
        case "ADJUSTMENT":
          return "Adjustment";
        default:
          return type;
      }
    };
    const movementTypeColor = (type) => {
      switch (type) {
        case "PAYMENT_COLLECTED":
          return "text-green-600";
        case "CASH_HANDOVER":
          return "text-red-600";
        default:
          return "text-muted-foreground";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiButton = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Payments</h1><p class="text-sm text-muted-foreground">Your cash and payment history</p></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
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
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(Wallet), { class: "size-5 text-green-500" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Cash On Hand")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(Wallet), { class: "size-5 text-green-500" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-3xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(unref(store).cashOnHand)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-3xl font-bold text-green-600" }, toDisplayString(unref(store).cashOnHand), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Cash On Hand")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(unref(Wallet), { class: "size-5 text-green-500" })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-3xl font-bold text-green-600" }, toDisplayString(unref(store).cashOnHand), 1)
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
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cash Movements`);
                      } else {
                        return [
                          createTextVNode("Cash Movements")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`History of all cash transactions`);
                      } else {
                        return [
                          createTextVNode("History of all cash transactions")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Cash Movements")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("History of all cash transactions")
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
                  if (unref(store).loading) {
                    _push3(`<div class="flex justify-center py-8"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(store).cashMovements.length === 0) {
                    _push3(`<div class="text-center py-8 text-sm text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(History), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }, null, _parent3, _scopeId2));
                    _push3(`<p${_scopeId2}>No cash movements yet</p></div>`);
                  } else {
                    _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(store).cashMovements, (m) => {
                      _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}><div class="flex items-center gap-3 min-w-0 flex-1"${_scopeId2}>`);
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(movementTypeIcon(m.type)), {
                        class: ["size-5 shrink-0", movementTypeColor(m.type)]
                      }, null), _parent3, _scopeId2);
                      _push3(`<div class="min-w-0"${_scopeId2}><p class="text-sm font-medium truncate"${_scopeId2}>${ssrInterpolate(movementTypeLabel(m.type))}</p>`);
                      if (m.notes) {
                        _push3(`<p class="text-xs text-muted-foreground truncate w-40 md:w-full"${_scopeId2}>${ssrInterpolate(m.notes)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<p class="text-[10px] text-muted-foreground/60"${_scopeId2}>${ssrInterpolate(new Date(m.createdAt).toLocaleDateString())}</p></div></div><span class="${ssrRenderClass(["text-sm font-semibold shrink-0 ml-2", m.type === "CASH_HANDOVER" ? "text-red-600" : "text-green-600"])}"${_scopeId2}>${ssrInterpolate(m.type === "CASH_HANDOVER" ? "-" : "+")}${ssrInterpolate(Number(m.amount).toFixed(2))}</span></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                  if (!unref(store).loading && unref(store).cashMovementsTotal > 0) {
                    _push3(`<div class="flex flex-wrap items-center justify-between gap-3 py-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(store).cashMovements.length)} of ${ssrInterpolate(unref(store).cashMovementsTotal)} row(s) </p><div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      size: "sm",
                      disabled: unref(movementsPage) <= 1,
                      onClick: ($event) => movementsPage.value--
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Previous `);
                        } else {
                          return [
                            createTextVNode(" Previous ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<p class="text-sm text-muted-foreground min-w-20 text-center"${_scopeId2}> Page ${ssrInterpolate(unref(movementsPage))} of ${ssrInterpolate(unref(totalPages))}</p>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      size: "sm",
                      disabled: unref(movementsPage) >= unref(totalPages),
                      onClick: ($event) => movementsPage.value++
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Next `);
                        } else {
                          return [
                            createTextVNode(" Next ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(store).loading ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-8"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(store).cashMovements.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-8 text-sm text-muted-foreground"
                    }, [
                      createVNode(unref(History), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }),
                      createVNode("p", null, "No cash movements yet")
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(store).cashMovements, (m) => {
                        return openBlock(), createBlock("div", {
                          key: m.id,
                          class: "flex items-center justify-between rounded-lg border p-3"
                        }, [
                          createVNode("div", { class: "flex items-center gap-3 min-w-0 flex-1" }, [
                            (openBlock(), createBlock(resolveDynamicComponent(movementTypeIcon(m.type)), {
                              class: ["size-5 shrink-0", movementTypeColor(m.type)]
                            }, null, 8, ["class"])),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(movementTypeLabel(m.type)), 1),
                              m.notes ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-muted-foreground truncate w-40 md:w-full"
                              }, toDisplayString(m.notes), 1)) : createCommentVNode("", true),
                              createVNode("p", { class: "text-[10px] text-muted-foreground/60" }, toDisplayString(new Date(m.createdAt).toLocaleDateString()), 1)
                            ])
                          ]),
                          createVNode("span", {
                            class: ["text-sm font-semibold shrink-0 ml-2", m.type === "CASH_HANDOVER" ? "text-red-600" : "text-green-600"]
                          }, toDisplayString(m.type === "CASH_HANDOVER" ? "-" : "+") + toDisplayString(Number(m.amount).toFixed(2)), 3)
                        ]);
                      }), 128))
                    ])),
                    !unref(store).loading && unref(store).cashMovementsTotal > 0 ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "flex flex-wrap items-center justify-between gap-3 py-4"
                    }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(store).cashMovements.length) + " of " + toDisplayString(unref(store).cashMovementsTotal) + " row(s) ", 1),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          size: "sm",
                          disabled: unref(movementsPage) <= 1,
                          onClick: ($event) => movementsPage.value--
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode("p", { class: "text-sm text-muted-foreground min-w-20 text-center" }, " Page " + toDisplayString(unref(movementsPage)) + " of " + toDisplayString(unref(totalPages)), 1),
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          size: "sm",
                          disabled: unref(movementsPage) >= unref(totalPages),
                          onClick: ($event) => movementsPage.value++
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
                      ])
                    ])) : createCommentVNode("", true)
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
                      createTextVNode("Cash Movements")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("History of all cash transactions")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  unref(store).loading ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-8"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(store).cashMovements.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-8 text-sm text-muted-foreground"
                  }, [
                    createVNode(unref(History), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }),
                    createVNode("p", null, "No cash movements yet")
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(store).cashMovements, (m) => {
                      return openBlock(), createBlock("div", {
                        key: m.id,
                        class: "flex items-center justify-between rounded-lg border p-3"
                      }, [
                        createVNode("div", { class: "flex items-center gap-3 min-w-0 flex-1" }, [
                          (openBlock(), createBlock(resolveDynamicComponent(movementTypeIcon(m.type)), {
                            class: ["size-5 shrink-0", movementTypeColor(m.type)]
                          }, null, 8, ["class"])),
                          createVNode("div", { class: "min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(movementTypeLabel(m.type)), 1),
                            m.notes ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-muted-foreground truncate w-40 md:w-full"
                            }, toDisplayString(m.notes), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "text-[10px] text-muted-foreground/60" }, toDisplayString(new Date(m.createdAt).toLocaleDateString()), 1)
                          ])
                        ]),
                        createVNode("span", {
                          class: ["text-sm font-semibold shrink-0 ml-2", m.type === "CASH_HANDOVER" ? "text-red-600" : "text-green-600"]
                        }, toDisplayString(m.type === "CASH_HANDOVER" ? "-" : "+") + toDisplayString(Number(m.amount).toFixed(2)), 3)
                      ]);
                    }), 128))
                  ])),
                  !unref(store).loading && unref(store).cashMovementsTotal > 0 ? (openBlock(), createBlock("div", {
                    key: 3,
                    class: "flex flex-wrap items-center justify-between gap-3 py-4"
                  }, [
                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(store).cashMovements.length) + " of " + toDisplayString(unref(store).cashMovementsTotal) + " row(s) ", 1),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        disabled: unref(movementsPage) <= 1,
                        onClick: ($event) => movementsPage.value--
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Previous ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]),
                      createVNode("p", { class: "text-sm text-muted-foreground min-w-20 text-center" }, " Page " + toDisplayString(unref(movementsPage)) + " of " + toDisplayString(unref(totalPages)), 1),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        disabled: unref(movementsPage) >= unref(totalPages),
                        onClick: ($event) => movementsPage.value++
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Next ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/payments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=payments-DApTAW9U.mjs.map
