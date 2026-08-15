import { _ as __nuxt_component_0 } from './nuxt-link-DZSn3naz.mjs';
import { _ as _sfc_main$2 } from './index-CaQj38bB.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { _ as _sfc_main$3$1, a as _sfc_main$1$2, b as _sfc_main$5, c as _sfc_main$2$1 } from './index-CsamvZIh.mjs';
import { _ as __nuxt_component_10 } from './AppTable-CgemzeWp.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { a as useRoute, n as navigateTo } from './server.mjs';
import { f as fetchProductsLookupApi } from './api-Dq8IcxCC.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { defineComponent, computed, ref, reactive, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, withModifiers, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { ArrowLeft, Mail, Phone, MapPin, Package, Truck, RotateCcw, ShoppingCart, Boxes, DollarSign, Wallet, Activity, Loader2 } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { g as getLedgerColumns } from './column-1_OF2x1S.mjs';
import { u as useDistributorStore } from './store-DAWlzSoP.mjs';
import { defineStore } from 'pinia';
import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$3, a as _sfc_main$4, d as _sfc_main$3$2 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$3, c as _sfc_main$1$3, d as _sfc_main$5$1, e as _sfc_main$4$1 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$8 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$7 } from './Label-Di1i-yIq.mjs';
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
import 'class-variance-authority';
import '@vueuse/core';
import 'reka-ui';
import './DropdownMenuTrigger-MlqyivDB.mjs';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
import './SelectValue-CdUm-rR7.mjs';
import '@tanstack/vue-table';
import './Textarea-B_fNd96X.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';

async function fetchLedgerEntriesApi(params) {
  return $fetch("/api/ledger", { params });
}
async function fetchLedgerEntryApi(id) {
  return $fetch(`/api/ledger/${id}`);
}
async function createLedgerEntryApi(payload) {
  return $fetch("/api/ledger", { method: "POST", body: payload });
}
async function updateLedgerEntryApi(id, payload) {
  return $fetch(`/api/ledger/${id}`, { method: "PATCH", body: payload });
}
async function deleteLedgerEntryApi(id) {
  await $fetch(`/api/ledger/${id}`, { method: "DELETE" });
}
async function fetchLedgerSummaryApi(params) {
  return $fetch("/api/ledger/summary", { params });
}
const useLedgerStore = defineStore("ledger", () => {
  const entries = ref([]);
  const currentEntry = ref(null);
  const loading = ref(false);
  const total = ref(0);
  const summary = ref(null);
  async function fetchEntries(params) {
    loading.value = true;
    try {
      const data = await fetchLedgerEntriesApi(params);
      entries.value = data.entries;
      total.value = data.total;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function fetchEntry(id) {
    loading.value = true;
    try {
      const data = await fetchLedgerEntryApi(id);
      currentEntry.value = data.entry;
      return data.entry;
    } finally {
      loading.value = false;
    }
  }
  async function createEntry(payload) {
    loading.value = true;
    try {
      const data = await createLedgerEntryApi(payload);
      entries.value.unshift(data.entry);
      return data.entry;
    } finally {
      loading.value = false;
    }
  }
  async function updateEntry(id, payload) {
    loading.value = true;
    try {
      const data = await updateLedgerEntryApi(id, payload);
      const idx = entries.value.findIndex((e) => e.id === id);
      if (idx !== -1) entries.value[idx] = data.entry;
      if (currentEntry.value?.id === id) currentEntry.value = data.entry;
      return data.entry;
    } finally {
      loading.value = false;
    }
  }
  async function deleteEntry(id) {
    loading.value = true;
    try {
      await deleteLedgerEntryApi(id);
      entries.value = entries.value.filter((e) => e.id !== id);
      if (currentEntry.value?.id === id) currentEntry.value = null;
    } finally {
      loading.value = false;
    }
  }
  async function fetchSummary(params) {
    try {
      const data = await fetchLedgerSummaryApi(params);
      summary.value = data;
      return data;
    } catch {
      summary.value = null;
    }
  }
  function clearCurrent() {
    currentEntry.value = null;
  }
  return {
    entries,
    currentEntry,
    loading,
    total,
    summary,
    fetchEntries,
    fetchEntry,
    createEntry,
    updateEntry,
    deleteEntry,
    fetchSummary,
    clearCurrent
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const distributorId = computed(() => route.params.id);
    const store = useDistributorStore();
    const ledgerStore = useLedgerStore();
    const distributor = ref(null);
    ref(true);
    const showLoadDialog = ref(false);
    const showReturnDialog = ref(false);
    const submitting = ref(false);
    const loadForm = reactive({
      distributorId: "",
      productId: "",
      warehouseId: "",
      quantity: 0,
      notes: ""
    });
    const returnForm = reactive({
      distributorId: "",
      productId: "",
      warehouseId: "",
      quantity: 0,
      notes: ""
    });
    const activeTab = ref("orders");
    const activeOrders = computed(() => {
      const s = store.ordersSummary || {};
      return ["ASSIGNED", "ACCEPTED", "OUT_FOR_DELIVERY", "PENDING"].reduce((sum, k) => sum + (s[k] || 0), 0);
    });
    const completedOrders = computed(() => store.ordersSummary?.COMPLETED || 0);
    computed(() => store.ordersSummary?.CANCELLED || 0);
    async function fetchDistributorSnapshot() {
      const data = await $fetch("/api/distributors/users");
      const found = data.distributors.find((d) => d.id === distributorId.value);
      if (!found) {
        toast.error("Distributor not found");
        return;
      }
      distributor.value = found;
    }
    async function loadOrders() {
      try {
        await store.fetchOrders({ distributorId: distributorId.value, limit: 20 });
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to load orders");
      }
    }
    async function loadCustody() {
      try {
        await store.fetchCustody(distributorId.value);
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to load custody");
      }
    }
    async function loadLedger() {
      try {
        await Promise.all([
          ledgerStore.fetchEntries({ distributorId: distributorId.value, limit: 50 }),
          ledgerStore.fetchSummary({ distributorId: distributorId.value })
        ]);
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to load ledger");
      }
    }
    async function loadCashMovements() {
      try {
        await store.fetchCashMovements({ distributorId: distributorId.value, limit: 50 });
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to load operations");
      }
    }
    watch(activeTab, (tab) => {
      if (tab === "orders") loadOrders();
      else if (tab === "inventory") loadCustody();
      else if (tab === "ledger") loadLedger();
      else if (tab === "operations") loadCashMovements();
    });
    const orderStatusVariant = (s) => {
      const map = {
        ASSIGNED: "default",
        ACCEPTED: "warning",
        OUT_FOR_DELIVERY: "default",
        COMPLETED: "success",
        CANCELLED: "destructive",
        PENDING: "secondary"
      };
      return map[s] || "secondary";
    };
    const orderColumns = [
      {
        accessorKey: "orderNumber",
        header: "Order",
        cell: ({ row }) => h(__nuxt_component_0, {
          to: `/sales/${row.original.id}`,
          class: "font-medium hover:underline"
        }, row.original.orderNumber)
      },
      {
        accessorKey: "customer.name",
        header: "Customer",
        cell: ({ row }) => h("span", { class: "text-sm" }, row.original.customer?.name || "—")
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
        cell: ({ row }) => h(_sfc_main$2, { variant: orderStatusVariant(row.original.status), class: "text-xs" }, row.original.status)
      }
    ];
    const custodyColumns = [
      {
        accessorKey: "product.name",
        header: "Product",
        cell: ({ row }) => h("span", { class: "font-medium" }, row.original.product?.name || "—")
      },
      {
        accessorKey: "product.sku",
        header: "SKU",
        cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, row.original.product?.sku || "—")
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.quantity).toFixed(3))
      },
      {
        id: "value",
        header: "Value",
        cell: ({ row }) => {
          const value = Number(row.original.quantity) * Number(row.original.product?.sellingPrice || 0);
          return h("span", { class: "tabular-nums text-muted-foreground block" }, value.toFixed(2));
        }
      },
      {
        id: "unitPrice",
        header: "Unit Price",
        cell: ({ row }) => h("span", { class: "tabular-nums text-muted-foreground block" }, Number(row.original.product?.sellingPrice || 0).toFixed(2))
      }
    ];
    const operationsColumns = [
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.createdAt).toLocaleString())
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const map = {
            PAYMENT_COLLECTED: "success",
            CASH_HANDOVER: "warning",
            ADJUSTMENT: "default"
          };
          return h(_sfc_main$2, { variant: map[row.original.type] || "secondary", class: "text-xs" }, row.original.type);
        }
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.amount).toFixed(2))
      },
      {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => h("span", { class: "text-sm" }, row.original.notes || "—")
      }
    ];
    function openLoad() {
      loadForm.distributorId = distributorId.value;
      loadForm.productId = "";
      loadForm.warehouseId = "";
      loadForm.quantity = 0;
      loadForm.notes = "";
      showLoadDialog.value = true;
    }
    function openReturn() {
      returnForm.distributorId = distributorId.value;
      returnForm.productId = "";
      returnForm.warehouseId = "";
      returnForm.quantity = 0;
      returnForm.notes = "";
      showReturnDialog.value = true;
    }
    async function handleLoad() {
      if (!loadForm.productId || !loadForm.warehouseId || loadForm.quantity <= 0) {
        toast.error("Please fill all required fields");
        return;
      }
      submitting.value = true;
      try {
        await $fetch("/api/distributors/load", { method: "POST", body: loadForm });
        toast.success("Truck loaded successfully");
        showLoadDialog.value = false;
        await Promise.all([fetchDistributorSnapshot(), loadCustody()]);
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to load truck");
      } finally {
        submitting.value = false;
      }
    }
    async function handleReturn() {
      if (!returnForm.productId || !returnForm.warehouseId || returnForm.quantity <= 0) {
        toast.error("Please fill all required fields");
        return;
      }
      submitting.value = true;
      try {
        await $fetch("/api/distributors/return", { method: "POST", body: returnForm });
        toast.success("Stock returned successfully");
        showReturnDialog.value = false;
        await Promise.all([fetchDistributorSnapshot(), loadCustody()]);
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to return stock");
      } finally {
        submitting.value = false;
      }
    }
    const distributionWarehouses = computed(
      () => distributor.value?.assignedWarehouses || []
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = PageHeader;
      const _component_UiTabs = _sfc_main$3$1;
      const _component_UiTabsList = _sfc_main$1$2;
      const _component_UiTabsTrigger = _sfc_main$5;
      const _component_UiTabsContent = _sfc_main$2$1;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_LookupCombobox = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/customers/distributors")
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
      if (distributor.value) {
        _push(ssrRenderComponent(_component_PageHeader, {
          title: distributor.value.name,
          description: "Distributor Control Center"
        }, {
          actions: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: distributor.value.status === "ACTIVE" ? "success" : "secondary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(distributor.value.status)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(distributor.value.status), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), {
                  variant: distributor.value.status === "ACTIVE" ? "success" : "secondary"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(distributor.value.status), 1)
                  ]),
                  _: 1
                }, 8, ["variant"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (distributor.value) {
        _push(`<div class="grid gap-4 lg:grid-cols-3">`);
        _push(ssrRenderComponent(unref(_sfc_main$6), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Contact`);
                        } else {
                          return [
                            createTextVNode("Contact")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Contact")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Mail), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(distributor.value.email)}</p><p class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Phone), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(distributor.value.phone || "—")}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "flex items-center gap-2" }, [
                        createVNode(unref(Mail), { class: "size-4 text-muted-foreground" }),
                        createTextVNode(" " + toDisplayString(distributor.value.email), 1)
                      ]),
                      createVNode("p", { class: "flex items-center gap-2" }, [
                        createVNode(unref(Phone), { class: "size-4 text-muted-foreground" }),
                        createTextVNode(" " + toDisplayString(distributor.value.phone || "—"), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$1$1), { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Contact")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "space-y-2 text-sm" }, {
                  default: withCtx(() => [
                    createVNode("p", { class: "flex items-center gap-2" }, [
                      createVNode(unref(Mail), { class: "size-4 text-muted-foreground" }),
                      createTextVNode(" " + toDisplayString(distributor.value.email), 1)
                    ]),
                    createVNode("p", { class: "flex items-center gap-2" }, [
                      createVNode(unref(Phone), { class: "size-4 text-muted-foreground" }),
                      createTextVNode(" " + toDisplayString(distributor.value.phone || "—"), 1)
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$6), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Assigned Warehouses`);
                        } else {
                          return [
                            createTextVNode("Assigned Warehouses")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(MapPin), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Assigned Warehouses")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(MapPin), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "space-y-1 text-sm" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (distributionWarehouses.value.length === 0) {
                      _push3(`<p class="text-muted-foreground"${_scopeId2}>No warehouses assigned</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--[-->`);
                    ssrRenderList(distributionWarehouses.value, (w) => {
                      _push3(`<p class="flex items-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Package), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                      _push3(` ${ssrInterpolate(w.name)}${ssrInterpolate(w.location ? ` — ${w.location}` : "")}</p>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      distributionWarehouses.value.length === 0 ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-muted-foreground"
                      }, "No warehouses assigned")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(distributionWarehouses.value, (w) => {
                        return openBlock(), createBlock("p", {
                          key: w.id,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                          createTextVNode(" " + toDisplayString(w.name) + toDisplayString(w.location ? ` — ${w.location}` : ""), 1)
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$1$1), { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Assigned Warehouses")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MapPin), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "space-y-1 text-sm" }, {
                  default: withCtx(() => [
                    distributionWarehouses.value.length === 0 ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-muted-foreground"
                    }, "No warehouses assigned")) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(distributionWarehouses.value, (w) => {
                      return openBlock(), createBlock("p", {
                        key: w.id,
                        class: "flex items-center gap-2"
                      }, [
                        createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                        createTextVNode(" " + toDisplayString(w.name) + toDisplayString(w.location ? ` — ${w.location}` : ""), 1)
                      ]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$6), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Quick Actions`);
                        } else {
                          return [
                            createTextVNode("Quick Actions")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Quick Actions")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$4), { class: "flex gap-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      size: "sm",
                      onClick: openLoad
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Truck), { class: "size-3.5 mr-1" }, null, _parent4, _scopeId3));
                          _push4(` Load Truck `);
                        } else {
                          return [
                            createVNode(unref(Truck), { class: "size-3.5 mr-1" }),
                            createTextVNode(" Load Truck ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$1), {
                      size: "sm",
                      variant: "outline",
                      onClick: openReturn
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(RotateCcw), { class: "size-3.5 mr-1" }, null, _parent4, _scopeId3));
                          _push4(` Return Stock `);
                        } else {
                          return [
                            createVNode(unref(RotateCcw), { class: "size-3.5 mr-1" }),
                            createTextVNode(" Return Stock ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$1), {
                        size: "sm",
                        onClick: openLoad
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Truck), { class: "size-3.5 mr-1" }),
                          createTextVNode(" Load Truck ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$1), {
                        size: "sm",
                        variant: "outline",
                        onClick: openReturn
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(RotateCcw), { class: "size-3.5 mr-1" }),
                          createTextVNode(" Return Stock ")
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
                createVNode(unref(_sfc_main$1$1), { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Quick Actions")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(_sfc_main$4), { class: "flex gap-2" }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$1), {
                      size: "sm",
                      onClick: openLoad
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Truck), { class: "size-3.5 mr-1" }),
                        createTextVNode(" Load Truck ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), {
                      size: "sm",
                      variant: "outline",
                      onClick: openReturn
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(RotateCcw), { class: "size-3.5 mr-1" }),
                        createTextVNode(" Return Stock ")
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid gap-4 grid-cols-2 lg:grid-cols-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$6), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Active Orders`);
                      } else {
                        return [
                          createTextVNode("Active Orders")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ShoppingCart), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Active Orders")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ShoppingCart), { class: "size-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(activeOrders.value)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(activeOrders.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Active Orders")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ShoppingCart), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(activeOrders.value), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Completed Orders`);
                      } else {
                        return [
                          createTextVNode("Completed Orders")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ShoppingCart), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Completed Orders")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ShoppingCart), { class: "size-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(completedOrders.value)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(completedOrders.value), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Completed Orders")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ShoppingCart), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(completedOrders.value), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Truck Inventory`);
                      } else {
                        return [
                          createTextVNode("Truck Inventory")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Boxes), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Truck Inventory")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Boxes), { class: "size-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(distributor.value?.totalCustody ?? 0)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(store).custodies?.length || 0)} products</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(distributor.value?.totalCustody ?? 0), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(store).custodies?.length || 0) + " products", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Truck Inventory")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Boxes), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(distributor.value?.totalCustody ?? 0), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(store).custodies?.length || 0) + " products", 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Custody Value`);
                      } else {
                        return [
                          createTextVNode("Custody Value")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(DollarSign), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Custody Value")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(Number(unref(store).custodyTotalValue || 0).toFixed(2))}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold tabular-nums" }, toDisplayString(Number(unref(store).custodyTotalValue || 0).toFixed(2)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Custody Value")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold tabular-nums" }, toDisplayString(Number(unref(store).custodyTotalValue || 0).toFixed(2)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Financial Balance`);
                      } else {
                        return [
                          createTextVNode("Financial Balance")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Wallet), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Financial Balance")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Wallet), { class: "size-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="${ssrRenderClass([(distributor.value?.balance || 0) > 0 ? "text-destructive" : "text-green-600", "text-2xl font-bold tabular-nums"])}"${_scopeId2}>${ssrInterpolate(Number(distributor.value?.balance || 0).toFixed(2))}</p>`);
                } else {
                  return [
                    createVNode("p", {
                      class: ["text-2xl font-bold tabular-nums", (distributor.value?.balance || 0) > 0 ? "text-destructive" : "text-green-600"]
                    }, toDisplayString(Number(distributor.value?.balance || 0).toFixed(2)), 3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Financial Balance")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Wallet), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("p", {
                    class: ["text-2xl font-bold tabular-nums", (distributor.value?.balance || 0) > 0 ? "text-destructive" : "text-green-600"]
                  }, toDisplayString(Number(distributor.value?.balance || 0).toFixed(2)), 3)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Current Cash`);
                      } else {
                        return [
                          createTextVNode("Current Cash")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(DollarSign), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Current Cash")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(Number(distributor.value?.cashOnHand || 0).toFixed(2))}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold tabular-nums" }, toDisplayString(Number(distributor.value?.cashOnHand || 0).toFixed(2)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1$1), { class: "mb-2 flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx(() => [
                      createTextVNode("Current Cash")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold tabular-nums" }, toDisplayString(Number(distributor.value?.cashOnHand || 0).toFixed(2)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiTabs, {
        modelValue: activeTab.value,
        "onUpdate:modelValue": ($event) => activeTab.value = $event,
        class: "space-y-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiTabsList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "orders" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(ShoppingCart), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Orders`);
                      } else {
                        return [
                          createVNode(unref(ShoppingCart), { class: "size-4" }),
                          createTextVNode(" Orders")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "inventory" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Boxes), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Truck Inventory`);
                      } else {
                        return [
                          createVNode(unref(Boxes), { class: "size-4" }),
                          createTextVNode(" Truck Inventory")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "ledger" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Wallet), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Ledger`);
                      } else {
                        return [
                          createVNode(unref(Wallet), { class: "size-4" }),
                          createTextVNode(" Ledger")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "operations" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Activity), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Operations`);
                      } else {
                        return [
                          createVNode(unref(Activity), { class: "size-4" }),
                          createTextVNode(" Operations")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsTrigger, { value: "orders" }, {
                      default: withCtx(() => [
                        createVNode(unref(ShoppingCart), { class: "size-4" }),
                        createTextVNode(" Orders")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "inventory" }, {
                      default: withCtx(() => [
                        createVNode(unref(Boxes), { class: "size-4" }),
                        createTextVNode(" Truck Inventory")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "ledger" }, {
                      default: withCtx(() => [
                        createVNode(unref(Wallet), { class: "size-4" }),
                        createTextVNode(" Ledger")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "operations" }, {
                      default: withCtx(() => [
                        createVNode(unref(Activity), { class: "size-4" }),
                        createTextVNode(" Operations")
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
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$3), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Delivery Orders`);
                                  } else {
                                    return [
                                      createTextVNode("Delivery Orders")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$3$2), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Recent and active delivery orders for this distributor`);
                                  } else {
                                    return [
                                      createTextVNode("Recent and active delivery orders for this distributor")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$3), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Delivery Orders")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$3$2), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Recent and active delivery orders for this distributor")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_AppTable, {
                                data: unref(store).orders,
                                columns: orderColumns,
                                loading: unref(store).loading,
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": true
                              }, {
                                empty: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_EmptyState, {
                                      title: "No orders",
                                      description: "No delivery orders have been assigned to this distributor yet."
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_EmptyState, {
                                        title: "No orders",
                                        description: "No delivery orders have been assigned to this distributor yet."
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_AppTable, {
                                  data: unref(store).orders,
                                  columns: orderColumns,
                                  loading: unref(store).loading,
                                  "show-search": false,
                                  "show-column-toggle": false,
                                  "show-pagination": true
                                }, {
                                  empty: withCtx(() => [
                                    createVNode(_component_EmptyState, {
                                      title: "No orders",
                                      description: "No delivery orders have been assigned to this distributor yet."
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
                          createVNode(unref(_sfc_main$1$1), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$3), null, {
                                default: withCtx(() => [
                                  createTextVNode("Delivery Orders")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$3$2), null, {
                                default: withCtx(() => [
                                  createTextVNode("Recent and active delivery orders for this distributor")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_AppTable, {
                                data: unref(store).orders,
                                columns: orderColumns,
                                loading: unref(store).loading,
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": true
                              }, {
                                empty: withCtx(() => [
                                  createVNode(_component_EmptyState, {
                                    title: "No orders",
                                    description: "No delivery orders have been assigned to this distributor yet."
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
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$1), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$3), null, {
                              default: withCtx(() => [
                                createTextVNode("Delivery Orders")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$3$2), null, {
                              default: withCtx(() => [
                                createTextVNode("Recent and active delivery orders for this distributor")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                          default: withCtx(() => [
                            createVNode(_component_AppTable, {
                              data: unref(store).orders,
                              columns: orderColumns,
                              loading: unref(store).loading,
                              "show-search": false,
                              "show-column-toggle": false,
                              "show-pagination": true
                            }, {
                              empty: withCtx(() => [
                                createVNode(_component_EmptyState, {
                                  title: "No orders",
                                  description: "No delivery orders have been assigned to this distributor yet."
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
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "inventory" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$3), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Truck Inventory`);
                                  } else {
                                    return [
                                      createTextVNode("Truck Inventory")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$3$2), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Current quantities and values on the distributor&#39;s truck`);
                                  } else {
                                    return [
                                      createTextVNode("Current quantities and values on the distributor's truck")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$3), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Truck Inventory")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$3$2), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Current quantities and values on the distributor's truck")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_AppTable, {
                                data: unref(store).custodies,
                                columns: custodyColumns,
                                loading: unref(store).loading,
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": true
                              }, {
                                empty: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_EmptyState, {
                                      title: "No inventory",
                                      description: "No stock currently loaded on this distributor's truck."
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_EmptyState, {
                                        title: "No inventory",
                                        description: "No stock currently loaded on this distributor's truck."
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_AppTable, {
                                  data: unref(store).custodies,
                                  columns: custodyColumns,
                                  loading: unref(store).loading,
                                  "show-search": false,
                                  "show-column-toggle": false,
                                  "show-pagination": true
                                }, {
                                  empty: withCtx(() => [
                                    createVNode(_component_EmptyState, {
                                      title: "No inventory",
                                      description: "No stock currently loaded on this distributor's truck."
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
                          createVNode(unref(_sfc_main$1$1), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$3), null, {
                                default: withCtx(() => [
                                  createTextVNode("Truck Inventory")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$3$2), null, {
                                default: withCtx(() => [
                                  createTextVNode("Current quantities and values on the distributor's truck")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_AppTable, {
                                data: unref(store).custodies,
                                columns: custodyColumns,
                                loading: unref(store).loading,
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": true
                              }, {
                                empty: withCtx(() => [
                                  createVNode(_component_EmptyState, {
                                    title: "No inventory",
                                    description: "No stock currently loaded on this distributor's truck."
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
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$1), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$3), null, {
                              default: withCtx(() => [
                                createTextVNode("Truck Inventory")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$3$2), null, {
                              default: withCtx(() => [
                                createTextVNode("Current quantities and values on the distributor's truck")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                          default: withCtx(() => [
                            createVNode(_component_AppTable, {
                              data: unref(store).custodies,
                              columns: custodyColumns,
                              loading: unref(store).loading,
                              "show-search": false,
                              "show-column-toggle": false,
                              "show-pagination": true
                            }, {
                              empty: withCtx(() => [
                                createVNode(_component_EmptyState, {
                                  title: "No inventory",
                                  description: "No stock currently loaded on this distributor's truck."
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
                  if (unref(ledgerStore).summary) {
                    _push3(`<div class="grid grid-cols-3 gap-3 mb-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { size: "sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Wallet), { class: "size-4 text-red-500" }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="min-w-0"${_scopeId4}><p class="text-xs text-muted-foreground truncate"${_scopeId4}>Total Debit</p><p class="text-sm font-semibold tabular-nums text-destructive"${_scopeId4}>${ssrInterpolate(Number(unref(ledgerStore).summary.totalDebit || 0).toFixed(2))}</p></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10" }, [
                                    createVNode(unref(Wallet), { class: "size-4 text-red-500" })
                                  ]),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Debit"),
                                    createVNode("p", { class: "text-sm font-semibold tabular-nums text-destructive" }, toDisplayString(Number(unref(ledgerStore).summary.totalDebit || 0).toFixed(2)), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10" }, [
                                  createVNode(unref(Wallet), { class: "size-4 text-red-500" })
                                ]),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Debit"),
                                  createVNode("p", { class: "text-sm font-semibold tabular-nums text-destructive" }, toDisplayString(Number(unref(ledgerStore).summary.totalDebit || 0).toFixed(2)), 1)
                                ])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { size: "sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Wallet), { class: "size-4 text-green-500" }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="min-w-0"${_scopeId4}><p class="text-xs text-muted-foreground truncate"${_scopeId4}>Total Credit</p><p class="text-sm font-semibold tabular-nums text-green-600"${_scopeId4}>${ssrInterpolate(Number(unref(ledgerStore).summary.totalCredit || 0).toFixed(2))}</p></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10" }, [
                                    createVNode(unref(Wallet), { class: "size-4 text-green-500" })
                                  ]),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Credit"),
                                    createVNode("p", { class: "text-sm font-semibold tabular-nums text-green-600" }, toDisplayString(Number(unref(ledgerStore).summary.totalCredit || 0).toFixed(2)), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10" }, [
                                  createVNode(unref(Wallet), { class: "size-4 text-green-500" })
                                ]),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Credit"),
                                  createVNode("p", { class: "text-sm font-semibold tabular-nums text-green-600" }, toDisplayString(Number(unref(ledgerStore).summary.totalCredit || 0).toFixed(2)), 1)
                                ])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$6), { size: "sm" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Wallet), { class: "size-4 text-orange-500" }, null, _parent5, _scopeId4));
                                _push5(`</div><div class="min-w-0"${_scopeId4}><p class="text-xs text-muted-foreground truncate"${_scopeId4}>Balance</p><p class="${ssrRenderClass([Number(unref(ledgerStore).summary.balance || 0) > 0 ? "text-destructive" : "text-green-600", "text-sm font-semibold tabular-nums"])}"${_scopeId4}>${ssrInterpolate(Number(unref(ledgerStore).summary.balance || 0).toFixed(2))}</p></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10" }, [
                                    createVNode(unref(Wallet), { class: "size-4 text-orange-500" })
                                  ]),
                                  createVNode("div", { class: "min-w-0" }, [
                                    createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Balance"),
                                    createVNode("p", {
                                      class: ["text-sm font-semibold tabular-nums", Number(unref(ledgerStore).summary.balance || 0) > 0 ? "text-destructive" : "text-green-600"]
                                    }, toDisplayString(Number(unref(ledgerStore).summary.balance || 0).toFixed(2)), 3)
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10" }, [
                                  createVNode(unref(Wallet), { class: "size-4 text-orange-500" })
                                ]),
                                createVNode("div", { class: "min-w-0" }, [
                                  createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Balance"),
                                  createVNode("p", {
                                    class: ["text-sm font-semibold tabular-nums", Number(unref(ledgerStore).summary.balance || 0) > 0 ? "text-destructive" : "text-green-600"]
                                  }, toDisplayString(Number(unref(ledgerStore).summary.balance || 0).toFixed(2)), 3)
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
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$3), null, {
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
                              _push5(ssrRenderComponent(unref(_sfc_main$3$2), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Financial transactions history for this distributor`);
                                  } else {
                                    return [
                                      createTextVNode("Financial transactions history for this distributor")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$3), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Ledger Entries")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$3$2), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Financial transactions history for this distributor")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_AppTable, {
                                data: unref(ledgerStore).entries,
                                columns: unref(getLedgerColumns)(),
                                loading: unref(ledgerStore).loading,
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": true
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
                                  data: unref(ledgerStore).entries,
                                  columns: unref(getLedgerColumns)(),
                                  loading: unref(ledgerStore).loading,
                                  "show-search": false,
                                  "show-column-toggle": false,
                                  "show-pagination": true
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
                          createVNode(unref(_sfc_main$1$1), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$3), null, {
                                default: withCtx(() => [
                                  createTextVNode("Ledger Entries")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$3$2), null, {
                                default: withCtx(() => [
                                  createTextVNode("Financial transactions history for this distributor")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_AppTable, {
                                data: unref(ledgerStore).entries,
                                columns: unref(getLedgerColumns)(),
                                loading: unref(ledgerStore).loading,
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": true
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
                    unref(ledgerStore).summary ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid grid-cols-3 gap-3 mb-4"
                    }, [
                      createVNode(unref(_sfc_main$6), { size: "sm" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10" }, [
                                createVNode(unref(Wallet), { class: "size-4 text-red-500" })
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Debit"),
                                createVNode("p", { class: "text-sm font-semibold tabular-nums text-destructive" }, toDisplayString(Number(unref(ledgerStore).summary.totalDebit || 0).toFixed(2)), 1)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { size: "sm" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10" }, [
                                createVNode(unref(Wallet), { class: "size-4 text-green-500" })
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Credit"),
                                createVNode("p", { class: "text-sm font-semibold tabular-nums text-green-600" }, toDisplayString(Number(unref(ledgerStore).summary.totalCredit || 0).toFixed(2)), 1)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$6), { size: "sm" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10" }, [
                                createVNode(unref(Wallet), { class: "size-4 text-orange-500" })
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Balance"),
                                createVNode("p", {
                                  class: ["text-sm font-semibold tabular-nums", Number(unref(ledgerStore).summary.balance || 0) > 0 ? "text-destructive" : "text-green-600"]
                                }, toDisplayString(Number(unref(ledgerStore).summary.balance || 0).toFixed(2)), 3)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$1), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$3), null, {
                              default: withCtx(() => [
                                createTextVNode("Ledger Entries")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$3$2), null, {
                              default: withCtx(() => [
                                createTextVNode("Financial transactions history for this distributor")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                          default: withCtx(() => [
                            createVNode(_component_AppTable, {
                              data: unref(ledgerStore).entries,
                              columns: unref(getLedgerColumns)(),
                              loading: unref(ledgerStore).loading,
                              "show-search": false,
                              "show-column-toggle": false,
                              "show-pagination": true
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
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "operations" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$3), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Operations`);
                                  } else {
                                    return [
                                      createTextVNode("Operations")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$3$2), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Cash movements and distributor activity history`);
                                  } else {
                                    return [
                                      createTextVNode("Cash movements and distributor activity history")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$3), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Operations")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$3$2), null, {
                                  default: withCtx(() => [
                                    createTextVNode("Cash movements and distributor activity history")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$4), { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_AppTable, {
                                data: unref(store).cashMovements,
                                columns: operationsColumns,
                                loading: unref(store).loading,
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": true
                              }, {
                                empty: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_EmptyState, {
                                      title: "No operations",
                                      description: "No distributor cash operations recorded yet."
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_EmptyState, {
                                        title: "No operations",
                                        description: "No distributor cash operations recorded yet."
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_AppTable, {
                                  data: unref(store).cashMovements,
                                  columns: operationsColumns,
                                  loading: unref(store).loading,
                                  "show-search": false,
                                  "show-column-toggle": false,
                                  "show-pagination": true
                                }, {
                                  empty: withCtx(() => [
                                    createVNode(_component_EmptyState, {
                                      title: "No operations",
                                      description: "No distributor cash operations recorded yet."
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
                          createVNode(unref(_sfc_main$1$1), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$3), null, {
                                default: withCtx(() => [
                                  createTextVNode("Operations")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$3$2), null, {
                                default: withCtx(() => [
                                  createTextVNode("Cash movements and distributor activity history")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_AppTable, {
                                data: unref(store).cashMovements,
                                columns: operationsColumns,
                                loading: unref(store).loading,
                                "show-search": false,
                                "show-column-toggle": false,
                                "show-pagination": true
                              }, {
                                empty: withCtx(() => [
                                  createVNode(_component_EmptyState, {
                                    title: "No operations",
                                    description: "No distributor cash operations recorded yet."
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
                    createVNode(unref(_sfc_main$6), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$1), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$3), null, {
                              default: withCtx(() => [
                                createTextVNode("Operations")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$3$2), null, {
                              default: withCtx(() => [
                                createTextVNode("Cash movements and distributor activity history")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                          default: withCtx(() => [
                            createVNode(_component_AppTable, {
                              data: unref(store).cashMovements,
                              columns: operationsColumns,
                              loading: unref(store).loading,
                              "show-search": false,
                              "show-column-toggle": false,
                              "show-pagination": true
                            }, {
                              empty: withCtx(() => [
                                createVNode(_component_EmptyState, {
                                  title: "No operations",
                                  description: "No distributor cash operations recorded yet."
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
                  createVNode(_component_UiTabsTrigger, { value: "orders" }, {
                    default: withCtx(() => [
                      createVNode(unref(ShoppingCart), { class: "size-4" }),
                      createTextVNode(" Orders")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "inventory" }, {
                    default: withCtx(() => [
                      createVNode(unref(Boxes), { class: "size-4" }),
                      createTextVNode(" Truck Inventory")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "ledger" }, {
                    default: withCtx(() => [
                      createVNode(unref(Wallet), { class: "size-4" }),
                      createTextVNode(" Ledger")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "operations" }, {
                    default: withCtx(() => [
                      createVNode(unref(Activity), { class: "size-4" }),
                      createTextVNode(" Operations")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "orders" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Delivery Orders")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3$2), null, {
                            default: withCtx(() => [
                              createTextVNode("Recent and active delivery orders for this distributor")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_AppTable, {
                            data: unref(store).orders,
                            columns: orderColumns,
                            loading: unref(store).loading,
                            "show-search": false,
                            "show-column-toggle": false,
                            "show-pagination": true
                          }, {
                            empty: withCtx(() => [
                              createVNode(_component_EmptyState, {
                                title: "No orders",
                                description: "No delivery orders have been assigned to this distributor yet."
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
              createVNode(_component_UiTabsContent, { value: "inventory" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Truck Inventory")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3$2), null, {
                            default: withCtx(() => [
                              createTextVNode("Current quantities and values on the distributor's truck")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_AppTable, {
                            data: unref(store).custodies,
                            columns: custodyColumns,
                            loading: unref(store).loading,
                            "show-search": false,
                            "show-column-toggle": false,
                            "show-pagination": true
                          }, {
                            empty: withCtx(() => [
                              createVNode(_component_EmptyState, {
                                title: "No inventory",
                                description: "No stock currently loaded on this distributor's truck."
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
                  unref(ledgerStore).summary ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-3 gap-3 mb-4"
                  }, [
                    createVNode(unref(_sfc_main$6), { size: "sm" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10" }, [
                              createVNode(unref(Wallet), { class: "size-4 text-red-500" })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Debit"),
                              createVNode("p", { class: "text-sm font-semibold tabular-nums text-destructive" }, toDisplayString(Number(unref(ledgerStore).summary.totalDebit || 0).toFixed(2)), 1)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { size: "sm" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10" }, [
                              createVNode(unref(Wallet), { class: "size-4 text-green-500" })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Total Credit"),
                              createVNode("p", { class: "text-sm font-semibold tabular-nums text-green-600" }, toDisplayString(Number(unref(ledgerStore).summary.totalCredit || 0).toFixed(2)), 1)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$6), { size: "sm" }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$4), { class: "flex items-center gap-3 p-3" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10" }, [
                              createVNode(unref(Wallet), { class: "size-4 text-orange-500" })
                            ]),
                            createVNode("div", { class: "min-w-0" }, [
                              createVNode("p", { class: "text-xs text-muted-foreground truncate" }, "Balance"),
                              createVNode("p", {
                                class: ["text-sm font-semibold tabular-nums", Number(unref(ledgerStore).summary.balance || 0) > 0 ? "text-destructive" : "text-green-600"]
                              }, toDisplayString(Number(unref(ledgerStore).summary.balance || 0).toFixed(2)), 3)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true),
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Ledger Entries")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3$2), null, {
                            default: withCtx(() => [
                              createTextVNode("Financial transactions history for this distributor")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_AppTable, {
                            data: unref(ledgerStore).entries,
                            columns: unref(getLedgerColumns)(),
                            loading: unref(ledgerStore).loading,
                            "show-search": false,
                            "show-column-toggle": false,
                            "show-pagination": true
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
              createVNode(_component_UiTabsContent, { value: "operations" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Operations")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$3$2), null, {
                            default: withCtx(() => [
                              createTextVNode("Cash movements and distributor activity history")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$4), { class: "p-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_AppTable, {
                            data: unref(store).cashMovements,
                            columns: operationsColumns,
                            loading: unref(store).loading,
                            "show-search": false,
                            "show-column-toggle": false,
                            "show-pagination": true
                          }, {
                            empty: withCtx(() => [
                              createVNode(_component_EmptyState, {
                                title: "No operations",
                                description: "No distributor cash operations recorded yet."
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
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        open: showLoadDialog.value,
        "onUpdate:open": ($event) => showLoadDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Load Truck`);
                            } else {
                              return [
                                createTextVNode("Load Truck")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Load inventory onto ${ssrInterpolate(distributor.value?.name)}&#39;s truck`);
                            } else {
                              return [
                                createTextVNode("Load inventory onto " + toDisplayString(distributor.value?.name) + "'s truck", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Load Truck")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), null, {
                            default: withCtx(() => [
                              createTextVNode("Load inventory onto " + toDisplayString(distributor.value?.name) + "'s truck", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Distributor`);
                      } else {
                        return [
                          createTextVNode("Distributor")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    "model-value": distributor.value?.name,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "load-product" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Product *`);
                      } else {
                        return [
                          createTextVNode("Product *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: loadForm.productId,
                    "onUpdate:modelValue": ($event) => loadForm.productId = $event,
                    endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                    "label-key": "_label",
                    placeholder: "Select product"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "load-warehouse" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`From Warehouse *`);
                      } else {
                        return [
                          createTextVNode("From Warehouse *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: loadForm.warehouseId,
                    "onUpdate:modelValue": ($event) => loadForm.warehouseId = $event,
                    endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                    placeholder: "Select warehouse"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "load-qty" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Quantity *`);
                      } else {
                        return [
                          createTextVNode("Quantity *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "load-qty",
                    modelValue: loadForm.quantity,
                    "onUpdate:modelValue": ($event) => loadForm.quantity = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    step: "0.001",
                    min: "0",
                    placeholder: "0.000"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "load-notes" }, {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "load-notes",
                    modelValue: loadForm.notes,
                    "onUpdate:modelValue": ($event) => loadForm.notes = $event,
                    placeholder: "Optional notes"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showLoadDialog.value = false
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
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: submitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (submitting.value) {
                                _push5(ssrRenderComponent(unref(Loader2), { class: "size-4 mr-1 animate-spin" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(Truck), { class: "size-4 mr-1" }, null, _parent5, _scopeId4));
                              }
                              _push5(` Load Truck `);
                            } else {
                              return [
                                submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "size-4 mr-1 animate-spin"
                                })) : (openBlock(), createBlock(unref(Truck), {
                                  key: 1,
                                  class: "size-4 mr-1"
                                })),
                                createTextVNode(" Load Truck ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showLoadDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: submitting.value
                          }, {
                            default: withCtx(() => [
                              submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "size-4 mr-1 animate-spin"
                              })) : (openBlock(), createBlock(unref(Truck), {
                                key: 1,
                                class: "size-4 mr-1"
                              })),
                              createTextVNode(" Load Truck ")
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
                    createVNode(unref(_sfc_main$3$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$3), null, {
                          default: withCtx(() => [
                            createTextVNode("Load Truck")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5$1), null, {
                          default: withCtx(() => [
                            createTextVNode("Load inventory onto " + toDisplayString(distributor.value?.name) + "'s truck", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(handleLoad, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Distributor")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          "model-value": distributor.value?.name,
                          disabled: ""
                        }, null, 8, ["model-value"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "load-product" }, {
                          default: withCtx(() => [
                            createTextVNode("Product *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: loadForm.productId,
                          "onUpdate:modelValue": ($event) => loadForm.productId = $event,
                          endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                          "label-key": "_label",
                          placeholder: "Select product"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "load-warehouse" }, {
                          default: withCtx(() => [
                            createTextVNode("From Warehouse *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: loadForm.warehouseId,
                          "onUpdate:modelValue": ($event) => loadForm.warehouseId = $event,
                          endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                          placeholder: "Select warehouse"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "load-qty" }, {
                          default: withCtx(() => [
                            createTextVNode("Quantity *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          id: "load-qty",
                          modelValue: loadForm.quantity,
                          "onUpdate:modelValue": ($event) => loadForm.quantity = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          step: "0.001",
                          min: "0",
                          placeholder: "0.000"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "load-notes" }, {
                          default: withCtx(() => [
                            createTextVNode("Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          id: "load-notes",
                          modelValue: loadForm.notes,
                          "onUpdate:modelValue": ($event) => loadForm.notes = $event,
                          placeholder: "Optional notes"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$4$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showLoadDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: submitting.value
                          }, {
                            default: withCtx(() => [
                              submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "size-4 mr-1 animate-spin"
                              })) : (openBlock(), createBlock(unref(Truck), {
                                key: 1,
                                class: "size-4 mr-1"
                              })),
                              createTextVNode(" Load Truck ")
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
              createVNode(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Load Truck")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5$1), null, {
                        default: withCtx(() => [
                          createTextVNode("Load inventory onto " + toDisplayString(distributor.value?.name) + "'s truck", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(handleLoad, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createTextVNode("Distributor")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        "model-value": distributor.value?.name,
                        disabled: ""
                      }, null, 8, ["model-value"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "load-product" }, {
                        default: withCtx(() => [
                          createTextVNode("Product *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: loadForm.productId,
                        "onUpdate:modelValue": ($event) => loadForm.productId = $event,
                        endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                        "label-key": "_label",
                        placeholder: "Select product"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "load-warehouse" }, {
                        default: withCtx(() => [
                          createTextVNode("From Warehouse *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: loadForm.warehouseId,
                        "onUpdate:modelValue": ($event) => loadForm.warehouseId = $event,
                        endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                        placeholder: "Select warehouse"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "load-qty" }, {
                        default: withCtx(() => [
                          createTextVNode("Quantity *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "load-qty",
                        modelValue: loadForm.quantity,
                        "onUpdate:modelValue": ($event) => loadForm.quantity = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        step: "0.001",
                        min: "0",
                        placeholder: "0.000"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "load-notes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "load-notes",
                        modelValue: loadForm.notes,
                        "onUpdate:modelValue": ($event) => loadForm.notes = $event,
                        placeholder: "Optional notes"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$4$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showLoadDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: submitting.value
                        }, {
                          default: withCtx(() => [
                            submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "size-4 mr-1 animate-spin"
                            })) : (openBlock(), createBlock(unref(Truck), {
                              key: 1,
                              class: "size-4 mr-1"
                            })),
                            createTextVNode(" Load Truck ")
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
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        open: showReturnDialog.value,
        "onUpdate:open": ($event) => showReturnDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$3), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Return Stock`);
                            } else {
                              return [
                                createTextVNode("Return Stock")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5$1), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Return unsold stock from ${ssrInterpolate(distributor.value?.name)}&#39;s truck to warehouse`);
                            } else {
                              return [
                                createTextVNode("Return unsold stock from " + toDisplayString(distributor.value?.name) + "'s truck to warehouse", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$3), null, {
                            default: withCtx(() => [
                              createTextVNode("Return Stock")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5$1), null, {
                            default: withCtx(() => [
                              createTextVNode("Return unsold stock from " + toDisplayString(distributor.value?.name) + "'s truck to warehouse", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Distributor`);
                      } else {
                        return [
                          createTextVNode("Distributor")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    "model-value": distributor.value?.name,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "return-product" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Product *`);
                      } else {
                        return [
                          createTextVNode("Product *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: returnForm.productId,
                    "onUpdate:modelValue": ($event) => returnForm.productId = $event,
                    endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                    "label-key": "_label",
                    placeholder: "Select product on truck",
                    "empty-message": "No products on truck"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "return-warehouse" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`To Warehouse *`);
                      } else {
                        return [
                          createTextVNode("To Warehouse *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: returnForm.warehouseId,
                    "onUpdate:modelValue": ($event) => returnForm.warehouseId = $event,
                    endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                    placeholder: "Select warehouse"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "return-qty" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Quantity *`);
                      } else {
                        return [
                          createTextVNode("Quantity *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "return-qty",
                    modelValue: returnForm.quantity,
                    "onUpdate:modelValue": ($event) => returnForm.quantity = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    step: "0.001",
                    min: "0",
                    placeholder: "0.000"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "return-notes" }, {
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
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "return-notes",
                    modelValue: returnForm.notes,
                    "onUpdate:modelValue": ($event) => returnForm.notes = $event,
                    placeholder: "Optional notes"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showReturnDialog.value = false
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
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: submitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (submitting.value) {
                                _push5(ssrRenderComponent(unref(Loader2), { class: "size-4 mr-1 animate-spin" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(RotateCcw), { class: "size-4 mr-1" }, null, _parent5, _scopeId4));
                              }
                              _push5(` Return Stock `);
                            } else {
                              return [
                                submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "size-4 mr-1 animate-spin"
                                })) : (openBlock(), createBlock(unref(RotateCcw), {
                                  key: 1,
                                  class: "size-4 mr-1"
                                })),
                                createTextVNode(" Return Stock ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showReturnDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: submitting.value
                          }, {
                            default: withCtx(() => [
                              submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "size-4 mr-1 animate-spin"
                              })) : (openBlock(), createBlock(unref(RotateCcw), {
                                key: 1,
                                class: "size-4 mr-1"
                              })),
                              createTextVNode(" Return Stock ")
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
                    createVNode(unref(_sfc_main$3$3), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$3), null, {
                          default: withCtx(() => [
                            createTextVNode("Return Stock")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5$1), null, {
                          default: withCtx(() => [
                            createTextVNode("Return unsold stock from " + toDisplayString(distributor.value?.name) + "'s truck to warehouse", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(handleReturn, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Distributor")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          "model-value": distributor.value?.name,
                          disabled: ""
                        }, null, 8, ["model-value"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "return-product" }, {
                          default: withCtx(() => [
                            createTextVNode("Product *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: returnForm.productId,
                          "onUpdate:modelValue": ($event) => returnForm.productId = $event,
                          endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                          "label-key": "_label",
                          placeholder: "Select product on truck",
                          "empty-message": "No products on truck"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "return-warehouse" }, {
                          default: withCtx(() => [
                            createTextVNode("To Warehouse *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: returnForm.warehouseId,
                          "onUpdate:modelValue": ($event) => returnForm.warehouseId = $event,
                          endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                          placeholder: "Select warehouse"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "return-qty" }, {
                          default: withCtx(() => [
                            createTextVNode("Quantity *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          id: "return-qty",
                          modelValue: returnForm.quantity,
                          "onUpdate:modelValue": ($event) => returnForm.quantity = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          step: "0.001",
                          min: "0",
                          placeholder: "0.000"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "return-notes" }, {
                          default: withCtx(() => [
                            createTextVNode("Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          id: "return-notes",
                          modelValue: returnForm.notes,
                          "onUpdate:modelValue": ($event) => returnForm.notes = $event,
                          placeholder: "Optional notes"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$4$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showReturnDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: submitting.value
                          }, {
                            default: withCtx(() => [
                              submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "size-4 mr-1 animate-spin"
                              })) : (openBlock(), createBlock(unref(RotateCcw), {
                                key: 1,
                                class: "size-4 mr-1"
                              })),
                              createTextVNode(" Return Stock ")
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
              createVNode(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$3), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$3), null, {
                        default: withCtx(() => [
                          createTextVNode("Return Stock")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5$1), null, {
                        default: withCtx(() => [
                          createTextVNode("Return unsold stock from " + toDisplayString(distributor.value?.name) + "'s truck to warehouse", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(handleReturn, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createTextVNode("Distributor")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        "model-value": distributor.value?.name,
                        disabled: ""
                      }, null, 8, ["model-value"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "return-product" }, {
                        default: withCtx(() => [
                          createTextVNode("Product *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: returnForm.productId,
                        "onUpdate:modelValue": ($event) => returnForm.productId = $event,
                        endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                        "label-key": "_label",
                        placeholder: "Select product on truck",
                        "empty-message": "No products on truck"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "return-warehouse" }, {
                        default: withCtx(() => [
                          createTextVNode("To Warehouse *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: returnForm.warehouseId,
                        "onUpdate:modelValue": ($event) => returnForm.warehouseId = $event,
                        endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                        placeholder: "Select warehouse"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "return-qty" }, {
                        default: withCtx(() => [
                          createTextVNode("Quantity *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "return-qty",
                        modelValue: returnForm.quantity,
                        "onUpdate:modelValue": ($event) => returnForm.quantity = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        step: "0.001",
                        min: "0",
                        placeholder: "0.000"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "return-notes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "return-notes",
                        modelValue: returnForm.notes,
                        "onUpdate:modelValue": ($event) => returnForm.notes = $event,
                        placeholder: "Optional notes"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$4$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showReturnDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: submitting.value
                        }, {
                          default: withCtx(() => [
                            submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "size-4 mr-1 animate-spin"
                            })) : (openBlock(), createBlock(unref(RotateCcw), {
                              key: 1,
                              class: "size-4 mr-1"
                            })),
                            createTextVNode(" Return Stock ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/customers/distributors/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BuLDmkzR.mjs.map
