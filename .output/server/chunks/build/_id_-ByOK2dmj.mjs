import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, a as _sfc_main$4, d as _sfc_main$3$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DEwgn_ii.mjs';
import { _ as _sfc_main$3, a as _sfc_main$1$2, b as _sfc_main$5, c as _sfc_main$2$1 } from './index-CsamvZIh.mjs';
import { _ as _sfc_main$8, a as _sfc_main$7, b as _sfc_main$4$1, c as _sfc_main$1$3, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-Cc67ZnYT.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$4, d as _sfc_main$5$2, e as _sfc_main$4$2 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$a } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$b } from './Input-pgd-3rGf.mjs';
import { a as useRoute, h as usePermissions, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, reactive, resolveComponent, resolveDirective, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, isRef, openBlock, createBlock, Fragment, renderList, withDirectives, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrGetDirectiveProps, ssrRenderList } from 'vue/server-renderer';
import { ArrowLeft, FileText, CreditCard, Building2, Warehouse, Package, Scale } from '@lucide/vue';
import { u as usePurchasesStore, d as deleteWeightTicketApi, c as createWeightTicketApi } from './store-B0h3miBc.mjs';
import { toast } from 'vue-sonner';
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
    const invoiceId = computed(() => route.params.id);
    const purchasesStore = usePurchasesStore();
    const { can } = usePermissions();
    const activeTab = ref("items");
    const showPayDialog = ref(false);
    const showAddTicketDialog = ref(false);
    const payForm = reactive({ amount: null, description: "" });
    const ticketForm = reactive({ ticketNumber: "", grossWeight: null, tareWeight: null, carNumber: "" });
    async function fetchInvoice() {
      await purchasesStore.fetchPurchase(invoiceId.value);
    }
    const invoice = computed(() => purchasesStore.currentInvoice);
    const dueAmount = computed(() => {
      if (!invoice.value) return 0;
      return Number(invoice.value.totalAmount) - Number(invoice.value.paidAmount);
    });
    async function handlePay() {
      if (!payForm.amount) return;
      try {
        await purchasesStore.payInvoice(invoiceId.value, {
          amount: payForm.amount,
          description: payForm.description || void 0
        });
        showPayDialog.value = false;
        payForm.amount = null;
        payForm.description = "";
        toast.success("Payment recorded");
      } catch {
      }
    }
    async function handleAddTicket() {
      if (!ticketForm.ticketNumber || !ticketForm.grossWeight || !ticketForm.tareWeight) return;
      try {
        await createWeightTicketApi({
          purchaseInvoiceId: invoiceId.value,
          ticketNumber: ticketForm.ticketNumber,
          grossWeight: ticketForm.grossWeight,
          tareWeight: ticketForm.tareWeight,
          carNumber: ticketForm.carNumber || void 0
        });
        showAddTicketDialog.value = false;
        ticketForm.ticketNumber = "";
        ticketForm.grossWeight = null;
        ticketForm.tareWeight = null;
        ticketForm.carNumber = "";
        toast.success("Weight ticket added");
        fetchInvoice();
      } catch {
      }
    }
    async function handleDeleteTicket(id) {
      try {
        await deleteWeightTicketApi(id);
        toast.success("Weight ticket removed");
        fetchInvoice();
      } catch {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiTabs = _sfc_main$3;
      const _component_UiTabsList = _sfc_main$1$2;
      const _component_UiTabsTrigger = _sfc_main$5;
      const _component_UiTabsContent = _sfc_main$2$1;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$7;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$3;
      const _component_UiTableBody = _sfc_main$7$1;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_X = resolveComponent("X");
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$2;
      const _component_UiDialogTitle = _sfc_main$1$4;
      const _component_UiDialogDescription = _sfc_main$5$2;
      const _component_UiLabel = _sfc_main$a;
      const _component_UiInput = _sfc_main$b;
      const _component_UiDialogFooter = _sfc_main$4$2;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases")
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
      _push(ssrRenderComponent(unref(FileText), { class: "size-4 text-muted-foreground" }, null, _parent));
      _push(`</div><div><h1 class="text-lg font-semibold font-mono">${ssrInterpolate(unref(invoice)?.invoiceNumber || "Loading...")}</h1><p class="text-xs text-muted-foreground">${ssrInterpolate(unref(invoice)?.invoiceDate ? new Date(unref(invoice).invoiceDate).toLocaleDateString() : "")}</p></div></div></div>`);
      if (unref(invoice)) {
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
                          _push4(`Total Amount`);
                        } else {
                          return [
                            createTextVNode("Total Amount")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Total Amount")
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
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(Number(unref(invoice).totalAmount).toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(invoice).totalAmount).toFixed(2)), 1)
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
                        createTextVNode("Total Amount")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(invoice).totalAmount).toFixed(2)), 1)
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
                          _push4(`Paid`);
                        } else {
                          return [
                            createTextVNode("Paid")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Paid")
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
                    _push3(`<p class="text-2xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(Number(unref(invoice).paidAmount).toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(Number(unref(invoice).paidAmount).toFixed(2)), 1)
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
                        createTextVNode("Paid")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(Number(unref(invoice).paidAmount).toFixed(2)), 1)
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
                          _push4(`Due`);
                        } else {
                          return [
                            createTextVNode("Due")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Due")
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
                    _push3(`<p class="${ssrRenderClass([unref(dueAmount) > 0 ? "text-destructive" : "", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate(unref(dueAmount).toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", {
                        class: ["text-2xl font-bold", unref(dueAmount) > 0 ? "text-destructive" : ""]
                      }, toDisplayString(unref(dueAmount).toFixed(2)), 3)
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
                        createTextVNode("Due")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", {
                      class: ["text-2xl font-bold", unref(dueAmount) > 0 ? "text-destructive" : ""]
                    }, toDisplayString(unref(dueAmount).toFixed(2)), 3)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiCard, mergeProps({
          class: "cursor-pointer hover:bg-accent/50",
          onClick: ($event) => showPayDialog.value = true
        }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "PURCHASES", action: "EDIT" })), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Make Payment`);
                        } else {
                          return [
                            createTextVNode("Make Payment")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Make Payment")
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
                    _push3(ssrRenderComponent(unref(CreditCard), { class: "size-6 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(CreditCard), { class: "size-6 text-muted-foreground" })
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
                        createTextVNode("Make Payment")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(unref(CreditCard), { class: "size-6 text-muted-foreground" })
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
      if (unref(invoice)) {
        _push(`<div class="flex items-center gap-4 text-sm text-muted-foreground flex-wrap"><span class="flex items-center gap-1">`);
        _push(ssrRenderComponent(unref(Building2), { class: "size-3.5" }, null, _parent));
        _push(` `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/suppliers/${unref(invoice).supplierId}`,
          class: "hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(invoice).supplier?.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(invoice).supplier?.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</span><span class="flex items-center gap-1">`);
        _push(ssrRenderComponent(unref(Warehouse), { class: "size-3.5" }, null, _parent));
        _push(` ${ssrInterpolate(unref(invoice).warehouse?.name)}</span><span class="text-xs">Items: ${ssrInterpolate(unref(invoice).items?.length || 0)}</span><span class="text-xs">Tickets: ${ssrInterpolate(unref(invoice).weightTickets?.length || 0)}</span></div>`);
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
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "items" }, {
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
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "tickets" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Weight Tickets`);
                      } else {
                        return [
                          createTextVNode("Weight Tickets")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsTrigger, { value: "items" }, {
                      default: withCtx(() => [
                        createTextVNode("Items")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "tickets" }, {
                      default: withCtx(() => [
                        createTextVNode("Weight Tickets")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "items" }, {
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
                                    _push6(`Invoice Items`);
                                  } else {
                                    return [
                                      createTextVNode("Invoice Items")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Products in this purchase`);
                                  } else {
                                    return [
                                      createTextVNode("Products in this purchase")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Invoice Items")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Products in this purchase")
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
                                                      _push9(`Product`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Product")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`SKU`);
                                                    } else {
                                                      return [
                                                        createTextVNode("SKU")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Quantity`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Quantity")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Unit Price`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Unit Price")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Total`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Total")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Product")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("SKU")
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
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_UiTableRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Product")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("SKU")
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
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_UiTableBody, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(unref(invoice)?.items, (item) => {
                                            _push7(ssrRenderComponent(_component_UiTableRow, {
                                              key: item.id
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_UiTableCell, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<div class="flex items-center gap-2"${_scopeId8}>`);
                                                        _push9(ssrRenderComponent(unref(Package), { class: "size-4 text-muted-foreground" }, null, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(_component_NuxtLink, {
                                                          to: `/products/${item.productId}`,
                                                          class: "text-sm font-medium hover:underline"
                                                        }, {
                                                          default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`${ssrInterpolate(item.product?.name)}`);
                                                            } else {
                                                              return [
                                                                createTextVNode(toDisplayString(item.product?.name), 1)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                        _push9(`</div>`);
                                                      } else {
                                                        return [
                                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                                            createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                                                            createVNode(_component_NuxtLink, {
                                                              to: `/products/${item.productId}`,
                                                              class: "text-sm font-medium hover:underline"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(item.product?.name), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["to"])
                                                          ])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(item.product?.sku)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(item.product?.sku), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(Number(item.quantity).toFixed(3))}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(Number(item.unitPrice).toFixed(2))}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(Number(item.totalPrice).toFixed(2))}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_UiTableCell, null, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                                          createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                                                          createVNode(_component_NuxtLink, {
                                                            to: `/products/${item.productId}`,
                                                            class: "text-sm font-medium hover:underline"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(item.product?.name), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["to"])
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.product?.sku), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.items, (item) => {
                                              return openBlock(), createBlock(_component_UiTableRow, {
                                                key: item.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableCell, null, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                                        createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                                                        createVNode(_component_NuxtLink, {
                                                          to: `/products/${item.productId}`,
                                                          class: "text-sm font-medium hover:underline"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(item.product?.name), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["to"])
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.product?.sku), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                                                  createTextVNode("Product")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_UiTableHead, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("SKU")
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
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.items, (item) => {
                                            return openBlock(), createBlock(_component_UiTableRow, {
                                              key: item.id
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiTableCell, null, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                                      createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                                                      createVNode(_component_NuxtLink, {
                                                        to: `/products/${item.productId}`,
                                                        class: "text-sm font-medium hover:underline"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(item.product?.name), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["to"])
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.product?.sku), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                            } else {
                              return [
                                createVNode(_component_UiTable, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHeader, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Product")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("SKU")
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.items, (item) => {
                                          return openBlock(), createBlock(_component_UiTableRow, {
                                            key: item.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiTableCell, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                                    createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                                                    createVNode(_component_NuxtLink, {
                                                      to: `/products/${item.productId}`,
                                                      class: "text-sm font-medium hover:underline"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.product?.name), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["to"])
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.product?.sku), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                                })
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
                                  createTextVNode("Invoice Items")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Products in this purchase")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTable, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Product")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("SKU")
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.items, (item) => {
                                        return openBlock(), createBlock(_component_UiTableRow, {
                                          key: item.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableCell, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                  createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                                                  createVNode(_component_NuxtLink, {
                                                    to: `/products/${item.productId}`,
                                                    class: "text-sm font-medium hover:underline"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.product?.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to"])
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.product?.sku), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                              })
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
                                createTextVNode("Invoice Items")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Products in this purchase")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiTable, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Product")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("SKU")
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.items, (item) => {
                                      return openBlock(), createBlock(_component_UiTableRow, {
                                        key: item.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center gap-2" }, [
                                                createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                                                createVNode(_component_NuxtLink, {
                                                  to: `/products/${item.productId}`,
                                                  class: "text-sm font-medium hover:underline"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.product?.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to"])
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.product?.sku), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "tickets" }, {
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
                                    _push6(`Weight Tickets`);
                                  } else {
                                    return [
                                      createTextVNode("Weight Tickets")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Load weight records for this invoice`);
                                  } else {
                                    return [
                                      createTextVNode("Load weight records for this invoice")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(_component_UiButton, mergeProps({
                                size: "sm",
                                variant: "outline",
                                onClick: ($event) => showAddTicketDialog.value = true
                              }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "PURCHASES", action: "EDIT" })), {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Scale), { class: "size-4" }, null, _parent6, _scopeId5));
                                    _push6(` Add Ticket `);
                                  } else {
                                    return [
                                      createVNode(unref(Scale), { class: "size-4" }),
                                      createTextVNode(" Add Ticket ")
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
                                      createTextVNode("Weight Tickets")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiCardDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Load weight records for this invoice")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                withDirectives((openBlock(), createBlock(_component_UiButton, {
                                  size: "sm",
                                  variant: "outline",
                                  onClick: ($event) => showAddTicketDialog.value = true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Scale), { class: "size-4" }),
                                    createTextVNode(" Add Ticket ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])), [
                                  [_directive_can, { module: "PURCHASES", action: "EDIT" }]
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!unref(invoice)?.weightTickets?.length) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_EmptyState, {
                                  title: "No weight tickets",
                                  description: "Add weight tickets to record load weights",
                                  action: "Add Ticket",
                                  onAction: ($event) => showAddTicketDialog.value = true
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
                                                        _push9(`Ticket #`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Ticket #")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Car #`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Car #")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Gross`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Gross")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Tare`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Tare")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Net`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Net")
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
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "w-16 text-right" }, {
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
                                                        createTextVNode("Ticket #")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Car #")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Gross")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Tare")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Net")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Date")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "w-16 text-right" }, {
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
                                                      createTextVNode("Ticket #")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Car #")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Gross")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Tare")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Net")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Date")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "w-16 text-right" }, {
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
                                            ssrRenderList(unref(invoice)?.weightTickets, (t) => {
                                              _push7(ssrRenderComponent(_component_UiTableRow, {
                                                key: t.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-sm font-mono" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(t.ticketNumber)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(t.ticketNumber), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(t.carNumber || "—")}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(t.carNumber || "—"), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(Number(t.grossWeight).toFixed(3))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(Number(t.grossWeight).toFixed(3)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(Number(t.tareWeight).toFixed(3))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(Number(t.tareWeight).toFixed(3)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-primary" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(Number(t.netWeight).toFixed(3))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(Number(t.netWeight).toFixed(3)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(new Date(t.createdAt).toLocaleDateString())}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          if (unref(can)("PURCHASES", "DELETE")) {
                                                            _push9(ssrRenderComponent(_component_UiButton, {
                                                              variant: "ghost",
                                                              size: "icon-xs",
                                                              class: "text-destructive",
                                                              onClick: ($event) => handleDeleteTicket(t.id)
                                                            }, {
                                                              default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                                if (_push10) {
                                                                  _push10(ssrRenderComponent(_component_X, { class: "size-3.5" }, null, _parent10, _scopeId9));
                                                                } else {
                                                                  return [
                                                                    createVNode(_component_X, { class: "size-3.5" })
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
                                                            unref(can)("PURCHASES", "DELETE") ? (openBlock(), createBlock(_component_UiButton, {
                                                              key: 0,
                                                              variant: "ghost",
                                                              size: "icon-xs",
                                                              class: "text-destructive",
                                                              onClick: ($event) => handleDeleteTicket(t.id)
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(_component_X, { class: "size-3.5" })
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
                                                      createVNode(_component_UiTableCell, { class: "text-sm font-mono" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(t.ticketNumber), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(t.carNumber || "—"), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(Number(t.grossWeight).toFixed(3)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(Number(t.tareWeight).toFixed(3)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-primary" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(Number(t.netWeight).toFixed(3)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                        default: withCtx(() => [
                                                          unref(can)("PURCHASES", "DELETE") ? (openBlock(), createBlock(_component_UiButton, {
                                                            key: 0,
                                                            variant: "ghost",
                                                            size: "icon-xs",
                                                            class: "text-destructive",
                                                            onClick: ($event) => handleDeleteTicket(t.id)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(_component_X, { class: "size-3.5" })
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
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.weightTickets, (t) => {
                                                return openBlock(), createBlock(_component_UiTableRow, {
                                                  key: t.id
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiTableCell, { class: "text-sm font-mono" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(t.ticketNumber), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(t.carNumber || "—"), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(t.grossWeight).toFixed(3)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(t.tareWeight).toFixed(3)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-primary" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(t.netWeight).toFixed(3)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        unref(can)("PURCHASES", "DELETE") ? (openBlock(), createBlock(_component_UiButton, {
                                                          key: 0,
                                                          variant: "ghost",
                                                          size: "icon-xs",
                                                          class: "text-destructive",
                                                          onClick: ($event) => handleDeleteTicket(t.id)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(_component_X, { class: "size-3.5" })
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
                                                    createTextVNode("Ticket #")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Car #")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Gross")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Tare")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Net")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Date")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "w-16 text-right" }, {
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
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.weightTickets, (t) => {
                                              return openBlock(), createBlock(_component_UiTableRow, {
                                                key: t.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableCell, { class: "text-sm font-mono" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(t.ticketNumber), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(t.carNumber || "—"), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(t.grossWeight).toFixed(3)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(t.tareWeight).toFixed(3)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-primary" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(t.netWeight).toFixed(3)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      unref(can)("PURCHASES", "DELETE") ? (openBlock(), createBlock(_component_UiButton, {
                                                        key: 0,
                                                        variant: "ghost",
                                                        size: "icon-xs",
                                                        class: "text-destructive",
                                                        onClick: ($event) => handleDeleteTicket(t.id)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_X, { class: "size-3.5" })
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
                                !unref(invoice)?.weightTickets?.length ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_EmptyState, {
                                    title: "No weight tickets",
                                    description: "Add weight tickets to record load weights",
                                    action: "Add Ticket",
                                    onAction: ($event) => showAddTicketDialog.value = true
                                  }, null, 8, ["onAction"])
                                ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHeader, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Ticket #")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Car #")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Gross")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Tare")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Net")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Date")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "w-16 text-right" }, {
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.weightTickets, (t) => {
                                          return openBlock(), createBlock(_component_UiTableRow, {
                                            key: t.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiTableCell, { class: "text-sm font-mono" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(t.ticketNumber), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(t.carNumber || "—"), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(t.grossWeight).toFixed(3)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(t.tareWeight).toFixed(3)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-primary" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(t.netWeight).toFixed(3)), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  unref(can)("PURCHASES", "DELETE") ? (openBlock(), createBlock(_component_UiButton, {
                                                    key: 0,
                                                    variant: "ghost",
                                                    size: "icon-xs",
                                                    class: "text-destructive",
                                                    onClick: ($event) => handleDeleteTicket(t.id)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_X, { class: "size-3.5" })
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
                                    createTextVNode("Weight Tickets")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Load weight records for this invoice")
                                  ]),
                                  _: 1
                                })
                              ]),
                              withDirectives((openBlock(), createBlock(_component_UiButton, {
                                size: "sm",
                                variant: "outline",
                                onClick: ($event) => showAddTicketDialog.value = true
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Scale), { class: "size-4" }),
                                  createTextVNode(" Add Ticket ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])), [
                                [_directive_can, { module: "PURCHASES", action: "EDIT" }]
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              !unref(invoice)?.weightTickets?.length ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-6"
                              }, [
                                createVNode(_component_EmptyState, {
                                  title: "No weight tickets",
                                  description: "Add weight tickets to record load weights",
                                  action: "Add Ticket",
                                  onAction: ($event) => showAddTicketDialog.value = true
                                }, null, 8, ["onAction"])
                              ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Ticket #")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Car #")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Gross")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Tare")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Net")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Date")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "w-16 text-right" }, {
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.weightTickets, (t) => {
                                        return openBlock(), createBlock(_component_UiTableRow, {
                                          key: t.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableCell, { class: "text-sm font-mono" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(t.ticketNumber), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(t.carNumber || "—"), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(t.grossWeight).toFixed(3)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(t.tareWeight).toFixed(3)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-primary" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(t.netWeight).toFixed(3)), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                unref(can)("PURCHASES", "DELETE") ? (openBlock(), createBlock(_component_UiButton, {
                                                  key: 0,
                                                  variant: "ghost",
                                                  size: "icon-xs",
                                                  class: "text-destructive",
                                                  onClick: ($event) => handleDeleteTicket(t.id)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_X, { class: "size-3.5" })
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
                                  createTextVNode("Weight Tickets")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Load weight records for this invoice")
                                ]),
                                _: 1
                              })
                            ]),
                            withDirectives((openBlock(), createBlock(_component_UiButton, {
                              size: "sm",
                              variant: "outline",
                              onClick: ($event) => showAddTicketDialog.value = true
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Scale), { class: "size-4" }),
                                createTextVNode(" Add Ticket ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])), [
                              [_directive_can, { module: "PURCHASES", action: "EDIT" }]
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            !unref(invoice)?.weightTickets?.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-6"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "No weight tickets",
                                description: "Add weight tickets to record load weights",
                                action: "Add Ticket",
                                onAction: ($event) => showAddTicketDialog.value = true
                              }, null, 8, ["onAction"])
                            ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Ticket #")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Car #")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Gross")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Tare")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Net")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Date")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "w-16 text-right" }, {
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.weightTickets, (t) => {
                                      return openBlock(), createBlock(_component_UiTableRow, {
                                        key: t.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableCell, { class: "text-sm font-mono" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(t.ticketNumber), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(t.carNumber || "—"), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(t.grossWeight).toFixed(3)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(t.tareWeight).toFixed(3)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-primary" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(t.netWeight).toFixed(3)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              unref(can)("PURCHASES", "DELETE") ? (openBlock(), createBlock(_component_UiButton, {
                                                key: 0,
                                                variant: "ghost",
                                                size: "icon-xs",
                                                class: "text-destructive",
                                                onClick: ($event) => handleDeleteTicket(t.id)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_X, { class: "size-3.5" })
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
          } else {
            return [
              createVNode(_component_UiTabsList, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsTrigger, { value: "items" }, {
                    default: withCtx(() => [
                      createTextVNode("Items")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "tickets" }, {
                    default: withCtx(() => [
                      createTextVNode("Weight Tickets")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "items" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Invoice Items")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Products in this purchase")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_UiTable, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Product")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("SKU")
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.items, (item) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: item.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                              createVNode(unref(Package), { class: "size-4 text-muted-foreground" }),
                                              createVNode(_component_NuxtLink, {
                                                to: `/products/${item.productId}`,
                                                class: "text-sm font-medium hover:underline"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.product?.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["to"])
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-xs font-mono text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.product?.sku), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(item.quantity).toFixed(3)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(item.unitPrice).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(item.totalPrice).toFixed(2)), 1)
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
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "tickets" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Weight Tickets")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Load weight records for this invoice")
                              ]),
                              _: 1
                            })
                          ]),
                          withDirectives((openBlock(), createBlock(_component_UiButton, {
                            size: "sm",
                            variant: "outline",
                            onClick: ($event) => showAddTicketDialog.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Scale), { class: "size-4" }),
                              createTextVNode(" Add Ticket ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])), [
                            [_directive_can, { module: "PURCHASES", action: "EDIT" }]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          !unref(invoice)?.weightTickets?.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-6"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No weight tickets",
                              description: "Add weight tickets to record load weights",
                              action: "Add Ticket",
                              onAction: ($event) => showAddTicketDialog.value = true
                            }, null, 8, ["onAction"])
                          ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Ticket #")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Car #")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Gross")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Tare")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Net")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Date")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "w-16 text-right" }, {
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(invoice)?.weightTickets, (t) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: t.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, { class: "text-sm font-mono" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(t.ticketNumber), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(t.carNumber || "—"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(t.grossWeight).toFixed(3)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(t.tareWeight).toFixed(3)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums text-primary" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(t.netWeight).toFixed(3)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            unref(can)("PURCHASES", "DELETE") ? (openBlock(), createBlock(_component_UiButton, {
                                              key: 0,
                                              variant: "ghost",
                                              size: "icon-xs",
                                              class: "text-destructive",
                                              onClick: ($event) => handleDeleteTicket(t.id)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_X, { class: "size-3.5" })
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
                              _push5(`Make Payment`);
                            } else {
                              return [
                                createTextVNode("Make Payment")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record a payment for this invoice`);
                            } else {
                              return [
                                createTextVNode("Record a payment for this invoice")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Make Payment")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Record a payment for this invoice")
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
                          disabled: unref(purchasesStore).loading
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
                            disabled: unref(purchasesStore).loading
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
                            createTextVNode("Make Payment")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Record a payment for this invoice")
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
                            disabled: unref(purchasesStore).loading
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
                          createTextVNode("Make Payment")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Record a payment for this invoice")
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
                          disabled: unref(purchasesStore).loading
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
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showAddTicketDialog),
        "onUpdate:open": ($event) => showAddTicketDialog.value = $event
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
                              _push5(`Add Weight Ticket`);
                            } else {
                              return [
                                createTextVNode("Add Weight Ticket")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record a weight ticket for this invoice`);
                            } else {
                              return [
                                createTextVNode("Record a weight ticket for this invoice")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Add Weight Ticket")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Record a weight ticket for this invoice")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "ticket-number" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Ticket Number`);
                      } else {
                        return [
                          createTextVNode("Ticket Number")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "ticket-number",
                    modelValue: unref(ticketForm).ticketNumber,
                    "onUpdate:modelValue": ($event) => unref(ticketForm).ticketNumber = $event,
                    placeholder: "WT-001",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "car-number" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Car Number`);
                      } else {
                        return [
                          createTextVNode("Car Number")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "car-number",
                    modelValue: unref(ticketForm).carNumber,
                    "onUpdate:modelValue": ($event) => unref(ticketForm).carNumber = $event,
                    placeholder: "Optional"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "gross" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Gross Weight`);
                      } else {
                        return [
                          createTextVNode("Gross Weight")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "gross",
                    modelValue: unref(ticketForm).grossWeight,
                    "onUpdate:modelValue": ($event) => unref(ticketForm).grossWeight = $event,
                    type: "number",
                    step: "0.001",
                    placeholder: "0.000",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "tare" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Tare Weight`);
                      } else {
                        return [
                          createTextVNode("Tare Weight")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "tare",
                    modelValue: unref(ticketForm).tareWeight,
                    "onUpdate:modelValue": ($event) => unref(ticketForm).tareWeight = $event,
                    type: "number",
                    step: "0.001",
                    placeholder: "0.000",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                  if (unref(ticketForm).grossWeight && unref(ticketForm).tareWeight) {
                    _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Net weight: <strong${_scopeId2}>${ssrInterpolate((unref(ticketForm).grossWeight - unref(ticketForm).tareWeight).toFixed(3))}</strong></p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showAddTicketDialog.value = false
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
                              _push5(`Add Ticket`);
                            } else {
                              return [
                                createTextVNode("Add Ticket")
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
                            onClick: ($event) => showAddTicketDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode("Add Ticket")
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
                            createTextVNode("Add Weight Ticket")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Record a weight ticket for this invoice")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4",
                      onSubmit: withModifiers(handleAddTicket, ["prevent"])
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "ticket-number" }, {
                          default: withCtx(() => [
                            createTextVNode("Ticket Number")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "ticket-number",
                          modelValue: unref(ticketForm).ticketNumber,
                          "onUpdate:modelValue": ($event) => unref(ticketForm).ticketNumber = $event,
                          placeholder: "WT-001",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "car-number" }, {
                          default: withCtx(() => [
                            createTextVNode("Car Number")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "car-number",
                          modelValue: unref(ticketForm).carNumber,
                          "onUpdate:modelValue": ($event) => unref(ticketForm).carNumber = $event,
                          placeholder: "Optional"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "gross" }, {
                            default: withCtx(() => [
                              createTextVNode("Gross Weight")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "gross",
                            modelValue: unref(ticketForm).grossWeight,
                            "onUpdate:modelValue": ($event) => unref(ticketForm).grossWeight = $event,
                            type: "number",
                            step: "0.001",
                            placeholder: "0.000",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "tare" }, {
                            default: withCtx(() => [
                              createTextVNode("Tare Weight")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "tare",
                            modelValue: unref(ticketForm).tareWeight,
                            "onUpdate:modelValue": ($event) => unref(ticketForm).tareWeight = $event,
                            type: "number",
                            step: "0.001",
                            placeholder: "0.000",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      unref(ticketForm).grossWeight && unref(ticketForm).tareWeight ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-muted-foreground"
                      }, [
                        createTextVNode(" Net weight: "),
                        createVNode("strong", null, toDisplayString((unref(ticketForm).grossWeight - unref(ticketForm).tareWeight).toFixed(3)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showAddTicketDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode("Add Ticket")
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
                          createTextVNode("Add Weight Ticket")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Record a weight ticket for this invoice")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4",
                    onSubmit: withModifiers(handleAddTicket, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "ticket-number" }, {
                        default: withCtx(() => [
                          createTextVNode("Ticket Number")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "ticket-number",
                        modelValue: unref(ticketForm).ticketNumber,
                        "onUpdate:modelValue": ($event) => unref(ticketForm).ticketNumber = $event,
                        placeholder: "WT-001",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "car-number" }, {
                        default: withCtx(() => [
                          createTextVNode("Car Number")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "car-number",
                        modelValue: unref(ticketForm).carNumber,
                        "onUpdate:modelValue": ($event) => unref(ticketForm).carNumber = $event,
                        placeholder: "Optional"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "gross" }, {
                          default: withCtx(() => [
                            createTextVNode("Gross Weight")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "gross",
                          modelValue: unref(ticketForm).grossWeight,
                          "onUpdate:modelValue": ($event) => unref(ticketForm).grossWeight = $event,
                          type: "number",
                          step: "0.001",
                          placeholder: "0.000",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "tare" }, {
                          default: withCtx(() => [
                            createTextVNode("Tare Weight")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "tare",
                          modelValue: unref(ticketForm).tareWeight,
                          "onUpdate:modelValue": ($event) => unref(ticketForm).tareWeight = $event,
                          type: "number",
                          step: "0.001",
                          placeholder: "0.000",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    unref(ticketForm).grossWeight && unref(ticketForm).tareWeight ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-muted-foreground"
                    }, [
                      createTextVNode(" Net weight: "),
                      createVNode("strong", null, toDisplayString((unref(ticketForm).grossWeight - unref(ticketForm).tareWeight).toFixed(3)), 1)
                    ])) : createCommentVNode("", true),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showAddTicketDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, { type: "submit" }, {
                          default: withCtx(() => [
                            createTextVNode("Add Ticket")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/purchases/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-ByOK2dmj.mjs.map
