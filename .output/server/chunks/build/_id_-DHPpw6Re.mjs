import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$4 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$5 } from './Label-Di1i-yIq.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$7, c as _sfc_main$9, d as _sfc_main$7$1 } from './SelectValue-CdUm-rR7.mjs';
import { _ as _sfc_main$8 } from './Input-pgd-3rGf.mjs';
import { defineComponent, ref, reactive, computed, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, resolveDynamicComponent, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { ArrowLeft, User, Phone, MapPin, DollarSign, ShoppingCart, Receipt, Calendar, CreditCard, Plus, X } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { a as useRoute, b as useAuthStore, n as navigateTo } from './server.mjs';
import { u as useCustomersStore } from './store-DIa1t7OS.mjs';
import { u as useDistributorStore } from './store-DAWlzSoP.mjs';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './Textarea-B_fNd96X.mjs';
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
import './api-Dq8IcxCC.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const customersStore = useCustomersStore();
    const auth = useAuthStore();
    const store = useDistributorStore();
    const productsStore = useProductsStore();
    const customer = ref(null);
    const loading = ref(true);
    const loadError = ref(false);
    const activeTab = ref("my-sales");
    const invoices = ref([]);
    const mySales = ref([]);
    const orders = ref([]);
    const ledgerEntries = ref([]);
    const invoicesLoading = ref(false);
    const showSaleForm = ref(false);
    const saving = ref(false);
    const salesForm = reactive({
      customerId: "",
      customerName: "",
      warehouseId: "",
      paidAmount: 0,
      paymentMethod: "CASH",
      items: []
    });
    const products = computed(() => productsStore.products);
    const calculatedTotal = computed(
      () => salesForm.items.reduce((sum, i) => sum + (i.quantity || 0) * (i.unitPrice || 0), 0)
    );
    function openSaleForm() {
      salesForm.customerId = route.params.id;
      salesForm.customerName = customer.value?.name || "";
      salesForm.warehouseId = "";
      salesForm.paidAmount = 0;
      salesForm.paymentMethod = "CASH";
      salesForm.items = [];
      showSaleForm.value = true;
      if (productsStore.products.length === 0) productsStore.fetchProducts();
    }
    function addItem() {
      salesForm.items.push({ productId: "", productName: "" });
    }
    function removeItem(index) {
      salesForm.items.splice(index, 1);
    }
    function selectProduct(index, productId) {
      const p = products.value.find((pr) => pr.id === productId);
      const item = salesForm.items[index];
      if (p && item) {
        item.productId = p.id;
        item.productName = p.name;
        if (!item.unitPrice) {
          item.unitPrice = p.sellingPrice ? Number(p.sellingPrice) : void 0;
        }
      }
    }
    async function handleCreateSale() {
      if (!salesForm.customerId || !salesForm.warehouseId || salesForm.items.length === 0) {
        toast.error("Warehouse and at least one item are required");
        return;
      }
      if (salesForm.paidAmount > calculatedTotal.value) {
        toast.error("Paid amount cannot exceed total");
        return;
      }
      saving.value = true;
      try {
        const invoice = await store.createDirectSale({
          customerId: salesForm.customerId,
          warehouseId: salesForm.warehouseId,
          paidAmount: salesForm.paidAmount || 0,
          paymentMethod: salesForm.paymentMethod,
          paymentNotes: void 0,
          items: salesForm.items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity || 0,
            unitPrice: i.unitPrice || 0
          }))
        });
        toast.success(`Invoice ${invoice.invoiceNumber} created`);
        showSaleForm.value = false;
        await store.fetchCustody();
        await store.fetchCashOnHand();
        await load();
      } catch (err) {
        toast.error(err?.message || "Failed to create sale");
      } finally {
        saving.value = false;
      }
    }
    async function load() {
      loading.value = true;
      loadError.value = false;
      try {
        const id = route.params.id;
        await customersStore.fetchCustomer(id);
        customer.value = customersStore.currentCustomer;
        await Promise.all([loadInvoices(), loadMySales(), loadOrders()]);
      } catch {
        loadError.value = true;
      } finally {
        loading.value = false;
      }
    }
    async function loadInvoices() {
      invoicesLoading.value = true;
      try {
        const data = await $fetch("/api/invoices", { params: { customerId: route.params.id, limit: 50 } });
        invoices.value = data.invoices || [];
      } catch {
        invoices.value = [];
      } finally {
        invoicesLoading.value = false;
      }
    }
    async function loadMySales() {
      try {
        const data = await $fetch("/api/invoices", {
          params: { customerId: route.params.id, createdById: auth.user?.id, limit: 50 }
        });
        mySales.value = data.invoices || [];
      } catch {
        mySales.value = [];
      }
    }
    async function loadOrders() {
      try {
        const data = await $fetch("/api/sales", { params: { customerId: route.params.id, limit: 50 } });
        orders.value = data.orders || [];
      } catch {
      }
    }
    watch(() => route.params.id, load);
    const statusVariant = (s) => {
      const map = { UNPAID: "destructive", PARTIAL: "default", PAID: "success", CANCELLED: "secondary", PENDING: "secondary", CONFIRMED: "default", COMPLETED: "success" };
      return map[s] || "secondary";
    };
    const lastPurchaseDate = computed(() => {
      if (mySales.value.length > 0) {
        return new Date(mySales.value[0].createdAt).toLocaleDateString();
      }
      if (invoices.value.length > 0) {
        return new Date(invoices.value[0].createdAt).toLocaleDateString();
      }
      return "—";
    });
    function goBack() {
      navigateTo("/distributor/contacts");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiBadge = _sfc_main$4;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiLabel = _sfc_main$5;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$7;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7$1;
      const _component_UiInput = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "sm",
        class: "gap-1 -ml-2",
        onClick: goBack
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "size-4" }, null, _parent2, _scopeId));
            _push2(` Back to Customers `);
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "size-4" }),
              createTextVNode(" Back to Customers ")
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
      } else if (unref(loadError)) {
        _push(`<div class="flex flex-col items-center justify-center py-12 text-sm text-muted-foreground">`);
        _push(ssrRenderComponent(unref(User), { class: "mb-2 size-8 text-muted-foreground/60" }, null, _parent));
        _push(`<p>Failed to load customer details</p>`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "outline",
          size: "sm",
          class: "mt-3",
          onClick: load
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Retry`);
            } else {
              return [
                createTextVNode("Retry")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(customer) && !unref(showSaleForm)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-start justify-between"${_scopeId2}><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-xl" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(customer).name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(customer).name), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, { class: "mt-1 space-y-1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (unref(customer).phone) {
                            _push4(`<div class="flex items-center gap-2 text-sm"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(Phone), { class: "size-3.5" }, null, _parent4, _scopeId3));
                            _push4(` ${ssrInterpolate(unref(customer).phone)}</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (unref(customer).address) {
                            _push4(`<div class="flex items-center gap-2 text-sm"${_scopeId3}>`);
                            _push4(ssrRenderComponent(unref(MapPin), { class: "size-3.5" }, null, _parent4, _scopeId3));
                            _push4(` ${ssrInterpolate(unref(customer).address)}</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            unref(customer).phone ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2 text-sm"
                            }, [
                              createVNode(unref(Phone), { class: "size-3.5" }),
                              createTextVNode(" " + toDisplayString(unref(customer).phone), 1)
                            ])) : createCommentVNode("", true),
                            unref(customer).address ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex items-center gap-2 text-sm"
                            }, [
                              createVNode(unref(MapPin), { class: "size-3.5" }),
                              createTextVNode(" " + toDisplayString(unref(customer).address), 1)
                            ])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="flex flex-col items-end gap-2"${_scopeId2}><div class="text-right"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Balance</p><p class="${ssrRenderClass([(unref(customer).balance || 0) > 0 ? "text-green-600" : (unref(customer).balance || 0) < 0 ? "text-red-600" : "", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate((unref(customer).balance || 0).toFixed(2))}</p></div>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      size: "sm",
                      onClick: openSaleForm
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(DollarSign), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` New Sale `);
                        } else {
                          return [
                            createVNode(unref(DollarSign), { class: "size-4" }),
                            createTextVNode(" New Sale ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div><div class="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground"${_scopeId2}><span class="flex items-center gap-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ShoppingCart), { class: "size-3.5" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(customer)._count?.salesOrders || 0)} orders</span><span class="flex items-center gap-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Receipt), { class: "size-3.5" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(customer)._count?.invoices || 0)} invoices</span><span class="flex items-center gap-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Calendar), { class: "size-3.5" }, null, _parent3, _scopeId2));
                    _push3(` Last purchase: ${ssrInterpolate(unref(lastPurchaseDate))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-start justify-between" }, [
                        createVNode("div", null, [
                          createVNode(_component_UiCardTitle, { class: "text-xl" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(customer).name), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, { class: "mt-1 space-y-1" }, {
                            default: withCtx(() => [
                              unref(customer).phone ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center gap-2 text-sm"
                              }, [
                                createVNode(unref(Phone), { class: "size-3.5" }),
                                createTextVNode(" " + toDisplayString(unref(customer).phone), 1)
                              ])) : createCommentVNode("", true),
                              unref(customer).address ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex items-center gap-2 text-sm"
                              }, [
                                createVNode(unref(MapPin), { class: "size-3.5" }),
                                createTextVNode(" " + toDisplayString(unref(customer).address), 1)
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                          createVNode("div", { class: "text-right" }, [
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "Balance"),
                            createVNode("p", {
                              class: ["text-2xl font-bold", (unref(customer).balance || 0) > 0 ? "text-green-600" : (unref(customer).balance || 0) < 0 ? "text-red-600" : ""]
                            }, toDisplayString((unref(customer).balance || 0).toFixed(2)), 3)
                          ]),
                          createVNode(_component_UiButton, {
                            size: "sm",
                            onClick: openSaleForm
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(DollarSign), { class: "size-4" }),
                              createTextVNode(" New Sale ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", { class: "mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground" }, [
                        createVNode("span", { class: "flex items-center gap-1" }, [
                          createVNode(unref(ShoppingCart), { class: "size-3.5" }),
                          createTextVNode(" " + toDisplayString(unref(customer)._count?.salesOrders || 0) + " orders", 1)
                        ]),
                        createVNode("span", { class: "flex items-center gap-1" }, [
                          createVNode(unref(Receipt), { class: "size-3.5" }),
                          createTextVNode(" " + toDisplayString(unref(customer)._count?.invoices || 0) + " invoices", 1)
                        ]),
                        createVNode("span", { class: "flex items-center gap-1" }, [
                          createVNode(unref(Calendar), { class: "size-3.5" }),
                          createTextVNode(" Last purchase: " + toDisplayString(unref(lastPurchaseDate)), 1)
                        ])
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
                    createVNode("div", { class: "flex items-start justify-between" }, [
                      createVNode("div", null, [
                        createVNode(_component_UiCardTitle, { class: "text-xl" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(customer).name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, { class: "mt-1 space-y-1" }, {
                          default: withCtx(() => [
                            unref(customer).phone ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2 text-sm"
                            }, [
                              createVNode(unref(Phone), { class: "size-3.5" }),
                              createTextVNode(" " + toDisplayString(unref(customer).phone), 1)
                            ])) : createCommentVNode("", true),
                            unref(customer).address ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex items-center gap-2 text-sm"
                            }, [
                              createVNode(unref(MapPin), { class: "size-3.5" }),
                              createTextVNode(" " + toDisplayString(unref(customer).address), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex flex-col items-end gap-2" }, [
                        createVNode("div", { class: "text-right" }, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Balance"),
                          createVNode("p", {
                            class: ["text-2xl font-bold", (unref(customer).balance || 0) > 0 ? "text-green-600" : (unref(customer).balance || 0) < 0 ? "text-red-600" : ""]
                          }, toDisplayString((unref(customer).balance || 0).toFixed(2)), 3)
                        ]),
                        createVNode(_component_UiButton, {
                          size: "sm",
                          onClick: openSaleForm
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DollarSign), { class: "size-4" }),
                            createTextVNode(" New Sale ")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground" }, [
                      createVNode("span", { class: "flex items-center gap-1" }, [
                        createVNode(unref(ShoppingCart), { class: "size-3.5" }),
                        createTextVNode(" " + toDisplayString(unref(customer)._count?.salesOrders || 0) + " orders", 1)
                      ]),
                      createVNode("span", { class: "flex items-center gap-1" }, [
                        createVNode(unref(Receipt), { class: "size-3.5" }),
                        createTextVNode(" " + toDisplayString(unref(customer)._count?.invoices || 0) + " invoices", 1)
                      ]),
                      createVNode("span", { class: "flex items-center gap-1" }, [
                        createVNode(unref(Calendar), { class: "size-3.5" }),
                        createTextVNode(" Last purchase: " + toDisplayString(unref(lastPurchaseDate)), 1)
                      ])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex gap-1 border-b"><!--[-->`);
        ssrRenderList([
          // { key: 'invoices', label: 'All Invoices', icon: Receipt },
          { key: "my-sales", label: "My Sales", icon: unref(User) },
          { key: "orders", label: "Orders", icon: unref(ShoppingCart) },
          { key: "ledger", label: "Ledger", icon: unref(CreditCard) }
        ], (tab) => {
          _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground", "flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap"])}">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tab.icon), { class: "size-4" }, null), _parent);
          _push(` ${ssrInterpolate(tab.label)}</button>`);
        });
        _push(`<!--]--></div>`);
        if (unref(activeTab) === "invoices") {
          _push(`<div class="space-y-2">`);
          if (unref(invoices).length === 0) {
            _push(`<div class="text-center py-8 text-sm text-muted-foreground">`);
            _push(ssrRenderComponent(unref(Receipt), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }, null, _parent));
            _push(`<p>No invoices for this customer</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(unref(invoices), (inv) => {
            _push(`<div class="flex items-center justify-between rounded-lg border p-3 text-sm"><div class="min-w-0 flex-1"><p class="font-medium truncate">${ssrInterpolate(inv.invoiceNumber)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(new Date(inv.createdAt).toLocaleDateString())}</p></div><div class="flex items-center gap-2 shrink-0 ml-2"><p class="font-semibold">${ssrInterpolate(Number(inv.totalAmount).toFixed(2))}</p>`);
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
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(activeTab) === "my-sales") {
          _push(`<div class="space-y-2">`);
          if (unref(mySales).length === 0) {
            _push(`<div class="text-center py-8 text-sm text-muted-foreground">`);
            _push(ssrRenderComponent(unref(Receipt), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }, null, _parent));
            _push(`<p>You haven&#39;t made any sales to this customer yet</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(unref(mySales), (inv) => {
            _push(`<div class="flex items-center justify-between rounded-lg border p-3 text-sm"><div class="min-w-0 flex-1"><p class="font-medium truncate">${ssrInterpolate(inv.invoiceNumber)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(new Date(inv.createdAt).toLocaleDateString())}</p></div><div class="flex items-center gap-2 shrink-0 ml-2"><p class="font-semibold">${ssrInterpolate(Number(inv.totalAmount).toFixed(2))}</p>`);
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
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(activeTab) === "orders") {
          _push(`<div class="space-y-2">`);
          if (unref(orders).length === 0) {
            _push(`<div class="text-center py-8 text-sm text-muted-foreground">`);
            _push(ssrRenderComponent(unref(ShoppingCart), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }, null, _parent));
            _push(`<p>No orders for this customer</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(unref(orders), (order) => {
            _push(`<div class="flex items-center justify-between rounded-lg border p-3 text-sm"><div class="min-w-0 flex-1"><p class="font-medium truncate">${ssrInterpolate(order.orderNumber)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(new Date(order.createdAt).toLocaleDateString())}</p></div><div class="flex items-center gap-2 shrink-0 ml-2"><p class="font-semibold">${ssrInterpolate(Number(order.totalAmount).toFixed(2))}</p>`);
            _push(ssrRenderComponent(_component_UiBadge, {
              variant: statusVariant(order.status),
              class: "text-[10px]"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(order.status)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(order.status), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(activeTab) === "ledger") {
          _push(`<div class="space-y-2">`);
          if (unref(ledgerEntries).length === 0) {
            _push(`<div class="text-center py-8 text-sm text-muted-foreground">`);
            _push(ssrRenderComponent(unref(CreditCard), { class: "mx-auto mb-2 size-6 text-muted-foreground/60" }, null, _parent));
            _push(`<p>No ledger entries found</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(unref(ledgerEntries), (entry) => {
            _push(`<div class="flex items-center justify-between rounded-lg border p-3 text-sm"><div class="min-w-0 flex-1"><p class="font-medium truncate">${ssrInterpolate(entry.type)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(new Date(entry.createdAt).toLocaleDateString())}</p>`);
            if (entry.notes) {
              _push(`<p class="text-xs text-muted-foreground truncate">${ssrInterpolate(entry.notes)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><span class="${ssrRenderClass([entry.type === "DEBIT" ? "text-red-600" : "text-green-600", "font-semibold shrink-0 ml-2"])}">${ssrInterpolate(entry.type === "DEBIT" ? "-" : "+")}${ssrInterpolate(Number(entry.amount).toFixed(2))}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (unref(customer) && unref(showSaleForm)) {
        _push(`<div class="space-y-6"><div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          size: "icon",
          class: "size-8 shrink-0",
          onClick: ($event) => showSaleForm.value = false
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
        _push(`<div><h2 class="text-lg font-semibold">New Sale</h2><p class="text-sm text-muted-foreground">Customer: ${ssrInterpolate(unref(customer).name)}</p></div></div>`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Sale Details`);
                        } else {
                          return [
                            createTextVNode("Sale Details")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx(() => [
                          createTextVNode("Sale Details")
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
                          _push4(`Warehouse`);
                        } else {
                          return [
                            createTextVNode("Warehouse")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_LookupCombobox, {
                      modelValue: unref(salesForm).warehouseId,
                      "onUpdate:modelValue": ($event) => unref(salesForm).warehouseId = $event,
                      endpoint: unref(fetchWarehousesLookupApi),
                      placeholder: "Select warehouse",
                      class: "mt-1"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-3"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, null, {
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
                    _push3(ssrRenderComponent(_component_UiButton, {
                      size: "xs",
                      variant: "outline",
                      onClick: addItem
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Plus), { class: "size-3" }, null, _parent4, _scopeId3));
                          _push4(` Add Item `);
                        } else {
                          return [
                            createVNode(unref(Plus), { class: "size-3" }),
                            createTextVNode(" Add Item ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><!--[-->`);
                    ssrRenderList(unref(salesForm).items, (item, index) => {
                      _push3(`<div class="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-end"${_scopeId2}><div class="flex-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Product`);
                          } else {
                            return [
                              createTextVNode("Product")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiSelect, {
                        "model-value": item.productId,
                        "onUpdate:modelValue": ($event) => selectProduct(index, $event)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "mt-0.5" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "Select product" }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_UiSelectValue, { placeholder: "Select product" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(unref(products), (p) => {
                                    _push5(ssrRenderComponent(_component_UiSelectItem, {
                                      key: p.id,
                                      value: p.id
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(p.name)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(p.name), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(products), (p) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: p.id,
                                        value: p.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(p.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UiSelectTrigger, { class: "mt-0.5" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, { placeholder: "Select product" })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(products), (p) => {
                                    return openBlock(), createBlock(_component_UiSelectItem, {
                                      key: p.id,
                                      value: p.id
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(p.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div><div class="w-full sm:w-24"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Qty`);
                          } else {
                            return [
                              createTextVNode("Qty")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        modelValue: item.quantity,
                        "onUpdate:modelValue": ($event) => item.quantity = $event,
                        type: "number",
                        min: "0",
                        step: "0.001",
                        placeholder: "0",
                        class: "mt-0.5"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div class="w-full sm:w-28"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Price`);
                          } else {
                            return [
                              createTextVNode("Price")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        modelValue: item.unitPrice,
                        "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                        type: "number",
                        min: "0",
                        step: "0.01",
                        placeholder: "0.00",
                        class: "mt-0.5"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "ghost",
                        size: "icon",
                        class: "size-8 shrink-0",
                        onClick: ($event) => removeItem(index)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(X), { class: "size-4" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(X), { class: "size-4" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></div><div class="flex items-center justify-between border-t pt-3"${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>Total</p><p class="text-lg font-bold"${_scopeId2}>${ssrInterpolate(unref(calculatedTotal).toFixed(2))}</p></div><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Payment`);
                        } else {
                          return [
                            createTextVNode("Payment")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex flex-col gap-2 sm:flex-row"${_scopeId2}><div class="flex-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiInput, {
                      modelValue: unref(salesForm).paidAmount,
                      "onUpdate:modelValue": ($event) => unref(salesForm).paidAmount = $event,
                      type: "number",
                      min: "0",
                      step: "0.01",
                      placeholder: "Paid amount"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_UiSelect, {
                      modelValue: unref(salesForm).paymentMethod,
                      "onUpdate:modelValue": ($event) => unref(salesForm).paymentMethod = $event
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full sm:w-32" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "Method" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiSelectValue, { placeholder: "Method" })
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
                            createVNode(_component_UiSelectTrigger, { class: "w-full sm:w-32" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue, { placeholder: "Method" })
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
                    _push3(`</div></div>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(saving) || unref(calculatedTotal) <= 0,
                      onClick: handleCreateSale
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(DollarSign), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` ${ssrInterpolate(unref(saving) ? "Creating..." : "Create Sale")}`);
                        } else {
                          return [
                            createVNode(unref(DollarSign), { class: "size-4" }),
                            createTextVNode(" " + toDisplayString(unref(saving) ? "Creating..." : "Create Sale"), 1)
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
                            createTextVNode("Warehouse")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(salesForm).warehouseId,
                          "onUpdate:modelValue": ($event) => unref(salesForm).warehouseId = $event,
                          endpoint: unref(fetchWarehousesLookupApi),
                          placeholder: "Select warehouse",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Items")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiButton, {
                            size: "xs",
                            variant: "outline",
                            onClick: addItem
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "size-3" }),
                              createTextVNode(" Add Item ")
                            ]),
                            _: 1
                          })
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(salesForm).items, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-end"
                          }, [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode(_component_UiLabel, { class: "text-xs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Product")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelect, {
                                "model-value": item.productId,
                                "onUpdate:modelValue": ($event) => selectProduct(index, $event)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectTrigger, { class: "mt-0.5" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiSelectValue, { placeholder: "Select product" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectContent, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(products), (p) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: p.id,
                                          value: p.id
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(p.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "w-full sm:w-24" }, [
                              createVNode(_component_UiLabel, { class: "text-xs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Qty")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiInput, {
                                modelValue: item.quantity,
                                "onUpdate:modelValue": ($event) => item.quantity = $event,
                                type: "number",
                                min: "0",
                                step: "0.001",
                                placeholder: "0",
                                class: "mt-0.5"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "w-full sm:w-28" }, [
                              createVNode(_component_UiLabel, { class: "text-xs" }, {
                                default: withCtx(() => [
                                  createTextVNode("Price")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiInput, {
                                modelValue: item.unitPrice,
                                "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                type: "number",
                                min: "0",
                                step: "0.01",
                                placeholder: "0.00",
                                class: "mt-0.5"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(_component_UiButton, {
                              variant: "ghost",
                              size: "icon",
                              class: "size-8 shrink-0",
                              onClick: ($event) => removeItem(index)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(X), { class: "size-4" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "flex items-center justify-between border-t pt-3" }, [
                        createVNode("p", { class: "text-sm font-medium" }, "Total"),
                        createVNode("p", { class: "text-lg font-bold" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Payment")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex flex-col gap-2 sm:flex-row" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode(_component_UiInput, {
                              modelValue: unref(salesForm).paidAmount,
                              "onUpdate:modelValue": ($event) => unref(salesForm).paidAmount = $event,
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "Paid amount"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(_component_UiSelect, {
                            modelValue: unref(salesForm).paymentMethod,
                            "onUpdate:modelValue": ($event) => unref(salesForm).paymentMethod = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { class: "w-full sm:w-32" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, { placeholder: "Method" })
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
                        ])
                      ]),
                      createVNode(_component_UiButton, {
                        class: "w-full",
                        disabled: unref(saving) || unref(calculatedTotal) <= 0,
                        onClick: handleCreateSale
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DollarSign), { class: "size-4" }),
                          createTextVNode(" " + toDisplayString(unref(saving) ? "Creating..." : "Create Sale"), 1)
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
                        createTextVNode("Sale Details")
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
                          createTextVNode("Warehouse")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(salesForm).warehouseId,
                        "onUpdate:modelValue": ($event) => unref(salesForm).warehouseId = $event,
                        endpoint: unref(fetchWarehousesLookupApi),
                        placeholder: "Select warehouse",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Items")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiButton, {
                          size: "xs",
                          variant: "outline",
                          onClick: addItem
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "size-3" }),
                            createTextVNode(" Add Item ")
                          ]),
                          _: 1
                        })
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(salesForm).items, (item, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-end"
                        }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Product")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": item.productId,
                              "onUpdate:modelValue": ($event) => selectProduct(index, $event)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "mt-0.5" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, { placeholder: "Select product" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(products), (p) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: p.id,
                                        value: p.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(p.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["model-value", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "w-full sm:w-24" }, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Qty")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              modelValue: item.quantity,
                              "onUpdate:modelValue": ($event) => item.quantity = $event,
                              type: "number",
                              min: "0",
                              step: "0.001",
                              placeholder: "0",
                              class: "mt-0.5"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "w-full sm:w-28" }, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Price")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              modelValue: item.unitPrice,
                              "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                              type: "number",
                              min: "0",
                              step: "0.01",
                              placeholder: "0.00",
                              class: "mt-0.5"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(_component_UiButton, {
                            variant: "ghost",
                            size: "icon",
                            class: "size-8 shrink-0",
                            onClick: ($event) => removeItem(index)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(X), { class: "size-4" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "flex items-center justify-between border-t pt-3" }, [
                      createVNode("p", { class: "text-sm font-medium" }, "Total"),
                      createVNode("p", { class: "text-lg font-bold" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Payment")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex flex-col gap-2 sm:flex-row" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode(_component_UiInput, {
                            modelValue: unref(salesForm).paidAmount,
                            "onUpdate:modelValue": ($event) => unref(salesForm).paidAmount = $event,
                            type: "number",
                            min: "0",
                            step: "0.01",
                            placeholder: "Paid amount"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(salesForm).paymentMethod,
                          "onUpdate:modelValue": ($event) => unref(salesForm).paymentMethod = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { class: "w-full sm:w-32" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue, { placeholder: "Method" })
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
                      ])
                    ]),
                    createVNode(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(saving) || unref(calculatedTotal) <= 0,
                      onClick: handleCreateSale
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(DollarSign), { class: "size-4" }),
                        createTextVNode(" " + toDisplayString(unref(saving) ? "Creating..." : "Create Sale"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/contacts/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DHPpw6Re.mjs.map
