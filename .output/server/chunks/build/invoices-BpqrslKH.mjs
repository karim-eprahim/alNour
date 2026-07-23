import { _ as __nuxt_component_1 } from './LoadingState-y5B8zlzY.mjs';
import { _ as _sfc_main$1 } from './index-DcmArl0H.mjs';
import { _ as _sfc_main$2 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$3, c as _sfc_main$3$1, d as _sfc_main$4 } from './CardTitle-St-iDBLB.mjs';
import { _ as _sfc_main$5 } from './Label-fqACuvH5.mjs';
import { _ as _sfc_main$7 } from './Input-DA89G3IO.mjs';
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Receipt, DollarSign, ArrowLeft } from '@lucide/vue';
import { u as useDistributorStore } from './store-c63gT4nW.mjs';
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

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "invoices",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const page = ref(1);
    const showPay = ref(false);
    const selectedInvoice = ref(null);
    const payAmount = ref(0);
    const paying = ref(false);
    async function load() {
      await store.fetchInvoices({ page: page.value, limit });
    }
    watch(page, load);
    function openPay(inv) {
      selectedInvoice.value = inv;
      payAmount.value = inv.totalAmount - inv.paidAmount;
      showPay.value = true;
    }
    async function handlePay() {
      if (!selectedInvoice.value || payAmount.value <= 0) return;
      paying.value = true;
      try {
        await store.payInvoice(selectedInvoice.value.id, {
          amount: payAmount.value,
          paymentMethod: "CASH"
        });
        toast.success(`Payment recorded for ${selectedInvoice.value.invoiceNumber}`);
        showPay.value = false;
        await store.fetchCashOnHand();
      } catch (err) {
        toast.error(err?.message || "Payment failed");
      } finally {
        paying.value = false;
      }
    }
    const statusVariant = (s) => {
      const map = { UNPAID: "destructive", PARTIAL: "default", PAID: "success", CANCELLED: "secondary" };
      return map[s] || "secondary";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiBadge = _sfc_main$1;
      const _component_UiButton = _sfc_main$2;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiLabel = _sfc_main$5;
      const _component_UiInput = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Invoices</h1><p class="text-sm text-muted-foreground">Your created invoices</p></div></div>`);
      if (unref(store).loading) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else if (unref(store).invoices.length === 0) {
        _push(`<div class="text-center py-12 text-sm text-muted-foreground">`);
        _push(ssrRenderComponent(unref(Receipt), { class: "mx-auto mb-2 size-8 text-muted-foreground/60" }, null, _parent));
        _push(`<p>No invoices yet</p></div>`);
      } else if (!unref(showPay)) {
        _push(`<div class="grid gap-2"><!--[-->`);
        ssrRenderList(unref(store).invoices, (inv) => {
          _push(`<div class="rounded-lg border p-4"><div class="flex items-center justify-between"><div class="min-w-0 flex-1"><p class="text-sm font-medium truncate">${ssrInterpolate(inv.invoiceNumber)}</p><p class="text-xs text-muted-foreground truncate">${ssrInterpolate(inv.customer?.name)}</p></div>`);
          _push(ssrRenderComponent(_component_UiBadge, {
            variant: statusVariant(inv.status),
            class: "text-[10px] shrink-0 ml-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(inv.status)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(inv.status), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="mt-2 flex items-center justify-between text-sm"><span class="text-muted-foreground">Total: <strong>${ssrInterpolate(inv.totalAmount.toFixed(2))}</strong></span><span class="text-muted-foreground">Paid: <strong>${ssrInterpolate(inv.paidAmount.toFixed(2))}</strong></span></div>`);
          if (inv.status !== "PAID" && inv.status !== "CANCELLED") {
            _push(`<div class="mt-2">`);
            _push(ssrRenderComponent(_component_UiButton, {
              size: "sm",
              class: "w-full",
              onClick: ($event) => openPay(inv)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(DollarSign), { class: "size-4" }, null, _parent2, _scopeId));
                  _push2(` Collect Payment `);
                } else {
                  return [
                    createVNode(unref(DollarSign), { class: "size-4" }),
                    createTextVNode(" Collect Payment ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(selectedInvoice)) {
        _push(`<div class="space-y-6"><div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          size: "icon",
          class: "size-8 shrink-0",
          onClick: ($event) => showPay.value = false
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
        _push(`<div><h2 class="text-lg font-semibold">${ssrInterpolate(unref(selectedInvoice).invoiceNumber)}</h2><p class="text-sm text-muted-foreground">${ssrInterpolate(unref(selectedInvoice).customer?.name)}</p></div></div>`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Record Payment`);
                        } else {
                          return [
                            createTextVNode("Record Payment")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Total: ${ssrInterpolate(unref(selectedInvoice).totalAmount.toFixed(2))} | Remaining: ${ssrInterpolate((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2))}`);
                        } else {
                          return [
                            createTextVNode(" Total: " + toDisplayString(unref(selectedInvoice).totalAmount.toFixed(2)) + " | Remaining: " + toDisplayString((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx(() => [
                          createTextVNode("Record Payment")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode(" Total: " + toDisplayString(unref(selectedInvoice).totalAmount.toFixed(2)) + " | Remaining: " + toDisplayString((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2)), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Amount`);
                        } else {
                          return [
                            createTextVNode("Amount")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      modelValue: unref(payAmount),
                      "onUpdate:modelValue": ($event) => isRef(payAmount) ? payAmount.value = $event : null,
                      type: "number",
                      min: "0",
                      step: "0.01",
                      max: unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount,
                      class: "mt-1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(paying) || unref(payAmount) <= 0,
                      onClick: handlePay
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(DollarSign), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` ${ssrInterpolate(unref(paying) ? "Recording..." : "Record Payment")}`);
                        } else {
                          return [
                            createVNode(unref(DollarSign), { class: "size-4" }),
                            createTextVNode(" " + toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Amount")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(payAmount),
                          "onUpdate:modelValue": ($event) => isRef(payAmount) ? payAmount.value = $event : null,
                          type: "number",
                          min: "0",
                          step: "0.01",
                          max: unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount,
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                      ]),
                      createVNode(_component_UiButton, {
                        class: "w-full",
                        disabled: unref(paying) || unref(payAmount) <= 0,
                        onClick: handlePay
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DollarSign), { class: "size-4" }),
                          createTextVNode(" " + toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
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
                        createTextVNode("Record Payment")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Total: " + toDisplayString(unref(selectedInvoice).totalAmount.toFixed(2)) + " | Remaining: " + toDisplayString((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Amount")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(payAmount),
                        "onUpdate:modelValue": ($event) => isRef(payAmount) ? payAmount.value = $event : null,
                        type: "number",
                        min: "0",
                        step: "0.01",
                        max: unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount,
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                    ]),
                    createVNode(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(paying) || unref(payAmount) <= 0,
                      onClick: handlePay
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(DollarSign), { class: "size-4" }),
                        createTextVNode(" " + toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/invoices.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=invoices-BpqrslKH.mjs.map
