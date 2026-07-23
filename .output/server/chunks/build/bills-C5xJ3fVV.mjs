import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$2 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$1, b as _sfc_main$3, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$4 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$2, c as _sfc_main$5, d as _sfc_main$3$1, a as _sfc_main$4$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$8 } from './Label-Di1i-yIq.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { DollarSign, Search, Receipt, ChevronRight, ArrowLeft, Printer } from '@lucide/vue';
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

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "bills",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const search = ref("");
    const statusFilter = ref("__all__");
    const page = ref(1);
    const showDetail = ref(false);
    const selectedInvoice = ref(null);
    const payAmount = ref(0);
    const paying = ref(false);
    const invoiceDetailLoading = ref(false);
    const statusOptions = [
      { value: "__all__", label: "All" },
      { value: "UNPAID", label: "Unpaid" },
      { value: "PARTIAL", label: "Partial" },
      { value: "PAID", label: "Paid" }
    ];
    async function load() {
      const status = statusFilter.value !== "__all__" ? statusFilter.value : void 0;
      await store.fetchInvoices({ search: search.value || void 0, status, page: page.value, limit });
    }
    watch([search, statusFilter], () => {
      page.value = 1;
      load();
    });
    watch(page, load);
    function statusVariant(s) {
      const map = { UNPAID: "destructive", PARTIAL: "default", PAID: "success", CANCELLED: "secondary" };
      return map[s] || "secondary";
    }
    function goBack() {
      showDetail.value = false;
      selectedInvoice.value = null;
    }
    async function handlePay() {
      if (!selectedInvoice.value || payAmount.value <= 0) return;
      paying.value = true;
      try {
        await store.payInvoice(selectedInvoice.value.id, { amount: payAmount.value, paymentMethod: "CASH" });
        toast.success(`Payment recorded`);
        await load();
        goBack();
        await store.fetchCashOnHand();
      } catch (err) {
        toast.error(err?.message || "Payment failed");
      } finally {
        paying.value = false;
      }
    }
    function printInvoice() {
      if (!selectedInvoice.value) return;
      (void 0).print();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = PageHeader;
      const _component_UiButton = _sfc_main$1;
      const _component_UiInput = _sfc_main$2;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$1;
      const _component_UiSelectValue = _sfc_main$3;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiBadge = _sfc_main$4;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$5;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiLabel = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeader, {
        title: "My Invoices",
        description: "Invoices from your direct sales"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              size: "sm",
              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/sales/new")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DollarSign), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` New Sale `);
                } else {
                  return [
                    createVNode(unref(DollarSign), { class: "size-4" }),
                    createTextVNode(" New Sale ")
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
                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/distributor/sales/new")
              }, {
                default: withCtx(() => [
                  createVNode(unref(DollarSign), { class: "size-4" }),
                  createTextVNode(" New Sale ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!unref(showDetail)) {
        _push(`<div class="space-y-4"><div class="flex flex-col gap-2 sm:flex-row"><div class="relative flex-1">`);
        _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          modelValue: unref(search),
          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
          placeholder: "Search invoices...",
          class: "pl-9"
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UiSelect, {
          modelValue: unref(statusFilter),
          "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full sm:w-36" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiSelectValue, { placeholder: "Status" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiSelectValue, { placeholder: "Status" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiSelectContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(statusOptions, (opt) => {
                      _push3(ssrRenderComponent(_component_UiSelectItem, {
                        key: opt.value,
                        value: opt.value
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(opt.label)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(opt.label), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(statusOptions, (opt) => {
                        return createVNode(_component_UiSelectItem, {
                          key: opt.value,
                          value: opt.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(opt.label), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiSelectTrigger, { class: "w-full sm:w-36" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiSelectValue, { placeholder: "Status" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiSelectContent, null, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(statusOptions, (opt) => {
                      return createVNode(_component_UiSelectItem, {
                        key: opt.value,
                        value: opt.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(opt.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(store).loading) {
          _push(`<div class="flex justify-center py-12">`);
          _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
          _push(`</div>`);
        } else if (unref(store).invoices.length === 0) {
          _push(`<div class="text-center py-12 text-sm text-muted-foreground">`);
          _push(ssrRenderComponent(unref(Receipt), { class: "mx-auto mb-2 size-8 text-muted-foreground/60" }, null, _parent));
          _push(`<p>No invoices found</p></div>`);
        } else {
          _push(`<!--[--><div class="hidden sm:block"><div class="rounded-lg border"><div class="grid grid-cols-12 gap-2 border-b bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground"><div class="col-span-3">Invoice</div><div class="col-span-3">Customer</div><div class="col-span-2 text-right">Total</div><div class="col-span-2 text-right">Paid</div><div class="col-span-1">Status</div><div class="col-span-1"></div></div><!--[-->`);
          ssrRenderList(unref(store).invoices, (inv) => {
            _push(`<div class="grid grid-cols-12 gap-2 border-b px-4 py-3 text-sm transition-colors hover:bg-accent/50 cursor-pointer last:border-0 items-center"><div class="col-span-3 font-medium truncate">${ssrInterpolate(inv.invoiceNumber)}</div><div class="col-span-3 truncate text-muted-foreground">${ssrInterpolate(inv.customer?.name || "—")}</div><div class="col-span-2 text-right font-semibold">${ssrInterpolate(inv.totalAmount.toFixed(2))}</div><div class="col-span-2 text-right text-muted-foreground">${ssrInterpolate(inv.paidAmount.toFixed(2))}</div><div class="col-span-1">`);
            _push(ssrRenderComponent(_component_UiBadge, {
              variant: statusVariant(inv.status),
              class: "text-[10px]"
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
            _push(`</div><div class="col-span-1 flex justify-end">`);
            _push(ssrRenderComponent(unref(ChevronRight), { class: "size-4 text-muted-foreground" }, null, _parent));
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></div><div class="grid gap-2 sm:hidden"><!--[-->`);
          ssrRenderList(unref(store).invoices, (inv) => {
            _push(`<div class="rounded-lg border p-4 transition-colors hover:bg-accent/50 cursor-pointer"><div class="flex items-center justify-between"><p class="text-sm font-medium truncate">${ssrInterpolate(inv.invoiceNumber)}</p>`);
            _push(ssrRenderComponent(_component_UiBadge, {
              variant: statusVariant(inv.status),
              class: "text-[10px]"
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
            _push(`</div><p class="mt-1 text-xs text-muted-foreground truncate">${ssrInterpolate(inv.customer?.name || "—")}</p><div class="mt-2 flex items-center justify-between text-sm"><span class="text-muted-foreground">Total <strong>${ssrInterpolate(inv.totalAmount.toFixed(2))}</strong></span><span class="text-muted-foreground">Paid <strong>${ssrInterpolate(inv.paidAmount.toFixed(2))}</strong></span></div></div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        }
        _push(`</div>`);
      } else if (unref(selectedInvoice)) {
        _push(`<div class="space-y-6 print-area"><div class="flex items-center gap-3 print:hidden">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          size: "icon",
          class: "size-8 shrink-0",
          onClick: goBack
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
        _push(`<div><h2 class="text-lg font-semibold">${ssrInterpolate(unref(selectedInvoice).invoiceNumber)}</h2><p class="text-sm text-muted-foreground">${ssrInterpolate(unref(selectedInvoice).customer?.name || "—")}</p></div><div class="ml-auto">`);
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
        _push(`</div></div>`);
        if (unref(invoiceDetailLoading)) {
          _push(`<div class="flex justify-center py-12">`);
          _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(selectedInvoice).invoiceNumber)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(selectedInvoice).invoiceNumber), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(new Date(unref(selectedInvoice).createdAt).toLocaleDateString())}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(new Date(unref(selectedInvoice).createdAt).toLocaleDateString()), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(_component_UiBadge, {
                        variant: statusVariant(unref(selectedInvoice).status),
                        class: "text-xs print:border print:border-gray-300"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(unref(selectedInvoice).status)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(unref(selectedInvoice).status), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, { class: "text-base" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedInvoice).invoiceNumber), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(new Date(unref(selectedInvoice).createdAt).toLocaleDateString()), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_UiBadge, {
                            variant: statusVariant(unref(selectedInvoice).status),
                            class: "text-xs print:border print:border-gray-300"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(selectedInvoice).status), 1)
                            ]),
                            _: 1
                          }, 8, ["variant"])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-3 text-sm" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Customer</span><span${_scopeId2}>${ssrInterpolate(unref(selectedInvoice).customer?.name || "—")}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Warehouse</span><span${_scopeId2}>${ssrInterpolate(unref(selectedInvoice).warehouse?.name || "—")}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Sale Source</span><span${_scopeId2}>${ssrInterpolate(unref(selectedInvoice).saleSource || "—")}</span></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Customer"),
                          createVNode("span", null, toDisplayString(unref(selectedInvoice).customer?.name || "—"), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Warehouse"),
                          createVNode("span", null, toDisplayString(unref(selectedInvoice).warehouse?.name || "—"), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Sale Source"),
                          createVNode("span", null, toDisplayString(unref(selectedInvoice).saleSource || "—"), 1)
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
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode(_component_UiCardTitle, { class: "text-base" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(selectedInvoice).invoiceNumber), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(new Date(unref(selectedInvoice).createdAt).toLocaleDateString()), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(_component_UiBadge, {
                          variant: statusVariant(unref(selectedInvoice).status),
                          class: "text-xs print:border print:border-gray-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(selectedInvoice).status), 1)
                          ]),
                          _: 1
                        }, 8, ["variant"])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, { class: "space-y-3 text-sm" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Customer"),
                        createVNode("span", null, toDisplayString(unref(selectedInvoice).customer?.name || "—"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Warehouse"),
                        createVNode("span", null, toDisplayString(unref(selectedInvoice).warehouse?.name || "—"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Sale Source"),
                        createVNode("span", null, toDisplayString(unref(selectedInvoice).saleSource || "—"), 1)
                      ])
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
                            _push4(`Items`);
                          } else {
                            return [
                              createTextVNode("Items")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Items")
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
                      _push3(`<div class="grid grid-cols-4 gap-2 border-b pb-2 text-xs font-medium text-muted-foreground"${_scopeId2}><span class="col-span-2"${_scopeId2}>Product</span><span class="text-right"${_scopeId2}>Qty</span><span class="text-right"${_scopeId2}>Total</span></div><!--[-->`);
                      ssrRenderList(unref(selectedInvoice).items || [], (item) => {
                        _push3(`<div class="grid grid-cols-4 gap-2 py-2 text-sm border-b last:border-0"${_scopeId2}><span class="col-span-2 truncate"${_scopeId2}>${ssrInterpolate(item.product?.name || item.productId)}</span><span class="text-right"${_scopeId2}>${ssrInterpolate(item.quantity.toFixed(1))}</span><span class="text-right font-medium"${_scopeId2}>${ssrInterpolate(item.totalPrice.toFixed(2))}</span></div>`);
                      });
                      _push3(`<!--]--><div class="flex justify-between pt-2 text-sm font-semibold"${_scopeId2}><span${_scopeId2}>Total</span><span${_scopeId2}>${ssrInterpolate(unref(selectedInvoice).totalAmount.toFixed(2))}</span></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "grid grid-cols-4 gap-2 border-b pb-2 text-xs font-medium text-muted-foreground" }, [
                          createVNode("span", { class: "col-span-2" }, "Product"),
                          createVNode("span", { class: "text-right" }, "Qty"),
                          createVNode("span", { class: "text-right" }, "Total")
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedInvoice).items || [], (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "grid grid-cols-4 gap-2 py-2 text-sm border-b last:border-0"
                          }, [
                            createVNode("span", { class: "col-span-2 truncate" }, toDisplayString(item.product?.name || item.productId), 1),
                            createVNode("span", { class: "text-right" }, toDisplayString(item.quantity.toFixed(1)), 1),
                            createVNode("span", { class: "text-right font-medium" }, toDisplayString(item.totalPrice.toFixed(2)), 1)
                          ]);
                        }), 128)),
                        createVNode("div", { class: "flex justify-between pt-2 text-sm font-semibold" }, [
                          createVNode("span", null, "Total"),
                          createVNode("span", null, toDisplayString(unref(selectedInvoice).totalAmount.toFixed(2)), 1)
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
                      createVNode(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx(() => [
                          createTextVNode("Items")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "grid grid-cols-4 gap-2 border-b pb-2 text-xs font-medium text-muted-foreground" }, [
                        createVNode("span", { class: "col-span-2" }, "Product"),
                        createVNode("span", { class: "text-right" }, "Qty"),
                        createVNode("span", { class: "text-right" }, "Total")
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedInvoice).items || [], (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "grid grid-cols-4 gap-2 py-2 text-sm border-b last:border-0"
                        }, [
                          createVNode("span", { class: "col-span-2 truncate" }, toDisplayString(item.product?.name || item.productId), 1),
                          createVNode("span", { class: "text-right" }, toDisplayString(item.quantity.toFixed(1)), 1),
                          createVNode("span", { class: "text-right font-medium" }, toDisplayString(item.totalPrice.toFixed(2)), 1)
                        ]);
                      }), 128)),
                      createVNode("div", { class: "flex justify-between pt-2 text-sm font-semibold" }, [
                        createVNode("span", null, "Total"),
                        createVNode("span", null, toDisplayString(unref(selectedInvoice).totalAmount.toFixed(2)), 1)
                      ])
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
                            _push4(`Payments`);
                          } else {
                            return [
                              createTextVNode("Payments")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Payments")
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
                      if (!(unref(selectedInvoice).payments && unref(selectedInvoice).payments.length)) {
                        _push3(`<div class="text-sm text-muted-foreground py-2 text-center"${_scopeId2}> No payments recorded </div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(selectedInvoice).payments || [], (p) => {
                        _push3(`<div class="flex items-center justify-between border-b py-2 text-sm last:border-0"${_scopeId2}><div${_scopeId2}><p class="font-medium"${_scopeId2}>${ssrInterpolate(p.paymentMethod)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(new Date(p.createdAt).toLocaleDateString())}</p></div><span class="font-semibold text-green-600"${_scopeId2}>${ssrInterpolate(p.amount.toFixed(2))}</span></div>`);
                      });
                      _push3(`<!--]--><div class="flex justify-between pt-2 text-sm border-t mt-2"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Total Paid</span><span class="font-semibold"${_scopeId2}>${ssrInterpolate(unref(selectedInvoice).paidAmount.toFixed(2))}</span></div>`);
                      if (unref(selectedInvoice).status !== "PAID") {
                        _push3(`<div class="flex justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Remaining</span><span class="font-semibold text-red-600"${_scopeId2}>${ssrInterpolate((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2))}</span></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        !(unref(selectedInvoice).payments && unref(selectedInvoice).payments.length) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm text-muted-foreground py-2 text-center"
                        }, " No payments recorded ")) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedInvoice).payments || [], (p) => {
                          return openBlock(), createBlock("div", {
                            key: p.id,
                            class: "flex items-center justify-between border-b py-2 text-sm last:border-0"
                          }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(p.paymentMethod), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(p.createdAt).toLocaleDateString()), 1)
                            ]),
                            createVNode("span", { class: "font-semibold text-green-600" }, toDisplayString(p.amount.toFixed(2)), 1)
                          ]);
                        }), 128)),
                        createVNode("div", { class: "flex justify-between pt-2 text-sm border-t mt-2" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Total Paid"),
                          createVNode("span", { class: "font-semibold" }, toDisplayString(unref(selectedInvoice).paidAmount.toFixed(2)), 1)
                        ]),
                        unref(selectedInvoice).status !== "PAID" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between text-sm"
                        }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Remaining"),
                          createVNode("span", { class: "font-semibold text-red-600" }, toDisplayString((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2)), 1)
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
                          createTextVNode("Payments")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      !(unref(selectedInvoice).payments && unref(selectedInvoice).payments.length) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-sm text-muted-foreground py-2 text-center"
                      }, " No payments recorded ")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedInvoice).payments || [], (p) => {
                        return openBlock(), createBlock("div", {
                          key: p.id,
                          class: "flex items-center justify-between border-b py-2 text-sm last:border-0"
                        }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "font-medium" }, toDisplayString(p.paymentMethod), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(p.createdAt).toLocaleDateString()), 1)
                          ]),
                          createVNode("span", { class: "font-semibold text-green-600" }, toDisplayString(p.amount.toFixed(2)), 1)
                        ]);
                      }), 128)),
                      createVNode("div", { class: "flex justify-between pt-2 text-sm border-t mt-2" }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Total Paid"),
                        createVNode("span", { class: "font-semibold" }, toDisplayString(unref(selectedInvoice).paidAmount.toFixed(2)), 1)
                      ]),
                      unref(selectedInvoice).status !== "PAID" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex justify-between text-sm"
                      }, [
                        createVNode("span", { class: "text-muted-foreground" }, "Remaining"),
                        createVNode("span", { class: "font-semibold text-red-600" }, toDisplayString((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2)), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          if (unref(selectedInvoice).status !== "PAID" && unref(selectedInvoice).status !== "CANCELLED") {
            _push(`<div class="print:hidden">`);
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
                              _push4(`Remaining: ${ssrInterpolate((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2))}`);
                            } else {
                              return [
                                createTextVNode("Remaining: " + toDisplayString((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2)), 1)
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
                              createTextVNode("Remaining: " + toDisplayString((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2)), 1)
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
                            createTextVNode("Collect Payment")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Remaining: " + toDisplayString((unref(selectedInvoice).totalAmount - unref(selectedInvoice).paidAmount).toFixed(2)), 1)
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
          _push(`<!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/bills.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=bills-C5xJ3fVV.mjs.map
