import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, d as _sfc_main$3 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$4 } from './index-CaQj38bB.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { ArrowLeft, Phone, MapPin, ShoppingCart, Receipt, Calendar, CreditCard } from '@lucide/vue';
import { a as useRoute, n as navigateTo } from './server.mjs';
import { u as useCustomersStore } from './store-KONj_zbv.mjs';
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
    const customersStore = useCustomersStore();
    useDistributorStore();
    const customer = ref(null);
    const loading = ref(true);
    const activeTab = ref("invoices");
    const invoices = ref([]);
    const orders = ref([]);
    const ledgerEntries = ref([]);
    const invoicesLoading = ref(false);
    async function load() {
      loading.value = true;
      try {
        const id = route.params.id;
        await customersStore.fetchCustomer(id);
        customer.value = customersStore.currentCustomer;
        await Promise.all([loadInvoices(), loadOrders()]);
      } finally {
        loading.value = false;
      }
    }
    async function loadInvoices() {
      invoicesLoading.value = true;
      try {
        const data = await $fetch("/api/invoices", { params: { customerId: route.params.id, limit: 50 } });
        invoices.value = data.invoices || [];
      } finally {
        invoicesLoading.value = false;
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
      } else if (unref(customer)) {
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
                    _push3(`</div><div class="text-right"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Balance</p><p class="${ssrRenderClass([(unref(customer).balance || 0) > 0 ? "text-green-600" : (unref(customer).balance || 0) < 0 ? "text-red-600" : "", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate((unref(customer).balance || 0).toFixed(2))}</p></div></div><div class="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground"${_scopeId2}><span class="flex items-center gap-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ShoppingCart), { class: "size-3.5" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(customer)._count?.salesOrders || 0)} orders</span><span class="flex items-center gap-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Receipt), { class: "size-3.5" }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(unref(customer)._count?.invoices || 0)} invoices</span><span class="flex items-center gap-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Calendar), { class: "size-3.5" }, null, _parent3, _scopeId2));
                    _push3(` Since ${ssrInterpolate(new Date(unref(customer).createdAt).toLocaleDateString())}</span></div>`);
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
                        createVNode("div", { class: "text-right" }, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Balance"),
                          createVNode("p", {
                            class: ["text-2xl font-bold", (unref(customer).balance || 0) > 0 ? "text-green-600" : (unref(customer).balance || 0) < 0 ? "text-red-600" : ""]
                          }, toDisplayString((unref(customer).balance || 0).toFixed(2)), 3)
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
                          createTextVNode(" Since " + toDisplayString(new Date(unref(customer).createdAt).toLocaleDateString()), 1)
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
                      createVNode("div", { class: "text-right" }, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Balance"),
                        createVNode("p", {
                          class: ["text-2xl font-bold", (unref(customer).balance || 0) > 0 ? "text-green-600" : (unref(customer).balance || 0) < 0 ? "text-red-600" : ""]
                        }, toDisplayString((unref(customer).balance || 0).toFixed(2)), 3)
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
                        createTextVNode(" Since " + toDisplayString(new Date(unref(customer).createdAt).toLocaleDateString()), 1)
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
        ssrRenderList([{ key: "invoices", label: "Invoices", icon: unref(Receipt) }, { key: "orders", label: "Orders", icon: unref(ShoppingCart) }, { key: "ledger", label: "Ledger", icon: unref(CreditCard) }], (tab) => {
          _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground", "flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px"])}">`);
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
            _push(`<div class="flex items-center justify-between rounded-lg border p-3 text-sm"><div class="min-w-0 flex-1"><p class="font-medium truncate">${ssrInterpolate(inv.invoiceNumber)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(new Date(inv.createdAt).toLocaleDateString())}</p></div><div class="flex items-center gap-2 shrink-0 ml-2"><p class="font-semibold">${ssrInterpolate(inv.totalAmount.toFixed(2))}</p>`);
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
            _push(`<div class="flex items-center justify-between rounded-lg border p-3 text-sm"><div class="min-w-0 flex-1"><p class="font-medium truncate">${ssrInterpolate(order.orderNumber)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(new Date(order.createdAt).toLocaleDateString())}</p></div><div class="flex items-center gap-2 shrink-0 ml-2"><p class="font-semibold">${ssrInterpolate(order.totalAmount.toFixed(2))}</p>`);
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
            _push(`</div><span class="${ssrRenderClass([entry.type === "DEBIT" ? "text-red-600" : "text-green-600", "font-semibold shrink-0 ml-2"])}">${ssrInterpolate(entry.type === "DEBIT" ? "-" : "+")}${ssrInterpolate(entry.amount.toFixed(2))}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
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
//# sourceMappingURL=_id_-B7DR-RPq.mjs.map
