import { _ as _sfc_main$1 } from './index-CUpQupPt.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4, e as _sfc_main$2$1 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as _sfc_main$5 } from './Label-C-S6OHzh.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-B5GN9aF8.mjs';
import { _ as _sfc_main$7 } from './Input-BT7sGQjY.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$4$1, c as _sfc_main$1$2, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-BnIov8Zr.mjs';
import { _ as _sfc_main$a } from './Separator-BNaUuv25.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$3, d as _sfc_main$5$2, e as _sfc_main$4$2 } from './DialogTrigger-C62yxjGQ.mjs';
import { n as navigateTo } from './server.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { ArrowLeft, Scale, Plus, X } from '@lucide/vue';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useSuppliersStore, f as fetchSuppliersLookupApi } from './store-C8FOXexX.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { f as fetchProductsLookupApi } from './api-Dq8IcxCC.mjs';
import { u as usePurchasesStore } from './store-B0h3miBc.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './Textarea-Cs62HpDa.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
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
import 'vue-sonner';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    usePurchasesStore();
    const suppliersStore = useSuppliersStore();
    const warehousesStore = useWarehousesStore();
    useProductsStore();
    const saving = ref(false);
    const showWeightTickets = ref(false);
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
    const calculatedTotal = computed(() => {
      return form.items.reduce((sum, item) => {
        const qty = item.quantity || 0;
        const price = item.unitPrice || 0;
        return sum + qty * price;
      }, 0);
    });
    const totalQuantity = computed(
      () => form.items.reduce((sum, item) => sum + (item.quantity || 0), 0)
    );
    const paidAmountNumber = computed(() => Number(form.paidAmount) || 0);
    const amountDue = computed(() => calculatedTotal.value - paidAmountNumber.value);
    const totalNetWeight = computed(
      () => form.weightTickets.reduce((sum, wt) => {
        if (wt.grossWeight && wt.tareWeight) return sum + (wt.grossWeight - wt.tareWeight);
        return sum;
      }, 0)
    );
    const selectedSupplierName = computed(() => {
      const s = suppliersStore.suppliers.find((s2) => String(s2.id) === String(form.supplierId));
      return s ? `${s.name}${s.company ? ` (${s.company})` : ""}` : "—";
    });
    const selectedWarehouseName = computed(() => {
      const w = warehousesStore.warehouses.find((w2) => String(w2.id) === String(form.warehouseId));
      return w ? w.name : "—";
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
      const _component_UiSeparator = _sfc_main$a;
      const _component_UiDialog = _sfc_main$9$1;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5$2;
      const _component_UiDialogFooter = _sfc_main$4$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-5" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/purchases")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "size-4 rtl:rotate-180" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "size-4 rtl:rotate-180" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PageHeader, {
        title: "New Purchase Invoice",
        description: "Create a purchase invoice with items and weight tickets"
      }, null, _parent));
      _push(`</div><form><div class="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_330px]"><div class="min-w-0 space-y-5">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
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
                    createVNode(_component_UiCardTitle, { class: "text-base" }, {
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
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 sm:grid-cols-2"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
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
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
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
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-base" }, {
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
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
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
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-wrap items-center justify-between gap-3"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
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
                  _push3(`</div><div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => showWeightTickets.value = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Scale), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Weight Tickets${ssrInterpolate(unref(form).weightTickets.length > 0 ? ` (${unref(form).weightTickets.length})` : "")}`);
                      } else {
                        return [
                          createVNode(unref(Scale), { class: "size-4" }),
                          createTextVNode(" Weight Tickets" + toDisplayString(unref(form).weightTickets.length > 0 ? ` (${unref(form).weightTickets.length})` : ""), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiButton, {
                    type: "button",
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
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
                      createVNode("div", null, [
                        createVNode(_component_UiCardTitle, { class: "text-base" }, {
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
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          onClick: ($event) => showWeightTickets.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Scale), { class: "size-4" }),
                            createTextVNode(" Weight Tickets" + toDisplayString(unref(form).weightTickets.length > 0 ? ` (${unref(form).weightTickets.length})` : ""), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "button",
                          size: "sm",
                          onClick: addItem
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Plus), { class: "size-4" }),
                            createTextVNode(" Add Item ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(form).items.length === 0) {
                    _push3(`<div class="p-6 pt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No items added",
                      description: "Add items to this purchase invoice",
                      action: "Add Item",
                      onAction: addItem
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="overflow-x-auto"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiTable, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiTableHeader, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiTableRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "min-w-45" }, {
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
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "w-28" }, {
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
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "w-32" }, {
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
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "w-28 text-end" }, {
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
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "w-10" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<span class="sr-only"${_scopeId6}>Remove</span>`);
                                          } else {
                                            return [
                                              createVNode("span", { class: "sr-only" }, "Remove")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHead, { class: "min-w-45" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Product")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "w-28" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Quantity")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "w-32" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Unit Price")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "w-28 text-end" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Total")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "w-10" }, {
                                          default: withCtx(() => [
                                            createVNode("span", { class: "sr-only" }, "Remove")
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
                                      createVNode(_component_UiTableHead, { class: "min-w-45" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Product")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "w-28" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Quantity")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "w-32" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Unit Price")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "w-28 text-end" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Total")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "w-10" }, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "sr-only" }, "Remove")
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
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "min-w-45" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_LookupCombobox, {
                                                modelValue: item.productId,
                                                "onUpdate:modelValue": ($event) => item.productId = $event,
                                                endpoint: unref(fetchProductsLookupApi),
                                                "label-key": "_label",
                                                placeholder: "Product...",
                                                class: "w-full"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_LookupCombobox, {
                                                  modelValue: item.productId,
                                                  "onUpdate:modelValue": ($event) => item.productId = $event,
                                                  endpoint: unref(fetchProductsLookupApi),
                                                  "label-key": "_label",
                                                  placeholder: "Product...",
                                                  class: "w-full"
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
                                                class: "w-full tabular-nums"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiInput, {
                                                  modelValue: item.quantity,
                                                  "onUpdate:modelValue": ($event) => item.quantity = $event,
                                                  type: "number",
                                                  step: "0.001",
                                                  placeholder: "0",
                                                  class: "w-full tabular-nums"
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
                                                class: "w-full tabular-nums"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiInput, {
                                                  modelValue: item.unitPrice,
                                                  "onUpdate:modelValue": ($event) => item.unitPrice = $event,
                                                  type: "number",
                                                  step: "0.01",
                                                  placeholder: "0.00",
                                                  class: "w-full tabular-nums"
                                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-end font-medium tabular-nums" }, {
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
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-end" }, {
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
                                                    _push8(`<span class="sr-only"${_scopeId7}>Remove item</span>`);
                                                  } else {
                                                    return [
                                                      createVNode(unref(X), { class: "size-3.5" }),
                                                      createVNode("span", { class: "sr-only" }, "Remove item")
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
                                                    createVNode(unref(X), { class: "size-3.5" }),
                                                    createVNode("span", { class: "sr-only" }, "Remove item")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, { class: "min-w-45" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_LookupCombobox, {
                                                modelValue: item.productId,
                                                "onUpdate:modelValue": ($event) => item.productId = $event,
                                                endpoint: unref(fetchProductsLookupApi),
                                                "label-key": "_label",
                                                placeholder: "Product...",
                                                class: "w-full"
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
                                                class: "w-full tabular-nums"
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
                                                class: "w-full tabular-nums"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-end font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-end" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiButton, {
                                                type: "button",
                                                variant: "ghost",
                                                size: "icon-xs",
                                                class: "text-destructive",
                                                onClick: ($event) => removeItem(i)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(X), { class: "size-3.5" }),
                                                  createVNode("span", { class: "sr-only" }, "Remove item")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
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
                                        createVNode(_component_UiTableCell, { class: "min-w-45" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_LookupCombobox, {
                                              modelValue: item.productId,
                                              "onUpdate:modelValue": ($event) => item.productId = $event,
                                              endpoint: unref(fetchProductsLookupApi),
                                              "label-key": "_label",
                                              placeholder: "Product...",
                                              class: "w-full"
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
                                              class: "w-full tabular-nums"
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
                                              class: "w-full tabular-nums"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-end font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-end" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiButton, {
                                              type: "button",
                                              variant: "ghost",
                                              size: "icon-xs",
                                              class: "text-destructive",
                                              onClick: ($event) => removeItem(i)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(X), { class: "size-3.5" }),
                                                createVNode("span", { class: "sr-only" }, "Remove item")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])
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
                                    createVNode(_component_UiTableHead, { class: "min-w-45" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Product")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "w-28" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Quantity")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "w-32" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Unit Price")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "w-28 text-end" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Total")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "w-10" }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "sr-only" }, "Remove")
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
                                      createVNode(_component_UiTableCell, { class: "min-w-45" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_LookupCombobox, {
                                            modelValue: item.productId,
                                            "onUpdate:modelValue": ($event) => item.productId = $event,
                                            endpoint: unref(fetchProductsLookupApi),
                                            "label-key": "_label",
                                            placeholder: "Product...",
                                            class: "w-full"
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
                                            class: "w-full tabular-nums"
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
                                            class: "w-full tabular-nums"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-end font-medium tabular-nums" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-end" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiButton, {
                                            type: "button",
                                            variant: "ghost",
                                            size: "icon-xs",
                                            class: "text-destructive",
                                            onClick: ($event) => removeItem(i)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(X), { class: "size-3.5" }),
                                              createVNode("span", { class: "sr-only" }, "Remove item")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
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
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    unref(form).items.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6 pt-2"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No items added",
                        description: "Add items to this purchase invoice",
                        action: "Add Item",
                        onAction: addItem
                      })
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "overflow-x-auto"
                    }, [
                      createVNode(_component_UiTable, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiTableHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHead, { class: "min-w-45" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Product")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, { class: "w-28" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Quantity")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, { class: "w-32" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Unit Price")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, { class: "w-28 text-end" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Total")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, { class: "w-10" }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "sr-only" }, "Remove")
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
                                    createVNode(_component_UiTableCell, { class: "min-w-45" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_LookupCombobox, {
                                          modelValue: item.productId,
                                          "onUpdate:modelValue": ($event) => item.productId = $event,
                                          endpoint: unref(fetchProductsLookupApi),
                                          "label-key": "_label",
                                          placeholder: "Product...",
                                          class: "w-full"
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
                                          class: "w-full tabular-nums"
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
                                          class: "w-full tabular-nums"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-end font-medium tabular-nums" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-end" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiButton, {
                                          type: "button",
                                          variant: "ghost",
                                          size: "icon-xs",
                                          class: "text-destructive",
                                          onClick: ($event) => removeItem(i)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(X), { class: "size-3.5" }),
                                            createVNode("span", { class: "sr-only" }, "Remove item")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
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
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(form).items.length > 0) {
              _push2(ssrRenderComponent(_component_UiCardFooter, { class: "border-t px-4 py-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex w-full items-center justify-between"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(form).items.length)} item${ssrInterpolate(unref(form).items.length !== 1 ? "s" : "")}</p><div class="text-end"${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Total Amount</p><p class="text-xl font-bold tabular-nums"${_scopeId2}>${ssrInterpolate(unref(calculatedTotal).toFixed(2))}</p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex w-full items-center justify-between" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).items.length) + " item" + toDisplayString(unref(form).items.length !== 1 ? "s" : ""), 1),
                        createVNode("div", { class: "text-end" }, [
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
              createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, { class: "text-base" }, {
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
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UiButton, {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => showWeightTickets.value = true
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Scale), { class: "size-4" }),
                          createTextVNode(" Weight Tickets" + toDisplayString(unref(form).weightTickets.length > 0 ? ` (${unref(form).weightTickets.length})` : ""), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiButton, {
                        type: "button",
                        size: "sm",
                        onClick: addItem
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "size-4" }),
                          createTextVNode(" Add Item ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx(() => [
                  unref(form).items.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6 pt-2"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No items added",
                      description: "Add items to this purchase invoice",
                      action: "Add Item",
                      onAction: addItem
                    })
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "overflow-x-auto"
                  }, [
                    createVNode(_component_UiTable, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiTableRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHead, { class: "min-w-45" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Product")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "w-28" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Quantity")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "w-32" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Unit Price")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "w-28 text-end" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Total")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "w-10" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "sr-only" }, "Remove")
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
                                  createVNode(_component_UiTableCell, { class: "min-w-45" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_LookupCombobox, {
                                        modelValue: item.productId,
                                        "onUpdate:modelValue": ($event) => item.productId = $event,
                                        endpoint: unref(fetchProductsLookupApi),
                                        "label-key": "_label",
                                        placeholder: "Product...",
                                        class: "w-full"
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
                                        class: "w-full tabular-nums"
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
                                        class: "w-full tabular-nums"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-end font-medium tabular-nums" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-end" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiButton, {
                                        type: "button",
                                        variant: "ghost",
                                        size: "icon-xs",
                                        class: "text-destructive",
                                        onClick: ($event) => removeItem(i)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(X), { class: "size-3.5" }),
                                          createVNode("span", { class: "sr-only" }, "Remove item")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
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
                  ]))
                ]),
                _: 1
              }),
              unref(form).items.length > 0 ? (openBlock(), createBlock(_component_UiCardFooter, {
                key: 0,
                class: "border-t px-4 py-3"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex w-full items-center justify-between" }, [
                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).items.length) + " item" + toDisplayString(unref(form).items.length !== 1 ? "s" : ""), 1),
                    createVNode("div", { class: "text-end" }, [
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
      _push(`<div class="flex justify-end gap-3">`);
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
      _push(`</div></div><aside class="min-w-0 lg:sticky lg:top-20">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Invoice Summary`);
                      } else {
                        return [
                          createTextVNode("Invoice Summary")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Invoice Summary")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4 text-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2.5"${_scopeId2}><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Supplier</p><p class="truncate font-medium"${_scopeId2}>${ssrInterpolate(unref(selectedSupplierName))}</p></div><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Warehouse</p><p class="truncate font-medium"${_scopeId2}>${ssrInterpolate(unref(selectedWarehouseName))}</p></div><div${_scopeId2}><p class="text-xs text-muted-foreground"${_scopeId2}>Invoice Date</p><p class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(unref(form).invoiceDate || "—")}</p></div></div>`);
                  _push3(ssrRenderComponent(_component_UiSeparator, null, null, _parent3, _scopeId2));
                  _push3(`<dl class="space-y-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Items</dt><dd class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(unref(form).items.length)}</dd></div><div class="flex items-center justify-between"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Total Quantity</dt><dd class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(unref(totalQuantity))}</dd></div></dl>`);
                  _push3(ssrRenderComponent(_component_UiSeparator, null, null, _parent3, _scopeId2));
                  _push3(`<dl class="space-y-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Subtotal</dt><dd class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(unref(calculatedTotal).toFixed(2))}</dd></div><div class="flex items-center justify-between"${_scopeId2}><dt class="text-muted-foreground"${_scopeId2}>Amount Paid</dt><dd class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(unref(paidAmountNumber).toFixed(2))}</dd></div><div class="flex items-center justify-between pt-1"${_scopeId2}><dt class="font-semibold"${_scopeId2}>Amount Due</dt><dd class="text-lg font-bold text-primary tabular-nums"${_scopeId2}>${ssrInterpolate(unref(amountDue).toFixed(2))}</dd></div></dl>`);
                  _push3(ssrRenderComponent(_component_UiSeparator, null, null, _parent3, _scopeId2));
                  _push3(`<button type="button" class="flex w-full items-center justify-between rounded-md px-1 py-0.5 text-start transition-colors hover:bg-muted/60"${_scopeId2}><span class="inline-flex items-center gap-1.5 text-muted-foreground"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Scale), { class: "size-3.5" }, null, _parent3, _scopeId2));
                  _push3(` Weight Tickets </span><span class="font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(unref(form).weightTickets.length)}${ssrInterpolate(unref(totalNetWeight) > 0 ? ` · ${unref(totalNetWeight).toFixed(3)}` : "")}</span></button>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2.5" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Supplier"),
                        createVNode("p", { class: "truncate font-medium" }, toDisplayString(unref(selectedSupplierName)), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Warehouse"),
                        createVNode("p", { class: "truncate font-medium" }, toDisplayString(unref(selectedWarehouseName)), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted-foreground" }, "Invoice Date"),
                        createVNode("p", { class: "font-medium tabular-nums" }, toDisplayString(unref(form).invoiceDate || "—"), 1)
                      ])
                    ]),
                    createVNode(_component_UiSeparator),
                    createVNode("dl", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("dt", { class: "text-muted-foreground" }, "Items"),
                        createVNode("dd", { class: "font-medium tabular-nums" }, toDisplayString(unref(form).items.length), 1)
                      ]),
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("dt", { class: "text-muted-foreground" }, "Total Quantity"),
                        createVNode("dd", { class: "font-medium tabular-nums" }, toDisplayString(unref(totalQuantity)), 1)
                      ])
                    ]),
                    createVNode(_component_UiSeparator),
                    createVNode("dl", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("dt", { class: "text-muted-foreground" }, "Subtotal"),
                        createVNode("dd", { class: "font-medium tabular-nums" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("dt", { class: "text-muted-foreground" }, "Amount Paid"),
                        createVNode("dd", { class: "font-medium tabular-nums" }, toDisplayString(unref(paidAmountNumber).toFixed(2)), 1)
                      ]),
                      createVNode("div", { class: "flex items-center justify-between pt-1" }, [
                        createVNode("dt", { class: "font-semibold" }, "Amount Due"),
                        createVNode("dd", { class: "text-lg font-bold text-primary tabular-nums" }, toDisplayString(unref(amountDue).toFixed(2)), 1)
                      ])
                    ]),
                    createVNode(_component_UiSeparator),
                    createVNode("button", {
                      type: "button",
                      class: "flex w-full items-center justify-between rounded-md px-1 py-0.5 text-start transition-colors hover:bg-muted/60",
                      onClick: ($event) => showWeightTickets.value = true
                    }, [
                      createVNode("span", { class: "inline-flex items-center gap-1.5 text-muted-foreground" }, [
                        createVNode(unref(Scale), { class: "size-3.5" }),
                        createTextVNode(" Weight Tickets ")
                      ]),
                      createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(unref(form).weightTickets.length) + toDisplayString(unref(totalNetWeight) > 0 ? ` · ${unref(totalNetWeight).toFixed(3)}` : ""), 1)
                    ], 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-base" }, {
                    default: withCtx(() => [
                      createTextVNode("Invoice Summary")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-4 text-sm" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-2.5" }, [
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Supplier"),
                      createVNode("p", { class: "truncate font-medium" }, toDisplayString(unref(selectedSupplierName)), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Warehouse"),
                      createVNode("p", { class: "truncate font-medium" }, toDisplayString(unref(selectedWarehouseName)), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Invoice Date"),
                      createVNode("p", { class: "font-medium tabular-nums" }, toDisplayString(unref(form).invoiceDate || "—"), 1)
                    ])
                  ]),
                  createVNode(_component_UiSeparator),
                  createVNode("dl", { class: "space-y-2" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("dt", { class: "text-muted-foreground" }, "Items"),
                      createVNode("dd", { class: "font-medium tabular-nums" }, toDisplayString(unref(form).items.length), 1)
                    ]),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("dt", { class: "text-muted-foreground" }, "Total Quantity"),
                      createVNode("dd", { class: "font-medium tabular-nums" }, toDisplayString(unref(totalQuantity)), 1)
                    ])
                  ]),
                  createVNode(_component_UiSeparator),
                  createVNode("dl", { class: "space-y-2" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("dt", { class: "text-muted-foreground" }, "Subtotal"),
                      createVNode("dd", { class: "font-medium tabular-nums" }, toDisplayString(unref(calculatedTotal).toFixed(2)), 1)
                    ]),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("dt", { class: "text-muted-foreground" }, "Amount Paid"),
                      createVNode("dd", { class: "font-medium tabular-nums" }, toDisplayString(unref(paidAmountNumber).toFixed(2)), 1)
                    ]),
                    createVNode("div", { class: "flex items-center justify-between pt-1" }, [
                      createVNode("dt", { class: "font-semibold" }, "Amount Due"),
                      createVNode("dd", { class: "text-lg font-bold text-primary tabular-nums" }, toDisplayString(unref(amountDue).toFixed(2)), 1)
                    ])
                  ]),
                  createVNode(_component_UiSeparator),
                  createVNode("button", {
                    type: "button",
                    class: "flex w-full items-center justify-between rounded-md px-1 py-0.5 text-start transition-colors hover:bg-muted/60",
                    onClick: ($event) => showWeightTickets.value = true
                  }, [
                    createVNode("span", { class: "inline-flex items-center gap-1.5 text-muted-foreground" }, [
                      createVNode(unref(Scale), { class: "size-3.5" }),
                      createTextVNode(" Weight Tickets ")
                    ]),
                    createVNode("span", { class: "font-medium tabular-nums" }, toDisplayString(unref(form).weightTickets.length) + toDisplayString(unref(totalNetWeight) > 0 ? ` · ${unref(totalNetWeight).toFixed(3)}` : ""), 1)
                  ], 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</aside></div></form>`);
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showWeightTickets),
        "onUpdate:open": ($event) => showWeightTickets.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-lg" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Weight Tickets`);
                            } else {
                              return [
                                createTextVNode("Weight Tickets")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record load weights for raw materials`);
                            } else {
                              return [
                                createTextVNode("Record load weights for raw materials")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Weight Tickets")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Record load weights for raw materials")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="max-h-[50vh] space-y-3 overflow-y-auto pe-0.5"${_scopeId2}>`);
                  if (unref(form).weightTickets.length === 0) {
                    _push3(`<p class="py-4 text-center text-sm text-muted-foreground"${_scopeId2}> No weight tickets yet. Add one to record a load. </p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(form).weightTickets, (wt, i) => {
                    _push3(`<div class="space-y-2 rounded-lg border p-3"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><span class="text-xs font-medium text-muted-foreground"${_scopeId2}>Ticket #${ssrInterpolate(i + 1)}</span>`);
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
                          _push4(`<span class="sr-only"${_scopeId3}>Remove ticket</span>`);
                        } else {
                          return [
                            createVNode(unref(X), { class: "size-3.5" }),
                            createVNode("span", { class: "sr-only" }, "Remove ticket")
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
                      _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}> Net: <strong class="tabular-nums"${_scopeId2}>${ssrInterpolate((wt.grossWeight - wt.tareWeight).toFixed(3))}</strong></p>`);
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
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"${_scopeId3}>`);
                        if (unref(form).weightTickets.length > 0) {
                          _push4(`<p class="text-xs text-muted-foreground tabular-nums"${_scopeId3}> Total net: <strong${_scopeId3}>${ssrInterpolate(unref(totalNetWeight).toFixed(3))}</strong></p>`);
                        } else {
                          _push4(`<span${_scopeId3}></span>`);
                        }
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          onClick: ($event) => showWeightTickets.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Done`);
                            } else {
                              return [
                                createTextVNode("Done")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between" }, [
                            unref(form).weightTickets.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-muted-foreground tabular-nums"
                            }, [
                              createTextVNode(" Total net: "),
                              createVNode("strong", null, toDisplayString(unref(totalNetWeight).toFixed(3)), 1)
                            ])) : (openBlock(), createBlock("span", { key: 1 })),
                            createVNode(_component_UiButton, {
                              type: "button",
                              onClick: ($event) => showWeightTickets.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Done")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Weight Tickets")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Record load weights for raw materials")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "max-h-[50vh] space-y-3 overflow-y-auto pe-0.5" }, [
                      unref(form).weightTickets.length === 0 ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "py-4 text-center text-sm text-muted-foreground"
                      }, " No weight tickets yet. Add one to record a load. ")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).weightTickets, (wt, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "space-y-2 rounded-lg border p-3"
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
                                createVNode(unref(X), { class: "size-3.5" }),
                                createVNode("span", { class: "sr-only" }, "Remove ticket")
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
                            createVNode("strong", { class: "tabular-nums" }, toDisplayString((wt.grossWeight - wt.tareWeight).toFixed(3)), 1)
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
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between" }, [
                          unref(form).weightTickets.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-muted-foreground tabular-nums"
                          }, [
                            createTextVNode(" Total net: "),
                            createVNode("strong", null, toDisplayString(unref(totalNetWeight).toFixed(3)), 1)
                          ])) : (openBlock(), createBlock("span", { key: 1 })),
                          createVNode(_component_UiButton, {
                            type: "button",
                            onClick: ($event) => showWeightTickets.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Done")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-lg" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Weight Tickets")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Record load weights for raw materials")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "max-h-[50vh] space-y-3 overflow-y-auto pe-0.5" }, [
                    unref(form).weightTickets.length === 0 ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "py-4 text-center text-sm text-muted-foreground"
                    }, " No weight tickets yet. Add one to record a load. ")) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(form).weightTickets, (wt, i) => {
                      return openBlock(), createBlock("div", {
                        key: i,
                        class: "space-y-2 rounded-lg border p-3"
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
                              createVNode(unref(X), { class: "size-3.5" }),
                              createVNode("span", { class: "sr-only" }, "Remove ticket")
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
                          createVNode("strong", { class: "tabular-nums" }, toDisplayString((wt.grossWeight - wt.tareWeight).toFixed(3)), 1)
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
                  createVNode(_component_UiDialogFooter, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between" }, [
                        unref(form).weightTickets.length > 0 ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-muted-foreground tabular-nums"
                        }, [
                          createTextVNode(" Total net: "),
                          createVNode("strong", null, toDisplayString(unref(totalNetWeight).toFixed(3)), 1)
                        ])) : (openBlock(), createBlock("span", { key: 1 })),
                        createVNode(_component_UiButton, {
                          type: "button",
                          onClick: ($event) => showWeightTickets.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Done")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
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
//# sourceMappingURL=new-OzqkRN8j.mjs.map
