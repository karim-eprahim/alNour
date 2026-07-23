import { _ as __nuxt_component_0 } from './nuxt-link-DZSn3naz.mjs';
import { _ as _sfc_main$2 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1, d as _sfc_main$4, e as __nuxt_component_7 } from './CardTitle-CgdNZisr.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as __nuxt_component_10 } from './AppTable-D-kyiag3.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, unref, isRef, createVNode, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { Package, Warehouse } from '@lucide/vue';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useStockStore } from './store-BHVa8pyv.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
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
import './server.mjs';
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
import 'class-variance-authority';
import 'reka-ui';
import './index-B-gxPDkl.mjs';
import './Input-pgd-3rGf.mjs';
import './Textarea-B_fNd96X.mjs';
import './DropdownMenuTrigger-CAUMwd2x.mjs';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
import './SelectValue-CdUm-rR7.mjs';
import '@tanstack/vue-table';
import './api-Czl-Z3XJ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const stockStore = useStockStore();
    useWarehousesStore();
    const warehouseFilter = ref("all");
    watch(warehouseFilter, () => fetchData());
    async function fetchData() {
      await stockStore.fetchStocks({
        warehouseId: warehouseFilter.value === "all" ? void 0 : warehouseFilter.value
      });
    }
    const columns = [
      {
        accessorKey: "product.name",
        header: "Product",
        cell: ({ row }) => h("div", { class: "flex items-center gap-2" }, [
          h("div", { class: "size-8 flex items-center justify-center rounded bg-muted overflow-hidden" }, [
            row.original.product?.image ? h("img", { src: row.original.product.image, alt: "", class: "size-full object-cover" }) : h(Package, { class: "size-4 text-muted-foreground" })
          ]),
          h(__nuxt_component_0, { to: `/products/${row.original.productId}`, class: "text-sm font-medium hover:underline" }, row.original.product?.name)
        ])
      },
      {
        accessorKey: "product.sku",
        header: "SKU",
        cell: ({ row }) => h("span", { class: "text-xs font-mono text-muted-foreground" }, row.original.product?.sku)
      },
      {
        accessorKey: "product.type",
        header: "Type",
        cell: ({ row }) => h(_sfc_main$2, { variant: "secondary", class: "text-xs" }, row.original.product?.type?.replace("_", " ") || "")
      },
      {
        accessorKey: "warehouse.name",
        header: "Warehouse",
        cell: ({ row }) => h("div", { class: "flex items-center gap-1.5 text-sm" }, [
          h(Warehouse, { class: "size-3.5 text-muted-foreground" }),
          row.original.warehouse?.name
        ])
      },
      {
        id: "quantity",
        header: "Quantity",
        cell: ({ row }) => h("span", { class: "font-medium tabular-nums" }, Number(row.original.quantity).toFixed(3))
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Stock Overview",
        description: "Current inventory levels across all warehouses"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
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
                    data: unref(stockStore).stocks,
                    columns,
                    loading: unref(stockStore).loading,
                    "server-total": unref(stockStore).totalStocks,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No stock records",
                          description: "Stock entries will appear once products are added to warehouses"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No stock records",
                            description: "Stock entries will appear once products are added to warehouses"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(stockStore).stocks,
                      columns,
                      loading: unref(stockStore).loading,
                      "server-total": unref(stockStore).totalStocks,
                      "show-search": false,
                      "show-column-toggle": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No stock records",
                          description: "Stock entries will appear once products are added to warehouses"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "loading", "server-total"])
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
                    data: unref(stockStore).stocks,
                    columns,
                    loading: unref(stockStore).loading,
                    "server-total": unref(stockStore).totalStocks,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No stock records",
                        description: "Stock entries will appear once products are added to warehouses"
                      })
                    ]),
                    _: 1
                  }, 8, ["data", "loading", "server-total"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stock/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bz5x9g3w.mjs.map
