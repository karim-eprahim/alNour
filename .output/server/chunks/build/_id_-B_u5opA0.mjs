import { _ as _sfc_main$1 } from './index-CUpQupPt.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CjZdJj9x.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4$1 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as _sfc_main$4 } from './index-BJ9JiLtz.mjs';
import { _ as __nuxt_component_20 } from './ConfirmDialog-BkZ-_oot.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$2, d as _sfc_main$5, e as _sfc_main$4$2 } from './DialogTrigger-C62yxjGQ.mjs';
import { _ as _sfc_main$7 } from './Label-C-S6OHzh.mjs';
import { _ as _sfc_main$8 } from './Textarea-Cs62HpDa.mjs';
import { a as useRoute, c as usePermissions, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, isRef, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { ArrowLeft, CheckCircle2, XCircle } from '@lucide/vue';
import { toast } from 'vue-sonner';
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
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { can } = usePermissions();
    const settlementId = computed(() => route.params.id);
    const loading = ref(true);
    const processing = ref(false);
    const settlement = ref(null);
    const custodyBalance = ref(0);
    const showConfirmDialog = ref(false);
    const showRejectDialog = ref(false);
    const rejectionReason = ref("");
    const statusMeta = {
      SUBMITTED: { label: "Submitted", variant: "warning" },
      CONFIRMED: { label: "Confirmed", variant: "success" },
      REJECTED: { label: "Rejected", variant: "destructive" }
    };
    function statusBadge(status) {
      return statusMeta[status] || { label: status, variant: "secondary" };
    }
    async function load() {
      loading.value = true;
      try {
        const data = await $fetch(`/api/sales/settlements/${settlementId.value}`);
        settlement.value = data.settlement;
        custodyBalance.value = data.custodySummary?.custody || 0;
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to load settlement");
      } finally {
        loading.value = false;
      }
    }
    async function confirmSettlement() {
      processing.value = true;
      try {
        const data = await $fetch(`/api/sales/settlements/${settlementId.value}/confirm`, { method: "POST" });
        settlement.value = data.settlement;
        toast.success(`Settlement ${data.settlement.settlementNumber} confirmed`);
        showConfirmDialog.value = false;
        await load();
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to confirm settlement");
      } finally {
        processing.value = false;
      }
    }
    async function rejectSettlement() {
      if (!rejectionReason.value.trim()) {
        toast.error("Rejection reason is required");
        return;
      }
      processing.value = true;
      try {
        const data = await $fetch(`/api/sales/settlements/${settlementId.value}/reject`, {
          method: "POST",
          body: { rejectionReason: rejectionReason.value.trim() }
        });
        settlement.value = data.settlement;
        toast.success(`Settlement ${data.settlement.settlementNumber} rejected`);
        showRejectDialog.value = false;
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to reject settlement");
      } finally {
        processing.value = false;
      }
    }
    function formatDate(d) {
      if (!d) return "—";
      return new Date(d).toLocaleString();
    }
    function formatMethod(m) {
      return m.replace("_", " ");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_PageHeader = PageHeader;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiBadge = _sfc_main$4;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_ConfirmDialog = __nuxt_component_20;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$2;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiTextarea = _sfc_main$8;
      const _component_UiDialogFooter = _sfc_main$4$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/sales/settlements")
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
      _push(ssrRenderComponent(_component_PageHeader, {
        title: "Settlement Details",
        description: unref(settlement)?.settlementNumber || "Review distributor settlement"
      }, null, _parent));
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else if (unref(settlement)) {
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-lg" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(settlement).settlementNumber)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(settlement).settlementNumber), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Submitted ${ssrInterpolate(formatDate(unref(settlement).submittedAt))}`);
                        } else {
                          return [
                            createTextVNode("Submitted " + toDisplayString(formatDate(unref(settlement).submittedAt)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_UiBadge, {
                      variant: statusBadge(unref(settlement).status).variant
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(statusBadge(unref(settlement).status).label)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(statusBadge(unref(settlement).status).label), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode(_component_UiCardTitle, { class: "text-lg" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(settlement).settlementNumber), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Submitted " + toDisplayString(formatDate(unref(settlement).submittedAt)), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(_component_UiBadge, {
                        variant: statusBadge(unref(settlement).status).variant
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(statusBadge(unref(settlement).status).label), 1)
                        ]),
                        _: 1
                      }, 8, ["variant"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"${_scopeId2}><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Distributor</p><p class="text-lg font-semibold mt-1"${_scopeId2}>${ssrInterpolate(unref(settlement).distributor?.name || "—")}</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Amount</p><p class="text-lg font-bold text-green-600 mt-1"${_scopeId2}>${ssrInterpolate(Number(unref(settlement).amount).toFixed(2))}</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Payment Method</p><p class="text-lg font-semibold mt-1"${_scopeId2}>${ssrInterpolate(formatMethod(unref(settlement).paymentMethod))}</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Submitted At</p><p class="text-lg font-semibold mt-1"${_scopeId2}>${ssrInterpolate(formatDate(unref(settlement).submittedAt))}</p></div><div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Current Distributor Custody</p><p class="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1"${_scopeId2}>${ssrInterpolate(Number(unref(custodyBalance)).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Available to settle after this one</p></div></div>`);
                    if (unref(settlement).notes) {
                      _push3(`<div class="rounded-lg border p-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Notes</p><p class="text-sm mt-1"${_scopeId2}>${ssrInterpolate(unref(settlement).notes)}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(settlement).status === "CONFIRMED") {
                      _push3(`<div class="rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 p-4"${_scopeId2}><p class="text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(CheckCircle2), { class: "size-4" }, null, _parent3, _scopeId2));
                      _push3(` Confirmed on ${ssrInterpolate(formatDate(unref(settlement).confirmedAt))}</p>`);
                      if (unref(settlement).confirmedByUser) {
                        _push3(`<p class="text-xs text-muted-foreground mt-1"${_scopeId2}> By ${ssrInterpolate(unref(settlement).confirmedByUser.name)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(settlement).status === "REJECTED") {
                      _push3(`<div class="rounded-lg border border-destructive/30 bg-destructive/5 p-4"${_scopeId2}><p class="text-sm font-medium text-destructive flex items-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(XCircle), { class: "size-4" }, null, _parent3, _scopeId2));
                      _push3(` Rejected </p>`);
                      if (unref(settlement).rejectionReason) {
                        _push3(`<p class="text-xs text-muted-foreground mt-1"${_scopeId2}>${ssrInterpolate(unref(settlement).rejectionReason)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(settlement).status === "SUBMITTED" && unref(can)("SALES", "UPDATE")) {
                      _push3(`<div class="flex flex-wrap gap-3 border-t pt-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "default",
                        disabled: unref(processing),
                        onClick: ($event) => showConfirmDialog.value = true
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(CheckCircle2), { class: "size-4" }, null, _parent4, _scopeId3));
                            _push4(` Confirm Settlement `);
                          } else {
                            return [
                              createVNode(unref(CheckCircle2), { class: "size-4" }),
                              createTextVNode(" Confirm Settlement ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "outline",
                        disabled: unref(processing),
                        onClick: ($event) => showRejectDialog.value = true
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(XCircle), { class: "size-4" }, null, _parent4, _scopeId3));
                            _push4(` Reject Settlement `);
                          } else {
                            return [
                              createVNode(unref(XCircle), { class: "size-4" }),
                              createTextVNode(" Reject Settlement ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("div", { class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Distributor"),
                          createVNode("p", { class: "text-lg font-semibold mt-1" }, toDisplayString(unref(settlement).distributor?.name || "—"), 1)
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Amount"),
                          createVNode("p", { class: "text-lg font-bold text-green-600 mt-1" }, toDisplayString(Number(unref(settlement).amount).toFixed(2)), 1)
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Payment Method"),
                          createVNode("p", { class: "text-lg font-semibold mt-1" }, toDisplayString(formatMethod(unref(settlement).paymentMethod)), 1)
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Submitted At"),
                          createVNode("p", { class: "text-lg font-semibold mt-1" }, toDisplayString(formatDate(unref(settlement).submittedAt)), 1)
                        ]),
                        createVNode("div", { class: "rounded-lg border p-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Current Distributor Custody"),
                          createVNode("p", { class: "text-lg font-bold text-amber-600 dark:text-amber-400 mt-1" }, toDisplayString(Number(unref(custodyBalance)).toFixed(2)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Available to settle after this one")
                        ])
                      ]),
                      unref(settlement).notes ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "rounded-lg border p-4"
                      }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Notes"),
                        createVNode("p", { class: "text-sm mt-1" }, toDisplayString(unref(settlement).notes), 1)
                      ])) : createCommentVNode("", true),
                      unref(settlement).status === "CONFIRMED" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 p-4"
                      }, [
                        createVNode("p", { class: "text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-2" }, [
                          createVNode(unref(CheckCircle2), { class: "size-4" }),
                          createTextVNode(" Confirmed on " + toDisplayString(formatDate(unref(settlement).confirmedAt)), 1)
                        ]),
                        unref(settlement).confirmedByUser ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-muted-foreground mt-1"
                        }, " By " + toDisplayString(unref(settlement).confirmedByUser.name), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      unref(settlement).status === "REJECTED" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "rounded-lg border border-destructive/30 bg-destructive/5 p-4"
                      }, [
                        createVNode("p", { class: "text-sm font-medium text-destructive flex items-center gap-2" }, [
                          createVNode(unref(XCircle), { class: "size-4" }),
                          createTextVNode(" Rejected ")
                        ]),
                        unref(settlement).rejectionReason ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-muted-foreground mt-1"
                        }, toDisplayString(unref(settlement).rejectionReason), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      unref(settlement).status === "SUBMITTED" && unref(can)("SALES", "UPDATE") ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "flex flex-wrap gap-3 border-t pt-4"
                      }, [
                        createVNode(_component_UiButton, {
                          variant: "default",
                          disabled: unref(processing),
                          onClick: ($event) => showConfirmDialog.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(CheckCircle2), { class: "size-4" }),
                            createTextVNode(" Confirm Settlement ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          disabled: unref(processing),
                          onClick: ($event) => showRejectDialog.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(XCircle), { class: "size-4" }),
                            createTextVNode(" Reject Settlement ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
                      ])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, { class: "text-lg" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(settlement).settlementNumber), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Submitted " + toDisplayString(formatDate(unref(settlement).submittedAt)), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_UiBadge, {
                      variant: statusBadge(unref(settlement).status).variant
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(statusBadge(unref(settlement).status).label), 1)
                      ]),
                      _: 1
                    }, 8, ["variant"])
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" }, [
                      createVNode("div", { class: "rounded-lg border p-4" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Distributor"),
                        createVNode("p", { class: "text-lg font-semibold mt-1" }, toDisplayString(unref(settlement).distributor?.name || "—"), 1)
                      ]),
                      createVNode("div", { class: "rounded-lg border p-4" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Amount"),
                        createVNode("p", { class: "text-lg font-bold text-green-600 mt-1" }, toDisplayString(Number(unref(settlement).amount).toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "rounded-lg border p-4" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Payment Method"),
                        createVNode("p", { class: "text-lg font-semibold mt-1" }, toDisplayString(formatMethod(unref(settlement).paymentMethod)), 1)
                      ]),
                      createVNode("div", { class: "rounded-lg border p-4" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Submitted At"),
                        createVNode("p", { class: "text-lg font-semibold mt-1" }, toDisplayString(formatDate(unref(settlement).submittedAt)), 1)
                      ]),
                      createVNode("div", { class: "rounded-lg border p-4" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Current Distributor Custody"),
                        createVNode("p", { class: "text-lg font-bold text-amber-600 dark:text-amber-400 mt-1" }, toDisplayString(Number(unref(custodyBalance)).toFixed(2)), 1),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Available to settle after this one")
                      ])
                    ]),
                    unref(settlement).notes ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-lg border p-4"
                    }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Notes"),
                      createVNode("p", { class: "text-sm mt-1" }, toDisplayString(unref(settlement).notes), 1)
                    ])) : createCommentVNode("", true),
                    unref(settlement).status === "CONFIRMED" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 p-4"
                    }, [
                      createVNode("p", { class: "text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-2" }, [
                        createVNode(unref(CheckCircle2), { class: "size-4" }),
                        createTextVNode(" Confirmed on " + toDisplayString(formatDate(unref(settlement).confirmedAt)), 1)
                      ]),
                      unref(settlement).confirmedByUser ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-muted-foreground mt-1"
                      }, " By " + toDisplayString(unref(settlement).confirmedByUser.name), 1)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    unref(settlement).status === "REJECTED" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "rounded-lg border border-destructive/30 bg-destructive/5 p-4"
                    }, [
                      createVNode("p", { class: "text-sm font-medium text-destructive flex items-center gap-2" }, [
                        createVNode(unref(XCircle), { class: "size-4" }),
                        createTextVNode(" Rejected ")
                      ]),
                      unref(settlement).rejectionReason ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-muted-foreground mt-1"
                      }, toDisplayString(unref(settlement).rejectionReason), 1)) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    unref(settlement).status === "SUBMITTED" && unref(can)("SALES", "UPDATE") ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "flex flex-wrap gap-3 border-t pt-4"
                    }, [
                      createVNode(_component_UiButton, {
                        variant: "default",
                        disabled: unref(processing),
                        onClick: ($event) => showConfirmDialog.value = true
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(CheckCircle2), { class: "size-4" }),
                          createTextVNode(" Confirm Settlement ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        disabled: unref(processing),
                        onClick: ($event) => showRejectDialog.value = true
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(XCircle), { class: "size-4" }),
                          createTextVNode(" Reject Settlement ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"])
                    ])) : createCommentVNode("", true)
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
      _push(ssrRenderComponent(_component_ConfirmDialog, {
        open: unref(showConfirmDialog),
        "onUpdate:open": ($event) => isRef(showConfirmDialog) ? showConfirmDialog.value = $event : null,
        title: "Confirm Settlement",
        description: `Confirm that the company has received ${Number(unref(settlement)?.amount || 0).toFixed(2)} from this distributor. This transfers the amount from distributor custody to company cash.`,
        "confirm-text": "Confirm Settlement",
        variant: "default",
        loading: unref(processing),
        onConfirm: confirmSettlement,
        onCancel: ($event) => showConfirmDialog.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showRejectDialog),
        "onUpdate:open": ($event) => showRejectDialog.value = $event
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
                              _push5(`Reject Settlement`);
                            } else {
                              return [
                                createTextVNode("Reject Settlement")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`The settlement will stay in the distributor&#39;s custody. Provide a reason for rejection.`);
                            } else {
                              return [
                                createTextVNode("The settlement will stay in the distributor's custody. Provide a reason for rejection.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Reject Settlement")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("The settlement will stay in the distributor's custody. Provide a reason for rejection.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "rejectionReason" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Rejection Reason *`);
                      } else {
                        return [
                          createTextVNode("Rejection Reason *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTextarea, {
                    id: "rejectionReason",
                    modelValue: unref(rejectionReason),
                    "onUpdate:modelValue": ($event) => isRef(rejectionReason) ? rejectionReason.value = $event : null,
                    placeholder: "Explain why the settlement was rejected"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showRejectDialog.value = false
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
                          variant: "destructive",
                          disabled: unref(processing) || !unref(rejectionReason).trim()
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!unref(processing)) {
                                _push5(ssrRenderComponent(unref(XCircle), { class: "size-4" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` ${ssrInterpolate(unref(processing) ? "Rejecting..." : "Reject Settlement")}`);
                            } else {
                              return [
                                !unref(processing) ? (openBlock(), createBlock(unref(XCircle), {
                                  key: 0,
                                  class: "size-4"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(unref(processing) ? "Rejecting..." : "Reject Settlement"), 1)
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
                            onClick: ($event) => showRejectDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            variant: "destructive",
                            disabled: unref(processing) || !unref(rejectionReason).trim()
                          }, {
                            default: withCtx(() => [
                              !unref(processing) ? (openBlock(), createBlock(unref(XCircle), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(processing) ? "Rejecting..." : "Reject Settlement"), 1)
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
                            createTextVNode("Reject Settlement")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("The settlement will stay in the distributor's custody. Provide a reason for rejection.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(rejectSettlement, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "rejectionReason" }, {
                          default: withCtx(() => [
                            createTextVNode("Rejection Reason *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          id: "rejectionReason",
                          modelValue: unref(rejectionReason),
                          "onUpdate:modelValue": ($event) => isRef(rejectionReason) ? rejectionReason.value = $event : null,
                          placeholder: "Explain why the settlement was rejected"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showRejectDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            variant: "destructive",
                            disabled: unref(processing) || !unref(rejectionReason).trim()
                          }, {
                            default: withCtx(() => [
                              !unref(processing) ? (openBlock(), createBlock(unref(XCircle), {
                                key: 0,
                                class: "size-4"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(processing) ? "Rejecting..." : "Reject Settlement"), 1)
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
                          createTextVNode("Reject Settlement")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("The settlement will stay in the distributor's custody. Provide a reason for rejection.")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(rejectSettlement, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "rejectionReason" }, {
                        default: withCtx(() => [
                          createTextVNode("Rejection Reason *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        id: "rejectionReason",
                        modelValue: unref(rejectionReason),
                        "onUpdate:modelValue": ($event) => isRef(rejectionReason) ? rejectionReason.value = $event : null,
                        placeholder: "Explain why the settlement was rejected"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showRejectDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          variant: "destructive",
                          disabled: unref(processing) || !unref(rejectionReason).trim()
                        }, {
                          default: withCtx(() => [
                            !unref(processing) ? (openBlock(), createBlock(unref(XCircle), {
                              key: 0,
                              class: "size-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(processing) ? "Rejecting..." : "Reject Settlement"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sales/settlements/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-B_u5opA0.mjs.map
