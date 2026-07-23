import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, a as _sfc_main$4, c as _sfc_main$3, d as _sfc_main$3$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$2 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$5 } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$7 } from './Input-pgd-3rGf.mjs';
import { a as useRoute, n as navigateTo } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { ArrowLeft, Printer, User, Building2, DollarSign } from '@lucide/vue';
import { u as useDistributorStore } from './store-c63gT4nW.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const store = useDistributorStore();
    const invoice = ref(null);
    const loading = ref(true);
    const payAmount = ref(0);
    const paying = ref(false);
    async function load() {
      loading.value = true;
      try {
        const data = await $fetch(`/api/invoices/${route.params.id}`);
        invoice.value = data.invoice || data;
        payAmount.value = (invoice.value?.totalAmount || 0) - (invoice.value?.paidAmount || 0);
      } catch (err) {
        toast.error("Failed to load invoice");
      } finally {
        loading.value = false;
      }
    }
    async function handlePay() {
      if (!invoice.value || payAmount.value <= 0) return;
      paying.value = true;
      try {
        await store.payInvoice(invoice.value.id, { amount: payAmount.value, paymentMethod: "CASH" });
        toast.success("Payment recorded");
        await load();
        await store.fetchCashOnHand();
      } catch (err) {
        toast.error(err?.message || "Payment failed");
      } finally {
        paying.value = false;
      }
    }
    function printInvoice() {
      (void 0).print();
    }
    const statusVariant = (s) => {
      const map = { UNPAID: "destructive", PARTIAL: "default", PAID: "success", CANCELLED: "secondary" };
      return map[s] || "secondary";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiBadge = _sfc_main$2;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiLabel = _sfc_main$5;
      const _component_UiInput = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3 print:hidden">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/bills")
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
      _push(`<div class="flex-1"></div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "outline",
        size: "sm",
        onClick: printInvoice
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Printer), { class: "size-4" }, null, _parent2, _scopeId));
            _push2(` Print `);
          } else {
            return [
              createVNode(unref(Printer), { class: "size-4" }),
              createTextVNode(" Print ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else if (unref(invoice)) {
        _push(`<div class="mx-auto max-w-2xl print-area">`);
        _push(ssrRenderComponent(_component_UiCard, { class: "border-2" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "text-center border-b print:border-gray-300" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h1 class="text-xl font-bold"${_scopeId2}>Al Nour</h1><p class="text-sm text-muted-foreground"${_scopeId2}>INVOICE</p><p class="text-lg font-semibold mt-1"${_scopeId2}>${ssrInterpolate(unref(invoice).invoiceNumber)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(new Date(unref(invoice).createdAt).toLocaleDateString())}</p>`);
                  } else {
                    return [
                      createVNode("h1", { class: "text-xl font-bold" }, "Al Nour"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "INVOICE"),
                      createVNode("p", { class: "text-lg font-semibold mt-1" }, toDisplayString(unref(invoice).invoiceNumber), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(unref(invoice).createdAt).toLocaleDateString()), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4 pt-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid grid-cols-2 gap-4 text-sm"${_scopeId2}><div${_scopeId2}><p class="text-xs text-muted-foreground flex items-center gap-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(User), { class: "size-3" }, null, _parent3, _scopeId2));
                    _push3(` Customer</p><p class="font-medium"${_scopeId2}>${ssrInterpolate(unref(invoice).customer?.name || "—")}</p></div><div class="text-right"${_scopeId2}><p class="text-xs text-muted-foreground flex items-center gap-1 justify-end"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Building2), { class: "size-3" }, null, _parent3, _scopeId2));
                    _push3(` Warehouse</p><p class="font-medium"${_scopeId2}>${ssrInterpolate(unref(invoice).warehouse?.name || "—")}</p></div></div><div class="rounded-lg border"${_scopeId2}><div class="grid grid-cols-4 gap-2 border-b bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground print:bg-gray-100"${_scopeId2}><span class="col-span-2"${_scopeId2}>Product</span><span class="text-right"${_scopeId2}>Qty</span><span class="text-right"${_scopeId2}>Total</span></div><!--[-->`);
                    ssrRenderList(unref(invoice).items || [], (item) => {
                      _push3(`<div class="grid grid-cols-4 gap-2 border-b px-3 py-2 text-sm last:border-0"${_scopeId2}><span class="col-span-2 truncate"${_scopeId2}>${ssrInterpolate(item.product?.name || item.productId)}</span><span class="text-right"${_scopeId2}>${ssrInterpolate(item.quantity.toFixed(1))}</span><span class="text-right font-medium"${_scopeId2}>${ssrInterpolate(item.totalPrice.toFixed(2))}</span></div>`);
                    });
                    _push3(`<!--]--><div class="flex justify-between px-3 py-2 text-sm font-semibold border-t"${_scopeId2}><span${_scopeId2}>Total</span><span${_scopeId2}>${ssrInterpolate(unref(invoice).totalAmount.toFixed(2))}</span></div></div><div class="rounded-lg border p-3 space-y-2 text-sm"${_scopeId2}><p class="text-xs font-medium text-muted-foreground uppercase tracking-wide"${_scopeId2}>Payment Summary</p><div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Paid Amount</span><span class="font-medium text-green-600"${_scopeId2}>${ssrInterpolate(unref(invoice).paidAmount.toFixed(2))}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Remaining</span><span class="${ssrRenderClass([unref(invoice).totalAmount - unref(invoice).paidAmount > 0 ? "text-red-600" : "", "font-medium"])}"${_scopeId2}>${ssrInterpolate((unref(invoice).totalAmount - unref(invoice).paidAmount).toFixed(2))}</span></div><div class="flex justify-between pt-1 border-t"${_scopeId2}><span class="font-medium"${_scopeId2}>Status</span>`);
                    _push3(ssrRenderComponent(_component_UiBadge, {
                      variant: statusVariant(unref(invoice).status)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(invoice).status)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(invoice).status), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                    if (unref(invoice).payments && unref(invoice).payments.length) {
                      _push3(`<div class="rounded-lg border p-3 text-sm"${_scopeId2}><p class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2"${_scopeId2}>Payments</p><!--[-->`);
                      ssrRenderList(unref(invoice).payments, (p) => {
                        _push3(`<div class="flex justify-between border-b py-1.5 last:border-0"${_scopeId2}><div${_scopeId2}><span class="font-medium"${_scopeId2}>${ssrInterpolate(p.paymentMethod)}</span><span class="text-xs text-muted-foreground ml-2"${_scopeId2}>${ssrInterpolate(new Date(p.createdAt).toLocaleDateString())}</span></div><span class="font-semibold text-green-600"${_scopeId2}>${ssrInterpolate(p.amount.toFixed(2))}</span></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-muted-foreground flex items-center gap-1" }, [
                            createVNode(unref(User), { class: "size-3" }),
                            createTextVNode(" Customer")
                          ]),
                          createVNode("p", { class: "font-medium" }, toDisplayString(unref(invoice).customer?.name || "—"), 1)
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("p", { class: "text-xs text-muted-foreground flex items-center gap-1 justify-end" }, [
                            createVNode(unref(Building2), { class: "size-3" }),
                            createTextVNode(" Warehouse")
                          ]),
                          createVNode("p", { class: "font-medium" }, toDisplayString(unref(invoice).warehouse?.name || "—"), 1)
                        ])
                      ]),
                      createVNode("div", { class: "rounded-lg border" }, [
                        createVNode("div", { class: "grid grid-cols-4 gap-2 border-b bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground print:bg-gray-100" }, [
                          createVNode("span", { class: "col-span-2" }, "Product"),
                          createVNode("span", { class: "text-right" }, "Qty"),
                          createVNode("span", { class: "text-right" }, "Total")
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice).items || [], (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "grid grid-cols-4 gap-2 border-b px-3 py-2 text-sm last:border-0"
                          }, [
                            createVNode("span", { class: "col-span-2 truncate" }, toDisplayString(item.product?.name || item.productId), 1),
                            createVNode("span", { class: "text-right" }, toDisplayString(item.quantity.toFixed(1)), 1),
                            createVNode("span", { class: "text-right font-medium" }, toDisplayString(item.totalPrice.toFixed(2)), 1)
                          ]);
                        }), 128)),
                        createVNode("div", { class: "flex justify-between px-3 py-2 text-sm font-semibold border-t" }, [
                          createVNode("span", null, "Total"),
                          createVNode("span", null, toDisplayString(unref(invoice).totalAmount.toFixed(2)), 1)
                        ])
                      ]),
                      createVNode("div", { class: "rounded-lg border p-3 space-y-2 text-sm" }, [
                        createVNode("p", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide" }, "Payment Summary"),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Paid Amount"),
                          createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(unref(invoice).paidAmount.toFixed(2)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Remaining"),
                          createVNode("span", {
                            class: ["font-medium", unref(invoice).totalAmount - unref(invoice).paidAmount > 0 ? "text-red-600" : ""]
                          }, toDisplayString((unref(invoice).totalAmount - unref(invoice).paidAmount).toFixed(2)), 3)
                        ]),
                        createVNode("div", { class: "flex justify-between pt-1 border-t" }, [
                          createVNode("span", { class: "font-medium" }, "Status"),
                          createVNode(_component_UiBadge, {
                            variant: statusVariant(unref(invoice).status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(invoice).status), 1)
                            ]),
                            _: 1
                          }, 8, ["variant"])
                        ])
                      ]),
                      unref(invoice).payments && unref(invoice).payments.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "rounded-lg border p-3 text-sm"
                      }, [
                        createVNode("p", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2" }, "Payments"),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice).payments, (p) => {
                          return openBlock(), createBlock("div", {
                            key: p.id,
                            class: "flex justify-between border-b py-1.5 last:border-0"
                          }, [
                            createVNode("div", null, [
                              createVNode("span", { class: "font-medium" }, toDisplayString(p.paymentMethod), 1),
                              createVNode("span", { class: "text-xs text-muted-foreground ml-2" }, toDisplayString(new Date(p.createdAt).toLocaleDateString()), 1)
                            ]),
                            createVNode("span", { class: "font-semibold text-green-600" }, toDisplayString(p.amount.toFixed(2)), 1)
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
                createVNode(_component_UiCardHeader, { class: "text-center border-b print:border-gray-300" }, {
                  default: withCtx(() => [
                    createVNode("h1", { class: "text-xl font-bold" }, "Al Nour"),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, "INVOICE"),
                    createVNode("p", { class: "text-lg font-semibold mt-1" }, toDisplayString(unref(invoice).invoiceNumber), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(unref(invoice).createdAt).toLocaleDateString()), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-4 pt-4" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground flex items-center gap-1" }, [
                          createVNode(unref(User), { class: "size-3" }),
                          createTextVNode(" Customer")
                        ]),
                        createVNode("p", { class: "font-medium" }, toDisplayString(unref(invoice).customer?.name || "—"), 1)
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode("p", { class: "text-xs text-muted-foreground flex items-center gap-1 justify-end" }, [
                          createVNode(unref(Building2), { class: "size-3" }),
                          createTextVNode(" Warehouse")
                        ]),
                        createVNode("p", { class: "font-medium" }, toDisplayString(unref(invoice).warehouse?.name || "—"), 1)
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border" }, [
                      createVNode("div", { class: "grid grid-cols-4 gap-2 border-b bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground print:bg-gray-100" }, [
                        createVNode("span", { class: "col-span-2" }, "Product"),
                        createVNode("span", { class: "text-right" }, "Qty"),
                        createVNode("span", { class: "text-right" }, "Total")
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice).items || [], (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "grid grid-cols-4 gap-2 border-b px-3 py-2 text-sm last:border-0"
                        }, [
                          createVNode("span", { class: "col-span-2 truncate" }, toDisplayString(item.product?.name || item.productId), 1),
                          createVNode("span", { class: "text-right" }, toDisplayString(item.quantity.toFixed(1)), 1),
                          createVNode("span", { class: "text-right font-medium" }, toDisplayString(item.totalPrice.toFixed(2)), 1)
                        ]);
                      }), 128)),
                      createVNode("div", { class: "flex justify-between px-3 py-2 text-sm font-semibold border-t" }, [
                        createVNode("span", null, "Total"),
                        createVNode("span", null, toDisplayString(unref(invoice).totalAmount.toFixed(2)), 1)
                      ])
                    ]),
                    createVNode("div", { class: "rounded-lg border p-3 space-y-2 text-sm" }, [
                      createVNode("p", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide" }, "Payment Summary"),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Paid Amount"),
                        createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(unref(invoice).paidAmount.toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Remaining"),
                        createVNode("span", {
                          class: ["font-medium", unref(invoice).totalAmount - unref(invoice).paidAmount > 0 ? "text-red-600" : ""]
                        }, toDisplayString((unref(invoice).totalAmount - unref(invoice).paidAmount).toFixed(2)), 3)
                      ]),
                      createVNode("div", { class: "flex justify-between pt-1 border-t" }, [
                        createVNode("span", { class: "font-medium" }, "Status"),
                        createVNode(_component_UiBadge, {
                          variant: statusVariant(unref(invoice).status)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(invoice).status), 1)
                          ]),
                          _: 1
                        }, 8, ["variant"])
                      ])
                    ]),
                    unref(invoice).payments && unref(invoice).payments.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-lg border p-3 text-sm"
                    }, [
                      createVNode("p", { class: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2" }, "Payments"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice).payments, (p) => {
                        return openBlock(), createBlock("div", {
                          key: p.id,
                          class: "flex justify-between border-b py-1.5 last:border-0"
                        }, [
                          createVNode("div", null, [
                            createVNode("span", { class: "font-medium" }, toDisplayString(p.paymentMethod), 1),
                            createVNode("span", { class: "text-xs text-muted-foreground ml-2" }, toDisplayString(new Date(p.createdAt).toLocaleDateString()), 1)
                          ]),
                          createVNode("span", { class: "font-semibold text-green-600" }, toDisplayString(p.amount.toFixed(2)), 1)
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
        if (unref(invoice).status !== "PAID" && unref(invoice).status !== "CANCELLED") {
          _push(`<div class="mt-6 print:hidden">`);
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Collect Payment`);
                          } else {
                            return [
                              createTextVNode("Collect Payment")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Remaining: ${ssrInterpolate((unref(invoice).totalAmount - unref(invoice).paidAmount).toFixed(2))}`);
                          } else {
                            return [
                              createTextVNode("Remaining: " + toDisplayString((unref(invoice).totalAmount - unref(invoice).paidAmount).toFixed(2)), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Collect Payment")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Remaining: " + toDisplayString((unref(invoice).totalAmount - unref(invoice).paidAmount).toFixed(2)), 1)
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
                        max: unref(invoice).totalAmount - unref(invoice).paidAmount,
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
                            max: unref(invoice).totalAmount - unref(invoice).paidAmount,
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
                          createTextVNode("Collect Payment")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Remaining: " + toDisplayString((unref(invoice).totalAmount - unref(invoice).paidAmount).toFixed(2)), 1)
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
                          max: unref(invoice).totalAmount - unref(invoice).paidAmount,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/bills/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BwFrw_-J.mjs.map
