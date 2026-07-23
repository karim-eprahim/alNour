import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4, e as _sfc_main$2$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$5 } from './Label-Di1i-yIq.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$7 } from './Separator-2kwi4XBY.mjs';
import { _ as _sfc_main$8 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$9, c as _sfc_main$9$1, d as _sfc_main$7$1 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$8$1, a as _sfc_main$b, b as _sfc_main$4$1, c as _sfc_main$1$3, d as _sfc_main$7$2, e as _sfc_main$5$1 } from './TableHeader-Cc67ZnYT.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { ArrowLeft, Plus, X, ShoppingCart } from '@lucide/vue';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useCustomersStore, f as fetchCustomersLookupApi } from './store-KONj_zbv.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { f as fetchProductsLookupApi } from './api-Dq8IcxCC.mjs';
import { u as useSalesStore } from './store-Cqw4f2fz.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    useSalesStore();
    useCustomersStore();
    useWarehousesStore();
    const productsStore = useProductsStore();
    const saving = ref(false);
    const form = reactive({
      customerId: "",
      warehouseId: "",
      paidAmount: 0,
      paymentMethod: "CASH",
      paymentNotes: "",
      items: []
    });
    computed(
      () => productsStore.products.filter((p) => p.type === "PACKAGED_CHARCOAL" || p.type === "OTHER")
    );
    function addItem() {
      form.items.push({ productId: "", quantity: null, unitPrice: null });
    }
    function removeItem(index) {
      form.items.splice(index, 1);
    }
    const calculatedTotal = computed(() => {
      return form.items.reduce((sum, item) => {
        const qty = item.quantity || 0;
        const price = item.unitPrice || 0;
        return sum + qty * price;
      }, 0);
    });
    const remainingDue = computed(() => Math.max(0, calculatedTotal.value - (form.paidAmount || 0)));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiLabel = _sfc_main$5;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiSeparator = _sfc_main$7;
      const _component_UiInput = _sfc_main$8;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$9;
      const _component_UiSelectContent = _sfc_main$9$1;
      const _component_UiSelectItem = _sfc_main$7$1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8$1;
      const _component_UiTableHeader = _sfc_main$b;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$3;
      const _component_UiTableBody = _sfc_main$7$2;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_UiCardFooter = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/sales/orders")
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
      _push(ssrRenderComponent(PageHeader, {
        title: "New Sales Order",
        description: "Create an order with products and payment"
      }, null, _parent));
      _push(`</div><form><div class="grid gap-6 lg:grid-cols-2">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Order Details`);
                      } else {
                        return [
                          createTextVNode("Order Details")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Customer, warehouse, and payment info`);
                      } else {
                        return [
                          createTextVNode("Customer, warehouse, and payment info")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Order Details")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Customer, warehouse, and payment info")
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
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "customer" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Customer *`);
                      } else {
                        return [
                          createTextVNode("Customer *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(form).customerId,
                    "onUpdate:modelValue": ($event) => unref(form).customerId = $event,
                    endpoint: unref(fetchCustomersLookupApi),
                    placeholder: "Select customer..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "warehouse" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Warehouse *`);
                      } else {
                        return [
                          createTextVNode("Warehouse *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(form).warehouseId,
                    "onUpdate:modelValue": ($event) => unref(form).warehouseId = $event,
                    endpoint: unref(fetchWarehousesLookupApi),
                    placeholder: "Select warehouse..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiSeparator, null, null, _parent3, _scopeId2));
                  _push3(`<div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "paidAmount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Amount Paid Now`);
                      } else {
                        return [
                          createTextVNode("Amount Paid Now")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "paidAmount",
                    modelValue: unref(form).paidAmount,
                    "onUpdate:modelValue": ($event) => unref(form).paidAmount = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "paymentMethod" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Payment Method`);
                      } else {
                        return [
                          createTextVNode("Payment Method")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(form).paymentMethod,
                    "onUpdate:modelValue": ($event) => unref(form).paymentMethod = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "paymentMethod" }, {
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
                          createVNode(_component_UiSelectTrigger, { id: "paymentMethod" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
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
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "paymentNotes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Payment Notes`);
                      } else {
                        return [
                          createTextVNode("Payment Notes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "paymentNotes",
                    modelValue: unref(form).paymentNotes,
                    "onUpdate:modelValue": ($event) => unref(form).paymentNotes = $event,
                    placeholder: "Optional"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  if (unref(calculatedTotal) > 0) {
                    _push3(`<div class="rounded-lg bg-muted p-3 space-y-1"${_scopeId2}><div class="flex justify-between text-sm"${_scopeId2}><span${_scopeId2}>Total</span><span class="font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(unref(calculatedTotal).toFixed(2))}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span${_scopeId2}>Paid</span><span class="tabular-nums text-green-600"${_scopeId2}>${ssrInterpolate((unref(form).paidAmount || 0).toFixed(2))}</span></div>`);
                    _push3(ssrRenderComponent(_component_UiSeparator, null, null, _parent3, _scopeId2));
                    _push3(`<div class="flex justify-between text-sm font-medium"${_scopeId2}><span${_scopeId2}>Remaining Due</span><span class="tabular-nums text-destructive"${_scopeId2}>${ssrInterpolate(unref(remainingDue).toFixed(2))}</span></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "customer" }, {
                        default: withCtx(() => [
                          createTextVNode("Customer *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(form).customerId,
                        "onUpdate:modelValue": ($event) => unref(form).customerId = $event,
                        endpoint: unref(fetchCustomersLookupApi),
                        placeholder: "Select customer..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "warehouse" }, {
                        default: withCtx(() => [
                          createTextVNode("Warehouse *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(form).warehouseId,
                        "onUpdate:modelValue": ($event) => unref(form).warehouseId = $event,
                        endpoint: unref(fetchWarehousesLookupApi),
                        placeholder: "Select warehouse..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode(_component_UiSeparator),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "paidAmount" }, {
                        default: withCtx(() => [
                          createTextVNode("Amount Paid Now")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "paidAmount",
                        modelValue: unref(form).paidAmount,
                        "onUpdate:modelValue": ($event) => unref(form).paidAmount = $event,
                        type: "number",
                        step: "0.01",
                        placeholder: "0.00"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "paymentMethod" }, {
                          default: withCtx(() => [
                            createTextVNode("Payment Method")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(form).paymentMethod,
                          "onUpdate:modelValue": ($event) => unref(form).paymentMethod = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "paymentMethod" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue)
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
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "paymentNotes" }, {
                          default: withCtx(() => [
                            createTextVNode("Payment Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "paymentNotes",
                          modelValue: unref(form).paymentNotes,
                          "onUpdate:modelValue": ($event) => unref(form).paymentNotes = $event,
                          placeholder: "Optional"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    unref(calculatedTotal) > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "rounded-lg bg-muted p-3 space-y-1"
                    }, [
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", null, "Total"),
                        createVNode("span", { class: "font-bold tabular-nums" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", null, "Paid"),
                        createVNode("span", { class: "tabular-nums text-green-600" }, toDisplayString((unref(form).paidAmount || 0).toFixed(2)), 1)
                      ]),
                      createVNode(_component_UiSeparator),
                      createVNode("div", { class: "flex justify-between text-sm font-medium" }, [
                        createVNode("span", null, "Remaining Due"),
                        createVNode("span", { class: "tabular-nums text-destructive" }, toDisplayString(unref(remainingDue).toFixed(2)), 1)
                      ])
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
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Order Details")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Customer, warehouse, and payment info")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_UiLabel, { for: "customer" }, {
                      default: withCtx(() => [
                        createTextVNode("Customer *")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(form).customerId,
                      "onUpdate:modelValue": ($event) => unref(form).customerId = $event,
                      endpoint: unref(fetchCustomersLookupApi),
                      placeholder: "Select customer..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_UiLabel, { for: "warehouse" }, {
                      default: withCtx(() => [
                        createTextVNode("Warehouse *")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(form).warehouseId,
                      "onUpdate:modelValue": ($event) => unref(form).warehouseId = $event,
                      endpoint: unref(fetchWarehousesLookupApi),
                      placeholder: "Select warehouse..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                  ]),
                  createVNode(_component_UiSeparator),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_UiLabel, { for: "paidAmount" }, {
                      default: withCtx(() => [
                        createTextVNode("Amount Paid Now")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiInput, {
                      id: "paidAmount",
                      modelValue: unref(form).paidAmount,
                      "onUpdate:modelValue": ($event) => unref(form).paidAmount = $event,
                      type: "number",
                      step: "0.01",
                      placeholder: "0.00"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "paymentMethod" }, {
                        default: withCtx(() => [
                          createTextVNode("Payment Method")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(form).paymentMethod,
                        "onUpdate:modelValue": ($event) => unref(form).paymentMethod = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { id: "paymentMethod" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
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
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "paymentNotes" }, {
                        default: withCtx(() => [
                          createTextVNode("Payment Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "paymentNotes",
                        modelValue: unref(form).paymentNotes,
                        "onUpdate:modelValue": ($event) => unref(form).paymentNotes = $event,
                        placeholder: "Optional"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  unref(calculatedTotal) > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-lg bg-muted p-3 space-y-1"
                  }, [
                    createVNode("div", { class: "flex justify-between text-sm" }, [
                      createVNode("span", null, "Total"),
                      createVNode("span", { class: "font-bold tabular-nums" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between text-sm" }, [
                      createVNode("span", null, "Paid"),
                      createVNode("span", { class: "tabular-nums text-green-600" }, toDisplayString((unref(form).paidAmount || 0).toFixed(2)), 1)
                    ]),
                    createVNode(_component_UiSeparator),
                    createVNode("div", { class: "flex justify-between text-sm font-medium" }, [
                      createVNode("span", null, "Remaining Due"),
                      createVNode("span", { class: "tabular-nums text-destructive" }, toDisplayString(unref(remainingDue).toFixed(2)), 1)
                    ])
                  ])) : createCommentVNode("", true)
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
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Order Items`);
                      } else {
                        return [
                          createTextVNode("Order Items")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Products being sold`);
                      } else {
                        return [
                          createTextVNode("Products being sold")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: addItem
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Add Item `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "size-4" }),
                          createTextVNode(" Add Item ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Order Items")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Products being sold")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_UiButton, {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: addItem
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "size-4" }),
                        createTextVNode(" Add Item ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).items.length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No items added",
                      description: "Add products to this order",
                      action: "Add Item",
                      onAction: addItem
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(ssrRenderComponent(_component_UiTable, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiTableHeader, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiTableRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "w-8" }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Product`);
                                          } else {
                                            return [
                                              createTextVNode("Product")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Quantity`);
                                          } else {
                                            return [
                                              createTextVNode("Quantity")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Unit Price`);
                                          } else {
                                            return [
                                              createTextVNode("Unit Price")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Total`);
                                          } else {
                                            return [
                                              createTextVNode("Total")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHead, { class: "w-8" }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Product")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Quantity")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Unit Price")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Total")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, { class: "w-8" }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Product")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Quantity")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Unit Price")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Total")
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
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiTableBody, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(form).items, (item, i) => {
                                  _push5(ssrRenderComponent(_component_UiTableRow, { key: i }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_UiButton, {
                                                type: "button",
                                                variant: "ghost",
                                                size: "icon-xs",
                                                class: "text-destructive",
                                                onClick: ($event) => removeItem(i)
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(unref(X), { class: "size-3.5" }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(unref(X), { class: "size-3.5" })
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiButton, {
                                                  type: "button",
                                                  variant: "ghost",
                                                  size: "icon-xs",
                                                  class: "text-destructive",
                                                  onClick: ($event) => removeItem(i)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(X), { class: "size-3.5" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_LookupCombobox, {
                                                modelValue: item.productId,
                                                "onUpdate:modelValue": ($event) => item.productId = $event,
                                                endpoint: unref(fetchProductsLookupApi),
                                                "label-key": "_label",
                                                placeholder: "Select...",
                                                class: "w-56"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_LookupCombobox, {
                                                  modelValue: item.productId,
                                                  "onUpdate:modelValue": ($event) => item.productId = $event,
                                                  endpoint: unref(fetchProductsLookupApi),
                                                  "label-key": "_label",
                                                  placeholder: "Select...",
                                                  class: "w-56"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_UiInput, {
                                                modelValue: item.quantity,
                                                "onUpdate:modelValue": ($event) => item.quantity = $event,
                                                type: "number",
                                                step: "0.001",
                                                placeholder: "0",
                                                class: "w-24 text-right"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiInput, {
                                                  modelValue: item.quantity,
                                                  "onUpdate:modelValue": ($event) => item.quantity = $event,
                                                  type: "number",
                                                  step: "0.001",
                                                  placeholder: "0",
                                                  class: "w-24 text-right"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_UiInput, {
                                                modelValue: item.unitPrice,
                                                "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                                type: "number",
                                                step: "0.01",
                                                placeholder: "0.00",
                                                class: "w-24 text-right"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiInput, {
                                                  modelValue: item.unitPrice,
                                                  "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                                  type: "number",
                                                  step: "0.01",
                                                  placeholder: "0.00",
                                                  class: "w-24 text-right"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiButton, {
                                                type: "button",
                                                variant: "ghost",
                                                size: "icon-xs",
                                                class: "text-destructive",
                                                onClick: ($event) => removeItem(i)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(X), { class: "size-3.5" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_LookupCombobox, {
                                                modelValue: item.productId,
                                                "onUpdate:modelValue": ($event) => item.productId = $event,
                                                endpoint: unref(fetchProductsLookupApi),
                                                "label-key": "_label",
                                                placeholder: "Select...",
                                                class: "w-56"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiInput, {
                                                modelValue: item.quantity,
                                                "onUpdate:modelValue": ($event) => item.quantity = $event,
                                                type: "number",
                                                step: "0.001",
                                                placeholder: "0",
                                                class: "w-24 text-right"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiInput, {
                                                modelValue: item.unitPrice,
                                                "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                                type: "number",
                                                step: "0.01",
                                                placeholder: "0.00",
                                                class: "w-24 text-right"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(form).items, (item, i) => {
                                    return openBlock(), createBlock(_component_UiTableRow, { key: i }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiButton, {
                                              type: "button",
                                              variant: "ghost",
                                              size: "icon-xs",
                                              class: "text-destructive",
                                              onClick: ($event) => removeItem(i)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(X), { class: "size-3.5" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_LookupCombobox, {
                                              modelValue: item.productId,
                                              "onUpdate:modelValue": ($event) => item.productId = $event,
                                              endpoint: unref(fetchProductsLookupApi),
                                              "label-key": "_label",
                                              placeholder: "Select...",
                                              class: "w-56"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiInput, {
                                              modelValue: item.quantity,
                                              "onUpdate:modelValue": ($event) => item.quantity = $event,
                                              type: "number",
                                              step: "0.001",
                                              placeholder: "0",
                                              class: "w-24 text-right"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiInput, {
                                              modelValue: item.unitPrice,
                                              "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                              type: "number",
                                              step: "0.01",
                                              placeholder: "0.00",
                                              class: "w-24 text-right"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
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
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiTableHeader, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableRow, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHead, { class: "w-8" }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Product")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Quantity")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Unit Price")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Total")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(form).items, (item, i) => {
                                  return openBlock(), createBlock(_component_UiTableRow, { key: i }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiButton, {
                                            type: "button",
                                            variant: "ghost",
                                            size: "icon-xs",
                                            class: "text-destructive",
                                            onClick: ($event) => removeItem(i)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(X), { class: "size-3.5" })
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_LookupCombobox, {
                                            modelValue: item.productId,
                                            "onUpdate:modelValue": ($event) => item.productId = $event,
                                            endpoint: unref(fetchProductsLookupApi),
                                            "label-key": "_label",
                                            placeholder: "Select...",
                                            class: "w-56"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiInput, {
                                            modelValue: item.quantity,
                                            "onUpdate:modelValue": ($event) => item.quantity = $event,
                                            type: "number",
                                            step: "0.001",
                                            placeholder: "0",
                                            class: "w-24 text-right"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiInput, {
                                            modelValue: item.unitPrice,
                                            "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                            type: "number",
                                            step: "0.01",
                                            placeholder: "0.00",
                                            class: "w-24 text-right"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
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
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    unref(form).items.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No items added",
                        description: "Add products to this order",
                        action: "Add Item",
                        onAction: addItem
                      })
                    ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiTableRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHead, { class: "w-8" }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Product")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Quantity")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Unit Price")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Total")
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).items, (item, i) => {
                              return openBlock(), createBlock(_component_UiTableRow, { key: i }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiButton, {
                                        type: "button",
                                        variant: "ghost",
                                        size: "icon-xs",
                                        class: "text-destructive",
                                        onClick: ($event) => removeItem(i)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(X), { class: "size-3.5" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_LookupCombobox, {
                                        modelValue: item.productId,
                                        "onUpdate:modelValue": ($event) => item.productId = $event,
                                        endpoint: unref(fetchProductsLookupApi),
                                        "label-key": "_label",
                                        placeholder: "Select...",
                                        class: "w-56"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiInput, {
                                        modelValue: item.quantity,
                                        "onUpdate:modelValue": ($event) => item.quantity = $event,
                                        type: "number",
                                        step: "0.001",
                                        placeholder: "0",
                                        class: "w-24 text-right"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiInput, {
                                        modelValue: item.unitPrice,
                                        "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                        type: "number",
                                        step: "0.01",
                                        placeholder: "0.00",
                                        class: "w-24 text-right"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
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
            }, _parent2, _scopeId));
            if (unref(form).items.length > 0) {
              _push2(ssrRenderComponent(_component_UiCardFooter, { class: "border-t px-4 py-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between w-full"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(form).items.length)} item(s)</p><div class="text-right"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Total Amount</p><p class="text-xl font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(unref(calculatedTotal).toFixed(2))}</p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between w-full" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).items.length) + " item(s)", 1),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Amount"),
                          createVNode("p", { class: "text-xl font-bold tabular-nums" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Order Items")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Products being sold")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: addItem
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Plus), { class: "size-4" }),
                      createTextVNode(" Add Item ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx(() => [
                  unref(form).items.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No items added",
                      description: "Add products to this order",
                      action: "Add Item",
                      onAction: addItem
                    })
                  ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                    default: withCtx(() => [
                      createVNode(_component_UiTableHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiTableRow, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHead, { class: "w-8" }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Product")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Quantity")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Unit Price")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Total")
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).items, (item, i) => {
                            return openBlock(), createBlock(_component_UiTableRow, { key: i }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiButton, {
                                      type: "button",
                                      variant: "ghost",
                                      size: "icon-xs",
                                      class: "text-destructive",
                                      onClick: ($event) => removeItem(i)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(X), { class: "size-3.5" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_LookupCombobox, {
                                      modelValue: item.productId,
                                      "onUpdate:modelValue": ($event) => item.productId = $event,
                                      endpoint: unref(fetchProductsLookupApi),
                                      "label-key": "_label",
                                      placeholder: "Select...",
                                      class: "w-56"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiInput, {
                                      modelValue: item.quantity,
                                      "onUpdate:modelValue": ($event) => item.quantity = $event,
                                      type: "number",
                                      step: "0.001",
                                      placeholder: "0",
                                      class: "w-24 text-right"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiInput, {
                                      modelValue: item.unitPrice,
                                      "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                      type: "number",
                                      step: "0.01",
                                      placeholder: "0.00",
                                      class: "w-24 text-right"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
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
              }),
              unref(form).items.length > 0 ? (openBlock(), createBlock(_component_UiCardFooter, {
                key: 0,
                class: "border-t px-4 py-3"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between w-full" }, [
                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).items.length) + " item(s)", 1),
                    createVNode("div", { class: "text-right" }, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Amount"),
                      createVNode("p", { class: "text-xl font-bold tabular-nums" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
                    ])
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex justify-end gap-3 mt-6">`);
      _push(ssrRenderComponent(_component_UiButton, {
        type: "button",
        variant: "outline",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/sales/orders")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cancel`);
          } else {
            return [
              createTextVNode("Cancel")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiButton, {
        type: "submit",
        disabled: unref(saving) || !unref(form).customerId || !unref(form).warehouseId || unref(form).items.length === 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ShoppingCart), { class: "size-4" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(saving) ? "Creating..." : "Create Order")}`);
          } else {
            return [
              createVNode(unref(ShoppingCart), { class: "size-4" }),
              createTextVNode(" " + toDisplayString(unref(saving) ? "Creating..." : "Create Order"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sales/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-C4rdYtIC.mjs.map
