import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4, e as _sfc_main$2$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$5 } from './Label-Di1i-yIq.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$7 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$8 } from './Textarea-B_fNd96X.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$8$1, a as _sfc_main$9, b as _sfc_main$4$1, c as _sfc_main$1$2, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-Cc67ZnYT.mjs';
import { n as navigateTo } from './server.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { f as fetchProductsLookupApi } from './api-Dq8IcxCC.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { ArrowLeft, X, Plus, Package, Factory } from '@lucide/vue';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useProductionStore } from './store-C09GJ09r.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
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
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    useProductionStore();
    useWarehousesStore();
    const productsStore = useProductsStore();
    const saving = ref(false);
    const form = reactive({
      warehouseId: "",
      laborCost: 0,
      otherCosts: 0,
      notes: "",
      consumptions: [],
      outputs: []
    });
    computed(
      () => productsStore.products.filter((p) => p.type === "RAW_CHARCOAL" || p.type === "OTHER")
    );
    computed(
      () => productsStore.products.filter((p) => p.type === "PACKAGED_CHARCOAL")
    );
    function addConsumption() {
      form.consumptions.push({ productId: "", quantity: null });
    }
    function removeConsumption(index) {
      form.consumptions.splice(index, 1);
    }
    function addOutput() {
      form.outputs.push({ productId: "", quantity: null, waste: 0 });
    }
    function removeOutput(index) {
      form.outputs.splice(index, 1);
    }
    const calculatedInputCost = computed(() => {
      let total = 0;
      for (const c of form.consumptions) {
        const product = productsStore.products.find((p) => p.id === c.productId);
        const price = product?.purchaseCost ? Number(product.purchaseCost) : 0;
        total += (c.quantity || 0) * price;
      }
      return total;
    });
    const totalOutputQty = computed(
      () => form.outputs.reduce((s, o) => s + (o.quantity || 0), 0)
    );
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
      const _component_UiTextarea = _sfc_main$8;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8$1;
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
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/production")
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
        title: "New Production Batch",
        description: "Record raw material consumption and finished product output"
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
                        _push4(`Batch Details`);
                      } else {
                        return [
                          createTextVNode("Batch Details")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Warehouse and cost information`);
                      } else {
                        return [
                          createTextVNode("Warehouse and cost information")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Batch Details")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Warehouse and cost information")
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
                    endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                    placeholder: "Select warehouse..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "laborCost" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Labor Cost`);
                      } else {
                        return [
                          createTextVNode("Labor Cost")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "laborCost",
                    modelValue: unref(form).laborCost,
                    "onUpdate:modelValue": ($event) => unref(form).laborCost = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "otherCosts" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Other Costs`);
                      } else {
                        return [
                          createTextVNode("Other Costs")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "otherCosts",
                    modelValue: unref(form).otherCosts,
                    "onUpdate:modelValue": ($event) => unref(form).otherCosts = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "notes" }, {
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
                  _push3(ssrRenderComponent(_component_UiTextarea, {
                    id: "notes",
                    modelValue: unref(form).notes,
                    "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                    placeholder: "Optional notes..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
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
                        endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                        placeholder: "Select warehouse..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "laborCost" }, {
                          default: withCtx(() => [
                            createTextVNode("Labor Cost")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "laborCost",
                          modelValue: unref(form).laborCost,
                          "onUpdate:modelValue": ($event) => unref(form).laborCost = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "0.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "otherCosts" }, {
                          default: withCtx(() => [
                            createTextVNode("Other Costs")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "otherCosts",
                          modelValue: unref(form).otherCosts,
                          "onUpdate:modelValue": ($event) => unref(form).otherCosts = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "0.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "notes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        id: "notes",
                        modelValue: unref(form).notes,
                        "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                        placeholder: "Optional notes..."
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
                      createTextVNode("Batch Details")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Warehouse and cost information")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx(() => [
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
                      endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                      placeholder: "Select warehouse..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "laborCost" }, {
                        default: withCtx(() => [
                          createTextVNode("Labor Cost")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "laborCost",
                        modelValue: unref(form).laborCost,
                        "onUpdate:modelValue": ($event) => unref(form).laborCost = $event,
                        type: "number",
                        step: "0.01",
                        placeholder: "0.00"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "otherCosts" }, {
                        default: withCtx(() => [
                          createTextVNode("Other Costs")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "otherCosts",
                        modelValue: unref(form).otherCosts,
                        "onUpdate:modelValue": ($event) => unref(form).otherCosts = $event,
                        type: "number",
                        step: "0.01",
                        placeholder: "0.00"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_UiLabel, { for: "notes" }, {
                      default: withCtx(() => [
                        createTextVNode("Notes")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTextarea, {
                      id: "notes",
                      modelValue: unref(form).notes,
                      "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                      placeholder: "Optional notes..."
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
                        _push4(`Raw Material Consumption`);
                      } else {
                        return [
                          createTextVNode("Raw Material Consumption")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Input products consumed in this batch`);
                      } else {
                        return [
                          createTextVNode("Input products consumed in this batch")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Raw Material Consumption")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Input products consumed in this batch")
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
                  ssrRenderList(unref(form).consumptions, (c, i) => {
                    _push3(`<div class="rounded-lg border p-3 space-y-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}><span class="text-xs font-medium text-muted-foreground"${_scopeId2}>Input #${ssrInterpolate(i + 1)}</span>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      type: "button",
                      variant: "ghost",
                      size: "icon-xs",
                      class: "text-destructive",
                      onClick: ($event) => removeConsumption(i)
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
                          _push4(`Product`);
                        } else {
                          return [
                            createTextVNode("Product")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_LookupCombobox, {
                      modelValue: c.productId,
                      "onUpdate:modelValue": ($event) => c.productId = $event,
                      endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                      "label-key": "name",
                      placeholder: "Select..."
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-1"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Quantity`);
                        } else {
                          return [
                            createTextVNode("Quantity")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      modelValue: c.quantity,
                      "onUpdate:modelValue": ($event) => c.quantity = $event,
                      type: "number",
                      step: "0.001",
                      placeholder: "0"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div></div>`);
                  });
                  _push3(`<!--]-->`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    class: "w-full",
                    onClick: addConsumption
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Add Input `);
                      } else {
                        return [
                          createVNode(unref(Plus), { class: "size-4" }),
                          createTextVNode(" Add Input ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(form).consumptions, (c, i) => {
                      return openBlock(), createBlock("div", {
                        key: i,
                        class: "rounded-lg border p-3 space-y-2"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-xs font-medium text-muted-foreground" }, "Input #" + toDisplayString(i + 1), 1),
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "ghost",
                            size: "icon-xs",
                            class: "text-destructive",
                            onClick: ($event) => removeConsumption(i)
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
                                createTextVNode("Product")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_LookupCombobox, {
                              modelValue: c.productId,
                              "onUpdate:modelValue": ($event) => c.productId = $event,
                              endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                              "label-key": "name",
                              placeholder: "Select..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                          ]),
                          createVNode("div", { class: "space-y-1" }, [
                            createVNode(_component_UiLabel, { class: "text-xs" }, {
                              default: withCtx(() => [
                                createTextVNode("Quantity")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              modelValue: c.quantity,
                              "onUpdate:modelValue": ($event) => c.quantity = $event,
                              type: "number",
                              step: "0.001",
                              placeholder: "0"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ])
                      ]);
                    }), 128)),
                    createVNode(_component_UiButton, {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      class: "w-full",
                      onClick: addConsumption
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "size-4" }),
                        createTextVNode(" Add Input ")
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
                      createTextVNode("Raw Material Consumption")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Input products consumed in this batch")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(form).consumptions, (c, i) => {
                    return openBlock(), createBlock("div", {
                      key: i,
                      class: "rounded-lg border p-3 space-y-2"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("span", { class: "text-xs font-medium text-muted-foreground" }, "Input #" + toDisplayString(i + 1), 1),
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "ghost",
                          size: "icon-xs",
                          class: "text-destructive",
                          onClick: ($event) => removeConsumption(i)
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
                              createTextVNode("Product")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LookupCombobox, {
                            modelValue: c.productId,
                            "onUpdate:modelValue": ($event) => c.productId = $event,
                            endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                            "label-key": "name",
                            placeholder: "Select..."
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                        ]),
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode(_component_UiLabel, { class: "text-xs" }, {
                            default: withCtx(() => [
                              createTextVNode("Quantity")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            modelValue: c.quantity,
                            "onUpdate:modelValue": ($event) => c.quantity = $event,
                            type: "number",
                            step: "0.001",
                            placeholder: "0"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])
                    ]);
                  }), 128)),
                  createVNode(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    class: "w-full",
                    onClick: addConsumption
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Plus), { class: "size-4" }),
                      createTextVNode(" Add Input ")
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
                        _push4(`Finished Product Output`);
                      } else {
                        return [
                          createTextVNode("Finished Product Output")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Packaged items produced from this batch`);
                      } else {
                        return [
                          createTextVNode("Packaged items produced from this batch")
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
                    onClick: addOutput
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Package), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Add Output `);
                      } else {
                        return [
                          createVNode(unref(Package), { class: "size-4" }),
                          createTextVNode(" Add Output ")
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
                          createTextVNode("Finished Product Output")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Packaged items produced from this batch")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_UiButton, {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: addOutput
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Package), { class: "size-4" }),
                        createTextVNode(" Add Output ")
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
                  if (unref(form).outputs.length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No outputs added",
                      description: "Add the finished products from this batch",
                      action: "Add Output",
                      onAction: addOutput
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
                                            _push7(`Waste`);
                                          } else {
                                            return [
                                              createTextVNode("Waste")
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
                                            createTextVNode("Waste")
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
                                          createTextVNode("Waste")
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
                                ssrRenderList(unref(form).outputs, (o, i) => {
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
                                                onClick: ($event) => removeOutput(i)
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
                                                  onClick: ($event) => removeOutput(i)
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
                                                modelValue: o.productId,
                                                "onUpdate:modelValue": ($event) => o.productId = $event,
                                                endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                                "label-key": "name",
                                                placeholder: "Select product...",
                                                class: "w-56"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_LookupCombobox, {
                                                  modelValue: o.productId,
                                                  "onUpdate:modelValue": ($event) => o.productId = $event,
                                                  endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                                  "label-key": "name",
                                                  placeholder: "Select product...",
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
                                                modelValue: o.quantity,
                                                "onUpdate:modelValue": ($event) => o.quantity = $event,
                                                type: "number",
                                                step: "0.001",
                                                placeholder: "0",
                                                class: "w-24 text-right"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiInput, {
                                                  modelValue: o.quantity,
                                                  "onUpdate:modelValue": ($event) => o.quantity = $event,
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
                                                modelValue: o.waste,
                                                "onUpdate:modelValue": ($event) => o.waste = $event,
                                                type: "number",
                                                step: "0.001",
                                                placeholder: "0",
                                                class: "w-24 text-right"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiInput, {
                                                  modelValue: o.waste,
                                                  "onUpdate:modelValue": ($event) => o.waste = $event,
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
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiButton, {
                                                type: "button",
                                                variant: "ghost",
                                                size: "icon-xs",
                                                class: "text-destructive",
                                                onClick: ($event) => removeOutput(i)
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
                                                modelValue: o.productId,
                                                "onUpdate:modelValue": ($event) => o.productId = $event,
                                                endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                                "label-key": "name",
                                                placeholder: "Select product...",
                                                class: "w-56"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiInput, {
                                                modelValue: o.quantity,
                                                "onUpdate:modelValue": ($event) => o.quantity = $event,
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
                                                modelValue: o.waste,
                                                "onUpdate:modelValue": ($event) => o.waste = $event,
                                                type: "number",
                                                step: "0.001",
                                                placeholder: "0",
                                                class: "w-24 text-right"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(form).outputs, (o, i) => {
                                    return openBlock(), createBlock(_component_UiTableRow, { key: i }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiButton, {
                                              type: "button",
                                              variant: "ghost",
                                              size: "icon-xs",
                                              class: "text-destructive",
                                              onClick: ($event) => removeOutput(i)
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
                                              modelValue: o.productId,
                                              "onUpdate:modelValue": ($event) => o.productId = $event,
                                              endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                              "label-key": "name",
                                              placeholder: "Select product...",
                                              class: "w-56"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiInput, {
                                              modelValue: o.quantity,
                                              "onUpdate:modelValue": ($event) => o.quantity = $event,
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
                                              modelValue: o.waste,
                                              "onUpdate:modelValue": ($event) => o.waste = $event,
                                              type: "number",
                                              step: "0.001",
                                              placeholder: "0",
                                              class: "w-24 text-right"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                        createTextVNode("Waste")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(form).outputs, (o, i) => {
                                  return openBlock(), createBlock(_component_UiTableRow, { key: i }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiButton, {
                                            type: "button",
                                            variant: "ghost",
                                            size: "icon-xs",
                                            class: "text-destructive",
                                            onClick: ($event) => removeOutput(i)
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
                                            modelValue: o.productId,
                                            "onUpdate:modelValue": ($event) => o.productId = $event,
                                            endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                            "label-key": "name",
                                            placeholder: "Select product...",
                                            class: "w-56"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiInput, {
                                            modelValue: o.quantity,
                                            "onUpdate:modelValue": ($event) => o.quantity = $event,
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
                                            modelValue: o.waste,
                                            "onUpdate:modelValue": ($event) => o.waste = $event,
                                            type: "number",
                                            step: "0.001",
                                            placeholder: "0",
                                            class: "w-24 text-right"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    unref(form).outputs.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No outputs added",
                        description: "Add the finished products from this batch",
                        action: "Add Output",
                        onAction: addOutput
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
                                    createTextVNode("Waste")
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).outputs, (o, i) => {
                              return openBlock(), createBlock(_component_UiTableRow, { key: i }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiButton, {
                                        type: "button",
                                        variant: "ghost",
                                        size: "icon-xs",
                                        class: "text-destructive",
                                        onClick: ($event) => removeOutput(i)
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
                                        modelValue: o.productId,
                                        "onUpdate:modelValue": ($event) => o.productId = $event,
                                        endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                        "label-key": "name",
                                        placeholder: "Select product...",
                                        class: "w-56"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiInput, {
                                        modelValue: o.quantity,
                                        "onUpdate:modelValue": ($event) => o.quantity = $event,
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
                                        modelValue: o.waste,
                                        "onUpdate:modelValue": ($event) => o.waste = $event,
                                        type: "number",
                                        step: "0.001",
                                        placeholder: "0",
                                        class: "w-24 text-right"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            if (unref(form).outputs.length > 0) {
              _push2(ssrRenderComponent(_component_UiCardFooter, { class: "border-t px-4 py-3" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between w-full"${_scopeId2}><div class="space-y-1"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Raw Material Cost: <strong${_scopeId2}>${ssrInterpolate(unref(calculatedInputCost).toFixed(2))}</strong></p><p class="text-sm text-muted-foreground"${_scopeId2}>Total Output Qty: <strong${_scopeId2}>${ssrInterpolate(unref(totalOutputQty).toFixed(3))}</strong></p></div><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(form).outputs.length)} output(s)</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between w-full" }, [
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, [
                            createTextVNode("Raw Material Cost: "),
                            createVNode("strong", null, toDisplayString(unref(calculatedInputCost).toFixed(2)), 1)
                          ]),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, [
                            createTextVNode("Total Output Qty: "),
                            createVNode("strong", null, toDisplayString(unref(totalOutputQty).toFixed(3)), 1)
                          ])
                        ]),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).outputs.length) + " output(s)", 1)
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
                        createTextVNode("Finished Product Output")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Packaged items produced from this batch")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: addOutput
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Package), { class: "size-4" }),
                      createTextVNode(" Add Output ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx(() => [
                  unref(form).outputs.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No outputs added",
                      description: "Add the finished products from this batch",
                      action: "Add Output",
                      onAction: addOutput
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
                                  createTextVNode("Waste")
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).outputs, (o, i) => {
                            return openBlock(), createBlock(_component_UiTableRow, { key: i }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiButton, {
                                      type: "button",
                                      variant: "ghost",
                                      size: "icon-xs",
                                      class: "text-destructive",
                                      onClick: ($event) => removeOutput(i)
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
                                      modelValue: o.productId,
                                      "onUpdate:modelValue": ($event) => o.productId = $event,
                                      endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                                      "label-key": "name",
                                      placeholder: "Select product...",
                                      class: "w-56"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiInput, {
                                      modelValue: o.quantity,
                                      "onUpdate:modelValue": ($event) => o.quantity = $event,
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
                                      modelValue: o.waste,
                                      "onUpdate:modelValue": ($event) => o.waste = $event,
                                      type: "number",
                                      step: "0.001",
                                      placeholder: "0",
                                      class: "w-24 text-right"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              unref(form).outputs.length > 0 ? (openBlock(), createBlock(_component_UiCardFooter, {
                key: 0,
                class: "border-t px-4 py-3"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between w-full" }, [
                    createVNode("div", { class: "space-y-1" }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, [
                        createTextVNode("Raw Material Cost: "),
                        createVNode("strong", null, toDisplayString(unref(calculatedInputCost).toFixed(2)), 1)
                      ]),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, [
                        createTextVNode("Total Output Qty: "),
                        createVNode("strong", null, toDisplayString(unref(totalOutputQty).toFixed(3)), 1)
                      ])
                    ]),
                    createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).outputs.length) + " output(s)", 1)
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
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/production")
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
        disabled: unref(saving) || !unref(form).warehouseId || unref(form).consumptions.length === 0 || unref(form).outputs.length === 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Factory), { class: "size-4" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(saving) ? "Creating..." : "Create Batch")}`);
          } else {
            return [
              createVNode(unref(Factory), { class: "size-4" }),
              createTextVNode(" " + toDisplayString(unref(saving) ? "Creating..." : "Create Batch"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/production/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-BOSyjKM5.mjs.map
