import { _ as _sfc_main$6, b as _sfc_main$1, c as _sfc_main$2, a as _sfc_main$4, d as _sfc_main$3$1 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as _sfc_main$3 } from './index-CUpQupPt.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CjZdJj9x.mjs';
import { _ as _sfc_main$5 } from './index-BJ9JiLtz.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$1, d as _sfc_main$5$1, e as _sfc_main$4$1 } from './DialogTrigger-C62yxjGQ.mjs';
import { _ as _sfc_main$7 } from './Label-C-S6OHzh.mjs';
import { _ as _sfc_main$8 } from './Input-BT7sGQjY.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$b, c as _sfc_main$9$1, d as _sfc_main$7$1 } from './SelectValue-CvBB3u-2.mjs';
import { _ as _sfc_main$c } from './Textarea-Cs62HpDa.mjs';
import { defineComponent, ref, computed, watch, reactive, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { HandCoins, Plus, History, Wallet, XCircle, CheckCircle2, Clock3 } from '@lucide/vue';
import { toast } from 'vue-sonner';
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
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import 'reka-ui';

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settlements",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const page = ref(1);
    const totalPages = computed(() => Math.max(1, Math.ceil(store.settlementsTotal / limit)));
    async function load() {
      await store.fetchSettlements({ page: page.value, limit });
    }
    watch(page, load);
    const showCreateDialog = ref(false);
    const saving = ref(false);
    const form = reactive({
      amount: 0,
      paymentMethod: "CASH",
      notes: ""
    });
    function openCreate() {
      form.amount = store.custodyBalance;
      form.paymentMethod = "CASH";
      form.notes = "";
      showCreateDialog.value = true;
    }
    async function submitSettlement() {
      if (!form.amount || form.amount <= 0) {
        toast.error("Amount must be positive");
        return;
      }
      if (form.amount > store.custodyBalance) {
        toast.error(`Cannot exceed available custody of ${Number(store.custodyBalance).toFixed(2)}`);
        return;
      }
      saving.value = true;
      try {
        await store.createSettlement({
          amount: form.amount,
          paymentMethod: form.paymentMethod,
          notes: form.notes || void 0
        });
        toast.success("Settlement submitted for review");
        showCreateDialog.value = false;
      } catch (err) {
        toast.error(err?.data?.statusMessage || err?.message || "Failed to submit settlement");
      } finally {
        saving.value = false;
      }
    }
    const statusMeta = {
      SUBMITTED: { label: "Submitted", variant: "warning", icon: Clock3 },
      CONFIRMED: { label: "Confirmed", variant: "success", icon: CheckCircle2 },
      REJECTED: { label: "Rejected", variant: "destructive", icon: XCircle }
    };
    function statusBadge(status) {
      return statusMeta[status] || { label: status, variant: "secondary", icon: History };
    }
    function formatDate(d) {
      if (!d) return "—";
      return new Date(d).toLocaleDateString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiButton = _sfc_main$3;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiBadge = _sfc_main$5;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$2;
      const _component_UiDialogTitle = _sfc_main$1$1;
      const _component_UiDialogDescription = _sfc_main$5$1;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiInput = _sfc_main$8;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$b;
      const _component_UiSelectContent = _sfc_main$9$1;
      const _component_UiSelectItem = _sfc_main$7$1;
      const _component_UiTextarea = _sfc_main$c;
      const _component_UiDialogFooter = _sfc_main$4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Settlements</h1><p class="text-sm text-muted-foreground">Hand over collected cash to the company</p></div></div>`);
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
                        _push4(`Distributor Custody`);
                      } else {
                        return [
                          createTextVNode("Distributor Custody")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(HandCoins), { class: "size-5 text-amber-500" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Distributor Custody")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(HandCoins), { class: "size-5 text-amber-500" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-3xl font-bold text-amber-600 dark:text-amber-400"${_scopeId2}>${ssrInterpolate(Number(unref(store).custodyBalance).toFixed(2))}</p><p class="text-xs text-muted-foreground mb-4"${_scopeId2}>Available to settle</p>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    class: "w-full",
                    disabled: unref(store).custodyBalance <= 0,
                    onClick: openCreate
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Create Settlement `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "size-4" }),
                          createTextVNode(" Create Settlement ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(store).custodyBalance <= 0) {
                    _push3(`<p class="mt-2 text-xs text-muted-foreground text-center"${_scopeId2}> Collect customer payments first to build up custody </p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("p", { class: "text-3xl font-bold text-amber-600 dark:text-amber-400" }, toDisplayString(Number(unref(store).custodyBalance).toFixed(2)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground mb-4" }, "Available to settle"),
                    createVNode(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(store).custodyBalance <= 0,
                      onClick: openCreate
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "size-4" }),
                        createTextVNode(" Create Settlement ")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    unref(store).custodyBalance <= 0 ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "mt-2 text-xs text-muted-foreground text-center"
                    }, " Collect customer payments first to build up custody ")) : createCommentVNode("", true)
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
                        createTextVNode("Distributor Custody")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(unref(HandCoins), { class: "size-5 text-amber-500" })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-3xl font-bold text-amber-600 dark:text-amber-400" }, toDisplayString(Number(unref(store).custodyBalance).toFixed(2)), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground mb-4" }, "Available to settle"),
                  createVNode(_component_UiButton, {
                    class: "w-full",
                    disabled: unref(store).custodyBalance <= 0,
                    onClick: openCreate
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Plus), { class: "size-4" }),
                      createTextVNode(" Create Settlement ")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  unref(store).custodyBalance <= 0 ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "mt-2 text-xs text-muted-foreground text-center"
                  }, " Collect customer payments first to build up custody ")) : createCommentVNode("", true)
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
                        _push4(`Settlement History`);
                      } else {
                        return [
                          createTextVNode("Settlement History")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Money you have handed over to the company`);
                      } else {
                        return [
                          createTextVNode("Money you have handed over to the company")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Settlement History")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Money you have handed over to the company")
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
                  } else if (unref(store).settlements.length === 0) {
                    _push3(`<div class="text-center py-8 text-sm text-muted-foreground"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(History), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }, null, _parent3, _scopeId2));
                    _push3(`<p${_scopeId2}>No settlements yet</p></div>`);
                  } else {
                    _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(store).settlements, (s) => {
                      _push3(`<div class="rounded-lg border p-3"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><div class="min-w-0 flex-1"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><p class="text-sm font-medium truncate"${_scopeId2}>${ssrInterpolate(s.settlementNumber)}</p>`);
                      _push3(ssrRenderComponent(_component_UiBadge, {
                        variant: statusBadge(s.status).variant,
                        class: "text-[10px]"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(statusBadge(s.status).label)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(statusBadge(s.status).label), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><p class="text-xs text-muted-foreground mt-0.5"${_scopeId2}>${ssrInterpolate(formatDate(s.submittedAt))} · ${ssrInterpolate(s.paymentMethod.replace("_", " "))}</p>`);
                      if (s.status === "REJECTED" && s.rejectionReason) {
                        _push3(`<p class="text-xs text-destructive mt-1"${_scopeId2}>${ssrInterpolate(s.rejectionReason)}</p>`);
                      } else if (s.status === "CONFIRMED") {
                        _push3(`<p class="text-xs text-green-600 mt-1"${_scopeId2}> Confirmed on ${ssrInterpolate(formatDate(s.confirmedAt))}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><span class="text-sm font-semibold shrink-0 ml-2"${_scopeId2}>${ssrInterpolate(Number(s.amount).toFixed(2))}</span></div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                  if (!unref(store).loading && unref(store).settlementsTotal > 0) {
                    _push3(`<div class="flex flex-wrap items-center justify-between gap-3 py-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(store).settlements.length)} of ${ssrInterpolate(unref(store).settlementsTotal)} row(s) </p><div class="flex items-center gap-2"${_scopeId2}>`);
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
                    _push3(`<p class="text-sm text-muted-foreground min-w-20 text-center"${_scopeId2}>Page ${ssrInterpolate(unref(page))} of ${ssrInterpolate(unref(totalPages))}</p>`);
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
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(store).loading ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-8"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(store).settlements.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-8 text-sm text-muted-foreground"
                    }, [
                      createVNode(unref(History), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }),
                      createVNode("p", null, "No settlements yet")
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-2"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(store).settlements, (s) => {
                        return openBlock(), createBlock("div", {
                          key: s.id,
                          class: "rounded-lg border p-3"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", { class: "min-w-0 flex-1" }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(s.settlementNumber), 1),
                                createVNode(_component_UiBadge, {
                                  variant: statusBadge(s.status).variant,
                                  class: "text-[10px]"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(statusBadge(s.status).label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant"])
                              ]),
                              createVNode("p", { class: "text-xs text-muted-foreground mt-0.5" }, toDisplayString(formatDate(s.submittedAt)) + " · " + toDisplayString(s.paymentMethod.replace("_", " ")), 1),
                              s.status === "REJECTED" && s.rejectionReason ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-destructive mt-1"
                              }, toDisplayString(s.rejectionReason), 1)) : s.status === "CONFIRMED" ? (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-xs text-green-600 mt-1"
                              }, " Confirmed on " + toDisplayString(formatDate(s.confirmedAt)), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("span", { class: "text-sm font-semibold shrink-0 ml-2" }, toDisplayString(Number(s.amount).toFixed(2)), 1)
                          ])
                        ]);
                      }), 128))
                    ])),
                    !unref(store).loading && unref(store).settlementsTotal > 0 ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "flex flex-wrap items-center justify-between gap-3 py-4"
                    }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(store).settlements.length) + " of " + toDisplayString(unref(store).settlementsTotal) + " row(s) ", 1),
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
                        createVNode("p", { class: "text-sm text-muted-foreground min-w-20 text-center" }, "Page " + toDisplayString(unref(page)) + " of " + toDisplayString(unref(totalPages)), 1),
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
                      createTextVNode("Settlement History")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Money you have handed over to the company")
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
                  ])) : unref(store).settlements.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-8 text-sm text-muted-foreground"
                  }, [
                    createVNode(unref(History), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }),
                    createVNode("p", null, "No settlements yet")
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(store).settlements, (s) => {
                      return openBlock(), createBlock("div", {
                        key: s.id,
                        class: "rounded-lg border p-3"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "min-w-0 flex-1" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("p", { class: "text-sm font-medium truncate" }, toDisplayString(s.settlementNumber), 1),
                              createVNode(_component_UiBadge, {
                                variant: statusBadge(s.status).variant,
                                class: "text-[10px]"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(statusBadge(s.status).label), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant"])
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground mt-0.5" }, toDisplayString(formatDate(s.submittedAt)) + " · " + toDisplayString(s.paymentMethod.replace("_", " ")), 1),
                            s.status === "REJECTED" && s.rejectionReason ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive mt-1"
                            }, toDisplayString(s.rejectionReason), 1)) : s.status === "CONFIRMED" ? (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-xs text-green-600 mt-1"
                            }, " Confirmed on " + toDisplayString(formatDate(s.confirmedAt)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("span", { class: "text-sm font-semibold shrink-0 ml-2" }, toDisplayString(Number(s.amount).toFixed(2)), 1)
                        ])
                      ]);
                    }), 128))
                  ])),
                  !unref(store).loading && unref(store).settlementsTotal > 0 ? (openBlock(), createBlock("div", {
                    key: 3,
                    class: "flex flex-wrap items-center justify-between gap-3 py-4"
                  }, [
                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(store).settlements.length) + " of " + toDisplayString(unref(store).settlementsTotal) + " row(s) ", 1),
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
                      createVNode("p", { class: "text-sm text-muted-foreground min-w-20 text-center" }, "Page " + toDisplayString(unref(page)) + " of " + toDisplayString(unref(totalPages)), 1),
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
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showCreateDialog),
        "onUpdate:open": ($event) => showCreateDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Create Settlement`);
                            } else {
                              return [
                                createTextVNode("Create Settlement")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Hand over cash to the company for confirmation`);
                            } else {
                              return [
                                createTextVNode("Hand over cash to the company for confirmation")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Create Settlement")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Hand over cash to the company for confirmation")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="rounded-lg border bg-muted/30 px-3 py-2 flex items-center justify-between"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>Available to settle</span><span class="text-sm font-semibold"${_scopeId2}>${ssrInterpolate(Number(unref(store).custodyBalance).toFixed(2))}</span></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "settlementAmount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Amount *`);
                      } else {
                        return [
                          createTextVNode("Amount *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "settlementAmount",
                    modelValue: unref(form).amount,
                    "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    step: "0.01",
                    min: "0",
                    max: unref(store).custodyBalance,
                    placeholder: "0.00"
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>Max: ${ssrInterpolate(Number(unref(store).custodyBalance).toFixed(2))}</p></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "settlementMethod" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Payment Method`);
                      } else {
                        return [
                          createTextVNode("Payment Method")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(form).paymentMethod,
                    "onUpdate:modelValue": ($event) => unref(form).paymentMethod = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "settlementMethod" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CASH" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Cash`);
                                  } else {
                                    return [
                                      createTextVNode("Cash")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Bank Transfer`);
                                  } else {
                                    return [
                                      createTextVNode("Bank Transfer")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CHECK" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Check`);
                                  } else {
                                    return [
                                      createTextVNode("Check")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cash")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Bank Transfer")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Check")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSelectTrigger, { id: "settlementMethod" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cash")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bank Transfer")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                default: withCtx(() => [
                                  createTextVNode("Check")
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
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "settlementNotes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Notes`);
                      } else {
                        return [
                          createTextVNode("Notes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTextarea, {
                    id: "settlementNotes",
                    modelValue: unref(form).notes,
                    "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                    placeholder: "Optional"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreateDialog.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancel`);
                            } else {
                              return [
                                createTextVNode("Cancel")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "submit",
                          disabled: unref(saving) || !unref(form).amount || unref(form).amount <= 0 || unref(form).amount > unref(store).custodyBalance
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!unref(saving)) {
                                _push5(ssrRenderComponent(unref(Wallet), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` ${ssrInterpolate(unref(saving) ? "Submitting..." : "Submit Settlement")}`);
                            } else {
                              return [
                                !unref(saving) ? (openBlock(), createBlock(unref(Wallet), {
                                  key: 0,
                                  class: "size-4"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(unref(saving) ? "Submitting..." : "Submit Settlement"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showCreateDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(saving) || !unref(form).amount || unref(form).amount <= 0 || unref(form).amount > unref(store).custodyBalance
                          }, {
                            default: withCtx(() => [
                              !unref(saving) ? (openBlock(), createBlock(unref(Wallet), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(saving) ? "Submitting..." : "Submit Settlement"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Create Settlement")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Hand over cash to the company for confirmation")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(submitSettlement, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "rounded-lg border bg-muted/30 px-3 py-2 flex items-center justify-between" }, [
                        createVNode("span", { class: "text-sm text-muted-foreground" }, "Available to settle"),
                        createVNode("span", { class: "text-sm font-semibold" }, toDisplayString(Number(unref(store).custodyBalance).toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "settlementAmount" }, {
                          default: withCtx(() => [
                            createTextVNode("Amount *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "settlementAmount",
                          modelValue: unref(form).amount,
                          "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          step: "0.01",
                          min: "0",
                          max: unref(store).custodyBalance,
                          placeholder: "0.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Max: " + toDisplayString(Number(unref(store).custodyBalance).toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "settlementMethod" }, {
                          default: withCtx(() => [
                            createTextVNode("Payment Method")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(form).paymentMethod,
                          "onUpdate:modelValue": ($event) => unref(form).paymentMethod = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "settlementMethod" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cash")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Bank Transfer")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Check")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "settlementNotes" }, {
                          default: withCtx(() => [
                            createTextVNode("Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          id: "settlementNotes",
                          modelValue: unref(form).notes,
                          "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                          placeholder: "Optional"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showCreateDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(saving) || !unref(form).amount || unref(form).amount <= 0 || unref(form).amount > unref(store).custodyBalance
                          }, {
                            default: withCtx(() => [
                              !unref(saving) ? (openBlock(), createBlock(unref(Wallet), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(saving) ? "Submitting..." : "Submit Settlement"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiDialogContent, { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Create Settlement")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Hand over cash to the company for confirmation")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(submitSettlement, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "rounded-lg border bg-muted/30 px-3 py-2 flex items-center justify-between" }, [
                      createVNode("span", { class: "text-sm text-muted-foreground" }, "Available to settle"),
                      createVNode("span", { class: "text-sm font-semibold" }, toDisplayString(Number(unref(store).custodyBalance).toFixed(2)), 1)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "settlementAmount" }, {
                        default: withCtx(() => [
                          createTextVNode("Amount *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "settlementAmount",
                        modelValue: unref(form).amount,
                        "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        step: "0.01",
                        min: "0",
                        max: unref(store).custodyBalance,
                        placeholder: "0.00"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "max"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Max: " + toDisplayString(Number(unref(store).custodyBalance).toFixed(2)), 1)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "settlementMethod" }, {
                        default: withCtx(() => [
                          createTextVNode("Payment Method")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(form).paymentMethod,
                        "onUpdate:modelValue": ($event) => unref(form).paymentMethod = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { id: "settlementMethod" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cash")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bank Transfer")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                default: withCtx(() => [
                                  createTextVNode("Check")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "settlementNotes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        id: "settlementNotes",
                        modelValue: unref(form).notes,
                        "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                        placeholder: "Optional"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreateDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: unref(saving) || !unref(form).amount || unref(form).amount <= 0 || unref(form).amount > unref(store).custodyBalance
                        }, {
                          default: withCtx(() => [
                            !unref(saving) ? (openBlock(), createBlock(unref(Wallet), {
                              key: 0,
                              class: "size-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(saving) ? "Submitting..." : "Submit Settlement"), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/settlements.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settlements-Lxlbc5CU.mjs.map
