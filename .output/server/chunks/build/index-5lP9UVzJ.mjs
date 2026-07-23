import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, a as _sfc_main$4 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$2 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$3, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_10 } from './AppTable-fABlY_aP.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$3, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$8 } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$b } from './Switch-NLDLmhGz.mjs';
import { _ as __nuxt_component_20 } from './ConfirmDialog-B8hxYJp1.mjs';
import { defineComponent, ref, reactive, watch, resolveDirective, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, openBlock, createBlock, isRef, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { c as getWorkerColumns } from './column-CMtsiFIc.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { Plus } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { u as useWorkersStore } from './store-CbGTzEpA.mjs';
import { n as navigateTo } from './server.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './DropdownMenuTrigger-MlqyivDB.mjs';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
import '@tanstack/vue-table';
import './index-CaQj38bB.mjs';
import './nuxt-link-DEwgn_ii.mjs';
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
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const workersStore = useWorkersStore();
    const search = ref("");
    const statusFilter = ref("__all__");
    const page = ref(1);
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const editingWorker = ref(null);
    const deletingWorker = ref(null);
    const createForm = reactive({
      name: "",
      phone: "",
      role: "",
      defaultDailyWage: null
    });
    const editForm = reactive({
      name: "",
      phone: "",
      role: "",
      defaultDailyWage: null,
      isActive: true
    });
    const workerActions = {
      onView: (id) => navigateTo(`/workers/${id}`),
      onEdit: (worker) => openEdit(worker),
      onDelete: (worker) => openDelete(worker)
    };
    const columns = getWorkerColumns(workerActions);
    const debouncedSearch = ref("");
    watch(search, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedSearch.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    watch(debouncedSearch, () => {
      page.value = 1;
      fetchData();
    });
    watch(statusFilter, () => {
      page.value = 1;
      fetchData();
    });
    watch(page, fetchData);
    async function fetchData() {
      await workersStore.fetchWorkers({
        search: debouncedSearch.value || void 0,
        isActive: statusFilter.value === "__all__" ? void 0 : statusFilter.value,
        page: page.value,
        limit
      });
    }
    async function handleCreate() {
      try {
        await workersStore.createWorker(createForm);
        showCreateDialog.value = false;
        resetCreateForm();
        toast.success("Worker created successfully");
      } catch {
        toast.error("Failed to create worker");
      }
    }
    function resetCreateForm() {
      createForm.name = "";
      createForm.phone = "";
      createForm.role = "";
      createForm.defaultDailyWage = null;
    }
    function openEdit(worker) {
      editingWorker.value = worker;
      editForm.name = worker.name;
      editForm.phone = worker.phone ?? "";
      editForm.role = worker.role ?? "";
      editForm.defaultDailyWage = worker.defaultDailyWage ? Number(worker.defaultDailyWage) : null;
      editForm.isActive = worker.isActive;
      showEditDialog.value = true;
    }
    async function handleEdit() {
      if (!editingWorker.value) return;
      try {
        await workersStore.updateWorker(editingWorker.value.id, editForm);
        showEditDialog.value = false;
        editingWorker.value = null;
        toast.success("Worker updated successfully");
      } catch {
        toast.error("Failed to update worker");
      }
    }
    function openDelete(worker) {
      deletingWorker.value = worker;
      showDeleteDialog.value = true;
    }
    async function handleDelete() {
      if (!deletingWorker.value) return;
      try {
        await workersStore.deleteWorker(deletingWorker.value.id);
        showDeleteDialog.value = false;
        deletingWorker.value = null;
        toast.success("Worker deleted successfully");
      } catch {
        toast.error("Failed to delete worker");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiInput = _sfc_main$2;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$3;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiDialog = _sfc_main$9$1;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_UiLabel = _sfc_main$8;
      const _component_UiDialogFooter = _sfc_main$4$1;
      const _component_UiSwitch = _sfc_main$b;
      const _component_ConfirmDialog = __nuxt_component_20;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Workers",
        description: "Manage all workers, track wages and advances"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              onClick: ($event) => showCreateDialog.value = true
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "WORKERS", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Add Worker `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "size-4" }),
                    createTextVNode(" Add Worker ")
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
                  createVNode(unref(Plus), { class: "size-4" }),
                  createTextVNode(" Add Worker ")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "WORKERS", action: "CREATE" }]
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
                    placeholder: "Search by name or phone...",
                    class: "max-w-xs"
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
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "true" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Active`);
                                  } else {
                                    return [
                                      createTextVNode("Active")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "false" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Inactive`);
                                  } else {
                                    return [
                                      createTextVNode("Inactive")
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
                                createVNode(_component_UiSelectItem, { value: "true" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Active")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "false" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Inactive")
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
                              createVNode(_component_UiSelectItem, { value: "true" }, {
                                default: withCtx(() => [
                                  createTextVNode("Active")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "false" }, {
                                default: withCtx(() => [
                                  createTextVNode("Inactive")
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
                      createVNode(_component_UiInput, {
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        placeholder: "Search by name or phone...",
                        class: "max-w-xs"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
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
                              createVNode(_component_UiSelectItem, { value: "true" }, {
                                default: withCtx(() => [
                                  createTextVNode("Active")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "false" }, {
                                default: withCtx(() => [
                                  createTextVNode("Inactive")
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
                    data: unref(workersStore).workers,
                    columns: unref(columns),
                    loading: unref(workersStore).loading,
                    "server-total": unref(workersStore).total,
                    "show-search": "",
                    "search-placeholder": "Search..."
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No workers found",
                          description: "Add your first worker to get started",
                          action: "Add Worker",
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No workers found",
                            description: "Add your first worker to get started",
                            action: "Add Worker",
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
                      data: unref(workersStore).workers,
                      columns: unref(columns),
                      loading: unref(workersStore).loading,
                      "server-total": unref(workersStore).total,
                      "show-search": "",
                      "search-placeholder": "Search..."
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No workers found",
                          description: "Add your first worker to get started",
                          action: "Add Worker",
                          onAction: ($event) => showCreateDialog.value = true
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
                    createVNode(_component_UiInput, {
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      placeholder: "Search by name or phone...",
                      class: "max-w-xs"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
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
                            createVNode(_component_UiSelectItem, { value: "true" }, {
                              default: withCtx(() => [
                                createTextVNode("Active")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "false" }, {
                              default: withCtx(() => [
                                createTextVNode("Inactive")
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
                    data: unref(workersStore).workers,
                    columns: unref(columns),
                    loading: unref(workersStore).loading,
                    "server-total": unref(workersStore).total,
                    "show-search": "",
                    "search-placeholder": "Search..."
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No workers found",
                        description: "Add your first worker to get started",
                        action: "Add Worker",
                        onAction: ($event) => showCreateDialog.value = true
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
                              _push5(`Add Worker`);
                            } else {
                              return [
                                createTextVNode("Add Worker")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Register a new worker in the system`);
                            } else {
                              return [
                                createTextVNode("Register a new worker in the system")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Add Worker")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Register a new worker in the system")
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
                        _push4(`Name *`);
                      } else {
                        return [
                          createTextVNode("Name *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-name",
                    modelValue: unref(createForm).name,
                    "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                    placeholder: "Worker name",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone`);
                      } else {
                        return [
                          createTextVNode("Phone")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-phone",
                    modelValue: unref(createForm).phone,
                    "onUpdate:modelValue": ($event) => unref(createForm).phone = $event,
                    placeholder: "Phone number"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-role" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Role`);
                      } else {
                        return [
                          createTextVNode("Role")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-role",
                    modelValue: unref(createForm).role,
                    "onUpdate:modelValue": ($event) => unref(createForm).role = $event,
                    placeholder: "e.g. Packer, Loader"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-wage" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Default Daily Wage (EGP)`);
                      } else {
                        return [
                          createTextVNode("Default Daily Wage (EGP)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-wage",
                    modelValue: unref(createForm).defaultDailyWage,
                    "onUpdate:modelValue": ($event) => unref(createForm).defaultDailyWage = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
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
                          disabled: unref(workersStore).loading
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
                            disabled: unref(workersStore).loading
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
                            createTextVNode("Add Worker")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Register a new worker in the system")
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
                            createTextVNode("Name *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-name",
                          modelValue: unref(createForm).name,
                          "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                          placeholder: "Worker name",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-phone" }, {
                            default: withCtx(() => [
                              createTextVNode("Phone")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-phone",
                            modelValue: unref(createForm).phone,
                            "onUpdate:modelValue": ($event) => unref(createForm).phone = $event,
                            placeholder: "Phone number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-role" }, {
                            default: withCtx(() => [
                              createTextVNode("Role")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-role",
                            modelValue: unref(createForm).role,
                            "onUpdate:modelValue": ($event) => unref(createForm).role = $event,
                            placeholder: "e.g. Packer, Loader"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-wage" }, {
                          default: withCtx(() => [
                            createTextVNode("Default Daily Wage (EGP)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-wage",
                          modelValue: unref(createForm).defaultDailyWage,
                          "onUpdate:modelValue": ($event) => unref(createForm).defaultDailyWage = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "0.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
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
                            disabled: unref(workersStore).loading
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
                          createTextVNode("Add Worker")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Register a new worker in the system")
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
                          createTextVNode("Name *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "create-name",
                        modelValue: unref(createForm).name,
                        "onUpdate:modelValue": ($event) => unref(createForm).name = $event,
                        placeholder: "Worker name",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-phone" }, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-phone",
                          modelValue: unref(createForm).phone,
                          "onUpdate:modelValue": ($event) => unref(createForm).phone = $event,
                          placeholder: "Phone number"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-role" }, {
                          default: withCtx(() => [
                            createTextVNode("Role")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-role",
                          modelValue: unref(createForm).role,
                          "onUpdate:modelValue": ($event) => unref(createForm).role = $event,
                          placeholder: "e.g. Packer, Loader"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "create-wage" }, {
                        default: withCtx(() => [
                          createTextVNode("Default Daily Wage (EGP)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "create-wage",
                        modelValue: unref(createForm).defaultDailyWage,
                        "onUpdate:modelValue": ($event) => unref(createForm).defaultDailyWage = $event,
                        type: "number",
                        step: "0.01",
                        placeholder: "0.00"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
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
                          disabled: unref(workersStore).loading
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
                              _push5(`Edit Worker`);
                            } else {
                              return [
                                createTextVNode("Edit Worker")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update worker information`);
                            } else {
                              return [
                                createTextVNode("Update worker information")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Worker")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Update worker information")
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
                        _push4(`Name *`);
                      } else {
                        return [
                          createTextVNode("Name *")
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
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone`);
                      } else {
                        return [
                          createTextVNode("Phone")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-phone",
                    modelValue: unref(editForm).phone,
                    "onUpdate:modelValue": ($event) => unref(editForm).phone = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-role" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Role`);
                      } else {
                        return [
                          createTextVNode("Role")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-role",
                    modelValue: unref(editForm).role,
                    "onUpdate:modelValue": ($event) => unref(editForm).role = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-wage" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Default Daily Wage (EGP)`);
                      } else {
                        return [
                          createTextVNode("Default Daily Wage (EGP)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-wage",
                    modelValue: unref(editForm).defaultDailyWage,
                    "onUpdate:modelValue": ($event) => unref(editForm).defaultDailyWage = $event,
                    type: "number",
                    step: "0.01"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiSwitch, {
                    id: "edit-active",
                    checked: unref(editForm).isActive,
                    "onUpdate:checked": ($event) => unref(editForm).isActive = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-active" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Active Worker`);
                      } else {
                        return [
                          createTextVNode("Active Worker")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                          disabled: unref(workersStore).loading
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
                            disabled: unref(workersStore).loading
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
                            createTextVNode("Edit Worker")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Update worker information")
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
                            createTextVNode("Name *")
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
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-phone" }, {
                            default: withCtx(() => [
                              createTextVNode("Phone")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-phone",
                            modelValue: unref(editForm).phone,
                            "onUpdate:modelValue": ($event) => unref(editForm).phone = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-role" }, {
                            default: withCtx(() => [
                              createTextVNode("Role")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-role",
                            modelValue: unref(editForm).role,
                            "onUpdate:modelValue": ($event) => unref(editForm).role = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-wage" }, {
                          default: withCtx(() => [
                            createTextVNode("Default Daily Wage (EGP)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-wage",
                          modelValue: unref(editForm).defaultDailyWage,
                          "onUpdate:modelValue": ($event) => unref(editForm).defaultDailyWage = $event,
                          type: "number",
                          step: "0.01"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UiSwitch, {
                          id: "edit-active",
                          checked: unref(editForm).isActive,
                          "onUpdate:checked": ($event) => unref(editForm).isActive = $event
                        }, null, 8, ["checked", "onUpdate:checked"]),
                        createVNode(_component_UiLabel, { for: "edit-active" }, {
                          default: withCtx(() => [
                            createTextVNode("Active Worker")
                          ]),
                          _: 1
                        })
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
                            disabled: unref(workersStore).loading
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
                          createTextVNode("Edit Worker")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Update worker information")
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
                          createTextVNode("Name *")
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
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-phone" }, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-phone",
                          modelValue: unref(editForm).phone,
                          "onUpdate:modelValue": ($event) => unref(editForm).phone = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-role" }, {
                          default: withCtx(() => [
                            createTextVNode("Role")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-role",
                          modelValue: unref(editForm).role,
                          "onUpdate:modelValue": ($event) => unref(editForm).role = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "edit-wage" }, {
                        default: withCtx(() => [
                          createTextVNode("Default Daily Wage (EGP)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "edit-wage",
                        modelValue: unref(editForm).defaultDailyWage,
                        "onUpdate:modelValue": ($event) => unref(editForm).defaultDailyWage = $event,
                        type: "number",
                        step: "0.01"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UiSwitch, {
                        id: "edit-active",
                        checked: unref(editForm).isActive,
                        "onUpdate:checked": ($event) => unref(editForm).isActive = $event
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode(_component_UiLabel, { for: "edit-active" }, {
                        default: withCtx(() => [
                          createTextVNode("Active Worker")
                        ]),
                        _: 1
                      })
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
                          disabled: unref(workersStore).loading
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
        title: "Delete Worker",
        description: `Are you sure you want to delete ${unref(deletingWorker)?.name}? This action cannot be undone.`,
        "confirm-text": "Delete",
        variant: "destructive",
        loading: unref(workersStore).loading,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/workers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-5lP9UVzJ.mjs.map
