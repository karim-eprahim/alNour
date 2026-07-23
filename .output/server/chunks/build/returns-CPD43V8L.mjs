import { _ as _sfc_main$6, a as _sfc_main$1, b as _sfc_main$2, c as _sfc_main$3, d as _sfc_main$4 } from './CardTitle-St-iDBLB.mjs';
import { _ as _sfc_main$5 } from './Label-fqACuvH5.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-KK7k7FV7.mjs';
import { _ as _sfc_main$7 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$1, b as _sfc_main$8, c as _sfc_main$9, d as _sfc_main$7$1 } from './SelectValue-CDW_Y5sR.mjs';
import { _ as _sfc_main$b } from './Input-DA89G3IO.mjs';
import { _ as _sfc_main$c } from './Textarea-BYfzemxZ.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, createVNode, isRef, unref, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Plus, X, PackageX } from '@lucide/vue';
import { u as useDistributorStore } from './store-c63gT4nW.mjs';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
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
import '@vueuse/core';
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';
import 'reka-ui';
import 'class-variance-authority';
import './api-Dq8IcxCC.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "returns",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const productsStore = useProductsStore();
    const items = ref([]);
    const warehouseId = ref("");
    const notes = ref("");
    const saving = ref(false);
    const products = computed(
      () => productsStore.products.filter((p) => p.type === "PACKAGED_CHARCOAL" || p.type === "OTHER")
    );
    function addItem() {
      items.value.push({ productId: "", productName: "", quantity: null });
    }
    function removeItem(index) {
      items.value.splice(index, 1);
    }
    function selectProduct(index, productId) {
      const p = products.value.find((pr) => pr.id === productId);
      if (p) {
        items.value[index].productId = p.id;
        items.value[index].productName = p.name;
      }
    }
    async function handleReturn() {
      if (!warehouseId.value || items.value.length === 0) {
        toast.error("Warehouse and at least one item are required");
        return;
      }
      saving.value = true;
      try {
        await store.createReturn({
          warehouseId: warehouseId.value,
          notes: notes.value || void 0,
          items: items.value.map((i) => ({
            productId: i.productId,
            quantity: i.quantity || 0
          }))
        });
        toast.success("Return submitted successfully");
        items.value = [];
        warehouseId.value = "";
        notes.value = "";
        await store.fetchCustody();
      } catch (err) {
        toast.error(err?.message || "Failed to submit return");
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiLabel = _sfc_main$5;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiButton = _sfc_main$7;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$1;
      const _component_UiSelectValue = _sfc_main$8;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7$1;
      const _component_UiInput = _sfc_main$b;
      const _component_UiTextarea = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-xl font-semibold tracking-tight">Returns</h1><p class="text-sm text-muted-foreground">Return inventory to warehouse</p></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Return Form`);
                      } else {
                        return [
                          createTextVNode("Return Form")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Select warehouse and items to return`);
                      } else {
                        return [
                          createTextVNode("Select warehouse and items to return")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-base" }, {
                      default: withCtx(() => [
                        createTextVNode("Return Form")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Select warehouse and items to return")
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
                    modelValue: unref(warehouseId),
                    "onUpdate:modelValue": ($event) => isRef(warehouseId) ? warehouseId.value = $event : null,
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
                  ssrRenderList(unref(items), (item, index) => {
                    _push3(`<div class="flex items-end gap-2 rounded-lg border p-3"${_scopeId2}><div class="flex-1"${_scopeId2}>`);
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
                                _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "Select" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiSelectValue, { placeholder: "Select" })
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
                                createVNode(_component_UiSelectValue, { placeholder: "Select" })
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
                    _push3(`</div><div class="w-24"${_scopeId2}>`);
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
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "ghost",
                      size: "icon",
                      class: "size-8 shrink-0",
                      onClick: ($event) => removeItem(index)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(X), { class: "size-4" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(X), { class: "size-4" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Notes (optional)`);
                      } else {
                        return [
                          createTextVNode("Notes (optional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTextarea, {
                    modelValue: unref(notes),
                    "onUpdate:modelValue": ($event) => isRef(notes) ? notes.value = $event : null,
                    placeholder: "Reason for return",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    class: "w-full",
                    disabled: unref(saving) || unref(items).length === 0,
                    onClick: handleReturn
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(PackageX), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` ${ssrInterpolate(unref(saving) ? "Submitting..." : "Submit Return")}`);
                      } else {
                        return [
                          createVNode(unref(PackageX), { class: "size-4" }),
                          createTextVNode(" " + toDisplayString(unref(saving) ? "Submitting..." : "Submit Return"), 1)
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
                        modelValue: unref(warehouseId),
                        "onUpdate:modelValue": ($event) => isRef(warehouseId) ? warehouseId.value = $event : null,
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
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(items), (item, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "flex items-end gap-2 rounded-lg border p-3"
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
                                    createVNode(_component_UiSelectValue, { placeholder: "Select" })
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
                          createVNode("div", { class: "w-24" }, [
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
                          createVNode(_component_UiButton, {
                            variant: "ghost",
                            size: "icon",
                            class: "size-8 shrink-0",
                            onClick: ($event) => removeItem(index)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(X), { class: "size-4" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Notes (optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        modelValue: unref(notes),
                        "onUpdate:modelValue": ($event) => isRef(notes) ? notes.value = $event : null,
                        placeholder: "Reason for return",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiButton, {
                      class: "w-full",
                      disabled: unref(saving) || unref(items).length === 0,
                      onClick: handleReturn
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(PackageX), { class: "size-4" }),
                        createTextVNode(" " + toDisplayString(unref(saving) ? "Submitting..." : "Submit Return"), 1)
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
                      createTextVNode("Return Form")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Select warehouse and items to return")
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
                      modelValue: unref(warehouseId),
                      "onUpdate:modelValue": ($event) => isRef(warehouseId) ? warehouseId.value = $event : null,
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
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(items), (item, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "flex items-end gap-2 rounded-lg border p-3"
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
                                  createVNode(_component_UiSelectValue, { placeholder: "Select" })
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
                        createVNode("div", { class: "w-24" }, [
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
                        createVNode(_component_UiButton, {
                          variant: "ghost",
                          size: "icon",
                          class: "size-8 shrink-0",
                          onClick: ($event) => removeItem(index)
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(X), { class: "size-4" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", null, [
                    createVNode(_component_UiLabel, null, {
                      default: withCtx(() => [
                        createTextVNode("Notes (optional)")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTextarea, {
                      modelValue: unref(notes),
                      "onUpdate:modelValue": ($event) => isRef(notes) ? notes.value = $event : null,
                      placeholder: "Reason for return",
                      class: "mt-1"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(_component_UiButton, {
                    class: "w-full",
                    disabled: unref(saving) || unref(items).length === 0,
                    onClick: handleReturn
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(PackageX), { class: "size-4" }),
                      createTextVNode(" " + toDisplayString(unref(saving) ? "Submitting..." : "Submit Return"), 1)
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/returns.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=returns-CPD43V8L.mjs.map
