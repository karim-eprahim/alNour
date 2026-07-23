import { _ as _sfc_main$2 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, d as _sfc_main$4$1, e as __nuxt_component_7 } from './CardTitle-CgdNZisr.mjs';
import { _ as _sfc_main$3 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$4, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as __nuxt_component_10 } from './AppTable-D-kyiag3.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$3, d as _sfc_main$5, e as _sfc_main$4$2 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$8 } from './Label-Di1i-yIq.mjs';
import { defineComponent, ref, reactive, watch, resolveDirective, mergeProps, withCtx, createTextVNode, withDirectives, openBlock, createBlock, isRef, unref, createVNode, toDisplayString, Fragment, renderList, withModifiers, createCommentVNode, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { ImageOff, Eye, Pencil, Trash2, MoreHorizontal, Upload, X } from '@lucide/vue';
import { _ as _sfc_main$b } from './Separator-2kwi4XBY.mjs';
import { _ as _sfc_main$c } from './Switch-NLDLmhGz.mjs';
import { _ as __nuxt_component_20 } from './ConfirmDialog-B8hxYJp1.mjs';
import { b as usePermissions, n as navigateTo } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DZSn3naz.mjs';
import { _ as _sfc_main$d } from './index-CaQj38bB.mjs';
import { e as _sfc_main$9$2, d as _sfc_main$5$1, _ as _sfc_main$d$1, a as _sfc_main$e, b as _sfc_main$b$1 } from './DropdownMenuTrigger-CAUMwd2x.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './Textarea-B_fNd96X.mjs';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
import '@tanstack/vue-table';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageUpload",
  __ssrInlineRender: true,
  props: {
    modelValue: { default: null },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const preview = ref(props.modelValue || null);
    const uploading = ref(false);
    watch(() => props.modelValue, (val) => {
      if (val !== preview.value) preview.value = val;
    });
    function removeImage() {
      preview.value = null;
      emit("update:modelValue", null);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3" }, _attrs))}><div class="${ssrRenderClass([[__props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50"], "relative size-20 flex items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 overflow-hidden"])}">`);
      if (unref(preview)) {
        _push(`<img${ssrRenderAttr("src", unref(preview))} alt="Preview" class="size-full object-cover">`);
      } else {
        _push(`<div class="flex flex-col items-center gap-1 text-muted-foreground">`);
        if (unref(uploading)) {
          _push(ssrRenderComponent(unref(ImageOff), { class: "size-5 animate-pulse" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(Upload), { class: "size-5" }, null, _parent));
        }
        _push(`<span class="text-[10px]">Upload</span></div>`);
      }
      _push(`<input type="file" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer"${ssrIncludeBooleanAttr(__props.disabled || unref(uploading)) ? " disabled" : ""}></div>`);
      if (unref(preview)) {
        _push(`<div class="flex flex-col gap-1"><span class="text-xs text-muted-foreground truncate max-w-32">Image uploaded</span>`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          size: "icon-xs",
          class: "text-destructive size-6",
          onClick: removeImage
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(X), { class: "size-3" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(X), { class: "size-3" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(uploading)) {
        _push(`<div class="flex items-center gap-2"><span class="text-xs text-muted-foreground">Uploading...</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/ImageUpload.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_19 = Object.assign(_sfc_main$1, { __name: "ImageUpload" });
function typeVariant(type) {
  const map = {
    RAW_CHARCOAL: "default",
    PACKAGED_CHARCOAL: "secondary",
    OTHER: "outline"
  };
  return map[type] || "outline";
}
function getProductColumns(actions) {
  return [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        const p = row.original;
        return h("div", { class: "flex items-center gap-3" }, [
          h("div", { class: "size-9 flex items-center justify-center rounded-lg bg-muted overflow-hidden" }, [
            p.image ? h("img", { src: p.image, alt: p.name, class: "size-full object-cover" }) : h(ImageOff, { class: "size-4 text-muted-foreground" })
          ]),
          h("div", null, [
            h(__nuxt_component_0, { to: `/products/${p.id}`, class: "text-sm font-medium hover:underline" }, p.name),
            h("p", { class: "text-xs text-muted-foreground" }, p.sku)
          ])
        ]);
      }
    },
    {
      accessorKey: "nameAr",
      header: "Name (AR)",
      cell: ({ row }) => h("span", { class: "text-sm" }, row.original.nameAr)
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => h(_sfc_main$d, { variant: typeVariant(row.original.type), class: "text-xs" }, row.original.type.replace("_", " "))
    },
    {
      id: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stocks = row.original.stocks;
        if (!stocks || stocks.length === 0) return h("span", { class: "text-xs text-muted-foreground" }, "—");
        const total = stocks.reduce((s, st) => s + Number(st.quantity), 0);
        return h("span", { class: "text-sm font-medium" }, Number(total).toFixed(3));
      }
    },
    {
      accessorKey: "sellingPrice",
      header: "Price",
      cell: ({ row }) => {
        const price = row.original.sellingPrice;
        return h("span", { class: "text-sm" }, price ? `${Number(price).toFixed(2)}` : "—");
      }
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const p = row.original;
        const { can } = usePermissions();
        const canEdit = can("PRODUCTS", "UPDATE");
        const canDelete = can("PRODUCTS", "DELETE");
        const items = [
          h(_sfc_main$9$2, { onClick: () => actions.onView(p.id) }, [
            h(Eye, { class: "size-4" }),
            " View"
          ])
        ];
        if (canEdit) {
          items.push(h(_sfc_main$9$2, { onClick: () => actions.onEdit(p) }, [
            h(Pencil, { class: "size-4" }),
            " Edit"
          ]));
        }
        if (canDelete) {
          items.push(h(_sfc_main$5$1));
          items.push(h(_sfc_main$9$2, { variant: "destructive", onClick: () => actions.onDelete(p) }, [
            h(Trash2, { class: "size-4" }),
            " Delete"
          ]));
        }
        return h("div", [
          h(_sfc_main$d$1, null, {
            default: () => [
              h(_sfc_main$e, { "as-child": true }, {
                default: () => h(_sfc_main$2, { variant: "ghost", size: "icon-sm" }, {
                  default: () => h(MoreHorizontal, { class: "size-4" })
                })
              }),
              h(_sfc_main$b$1, { align: "end", class: "w-36" }, items)
            ]
          })
        ]);
      }
    }
  ];
}
const PRODUCT_TYPES = [
  { value: "RAW_CHARCOAL", label: "Raw Charcoal" },
  { value: "PACKAGED_CHARCOAL", label: "Packaged Charcoal" },
  { value: "OTHER", label: "Other" }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const productActions = {
      onView: (id) => navigateTo(`/products/${id}`),
      onEdit: (product) => openEdit(product),
      onDelete: (product) => openDelete(product)
    };
    const productColumns = getProductColumns(productActions);
    const productsStore = useProductsStore();
    useWarehousesStore();
    const search = ref("");
    const typeFilter = ref("all");
    const warehouseFilter = ref("all");
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const editingProduct = ref(null);
    const deletingProduct = ref(null);
    const createForm = reactive({
      name: "",
      nameAr: "",
      type: "RAW_CHARCOAL",
      image: null,
      weight: null,
      purchaseCost: null,
      sellingPrice: null,
      warehouseId: null,
      initialQuantity: null
    });
    const showInitialStock = ref(false);
    const editForm = reactive({
      name: "",
      nameAr: "",
      type: "RAW_CHARCOAL",
      image: null,
      weight: null,
      purchaseCost: null,
      sellingPrice: null
    });
    const debouncedSearch = ref("");
    watch(search, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedSearch.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    watch(debouncedSearch, () => fetchData());
    watch([typeFilter, warehouseFilter], () => fetchData());
    async function fetchData() {
      await productsStore.fetchProducts({
        search: debouncedSearch.value || void 0,
        type: typeFilter.value === "all" ? void 0 : typeFilter.value,
        warehouseId: warehouseFilter.value === "all" ? void 0 : warehouseFilter.value
      });
    }
    async function handleCreate() {
      try {
        await productsStore.createProduct(createForm);
        showCreateDialog.value = false;
        resetCreateForm();
        toast.success("Product created successfully");
      } catch {
      }
    }
    function resetCreateForm() {
      createForm.name = "";
      createForm.nameAr = "";
      createForm.type = "RAW_CHARCOAL";
      createForm.image = null;
      createForm.weight = null;
      createForm.purchaseCost = null;
      createForm.sellingPrice = null;
      createForm.warehouseId = null;
      createForm.initialQuantity = null;
      showInitialStock.value = false;
    }
    function openEdit(product) {
      editingProduct.value = product;
      editForm.name = product.name;
      editForm.nameAr = product.nameAr;
      editForm.type = product.type;
      editForm.image = product.image ?? null;
      editForm.weight = product.weight ? Number(product.weight) : null;
      editForm.purchaseCost = product.purchaseCost ? Number(product.purchaseCost) : null;
      editForm.sellingPrice = product.sellingPrice ? Number(product.sellingPrice) : null;
      showEditDialog.value = true;
    }
    async function handleEdit() {
      if (!editingProduct.value) return;
      try {
        await productsStore.updateProduct(editingProduct.value.id, editForm);
        showEditDialog.value = false;
        editingProduct.value = null;
        toast.success("Product updated successfully");
      } catch {
      }
    }
    function openDelete(product) {
      deletingProduct.value = product;
      showDeleteDialog.value = true;
    }
    async function handleDelete() {
      if (!deletingProduct.value) return;
      try {
        await productsStore.deleteProduct(deletingProduct.value.id);
        showDeleteDialog.value = false;
        deletingProduct.value = null;
        toast.success("Product deleted successfully");
      } catch {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$2;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiInput = _sfc_main$3;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$4;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiDialog = _sfc_main$9$1;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_UiLabel = _sfc_main$8;
      const _component_ImageUpload = __nuxt_component_19;
      const _component_UiSeparator = _sfc_main$b;
      const _component_UiSwitch = _sfc_main$c;
      const _component_UiDialogFooter = _sfc_main$4$2;
      const _component_ConfirmDialog = __nuxt_component_20;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Products",
        description: "Manage all products and inventory items"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              onClick: ($event) => showCreateDialog.value = true
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "PRODUCTS", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create Product`);
                } else {
                  return [
                    createTextVNode("Create Product")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_UiButton, {
                onClick: ($event) => showCreateDialog.value = true
              }, {
                default: withCtx(() => [
                  createTextVNode("Create Product")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "PRODUCTS", action: "CREATE" }]
              ])
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
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(search),
                    "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                    placeholder: "Search by name or SKU...",
                    class: "max-w-xs"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(typeFilter),
                    "onUpdate:modelValue": ($event) => isRef(typeFilter) ? typeFilter.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "All types" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue, { placeholder: "All types" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "all" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`All types`);
                                  } else {
                                    return [
                                      createTextVNode("All types")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(PRODUCT_TYPES), (t) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: t.value,
                                  value: t.value
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(t.label)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(t.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "all" }, {
                                  default: withCtx(() => [
                                    createTextVNode("All types")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                  return openBlock(), createBlock(_component_UiSelectItem, {
                                    key: t.value,
                                    value: t.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t.label), 1)
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
                          createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All types" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "all" }, {
                                default: withCtx(() => [
                                  createTextVNode("All types")
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                return openBlock(), createBlock(_component_UiSelectItem, {
                                  key: t.value,
                                  value: t.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t.label), 1)
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
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(warehouseFilter),
                    "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
                    endpoint: unref(fetchWarehousesLookupApi),
                    placeholder: "All warehouses",
                    "include-all": "",
                    class: "w-44"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UiInput, {
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        placeholder: "Search by name or SKU...",
                        class: "max-w-xs"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(typeFilter),
                        "onUpdate:modelValue": ($event) => isRef(typeFilter) ? typeFilter.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All types" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "all" }, {
                                default: withCtx(() => [
                                  createTextVNode("All types")
                                ]),
                                _: 1
                              }),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                return openBlock(), createBlock(_component_UiSelectItem, {
                                  key: t.value,
                                  value: t.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(warehouseFilter),
                        "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
                        endpoint: unref(fetchWarehousesLookupApi),
                        placeholder: "All warehouses",
                        "include-all": "",
                        class: "w-44"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
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
                    data: unref(productsStore).products,
                    columns: unref(productColumns),
                    loading: unref(productsStore).loading,
                    "server-total": unref(productsStore).total,
                    "show-search": "",
                    "search-placeholder": "Search..."
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No products found",
                          description: unref(search) || unref(typeFilter) !== "all" || unref(warehouseFilter) !== "all" ? "Try adjusting your filters" : "Create your first product to get started",
                          action: !unref(search) && unref(typeFilter) === "all" && unref(warehouseFilter) === "all" ? "Create Product" : void 0,
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No products found",
                            description: unref(search) || unref(typeFilter) !== "all" || unref(warehouseFilter) !== "all" ? "Try adjusting your filters" : "Create your first product to get started",
                            action: !unref(search) && unref(typeFilter) === "all" && unref(warehouseFilter) === "all" ? "Create Product" : void 0,
                            onAction: ($event) => showCreateDialog.value = true
                          }, null, 8, ["description", "action", "onAction"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(productsStore).products,
                      columns: unref(productColumns),
                      loading: unref(productsStore).loading,
                      "server-total": unref(productsStore).total,
                      "show-search": "",
                      "search-placeholder": "Search..."
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No products found",
                          description: unref(search) || unref(typeFilter) !== "all" || unref(warehouseFilter) !== "all" ? "Try adjusting your filters" : "Create your first product to get started",
                          action: !unref(search) && unref(typeFilter) === "all" && unref(warehouseFilter) === "all" ? "Create Product" : void 0,
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, 8, ["description", "action", "onAction"])
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
                    createVNode(_component_UiInput, {
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      placeholder: "Search by name or SKU...",
                      class: "max-w-xs"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UiSelect, {
                      modelValue: unref(typeFilter),
                      "onUpdate:modelValue": ($event) => isRef(typeFilter) ? typeFilter.value = $event : null
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectValue, { placeholder: "All types" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelectContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectItem, { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("All types")
                              ]),
                              _: 1
                            }),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                              return openBlock(), createBlock(_component_UiSelectItem, {
                                key: t.value,
                                value: t.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(t.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(warehouseFilter),
                      "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
                      endpoint: unref(fetchWarehousesLookupApi),
                      placeholder: "All warehouses",
                      "include-all": "",
                      class: "w-44"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(productsStore).products,
                    columns: unref(productColumns),
                    loading: unref(productsStore).loading,
                    "server-total": unref(productsStore).total,
                    "show-search": "",
                    "search-placeholder": "Search..."
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No products found",
                        description: unref(search) || unref(typeFilter) !== "all" || unref(warehouseFilter) !== "all" ? "Try adjusting your filters" : "Create your first product to get started",
                        action: !unref(search) && unref(typeFilter) === "all" && unref(warehouseFilter) === "all" ? "Create Product" : void 0,
                        onAction: ($event) => showCreateDialog.value = true
                      }, null, 8, ["description", "action", "onAction"])
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
        open: unref(showCreateDialog),
        "onUpdate:open": ($event) => showCreateDialog.value = $event
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
                              _push5(`Create Product`);
                            } else {
                              return [
                                createTextVNode("Create Product")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add a new product to the inventory`);
                            } else {
                              return [
                                createTextVNode("Add a new product to the inventory")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Create Product")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Add a new product to the inventory")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name (English)`);
                      } else {
                        return [
                          createTextVNode("Name (English)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-name",
                    modelValue: unref(createForm).name,
                    "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                    placeholder: "Product name",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-name-ar" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name (Arabic)`);
                      } else {
                        return [
                          createTextVNode("Name (Arabic)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-name-ar",
                    modelValue: unref(createForm).nameAr,
                    "onUpdate:modelValue": ($event) => unref(createForm).nameAr = $event,
                    placeholder: "اسم المنتج",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-type" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Type`);
                      } else {
                        return [
                          createTextVNode("Type")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(createForm).type,
                    "onUpdate:modelValue": ($event) => unref(createForm).type = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "create-type" }, {
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
                              ssrRenderList(unref(PRODUCT_TYPES), (t) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: t.value,
                                  value: t.value
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(t.label)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(t.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                  return openBlock(), createBlock(_component_UiSelectItem, {
                                    key: t.value,
                                    value: t.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t.label), 1)
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
                          createVNode(_component_UiSelectTrigger, { id: "create-type" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                return openBlock(), createBlock(_component_UiSelectItem, {
                                  key: t.value,
                                  value: t.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t.label), 1)
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
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-weight" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Weight (tons/kg)`);
                      } else {
                        return [
                          createTextVNode("Weight (tons/kg)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-weight",
                    modelValue: unref(createForm).weight,
                    "onUpdate:modelValue": ($event) => unref(createForm).weight = $event,
                    step: "0.001",
                    placeholder: "0.000"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-cost" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Purchase Cost`);
                      } else {
                        return [
                          createTextVNode("Purchase Cost")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-cost",
                    modelValue: unref(createForm).purchaseCost,
                    "onUpdate:modelValue": ($event) => unref(createForm).purchaseCost = $event,
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-price" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Selling Price`);
                      } else {
                        return [
                          createTextVNode("Selling Price")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-price",
                    modelValue: unref(createForm).sellingPrice,
                    "onUpdate:modelValue": ($event) => unref(createForm).sellingPrice = $event,
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Image`);
                      } else {
                        return [
                          createTextVNode("Image")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ImageUpload, {
                    modelValue: unref(createForm).image,
                    "onUpdate:modelValue": ($event) => unref(createForm).image = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiSeparator, null, null, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiSwitch, {
                    id: "initial-stock-toggle",
                    modelValue: unref(showInitialStock),
                    "onUpdate:modelValue": ($event) => isRef(showInitialStock) ? showInitialStock.value = $event : null
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiLabel, {
                    for: "initial-stock-toggle",
                    class: "cursor-pointer"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Add Initial Stock`);
                      } else {
                        return [
                          createTextVNode("Add Initial Stock")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  if (unref(showInitialStock)) {
                    _push3(`<div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { for: "create-warehouse" }, {
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
                      modelValue: unref(createForm).warehouseId,
                      "onUpdate:modelValue": ($event) => unref(createForm).warehouseId = $event,
                      endpoint: unref(fetchWarehousesLookupApi),
                      placeholder: "Select warehouse"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiLabel, { for: "create-initial-qty" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Initial Quantity`);
                        } else {
                          return [
                            createTextVNode("Initial Quantity")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      id: "create-initial-qty",
                      modelValue: unref(createForm).initialQuantity,
                      "onUpdate:modelValue": ($event) => unref(createForm).initialQuantity = $event,
                      type: "number",
                      step: "0.001",
                      placeholder: "0.000"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreateDialog.value = false
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
                          disabled: unref(productsStore).loading
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Create`);
                            } else {
                              return [
                                createTextVNode("Create")
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
                            onClick: ($event) => showCreateDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(productsStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Create")
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
                            createTextVNode("Create Product")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Add a new product to the inventory")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4",
                      onSubmit: withModifiers(handleCreate, ["prevent"])
                    }, [
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-name" }, {
                            default: withCtx(() => [
                              createTextVNode("Name (English)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-name",
                            modelValue: unref(createForm).name,
                            "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                            placeholder: "Product name",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-name-ar" }, {
                            default: withCtx(() => [
                              createTextVNode("Name (Arabic)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-name-ar",
                            modelValue: unref(createForm).nameAr,
                            "onUpdate:modelValue": ($event) => unref(createForm).nameAr = $event,
                            placeholder: "اسم المنتج",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-type" }, {
                            default: withCtx(() => [
                              createTextVNode("Type")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            modelValue: unref(createForm).type,
                            "onUpdate:modelValue": ($event) => unref(createForm).type = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { id: "create-type" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                    return openBlock(), createBlock(_component_UiSelectItem, {
                                      key: t.value,
                                      value: t.value
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(t.label), 1)
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
                          createVNode(_component_UiLabel, { for: "create-weight" }, {
                            default: withCtx(() => [
                              createTextVNode("Weight (tons/kg)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-weight",
                            modelValue: unref(createForm).weight,
                            "onUpdate:modelValue": ($event) => unref(createForm).weight = $event,
                            step: "0.001",
                            placeholder: "0.000"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-cost" }, {
                            default: withCtx(() => [
                              createTextVNode("Purchase Cost")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-cost",
                            modelValue: unref(createForm).purchaseCost,
                            "onUpdate:modelValue": ($event) => unref(createForm).purchaseCost = $event,
                            step: "0.01",
                            placeholder: "0.00"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-price" }, {
                            default: withCtx(() => [
                              createTextVNode("Selling Price")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-price",
                            modelValue: unref(createForm).sellingPrice,
                            "onUpdate:modelValue": ($event) => unref(createForm).sellingPrice = $event,
                            step: "0.01",
                            placeholder: "0.00"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Image")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ImageUpload, {
                          modelValue: unref(createForm).image,
                          "onUpdate:modelValue": ($event) => unref(createForm).image = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiSeparator),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UiSwitch, {
                          id: "initial-stock-toggle",
                          modelValue: unref(showInitialStock),
                          "onUpdate:modelValue": ($event) => isRef(showInitialStock) ? showInitialStock.value = $event : null
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_UiLabel, {
                          for: "initial-stock-toggle",
                          class: "cursor-pointer"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Add Initial Stock")
                          ]),
                          _: 1
                        })
                      ]),
                      unref(showInitialStock) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-2 gap-3"
                      }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-warehouse" }, {
                            default: withCtx(() => [
                              createTextVNode("Warehouse")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LookupCombobox, {
                            modelValue: unref(createForm).warehouseId,
                            "onUpdate:modelValue": ($event) => unref(createForm).warehouseId = $event,
                            endpoint: unref(fetchWarehousesLookupApi),
                            placeholder: "Select warehouse"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-initial-qty" }, {
                            default: withCtx(() => [
                              createTextVNode("Initial Quantity")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-initial-qty",
                            modelValue: unref(createForm).initialQuantity,
                            "onUpdate:modelValue": ($event) => unref(createForm).initialQuantity = $event,
                            type: "number",
                            step: "0.001",
                            placeholder: "0.000"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showCreateDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(productsStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Create")
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-lg" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Create Product")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Add a new product to the inventory")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4",
                    onSubmit: withModifiers(handleCreate, ["prevent"])
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name (English)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-name",
                          modelValue: unref(createForm).name,
                          "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                          placeholder: "Product name",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-name-ar" }, {
                          default: withCtx(() => [
                            createTextVNode("Name (Arabic)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-name-ar",
                          modelValue: unref(createForm).nameAr,
                          "onUpdate:modelValue": ($event) => unref(createForm).nameAr = $event,
                          placeholder: "اسم المنتج",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-type" }, {
                          default: withCtx(() => [
                            createTextVNode("Type")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(createForm).type,
                          "onUpdate:modelValue": ($event) => unref(createForm).type = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "create-type" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                  return openBlock(), createBlock(_component_UiSelectItem, {
                                    key: t.value,
                                    value: t.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t.label), 1)
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
                        createVNode(_component_UiLabel, { for: "create-weight" }, {
                          default: withCtx(() => [
                            createTextVNode("Weight (tons/kg)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-weight",
                          modelValue: unref(createForm).weight,
                          "onUpdate:modelValue": ($event) => unref(createForm).weight = $event,
                          step: "0.001",
                          placeholder: "0.000"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-cost" }, {
                          default: withCtx(() => [
                            createTextVNode("Purchase Cost")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-cost",
                          modelValue: unref(createForm).purchaseCost,
                          "onUpdate:modelValue": ($event) => unref(createForm).purchaseCost = $event,
                          step: "0.01",
                          placeholder: "0.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-price" }, {
                          default: withCtx(() => [
                            createTextVNode("Selling Price")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-price",
                          modelValue: unref(createForm).sellingPrice,
                          "onUpdate:modelValue": ($event) => unref(createForm).sellingPrice = $event,
                          step: "0.01",
                          placeholder: "0.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Image")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ImageUpload, {
                        modelValue: unref(createForm).image,
                        "onUpdate:modelValue": ($event) => unref(createForm).image = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiSeparator),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UiSwitch, {
                        id: "initial-stock-toggle",
                        modelValue: unref(showInitialStock),
                        "onUpdate:modelValue": ($event) => isRef(showInitialStock) ? showInitialStock.value = $event : null
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiLabel, {
                        for: "initial-stock-toggle",
                        class: "cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Add Initial Stock")
                        ]),
                        _: 1
                      })
                    ]),
                    unref(showInitialStock) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid grid-cols-2 gap-3"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-warehouse" }, {
                          default: withCtx(() => [
                            createTextVNode("Warehouse")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(createForm).warehouseId,
                          "onUpdate:modelValue": ($event) => unref(createForm).warehouseId = $event,
                          endpoint: unref(fetchWarehousesLookupApi),
                          placeholder: "Select warehouse"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-initial-qty" }, {
                          default: withCtx(() => [
                            createTextVNode("Initial Quantity")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-initial-qty",
                          modelValue: unref(createForm).initialQuantity,
                          "onUpdate:modelValue": ($event) => unref(createForm).initialQuantity = $event,
                          type: "number",
                          step: "0.001",
                          placeholder: "0.000"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreateDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: unref(productsStore).loading
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Create")
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
        open: unref(showEditDialog),
        "onUpdate:open": ($event) => showEditDialog.value = $event
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
                              _push5(`Edit Product`);
                            } else {
                              return [
                                createTextVNode("Edit Product")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update product information`);
                            } else {
                              return [
                                createTextVNode("Update product information")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Product")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Update product information")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name (English)`);
                      } else {
                        return [
                          createTextVNode("Name (English)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-name",
                    modelValue: unref(editForm).name,
                    "onUpdate:modelValue": ($event) => unref(editForm).name = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-name-ar" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name (Arabic)`);
                      } else {
                        return [
                          createTextVNode("Name (Arabic)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-name-ar",
                    modelValue: unref(editForm).nameAr,
                    "onUpdate:modelValue": ($event) => unref(editForm).nameAr = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-type" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Type`);
                      } else {
                        return [
                          createTextVNode("Type")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(editForm).type,
                    "onUpdate:modelValue": ($event) => unref(editForm).type = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "edit-type" }, {
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
                              ssrRenderList(unref(PRODUCT_TYPES), (t) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: t.value,
                                  value: t.value
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(t.label)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(t.label), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                  return openBlock(), createBlock(_component_UiSelectItem, {
                                    key: t.value,
                                    value: t.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t.label), 1)
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
                          createVNode(_component_UiSelectTrigger, { id: "edit-type" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                return openBlock(), createBlock(_component_UiSelectItem, {
                                  key: t.value,
                                  value: t.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t.label), 1)
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
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-weight" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Weight (tons/kg)`);
                      } else {
                        return [
                          createTextVNode("Weight (tons/kg)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-weight",
                    modelValue: unref(editForm).weight,
                    "onUpdate:modelValue": ($event) => unref(editForm).weight = $event,
                    step: "0.001"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-cost" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Purchase Cost`);
                      } else {
                        return [
                          createTextVNode("Purchase Cost")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-cost",
                    modelValue: unref(editForm).purchaseCost,
                    "onUpdate:modelValue": ($event) => unref(editForm).purchaseCost = $event,
                    step: "0.01"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-price" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Selling Price`);
                      } else {
                        return [
                          createTextVNode("Selling Price")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-price",
                    modelValue: unref(editForm).sellingPrice,
                    "onUpdate:modelValue": ($event) => unref(editForm).sellingPrice = $event,
                    step: "0.01"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Image`);
                      } else {
                        return [
                          createTextVNode("Image")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ImageUpload, {
                    modelValue: unref(editForm).image,
                    "onUpdate:modelValue": ($event) => unref(editForm).image = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showEditDialog.value = false
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
                          disabled: unref(productsStore).loading
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Save`);
                            } else {
                              return [
                                createTextVNode("Save")
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
                            onClick: ($event) => showEditDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(productsStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
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
                            createTextVNode("Edit Product")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Update product information")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4",
                      onSubmit: withModifiers(handleEdit, ["prevent"])
                    }, [
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-name" }, {
                            default: withCtx(() => [
                              createTextVNode("Name (English)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-name",
                            modelValue: unref(editForm).name,
                            "onUpdate:modelValue": ($event) => unref(editForm).name = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-name-ar" }, {
                            default: withCtx(() => [
                              createTextVNode("Name (Arabic)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-name-ar",
                            modelValue: unref(editForm).nameAr,
                            "onUpdate:modelValue": ($event) => unref(editForm).nameAr = $event,
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-type" }, {
                            default: withCtx(() => [
                              createTextVNode("Type")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            modelValue: unref(editForm).type,
                            "onUpdate:modelValue": ($event) => unref(editForm).type = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { id: "edit-type" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                    return openBlock(), createBlock(_component_UiSelectItem, {
                                      key: t.value,
                                      value: t.value
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(t.label), 1)
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
                          createVNode(_component_UiLabel, { for: "edit-weight" }, {
                            default: withCtx(() => [
                              createTextVNode("Weight (tons/kg)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-weight",
                            modelValue: unref(editForm).weight,
                            "onUpdate:modelValue": ($event) => unref(editForm).weight = $event,
                            step: "0.001"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-cost" }, {
                            default: withCtx(() => [
                              createTextVNode("Purchase Cost")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-cost",
                            modelValue: unref(editForm).purchaseCost,
                            "onUpdate:modelValue": ($event) => unref(editForm).purchaseCost = $event,
                            step: "0.01"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-price" }, {
                            default: withCtx(() => [
                              createTextVNode("Selling Price")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-price",
                            modelValue: unref(editForm).sellingPrice,
                            "onUpdate:modelValue": ($event) => unref(editForm).sellingPrice = $event,
                            step: "0.01"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Image")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ImageUpload, {
                          modelValue: unref(editForm).image,
                          "onUpdate:modelValue": ($event) => unref(editForm).image = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showEditDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(productsStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-lg" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Edit Product")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Update product information")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4",
                    onSubmit: withModifiers(handleEdit, ["prevent"])
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name (English)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-name",
                          modelValue: unref(editForm).name,
                          "onUpdate:modelValue": ($event) => unref(editForm).name = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-name-ar" }, {
                          default: withCtx(() => [
                            createTextVNode("Name (Arabic)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-name-ar",
                          modelValue: unref(editForm).nameAr,
                          "onUpdate:modelValue": ($event) => unref(editForm).nameAr = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-type" }, {
                          default: withCtx(() => [
                            createTextVNode("Type")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(editForm).type,
                          "onUpdate:modelValue": ($event) => unref(editForm).type = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "edit-type" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(PRODUCT_TYPES), (t) => {
                                  return openBlock(), createBlock(_component_UiSelectItem, {
                                    key: t.value,
                                    value: t.value
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t.label), 1)
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
                        createVNode(_component_UiLabel, { for: "edit-weight" }, {
                          default: withCtx(() => [
                            createTextVNode("Weight (tons/kg)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-weight",
                          modelValue: unref(editForm).weight,
                          "onUpdate:modelValue": ($event) => unref(editForm).weight = $event,
                          step: "0.001"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-cost" }, {
                          default: withCtx(() => [
                            createTextVNode("Purchase Cost")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-cost",
                          modelValue: unref(editForm).purchaseCost,
                          "onUpdate:modelValue": ($event) => unref(editForm).purchaseCost = $event,
                          step: "0.01"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-price" }, {
                          default: withCtx(() => [
                            createTextVNode("Selling Price")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-price",
                          modelValue: unref(editForm).sellingPrice,
                          "onUpdate:modelValue": ($event) => unref(editForm).sellingPrice = $event,
                          step: "0.01"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Image")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ImageUpload, {
                        modelValue: unref(editForm).image,
                        "onUpdate:modelValue": ($event) => unref(editForm).image = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showEditDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: unref(productsStore).loading
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save")
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
      _push(ssrRenderComponent(_component_ConfirmDialog, {
        open: unref(showDeleteDialog),
        "onUpdate:open": ($event) => isRef(showDeleteDialog) ? showDeleteDialog.value = $event : null,
        title: "Delete Product",
        description: `Are you sure you want to delete ${unref(deletingProduct)?.name}? This action cannot be undone.`,
        "confirm-text": "Delete",
        variant: "destructive",
        loading: unref(productsStore).loading,
        onConfirm: handleDelete,
        onCancel: ($event) => showDeleteDialog.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CsPD2ENR.mjs.map
