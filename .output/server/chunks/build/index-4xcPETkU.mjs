import { _ as __nuxt_component_0 } from './nuxt-link-B_K_Hg2R.mjs';
import { e as _sfc_main$9$1, d as _sfc_main$5$1, _ as _sfc_main$d, a as _sfc_main$8, b as _sfc_main$b } from './DropdownMenuTrigger-dnC_q6qg.mjs';
import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, d as _sfc_main$4 } from './CardTitle-St-iDBLB.mjs';
import { _ as _sfc_main$2 } from './Input-DA89G3IO.mjs';
import { _ as __nuxt_component_10 } from './AppTable-Di4p6o0D.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-BVvkGjQ9.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3, c as _sfc_main$1$2, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-Isr81J2S.mjs';
import { _ as _sfc_main$7 } from './Label-fqACuvH5.mjs';
import { _ as __nuxt_component_20 } from './ConfirmDialog-DfR3Rug_.mjs';
import { defineComponent, ref, watch, reactive, resolveDirective, mergeProps, withCtx, unref, createTextVNode, withDirectives, openBlock, createBlock, isRef, createVNode, withModifiers, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { Package, MapPin, Eye, Pencil, Trash2, MoreHorizontal } from '@lucide/vue';
import { b as usePermissions, n as navigateTo } from './server.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
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
import 'reka-ui';
import '@vueuse/core';
import 'class-variance-authority';
import './Checkbox-aOmH4bgm.mjs';
import './TableHeader-f7ALV9Yi.mjs';
import './LoadingState-y5B8zlzY.mjs';
import './SelectValue-CDW_Y5sR.mjs';
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
import './api-CBXtItch.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const warehousesStore = useWarehousesStore();
    const search = ref("");
    const debouncedSearch = ref("");
    watch(search, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedSearch.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const editingWarehouse = ref(null);
    const deletingWarehouse = ref(null);
    const createForm = reactive({ name: "", location: "" });
    const editForm = reactive({ name: "", location: "" });
    watch(debouncedSearch, () => warehousesStore.fetchWarehouses({ search: debouncedSearch.value || void 0 }));
    function openEdit(w) {
      editingWarehouse.value = w;
      editForm.name = w.name;
      editForm.location = w.location ?? "";
      showEditDialog.value = true;
    }
    function openDelete(w) {
      deletingWarehouse.value = w;
      showDeleteDialog.value = true;
    }
    async function handleCreate() {
      try {
        await warehousesStore.createWarehouse(createForm);
        showCreateDialog.value = false;
        createForm.name = "";
        createForm.location = "";
        toast.success("Warehouse created");
      } catch {
      }
    }
    async function handleEdit() {
      if (!editingWarehouse.value) return;
      try {
        await warehousesStore.updateWarehouse(editingWarehouse.value.id, editForm);
        showEditDialog.value = false;
        editingWarehouse.value = null;
        toast.success("Warehouse updated");
      } catch {
      }
    }
    async function handleDelete() {
      if (!deletingWarehouse.value) return;
      try {
        await warehousesStore.deleteWarehouse(deletingWarehouse.value.id);
        showDeleteDialog.value = false;
        deletingWarehouse.value = null;
        toast.success("Warehouse deleted");
      } catch {
      }
    }
    const columns = [
      {
        accessorKey: "name",
        header: "Warehouse",
        cell: ({ row }) => h("div", { class: "flex items-center gap-3" }, [
          h("div", { class: "size-8 flex items-center justify-center rounded-lg bg-muted" }, [
            h(Package, { class: "size-4 text-muted-foreground" })
          ]),
          h(__nuxt_component_0, { to: `/warehouses/${row.original.id}`, class: "text-sm font-medium hover:underline" }, row.original.name)
        ])
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
          const loc = row.original.location;
          if (!loc) return h("span", { class: "text-xs text-muted-foreground" }, "—");
          return h("div", { class: "flex items-center gap-1.5 text-sm" }, [
            h(MapPin, { class: "size-3.5 text-muted-foreground" }),
            loc
          ]);
        }
      },
      {
        id: "stocks",
        header: "Products",
        cell: ({ row }) => h("span", { class: "text-sm" }, String(row.original._count?.stocks ?? 0))
      },
      {
        id: "movements",
        header: "Movements",
        cell: ({ row }) => h("span", { class: "text-sm" }, String(row.original._count?.movements ?? 0))
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const w = row.original;
          const { can } = usePermissions();
          const items = [];
          if (can("WAREHOUSES", "READ")) {
            items.push(h(_sfc_main$9$1, { onClick: () => navigateTo(`/warehouses/${w.id}`) }, [h(Eye, { class: "size-4" }), " View"]));
          }
          if (can("WAREHOUSES", "UPDATE")) {
            items.push(h(_sfc_main$9$1, { onClick: () => openEdit(w) }, [h(Pencil, { class: "size-4" }), " Edit"]));
          }
          if (can("WAREHOUSES", "DELETE")) {
            items.push(h(_sfc_main$5$1));
            items.push(h(_sfc_main$9$1, { variant: "destructive", onClick: () => openDelete(w) }, [h(Trash2, { class: "size-4" }), " Delete"]));
          }
          if (items.length === 0) return h("span");
          return h("div", [
            h(_sfc_main$d, null, {
              default: () => [
                h(_sfc_main$8, { "as-child": true }, {
                  default: () => h(_sfc_main$1, { variant: "ghost", size: "icon-sm" }, {
                    default: () => h(MoreHorizontal, { class: "size-4" })
                  })
                }),
                h(_sfc_main$b, { align: "end", class: "w-36" }, items)
              ]
            })
          ]);
        }
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiInput = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3;
      const _component_UiDialogTitle = _sfc_main$1$2;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiDialogFooter = _sfc_main$4$1;
      const _component_ConfirmDialog = __nuxt_component_20;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Warehouses",
        description: "Manage storage locations and inventory"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), mergeProps({
              onClick: ($event) => showCreateDialog.value = true
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "WAREHOUSES", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add Warehouse`);
                } else {
                  return [
                    createTextVNode("Add Warehouse")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(unref(_sfc_main$1), {
                onClick: ($event) => showCreateDialog.value = true
              }, {
                default: withCtx(() => [
                  createTextVNode("Add Warehouse")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "WAREHOUSES", action: "CREATE" }]
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
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(search),
                    "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                    placeholder: "Search warehouses...",
                    class: "max-w-xs"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiInput, {
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      placeholder: "Search warehouses...",
                      class: "max-w-xs"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AppTable, {
                    data: unref(warehousesStore).warehouses,
                    columns,
                    loading: unref(warehousesStore).loading,
                    "server-total": unref(warehousesStore).total,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No warehouses",
                          description: "Create your first warehouse to get started",
                          action: "Add Warehouse",
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No warehouses",
                            description: "Create your first warehouse to get started",
                            action: "Add Warehouse",
                            onAction: ($event) => showCreateDialog.value = true
                          }, null, 8, ["onAction"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(warehousesStore).warehouses,
                      columns,
                      loading: unref(warehousesStore).loading,
                      "server-total": unref(warehousesStore).total,
                      "show-search": false,
                      "show-column-toggle": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No warehouses",
                          description: "Create your first warehouse to get started",
                          action: "Add Warehouse",
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, 8, ["onAction"])
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
                  createVNode(_component_UiInput, {
                    modelValue: unref(search),
                    "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                    placeholder: "Search warehouses...",
                    class: "max-w-xs"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(warehousesStore).warehouses,
                    columns,
                    loading: unref(warehousesStore).loading,
                    "server-total": unref(warehousesStore).total,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No warehouses",
                        description: "Create your first warehouse to get started",
                        action: "Add Warehouse",
                        onAction: ($event) => showCreateDialog.value = true
                      }, null, 8, ["onAction"])
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
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showCreateDialog),
        "onUpdate:open": ($event) => showCreateDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add Warehouse`);
                            } else {
                              return [
                                createTextVNode("Add Warehouse")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Create a new storage location`);
                            } else {
                              return [
                                createTextVNode("Create a new storage location")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Add Warehouse")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Create a new storage location")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-name",
                    modelValue: unref(createForm).name,
                    "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                    placeholder: "Warehouse name",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-location" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Location`);
                      } else {
                        return [
                          createTextVNode("Location")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-location",
                    modelValue: unref(createForm).location,
                    "onUpdate:modelValue": ($event) => unref(createForm).location = $event,
                    placeholder: "Optional location"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: unref(warehousesStore).loading
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
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showCreateDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: unref(warehousesStore).loading
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
                            createTextVNode("Add Warehouse")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Create a new storage location")
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
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-name",
                          modelValue: unref(createForm).name,
                          "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                          placeholder: "Warehouse name",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-location" }, {
                          default: withCtx(() => [
                            createTextVNode("Location")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-location",
                          modelValue: unref(createForm).location,
                          "onUpdate:modelValue": ($event) => unref(createForm).location = $event,
                          placeholder: "Optional location"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showCreateDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: unref(warehousesStore).loading
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Add Warehouse")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Create a new storage location")
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
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "create-name" }, {
                        default: withCtx(() => [
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "create-name",
                        modelValue: unref(createForm).name,
                        "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                        placeholder: "Warehouse name",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "create-location" }, {
                        default: withCtx(() => [
                          createTextVNode("Location")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "create-location",
                        modelValue: unref(createForm).location,
                        "onUpdate:modelValue": ($event) => unref(createForm).location = $event,
                        placeholder: "Optional location"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreateDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: unref(warehousesStore).loading
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
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Edit Warehouse`);
                            } else {
                              return [
                                createTextVNode("Edit Warehouse")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update warehouse information`);
                            } else {
                              return [
                                createTextVNode("Update warehouse information")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Warehouse")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Update warehouse information")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
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
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-location" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Location`);
                      } else {
                        return [
                          createTextVNode("Location")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-location",
                    modelValue: unref(editForm).location,
                    "onUpdate:modelValue": ($event) => unref(editForm).location = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: unref(warehousesStore).loading
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
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showEditDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: unref(warehousesStore).loading
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
                            createTextVNode("Edit Warehouse")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Update warehouse information")
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
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name")
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
                        createVNode(_component_UiLabel, { for: "edit-location" }, {
                          default: withCtx(() => [
                            createTextVNode("Location")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-location",
                          modelValue: unref(editForm).location,
                          "onUpdate:modelValue": ($event) => unref(editForm).location = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showEditDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: unref(warehousesStore).loading
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Edit Warehouse")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Update warehouse information")
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
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "edit-name" }, {
                        default: withCtx(() => [
                          createTextVNode("Name")
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
                      createVNode(_component_UiLabel, { for: "edit-location" }, {
                        default: withCtx(() => [
                          createTextVNode("Location")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "edit-location",
                        modelValue: unref(editForm).location,
                        "onUpdate:modelValue": ($event) => unref(editForm).location = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showEditDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: unref(warehousesStore).loading
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
        title: "Delete Warehouse",
        description: `Are you sure you want to delete ${unref(deletingWarehouse)?.name}?`,
        "confirm-text": "Delete",
        variant: "destructive",
        loading: unref(warehousesStore).loading,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/warehouses/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-4xcPETkU.mjs.map
