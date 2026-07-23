import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, a as _sfc_main$4 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$2, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_10 } from './AppTable-fABlY_aP.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3, c as _sfc_main$1$3, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$8 } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$b } from './Input-pgd-3rGf.mjs';
import { defineComponent, ref, reactive, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { DollarSign } from '@lucide/vue';
import { g as getInvoiceColumns } from './column-DQCWh2FE.mjs';
import { u as useCustomersStore, f as fetchCustomersLookupApi } from './store-KONj_zbv.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
import { u as useSalesStore } from './store-Cqw4f2fz.mjs';
import { n as navigateTo } from './server.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './Textarea-B_fNd96X.mjs';
import './DropdownMenuTrigger-MlqyivDB.mjs';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
import '@tanstack/vue-table';
import './nuxt-link-DEwgn_ii.mjs';
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
import './index-CaQj38bB.mjs';
import 'pinia';
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

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "invoices",
  __ssrInlineRender: true,
  setup(__props) {
    const salesStore = useSalesStore();
    useCustomersStore();
    const statusFilter = ref("__all__");
    const customerFilter = ref("__all__");
    const page = ref(1);
    const showPayDialog = ref(false);
    const payForm = reactive({ amount: 0, paymentMethod: "CASH", notes: "" });
    const paying = ref(false);
    const selectedInvoiceId = ref("");
    function openPay(invoice) {
      const due = Number(invoice.totalAmount) - Number(invoice.paidAmount);
      if (due <= 0) {
        toast.error("Invoice is already paid");
        return;
      }
      selectedInvoiceId.value = invoice.id;
      payForm.amount = due;
      payForm.paymentMethod = "CASH";
      payForm.notes = "";
      showPayDialog.value = true;
    }
    async function submitPayment() {
      if (!payForm.amount || payForm.amount <= 0) {
        toast.error("Amount must be positive");
        return;
      }
      paying.value = true;
      try {
        await salesStore.payInvoice(selectedInvoiceId.value, {
          amount: payForm.amount,
          paymentMethod: payForm.paymentMethod,
          notes: payForm.notes || void 0
        });
        toast.success("Payment recorded");
        showPayDialog.value = false;
        await load();
      } catch {
        toast.error("Failed to record payment");
      } finally {
        paying.value = false;
      }
    }
    const invoiceActions = {
      onPay: (invoice) => openPay(invoice),
      onViewOrder: (orderId) => navigateTo(`/sales/${orderId}`)
    };
    const columns = getInvoiceColumns(invoiceActions);
    async function load() {
      await salesStore.fetchInvoices({
        status: statusFilter.value !== "__all__" ? statusFilter.value : void 0,
        customerId: customerFilter.value !== "__all__" ? customerFilter.value : void 0,
        page: page.value,
        limit
      });
    }
    watch([statusFilter, customerFilter], () => {
      page.value = 1;
      load();
    });
    watch(page, load);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$2;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiDialog = _sfc_main$9$1;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_UiLabel = _sfc_main$8;
      const _component_UiInput = _sfc_main$b;
      const _component_UiDialogFooter = _sfc_main$4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Invoices",
        description: "Track invoice statuses and payments"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              onClick: load
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DollarSign), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Refresh`);
                } else {
                  return [
                    createVNode(unref(DollarSign), { class: "size-4" }),
                    createTextVNode(" Refresh")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiButton, {
                variant: "outline",
                onClick: load
              }, {
                default: withCtx(() => [
                  createVNode(unref(DollarSign), { class: "size-4" }),
                  createTextVNode(" Refresh")
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
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(customerFilter),
                    "onUpdate:modelValue": ($event) => isRef(customerFilter) ? customerFilter.value = $event : null,
                    endpoint: unref(fetchCustomersLookupApi),
                    placeholder: "All Customers",
                    "include-all": "",
                    "all-value": "__all__",
                    "all-label": "All Customers",
                    class: "w-44"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(statusFilter),
                    "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-32" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "All Status" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue, { placeholder: "All Status" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`All Status`);
                                  } else {
                                    return [
                                      createTextVNode("All Status")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "UNPAID" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Unpaid`);
                                  } else {
                                    return [
                                      createTextVNode("Unpaid")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "PARTIAL" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Partial`);
                                  } else {
                                    return [
                                      createTextVNode("Partial")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "PAID" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Paid`);
                                  } else {
                                    return [
                                      createTextVNode("Paid")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CANCELLED" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Cancelled`);
                                  } else {
                                    return [
                                      createTextVNode("Cancelled")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                  default: withCtx(() => [
                                    createTextVNode("All Status")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "UNPAID" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Unpaid")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "PARTIAL" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Partial")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "PAID" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Paid")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CANCELLED" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cancelled")
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
                          createVNode(_component_UiSelectTrigger, { class: "w-32" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All Status" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx(() => [
                                  createTextVNode("All Status")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "UNPAID" }, {
                                default: withCtx(() => [
                                  createTextVNode("Unpaid")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "PARTIAL" }, {
                                default: withCtx(() => [
                                  createTextVNode("Partial")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "PAID" }, {
                                default: withCtx(() => [
                                  createTextVNode("Paid")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CANCELLED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancelled")
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
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(customerFilter),
                        "onUpdate:modelValue": ($event) => isRef(customerFilter) ? customerFilter.value = $event : null,
                        endpoint: unref(fetchCustomersLookupApi),
                        placeholder: "All Customers",
                        "include-all": "",
                        "all-value": "__all__",
                        "all-label": "All Customers",
                        class: "w-44"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(statusFilter),
                        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { class: "w-32" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All Status" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx(() => [
                                  createTextVNode("All Status")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "UNPAID" }, {
                                default: withCtx(() => [
                                  createTextVNode("Unpaid")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "PARTIAL" }, {
                                default: withCtx(() => [
                                  createTextVNode("Partial")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "PAID" }, {
                                default: withCtx(() => [
                                  createTextVNode("Paid")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CANCELLED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancelled")
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AppTable, {
                    data: unref(salesStore).invoices,
                    columns: unref(columns),
                    loading: unref(salesStore).loading,
                    "server-total": unref(salesStore).totalInvoices,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No invoices found",
                          description: "Invoices appear when sales orders are created"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No invoices found",
                            description: "Invoices appear when sales orders are created"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(salesStore).invoices,
                      columns: unref(columns),
                      loading: unref(salesStore).loading,
                      "server-total": unref(salesStore).totalInvoices,
                      "show-search": false,
                      "show-column-toggle": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No invoices found",
                          description: "Invoices appear when sales orders are created"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "columns", "loading", "server-total"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(customerFilter),
                      "onUpdate:modelValue": ($event) => isRef(customerFilter) ? customerFilter.value = $event : null,
                      endpoint: unref(fetchCustomersLookupApi),
                      placeholder: "All Customers",
                      "include-all": "",
                      "all-value": "__all__",
                      "all-label": "All Customers",
                      class: "w-44"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                    createVNode(_component_UiSelect, {
                      modelValue: unref(statusFilter),
                      "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiSelectTrigger, { class: "w-32" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectValue, { placeholder: "All Status" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelectContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectItem, { value: "__all__" }, {
                              default: withCtx(() => [
                                createTextVNode("All Status")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "UNPAID" }, {
                              default: withCtx(() => [
                                createTextVNode("Unpaid")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "PARTIAL" }, {
                              default: withCtx(() => [
                                createTextVNode("Partial")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "PAID" }, {
                              default: withCtx(() => [
                                createTextVNode("Paid")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "CANCELLED" }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelled")
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
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(salesStore).invoices,
                    columns: unref(columns),
                    loading: unref(salesStore).loading,
                    "server-total": unref(salesStore).totalInvoices,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No invoices found",
                        description: "Invoices appear when sales orders are created"
                      })
                    ]),
                    _: 1
                  }, 8, ["data", "columns", "loading", "server-total"])
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
            _push2(ssrRenderComponent(_component_UiDialogContent, null, {
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
                              _push5(`Enter payment details`);
                            } else {
                              return [
                                createTextVNode("Enter payment details")
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
                              createTextVNode("Enter payment details")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "payAmount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Amount *`);
                      } else {
                        return [
                          createTextVNode("Amount *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "payAmount",
                    modelValue: unref(payForm).amount,
                    "onUpdate:modelValue": ($event) => unref(payForm).amount = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "payMethod" }, {
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
                    modelValue: unref(payForm).paymentMethod,
                    "onUpdate:modelValue": ($event) => unref(payForm).paymentMethod = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "payMethod" }, {
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
                          createVNode(_component_UiSelectTrigger, { id: "payMethod" }, {
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
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "payNotes" }, {
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
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "payNotes",
                    modelValue: unref(payForm).notes,
                    "onUpdate:modelValue": ($event) => unref(payForm).notes = $event,
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
                          disabled: unref(paying) || !unref(payForm).amount
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(paying) ? "Recording..." : "Record Payment")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
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
                            disabled: unref(paying) || !unref(payForm).amount
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
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
                            createTextVNode("Enter payment details")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(submitPayment, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "payAmount" }, {
                          default: withCtx(() => [
                            createTextVNode("Amount *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "payAmount",
                          modelValue: unref(payForm).amount,
                          "onUpdate:modelValue": ($event) => unref(payForm).amount = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "0.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "payMethod" }, {
                          default: withCtx(() => [
                            createTextVNode("Payment Method")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(payForm).paymentMethod,
                          "onUpdate:modelValue": ($event) => unref(payForm).paymentMethod = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "payMethod" }, {
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
                        createVNode(_component_UiLabel, { for: "payNotes" }, {
                          default: withCtx(() => [
                            createTextVNode("Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "payNotes",
                          modelValue: unref(payForm).notes,
                          "onUpdate:modelValue": ($event) => unref(payForm).notes = $event,
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
                            disabled: unref(paying) || !unref(payForm).amount
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
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
              createVNode(_component_UiDialogContent, null, {
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
                          createTextVNode("Enter payment details")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(submitPayment, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "payAmount" }, {
                        default: withCtx(() => [
                          createTextVNode("Amount *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "payAmount",
                        modelValue: unref(payForm).amount,
                        "onUpdate:modelValue": ($event) => unref(payForm).amount = $event,
                        type: "number",
                        step: "0.01",
                        placeholder: "0.00"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "payMethod" }, {
                        default: withCtx(() => [
                          createTextVNode("Payment Method")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(payForm).paymentMethod,
                        "onUpdate:modelValue": ($event) => unref(payForm).paymentMethod = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { id: "payMethod" }, {
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
                      createVNode(_component_UiLabel, { for: "payNotes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "payNotes",
                        modelValue: unref(payForm).notes,
                        "onUpdate:modelValue": ($event) => unref(payForm).notes = $event,
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
                          disabled: unref(paying) || !unref(payForm).amount
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sales/invoices.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=invoices-BWJjT7PH.mjs.map
