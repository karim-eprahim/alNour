import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$3, d as _sfc_main$4, c as _sfc_main$3$1, e as __nuxt_component_7 } from './CardTitle-CgdNZisr.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DZSn3naz.mjs';
import { _ as __nuxt_component_10 } from './AppTable-D-kyiag3.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$2, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$7 } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$8 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$3, b as _sfc_main$b, c as _sfc_main$9$1, d as _sfc_main$7$1 } from './SelectValue-CdUm-rR7.mjs';
import { a as useRoute, b as usePermissions, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, reactive, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { ArrowLeft, User, Building, DollarSign, Package } from '@lucide/vue';
import { b as getOrderItemColumns } from './column-DjBkvUne.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
import { u as useSalesStore } from './store-Cqw4f2fz.mjs';
import { _ as _sfc_main$2 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
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
import './DropdownMenuTrigger-CAUMwd2x.mjs';
import 'reka-ui';
import '@vueuse/core';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
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
import 'class-variance-authority';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const salesStore = useSalesStore();
    const { can } = usePermissions();
    const order = computed(() => salesStore.currentOrder);
    const statusBadge = (s) => {
      const map = { PENDING: "secondary", CONFIRMED: "warning", COMPLETED: "success", CANCELLED: "destructive" };
      return map[s] || "secondary";
    };
    const invoiceStatusBadge = (s) => {
      const map = { UNPAID: "destructive", PARTIAL: "warning", PAID: "success", CANCELLED: "secondary" };
      return map[s] || "secondary";
    };
    const itemColumns = getOrderItemColumns();
    const showPayDialog = ref(false);
    const payForm = reactive({ amount: 0, paymentMethod: "CASH", notes: "" });
    const paying = ref(false);
    const selectedInvoiceId = ref("");
    function openPay(invoiceId, maxAmount) {
      selectedInvoiceId.value = invoiceId;
      payForm.amount = maxAmount;
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
        await salesStore.fetchOrder(route.params.id);
      } catch {
        toast.error("Failed to record payment");
      } finally {
        paying.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$2;
      const _component_UiDialogTitle = _sfc_main$1$2;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiInput = _sfc_main$8;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$3;
      const _component_UiSelectValue = _sfc_main$b;
      const _component_UiSelectContent = _sfc_main$9$1;
      const _component_UiSelectItem = _sfc_main$7$1;
      const _component_UiDialogFooter = _sfc_main$4$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
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
      if (unref(order)) {
        _push(ssrRenderComponent(PageHeader, {
          title: unref(order).orderNumber,
          description: `Created ${new Date(unref(order).createdAt).toLocaleDateString()}`
        }, {
          actions: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                variant: statusBadge(unref(order).status)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(order).status)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(order).status), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$2), {
                  variant: statusBadge(unref(order).status)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(order).status), 1)
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
      if (unref(order)) {
        _push(`<!--[--><div class="grid gap-4 sm:grid-cols-4">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Customer`);
                        } else {
                          return [
                            createTextVNode("Customer")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(User), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Customer")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(User), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: `/customers/${unref(order).customerId}`,
                      class: "text-lg font-medium hover:underline"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(order).customer?.name)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(order).customer?.name), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtLink, {
                        to: `/customers/${unref(order).customerId}`,
                        class: "text-lg font-medium hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(order).customer?.name), 1)
                        ]),
                        _: 1
                      }, 8, ["to"])
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
                        createTextVNode("Customer")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(User), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, {
                      to: `/customers/${unref(order).customerId}`,
                      class: "text-lg font-medium hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(order).customer?.name), 1)
                      ]),
                      _: 1
                    }, 8, ["to"])
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
                          _push4(`Warehouse`);
                        } else {
                          return [
                            createTextVNode("Warehouse")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Building), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Warehouse")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Building), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-lg font-medium"${_scopeId2}>${ssrInterpolate(unref(order).warehouse?.name)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-lg font-medium" }, toDisplayString(unref(order).warehouse?.name), 1)
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
                        createTextVNode("Warehouse")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Building), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-lg font-medium" }, toDisplayString(unref(order).warehouse?.name), 1)
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
                          _push4(`Total`);
                        } else {
                          return [
                            createTextVNode("Total")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(DollarSign), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Total")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(Number(unref(order).totalAmount).toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(order).totalAmount).toFixed(2)), 1)
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
                        createTextVNode("Total")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(Number(unref(order).totalAmount).toFixed(2)), 1)
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
                          _push4(`Items`);
                        } else {
                          return [
                            createTextVNode("Items")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Package), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Items")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Package), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(order).items?.length || 0)}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(order).items?.length || 0), 1)
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
                        createTextVNode("Items")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Package), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(order).items?.length || 0), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="grid gap-6 lg:grid-cols-2">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
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
                          _push4(`Products in this order`);
                        } else {
                          return [
                            createTextVNode("Products in this order")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Order Items")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Products in this order")
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
                    _push3(ssrRenderComponent(_component_AppTable, {
                      data: unref(order).items || [],
                      columns: unref(itemColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            title: "No items",
                            description: "No products in this order"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_EmptyState, {
                              title: "No items",
                              description: "No products in this order"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AppTable, {
                        data: unref(order).items || [],
                        columns: unref(itemColumns),
                        "show-search": false,
                        "show-column-toggle": false,
                        "show-pagination": false
                      }, {
                        empty: withCtx(() => [
                          createVNode(_component_EmptyState, {
                            title: "No items",
                            description: "No products in this order"
                          })
                        ]),
                        _: 1
                      }, 8, ["data", "columns"])
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
                        createTextVNode("Order Items")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Products in this order")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_AppTable, {
                      data: unref(order).items || [],
                      columns: unref(itemColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No items",
                          description: "No products in this order"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "columns"])
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
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
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
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Generated invoices and payments`);
                        } else {
                          return [
                            createTextVNode("Generated invoices and payments")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
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
                          createTextVNode("Generated invoices and payments")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!unref(order).invoices?.length) {
                      _push3(`<div class="py-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_EmptyState, {
                        title: "No invoices",
                        description: "No invoices generated yet"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(order).invoices, (inv) => {
                      _push3(ssrRenderComponent(_component_UiCard, {
                        key: inv.id,
                        class: "border"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UiCardHeader, { class: "py-3 px-4 flex flex-row items-center justify-between" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div${_scopeId4}><p class="text-sm font-medium"${_scopeId4}>${ssrInterpolate(inv.invoiceNumber)}</p><p class="text-xs text-muted-foreground"${_scopeId4}>${ssrInterpolate(new Date(inv.createdAt).toLocaleDateString())}</p></div>`);
                                  _push5(ssrRenderComponent(unref(_sfc_main$2), {
                                    variant: invoiceStatusBadge(inv.status)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(inv.status)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(inv.status), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode("div", null, [
                                      createVNode("p", { class: "text-sm font-medium" }, toDisplayString(inv.invoiceNumber), 1),
                                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(inv.createdAt).toLocaleDateString()), 1)
                                    ]),
                                    createVNode(unref(_sfc_main$2), {
                                      variant: invoiceStatusBadge(inv.status)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.status), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_UiCardContent, { class: "px-4 pb-3 space-y-2" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex justify-between text-sm"${_scopeId4}><span class="text-muted-foreground"${_scopeId4}>Total</span><span class="font-medium"${_scopeId4}>${ssrInterpolate(Number(inv.totalAmount).toFixed(2))}</span></div><div class="flex justify-between text-sm"${_scopeId4}><span class="text-muted-foreground"${_scopeId4}>Paid</span><span class="font-medium text-green-600"${_scopeId4}>${ssrInterpolate(Number(inv.paidAmount).toFixed(2))}</span></div><div class="flex justify-between text-sm"${_scopeId4}><span class="text-muted-foreground"${_scopeId4}>Due</span><span class="font-medium text-destructive"${_scopeId4}>${ssrInterpolate((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2))}</span></div>`);
                                  if (inv.payments?.length) {
                                    _push5(`<div class="pt-2 border-t"${_scopeId4}><p class="text-xs font-medium text-muted-foreground mb-1"${_scopeId4}>Payments</p><!--[-->`);
                                    ssrRenderList(inv.payments, (p) => {
                                      _push5(`<div class="flex justify-between text-xs"${_scopeId4}><span${_scopeId4}>${ssrInterpolate(new Date(p.createdAt).toLocaleDateString())} · ${ssrInterpolate(p.paymentMethod)} ${ssrInterpolate(p.createdBy ? `by ${p.createdBy.name}` : "")}</span><span class="font-medium text-green-600"${_scopeId4}>${ssrInterpolate(Number(p.amount).toFixed(2))}</span></div>`);
                                    });
                                    _push5(`<!--]--></div>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  if (Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SALES", "UPDATE")) {
                                    _push5(ssrRenderComponent(unref(_sfc_main$1), {
                                      size: "sm",
                                      class: "w-full mt-2",
                                      onClick: ($event) => openPay(inv.id, Number(inv.totalAmount) - Number(inv.paidAmount))
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(DollarSign), { class: "size-3.5" }, null, _parent6, _scopeId5));
                                          _push6(` Record Payment `);
                                        } else {
                                          return [
                                            createVNode(unref(DollarSign), { class: "size-3.5" }),
                                            createTextVNode(" Record Payment ")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                } else {
                                  return [
                                    createVNode("div", { class: "flex justify-between text-sm" }, [
                                      createVNode("span", { class: "text-muted-foreground" }, "Total"),
                                      createVNode("span", { class: "font-medium" }, toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                    ]),
                                    createVNode("div", { class: "flex justify-between text-sm" }, [
                                      createVNode("span", { class: "text-muted-foreground" }, "Paid"),
                                      createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                    ]),
                                    createVNode("div", { class: "flex justify-between text-sm" }, [
                                      createVNode("span", { class: "text-muted-foreground" }, "Due"),
                                      createVNode("span", { class: "font-medium text-destructive" }, toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                    ]),
                                    inv.payments?.length ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "pt-2 border-t"
                                    }, [
                                      createVNode("p", { class: "text-xs font-medium text-muted-foreground mb-1" }, "Payments"),
                                      (openBlock(true), createBlock(Fragment, null, renderList(inv.payments, (p) => {
                                        return openBlock(), createBlock("div", {
                                          key: p.id,
                                          class: "flex justify-between text-xs"
                                        }, [
                                          createVNode("span", null, toDisplayString(new Date(p.createdAt).toLocaleDateString()) + " · " + toDisplayString(p.paymentMethod) + " " + toDisplayString(p.createdBy ? `by ${p.createdBy.name}` : ""), 1),
                                          createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(p.amount).toFixed(2)), 1)
                                        ]);
                                      }), 128))
                                    ])) : createCommentVNode("", true),
                                    Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SALES", "UPDATE") ? (openBlock(), createBlock(unref(_sfc_main$1), {
                                      key: 1,
                                      size: "sm",
                                      class: "w-full mt-2",
                                      onClick: ($event) => openPay(inv.id, Number(inv.totalAmount) - Number(inv.paidAmount))
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(DollarSign), { class: "size-3.5" }),
                                        createTextVNode(" Record Payment ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UiCardHeader, { class: "py-3 px-4 flex flex-row items-center justify-between" }, {
                                default: withCtx(() => [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "text-sm font-medium" }, toDisplayString(inv.invoiceNumber), 1),
                                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(inv.createdAt).toLocaleDateString()), 1)
                                  ]),
                                  createVNode(unref(_sfc_main$2), {
                                    variant: invoiceStatusBadge(inv.status)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.status), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_UiCardContent, { class: "px-4 pb-3 space-y-2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex justify-between text-sm" }, [
                                    createVNode("span", { class: "text-muted-foreground" }, "Total"),
                                    createVNode("span", { class: "font-medium" }, toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                  ]),
                                  createVNode("div", { class: "flex justify-between text-sm" }, [
                                    createVNode("span", { class: "text-muted-foreground" }, "Paid"),
                                    createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                  ]),
                                  createVNode("div", { class: "flex justify-between text-sm" }, [
                                    createVNode("span", { class: "text-muted-foreground" }, "Due"),
                                    createVNode("span", { class: "font-medium text-destructive" }, toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                  ]),
                                  inv.payments?.length ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "pt-2 border-t"
                                  }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground mb-1" }, "Payments"),
                                    (openBlock(true), createBlock(Fragment, null, renderList(inv.payments, (p) => {
                                      return openBlock(), createBlock("div", {
                                        key: p.id,
                                        class: "flex justify-between text-xs"
                                      }, [
                                        createVNode("span", null, toDisplayString(new Date(p.createdAt).toLocaleDateString()) + " · " + toDisplayString(p.paymentMethod) + " " + toDisplayString(p.createdBy ? `by ${p.createdBy.name}` : ""), 1),
                                        createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(p.amount).toFixed(2)), 1)
                                      ]);
                                    }), 128))
                                  ])) : createCommentVNode("", true),
                                  Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SALES", "UPDATE") ? (openBlock(), createBlock(unref(_sfc_main$1), {
                                    key: 1,
                                    size: "sm",
                                    class: "w-full mt-2",
                                    onClick: ($event) => openPay(inv.id, Number(inv.totalAmount) - Number(inv.paidAmount))
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(DollarSign), { class: "size-3.5" }),
                                      createTextVNode(" Record Payment ")
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
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      !unref(order).invoices?.length ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "py-4"
                      }, [
                        createVNode(_component_EmptyState, {
                          title: "No invoices",
                          description: "No invoices generated yet"
                        })
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(order).invoices, (inv) => {
                        return openBlock(), createBlock(_component_UiCard, {
                          key: inv.id,
                          class: "border"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiCardHeader, { class: "py-3 px-4 flex flex-row items-center justify-between" }, {
                              default: withCtx(() => [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString(inv.invoiceNumber), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(inv.createdAt).toLocaleDateString()), 1)
                                ]),
                                createVNode(unref(_sfc_main$2), {
                                  variant: invoiceStatusBadge(inv.status)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.status), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_UiCardContent, { class: "px-4 pb-3 space-y-2" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex justify-between text-sm" }, [
                                  createVNode("span", { class: "text-muted-foreground" }, "Total"),
                                  createVNode("span", { class: "font-medium" }, toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between text-sm" }, [
                                  createVNode("span", { class: "text-muted-foreground" }, "Paid"),
                                  createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between text-sm" }, [
                                  createVNode("span", { class: "text-muted-foreground" }, "Due"),
                                  createVNode("span", { class: "font-medium text-destructive" }, toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                                ]),
                                inv.payments?.length ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "pt-2 border-t"
                                }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground mb-1" }, "Payments"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(inv.payments, (p) => {
                                    return openBlock(), createBlock("div", {
                                      key: p.id,
                                      class: "flex justify-between text-xs"
                                    }, [
                                      createVNode("span", null, toDisplayString(new Date(p.createdAt).toLocaleDateString()) + " · " + toDisplayString(p.paymentMethod) + " " + toDisplayString(p.createdBy ? `by ${p.createdBy.name}` : ""), 1),
                                      createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(p.amount).toFixed(2)), 1)
                                    ]);
                                  }), 128))
                                ])) : createCommentVNode("", true),
                                Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SALES", "UPDATE") ? (openBlock(), createBlock(unref(_sfc_main$1), {
                                  key: 1,
                                  size: "sm",
                                  class: "w-full mt-2",
                                  onClick: ($event) => openPay(inv.id, Number(inv.totalAmount) - Number(inv.paidAmount))
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(DollarSign), { class: "size-3.5" }),
                                    createTextVNode(" Record Payment ")
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
              }, _parent2, _scopeId));
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
                        createTextVNode("Generated invoices and payments")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                  default: withCtx(() => [
                    !unref(order).invoices?.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-4"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No invoices",
                        description: "No invoices generated yet"
                      })
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(order).invoices, (inv) => {
                      return openBlock(), createBlock(_component_UiCard, {
                        key: inv.id,
                        class: "border"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardHeader, { class: "py-3 px-4 flex flex-row items-center justify-between" }, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm font-medium" }, toDisplayString(inv.invoiceNumber), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(new Date(inv.createdAt).toLocaleDateString()), 1)
                              ]),
                              createVNode(unref(_sfc_main$2), {
                                variant: invoiceStatusBadge(inv.status)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(inv.status), 1)
                                ]),
                                _: 2
                              }, 1032, ["variant"])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_UiCardContent, { class: "px-4 pb-3 space-y-2" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex justify-between text-sm" }, [
                                createVNode("span", { class: "text-muted-foreground" }, "Total"),
                                createVNode("span", { class: "font-medium" }, toDisplayString(Number(inv.totalAmount).toFixed(2)), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between text-sm" }, [
                                createVNode("span", { class: "text-muted-foreground" }, "Paid"),
                                createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(inv.paidAmount).toFixed(2)), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between text-sm" }, [
                                createVNode("span", { class: "text-muted-foreground" }, "Due"),
                                createVNode("span", { class: "font-medium text-destructive" }, toDisplayString((Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2)), 1)
                              ]),
                              inv.payments?.length ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "pt-2 border-t"
                              }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground mb-1" }, "Payments"),
                                (openBlock(true), createBlock(Fragment, null, renderList(inv.payments, (p) => {
                                  return openBlock(), createBlock("div", {
                                    key: p.id,
                                    class: "flex justify-between text-xs"
                                  }, [
                                    createVNode("span", null, toDisplayString(new Date(p.createdAt).toLocaleDateString()) + " · " + toDisplayString(p.paymentMethod) + " " + toDisplayString(p.createdBy ? `by ${p.createdBy.name}` : ""), 1),
                                    createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(Number(p.amount).toFixed(2)), 1)
                                  ]);
                                }), 128))
                              ])) : createCommentVNode("", true),
                              Number(inv.totalAmount) > Number(inv.paidAmount) && unref(can)("SALES", "UPDATE") ? (openBlock(), createBlock(unref(_sfc_main$1), {
                                key: 1,
                                size: "sm",
                                class: "w-full mt-2",
                                onClick: ($event) => openPay(inv.id, Number(inv.totalAmount) - Number(inv.paidAmount))
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(DollarSign), { class: "size-3.5" }),
                                  createTextVNode(" Record Payment ")
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
        }, _parent));
        _push(`</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
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
                              _push5(`Enter payment details for this invoice`);
                            } else {
                              return [
                                createTextVNode("Enter payment details for this invoice")
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
                              createTextVNode("Enter payment details for this invoice")
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
                    placeholder: "Optional notes"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: unref(paying) || !unref(payForm).amount
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(DollarSign), { class: "size-4" }, null, _parent5, _scopeId4));
                              _push5(` ${ssrInterpolate(unref(paying) ? "Recording..." : "Record Payment")}`);
                            } else {
                              return [
                                createVNode(unref(DollarSign), { class: "size-4" }),
                                createTextVNode(" " + toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
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
                            onClick: ($event) => showPayDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: unref(paying) || !unref(payForm).amount
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(DollarSign), { class: "size-4" }),
                              createTextVNode(" " + toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
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
                            createTextVNode("Enter payment details for this invoice")
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
                          placeholder: "Optional notes"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showPayDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: unref(paying) || !unref(payForm).amount
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(DollarSign), { class: "size-4" }),
                              createTextVNode(" " + toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
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
                          createTextVNode("Enter payment details for this invoice")
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
                        placeholder: "Optional notes"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showPayDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: unref(paying) || !unref(payForm).amount
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DollarSign), { class: "size-4" }),
                            createTextVNode(" " + toDisplayString(unref(paying) ? "Recording..." : "Record Payment"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sales/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-D2EEtAkh.mjs.map
