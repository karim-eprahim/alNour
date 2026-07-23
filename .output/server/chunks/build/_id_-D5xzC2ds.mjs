import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$3, a as _sfc_main$1$1, b as _sfc_main$2, c as _sfc_main$2$1 } from './index-CsamvZIh.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$2, c as _sfc_main$4, d as _sfc_main$3$1, a as _sfc_main$4$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$5 } from './index-CaQj38bB.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$8, a as _sfc_main$7, b as _sfc_main$4$2, c as _sfc_main$1$3, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-Cc67ZnYT.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$4, d as _sfc_main$5$2, e as _sfc_main$4$3 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$a } from './Label-Di1i-yIq.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$a$1, a as _sfc_main$1$5, b as _sfc_main$b, c as _sfc_main$9$1, d as _sfc_main$7$2 } from './SelectValue-CdUm-rR7.mjs';
import { _ as _sfc_main$c } from './Input-pgd-3rGf.mjs';
import { a as useRoute, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, reactive, resolveDirective, mergeProps, unref, withCtx, createVNode, isRef, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withDirectives, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList } from 'vue/server-renderer';
import { ArrowLeft, Package, ArrowRightLeft, Warehouse } from '@lucide/vue';
import { M as MOVEMENT_TYPES } from './type-x9vthGPe.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { toast } from 'vue-sonner';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import { u as useStockStore } from './store-C963M0dS.mjs';
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
import 'clsx';
import 'tailwind-merge';
import './api-Dq8IcxCC.mjs';
import './api-CNHGsjgp.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const productId = computed(() => route.params.id);
    const productsStore = useProductsStore();
    const warehousesStore = useWarehousesStore();
    const stockStore = useStockStore();
    const activeTab = ref("details");
    const showMovementDialog = ref(false);
    const movementForm = reactive({
      warehouseId: "",
      type: "ADJUSTMENT",
      quantity: null
    });
    const adjustmentTypes = MOVEMENT_TYPES.filter((m) => ["PURCHASE", "ADJUSTMENT", "SALE"].includes(m.value));
    async function fetchProduct() {
      await productsStore.fetchProduct(productId.value);
      await stockStore.fetchMovements({ productId: productId.value, limit: 20 });
      await warehousesStore.fetchWarehouses();
    }
    async function handleMovement() {
      if (!movementForm.warehouseId || !movementForm.quantity) return;
      try {
        await stockStore.createMovement({
          productId: productId.value,
          warehouseId: movementForm.warehouseId,
          type: movementForm.type,
          quantity: movementForm.quantity
        });
        showMovementDialog.value = false;
        movementForm.warehouseId = "";
        movementForm.type = "ADJUSTMENT";
        movementForm.quantity = null;
        toast.success("Stock movement recorded");
        fetchProduct();
      } catch {
      }
    }
    function movementTypeVariant(type) {
      const increase = MOVEMENT_TYPES.find((m) => m.value === type)?.isIncrease;
      return increase ? "default" : "destructive";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiTabs = _sfc_main$3;
      const _component_UiTabsList = _sfc_main$1$1;
      const _component_UiTabsTrigger = _sfc_main$2;
      const _component_UiTabsContent = _sfc_main$2$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiBadge = _sfc_main$5;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$7;
      const _component_UiTableRow = _sfc_main$4$2;
      const _component_UiTableHead = _sfc_main$1$3;
      const _component_UiTableBody = _sfc_main$7$1;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$2;
      const _component_UiDialogTitle = _sfc_main$1$4;
      const _component_UiDialogDescription = _sfc_main$5$2;
      const _component_UiLabel = _sfc_main$a;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiSelect = _sfc_main$a$1;
      const _component_UiSelectTrigger = _sfc_main$1$5;
      const _component_UiSelectValue = _sfc_main$b;
      const _component_UiSelectContent = _sfc_main$9$1;
      const _component_UiSelectItem = _sfc_main$7$2;
      const _component_UiInput = _sfc_main$c;
      const _component_UiDialogFooter = _sfc_main$4$3;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/products")
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
      _push(`<div class="flex items-center gap-3 flex-1"><div class="size-10 flex items-center justify-center rounded-lg bg-muted overflow-hidden">`);
      if (unref(productsStore).currentProduct?.image) {
        _push(`<img${ssrRenderAttr("src", unref(productsStore).currentProduct.image)} alt="" class="size-full object-cover">`);
      } else {
        _push(ssrRenderComponent(unref(Package), { class: "size-5 text-muted-foreground" }, null, _parent));
      }
      _push(`</div><div><h1 class="text-lg font-semibold">${ssrInterpolate(unref(productsStore).currentProduct?.name || "Loading...")}</h1><p class="text-xs text-muted-foreground">${ssrInterpolate(unref(productsStore).currentProduct?.sku)}</p></div></div></div>`);
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
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "details" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Details`);
                      } else {
                        return [
                          createTextVNode("Details")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "stock" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Stock`);
                      } else {
                        return [
                          createTextVNode("Stock")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "movements" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Movements`);
                      } else {
                        return [
                          createTextVNode("Movements")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsTrigger, { value: "details" }, {
                      default: withCtx(() => [
                        createTextVNode("Details")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "stock" }, {
                      default: withCtx(() => [
                        createTextVNode("Stock")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "movements" }, {
                      default: withCtx(() => [
                        createTextVNode("Movements")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "details" }, {
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
                                    _push6(`Product Information`);
                                  } else {
                                    return [
                                      createTextVNode("Product Information")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Product details and pricing`);
                                  } else {
                                    return [
                                      createTextVNode("Product details and pricing")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Product Information")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Product details and pricing")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(productsStore).loading && !unref(productsStore).currentProduct) {
                                _push5(`<div class="flex justify-center py-8"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_LoadingState, null, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else if (unref(productsStore).currentProduct) {
                                _push5(`<div class="grid gap-6 sm:grid-cols-2"${_scopeId4}><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Name (English)</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(unref(productsStore).currentProduct.name)}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Name (Arabic)</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(unref(productsStore).currentProduct.nameAr)}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>SKU</p><p class="text-sm font-mono"${_scopeId4}>${ssrInterpolate(unref(productsStore).currentProduct.sku)}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Type</p>`);
                                _push5(ssrRenderComponent(_component_UiBadge, {
                                  variant: "secondary",
                                  class: "text-xs"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(unref(productsStore).currentProduct.type.replace("_", " "))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(unref(productsStore).currentProduct.type.replace("_", " ")), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Weight</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(unref(productsStore).currentProduct.weight ? `${Number(unref(productsStore).currentProduct.weight).toFixed(3)}` : "Not set")}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Purchase Cost</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(unref(productsStore).currentProduct.purchaseCost ? `${Number(unref(productsStore).currentProduct.purchaseCost).toFixed(2)}` : "Not set")}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Selling Price</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(unref(productsStore).currentProduct.sellingPrice ? `${Number(unref(productsStore).currentProduct.sellingPrice).toFixed(2)}` : "Not set")}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Created</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(new Date(unref(productsStore).currentProduct.createdAt).toLocaleDateString())}</p></div></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                unref(productsStore).loading && !unref(productsStore).currentProduct ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex justify-center py-8"
                                }, [
                                  createVNode(_component_LoadingState)
                                ])) : unref(productsStore).currentProduct ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "grid gap-6 sm:grid-cols-2"
                                }, [
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name (English)"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.name), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name (Arabic)"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.nameAr), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "SKU"),
                                    createVNode("p", { class: "text-sm font-mono" }, toDisplayString(unref(productsStore).currentProduct.sku), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Type"),
                                    createVNode(_component_UiBadge, {
                                      variant: "secondary",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(productsStore).currentProduct.type.replace("_", " ")), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Weight"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.weight ? `${Number(unref(productsStore).currentProduct.weight).toFixed(3)}` : "Not set"), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Purchase Cost"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.purchaseCost ? `${Number(unref(productsStore).currentProduct.purchaseCost).toFixed(2)}` : "Not set"), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Selling Price"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.sellingPrice ? `${Number(unref(productsStore).currentProduct.sellingPrice).toFixed(2)}` : "Not set"), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Created"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(new Date(unref(productsStore).currentProduct.createdAt).toLocaleDateString()), 1)
                                  ])
                                ])) : createCommentVNode("", true)
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
                                  createTextVNode("Product Information")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Product details and pricing")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, null, {
                            default: withCtx(() => [
                              unref(productsStore).loading && !unref(productsStore).currentProduct ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex justify-center py-8"
                              }, [
                                createVNode(_component_LoadingState)
                              ])) : unref(productsStore).currentProduct ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "grid gap-6 sm:grid-cols-2"
                              }, [
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name (English)"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.name), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name (Arabic)"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.nameAr), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "SKU"),
                                  createVNode("p", { class: "text-sm font-mono" }, toDisplayString(unref(productsStore).currentProduct.sku), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Type"),
                                  createVNode(_component_UiBadge, {
                                    variant: "secondary",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(productsStore).currentProduct.type.replace("_", " ")), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Weight"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.weight ? `${Number(unref(productsStore).currentProduct.weight).toFixed(3)}` : "Not set"), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Purchase Cost"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.purchaseCost ? `${Number(unref(productsStore).currentProduct.purchaseCost).toFixed(2)}` : "Not set"), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Selling Price"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.sellingPrice ? `${Number(unref(productsStore).currentProduct.sellingPrice).toFixed(2)}` : "Not set"), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Created"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(new Date(unref(productsStore).currentProduct.createdAt).toLocaleDateString()), 1)
                                ])
                              ])) : createCommentVNode("", true)
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
                                createTextVNode("Product Information")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Product details and pricing")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, null, {
                          default: withCtx(() => [
                            unref(productsStore).loading && !unref(productsStore).currentProduct ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex justify-center py-8"
                            }, [
                              createVNode(_component_LoadingState)
                            ])) : unref(productsStore).currentProduct ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "grid gap-6 sm:grid-cols-2"
                            }, [
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name (English)"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.name), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name (Arabic)"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.nameAr), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "SKU"),
                                createVNode("p", { class: "text-sm font-mono" }, toDisplayString(unref(productsStore).currentProduct.sku), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Type"),
                                createVNode(_component_UiBadge, {
                                  variant: "secondary",
                                  class: "text-xs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(productsStore).currentProduct.type.replace("_", " ")), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Weight"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.weight ? `${Number(unref(productsStore).currentProduct.weight).toFixed(3)}` : "Not set"), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Purchase Cost"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.purchaseCost ? `${Number(unref(productsStore).currentProduct.purchaseCost).toFixed(2)}` : "Not set"), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Selling Price"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.sellingPrice ? `${Number(unref(productsStore).currentProduct.sellingPrice).toFixed(2)}` : "Not set"), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Created"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(new Date(unref(productsStore).currentProduct.createdAt).toLocaleDateString()), 1)
                              ])
                            ])) : createCommentVNode("", true)
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
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "stock" }, {
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
                                    _push6(`Stock by Warehouse`);
                                  } else {
                                    return [
                                      createTextVNode("Stock by Warehouse")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Current inventory levels across all warehouses`);
                                  } else {
                                    return [
                                      createTextVNode("Current inventory levels across all warehouses")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(_component_UiButton, mergeProps({
                                size: "sm",
                                onClick: ($event) => showMovementDialog.value = true
                              }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "PRODUCTS", action: "UPDATE" })), {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(ArrowRightLeft), { class: "size-4" }, null, _parent6, _scopeId5));
                                    _push6(` Record Movement `);
                                  } else {
                                    return [
                                      createVNode(unref(ArrowRightLeft), { class: "size-4" }),
                                      createTextVNode(" Record Movement ")
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
                                      createTextVNode("Stock by Warehouse")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiCardDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Current inventory levels across all warehouses")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                withDirectives((openBlock(), createBlock(_component_UiButton, {
                                  size: "sm",
                                  onClick: ($event) => showMovementDialog.value = true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ArrowRightLeft), { class: "size-4" }),
                                    createTextVNode(" Record Movement ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])), [
                                  [_directive_can, { module: "PRODUCTS", action: "UPDATE" }]
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (!unref(productsStore).currentProduct?.stocks?.length) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_EmptyState, {
                                  title: "No stock available",
                                  description: "This product has no stock in any warehouse"
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
                                                        _push9(`Warehouse`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Warehouse")
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
                                                } else {
                                                  return [
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Warehouse")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Quantity")
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
                                                      createTextVNode("Warehouse")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Quantity")
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
                                            ssrRenderList(unref(productsStore).currentProduct?.stocks, (stock) => {
                                              _push7(ssrRenderComponent(_component_UiTableRow, {
                                                key: stock.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_UiTableCell, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`<div class="flex items-center gap-2"${_scopeId8}>`);
                                                          _push9(ssrRenderComponent(unref(Warehouse), { class: "size-4 text-muted-foreground" }, null, _parent9, _scopeId8));
                                                          _push9(`<span class="text-sm font-medium"${_scopeId8}>${ssrInterpolate(stock.warehouse.name)}</span></div>`);
                                                        } else {
                                                          return [
                                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                                              createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" }),
                                                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(stock.warehouse.name), 1)
                                                            ])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(Number(stock.quantity).toFixed(3))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                                                            createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" }),
                                                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(stock.warehouse.name), 1)
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(productsStore).currentProduct?.stocks, (stock) => {
                                                return openBlock(), createBlock(_component_UiTableRow, {
                                                  key: stock.id
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiTableCell, null, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                                          createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" }),
                                                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(stock.warehouse.name), 1)
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                                                    createTextVNode("Warehouse")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Quantity")
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
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(productsStore).currentProduct?.stocks, (stock) => {
                                              return openBlock(), createBlock(_component_UiTableRow, {
                                                key: stock.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableCell, null, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                                        createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" }),
                                                        createVNode("span", { class: "text-sm font-medium" }, toDisplayString(stock.warehouse.name), 1)
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                                !unref(productsStore).currentProduct?.stocks?.length ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_EmptyState, {
                                    title: "No stock available",
                                    description: "This product has no stock in any warehouse"
                                  })
                                ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHeader, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Warehouse")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Quantity")
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(productsStore).currentProduct?.stocks, (stock) => {
                                          return openBlock(), createBlock(_component_UiTableRow, {
                                            key: stock.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiTableCell, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                                    createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" }),
                                                    createVNode("span", { class: "text-sm font-medium" }, toDisplayString(stock.warehouse.name), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                                    createTextVNode("Stock by Warehouse")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Current inventory levels across all warehouses")
                                  ]),
                                  _: 1
                                })
                              ]),
                              withDirectives((openBlock(), createBlock(_component_UiButton, {
                                size: "sm",
                                onClick: ($event) => showMovementDialog.value = true
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ArrowRightLeft), { class: "size-4" }),
                                  createTextVNode(" Record Movement ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])), [
                                [_directive_can, { module: "PRODUCTS", action: "UPDATE" }]
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              !unref(productsStore).currentProduct?.stocks?.length ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-6"
                              }, [
                                createVNode(_component_EmptyState, {
                                  title: "No stock available",
                                  description: "This product has no stock in any warehouse"
                                })
                              ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Warehouse")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Quantity")
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(productsStore).currentProduct?.stocks, (stock) => {
                                        return openBlock(), createBlock(_component_UiTableRow, {
                                          key: stock.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableCell, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                  createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" }),
                                                  createVNode("span", { class: "text-sm font-medium" }, toDisplayString(stock.warehouse.name), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
                                  createTextVNode("Stock by Warehouse")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Current inventory levels across all warehouses")
                                ]),
                                _: 1
                              })
                            ]),
                            withDirectives((openBlock(), createBlock(_component_UiButton, {
                              size: "sm",
                              onClick: ($event) => showMovementDialog.value = true
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(ArrowRightLeft), { class: "size-4" }),
                                createTextVNode(" Record Movement ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])), [
                              [_directive_can, { module: "PRODUCTS", action: "UPDATE" }]
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            !unref(productsStore).currentProduct?.stocks?.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-6"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "No stock available",
                                description: "This product has no stock in any warehouse"
                              })
                            ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Warehouse")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Quantity")
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(productsStore).currentProduct?.stocks, (stock) => {
                                      return openBlock(), createBlock(_component_UiTableRow, {
                                        key: stock.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center gap-2" }, [
                                                createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" }),
                                                createVNode("span", { class: "text-sm font-medium" }, toDisplayString(stock.warehouse.name), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "movements" }, {
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
                                    _push6(`Stock Movements`);
                                  } else {
                                    return [
                                      createTextVNode("Stock Movements")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Recent inventory transactions for this product`);
                                  } else {
                                    return [
                                      createTextVNode("Recent inventory transactions for this product")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Stock Movements")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Recent inventory transactions for this product")
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
                              if (unref(stockStore).loading && unref(stockStore).movements.length === 0) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_LoadingState, null, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else if (unref(stockStore).movements.length === 0) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_EmptyState, {
                                  title: "No movements yet",
                                  description: "Stock movements will appear here"
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
                                                        _push9(`Date`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Date")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Type`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Type")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Warehouse`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Warehouse")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Qty`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Qty")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`By`);
                                                      } else {
                                                        return [
                                                          createTextVNode("By")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Date")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Type")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Warehouse")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Qty")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("By")
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
                                                      createTextVNode("Date")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Type")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Warehouse")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Qty")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("By")
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
                                            ssrRenderList(unref(stockStore).movements, (m) => {
                                              _push7(ssrRenderComponent(_component_UiTableRow, {
                                                key: m.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(new Date(m.createdAt).toLocaleString())}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_UiBadge, {
                                                            variant: movementTypeVariant(m.type),
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type)}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_UiBadge, {
                                                              variant: movementTypeVariant(m.type),
                                                              class: "text-xs"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["variant"])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(m.warehouse?.name)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, {
                                                      class: ["text-right font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                                                    }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(m.quantity > 0 ? "+" : "")}${ssrInterpolate(Number(m.quantity).toFixed(3))}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(m.createdBy?.name)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_UiBadge, {
                                                            variant: movementTypeVariant(m.type),
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["variant"])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, {
                                                        class: ["text-right font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["class"]),
                                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(m.createdBy?.name), 1)
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
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                                                return openBlock(), createBlock(_component_UiTableRow, {
                                                  key: m.id
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_UiBadge, {
                                                          variant: movementTypeVariant(m.type),
                                                          class: "text-xs"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["variant"])
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, {
                                                      class: ["text-right font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["class"]),
                                                    createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(m.createdBy?.name), 1)
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
                                                    createTextVNode("Date")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Type")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Warehouse")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Qty")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("By")
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
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                                              return openBlock(), createBlock(_component_UiTableRow, {
                                                key: m.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_UiBadge, {
                                                        variant: movementTypeVariant(m.type),
                                                        class: "text-xs"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["variant"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, {
                                                    class: ["text-right font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["class"]),
                                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              }
                            } else {
                              return [
                                unref(stockStore).loading && unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_LoadingState)
                                ])) : unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_EmptyState, {
                                    title: "No movements yet",
                                    description: "Stock movements will appear here"
                                  })
                                ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHeader, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Date")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Type")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Warehouse")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Qty")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("By")
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                                          return openBlock(), createBlock(_component_UiTableRow, {
                                            key: m.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiBadge, {
                                                    variant: movementTypeVariant(m.type),
                                                    class: "text-xs"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["variant"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, {
                                                class: ["text-right font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024))
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
                                  createTextVNode("Stock Movements")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Recent inventory transactions for this product")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              unref(stockStore).loading && unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-6"
                              }, [
                                createVNode(_component_LoadingState)
                              ])) : unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "p-6"
                              }, [
                                createVNode(_component_EmptyState, {
                                  title: "No movements yet",
                                  description: "Stock movements will appear here"
                                })
                              ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Date")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Type")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Warehouse")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Qty")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("By")
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                                        return openBlock(), createBlock(_component_UiTableRow, {
                                          key: m.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiBadge, {
                                                  variant: movementTypeVariant(m.type),
                                                  class: "text-xs"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, {
                                              class: ["text-right font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"]),
                                            createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024))
                            ]),
                            _: 2
                          }, 1024)
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
                                createTextVNode("Stock Movements")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Recent inventory transactions for this product")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            unref(stockStore).loading && unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-6"
                            }, [
                              createVNode(_component_LoadingState)
                            ])) : unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "p-6"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "No movements yet",
                                description: "Stock movements will appear here"
                              })
                            ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Date")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Type")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Warehouse")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Qty")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("By")
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                                      return openBlock(), createBlock(_component_UiTableRow, {
                                        key: m.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiBadge, {
                                                variant: movementTypeVariant(m.type),
                                                class: "text-xs"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, {
                                            class: ["text-right font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"]),
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024))
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiTabsList, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsTrigger, { value: "details" }, {
                    default: withCtx(() => [
                      createTextVNode("Details")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "stock" }, {
                    default: withCtx(() => [
                      createTextVNode("Stock")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "movements" }, {
                    default: withCtx(() => [
                      createTextVNode("Movements")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "details" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Product Information")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Product details and pricing")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, null, {
                        default: withCtx(() => [
                          unref(productsStore).loading && !unref(productsStore).currentProduct ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-center py-8"
                          }, [
                            createVNode(_component_LoadingState)
                          ])) : unref(productsStore).currentProduct ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "grid gap-6 sm:grid-cols-2"
                          }, [
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name (English)"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.name), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name (Arabic)"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.nameAr), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "SKU"),
                              createVNode("p", { class: "text-sm font-mono" }, toDisplayString(unref(productsStore).currentProduct.sku), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Type"),
                              createVNode(_component_UiBadge, {
                                variant: "secondary",
                                class: "text-xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(productsStore).currentProduct.type.replace("_", " ")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Weight"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.weight ? `${Number(unref(productsStore).currentProduct.weight).toFixed(3)}` : "Not set"), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Purchase Cost"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.purchaseCost ? `${Number(unref(productsStore).currentProduct.purchaseCost).toFixed(2)}` : "Not set"), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Selling Price"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(unref(productsStore).currentProduct.sellingPrice ? `${Number(unref(productsStore).currentProduct.sellingPrice).toFixed(2)}` : "Not set"), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Created"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(new Date(unref(productsStore).currentProduct.createdAt).toLocaleDateString()), 1)
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "stock" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Stock by Warehouse")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Current inventory levels across all warehouses")
                              ]),
                              _: 1
                            })
                          ]),
                          withDirectives((openBlock(), createBlock(_component_UiButton, {
                            size: "sm",
                            onClick: ($event) => showMovementDialog.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowRightLeft), { class: "size-4" }),
                              createTextVNode(" Record Movement ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])), [
                            [_directive_can, { module: "PRODUCTS", action: "UPDATE" }]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          !unref(productsStore).currentProduct?.stocks?.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-6"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No stock available",
                              description: "This product has no stock in any warehouse"
                            })
                          ])) : (openBlock(), createBlock(_component_UiTable, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Warehouse")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Quantity")
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(productsStore).currentProduct?.stocks, (stock) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: stock.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                              createVNode(unref(Warehouse), { class: "size-4 text-muted-foreground" }),
                                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(stock.warehouse.name), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right font-medium tabular-nums" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(Number(stock.quantity).toFixed(3)), 1)
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
              }),
              createVNode(_component_UiTabsContent, { value: "movements" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Stock Movements")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Recent inventory transactions for this product")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          unref(stockStore).loading && unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-6"
                          }, [
                            createVNode(_component_LoadingState)
                          ])) : unref(stockStore).movements.length === 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "p-6"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No movements yet",
                              description: "Stock movements will appear here"
                            })
                          ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Date")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Type")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Warehouse")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Qty")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("By")
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(stockStore).movements, (m) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: m.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(m.createdAt).toLocaleString()), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiBadge, {
                                              variant: movementTypeVariant(m.type),
                                              class: "text-xs"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(MOVEMENT_TYPES).find((mt) => mt.value === m.type)?.label || m.type), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(m.warehouse?.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, {
                                          class: ["text-right font-medium tabular-nums", m.quantity > 0 ? "text-green-600" : "text-red-600"]
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(m.quantity > 0 ? "+" : "") + toDisplayString(Number(m.quantity).toFixed(3)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"]),
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(m.createdBy?.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showMovementDialog),
        "onUpdate:open": ($event) => showMovementDialog.value = $event
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
                              _push5(`Record Stock Movement`);
                            } else {
                              return [
                                createTextVNode("Record Stock Movement")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Adjust inventory for this product`);
                            } else {
                              return [
                                createTextVNode("Adjust inventory for this product")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Record Stock Movement")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Adjust inventory for this product")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "mov-warehouse" }, {
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
                    modelValue: unref(movementForm).warehouseId,
                    "onUpdate:modelValue": ($event) => unref(movementForm).warehouseId = $event,
                    endpoint: unref(fetchWarehousesLookupApi),
                    placeholder: "Select warehouse..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "mov-type" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Movement Type`);
                      } else {
                        return [
                          createTextVNode("Movement Type")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(movementForm).type,
                    "onUpdate:modelValue": ($event) => unref(movementForm).type = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "mov-type" }, {
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
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(adjustmentTypes), (mt) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: mt.value,
                                  value: mt.value
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(mt.label)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(mt.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(adjustmentTypes), (mt) => {
                                  return openBlock(), createBlock(_component_UiSelectItem, {
                                    key: mt.value,
                                    value: mt.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(mt.label), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSelectTrigger, { id: "mov-type" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(adjustmentTypes), (mt) => {
                                return openBlock(), createBlock(_component_UiSelectItem, {
                                  key: mt.value,
                                  value: mt.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(mt.label), 1)
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
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "mov-qty" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Quantity`);
                      } else {
                        return [
                          createTextVNode("Quantity")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "mov-qty",
                    modelValue: unref(movementForm).quantity,
                    "onUpdate:modelValue": ($event) => unref(movementForm).quantity = $event,
                    type: "number",
                    step: "0.001",
                    placeholder: "0.000",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showMovementDialog.value = false
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
                          disabled: unref(stockStore).loading
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record`);
                            } else {
                              return [
                                createTextVNode("Record")
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
                            onClick: ($event) => showMovementDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(stockStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Record")
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
                            createTextVNode("Record Stock Movement")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Adjust inventory for this product")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4",
                      onSubmit: withModifiers(handleMovement, ["prevent"])
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "mov-warehouse" }, {
                          default: withCtx(() => [
                            createTextVNode("Warehouse")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(movementForm).warehouseId,
                          "onUpdate:modelValue": ($event) => unref(movementForm).warehouseId = $event,
                          endpoint: unref(fetchWarehousesLookupApi),
                          placeholder: "Select warehouse..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "mov-type" }, {
                          default: withCtx(() => [
                            createTextVNode("Movement Type")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(movementForm).type,
                          "onUpdate:modelValue": ($event) => unref(movementForm).type = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "mov-type" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(adjustmentTypes), (mt) => {
                                  return openBlock(), createBlock(_component_UiSelectItem, {
                                    key: mt.value,
                                    value: mt.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(mt.label), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "mov-qty" }, {
                          default: withCtx(() => [
                            createTextVNode("Quantity")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "mov-qty",
                          modelValue: unref(movementForm).quantity,
                          "onUpdate:modelValue": ($event) => unref(movementForm).quantity = $event,
                          type: "number",
                          step: "0.001",
                          placeholder: "0.000",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showMovementDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(stockStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Record")
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
                          createTextVNode("Record Stock Movement")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Adjust inventory for this product")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4",
                    onSubmit: withModifiers(handleMovement, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "mov-warehouse" }, {
                        default: withCtx(() => [
                          createTextVNode("Warehouse")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(movementForm).warehouseId,
                        "onUpdate:modelValue": ($event) => unref(movementForm).warehouseId = $event,
                        endpoint: unref(fetchWarehousesLookupApi),
                        placeholder: "Select warehouse..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "mov-type" }, {
                        default: withCtx(() => [
                          createTextVNode("Movement Type")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(movementForm).type,
                        "onUpdate:modelValue": ($event) => unref(movementForm).type = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { id: "mov-type" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(adjustmentTypes), (mt) => {
                                return openBlock(), createBlock(_component_UiSelectItem, {
                                  key: mt.value,
                                  value: mt.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(mt.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "mov-qty" }, {
                        default: withCtx(() => [
                          createTextVNode("Quantity")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "mov-qty",
                        modelValue: unref(movementForm).quantity,
                        "onUpdate:modelValue": ($event) => unref(movementForm).quantity = $event,
                        type: "number",
                        step: "0.001",
                        placeholder: "0.000",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showMovementDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: unref(stockStore).loading
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Record")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-D5xzC2ds.mjs.map
