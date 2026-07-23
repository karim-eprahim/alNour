import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DEwgn_ii.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, a as _sfc_main$4, d as _sfc_main$3$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$3, a as _sfc_main$1$2, b as _sfc_main$5, c as _sfc_main$2$1 } from './index-CsamvZIh.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$8, a as _sfc_main$7, b as _sfc_main$4$1, c as _sfc_main$1$3, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-Cc67ZnYT.mjs';
import { _ as _sfc_main$9 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$4, d as _sfc_main$5$2, e as _sfc_main$4$2 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$a } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$a$1, a as _sfc_main$1$5, b as _sfc_main$b, c as _sfc_main$9$2, d as _sfc_main$7$2 } from './SelectValue-CdUm-rR7.mjs';
import { _ as _sfc_main$c } from './Input-pgd-3rGf.mjs';
import { a as useRoute, h as usePermissions, n as navigateTo } from './server.mjs';
import { u as usePurchasesStore } from './store-B0h3miBc.mjs';
import { defineComponent, computed, ref, reactive, resolveDirective, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, isRef, withDirectives, openBlock, createBlock, createCommentVNode, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrGetDirectiveProps, ssrRenderList } from 'vue/server-renderer';
import { ArrowLeft, Building2, Link, ArrowLeftRight, Phone, Mail, MapPin, FileText, CreditCard, ArrowUpRight, ArrowDownRight } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { u as useSuppliersStore } from './store-DXABWweC.mjs';
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
import '@vueuse/core';
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
    const supplierId = computed(() => route.params.id);
    const suppliersStore = useSuppliersStore();
    const { can } = usePermissions();
    const activeTab = ref("invoices");
    const showLedgerDialog = ref(false);
    const showPayDialog = ref(false);
    const showContraDialog = ref(false);
    const payingInvoice = ref(null);
    const ledgerForm = reactive({ amount: null, type: "DEBIT", description: "" });
    const payForm = reactive({ amount: null, description: "" });
    const contraForm = reactive({ amount: null });
    async function fetchSupplier() {
      await suppliersStore.fetchSupplier(supplierId.value);
    }
    const balance = computed(() => suppliersStore.currentSupplier?.balance ?? 0);
    const invoices = computed(() => suppliersStore.currentSupplier?.purchaseInvoices ?? []);
    const ledgerEntries = computed(() => suppliersStore.currentSupplier?.ledgerEntries ?? []);
    const linkedCustomer = computed(() => suppliersStore.currentSupplier?.linkedCustomer ?? null);
    const linkedCustomerBalance = computed(() => linkedCustomer.value?.balance ?? 0);
    const netBalance = computed(() => suppliersStore.currentSupplier?.netBalance ?? balance.value);
    async function handleContraSettlement() {
      if (!contraForm.amount && contraForm.amount !== 0) return;
      try {
        await $fetch("/api/accounting/reconcile-partner", {
          method: "POST",
          body: {
            supplierId: supplierId.value,
            customerId: linkedCustomer.value.id,
            amount: contraForm.amount
          }
        });
        showContraDialog.value = false;
        contraForm.amount = null;
        toast.success("Contra settlement completed");
        fetchSupplier();
      } catch (e) {
        toast.error(e?.data?.statusMessage || "Settlement failed");
      }
    }
    async function handleLedgerEntry() {
      if (!ledgerForm.amount) return;
      try {
        await suppliersStore.addLedgerEntry(supplierId.value, {
          amount: ledgerForm.amount,
          type: ledgerForm.type,
          description: ledgerForm.description || void 0
        });
        showLedgerDialog.value = false;
        ledgerForm.amount = null;
        ledgerForm.type = "DEBIT";
        ledgerForm.description = "";
        toast.success("Ledger entry added");
        fetchSupplier();
      } catch {
      }
    }
    function openPay(invoice) {
      payingInvoice.value = invoice;
      payForm.amount = null;
      payForm.description = "";
      showPayDialog.value = true;
    }
    async function handlePay() {
      if (!payingInvoice.value || !payForm.amount) return;
      try {
        await usePurchasesStore().payInvoice(payingInvoice.value.id, {
          amount: payForm.amount,
          description: payForm.description || void 0
        });
        showPayDialog.value = false;
        payingInvoice.value = null;
        toast.success("Payment recorded");
        fetchSupplier();
      } catch {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiTabs = _sfc_main$3;
      const _component_UiTabsList = _sfc_main$1$2;
      const _component_UiTabsTrigger = _sfc_main$5;
      const _component_UiTabsContent = _sfc_main$2$1;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$7;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$3;
      const _component_UiTableBody = _sfc_main$7$1;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_UiBadge = _sfc_main$9;
      const _component_UiDialog = _sfc_main$9$1;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$2;
      const _component_UiDialogTitle = _sfc_main$1$4;
      const _component_UiDialogDescription = _sfc_main$5$2;
      const _component_UiLabel = _sfc_main$a;
      const _component_UiSelect = _sfc_main$a$1;
      const _component_UiSelectTrigger = _sfc_main$1$5;
      const _component_UiSelectValue = _sfc_main$b;
      const _component_UiSelectContent = _sfc_main$9$2;
      const _component_UiSelectItem = _sfc_main$7$2;
      const _component_UiInput = _sfc_main$c;
      const _component_UiDialogFooter = _sfc_main$4$2;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/suppliers")
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
      _push(`<div class="flex items-center gap-3"><div class="size-9 flex items-center justify-center rounded-lg bg-muted">`);
      _push(ssrRenderComponent(unref(Building2), { class: "size-4 text-muted-foreground" }, null, _parent));
      _push(`</div><div><h1 class="text-lg font-semibold">${ssrInterpolate(unref(suppliersStore).currentSupplier?.name || "Loading...")}</h1>`);
      if (unref(suppliersStore).currentSupplier?.company) {
        _push(`<p class="text-xs text-muted-foreground">${ssrInterpolate(unref(suppliersStore).currentSupplier.company)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (unref(linkedCustomer)) {
        _push(`<div class="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 p-4"><div class="flex items-center justify-between flex-wrap gap-3"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(Link), { class: "size-4 text-blue-600" }, null, _parent));
        _push(`<span class="text-sm font-medium">Linked to Customer: `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/customers/${unref(linkedCustomer).id}`,
          class: "text-blue-600 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(linkedCustomer).name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(linkedCustomer).name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</span></div><div class="flex items-center gap-4"><div class="text-right"><p class="text-xs text-muted-foreground">Supplier Balance</p><p class="${ssrRenderClass([unref(balance) > 0 ? "text-destructive" : "text-green-600", "text-sm font-medium tabular-nums"])}">${ssrInterpolate(Number(unref(balance)).toFixed(2))}</p></div><div class="text-right"><p class="text-xs text-muted-foreground">Customer Balance</p><p class="${ssrRenderClass([unref(linkedCustomerBalance) > 0 ? "text-destructive" : "text-green-600", "text-sm font-medium tabular-nums"])}">${ssrInterpolate(Number(unref(linkedCustomerBalance)).toFixed(2))}</p></div><div class="text-right border-l pl-4"><p class="text-xs text-muted-foreground">Net Balance</p><p class="${ssrRenderClass([unref(netBalance) > 0 ? "text-destructive" : unref(netBalance) < 0 ? "text-green-600" : "", "text-sm font-bold tabular-nums"])}">${ssrInterpolate(unref(netBalance) > 0 ? `نحن ندين له بـ ${Number(unref(netBalance)).toFixed(2)}` : unref(netBalance) < 0 ? `هو مدين لنا بـ ${Number(Math.abs(unref(netBalance))).toFixed(2)}` : "صفر")}</p></div>`);
        _push(ssrRenderComponent(_component_UiButton, mergeProps({
          size: "sm",
          variant: "outline",
          class: "border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400",
          onClick: ($event) => showContraDialog.value = true
        }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "SUPPLIERS", action: "UPDATE" })), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeftRight), { class: "size-4" }, null, _parent2, _scopeId));
              _push2(` مقاصة مالية `);
            } else {
              return [
                createVNode(unref(ArrowLeftRight), { class: "size-4" }),
                createTextVNode(" مقاصة مالية ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid gap-4 sm:grid-cols-4">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Balance`);
                      } else {
                        return [
                          createTextVNode("Balance")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Balance")
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
                  _push3(`<p class="${ssrRenderClass([unref(balance) > 0 ? "text-destructive" : unref(balance) < 0 ? "text-green-600" : "", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate(Number(unref(balance)).toFixed(2))}</p>`);
                } else {
                  return [
                    createVNode("p", {
                      class: ["text-2xl font-bold", unref(balance) > 0 ? "text-destructive" : unref(balance) < 0 ? "text-green-600" : ""]
                    }, toDisplayString(Number(unref(balance)).toFixed(2)), 3)
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
                      createTextVNode("Balance")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", {
                    class: ["text-2xl font-bold", unref(balance) > 0 ? "text-destructive" : unref(balance) < 0 ? "text-green-600" : ""]
                  }, toDisplayString(Number(unref(balance)).toFixed(2)), 3)
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
                        _push4(`Invoices`);
                      } else {
                        return [
                          createTextVNode("Invoices")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Invoices")
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(invoices).length)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(invoices).length), 1)
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
                      createTextVNode("Invoices")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(invoices).length), 1)
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
                        _push4(`Total Purchases`);
                      } else {
                        return [
                          createTextVNode("Total Purchases")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Purchases")
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(invoices).reduce((s, i) => s + Number(i.totalAmount), 0).toFixed(2))}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(invoices).reduce((s, i) => s + Number(i.totalAmount), 0).toFixed(2)), 1)
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
                      createTextVNode("Total Purchases")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(invoices).reduce((s, i) => s + Number(i.totalAmount), 0).toFixed(2)), 1)
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
                        _push4(`Total Paid`);
                      } else {
                        return [
                          createTextVNode("Total Paid")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Paid")
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(invoices).reduce((s, i) => s + Number(i.paidAmount), 0).toFixed(2))}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(invoices).reduce((s, i) => s + Number(i.paidAmount), 0).toFixed(2)), 1)
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
                      createTextVNode("Total Paid")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(invoices).reduce((s, i) => s + Number(i.paidAmount), 0).toFixed(2)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(suppliersStore).currentSupplier) {
        _push(`<div class="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">`);
        if (unref(suppliersStore).currentSupplier.phone) {
          _push(`<span class="flex items-center gap-1">`);
          _push(ssrRenderComponent(unref(Phone), { class: "size-3.5" }, null, _parent));
          _push(` ${ssrInterpolate(unref(suppliersStore).currentSupplier.phone)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(suppliersStore).currentSupplier.email) {
          _push(`<span class="flex items-center gap-1">`);
          _push(ssrRenderComponent(unref(Mail), { class: "size-3.5" }, null, _parent));
          _push(` ${ssrInterpolate(unref(suppliersStore).currentSupplier.email)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(suppliersStore).currentSupplier.address) {
          _push(`<span class="flex items-center gap-1">`);
          _push(ssrRenderComponent(unref(MapPin), { class: "size-3.5" }, null, _parent));
          _push(` ${ssrInterpolate(unref(suppliersStore).currentSupplier.address)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UiTabs, {
        modelValue: unref(activeTab),
        "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
        class: "space-y-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiTabsList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "invoices" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Purchase Invoices`);
                      } else {
                        return [
                          createTextVNode("Purchase Invoices")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "ledger" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ledger`);
                      } else {
                        return [
                          createTextVNode("Ledger")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsTrigger, { value: "invoices" }, {
                      default: withCtx(() => [
                        createTextVNode("Purchase Invoices")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "ledger" }, {
                      default: withCtx(() => [
                        createTextVNode("Ledger")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "invoices" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UiCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Purchase Invoices`);
                                  } else {
                                    return [
                                      createTextVNode("Purchase Invoices")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`All purchase invoices from this supplier`);
                                  } else {
                                    return [
                                      createTextVNode("All purchase invoices from this supplier")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(_component_UiButton, mergeProps({
                                size: "sm",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                              }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "SUPPLIERS", action: "UPDATE" })), {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(FileText), { class: "size-4" }, null, _parent6, _scopeId5));
                                    _push6(` New Invoice `);
                                  } else {
                                    return [
                                      createVNode(unref(FileText), { class: "size-4" }),
                                      createTextVNode(" New Invoice ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode(_component_UiCardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Purchase Invoices")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiCardDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode("All purchase invoices from this supplier")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                withDirectives((openBlock(), createBlock(_component_UiButton, {
                                  size: "sm",
                                  onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(FileText), { class: "size-4" }),
                                    createTextVNode(" New Invoice ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])), [
                                  [_directive_can, { module: "SUPPLIERS", action: "UPDATE" }]
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(invoices).length === 0) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_EmptyState, {
                                  title: "No invoices",
                                  description: "No purchase invoices recorded for this supplier yet",
                                  action: "New Invoice",
                                  onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                _push5(ssrRenderComponent(_component_UiTable, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHeader, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_UiTableRow, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Invoice #`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Invoice #")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Date`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Date")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Warehouse`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Warehouse")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Amount`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Amount")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Paid`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Paid")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Due`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Due")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "w-20 text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Action`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Action")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Invoice #")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Date")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Warehouse")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Amount")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Paid")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Due")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Action")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_UiTableRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Invoice #")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Date")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Warehouse")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Amount")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Paid")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Due")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Action")
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
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableBody, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(unref(invoices), (inv) => {
                                              _push7(ssrRenderComponent(_component_UiTableRow, {
                                                key: inv.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_UiTableCell, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_NuxtLink, {
                                                            to: `/purchases/${inv.id}`,
                                                            class: "text-sm font-mono font-medium hover:underline"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate(inv.invoiceNumber)}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_NuxtLink, {
                                                              to: `/purchases/${inv.id}`,
                                                              class: "text-sm font-mono font-medium hover:underline"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["to"])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(new Date(inv.invoiceDate).toLocaleDateString())}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(inv.warehouse?.name)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(Number(inv.totalAmount).toFixed(2))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(Number(inv.paidAmount).toFixed(2))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, {
                                                      class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          if (Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SUPPLIERS", "UPDATE")) {
                                                            _push9(ssrRenderComponent(_component_UiButton, {
                                                              variant: "ghost",
                                                              size: "icon-xs",
                                                              class: "text-green-600",
                                                              onClick: ($event) => openPay(inv)
                                                            }, {
                                                              default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                                if (_push10) {
                                                                  _push10(ssrRenderComponent(unref(CreditCard), { class: "size-3.5" }, null, _parent10, _scopeId9));
                                                                } else {
                                                                  return [
                                                                    createVNode(unref(CreditCard), { class: "size-3.5" })
                                                                  ];
                                                                }
                                                              }),
                                                              _: 2
                                                            }, _parent9, _scopeId8));
                                                          } else {
                                                            _push9(`<!---->`);
                                                          }
                                                        } else {
                                                          return [
                                                            Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SUPPLIERS", "UPDATE") ? (openBlock(), createBlock(_component_UiButton, {
                                                              key: 0,
                                                              variant: "ghost",
                                                              size: "icon-xs",
                                                              class: "text-green-600",
                                                              onClick: ($event) => openPay(inv)
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(CreditCard), { class: "size-3.5" })
                                                              ]),
                                                              _: 1
                                                            }, 8, ["onClick"])) : createCommentVNode("", true)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_UiTableCell, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_NuxtLink, {
                                                            to: `/purchases/${inv.id}`,
                                                            class: "text-sm font-mono font-medium hover:underline"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["to"])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, {
                                                        class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["class"]),
                                                      createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                        default: withCtx(() => [
                                                          Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SUPPLIERS", "UPDATE") ? (openBlock(), createBlock(_component_UiButton, {
                                                            key: 0,
                                                            variant: "ghost",
                                                            size: "icon-xs",
                                                            class: "text-green-600",
                                                            onClick: ($event) => openPay(inv)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(CreditCard), { class: "size-3.5" })
                                                            ]),
                                                            _: 1
                                                          }, 8, ["onClick"])) : createCommentVNode("", true)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(invoices), (inv) => {
                                                return openBlock(), createBlock(_component_UiTableRow, {
                                                  key: inv.id
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiTableCell, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtLink, {
                                                          to: `/purchases/${inv.id}`,
                                                          class: "text-sm font-mono font-medium hover:underline"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["to"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, {
                                                      class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["class"]),
                                                    createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SUPPLIERS", "UPDATE") ? (openBlock(), createBlock(_component_UiButton, {
                                                          key: 0,
                                                          variant: "ghost",
                                                          size: "icon-xs",
                                                          class: "text-green-600",
                                                          onClick: ($event) => openPay(inv)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(CreditCard), { class: "size-3.5" })
                                                          ]),
                                                          _: 1
                                                        }, 8, ["onClick"])) : createCommentVNode("", true)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHeader, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Invoice #")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Date")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Warehouse")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Amount")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Paid")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Due")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Action")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableBody, null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(invoices), (inv) => {
                                              return openBlock(), createBlock(_component_UiTableRow, {
                                                key: inv.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableCell, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtLink, {
                                                        to: `/purchases/${inv.id}`,
                                                        class: "text-sm font-mono font-medium hover:underline"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["to"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, {
                                                    class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["class"]),
                                                  createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SUPPLIERS", "UPDATE") ? (openBlock(), createBlock(_component_UiButton, {
                                                        key: 0,
                                                        variant: "ghost",
                                                        size: "icon-xs",
                                                        class: "text-green-600",
                                                        onClick: ($event) => openPay(inv)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(CreditCard), { class: "size-3.5" })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"])) : createCommentVNode("", true)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              }
                            } else {
                              return [
                                unref(invoices).length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_EmptyState, {
                                    title: "No invoices",
                                    description: "No purchase invoices recorded for this supplier yet",
                                    action: "New Invoice",
                                    onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                                  }, null, 8, ["onAction"])
                                ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHeader, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Invoice #")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Date")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Warehouse")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Amount")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Paid")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Due")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Action")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableBody, null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(invoices), (inv) => {
                                          return openBlock(), createBlock(_component_UiTableRow, {
                                            key: inv.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiTableCell, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtLink, {
                                                    to: `/purchases/${inv.id}`,
                                                    class: "text-sm font-mono font-medium hover:underline"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, {
                                                class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SUPPLIERS", "UPDATE") ? (openBlock(), createBlock(_component_UiButton, {
                                                    key: 0,
                                                    variant: "ghost",
                                                    size: "icon-xs",
                                                    class: "text-green-600",
                                                    onClick: ($event) => openPay(inv)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(CreditCard), { class: "size-3.5" })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Purchase Invoices")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("All purchase invoices from this supplier")
                                  ]),
                                  _: 1
                                })
                              ]),
                              withDirectives((openBlock(), createBlock(_component_UiButton, {
                                size: "sm",
                                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(FileText), { class: "size-4" }),
                                  createTextVNode(" New Invoice ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])), [
                                [_directive_can, { module: "SUPPLIERS", action: "UPDATE" }]
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              unref(invoices).length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-6"
                              }, [
                                createVNode(_component_EmptyState, {
                                  title: "No invoices",
                                  description: "No purchase invoices recorded for this supplier yet",
                                  action: "New Invoice",
                                  onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                                }, null, 8, ["onAction"])
                              ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Invoice #")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Date")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Warehouse")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Amount")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Paid")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Due")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Action")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableBody, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(invoices), (inv) => {
                                        return openBlock(), createBlock(_component_UiTableRow, {
                                          key: inv.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableCell, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtLink, {
                                                  to: `/purchases/${inv.id}`,
                                                  class: "text-sm font-mono font-medium hover:underline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, {
                                              class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"]),
                                            createVNode(_component_UiTableCell, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SUPPLIERS", "UPDATE") ? (openBlock(), createBlock(_component_UiButton, {
                                                  key: 0,
                                                  variant: "ghost",
                                                  size: "icon-xs",
                                                  class: "text-green-600",
                                                  onClick: ($event) => openPay(inv)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(CreditCard), { class: "size-3.5" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])) : createCommentVNode("", true)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCard, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Purchase Invoices")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("All purchase invoices from this supplier")
                                ]),
                                _: 1
                              })
                            ]),
                            withDirectives((openBlock(), createBlock(_component_UiButton, {
                              size: "sm",
                              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(FileText), { class: "size-4" }),
                                createTextVNode(" New Invoice ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])), [
                              [_directive_can, { module: "SUPPLIERS", action: "UPDATE" }]
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            unref(invoices).length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-6"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "No invoices",
                                description: "No purchase invoices recorded for this supplier yet",
                                action: "New Invoice",
                                onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                              }, null, 8, ["onAction"])
                            ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Invoice #")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Date")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Warehouse")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Amount")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Paid")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Due")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Action")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableBody, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(invoices), (inv) => {
                                      return openBlock(), createBlock(_component_UiTableRow, {
                                        key: inv.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtLink, {
                                                to: `/purchases/${inv.id}`,
                                                class: "text-sm font-mono font-medium hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, {
                                            class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"]),
                                          createVNode(_component_UiTableCell, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SUPPLIERS", "UPDATE") ? (openBlock(), createBlock(_component_UiButton, {
                                                key: 0,
                                                variant: "ghost",
                                                size: "icon-xs",
                                                class: "text-green-600",
                                                onClick: ($event) => openPay(inv)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(CreditCard), { class: "size-3.5" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }))
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "ledger" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UiCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Ledger Entries`);
                                  } else {
                                    return [
                                      createTextVNode("Ledger Entries")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Financial transactions with this supplier`);
                                  } else {
                                    return [
                                      createTextVNode("Financial transactions with this supplier")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(_component_UiButton, mergeProps({
                                size: "sm",
                                variant: "outline",
                                onClick: ($event) => showLedgerDialog.value = true
                              }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "SUPPLIERS", action: "UPDATE" })), {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(CreditCard), { class: "size-4" }, null, _parent6, _scopeId5));
                                    _push6(` Add Entry `);
                                  } else {
                                    return [
                                      createVNode(unref(CreditCard), { class: "size-4" }),
                                      createTextVNode(" Add Entry ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode(_component_UiCardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Ledger Entries")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiCardDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Financial transactions with this supplier")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                withDirectives((openBlock(), createBlock(_component_UiButton, {
                                  size: "sm",
                                  variant: "outline",
                                  onClick: ($event) => showLedgerDialog.value = true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(CreditCard), { class: "size-4" }),
                                    createTextVNode(" Add Entry ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])), [
                                  [_directive_can, { module: "SUPPLIERS", action: "UPDATE" }]
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(ledgerEntries).length === 0) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_EmptyState, {
                                  title: "No ledger entries",
                                  description: "Financial transactions will appear here"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                _push5(ssrRenderComponent(_component_UiTable, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHeader, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_UiTableRow, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Date`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Date")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Type`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Type")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Description`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Description")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Amount`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Amount")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Date")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Type")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Description")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Amount")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_UiTableRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Date")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Type")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Description")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Amount")
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
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableBody, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(unref(ledgerEntries), (entry) => {
                                              _push7(ssrRenderComponent(_component_UiTableRow, {
                                                key: entry.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(new Date(entry.createdAt).toLocaleString())}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(new Date(entry.createdAt).toLocaleString()), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_UiBadge, {
                                                            variant: entry.type === "DEBIT" ? "destructive" : "default",
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`<div class="flex items-center gap-1"${_scopeId9}>`);
                                                                if (entry.type === "DEBIT") {
                                                                  _push10(ssrRenderComponent(unref(ArrowUpRight), { class: "size-3" }, null, _parent10, _scopeId9));
                                                                } else {
                                                                  _push10(ssrRenderComponent(unref(ArrowDownRight), { class: "size-3" }, null, _parent10, _scopeId9));
                                                                }
                                                                _push10(` ${ssrInterpolate(entry.type)}</div>`);
                                                              } else {
                                                                return [
                                                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                                                    entry.type === "DEBIT" ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                                                      key: 0,
                                                                      class: "size-3"
                                                                    })) : (openBlock(), createBlock(unref(ArrowDownRight), {
                                                                      key: 1,
                                                                      class: "size-3"
                                                                    })),
                                                                    createTextVNode(" " + toDisplayString(entry.type), 1)
                                                                  ])
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_UiBadge, {
                                                              variant: entry.type === "DEBIT" ? "destructive" : "default",
                                                              class: "text-xs"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode("div", { class: "flex items-center gap-1" }, [
                                                                  entry.type === "DEBIT" ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                                                    key: 0,
                                                                    class: "size-3"
                                                                  })) : (openBlock(), createBlock(unref(ArrowDownRight), {
                                                                    key: 1,
                                                                    class: "size-3"
                                                                  })),
                                                                  createTextVNode(" " + toDisplayString(entry.type), 1)
                                                                ])
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["variant"])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(entry.description || "—")}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(entry.description || "—"), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, {
                                                      class: ["text-right font-medium tabular-nums", entry.type === "DEBIT" ? "text-destructive" : "text-green-600"]
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(Number(entry.amount).toFixed(2))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(Number(entry.amount).toFixed(2)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(new Date(entry.createdAt).toLocaleString()), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_UiBadge, {
                                                            variant: entry.type === "DEBIT" ? "destructive" : "default",
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "flex items-center gap-1" }, [
                                                                entry.type === "DEBIT" ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                                                  key: 0,
                                                                  class: "size-3"
                                                                })) : (openBlock(), createBlock(unref(ArrowDownRight), {
                                                                  key: 1,
                                                                  class: "size-3"
                                                                })),
                                                                createTextVNode(" " + toDisplayString(entry.type), 1)
                                                              ])
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["variant"])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(entry.description || "—"), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, {
                                                        class: ["text-right font-medium tabular-nums", entry.type === "DEBIT" ? "text-destructive" : "text-green-600"]
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(Number(entry.amount).toFixed(2)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["class"])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(ledgerEntries), (entry) => {
                                                return openBlock(), createBlock(_component_UiTableRow, {
                                                  key: entry.id
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(new Date(entry.createdAt).toLocaleString()), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_UiBadge, {
                                                          variant: entry.type === "DEBIT" ? "destructive" : "default",
                                                          class: "text-xs"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "flex items-center gap-1" }, [
                                                              entry.type === "DEBIT" ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                                                key: 0,
                                                                class: "size-3"
                                                              })) : (openBlock(), createBlock(unref(ArrowDownRight), {
                                                                key: 1,
                                                                class: "size-3"
                                                              })),
                                                              createTextVNode(" " + toDisplayString(entry.type), 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["variant"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(entry.description || "—"), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, {
                                                      class: ["text-right font-medium tabular-nums", entry.type === "DEBIT" ? "text-destructive" : "text-green-600"]
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(entry.amount).toFixed(2)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["class"])
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHeader, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Date")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Type")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Description")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Amount")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableBody, null, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(ledgerEntries), (entry) => {
                                              return openBlock(), createBlock(_component_UiTableRow, {
                                                key: entry.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(new Date(entry.createdAt).toLocaleString()), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_UiBadge, {
                                                        variant: entry.type === "DEBIT" ? "destructive" : "default",
                                                        class: "text-xs"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "flex items-center gap-1" }, [
                                                            entry.type === "DEBIT" ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                                              key: 0,
                                                              class: "size-3"
                                                            })) : (openBlock(), createBlock(unref(ArrowDownRight), {
                                                              key: 1,
                                                              class: "size-3"
                                                            })),
                                                            createTextVNode(" " + toDisplayString(entry.type), 1)
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["variant"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(entry.description || "—"), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, {
                                                    class: ["text-right font-medium tabular-nums", entry.type === "DEBIT" ? "text-destructive" : "text-green-600"]
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(entry.amount).toFixed(2)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["class"])
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              }
                            } else {
                              return [
                                unref(ledgerEntries).length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_EmptyState, {
                                    title: "No ledger entries",
                                    description: "Financial transactions will appear here"
                                  })
                                ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHeader, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Date")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Type")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Description")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Amount")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableBody, null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(ledgerEntries), (entry) => {
                                          return openBlock(), createBlock(_component_UiTableRow, {
                                            key: entry.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(new Date(entry.createdAt).toLocaleString()), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiBadge, {
                                                    variant: entry.type === "DEBIT" ? "destructive" : "default",
                                                    class: "text-xs"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center gap-1" }, [
                                                        entry.type === "DEBIT" ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                                          key: 0,
                                                          class: "size-3"
                                                        })) : (openBlock(), createBlock(unref(ArrowDownRight), {
                                                          key: 1,
                                                          class: "size-3"
                                                        })),
                                                        createTextVNode(" " + toDisplayString(entry.type), 1)
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(entry.description || "—"), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, {
                                                class: ["text-right font-medium tabular-nums", entry.type === "DEBIT" ? "text-destructive" : "text-green-600"]
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(entry.amount).toFixed(2)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"])
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Ledger Entries")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Financial transactions with this supplier")
                                  ]),
                                  _: 1
                                })
                              ]),
                              withDirectives((openBlock(), createBlock(_component_UiButton, {
                                size: "sm",
                                variant: "outline",
                                onClick: ($event) => showLedgerDialog.value = true
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(CreditCard), { class: "size-4" }),
                                  createTextVNode(" Add Entry ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])), [
                                [_directive_can, { module: "SUPPLIERS", action: "UPDATE" }]
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              unref(ledgerEntries).length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-6"
                              }, [
                                createVNode(_component_EmptyState, {
                                  title: "No ledger entries",
                                  description: "Financial transactions will appear here"
                                })
                              ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Date")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Type")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Description")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Amount")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableBody, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(ledgerEntries), (entry) => {
                                        return openBlock(), createBlock(_component_UiTableRow, {
                                          key: entry.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(new Date(entry.createdAt).toLocaleString()), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiBadge, {
                                                  variant: entry.type === "DEBIT" ? "destructive" : "default",
                                                  class: "text-xs"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                                      entry.type === "DEBIT" ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                                        key: 0,
                                                        class: "size-3"
                                                      })) : (openBlock(), createBlock(unref(ArrowDownRight), {
                                                        key: 1,
                                                        class: "size-3"
                                                      })),
                                                      createTextVNode(" " + toDisplayString(entry.type), 1)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(entry.description || "—"), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, {
                                              class: ["text-right font-medium tabular-nums", entry.type === "DEBIT" ? "text-destructive" : "text-green-600"]
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(entry.amount).toFixed(2)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024))
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCard, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Ledger Entries")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Financial transactions with this supplier")
                                ]),
                                _: 1
                              })
                            ]),
                            withDirectives((openBlock(), createBlock(_component_UiButton, {
                              size: "sm",
                              variant: "outline",
                              onClick: ($event) => showLedgerDialog.value = true
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(CreditCard), { class: "size-4" }),
                                createTextVNode(" Add Entry ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])), [
                              [_directive_can, { module: "SUPPLIERS", action: "UPDATE" }]
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            unref(ledgerEntries).length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-6"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "No ledger entries",
                                description: "Financial transactions will appear here"
                              })
                            ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Date")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Type")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Description")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Amount")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableBody, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(ledgerEntries), (entry) => {
                                      return openBlock(), createBlock(_component_UiTableRow, {
                                        key: entry.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(entry.createdAt).toLocaleString()), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiBadge, {
                                                variant: entry.type === "DEBIT" ? "destructive" : "default",
                                                class: "text-xs"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                                    entry.type === "DEBIT" ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                                      key: 0,
                                                      class: "size-3"
                                                    })) : (openBlock(), createBlock(unref(ArrowDownRight), {
                                                      key: 1,
                                                      class: "size-3"
                                                    })),
                                                    createTextVNode(" " + toDisplayString(entry.type), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(entry.description || "—"), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, {
                                            class: ["text-right font-medium tabular-nums", entry.type === "DEBIT" ? "text-destructive" : "text-green-600"]
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(entry.amount).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"])
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024))
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiTabsList, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsTrigger, { value: "invoices" }, {
                    default: withCtx(() => [
                      createTextVNode("Purchase Invoices")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "ledger" }, {
                    default: withCtx(() => [
                      createTextVNode("Ledger")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "invoices" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Purchase Invoices")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("All purchase invoices from this supplier")
                              ]),
                              _: 1
                            })
                          ]),
                          withDirectives((openBlock(), createBlock(_component_UiButton, {
                            size: "sm",
                            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(FileText), { class: "size-4" }),
                              createTextVNode(" New Invoice ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])), [
                            [_directive_can, { module: "SUPPLIERS", action: "UPDATE" }]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          unref(invoices).length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-6"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No invoices",
                              description: "No purchase invoices recorded for this supplier yet",
                              action: "New Invoice",
                              onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                            }, null, 8, ["onAction"])
                          ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Invoice #")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Date")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Warehouse")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Amount")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Paid")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Due")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Action")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableBody, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(invoices), (inv) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: inv.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtLink, {
                                              to: `/purchases/${inv.id}`,
                                              class: "text-sm font-mono font-medium hover:underline"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(inv.invoiceNumber), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["to"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(inv.invoiceDate).toLocaleDateString()), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(inv.warehouse?.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-green-600" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, {
                                          class: ["text-right font-medium tabular-nums", Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? "text-destructive" : ""]
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"]),
                                        createVNode(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SUPPLIERS", "UPDATE") ? (openBlock(), createBlock(_component_UiButton, {
                                              key: 0,
                                              variant: "ghost",
                                              size: "icon-xs",
                                              class: "text-green-600",
                                              onClick: ($event) => openPay(inv)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(CreditCard), { class: "size-3.5" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "ledger" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Ledger Entries")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Financial transactions with this supplier")
                              ]),
                              _: 1
                            })
                          ]),
                          withDirectives((openBlock(), createBlock(_component_UiButton, {
                            size: "sm",
                            variant: "outline",
                            onClick: ($event) => showLedgerDialog.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(CreditCard), { class: "size-4" }),
                              createTextVNode(" Add Entry ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])), [
                            [_directive_can, { module: "SUPPLIERS", action: "UPDATE" }]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          unref(ledgerEntries).length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-6"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No ledger entries",
                              description: "Financial transactions will appear here"
                            })
                          ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Date")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Type")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Description")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Amount")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableBody, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(ledgerEntries), (entry) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: entry.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(entry.createdAt).toLocaleString()), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiBadge, {
                                              variant: entry.type === "DEBIT" ? "destructive" : "default",
                                              class: "text-xs"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex items-center gap-1" }, [
                                                  entry.type === "DEBIT" ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                                    key: 0,
                                                    class: "size-3"
                                                  })) : (openBlock(), createBlock(unref(ArrowDownRight), {
                                                    key: 1,
                                                    class: "size-3"
                                                  })),
                                                  createTextVNode(" " + toDisplayString(entry.type), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(entry.description || "—"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, {
                                          class: ["text-right font-medium tabular-nums", entry.type === "DEBIT" ? "text-destructive" : "text-green-600"]
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(entry.amount).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showLedgerDialog),
        "onUpdate:open": ($event) => showLedgerDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add Ledger Entry`);
                            } else {
                              return [
                                createTextVNode("Add Ledger Entry")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record a financial transaction`);
                            } else {
                              return [
                                createTextVNode("Record a financial transaction")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Add Ledger Entry")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Record a financial transaction")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "ledger-type" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Type`);
                      } else {
                        return [
                          createTextVNode("Type")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(ledgerForm).type,
                    "onUpdate:modelValue": ($event) => unref(ledgerForm).type = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "ledger-type" }, {
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
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "DEBIT" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Debit (Amount Due)`);
                                  } else {
                                    return [
                                      createTextVNode("Debit (Amount Due)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CREDIT" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Credit (Payment)`);
                                  } else {
                                    return [
                                      createTextVNode("Credit (Payment)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "DEBIT" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Debit (Amount Due)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CREDIT" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Credit (Payment)")
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
                          createVNode(_component_UiSelectTrigger, { id: "ledger-type" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "DEBIT" }, {
                                default: withCtx(() => [
                                  createTextVNode("Debit (Amount Due)")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CREDIT" }, {
                                default: withCtx(() => [
                                  createTextVNode("Credit (Payment)")
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
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "ledger-amount" }, {
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
                    id: "ledger-amount",
                    modelValue: unref(ledgerForm).amount,
                    "onUpdate:modelValue": ($event) => unref(ledgerForm).amount = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "ledger-desc" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Description`);
                      } else {
                        return [
                          createTextVNode("Description")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "ledger-desc",
                    modelValue: unref(ledgerForm).description,
                    "onUpdate:modelValue": ($event) => unref(ledgerForm).description = $event,
                    placeholder: "Optional description"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showLedgerDialog.value = false
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
                          disabled: unref(suppliersStore).loading
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add Entry`);
                            } else {
                              return [
                                createTextVNode("Add Entry")
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
                            onClick: ($event) => showLedgerDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(suppliersStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Add Entry")
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
                            createTextVNode("Add Ledger Entry")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Record a financial transaction")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4",
                      onSubmit: withModifiers(handleLedgerEntry, ["prevent"])
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "ledger-type" }, {
                          default: withCtx(() => [
                            createTextVNode("Type")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(ledgerForm).type,
                          "onUpdate:modelValue": ($event) => unref(ledgerForm).type = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "ledger-type" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectItem, { value: "DEBIT" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Debit (Amount Due)")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CREDIT" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Credit (Payment)")
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
                        createVNode(_component_UiLabel, { for: "ledger-amount" }, {
                          default: withCtx(() => [
                            createTextVNode("Amount")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "ledger-amount",
                          modelValue: unref(ledgerForm).amount,
                          "onUpdate:modelValue": ($event) => unref(ledgerForm).amount = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "0.00",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "ledger-desc" }, {
                          default: withCtx(() => [
                            createTextVNode("Description")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "ledger-desc",
                          modelValue: unref(ledgerForm).description,
                          "onUpdate:modelValue": ($event) => unref(ledgerForm).description = $event,
                          placeholder: "Optional description"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showLedgerDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(suppliersStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Add Entry")
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Add Ledger Entry")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Record a financial transaction")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4",
                    onSubmit: withModifiers(handleLedgerEntry, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "ledger-type" }, {
                        default: withCtx(() => [
                          createTextVNode("Type")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(ledgerForm).type,
                        "onUpdate:modelValue": ($event) => unref(ledgerForm).type = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { id: "ledger-type" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "DEBIT" }, {
                                default: withCtx(() => [
                                  createTextVNode("Debit (Amount Due)")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CREDIT" }, {
                                default: withCtx(() => [
                                  createTextVNode("Credit (Payment)")
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
                      createVNode(_component_UiLabel, { for: "ledger-amount" }, {
                        default: withCtx(() => [
                          createTextVNode("Amount")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "ledger-amount",
                        modelValue: unref(ledgerForm).amount,
                        "onUpdate:modelValue": ($event) => unref(ledgerForm).amount = $event,
                        type: "number",
                        step: "0.01",
                        placeholder: "0.00",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "ledger-desc" }, {
                        default: withCtx(() => [
                          createTextVNode("Description")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "ledger-desc",
                        modelValue: unref(ledgerForm).description,
                        "onUpdate:modelValue": ($event) => unref(ledgerForm).description = $event,
                        placeholder: "Optional description"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showLedgerDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: unref(suppliersStore).loading
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Add Entry")
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
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showContraDialog),
        "onUpdate:open": ($event) => showContraDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Contra Settlement (مقاصة مالية)`);
                            } else {
                              return [
                                createTextVNode("Contra Settlement (مقاصة مالية)")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Settle outstanding balances between ${ssrInterpolate(unref(suppliersStore).currentSupplier?.name)} and ${ssrInterpolate(unref(linkedCustomer)?.name)}`);
                            } else {
                              return [
                                createTextVNode("Settle outstanding balances between " + toDisplayString(unref(suppliersStore).currentSupplier?.name) + " and " + toDisplayString(unref(linkedCustomer)?.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Contra Settlement (مقاصة مالية)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Settle outstanding balances between " + toDisplayString(unref(suppliersStore).currentSupplier?.name) + " and " + toDisplayString(unref(linkedCustomer)?.name), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Supplier Balance:</span><span class="${ssrRenderClass([unref(balance) > 0 ? "text-destructive" : "text-green-600", "font-medium"])}"${_scopeId2}>${ssrInterpolate(Number(unref(balance)).toFixed(2))}</span></div><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Customer Balance:</span><span class="${ssrRenderClass([unref(linkedCustomerBalance) > 0 ? "text-destructive" : "text-green-600", "font-medium"])}"${_scopeId2}>${ssrInterpolate(Number(unref(linkedCustomerBalance)).toFixed(2))}</span></div><div class="flex justify-between border-t pt-2"${_scopeId2}><span${_scopeId2}>Current Net:</span><span class="${ssrRenderClass([unref(netBalance) > 0 ? "text-destructive" : unref(netBalance) < 0 ? "text-green-600" : "", "font-bold"])}"${_scopeId2}>${ssrInterpolate(Number(unref(netBalance)).toFixed(2))}</span></div></div><form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "contra-amount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Settlement Amount`);
                      } else {
                        return [
                          createTextVNode("Settlement Amount")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "contra-amount",
                    modelValue: unref(contraForm).amount,
                    "onUpdate:modelValue": ($event) => unref(contraForm).amount = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>Leave empty to auto-calculate the minimum of both balances</p></div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showContraDialog.value = false
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
                        _push4(ssrRenderComponent(_component_UiButton, { type: "submit" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Execute Settlement`);
                            } else {
                              return [
                                createTextVNode("Execute Settlement")
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
                            onClick: ($event) => showContraDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode("Execute Settlement")
                            ]),
                            _: 1
                          })
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
                            createTextVNode("Contra Settlement (مقاصة مالية)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Settle outstanding balances between " + toDisplayString(unref(suppliersStore).currentSupplier?.name) + " and " + toDisplayString(unref(linkedCustomer)?.name), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-3 text-sm" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "Supplier Balance:"),
                        createVNode("span", {
                          class: [unref(balance) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                        }, toDisplayString(Number(unref(balance)).toFixed(2)), 3)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "Customer Balance:"),
                        createVNode("span", {
                          class: [unref(linkedCustomerBalance) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                        }, toDisplayString(Number(unref(linkedCustomerBalance)).toFixed(2)), 3)
                      ]),
                      createVNode("div", { class: "flex justify-between border-t pt-2" }, [
                        createVNode("span", null, "Current Net:"),
                        createVNode("span", {
                          class: ["font-bold", unref(netBalance) > 0 ? "text-destructive" : unref(netBalance) < 0 ? "text-green-600" : ""]
                        }, toDisplayString(Number(unref(netBalance)).toFixed(2)), 3)
                      ])
                    ]),
                    createVNode("form", {
                      class: "space-y-4",
                      onSubmit: withModifiers(handleContraSettlement, ["prevent"])
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "contra-amount" }, {
                          default: withCtx(() => [
                            createTextVNode("Settlement Amount")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "contra-amount",
                          modelValue: unref(contraForm).amount,
                          "onUpdate:modelValue": ($event) => unref(contraForm).amount = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "0.00",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Leave empty to auto-calculate the minimum of both balances")
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showContraDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode("Execute Settlement")
                            ]),
                            _: 1
                          })
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Contra Settlement (مقاصة مالية)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Settle outstanding balances between " + toDisplayString(unref(suppliersStore).currentSupplier?.name) + " and " + toDisplayString(unref(linkedCustomer)?.name), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-3 text-sm" }, [
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", null, "Supplier Balance:"),
                      createVNode("span", {
                        class: [unref(balance) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                      }, toDisplayString(Number(unref(balance)).toFixed(2)), 3)
                    ]),
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", null, "Customer Balance:"),
                      createVNode("span", {
                        class: [unref(linkedCustomerBalance) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                      }, toDisplayString(Number(unref(linkedCustomerBalance)).toFixed(2)), 3)
                    ]),
                    createVNode("div", { class: "flex justify-between border-t pt-2" }, [
                      createVNode("span", null, "Current Net:"),
                      createVNode("span", {
                        class: ["font-bold", unref(netBalance) > 0 ? "text-destructive" : unref(netBalance) < 0 ? "text-green-600" : ""]
                      }, toDisplayString(Number(unref(netBalance)).toFixed(2)), 3)
                    ])
                  ]),
                  createVNode("form", {
                    class: "space-y-4",
                    onSubmit: withModifiers(handleContraSettlement, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "contra-amount" }, {
                        default: withCtx(() => [
                          createTextVNode("Settlement Amount")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "contra-amount",
                        modelValue: unref(contraForm).amount,
                        "onUpdate:modelValue": ($event) => unref(contraForm).amount = $event,
                        type: "number",
                        step: "0.01",
                        placeholder: "0.00",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Leave empty to auto-calculate the minimum of both balances")
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showContraDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, { type: "submit" }, {
                          default: withCtx(() => [
                            createTextVNode("Execute Settlement")
                          ]),
                          _: 1
                        })
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
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showPayDialog),
        "onUpdate:open": ($event) => showPayDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record Payment`);
                            } else {
                              return [
                                createTextVNode("Record Payment")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Pay towards invoice ${ssrInterpolate(unref(payingInvoice)?.invoiceNumber)}`);
                            } else {
                              return [
                                createTextVNode("Pay towards invoice " + toDisplayString(unref(payingInvoice)?.invoiceNumber), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Record Payment")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Pay towards invoice " + toDisplayString(unref(payingInvoice)?.invoiceNumber), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "pay-amount" }, {
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
                    id: "pay-amount",
                    modelValue: unref(payForm).amount,
                    "onUpdate:modelValue": ($event) => unref(payForm).amount = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "pay-desc" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Description`);
                      } else {
                        return [
                          createTextVNode("Description")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "pay-desc",
                    modelValue: unref(payForm).description,
                    "onUpdate:modelValue": ($event) => unref(payForm).description = $event,
                    placeholder: "Optional"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showPayDialog.value = false
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
                          disabled: ("usePurchasesStore" in _ctx ? _ctx.usePurchasesStore : unref(usePurchasesStore))().loading
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record Payment`);
                            } else {
                              return [
                                createTextVNode("Record Payment")
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
                            onClick: ($event) => showPayDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: ("usePurchasesStore" in _ctx ? _ctx.usePurchasesStore : unref(usePurchasesStore))().loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Record Payment")
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
                            createTextVNode("Record Payment")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Pay towards invoice " + toDisplayString(unref(payingInvoice)?.invoiceNumber), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4",
                      onSubmit: withModifiers(handlePay, ["prevent"])
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "pay-amount" }, {
                          default: withCtx(() => [
                            createTextVNode("Amount")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "pay-amount",
                          modelValue: unref(payForm).amount,
                          "onUpdate:modelValue": ($event) => unref(payForm).amount = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "0.00",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "pay-desc" }, {
                          default: withCtx(() => [
                            createTextVNode("Description")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "pay-desc",
                          modelValue: unref(payForm).description,
                          "onUpdate:modelValue": ($event) => unref(payForm).description = $event,
                          placeholder: "Optional"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showPayDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: ("usePurchasesStore" in _ctx ? _ctx.usePurchasesStore : unref(usePurchasesStore))().loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Record Payment")
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Record Payment")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Pay towards invoice " + toDisplayString(unref(payingInvoice)?.invoiceNumber), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4",
                    onSubmit: withModifiers(handlePay, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "pay-amount" }, {
                        default: withCtx(() => [
                          createTextVNode("Amount")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "pay-amount",
                        modelValue: unref(payForm).amount,
                        "onUpdate:modelValue": ($event) => unref(payForm).amount = $event,
                        type: "number",
                        step: "0.01",
                        placeholder: "0.00",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "pay-desc" }, {
                        default: withCtx(() => [
                          createTextVNode("Description")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "pay-desc",
                        modelValue: unref(payForm).description,
                        "onUpdate:modelValue": ($event) => unref(payForm).description = $event,
                        placeholder: "Optional"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showPayDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: ("usePurchasesStore" in _ctx ? _ctx.usePurchasesStore : unref(usePurchasesStore))().loading
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Record Payment")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/suppliers/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CApZ3-qk.mjs.map
