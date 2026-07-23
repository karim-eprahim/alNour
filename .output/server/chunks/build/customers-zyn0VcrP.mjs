import { _ as _sfc_main$1 } from './Input-DA89G3IO.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-y5B8zlzY.mjs';
import { _ as _sfc_main$6, d as _sfc_main$4, a as _sfc_main$1$1, b as _sfc_main$3 } from './CardTitle-St-iDBLB.mjs';
import { _ as _sfc_main$2 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$5 } from './Label-fqACuvH5.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-KK7k7FV7.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$7, c as _sfc_main$9, d as _sfc_main$7$1 } from './SelectValue-CDW_Y5sR.mjs';
import { defineComponent, ref, reactive, computed, resolveComponent, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Search, Users, ShoppingCart, ArrowLeft, Plus, DollarSign } from '@lucide/vue';
import { u as useDistributorStore } from './store-c63gT4nW.mjs';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
import '@vueuse/core';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import 'reka-ui';
import './Textarea-BYfzemxZ.mjs';
import './api-Dq8IcxCC.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "customers",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const productsStore = useProductsStore();
    const customers = ref([]);
    const customerSearch = ref("");
    const customerLoading = ref(false);
    const showSaleForm = ref(false);
    const salesForm = reactive({
      customerId: "",
      customerName: "",
      warehouseId: "",
      paidAmount: 0,
      paymentMethod: "CASH",
      items: []
    });
    const products = computed(
      () => productsStore.products.filter((p) => p.type === "PACKAGED_CHARCOAL" || p.type === "OTHER")
    );
    const calculatedTotal = computed(
      () => salesForm.items.reduce((sum, i) => sum + (i.quantity || 0) * (i.unitPrice || 0), 0)
    );
    const saving = ref(false);
    async function searchCustomers(q) {
      if (q.length < 2) return;
      customerLoading.value = true;
      try {
        const data = await $fetch("/api/customers/lookup", { params: { q, take: 20 } });
        customers.value = data.items;
      } finally {
        customerLoading.value = false;
      }
    }
    const debouncedSearch = useDebounceFn(searchCustomers, 300);
    function selectCustomer(c) {
      salesForm.customerId = c.value;
      salesForm.customerName = c.label;
      showSaleForm.value = true;
    }
    function addItem() {
      salesForm.items.push({ productId: "", productName: "", quantity: null, unitPrice: null });
    }
    function removeItem(index) {
      salesForm.items.splice(index, 1);
    }
    function selectProduct(index, productId) {
      const p = products.value.find((pr) => pr.id === productId);
      if (p) {
        salesForm.items[index].productId = p.id;
        salesForm.items[index].productName = p.name;
        if (!salesForm.items[index].unitPrice) {
          salesForm.items[index].unitPrice = p.sellingPrice ? Number(p.sellingPrice) : null;
        }
      }
    }
    async function handleCreateSale() {
      if (!salesForm.customerId || !salesForm.warehouseId || salesForm.items.length === 0) {
        toast.error("Customer, warehouse, and at least one item are required");
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
        salesForm.customerId = "";
        salesForm.customerName = "";
        salesForm.paidAmount = 0;
        salesForm.items = [];
        await store.fetchCustody();
        await store.fetchCashOnHand();
      } catch (err) {
        toast.error(err?.message || "Failed to create sale");
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiButton = _sfc_main$2;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_UiLabel = _sfc_main$5;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$7;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7$1;
      const _component_X = resolveComponent("X");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Customers</h1><p class="text-sm text-muted-foreground">Select a customer to create a new sale</p></div></div>`);
      if (!unref(showSaleForm)) {
        _push(`<div><div class="relative mb-4">`);
        _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          modelValue: unref(customerSearch),
          "onUpdate:modelValue": ($event) => isRef(customerSearch) ? customerSearch.value = $event : null,
          placeholder: "Search customers...",
          class: "pl-9",
          onInput: ($event) => unref(debouncedSearch)(unref(customerSearch))
        }, null, _parent));
        _push(`</div>`);
        if (unref(customerLoading)) {
          _push(`<div class="flex justify-center py-8">`);
          _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
          _push(`</div>`);
        } else if (unref(customers).length === 0) {
          _push(`<div class="text-center py-8 text-sm text-muted-foreground">`);
          _push(ssrRenderComponent(unref(Users), { class: "mx-auto mb-2 size-8 text-muted-foreground/60" }, null, _parent));
          _push(`<p>Search for a customer to start</p></div>`);
        } else {
          _push(`<div class="grid gap-2"><!--[-->`);
          ssrRenderList(unref(customers), (c) => {
            _push(ssrRenderComponent(_component_UiCard, {
              key: c.value,
              class: "cursor-pointer transition-colors hover:bg-accent/50",
              onClick: ($event) => selectCustomer(c)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex items-center justify-between p-4" }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(c.label)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(c.subtitle || "")}</p></div>`);
                        _push3(ssrRenderComponent(unref(ShoppingCart), { class: "size-5 text-muted-foreground" }, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium" }, toDisplayString(c.label), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(c.subtitle || ""), 1)
                          ]),
                          createVNode(unref(ShoppingCart), { class: "size-5 text-muted-foreground" })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UiCardContent, { class: "flex items-center justify-between p-4" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium" }, toDisplayString(c.label), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(c.subtitle || ""), 1)
                        ]),
                        createVNode(unref(ShoppingCart), { class: "size-5 text-muted-foreground" })
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
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
        _push(`<div><h2 class="text-lg font-semibold">New Sale</h2><p class="text-sm text-muted-foreground">Customer: ${ssrInterpolate(unref(salesForm).customerName)}</p></div></div>`);
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
                      endpoint: (params) => _ctx.$fetch("/api/warehouses/lookup", { params }),
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
                            _push4(ssrRenderComponent(_component_X, { class: "size-4" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_X, { class: "size-4" })
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
                          endpoint: (params) => _ctx.$fetch("/api/warehouses/lookup", { params }),
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
                                createVNode(_component_X, { class: "size-4" })
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
                        endpoint: (params) => _ctx.$fetch("/api/warehouses/lookup", { params }),
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
                              createVNode(_component_X, { class: "size-4" })
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
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/customers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=customers-zyn0VcrP.mjs.map
