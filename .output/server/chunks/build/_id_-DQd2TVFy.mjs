import { _ as _sfc_main$2 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DZSn3naz.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$3, a as _sfc_main$4, d as _sfc_main$3$2 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$3$1, a as _sfc_main$1$2, b as _sfc_main$5, c as _sfc_main$2$1 } from './index-CsamvZIh.mjs';
import { _ as __nuxt_component_10 } from './AppTable-CgemzeWp.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$3, c as _sfc_main$1$3, d as _sfc_main$5$1, e as _sfc_main$4$1 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$7 } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$8 } from './Input-pgd-3rGf.mjs';
import { a as useRoute, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, reactive, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, isRef, openBlock, createBlock, createCommentVNode, withModifiers, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { ArrowLeft, Link, ArrowLeftRight, Phone, MapPin, FileText, Receipt, Wallet, ShoppingCart } from '@lucide/vue';
import { g as getLedgerColumns } from './column-1_OF2x1S.mjs';
import { toast } from 'vue-sonner';
import { u as useCustomersStore } from './store-DIa1t7OS.mjs';
import { u as useTabData } from './useTabData-BeQ82G7O.mjs';
import 'class-variance-authority';
import '@vueuse/core';
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
import './DropdownMenuTrigger-MlqyivDB.mjs';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
import './SelectValue-CdUm-rR7.mjs';
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
    const customersStore = useCustomersStore();
    const customer = computed(() => customersStore.currentCustomer);
    const linkedSupplier = computed(() => customer.value?.linkedSupplier ?? null);
    const linkedSupplierBalance = computed(() => linkedSupplier.value?.balance ?? 0);
    const netBalance = computed(() => customer.value?.netBalance ?? (customer.value?.balance ?? 0));
    const showContraDialog = ref(false);
    const contraForm = reactive({ amount: null });
    const activeTab = ref("invoices");
    const { data: invoices, loading: invoicesLoading, load: loadInvoices } = useTabData(async () => {
      const data = await $fetch("/api/invoices", { params: { customerId: route.params.id, limit: 100 } });
      return data.invoices || [];
    });
    const { data: ledgerRaw, loading: ledgerLoading, load: loadLedger } = useTabData(async () => {
      const [entriesData, summaryData] = await Promise.all([
        $fetch("/api/ledger", { params: { customerId: route.params.id, limit: 100 } }),
        $fetch("/api/ledger/summary", { params: { customerId: route.params.id } })
      ]);
      return { entries: entriesData.entries || [], summary: summaryData };
    });
    const { data: orders, loading: ordersLoading, load: loadOrders } = useTabData(async () => {
      const data = await $fetch("/api/sales", { params: { customerId: route.params.id, limit: 100 } });
      return data.orders || [];
    });
    const ledgerEntries = computed(() => ledgerRaw.value?.entries ?? []);
    const ledgerSummary = computed(() => ledgerRaw.value?.summary ?? null);
    watch(activeTab, (tab) => {
      if (tab === "invoices") loadInvoices();
      else if (tab === "ledger") loadLedger();
      else if (tab === "orders") loadOrders();
    });
    function statusVariant(s) {
      const map = { UNPAID: "destructive", PARTIAL: "default", PAID: "success", CANCELLED: "secondary" };
      return map[s] || "secondary";
    }
    const invoiceColumns = [
      {
        accessorKey: "invoiceNumber",
        header: "Invoice",
        cell: ({ row }) => h("span", { class: "font-medium" }, row.original.invoiceNumber)
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.createdAt).toLocaleDateString())
      },
      {
        accessorKey: "totalAmount",
        header: "Total",
        cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.totalAmount).toFixed(2))
      },
      {
        accessorKey: "paidAmount",
        header: "Paid",
        cell: ({ row }) => h("span", { class: "tabular-nums text-muted-foreground block" }, Number(row.original.paidAmount).toFixed(2))
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => h(_sfc_main$2, { variant: statusVariant(row.original.status), class: "text-[10px]" }, () => row.original.status)
      }
    ];
    const orderColumns = [
      {
        accessorKey: "orderNumber",
        header: "Order",
        cell: ({ row }) => h("span", { class: "font-medium" }, row.original.orderNumber)
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.createdAt).toLocaleDateString())
      },
      {
        accessorKey: "totalAmount",
        header: "Total",
        cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.totalAmount).toFixed(2))
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => h("span", { class: "text-sm" }, row.original.status)
      }
    ];
    async function handleContraSettlement() {
      if (!contraForm.amount && contraForm.amount !== 0) return;
      try {
        await $fetch("/api/accounting/reconcile-partner", {
          method: "POST",
          body: {
            supplierId: linkedSupplier.value.id,
            customerId: route.params.id,
            amount: contraForm.amount
          }
        });
        showContraDialog.value = false;
        contraForm.amount = null;
        toast.success("Contra settlement completed");
        await customersStore.fetchCustomer(route.params.id);
      } catch (e) {
        toast.error(e?.data?.statusMessage || "Settlement failed");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_PageHeader = PageHeader;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiTabs = _sfc_main$3$1;
      const _component_UiTabsList = _sfc_main$1$2;
      const _component_UiTabsTrigger = _sfc_main$5;
      const _component_UiTabsContent = _sfc_main$2$1;
      const _component_UiCardDescription = _sfc_main$3$2;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$3;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5$1;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiInput = _sfc_main$8;
      const _component_UiDialogFooter = _sfc_main$4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/customers")
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
      if (unref(customer)) {
        _push(ssrRenderComponent(_component_PageHeader, {
          title: unref(customer).name,
          description: "Customer details"
        }, {
          actions: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                class: (unref(customer).balance || 0) > 0 ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Balance: ${ssrInterpolate((unref(customer).balance || 0).toFixed(2))}`);
                  } else {
                    return [
                      createTextVNode(" Balance: " + toDisplayString((unref(customer).balance || 0).toFixed(2)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), {
                  class: (unref(customer).balance || 0) > 0 ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Balance: " + toDisplayString((unref(customer).balance || 0).toFixed(2)), 1)
                  ]),
                  _: 1
                }, 8, ["class"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(linkedSupplier)) {
        _push(`<div class="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 p-4"><div class="flex items-center justify-between flex-wrap gap-3"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(Link), { class: "size-4 text-blue-600" }, null, _parent));
        _push(`<span class="text-sm font-medium">Linked to Supplier: `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/suppliers/${unref(linkedSupplier).id}`,
          class: "text-blue-600 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(linkedSupplier).name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(linkedSupplier).name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</span></div><div class="flex items-center gap-4"><div class="text-right"><p class="text-xs text-muted-foreground">Customer Balance</p><p class="${ssrRenderClass([(unref(customer)?.balance ?? 0) > 0 ? "text-destructive" : "text-green-600", "text-sm font-medium tabular-nums"])}">${ssrInterpolate(Number(unref(customer)?.balance ?? 0).toFixed(2))}</p></div><div class="text-right"><p class="text-xs text-muted-foreground">Supplier Balance</p><p class="${ssrRenderClass([unref(linkedSupplierBalance) > 0 ? "text-destructive" : "text-green-600", "text-sm font-medium tabular-nums"])}">${ssrInterpolate(Number(unref(linkedSupplierBalance)).toFixed(2))}</p></div><div class="text-right border-l pl-4"><p class="text-xs text-muted-foreground">Net Balance</p><p class="${ssrRenderClass([unref(netBalance) > 0 ? "text-destructive" : unref(netBalance) < 0 ? "text-green-600" : "", "text-sm font-bold tabular-nums"])}">${ssrInterpolate(unref(netBalance) > 0 ? `مدين لنا بـ ${Number(unref(netBalance)).toFixed(2)}` : unref(netBalance) < 0 ? `نحن مدينون له بـ ${Number(Math.abs(unref(netBalance))).toFixed(2)}` : "صفر")}</p></div>`);
        _push(ssrRenderComponent(_component_UiButton, {
          size: "sm",
          variant: "outline",
          class: "border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400",
          onClick: ($event) => showContraDialog.value = true
        }, {
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
      if (unref(customer)) {
        _push(`<div class="grid gap-4 sm:grid-cols-3">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Phone`);
                        } else {
                          return [
                            createTextVNode("Phone")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Phone), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Phone")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Phone), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-lg font-medium"${_scopeId2}>${ssrInterpolate(unref(customer).phone || "—")}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-lg font-medium" }, toDisplayString(unref(customer).phone || "—"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Phone")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Phone), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-lg font-medium" }, toDisplayString(unref(customer).phone || "—"), 1)
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
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Address`);
                        } else {
                          return [
                            createTextVNode("Address")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(MapPin), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Address")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(MapPin), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-lg font-medium"${_scopeId2}>${ssrInterpolate(unref(customer).address || "—")}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-lg font-medium" }, toDisplayString(unref(customer).address || "—"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Address")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MapPin), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-lg font-medium" }, toDisplayString(unref(customer).address || "—"), 1)
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
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Orders / Invoices`);
                        } else {
                          return [
                            createTextVNode("Orders / Invoices")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(FileText), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Orders / Invoices")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(FileText), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-lg font-medium"${_scopeId2}>${ssrInterpolate(unref(customer)._count?.salesOrders || 0)} / ${ssrInterpolate(unref(customer)._count?.invoices || 0)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-lg font-medium" }, toDisplayString(unref(customer)._count?.salesOrders || 0) + " / " + toDisplayString(unref(customer)._count?.invoices || 0), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Orders / Invoices")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(FileText), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-lg font-medium" }, toDisplayString(unref(customer)._count?.salesOrders || 0) + " / " + toDisplayString(unref(customer)._count?.invoices || 0), 1)
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
                        _push4(` Invoices `);
                      } else {
                        return [
                          createVNode(unref(Receipt), { class: "size-4" }),
                          createTextVNode(" Invoices ")
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
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "orders" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ShoppingCart), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Orders `);
                      } else {
                        return [
                          createVNode(unref(ShoppingCart), { class: "size-4" }),
                          createTextVNode(" Orders ")
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
                        createTextVNode(" Invoices ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "ledger" }, {
                      default: withCtx(() => [
                        createVNode(unref(Wallet), { class: "size-4" }),
                        createTextVNode(" Ledger ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "orders" }, {
                      default: withCtx(() => [
                        createVNode(unref(ShoppingCart), { class: "size-4" }),
                        createTextVNode(" Orders ")
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
                        _push4(ssrRenderComponent(_component_UiCardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Invoices`);
                                  } else {
                                    return [
                                      createTextVNode("Invoices")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`All invoices for this customer`);
                                  } else {
                                    return [
                                      createTextVNode("All invoices for this customer")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Invoices")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("All invoices for this customer")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_AppTable, {
                                data: unref(invoices) || [],
                                columns: invoiceColumns,
                                loading: unref(invoicesLoading),
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": false
                              }, {
                                empty: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_EmptyState, {
                                      title: "No invoices",
                                      description: "No invoices have been created for this customer yet."
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_EmptyState, {
                                        title: "No invoices",
                                        description: "No invoices have been created for this customer yet."
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_AppTable, {
                                  data: unref(invoices) || [],
                                  columns: invoiceColumns,
                                  loading: unref(invoicesLoading),
                                  "show-search": false,
                                  "show-column-toggle": false,
                                  "show-pagination": false
                                }, {
                                  empty: withCtx(() => [
                                    createVNode(_component_EmptyState, {
                                      title: "No invoices",
                                      description: "No invoices have been created for this customer yet."
                                    })
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
                          createVNode(_component_UiCardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Invoices")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("All invoices for this customer")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_AppTable, {
                                data: unref(invoices) || [],
                                columns: invoiceColumns,
                                loading: unref(invoicesLoading),
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": false
                              }, {
                                empty: withCtx(() => [
                                  createVNode(_component_EmptyState, {
                                    title: "No invoices",
                                    description: "No invoices have been created for this customer yet."
                                  })
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
                        createVNode(_component_UiCardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Invoices")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("All invoices for this customer")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            createVNode(_component_AppTable, {
                              data: unref(invoices) || [],
                              columns: invoiceColumns,
                              loading: unref(invoicesLoading),
                              "show-search": false,
                              "show-column-toggle": false,
                              "show-pagination": false
                            }, {
                              empty: withCtx(() => [
                                createVNode(_component_EmptyState, {
                                  title: "No invoices",
                                  description: "No invoices have been created for this customer yet."
                                })
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
                        _push4(ssrRenderComponent(_component_UiCardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
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
                                    _push6(`Financial transactions history`);
                                  } else {
                                    return [
                                      createTextVNode("Financial transactions history")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Ledger Entries")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Financial transactions history")
                                  ]),
                                  _: 1
                                })
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
                                      description: "No ledger entries recorded"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_EmptyState, {
                                        title: "No transactions",
                                        description: "No ledger entries recorded"
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
                                      description: "No ledger entries recorded"
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
                          createVNode(_component_UiCardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Ledger Entries")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Financial transactions history")
                                ]),
                                _: 1
                              })
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
                                    description: "No ledger entries recorded"
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
                        createVNode(_component_UiCardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Ledger Entries")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Financial transactions history")
                              ]),
                              _: 1
                            })
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
                                  description: "No ledger entries recorded"
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
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "orders" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Orders`);
                                  } else {
                                    return [
                                      createTextVNode("Orders")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`All sales orders for this customer`);
                                  } else {
                                    return [
                                      createTextVNode("All sales orders for this customer")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Orders")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("All sales orders for this customer")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_AppTable, {
                                data: unref(orders) || [],
                                columns: orderColumns,
                                loading: unref(ordersLoading),
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": false
                              }, {
                                empty: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_EmptyState, {
                                      title: "No orders",
                                      description: "No sales orders have been created for this customer yet."
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_EmptyState, {
                                        title: "No orders",
                                        description: "No sales orders have been created for this customer yet."
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_AppTable, {
                                  data: unref(orders) || [],
                                  columns: orderColumns,
                                  loading: unref(ordersLoading),
                                  "show-search": false,
                                  "show-column-toggle": false,
                                  "show-pagination": false
                                }, {
                                  empty: withCtx(() => [
                                    createVNode(_component_EmptyState, {
                                      title: "No orders",
                                      description: "No sales orders have been created for this customer yet."
                                    })
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
                          createVNode(_component_UiCardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Orders")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("All sales orders for this customer")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_AppTable, {
                                data: unref(orders) || [],
                                columns: orderColumns,
                                loading: unref(ordersLoading),
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": false
                              }, {
                                empty: withCtx(() => [
                                  createVNode(_component_EmptyState, {
                                    title: "No orders",
                                    description: "No sales orders have been created for this customer yet."
                                  })
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
                        createVNode(_component_UiCardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Orders")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("All sales orders for this customer")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            createVNode(_component_AppTable, {
                              data: unref(orders) || [],
                              columns: orderColumns,
                              loading: unref(ordersLoading),
                              "show-search": false,
                              "show-column-toggle": false,
                              "show-pagination": false
                            }, {
                              empty: withCtx(() => [
                                createVNode(_component_EmptyState, {
                                  title: "No orders",
                                  description: "No sales orders have been created for this customer yet."
                                })
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
          } else {
            return [
              createVNode(_component_UiTabsList, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsTrigger, { value: "invoices" }, {
                    default: withCtx(() => [
                      createVNode(unref(Receipt), { class: "size-4" }),
                      createTextVNode(" Invoices ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "ledger" }, {
                    default: withCtx(() => [
                      createVNode(unref(Wallet), { class: "size-4" }),
                      createTextVNode(" Ledger ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "orders" }, {
                    default: withCtx(() => [
                      createVNode(unref(ShoppingCart), { class: "size-4" }),
                      createTextVNode(" Orders ")
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
                      createVNode(_component_UiCardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Invoices")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("All invoices for this customer")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_AppTable, {
                            data: unref(invoices) || [],
                            columns: invoiceColumns,
                            loading: unref(invoicesLoading),
                            "show-search": false,
                            "show-column-toggle": false,
                            "show-pagination": false
                          }, {
                            empty: withCtx(() => [
                              createVNode(_component_EmptyState, {
                                title: "No invoices",
                                description: "No invoices have been created for this customer yet."
                              })
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
                      createVNode(_component_UiCardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Ledger Entries")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Financial transactions history")
                            ]),
                            _: 1
                          })
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
                                description: "No ledger entries recorded"
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
              }),
              createVNode(_component_UiTabsContent, { value: "orders" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Orders")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("All sales orders for this customer")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_AppTable, {
                            data: unref(orders) || [],
                            columns: orderColumns,
                            loading: unref(ordersLoading),
                            "show-search": false,
                            "show-column-toggle": false,
                            "show-pagination": false
                          }, {
                            empty: withCtx(() => [
                              createVNode(_component_EmptyState, {
                                title: "No orders",
                                description: "No sales orders have been created for this customer yet."
                              })
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
                              _push5(`Settle outstanding balances between ${ssrInterpolate(unref(customer)?.name)} and ${ssrInterpolate(unref(linkedSupplier)?.name)}`);
                            } else {
                              return [
                                createTextVNode("Settle outstanding balances between " + toDisplayString(unref(customer)?.name) + " and " + toDisplayString(unref(linkedSupplier)?.name), 1)
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
                              createTextVNode("Settle outstanding balances between " + toDisplayString(unref(customer)?.name) + " and " + toDisplayString(unref(linkedSupplier)?.name), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Customer Balance:</span><span class="${ssrRenderClass([(unref(customer)?.balance ?? 0) > 0 ? "text-destructive" : "text-green-600", "font-medium"])}"${_scopeId2}>${ssrInterpolate(Number(unref(customer)?.balance ?? 0).toFixed(2))}</span></div><div class="flex justify-between"${_scopeId2}><span${_scopeId2}>Supplier Balance:</span><span class="${ssrRenderClass([unref(linkedSupplierBalance) > 0 ? "text-destructive" : "text-green-600", "font-medium"])}"${_scopeId2}>${ssrInterpolate(Number(unref(linkedSupplierBalance)).toFixed(2))}</span></div><div class="flex justify-between border-t pt-2"${_scopeId2}><span${_scopeId2}>Current Net:</span><span class="${ssrRenderClass([unref(netBalance) > 0 ? "text-destructive" : unref(netBalance) < 0 ? "text-green-600" : "", "font-bold"])}"${_scopeId2}>${ssrInterpolate(Number(unref(netBalance)).toFixed(2))}</span></div></div><form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
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
                            createTextVNode("Settle outstanding balances between " + toDisplayString(unref(customer)?.name) + " and " + toDisplayString(unref(linkedSupplier)?.name), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-3 text-sm" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "Customer Balance:"),
                        createVNode("span", {
                          class: [(unref(customer)?.balance ?? 0) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                        }, toDisplayString(Number(unref(customer)?.balance ?? 0).toFixed(2)), 3)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "Supplier Balance:"),
                        createVNode("span", {
                          class: [unref(linkedSupplierBalance) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                        }, toDisplayString(Number(unref(linkedSupplierBalance)).toFixed(2)), 3)
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
                          createTextVNode("Settle outstanding balances between " + toDisplayString(unref(customer)?.name) + " and " + toDisplayString(unref(linkedSupplier)?.name), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-3 text-sm" }, [
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", null, "Customer Balance:"),
                      createVNode("span", {
                        class: [(unref(customer)?.balance ?? 0) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                      }, toDisplayString(Number(unref(customer)?.balance ?? 0).toFixed(2)), 3)
                    ]),
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", null, "Supplier Balance:"),
                      createVNode("span", {
                        class: [unref(linkedSupplierBalance) > 0 ? "text-destructive" : "text-green-600", "font-medium"]
                      }, toDisplayString(Number(unref(linkedSupplierBalance)).toFixed(2)), 3)
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/customers/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DQd2TVFy.mjs.map
