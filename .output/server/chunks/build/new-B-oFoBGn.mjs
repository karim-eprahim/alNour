import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, c as _sfc_main$3, d as _sfc_main$4, e as _sfc_main$2$1 } from './CardTitle-St-iDBLB.mjs';
import { _ as _sfc_main$5 } from './Label-fqACuvH5.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-KK7k7FV7.mjs';
import { _ as _sfc_main$7 } from './Input-DA89G3IO.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-BVvkGjQ9.mjs';
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$4$1, c as _sfc_main$1$2, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-f7ALV9Yi.mjs';
import { n as navigateTo } from './server.mjs';
import { f as fetchProductsLookupApi } from './api-Dq8IcxCC.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { ArrowLeft, X, Scale, Plus } from '@lucide/vue';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useSuppliersStore, f as fetchSuppliersLookupApi } from './store-DXABWweC.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { u as usePurchasesStore } from './store-B0h3miBc.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './Textarea-BYfzemxZ.mjs';
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
    usePurchasesStore();
    const suppliersStore = useSuppliersStore();
    useWarehousesStore();
    const productsStore = useProductsStore();
    const saving = ref(false);
    const form = reactive({
      supplierId: "",
      warehouseId: "",
      invoiceDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      paidAmount: 0,
      items: [],
      weightTickets: []
    });
    function addItem() {
      form.items.push({ productId: "", quantity: null, unitPrice: null });
    }
    function removeItem(index) {
      form.items.splice(index, 1);
    }
    function addWeightTicket() {
      form.weightTickets.push({ ticketNumber: "", grossWeight: null, tareWeight: null, carNumber: "" });
    }
    function removeWeightTicket(index) {
      form.weightTickets.splice(index, 1);
    }
    computed(
      () => suppliersStore.suppliers.map((s) => ({ ...s, _label: `${s.name}${s.company ? ` (${s.company})` : ""}` }))
    );
    computed(
      () => productsStore.products.map((p) => ({ ...p, _label: `${p.name} (${p.sku})` }))
    );
    const calculatedTotal = computed(() => {
      return form.items.reduce((sum, item) => {
        const qty = item.quantity || 0;
        const price = item.unitPrice || 0;
        return sum + qty * price;
      }, 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiLabel = _sfc_main$5;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiInput = _sfc_main$7;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$9;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$2;
      const _component_UiTableBody = _sfc_main$7$1;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_UiCardFooter = _sfc_main$2$1;
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
      _push(ssrRenderComponent(PageHeader, {
        title: "New Purchase Invoice",
        description: "Create a purchase invoice with items and weight tickets"
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
                        _push4(`Invoice Details`);
                      } else {
                        return [
                          createTextVNode("Invoice Details")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Supplier, warehouse, and date information`);
                      } else {
                        return [
                          createTextVNode("Supplier, warehouse, and date information")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Invoice Details")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Supplier, warehouse, and date information")
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
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "supplier" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Supplier *`);
                      } else {
                        return [
                          createTextVNode("Supplier *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(form).supplierId,
                    "onUpdate:modelValue": ($event) => unref(form).supplierId = $event,
                    endpoint: unref(fetchSuppliersLookupApi)
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
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "inv-date" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Invoice Date`);
                      } else {
                        return [
                          createTextVNode("Invoice Date")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "inv-date",
                    modelValue: unref(form).invoiceDate,
                    "onUpdate:modelValue": ($event) => unref(form).invoiceDate = $event,
                    type: "date"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "paid-amount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Amount Paid`);
                      } else {
                        return [
                          createTextVNode("Amount Paid")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "paid-amount",
                    modelValue: unref(form).paidAmount,
                    "onUpdate:modelValue": ($event) => unref(form).paidAmount = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "supplier" }, {
                        default: withCtx(() => [
                          createTextVNode("Supplier *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(form).supplierId,
                        "onUpdate:modelValue": ($event) => unref(form).supplierId = $event,
                        endpoint: unref(fetchSuppliersLookupApi)
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
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "inv-date" }, {
                        default: withCtx(() => [
                          createTextVNode("Invoice Date")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "inv-date",
                        modelValue: unref(form).invoiceDate,
                        "onUpdate:modelValue": ($event) => unref(form).invoiceDate = $event,
                        type: "date"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "paid-amount" }, {
                        default: withCtx(() => [
                          createTextVNode("Amount Paid")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "paid-amount",
                        modelValue: unref(form).paidAmount,
                        "onUpdate:modelValue": ($event) => unref(form).paidAmount = $event,
                        type: "number",
                        step: "0.01",
                        placeholder: "0.00"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Invoice Details")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Supplier, warehouse, and date information")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_UiLabel, { for: "supplier" }, {
                      default: withCtx(() => [
                        createTextVNode("Supplier *")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(form).supplierId,
                      "onUpdate:modelValue": ($event) => unref(form).supplierId = $event,
                      endpoint: unref(fetchSuppliersLookupApi)
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
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_UiLabel, { for: "inv-date" }, {
                      default: withCtx(() => [
                        createTextVNode("Invoice Date")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiInput, {
                      id: "inv-date",
                      modelValue: unref(form).invoiceDate,
                      "onUpdate:modelValue": ($event) => unref(form).invoiceDate = $event,
                      type: "date"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_UiLabel, { for: "paid-amount" }, {
                      default: withCtx(() => [
                        createTextVNode("Amount Paid")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiInput, {
                      id: "paid-amount",
                      modelValue: unref(form).paidAmount,
                      "onUpdate:modelValue": ($event) => unref(form).paidAmount = $event,
                      type: "number",
                      step: "0.01",
                      placeholder: "0.00"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
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
                        _push4(`Weight Tickets`);
                      } else {
                        return [
                          createTextVNode("Weight Tickets")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Record load weights for raw materials`);
                      } else {
                        return [
                          createTextVNode("Record load weights for raw materials")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Weight Tickets")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Record load weights for raw materials")
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
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(form).weightTickets, (wt, i) => {
                    _push3(`<div class="rounded-lg border p-3 space-y-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><span class="text-xs font-medium text-muted-foreground"${_scopeId2}>Ticket #${ssrInterpolate(i + 1)}</span>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      type: "button",
                      variant: "ghost",
                      size: "icon-xs",
                      class: "text-destructive",
                      onClick: ($event) => removeWeightTicket(i)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(X), { class: "size-3.5" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(X), { class: "size-3.5" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="grid grid-cols-2 gap-2"${_scopeId2}><div class="space-y-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Ticket #`);
                        } else {
                          return [
                            createTextVNode("Ticket #")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      modelValue: wt.ticketNumber,
                      "onUpdate:modelValue": ($event) => wt.ticketNumber = $event,
                      placeholder: "WT-001"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Car #`);
                        } else {
                          return [
                            createTextVNode("Car #")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      modelValue: wt.carNumber,
                      "onUpdate:modelValue": ($event) => wt.carNumber = $event,
                      placeholder: "Car plate"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div><div class="grid grid-cols-2 gap-2"${_scopeId2}><div class="space-y-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Gross Weight`);
                        } else {
                          return [
                            createTextVNode("Gross Weight")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      modelValue: wt.grossWeight,
                      "onUpdate:modelValue": ($event) => wt.grossWeight = $event,
                      type: "number",
                      step: "0.001",
                      placeholder: "0.000"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Tare Weight`);
                        } else {
                          return [
                            createTextVNode("Tare Weight")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      modelValue: wt.tareWeight,
                      "onUpdate:modelValue": ($event) => wt.tareWeight = $event,
                      type: "number",
                      step: "0.001",
                      placeholder: "0.000"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                    if (wt.grossWeight && wt.tareWeight) {
                      _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Net: <strong${_scopeId2}>${ssrInterpolate((wt.grossWeight - wt.tareWeight).toFixed(3))}</strong></p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  });
                  _push3(`<!--]-->`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    class: "w-full",
                    onClick: addWeightTicket
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Scale), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Add Weight Ticket `);
                      } else {
                        return [
                          createVNode(unref(Scale), { class: "size-4" }),
                          createTextVNode(" Add Weight Ticket ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(form).weightTickets, (wt, i) => {
                      return openBlock(), createBlock("div", {
                        key: i,
                        class: "rounded-lg border p-3 space-y-2"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-xs font-medium text-muted-foreground" }, "Ticket #" + toDisplayString(i + 1), 1),
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "ghost",
                            size: "icon-xs",
                            class: "text-destructive",
                            onClick: ($event) => removeWeightTicket(i)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(X), { class: "size-3.5" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Ticket #")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              modelValue: wt.ticketNumber,
                              "onUpdate:modelValue": ($event) => wt.ticketNumber = $event,
                              placeholder: "WT-001"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Car #")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              modelValue: wt.carNumber,
                              "onUpdate:modelValue": ($event) => wt.carNumber = $event,
                              placeholder: "Car plate"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Gross Weight")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              modelValue: wt.grossWeight,
                              "onUpdate:modelValue": ($event) => wt.grossWeight = $event,
                              type: "number",
                              step: "0.001",
                              placeholder: "0.000"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Tare Weight")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              modelValue: wt.tareWeight,
                              "onUpdate:modelValue": ($event) => wt.tareWeight = $event,
                              type: "number",
                              step: "0.001",
                              placeholder: "0.000"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        wt.grossWeight && wt.tareWeight ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-muted-foreground"
                        }, [
                          createTextVNode(" Net: "),
                          createVNode("strong", null, toDisplayString((wt.grossWeight - wt.tareWeight).toFixed(3)), 1)
                        ])) : createCommentVNode("", true)
                      ]);
                    }), 128)),
                    createVNode(_component_UiButton, {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      class: "w-full",
                      onClick: addWeightTicket
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Scale), { class: "size-4" }),
                        createTextVNode(" Add Weight Ticket ")
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
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Weight Tickets")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Record load weights for raw materials")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(form).weightTickets, (wt, i) => {
                    return openBlock(), createBlock("div", {
                      key: i,
                      class: "rounded-lg border p-3 space-y-2"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("span", { class: "text-xs font-medium text-muted-foreground" }, "Ticket #" + toDisplayString(i + 1), 1),
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "ghost",
                          size: "icon-xs",
                          class: "text-destructive",
                          onClick: ($event) => removeWeightTicket(i)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(X), { class: "size-3.5" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode(_component_UiLabel, { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Ticket #")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            modelValue: wt.ticketNumber,
                            "onUpdate:modelValue": ($event) => wt.ticketNumber = $event,
                            placeholder: "WT-001"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode(_component_UiLabel, { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Car #")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            modelValue: wt.carNumber,
                            "onUpdate:modelValue": ($event) => wt.carNumber = $event,
                            placeholder: "Car plate"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode(_component_UiLabel, { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Gross Weight")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            modelValue: wt.grossWeight,
                            "onUpdate:modelValue": ($event) => wt.grossWeight = $event,
                            type: "number",
                            step: "0.001",
                            placeholder: "0.000"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode(_component_UiLabel, { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Tare Weight")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            modelValue: wt.tareWeight,
                            "onUpdate:modelValue": ($event) => wt.tareWeight = $event,
                            type: "number",
                            step: "0.001",
                            placeholder: "0.000"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      wt.grossWeight && wt.tareWeight ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-muted-foreground"
                      }, [
                        createTextVNode(" Net: "),
                        createVNode("strong", null, toDisplayString((wt.grossWeight - wt.tareWeight).toFixed(3)), 1)
                      ])) : createCommentVNode("", true)
                    ]);
                  }), 128)),
                  createVNode(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    class: "w-full",
                    onClick: addWeightTicket
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Scale), { class: "size-4" }),
                      createTextVNode(" Add Weight Ticket ")
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
      _push(ssrRenderComponent(_component_UiCard, { class: "mt-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Invoice Items`);
                      } else {
                        return [
                          createTextVNode("Invoice Items")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Products being purchased`);
                      } else {
                        return [
                          createTextVNode("Products being purchased")
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
                          createTextVNode("Invoice Items")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Products being purchased")
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
                      description: "Add items to this purchase invoice",
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
                                                endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                                "label-key": "_label",
                                                placeholder: "Product...",
                                                class: "w-56"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_LookupCombobox, {
                                                  modelValue: item.productId,
                                                  "onUpdate:modelValue": ($event) => item.productId = $event,
                                                  endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                                  "label-key": "_label",
                                                  placeholder: "Product...",
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
                                                endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                                "label-key": "_label",
                                                placeholder: "Product...",
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
                                              endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                              "label-key": "_label",
                                              placeholder: "Product...",
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
                                            endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                            "label-key": "_label",
                                            placeholder: "Product...",
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
                        description: "Add items to this purchase invoice",
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
                                        endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                        "label-key": "_label",
                                        placeholder: "Product...",
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
                    _push3(`<div class="flex items-center justify-between w-full"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(form).items.length)} item${ssrInterpolate(unref(form).items.length !== 1 ? "s" : "")}</p><div class="text-right"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Total Amount</p><p class="text-xl font-bold"${_scopeId2}>${ssrInterpolate(unref(calculatedTotal).toFixed(2))}</p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between w-full" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).items.length) + " item" + toDisplayString(unref(form).items.length !== 1 ? "s" : ""), 1),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Amount"),
                          createVNode("p", { class: "text-xl font-bold" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
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
                        createTextVNode("Invoice Items")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Products being purchased")
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
                      description: "Add items to this purchase invoice",
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
                                      endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                      "label-key": "_label",
                                      placeholder: "Product...",
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
                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).items.length) + " item" + toDisplayString(unref(form).items.length !== 1 ? "s" : ""), 1),
                    createVNode("div", { class: "text-right" }, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Total Amount"),
                      createVNode("p", { class: "text-xl font-bold" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
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
      _push(`<div class="flex justify-end gap-3 mt-6">`);
      _push(ssrRenderComponent(_component_UiButton, {
        type: "button",
        variant: "outline",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases")
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
        disabled: unref(saving) || !unref(form).supplierId || !unref(form).warehouseId || unref(form).items.length === 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(saving) ? "Creating..." : "Create Invoice")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(saving) ? "Creating..." : "Create Invoice"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/purchases/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-B-oFoBGn.mjs.map
