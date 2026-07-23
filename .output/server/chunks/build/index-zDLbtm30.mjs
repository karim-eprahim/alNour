import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, a as _sfc_main$4 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$2, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_10 } from './AppTable-fABlY_aP.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { n as navigateTo } from './server.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { defineComponent, ref, watch, resolveDirective, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, openBlock, createBlock, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { Plus } from '@lucide/vue';
import { c as getBatchColumns } from './column-DlfrMlov.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
import { u as useProductionStore } from './store-C09GJ09r.mjs';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './Input-pgd-3rGf.mjs';
import './Textarea-B_fNd96X.mjs';
import './DropdownMenuTrigger-MlqyivDB.mjs';
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
import './nuxt-link-DEwgn_ii.mjs';
import './index-CaQj38bB.mjs';

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const productionStore = useProductionStore();
    const warehousesStore = useWarehousesStore();
    const warehouseFilter = ref("__all__");
    const statusFilter = ref("__all__");
    const page = ref(1);
    const batchActions = {
      onView: (id) => navigateTo(`/production/${id}`),
      onDelete: async (id) => {
        if (!confirm("Delete this production batch?")) return;
        try {
          await productionStore.deleteBatch(id);
          toast.success("Batch deleted");
        } catch {
          toast.error("Failed to delete batch");
        }
      }
    };
    const columns = getBatchColumns(batchActions);
    async function load() {
      await Promise.all([
        productionStore.fetchBatches({ page: page.value, limit }),
        warehousesStore.fetchWarehouses()
      ]);
    }
    watch([warehouseFilter, statusFilter], () => {
      page.value = 1;
      load();
    });
    watch(page, load);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$2;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Production Batches",
        description: "Manage production batches and track output"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/production/new")
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "PRODUCTION", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` New Batch `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "size-4" }),
                    createTextVNode(" New Batch ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_UiButton, {
                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/production/new")
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), { class: "size-4" }),
                  createTextVNode(" New Batch ")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "PRODUCTION", action: "CREATE" }]
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
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(warehouseFilter),
                    "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
                    endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                    placeholder: "All Warehouses",
                    "include-all": "",
                    "all-value": "__all__",
                    "all-label": "All Warehouses",
                    class: "w-44"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(statusFilter),
                    "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "All Status" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue, { placeholder: "All Status" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`All Status`);
                                  } else {
                                    return [
                                      createTextVNode("All Status")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "PENDING" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Pending`);
                                  } else {
                                    return [
                                      createTextVNode("Pending")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "PROCESSING" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Processing`);
                                  } else {
                                    return [
                                      createTextVNode("Processing")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "COMPLETED" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Completed`);
                                  } else {
                                    return [
                                      createTextVNode("Completed")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CANCELLED" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Cancelled`);
                                  } else {
                                    return [
                                      createTextVNode("Cancelled")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                  default: withCtx(() => [
                                    createTextVNode("All Status")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "PENDING" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Pending")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "PROCESSING" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Processing")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "COMPLETED" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Completed")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CANCELLED" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cancelled")
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
                          createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All Status" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx(() => [
                                  createTextVNode("All Status")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "PENDING" }, {
                                default: withCtx(() => [
                                  createTextVNode("Pending")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "PROCESSING" }, {
                                default: withCtx(() => [
                                  createTextVNode("Processing")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "COMPLETED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Completed")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CANCELLED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancelled")
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
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(warehouseFilter),
                        "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
                        endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                        placeholder: "All Warehouses",
                        "include-all": "",
                        "all-value": "__all__",
                        "all-label": "All Warehouses",
                        class: "w-44"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(statusFilter),
                        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All Status" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx(() => [
                                  createTextVNode("All Status")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "PENDING" }, {
                                default: withCtx(() => [
                                  createTextVNode("Pending")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "PROCESSING" }, {
                                default: withCtx(() => [
                                  createTextVNode("Processing")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "COMPLETED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Completed")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CANCELLED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancelled")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
                    data: unref(productionStore).batches,
                    columns: unref(columns),
                    loading: unref(productionStore).loading,
                    "server-total": unref(productionStore).total,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No batches found",
                          description: "Create your first production batch",
                          action: "New Batch",
                          onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/production/new")
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No batches found",
                            description: "Create your first production batch",
                            action: "New Batch",
                            onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/production/new")
                          }, null, 8, ["onAction"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(productionStore).batches,
                      columns: unref(columns),
                      loading: unref(productionStore).loading,
                      "server-total": unref(productionStore).total,
                      "show-search": false,
                      "show-column-toggle": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No batches found",
                          description: "Create your first production batch",
                          action: "New Batch",
                          onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/production/new")
                        }, null, 8, ["onAction"])
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
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(warehouseFilter),
                      "onUpdate:modelValue": ($event) => isRef(warehouseFilter) ? warehouseFilter.value = $event : null,
                      endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                      placeholder: "All Warehouses",
                      "include-all": "",
                      "all-value": "__all__",
                      "all-label": "All Warehouses",
                      class: "w-44"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                    createVNode(_component_UiSelect, {
                      modelValue: unref(statusFilter),
                      "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectValue, { placeholder: "All Status" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelectContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectItem, { value: "__all__" }, {
                              default: withCtx(() => [
                                createTextVNode("All Status")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "PENDING" }, {
                              default: withCtx(() => [
                                createTextVNode("Pending")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "PROCESSING" }, {
                              default: withCtx(() => [
                                createTextVNode("Processing")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "COMPLETED" }, {
                              default: withCtx(() => [
                                createTextVNode("Completed")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "CANCELLED" }, {
                              default: withCtx(() => [
                                createTextVNode("Cancelled")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(productionStore).batches,
                    columns: unref(columns),
                    loading: unref(productionStore).loading,
                    "server-total": unref(productionStore).total,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No batches found",
                        description: "Create your first production batch",
                        action: "New Batch",
                        onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/production/new")
                      }, null, 8, ["onAction"])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/production/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-zDLbtm30.mjs.map
