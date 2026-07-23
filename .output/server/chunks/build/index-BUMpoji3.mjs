import { _ as __nuxt_component_0 } from './nuxt-link-DEwgn_ii.mjs';
import { e as _sfc_main$9$1, d as _sfc_main$5$1, _ as _sfc_main$d, a as _sfc_main$a, b as _sfc_main$b } from './DropdownMenuTrigger-MlqyivDB.mjs';
import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, a as _sfc_main$4 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$2 } from './Input-pgd-3rGf.mjs';
import { _ as __nuxt_component_10 } from './AppTable-fABlY_aP.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3, c as _sfc_main$1$2, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$7 } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$8 } from './Textarea-B_fNd96X.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as __nuxt_component_20 } from './ConfirmDialog-B8hxYJp1.mjs';
import { defineComponent, ref, watch, reactive, resolveDirective, mergeProps, withCtx, unref, createTextVNode, withDirectives, openBlock, createBlock, isRef, createVNode, withModifiers, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { Building2, Phone, Eye, Pencil, Trash2, MoreHorizontal } from '@lucide/vue';
import { h as usePermissions, n as navigateTo } from './server.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useCustomersStore, f as fetchCustomersLookupApi } from './store-KONj_zbv.mjs';
import { toast } from 'vue-sonner';
import { u as useSuppliersStore } from './store-DXABWweC.mjs';
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
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
import './SelectValue-CdUm-rR7.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const suppliersStore = useSuppliersStore();
    useCustomersStore();
    ref([]);
    const search = ref("");
    const debouncedSearch = ref("");
    watch(search, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedSearch.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    watch(debouncedSearch, () => suppliersStore.fetchSuppliers({ search: debouncedSearch.value || void 0 }));
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const editingSupplier = ref(null);
    const deletingSupplier = ref(null);
    const createForm = reactive({ name: "", phone: "", email: "", address: "", company: "", linkedCustomerId: "" });
    const editForm = reactive({ name: "", phone: "", email: "", address: "", company: "", linkedCustomerId: "" });
    function openEdit(s) {
      editingSupplier.value = s;
      editForm.name = s.name;
      editForm.phone = s.phone ?? "";
      editForm.email = s.email ?? "";
      editForm.address = s.address ?? "";
      editForm.company = s.company ?? "";
      editForm.linkedCustomerId = s.linkedCustomer?.id ?? "";
      showEditDialog.value = true;
    }
    function openDelete(s) {
      deletingSupplier.value = s;
      showDeleteDialog.value = true;
    }
    async function handleCreate() {
      try {
        const payload = { ...createForm };
        if (!payload.linkedCustomerId) payload.linkedCustomerId = null;
        await suppliersStore.createSupplier(payload);
        showCreateDialog.value = false;
        createForm.name = "";
        createForm.phone = "";
        createForm.email = "";
        createForm.address = "";
        createForm.company = "";
        createForm.linkedCustomerId = "";
        toast.success("Supplier created");
      } catch {
      }
    }
    async function handleEdit() {
      if (!editingSupplier.value) return;
      try {
        await suppliersStore.updateSupplier(editingSupplier.value.id, editForm);
        showEditDialog.value = false;
        editingSupplier.value = null;
        toast.success("Supplier updated");
      } catch {
      }
    }
    async function handleDelete() {
      if (!deletingSupplier.value) return;
      try {
        await suppliersStore.deleteSupplier(deletingSupplier.value.id);
        showDeleteDialog.value = false;
        deletingSupplier.value = null;
        toast.success("Supplier deleted");
      } catch {
      }
    }
    const columns = [
      {
        accessorKey: "name",
        header: "Supplier",
        cell: ({ row }) => h("div", { class: "flex items-center gap-3" }, [
          h("div", { class: "size-8 flex items-center justify-center rounded-lg bg-muted" }, [
            h(Building2, { class: "size-4 text-muted-foreground" })
          ]),
          h("div", null, [
            h(__nuxt_component_0, { to: `/suppliers/${row.original.id}`, class: "text-sm font-medium hover:underline" }, row.original.name),
            row.original.company ? h("p", { class: "text-xs text-muted-foreground" }, row.original.company) : null
          ])
        ])
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => {
          const p = row.original.phone;
          return p ? h("div", { class: "flex items-center gap-1.5 text-sm" }, [
            h(Phone, { class: "size-3.5 text-muted-foreground" }),
            p
          ]) : h("span", { class: "text-xs text-muted-foreground" }, "—");
        }
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => row.original.email || "—"
      },
      {
        id: "balance",
        header: "Balance",
        cell: ({ row }) => {
          const bal = row.original.balance ?? 0;
          return h("span", {
            class: `text-sm font-medium tabular-nums ${bal > 0 ? "text-destructive" : bal < 0 ? "text-green-600" : ""}`
          }, `${Number(bal).toFixed(2)}`);
        }
      },
      {
        id: "invoices",
        header: "Invoices",
        cell: ({ row }) => h("span", { class: "text-sm" }, String(row.original._count?.purchaseInvoices ?? 0))
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const s = row.original;
          const { can } = usePermissions();
          const items = [];
          if (can("SUPPLIERS", "READ")) {
            items.push(h(_sfc_main$9$1, { onClick: () => navigateTo(`/suppliers/${s.id}`) }, [h(Eye, { class: "size-4" }), " View"]));
          }
          if (can("SUPPLIERS", "UPDATE")) {
            items.push(h(_sfc_main$9$1, { onClick: () => openEdit(s) }, [h(Pencil, { class: "size-4" }), " Edit"]));
          }
          if (can("SUPPLIERS", "DELETE")) {
            items.push(h(_sfc_main$5$1));
            items.push(h(_sfc_main$9$1, { variant: "destructive", onClick: () => openDelete(s) }, [h(Trash2, { class: "size-4" }), " Delete"]));
          }
          if (items.length === 0) return h("span");
          return h("div", [
            h(_sfc_main$d, null, {
              default: () => [
                h(_sfc_main$a, { "as-child": true }, {
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
      const _component_UiTextarea = _sfc_main$8;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiDialogFooter = _sfc_main$4$1;
      const _component_ConfirmDialog = __nuxt_component_20;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Suppliers",
        description: "Manage supplier directory and outstanding balances"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), mergeProps({
              onClick: ($event) => showCreateDialog.value = true
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "SUPPLIERS", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Add Supplier`);
                } else {
                  return [
                    createTextVNode("Add Supplier")
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
                  createTextVNode("Add Supplier")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "SUPPLIERS", action: "CREATE" }]
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
                    placeholder: "Search by name, company, or phone...",
                    class: "max-w-sm"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiInput, {
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      placeholder: "Search by name, company, or phone...",
                      class: "max-w-sm"
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
                    data: unref(suppliersStore).suppliers,
                    columns,
                    loading: unref(suppliersStore).loading,
                    "server-total": unref(suppliersStore).total,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No suppliers",
                          description: "Add your first supplier to get started",
                          action: "Add Supplier",
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No suppliers",
                            description: "Add your first supplier to get started",
                            action: "Add Supplier",
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
                      data: unref(suppliersStore).suppliers,
                      columns,
                      loading: unref(suppliersStore).loading,
                      "server-total": unref(suppliersStore).total,
                      "show-search": false,
                      "show-column-toggle": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No suppliers",
                          description: "Add your first supplier to get started",
                          action: "Add Supplier",
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
                    placeholder: "Search by name, company, or phone...",
                    class: "max-w-sm"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(suppliersStore).suppliers,
                    columns,
                    loading: unref(suppliersStore).loading,
                    "server-total": unref(suppliersStore).total,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No suppliers",
                        description: "Add your first supplier to get started",
                        action: "Add Supplier",
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
                              _push5(`Add Supplier`);
                            } else {
                              return [
                                createTextVNode("Add Supplier")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add a new supplier to the directory`);
                            } else {
                              return [
                                createTextVNode("Add a new supplier to the directory")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Add Supplier")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Add a new supplier to the directory")
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
                    placeholder: "Supplier name",
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
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email`);
                      } else {
                        return [
                          createTextVNode("Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-email",
                    modelValue: unref(createForm).email,
                    "onUpdate:modelValue": ($event) => unref(createForm).email = $event,
                    type: "email",
                    placeholder: "email@example.com"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-company" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Company`);
                      } else {
                        return [
                          createTextVNode("Company")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-company",
                    modelValue: unref(createForm).company,
                    "onUpdate:modelValue": ($event) => unref(createForm).company = $event,
                    placeholder: "Company name"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-address" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Address`);
                      } else {
                        return [
                          createTextVNode("Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTextarea, {
                    id: "create-address",
                    modelValue: unref(createForm).address,
                    "onUpdate:modelValue": ($event) => unref(createForm).address = $event,
                    placeholder: "Address"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2 *:w-full"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-customer-link" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Link to Customer <span class="text-xs text-muted-foreground"${_scopeId3}>(optional)</span>`);
                      } else {
                        return [
                          createTextVNode("Link to Customer "),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(createForm).linkedCustomerId,
                    "onUpdate:modelValue": ($event) => unref(createForm).linkedCustomerId = $event,
                    endpoint: unref(fetchCustomersLookupApi),
                    placeholder: "Select a customer...",
                    "include-all": "",
                    "all-value": "__all__",
                    "all-label": "None",
                    class: "w-full"
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
                          disabled: unref(suppliersStore).loading
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
                            disabled: unref(suppliersStore).loading
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
                            createTextVNode("Add Supplier")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Add a new supplier to the directory")
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
                          placeholder: "Supplier name",
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
                          createVNode(_component_UiLabel, { for: "create-email" }, {
                            default: withCtx(() => [
                              createTextVNode("Email")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-email",
                            modelValue: unref(createForm).email,
                            "onUpdate:modelValue": ($event) => unref(createForm).email = $event,
                            type: "email",
                            placeholder: "email@example.com"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-company" }, {
                          default: withCtx(() => [
                            createTextVNode("Company")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-company",
                          modelValue: unref(createForm).company,
                          "onUpdate:modelValue": ($event) => unref(createForm).company = $event,
                          placeholder: "Company name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-address" }, {
                          default: withCtx(() => [
                            createTextVNode("Address")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          id: "create-address",
                          modelValue: unref(createForm).address,
                          "onUpdate:modelValue": ($event) => unref(createForm).address = $event,
                          placeholder: "Address"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2 *:w-full" }, [
                        createVNode(_component_UiLabel, { for: "create-customer-link" }, {
                          default: withCtx(() => [
                            createTextVNode("Link to Customer "),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(createForm).linkedCustomerId,
                          "onUpdate:modelValue": ($event) => unref(createForm).linkedCustomerId = $event,
                          endpoint: unref(fetchCustomersLookupApi),
                          placeholder: "Select a customer...",
                          "include-all": "",
                          "all-value": "__all__",
                          "all-label": "None",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
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
                            disabled: unref(suppliersStore).loading
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
                          createTextVNode("Add Supplier")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Add a new supplier to the directory")
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
                        placeholder: "Supplier name",
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
                        createVNode(_component_UiLabel, { for: "create-email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-email",
                          modelValue: unref(createForm).email,
                          "onUpdate:modelValue": ($event) => unref(createForm).email = $event,
                          type: "email",
                          placeholder: "email@example.com"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "create-company" }, {
                        default: withCtx(() => [
                          createTextVNode("Company")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "create-company",
                        modelValue: unref(createForm).company,
                        "onUpdate:modelValue": ($event) => unref(createForm).company = $event,
                        placeholder: "Company name"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "create-address" }, {
                        default: withCtx(() => [
                          createTextVNode("Address")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        id: "create-address",
                        modelValue: unref(createForm).address,
                        "onUpdate:modelValue": ($event) => unref(createForm).address = $event,
                        placeholder: "Address"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2 *:w-full" }, [
                      createVNode(_component_UiLabel, { for: "create-customer-link" }, {
                        default: withCtx(() => [
                          createTextVNode("Link to Customer "),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(createForm).linkedCustomerId,
                        "onUpdate:modelValue": ($event) => unref(createForm).linkedCustomerId = $event,
                        endpoint: unref(fetchCustomersLookupApi),
                        placeholder: "Select a customer...",
                        "include-all": "",
                        "all-value": "__all__",
                        "all-label": "None",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
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
                          disabled: unref(suppliersStore).loading
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
                              _push5(`Edit Supplier`);
                            } else {
                              return [
                                createTextVNode("Edit Supplier")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update supplier information`);
                            } else {
                              return [
                                createTextVNode("Update supplier information")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Supplier")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Update supplier information")
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
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email`);
                      } else {
                        return [
                          createTextVNode("Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-email",
                    modelValue: unref(editForm).email,
                    "onUpdate:modelValue": ($event) => unref(editForm).email = $event,
                    type: "email"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-company" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Company`);
                      } else {
                        return [
                          createTextVNode("Company")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-company",
                    modelValue: unref(editForm).company,
                    "onUpdate:modelValue": ($event) => unref(editForm).company = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-address" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Address`);
                      } else {
                        return [
                          createTextVNode("Address")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTextarea, {
                    id: "edit-address",
                    modelValue: unref(editForm).address,
                    "onUpdate:modelValue": ($event) => unref(editForm).address = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2 *:w-full"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-customer-link" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Link to Customer<span class="text-xs text-muted-foreground"${_scopeId3}>(optional)</span>`);
                      } else {
                        return [
                          createTextVNode("Link to Customer"),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(editForm).linkedCustomerId,
                    "onUpdate:modelValue": ($event) => unref(editForm).linkedCustomerId = $event,
                    endpoint: unref(fetchCustomersLookupApi),
                    placeholder: "Select a customer...",
                    "include-all": "",
                    "all-value": "__all__",
                    "all-label": "None",
                    class: "w-full"
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
                          disabled: unref(suppliersStore).loading
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
                            disabled: unref(suppliersStore).loading
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
                            createTextVNode("Edit Supplier")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Update supplier information")
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
                          createVNode(_component_UiLabel, { for: "edit-email" }, {
                            default: withCtx(() => [
                              createTextVNode("Email")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-email",
                            modelValue: unref(editForm).email,
                            "onUpdate:modelValue": ($event) => unref(editForm).email = $event,
                            type: "email"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-company" }, {
                          default: withCtx(() => [
                            createTextVNode("Company")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-company",
                          modelValue: unref(editForm).company,
                          "onUpdate:modelValue": ($event) => unref(editForm).company = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-address" }, {
                          default: withCtx(() => [
                            createTextVNode("Address")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          id: "edit-address",
                          modelValue: unref(editForm).address,
                          "onUpdate:modelValue": ($event) => unref(editForm).address = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2 *:w-full" }, [
                        createVNode(_component_UiLabel, { for: "edit-customer-link" }, {
                          default: withCtx(() => [
                            createTextVNode("Link to Customer"),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(editForm).linkedCustomerId,
                          "onUpdate:modelValue": ($event) => unref(editForm).linkedCustomerId = $event,
                          endpoint: unref(fetchCustomersLookupApi),
                          placeholder: "Select a customer...",
                          "include-all": "",
                          "all-value": "__all__",
                          "all-label": "None",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
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
                            disabled: unref(suppliersStore).loading
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
                          createTextVNode("Edit Supplier")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Update supplier information")
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
                        createVNode(_component_UiLabel, { for: "edit-email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-email",
                          modelValue: unref(editForm).email,
                          "onUpdate:modelValue": ($event) => unref(editForm).email = $event,
                          type: "email"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "edit-company" }, {
                        default: withCtx(() => [
                          createTextVNode("Company")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "edit-company",
                        modelValue: unref(editForm).company,
                        "onUpdate:modelValue": ($event) => unref(editForm).company = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "edit-address" }, {
                        default: withCtx(() => [
                          createTextVNode("Address")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        id: "edit-address",
                        modelValue: unref(editForm).address,
                        "onUpdate:modelValue": ($event) => unref(editForm).address = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2 *:w-full" }, [
                      createVNode(_component_UiLabel, { for: "edit-customer-link" }, {
                        default: withCtx(() => [
                          createTextVNode("Link to Customer"),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(editForm).linkedCustomerId,
                        "onUpdate:modelValue": ($event) => unref(editForm).linkedCustomerId = $event,
                        endpoint: unref(fetchCustomersLookupApi),
                        placeholder: "Select a customer...",
                        "include-all": "",
                        "all-value": "__all__",
                        "all-label": "None",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
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
                          disabled: unref(suppliersStore).loading
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
        title: "Delete Supplier",
        description: `Are you sure you want to delete ${unref(deletingSupplier)?.name}?`,
        "confirm-text": "Delete",
        variant: "destructive",
        loading: unref(suppliersStore).loading,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/suppliers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BUMpoji3.mjs.map
