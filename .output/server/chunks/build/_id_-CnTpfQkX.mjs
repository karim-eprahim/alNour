import { _ as _sfc_main$1 } from './index-CUpQupPt.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CAjNCayq.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, a as _sfc_main$4, d as _sfc_main$3$1 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as _sfc_main$3, a as _sfc_main$1$2, b as _sfc_main$5, c as _sfc_main$2$1 } from './index-CZsKtjZ8.mjs';
import { _ as __nuxt_component_10 } from './AppTable-29woUsdf.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$3, d as _sfc_main$5$1, e as _sfc_main$4$1 } from './DialogTrigger-C62yxjGQ.mjs';
import { _ as _sfc_main$7 } from './Label-C-S6OHzh.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$4, b as _sfc_main$8, c as _sfc_main$9$1, d as _sfc_main$7$1 } from './SelectValue-CvBB3u-2.mjs';
import { _ as _sfc_main$b } from './Input-BT7sGQjY.mjs';
import { a as useRoute, c as usePermissions, n as navigateTo } from './server.mjs';
import { u as usePurchasesStore } from './store-B0h3miBc.mjs';
import { defineComponent, computed, ref, reactive, watch, resolveDirective, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, isRef, withDirectives, openBlock, createBlock, createCommentVNode, withModifiers, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrGetDirectiveProps } from 'vue/server-renderer';
import { ArrowLeft, Building2, Link, ArrowLeftRight, Phone, Mail, MapPin, Receipt, Wallet, FileText, CreditCard } from '@lucide/vue';
import { g as getLedgerColumns } from './column-Cok7n7JV.mjs';
import { toast } from 'vue-sonner';
import { u as useSuppliersStore } from './store-C8FOXexX.mjs';
import { u as useTabData } from './useTabData-BeQ82G7O.mjs';
import 'class-variance-authority';
import 'reka-ui';
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
import '@vueuse/core';
import './DropdownMenuTrigger-CfTxy9kg.mjs';
import './Checkbox-BgWIODM0.mjs';
import './TableHeader-BnIov8Zr.mjs';
import './LoadingState-CjZdJj9x.mjs';
import '@tanstack/vue-table';
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
    const supplier = computed(() => suppliersStore.currentSupplier);
    const linkedCustomer = computed(() => supplier.value?.linkedCustomer ?? null);
    const linkedCustomerBalance = computed(() => linkedCustomer.value?.balance ?? 0);
    const netBalance = computed(() => supplier.value?.netBalance ?? 0);
    const activeTab = ref("invoices");
    const showLedgerDialog = ref(false);
    const showPayDialog = ref(false);
    const showContraDialog = ref(false);
    const payingInvoice = ref(null);
    const ledgerForm = reactive({ amount: null, type: "DEBIT", description: "" });
    const payForm = reactive({ amount: null, description: "" });
    const contraForm = reactive({ amount: null });
    const { data: purchaseInvoices, loading: purchasesLoading, load: loadPurchases } = useTabData(async () => {
      const data = await $fetch("/api/purchases", { params: { supplierId: supplierId.value, limit: 100 } });
      return data.invoices || [];
    });
    const { data: ledgerRaw, loading: ledgerLoading, load: loadLedger } = useTabData(async () => {
      const [entriesData, summaryData] = await Promise.all([
        $fetch("/api/ledger", { params: { supplierId: supplierId.value, limit: 100 } }),
        $fetch("/api/ledger/summary", { params: { supplierId: supplierId.value } })
      ]);
      return { entries: entriesData.entries || [], summary: summaryData };
    });
    const ledgerEntries = computed(() => ledgerRaw.value?.entries ?? []);
    const ledgerSummary = computed(() => ledgerRaw.value?.summary ?? null);
    watch(activeTab, (tab) => {
      if (tab === "invoices") loadPurchases();
      else if (tab === "ledger") loadLedger();
    });
    const purchaseInvoiceColumns = [
      {
        accessorKey: "invoiceNumber",
        header: "Invoice #",
        cell: ({ row }) => h("span", { class: "font-mono font-medium" }, row.original.invoiceNumber)
      },
      {
        accessorKey: "invoiceDate",
        header: "Date",
        cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.invoiceDate).toLocaleDateString())
      },
      {
        accessorKey: "warehouse",
        header: "Warehouse",
        cell: ({ row }) => h("span", { class: "text-sm" }, row.original.warehouse?.name || "—")
      },
      {
        accessorKey: "totalAmount",
        header: "Amount",
        cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.totalAmount).toFixed(2))
      },
      {
        accessorKey: "paidAmount",
        header: "Paid",
        cell: ({ row }) => h("span", { class: "tabular-nums font-medium text-green-600 block" }, Number(row.original.paidAmount).toFixed(2))
      },
      {
        id: "due",
        header: "Due",
        cell: ({ row }) => {
          const due = Number(row.original.totalAmount) - Number(row.original.paidAmount);
          return h("span", { class: `tabular-nums font-medium block ${due > 0 ? "text-destructive" : ""}` }, due.toFixed(2));
        }
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const due = Number(row.original.totalAmount) - Number(row.original.paidAmount);
          if (due <= 0 || !can("SUPPLIERS", "UPDATE")) return null;
          return h("div", { class: "text-right" }, [
            h("button", {
              class: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 text-green-600",
              onClick: () => openPay(row.original)
            }, [h(CreditCard, { class: "size-3.5" })])
          ]);
        }
      }
    ];
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
        await suppliersStore.fetchSupplier(supplierId.value);
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
        loadLedger();
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
        await suppliersStore.fetchSupplier(supplierId.value);
        loadPurchases();
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
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$2;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5$1;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$4;
      const _component_UiSelectValue = _sfc_main$8;
      const _component_UiSelectContent = _sfc_main$9$1;
      const _component_UiSelectItem = _sfc_main$7$1;
      const _component_UiInput = _sfc_main$b;
      const _component_UiDialogFooter = _sfc_main$4$1;
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
      _push(`</div><div><h1 class="text-lg font-semibold">${ssrInterpolate(unref(supplier)?.name || "Loading...")}</h1>`);
      if (unref(supplier)?.company) {
        _push(`<p class="text-xs text-muted-foreground">${ssrInterpolate(unref(supplier).company)}</p>`);
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
        _push(`</span></div><div class="flex items-center gap-4"><div class="text-right"><p class="text-xs text-muted-foreground">Supplier Balance</p><p class="${ssrRenderClass([(unref(supplier)?.balance ?? 0) > 0 ? "text-destructive" : "text-green-600", "text-sm font-medium tabular-nums"])}">${ssrInterpolate(Number(unref(supplier)?.balance ?? 0).toFixed(2))}</p></div><div class="text-right"><p class="text-xs text-muted-foreground">Customer Balance</p><p class="${ssrRenderClass([unref(linkedCustomerBalance) > 0 ? "text-destructive" : "text-green-600", "text-sm font-medium tabular-nums"])}">${ssrInterpolate(Number(unref(linkedCustomerBalance)).toFixed(2))}</p></div><div class="text-right border-l pl-4"><p class="text-xs text-muted-foreground">Net Balance</p><p class="${ssrRenderClass([unref(netBalance) > 0 ? "text-destructive" : unref(netBalance) < 0 ? "text-green-600" : "", "text-sm font-bold tabular-nums"])}">${ssrInterpolate(unref(netBalance) > 0 ? `نحن ندين له بـ ${Number(unref(netBalance)).toFixed(2)}` : unref(netBalance) < 0 ? `هو مدين لنا بـ ${Number(Math.abs(unref(netBalance))).toFixed(2)}` : "صفر")}</p></div>`);
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
                  _push3(`<p class="${ssrRenderClass([(unref(supplier)?.balance ?? 0) > 0 ? "text-destructive" : (unref(supplier)?.balance ?? 0) < 0 ? "text-green-600" : "", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate(Number(unref(supplier)?.balance ?? 0).toFixed(2))}</p>`);
                } else {
                  return [
                    createVNode("p", {
                      class: ["text-2xl font-bold", (unref(supplier)?.balance ?? 0) > 0 ? "text-destructive" : (unref(supplier)?.balance ?? 0) < 0 ? "text-green-600" : ""]
                    }, toDisplayString(Number(unref(supplier)?.balance ?? 0).toFixed(2)), 3)
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
                    class: ["text-2xl font-bold", (unref(supplier)?.balance ?? 0) > 0 ? "text-destructive" : (unref(supplier)?.balance ?? 0) < 0 ? "text-green-600" : ""]
                  }, toDisplayString(Number(unref(supplier)?.balance ?? 0).toFixed(2)), 3)
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(supplier)?._count?.purchaseInvoices ?? 0)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(supplier)?._count?.purchaseInvoices ?? 0), 1)
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
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(supplier)?._count?.purchaseInvoices ?? 0), 1)
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(Number(unref(supplier)?.totalPurchases ?? 0).toFixed(2))}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(supplier)?.totalPurchases ?? 0).toFixed(2)), 1)
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
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(supplier)?.totalPurchases ?? 0).toFixed(2)), 1)
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
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(Number(unref(supplier)?.totalPaid ?? 0).toFixed(2))}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(supplier)?.totalPaid ?? 0).toFixed(2)), 1)
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
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(supplier)?.totalPaid ?? 0).toFixed(2)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(supplier)) {
        _push(`<div class="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">`);
        if (unref(supplier).phone) {
          _push(`<span class="flex items-center gap-1">`);
          _push(ssrRenderComponent(unref(Phone), { class: "size-3.5" }, null, _parent));
          _push(` ${ssrInterpolate(unref(supplier).phone)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(supplier).email) {
          _push(`<span class="flex items-center gap-1">`);
          _push(ssrRenderComponent(unref(Mail), { class: "size-3.5" }, null, _parent));
          _push(` ${ssrInterpolate(unref(supplier).email)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(supplier).address) {
          _push(`<span class="flex items-center gap-1">`);
          _push(ssrRenderComponent(unref(MapPin), { class: "size-3.5" }, null, _parent));
          _push(` ${ssrInterpolate(unref(supplier).address)}</span>`);
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
                        _push4(ssrRenderComponent(unref(Receipt), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Purchase Invoices `);
                      } else {
                        return [
                          createVNode(unref(Receipt), { class: "size-4" }),
                          createTextVNode(" Purchase Invoices ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "ledger" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Wallet), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Ledger `);
                      } else {
                        return [
                          createVNode(unref(Wallet), { class: "size-4" }),
                          createTextVNode(" Ledger ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsTrigger, { value: "invoices" }, {
                      default: withCtx(() => [
                        createVNode(unref(Receipt), { class: "size-4" }),
                        createTextVNode(" Purchase Invoices ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "ledger" }, {
                      default: withCtx(() => [
                        createVNode(unref(Wallet), { class: "size-4" }),
                        createTextVNode(" Ledger ")
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
                              _push5(ssrRenderComponent(_component_AppTable, {
                                data: unref(purchaseInvoices) || [],
                                columns: purchaseInvoiceColumns,
                                loading: unref(purchasesLoading),
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": false
                              }, {
                                empty: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_EmptyState, {
                                      title: "No invoices",
                                      description: "No purchase invoices recorded for this supplier yet",
                                      action: "New Invoice",
                                      onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_EmptyState, {
                                        title: "No invoices",
                                        description: "No purchase invoices recorded for this supplier yet",
                                        action: "New Invoice",
                                        onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                                      }, null, 8, ["onAction"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_AppTable, {
                                  data: unref(purchaseInvoices) || [],
                                  columns: purchaseInvoiceColumns,
                                  loading: unref(purchasesLoading),
                                  "show-search": false,
                                  "show-column-toggle": false,
                                  "show-pagination": false
                                }, {
                                  empty: withCtx(() => [
                                    createVNode(_component_EmptyState, {
                                      title: "No invoices",
                                      description: "No purchase invoices recorded for this supplier yet",
                                      action: "New Invoice",
                                      onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                                    }, null, 8, ["onAction"])
                                  ]),
                                  _: 1
                                }, 8, ["data", "loading"])
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
                              createVNode(_component_AppTable, {
                                data: unref(purchaseInvoices) || [],
                                columns: purchaseInvoiceColumns,
                                loading: unref(purchasesLoading),
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": false
                              }, {
                                empty: withCtx(() => [
                                  createVNode(_component_EmptyState, {
                                    title: "No invoices",
                                    description: "No purchase invoices recorded for this supplier yet",
                                    action: "New Invoice",
                                    onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                                  }, null, 8, ["onAction"])
                                ]),
                                _: 1
                              }, 8, ["data", "loading"])
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
                            createVNode(_component_AppTable, {
                              data: unref(purchaseInvoices) || [],
                              columns: purchaseInvoiceColumns,
                              loading: unref(purchasesLoading),
                              "show-search": false,
                              "show-column-toggle": false,
                              "show-pagination": false
                            }, {
                              empty: withCtx(() => [
                                createVNode(_component_EmptyState, {
                                  title: "No invoices",
                                  description: "No purchase invoices recorded for this supplier yet",
                                  action: "New Invoice",
                                  onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                                }, null, 8, ["onAction"])
                              ]),
                              _: 1
                            }, 8, ["data", "loading"])
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
                  if (unref(ledgerSummary)) {
                    _push3(`<div class="grid grid-cols-3 gap-3 mb-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiCard, { size: "sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Wallet), { class: "size-4 text-red-500" }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="min-w-0"${_scopeId4}><p class="text-xs text-muted-foreground truncate"${_scopeId4}>Total Debit</p><p class="text-sm font-semibold tabular-nums text-destructive"${_scopeId4}>${ssrInterpolate(unref(ledgerSummary).totalDebit.toFixed(2))}</p></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10" }, [
                                    createVNode(unref(Wallet), { class: "size-4 text-red-500" })
                                  ]),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Debit"),
                                    createVNode("p", { class: "text-sm font-semibold tabular-nums text-destructive" }, toDisplayString(unref(ledgerSummary).totalDebit.toFixed(2)), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10" }, [
                                  createVNode(unref(Wallet), { class: "size-4 text-red-500" })
                                ]),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Debit"),
                                  createVNode("p", { class: "text-sm font-semibold tabular-nums text-destructive" }, toDisplayString(unref(ledgerSummary).totalDebit.toFixed(2)), 1)
                                ])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCard, { size: "sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Wallet), { class: "size-4 text-green-500" }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="min-w-0"${_scopeId4}><p class="text-xs text-muted-foreground truncate"${_scopeId4}>Total Credit</p><p class="text-sm font-semibold tabular-nums text-green-600"${_scopeId4}>${ssrInterpolate(unref(ledgerSummary).totalCredit.toFixed(2))}</p></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10" }, [
                                    createVNode(unref(Wallet), { class: "size-4 text-green-500" })
                                  ]),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Credit"),
                                    createVNode("p", { class: "text-sm font-semibold tabular-nums text-green-600" }, toDisplayString(unref(ledgerSummary).totalCredit.toFixed(2)), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10" }, [
                                  createVNode(unref(Wallet), { class: "size-4 text-green-500" })
                                ]),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Credit"),
                                  createVNode("p", { class: "text-sm font-semibold tabular-nums text-green-600" }, toDisplayString(unref(ledgerSummary).totalCredit.toFixed(2)), 1)
                                ])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCard, { size: "sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="${ssrRenderClass([unref(ledgerSummary).balance > 0 ? "bg-orange-500/10" : "bg-emerald-500/10", "flex size-9 shrink-0 items-center justify-center rounded-lg"])}"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Wallet), {
                                  class: ["size-4", unref(ledgerSummary).balance > 0 ? "text-orange-500" : "text-emerald-500"]
                                }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="min-w-0"${_scopeId4}><p class="text-xs text-muted-foreground truncate"${_scopeId4}>Balance</p><p class="${ssrRenderClass([unref(ledgerSummary).balance > 0 ? "text-destructive" : "text-green-600", "text-sm font-semibold tabular-nums"])}"${_scopeId4}>${ssrInterpolate(unref(ledgerSummary).balance.toFixed(2))}</p></div>`);
                              } else {
                                return [
                                  createVNode("div", {
                                    class: ["flex size-9 shrink-0 items-center justify-center rounded-lg", unref(ledgerSummary).balance > 0 ? "bg-orange-500/10" : "bg-emerald-500/10"]
                                  }, [
                                    createVNode(unref(Wallet), {
                                      class: ["size-4", unref(ledgerSummary).balance > 0 ? "text-orange-500" : "text-emerald-500"]
                                    }, null, 8, ["class"])
                                  ], 2),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Balance"),
                                    createVNode("p", {
                                      class: ["text-sm font-semibold tabular-nums", unref(ledgerSummary).balance > 0 ? "text-destructive" : "text-green-600"]
                                    }, toDisplayString(unref(ledgerSummary).balance.toFixed(2)), 3)
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                              default: withCtx(() => [
                                createVNode("div", {
                                  class: ["flex size-9 shrink-0 items-center justify-center rounded-lg", unref(ledgerSummary).balance > 0 ? "bg-orange-500/10" : "bg-emerald-500/10"]
                                }, [
                                  createVNode(unref(Wallet), {
                                    class: ["size-4", unref(ledgerSummary).balance > 0 ? "text-orange-500" : "text-emerald-500"]
                                  }, null, 8, ["class"])
                                ], 2),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Balance"),
                                  createVNode("p", {
                                    class: ["text-sm font-semibold tabular-nums", unref(ledgerSummary).balance > 0 ? "text-destructive" : "text-green-600"]
                                  }, toDisplayString(unref(ledgerSummary).balance.toFixed(2)), 3)
                                ])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
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
                              _push5(ssrRenderComponent(_component_AppTable, {
                                data: unref(ledgerEntries),
                                columns: unref(getLedgerColumns)(),
                                loading: unref(ledgerLoading),
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": false
                              }, {
                                empty: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_EmptyState, {
                                      title: "No transactions",
                                      description: "Financial transactions will appear here"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_EmptyState, {
                                        title: "No transactions",
                                        description: "Financial transactions will appear here"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_AppTable, {
                                  data: unref(ledgerEntries),
                                  columns: unref(getLedgerColumns)(),
                                  loading: unref(ledgerLoading),
                                  "show-search": false,
                                  "show-column-toggle": false,
                                  "show-pagination": false
                                }, {
                                  empty: withCtx(() => [
                                    createVNode(_component_EmptyState, {
                                      title: "No transactions",
                                      description: "Financial transactions will appear here"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["data", "columns", "loading"])
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
                              createVNode(_component_AppTable, {
                                data: unref(ledgerEntries),
                                columns: unref(getLedgerColumns)(),
                                loading: unref(ledgerLoading),
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": false
                              }, {
                                empty: withCtx(() => [
                                  createVNode(_component_EmptyState, {
                                    title: "No transactions",
                                    description: "Financial transactions will appear here"
                                  })
                                ]),
                                _: 1
                              }, 8, ["data", "columns", "loading"])
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
                    unref(ledgerSummary) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid grid-cols-3 gap-3 mb-4"
                    }, [
                      createVNode(_component_UiCard, { size: "sm" }, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10" }, [
                                createVNode(unref(Wallet), { class: "size-4 text-red-500" })
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Debit"),
                                createVNode("p", { class: "text-sm font-semibold tabular-nums text-destructive" }, toDisplayString(unref(ledgerSummary).totalDebit.toFixed(2)), 1)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCard, { size: "sm" }, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10" }, [
                                createVNode(unref(Wallet), { class: "size-4 text-green-500" })
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Credit"),
                                createVNode("p", { class: "text-sm font-semibold tabular-nums text-green-600" }, toDisplayString(unref(ledgerSummary).totalCredit.toFixed(2)), 1)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCard, { size: "sm" }, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx(() => [
                              createVNode("div", {
                                class: ["flex size-9 shrink-0 items-center justify-center rounded-lg", unref(ledgerSummary).balance > 0 ? "bg-orange-500/10" : "bg-emerald-500/10"]
                              }, [
                                createVNode(unref(Wallet), {
                                  class: ["size-4", unref(ledgerSummary).balance > 0 ? "text-orange-500" : "text-emerald-500"]
                                }, null, 8, ["class"])
                              ], 2),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Balance"),
                                createVNode("p", {
                                  class: ["text-sm font-semibold tabular-nums", unref(ledgerSummary).balance > 0 ? "text-destructive" : "text-green-600"]
                                }, toDisplayString(unref(ledgerSummary).balance.toFixed(2)), 3)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
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
                            createVNode(_component_AppTable, {
                              data: unref(ledgerEntries),
                              columns: unref(getLedgerColumns)(),
                              loading: unref(ledgerLoading),
                              "show-search": false,
                              "show-column-toggle": false,
                              "show-pagination": false
                            }, {
                              empty: withCtx(() => [
                                createVNode(_component_EmptyState, {
                                  title: "No transactions",
                                  description: "Financial transactions will appear here"
                                })
                              ]),
                              _: 1
                            }, 8, ["data", "columns", "loading"])
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
          } else {
            return [
              createVNode(_component_UiTabsList, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsTrigger, { value: "invoices" }, {
                    default: withCtx(() => [
                      createVNode(unref(Receipt), { class: "size-4" }),
                      createTextVNode(" Purchase Invoices ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "ledger" }, {
                    default: withCtx(() => [
                      createVNode(unref(Wallet), { class: "size-4" }),
                      createTextVNode(" Ledger ")
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
                          createVNode(_component_AppTable, {
                            data: unref(purchaseInvoices) || [],
                            columns: purchaseInvoiceColumns,
                            loading: unref(purchasesLoading),
                            "show-search": false,
                            "show-column-toggle": false,
                            "show-pagination": false
                          }, {
                            empty: withCtx(() => [
                              createVNode(_component_EmptyState, {
                                title: "No invoices",
                                description: "No purchase invoices recorded for this supplier yet",
                                action: "New Invoice",
                                onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases/new")
                              }, null, 8, ["onAction"])
                            ]),
                            _: 1
                          }, 8, ["data", "loading"])
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
                  unref(ledgerSummary) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-3 gap-3 mb-4"
                  }, [
                    createVNode(_component_UiCard, { size: "sm" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10" }, [
                              createVNode(unref(Wallet), { class: "size-4 text-red-500" })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Debit"),
                              createVNode("p", { class: "text-sm font-semibold tabular-nums text-destructive" }, toDisplayString(unref(ledgerSummary).totalDebit.toFixed(2)), 1)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCard, { size: "sm" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10" }, [
                              createVNode(unref(Wallet), { class: "size-4 text-green-500" })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Credit"),
                              createVNode("p", { class: "text-sm font-semibold tabular-nums text-green-600" }, toDisplayString(unref(ledgerSummary).totalCredit.toFixed(2)), 1)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCard, { size: "sm" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardContent, { class: "flex items-center gap-3 p-3" }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              class: ["flex size-9 shrink-0 items-center justify-center rounded-lg", unref(ledgerSummary).balance > 0 ? "bg-orange-500/10" : "bg-emerald-500/10"]
                            }, [
                              createVNode(unref(Wallet), {
                                class: ["size-4", unref(ledgerSummary).balance > 0 ? "text-orange-500" : "text-emerald-500"]
                              }, null, 8, ["class"])
                            ], 2),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Balance"),
                              createVNode("p", {
                                class: ["text-sm font-semibold tabular-nums", unref(ledgerSummary).balance > 0 ? "text-destructive" : "text-green-600"]
                              }, toDisplayString(unref(ledgerSummary).balance.toFixed(2)), 3)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true),
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
                          createVNode(_component_AppTable, {
                            data: unref(ledgerEntries),
                            columns: unref(getLedgerColumns)(),
                            loading: unref(ledgerLoading),
                            "show-search": false,
                            "show-column-toggle": false,
                            "show-pagination": false
                          }, {
                            empty: withCtx(() => [
                              createVNode(_component_EmptyState, {
                                title: "No transactions",
                                description: "Financial transactions will appear here"
                              })
                            ]),
                            _: 1
                          }, 8, ["data", "columns", "loading"])
                        ]),
                        _: 1
                      })
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
                              _push5(`Settle outstanding balances between ${ssrInterpolate(unref(supplier)?.name)} and ${ssrInterpolate(unref(linkedCustomer)?.name)}`);
                            } else {
                              return [
                                createTextVNode("Settle outstanding balances between " + toDisplayString(unref(supplier)?.name) + " and " + toDisplayString(unref(linkedCustomer)?.name), 1)
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
                              createTextVNode("Settle outstanding balances between " + toDisplayString(unref(supplier)?.name) + " and " + toDisplayString(unref(linkedCustomer)?.name), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Supplier Balance:</span><span class="${ssrRenderClass([(unref(supplier)?.balance ?? 0) > 0 ? "text-destructive" : "text-green-600", "font-medium"])}"${_scopeId2}>${ssrInterpolate(Number(unref(supplier)?.balance ?? 0).toFixed(2))}</span></div><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Customer Balance:</span><span class="${ssrRenderClass([unref(linkedCustomerBalance) > 0 ? "text-destructive" : "text-green-600", "font-medium"])}"${_scopeId2}>${ssrInterpolate(Number(unref(linkedCustomerBalance)).toFixed(2))}</span></div><div class="flex justify-between border-t pt-2"${_scopeId2}><span${_scopeId2}>Current Net:</span><span class="${ssrRenderClass([unref(netBalance) > 0 ? "text-destructive" : unref(netBalance) < 0 ? "text-green-600" : "", "font-bold"])}"${_scopeId2}>${ssrInterpolate(Number(unref(netBalance)).toFixed(2))}</span></div></div><form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
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
                            createTextVNode("Settle outstanding balances between " + toDisplayString(unref(supplier)?.name) + " and " + toDisplayString(unref(linkedCustomer)?.name), 1)
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
                          class: [(unref(supplier)?.balance ?? 0) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                        }, toDisplayString(Number(unref(supplier)?.balance ?? 0).toFixed(2)), 3)
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
                          createTextVNode("Settle outstanding balances between " + toDisplayString(unref(supplier)?.name) + " and " + toDisplayString(unref(linkedCustomer)?.name), 1)
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
                        class: [(unref(supplier)?.balance ?? 0) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                      }, toDisplayString(Number(unref(supplier)?.balance ?? 0).toFixed(2)), 3)
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
//# sourceMappingURL=_id_-CnTpfQkX.mjs.map
