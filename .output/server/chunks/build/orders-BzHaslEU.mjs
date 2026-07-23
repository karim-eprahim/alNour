import { _ as _sfc_main$1 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$1, b as _sfc_main$2, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$3 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$4 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$2, c as _sfc_main$5, a as _sfc_main$4$1, d as _sfc_main$3$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$8 } from './Label-Di1i-yIq.mjs';
import { defineComponent, ref, reactive, watch, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Search, ClipboardList, ArrowLeft, CircleCheck } from '@lucide/vue';
import { u as useDistributorStore } from './store-c63gT4nW.mjs';
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
import 'reka-ui';
import 'class-variance-authority';

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "orders",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const search = ref("");
    const statusFilter = ref("__all__");
    const page = ref(1);
    const showDetail = ref(false);
    const selectedOrder = ref(null);
    const completeForm = reactive({
      paidAmount: 0,
      paymentMethod: "CASH"
    });
    const completing = ref(false);
    const statusOptions = [
      { value: "__all__", label: "All" },
      { value: "PENDING", label: "Pending" },
      { value: "ASSIGNED", label: "Assigned" },
      { value: "ACCEPTED", label: "Accepted" },
      { value: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
      { value: "DELIVERED", label: "Delivered" },
      { value: "COMPLETED", label: "Completed" }
    ];
    async function load() {
      const status = statusFilter.value !== "__all__" ? statusFilter.value : void 0;
      await store.fetchOrders({ search: search.value || void 0, status, page: page.value, limit });
    }
    watch([search, statusFilter], () => {
      page.value = 1;
      load();
    });
    watch(page, load);
    async function handleComplete() {
      if (!selectedOrder.value) return;
      completing.value = true;
      try {
        await store.completeDelivery(selectedOrder.value.id, {
          paidAmount: completeForm.paidAmount || 0,
          paymentMethod: completeForm.paymentMethod
        });
        toast.success(`Order ${selectedOrder.value.orderNumber} delivered`);
        showDetail.value = false;
        selectedOrder.value = null;
        await load();
        await store.fetchCashOnHand();
      } catch (err) {
        toast.error(err?.message || "Failed to complete delivery");
      } finally {
        completing.value = false;
      }
    }
    const canComplete = (status) => ["PENDING", "ASSIGNED", "ACCEPTED", "OUT_FOR_DELIVERY"].includes(status);
    const statusVariant = (s) => {
      const map = {
        PENDING: "secondary",
        ASSIGNED: "default",
        ACCEPTED: "outline",
        OUT_FOR_DELIVERY: "default",
        DELIVERED: "secondary",
        COMPLETED: "success",
        CANCELLED: "destructive"
      };
      return map[s] || "secondary";
    };
    function statusLabel(s) {
      const map = {
        PENDING: "Pending",
        ASSIGNED: "Assigned",
        ACCEPTED: "Accepted",
        OUT_FOR_DELIVERY: "Out for Delivery",
        DELIVERED: "Delivered",
        COMPLETED: "Completed",
        CANCELLED: "Cancelled"
      };
      return map[s] || s;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$1;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$1;
      const _component_UiSelectValue = _sfc_main$2;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiBadge = _sfc_main$3;
      const _component_UiButton = _sfc_main$4;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$5;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiLabel = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Orders</h1><p class="text-sm text-muted-foreground">Orders assigned to you</p></div></div>`);
      if (!unref(showDetail)) {
        _push(`<div><div class="mb-4 flex flex-col gap-2 sm:flex-row"><div class="relative flex-1">`);
        _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          modelValue: unref(search),
          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
          placeholder: "Search orders...",
          class: "pl-9"
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UiSelect, {
          modelValue: unref(statusFilter),
          "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full sm:w-40" }, {
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
                createVNode(_component_UiSelectTrigger, { class: "w-full sm:w-40" }, {
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
        } else if (unref(store).orders.length === 0) {
          _push(`<div class="text-center py-12 text-sm text-muted-foreground">`);
          _push(ssrRenderComponent(unref(ClipboardList), { class: "mx-auto mb-2 size-8 text-muted-foreground/60" }, null, _parent));
          _push(`<p>No orders assigned to you</p></div>`);
        } else {
          _push(`<div class="grid gap-2"><!--[-->`);
          ssrRenderList(unref(store).orders, (order) => {
            _push(`<div class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50 cursor-pointer"><div class="min-w-0 flex-1"><p class="text-sm font-medium truncate">${ssrInterpolate(order.orderNumber)}</p><p class="text-xs text-muted-foreground truncate">${ssrInterpolate(order.customer?.name)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(order.warehouse?.name)}</p></div><div class="flex flex-col items-end gap-1 shrink-0">`);
            _push(ssrRenderComponent(_component_UiBadge, {
              variant: statusVariant(order.status),
              class: "text-[10px]"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(statusLabel(order.status))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(statusLabel(order.status)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<p class="text-sm font-semibold">${ssrInterpolate(order.totalAmount.toFixed(2))}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else if (unref(selectedOrder)) {
        _push(`<div class="space-y-6"><div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          size: "icon",
          class: "size-8 shrink-0",
          onClick: ($event) => showDetail.value = false
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
        _push(`<div><h2 class="text-lg font-semibold">${ssrInterpolate(unref(selectedOrder).orderNumber)}</h2><p class="text-sm text-muted-foreground">${ssrInterpolate(unref(selectedOrder).customer?.name)}</p></div>`);
        _push(ssrRenderComponent(_component_UiBadge, {
          variant: statusVariant(unref(selectedOrder).status),
          class: "ml-auto"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(statusLabel(unref(selectedOrder).status))}`);
            } else {
              return [
                createTextVNode(toDisplayString(statusLabel(unref(selectedOrder).status)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
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
                    _push3(`<div class="grid grid-cols-2 gap-2 text-sm pb-3 border-b sm:grid-cols-4 font-medium text-muted-foreground"${_scopeId2}><span class="col-span-2"${_scopeId2}>Product</span><span class="text-right"${_scopeId2}>Qty</span><span class="text-right"${_scopeId2}>Total</span></div><!--[-->`);
                    ssrRenderList(unref(selectedOrder).items, (item) => {
                      _push3(`<div class="grid grid-cols-2 gap-2 py-2 text-sm sm:grid-cols-4 border-b last:border-0"${_scopeId2}><span class="col-span-2 truncate"${_scopeId2}>${ssrInterpolate(item.product?.name || item.productId)}</span><span class="text-right"${_scopeId2}>${ssrInterpolate(item.quantity.toFixed(1))}</span><span class="text-right font-medium"${_scopeId2}>${ssrInterpolate(item.totalPrice.toFixed(2))}</span></div>`);
                    });
                    _push3(`<!--]--><div class="flex justify-between pt-3 text-sm font-semibold"${_scopeId2}><span${_scopeId2}>Total</span><span${_scopeId2}>${ssrInterpolate(unref(selectedOrder).totalAmount.toFixed(2))}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm pb-3 border-b sm:grid-cols-4 font-medium text-muted-foreground" }, [
                        createVNode("span", { class: "col-span-2" }, "Product"),
                        createVNode("span", { class: "text-right" }, "Qty"),
                        createVNode("span", { class: "text-right" }, "Total")
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedOrder).items, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "grid grid-cols-2 gap-2 py-2 text-sm sm:grid-cols-4 border-b last:border-0"
                        }, [
                          createVNode("span", { class: "col-span-2 truncate" }, toDisplayString(item.product?.name || item.productId), 1),
                          createVNode("span", { class: "text-right" }, toDisplayString(item.quantity.toFixed(1)), 1),
                          createVNode("span", { class: "text-right font-medium" }, toDisplayString(item.totalPrice.toFixed(2)), 1)
                        ]);
                      }), 128)),
                      createVNode("div", { class: "flex justify-between pt-3 text-sm font-semibold" }, [
                        createVNode("span", null, "Total"),
                        createVNode("span", null, toDisplayString(unref(selectedOrder).totalAmount.toFixed(2)), 1)
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
                    createVNode("div", { class: "grid grid-cols-2 gap-2 text-sm pb-3 border-b sm:grid-cols-4 font-medium text-muted-foreground" }, [
                      createVNode("span", { class: "col-span-2" }, "Product"),
                      createVNode("span", { class: "text-right" }, "Qty"),
                      createVNode("span", { class: "text-right" }, "Total")
                    ]),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(selectedOrder).items, (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: "grid grid-cols-2 gap-2 py-2 text-sm sm:grid-cols-4 border-b last:border-0"
                      }, [
                        createVNode("span", { class: "col-span-2 truncate" }, toDisplayString(item.product?.name || item.productId), 1),
                        createVNode("span", { class: "text-right" }, toDisplayString(item.quantity.toFixed(1)), 1),
                        createVNode("span", { class: "text-right font-medium" }, toDisplayString(item.totalPrice.toFixed(2)), 1)
                      ]);
                    }), 128)),
                    createVNode("div", { class: "flex justify-between pt-3 text-sm font-semibold" }, [
                      createVNode("span", null, "Total"),
                      createVNode("span", null, toDisplayString(unref(selectedOrder).totalAmount.toFixed(2)), 1)
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        if (canComplete(unref(selectedOrder).status)) {
          _push(ssrRenderComponent(_component_UiCard, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Complete Delivery`);
                          } else {
                            return [
                              createTextVNode("Complete Delivery")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Record delivery and collect payment`);
                          } else {
                            return [
                              createTextVNode("Record delivery and collect payment")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, { class: "text-base" }, {
                          default: withCtx(() => [
                            createTextVNode("Complete Delivery")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Record delivery and collect payment")
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
                            _push4(`Paid Amount`);
                          } else {
                            return [
                              createTextVNode("Paid Amount")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiInput, {
                        modelValue: unref(completeForm).paidAmount,
                        "onUpdate:modelValue": ($event) => unref(completeForm).paidAmount = $event,
                        type: "number",
                        min: "0",
                        step: "0.01",
                        placeholder: "0.00",
                        class: "mt-1"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiLabel, null, {
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
                        modelValue: unref(completeForm).paymentMethod,
                        "onUpdate:modelValue": ($event) => unref(completeForm).paymentMethod = $event
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "mt-1" }, {
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
                              createVNode(_component_UiSelectTrigger, { class: "mt-1" }, {
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
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(_component_UiButton, {
                        class: "w-full",
                        disabled: unref(completing),
                        onClick: handleComplete
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(CircleCheck), { class: "size-4" }, null, _parent4, _scopeId3));
                            _push4(` ${ssrInterpolate(unref(completing) ? "Completing..." : "Mark as Delivered")}`);
                          } else {
                            return [
                              createVNode(unref(CircleCheck), { class: "size-4" }),
                              createTextVNode(" " + toDisplayString(unref(completing) ? "Completing..." : "Mark as Delivered"), 1)
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
                              createTextVNode("Paid Amount")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            modelValue: unref(completeForm).paidAmount,
                            "onUpdate:modelValue": ($event) => unref(completeForm).paidAmount = $event,
                            type: "number",
                            min: "0",
                            step: "0.01",
                            placeholder: "0.00",
                            class: "mt-1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Payment Method")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            modelValue: unref(completeForm).paymentMethod,
                            "onUpdate:modelValue": ($event) => unref(completeForm).paymentMethod = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { class: "mt-1" }, {
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
                        createVNode(_component_UiButton, {
                          class: "w-full",
                          disabled: unref(completing),
                          onClick: handleComplete
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(CircleCheck), { class: "size-4" }),
                            createTextVNode(" " + toDisplayString(unref(completing) ? "Completing..." : "Mark as Delivered"), 1)
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
                          createTextVNode("Complete Delivery")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Record delivery and collect payment")
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
                            createTextVNode("Paid Amount")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(completeForm).paidAmount,
                          "onUpdate:modelValue": ($event) => unref(completeForm).paidAmount = $event,
                          type: "number",
                          min: "0",
                          step: "0.01",
                          placeholder: "0.00",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Payment Method")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(completeForm).paymentMethod,
                          "onUpdate:modelValue": ($event) => unref(completeForm).paymentMethod = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { class: "mt-1" }, {
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
                      createVNode(_component_UiButton, {
                        class: "w-full",
                        disabled: unref(completing),
                        onClick: handleComplete
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(CircleCheck), { class: "size-4" }),
                          createTextVNode(" " + toDisplayString(unref(completing) ? "Completing..." : "Mark as Delivered"), 1)
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
        } else {
          _push(`<!---->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=orders-BzHaslEU.mjs.map
