import { _ as __nuxt_component_0 } from './nuxt-link-CZynLBtj.mjs';
import { _ as _sfc_main$1 } from './index-CUpQupPt.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { _ as _sfc_main$2 } from './Input-BT7sGQjY.mjs';
import { _ as __nuxt_component_10 } from './AppTable-29woUsdf.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { _ as _sfc_main$8, a as _sfc_main$5, b as _sfc_main$2$1, c as _sfc_main$1$1, d as _sfc_main$4 } from './SheetTrigger-DvMExeZL.mjs';
import { _ as _sfc_main$3 } from './Label-C-S6OHzh.mjs';
import { _ as _sfc_main$6 } from './Textarea-Cs62HpDa.mjs';
import { defineComponent, ref, reactive, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef, toDisplayString, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { Plus, Search, Users, Phone, MapPin, Pencil } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { u as useCustomersStore } from './store-DY7FxZ8O.mjs';
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
import 'clsx';
import 'tailwind-merge';
import 'class-variance-authority';
import 'reka-ui';
import './DropdownMenuTrigger-CfTxy9kg.mjs';
import './Checkbox-BgWIODM0.mjs';
import './TableHeader-BnIov8Zr.mjs';
import './LoadingState-CjZdJj9x.mjs';
import './SelectValue-CvBB3u-2.mjs';
import '@tanstack/vue-table';
import './api-BZnrPRgb.mjs';

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const customersStore = useCustomersStore();
    const search = ref("");
    const page = ref(1);
    const showCreateSheet = ref(false);
    const showEditSheet = ref(false);
    const editingCustomer = ref(null);
    const form = reactive({ name: "", phone: "", address: "" });
    const formSaving = ref(false);
    const columns = [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => h(__nuxt_component_0, { to: `/distributor/contacts/${row.original.id}`, class: "font-medium hover:underline" }, row.original.name)
      },
      {
        accessorKey: "phone",
        header: "Phone",
        enableSorting: false,
        cell: ({ row }) => row.original.phone ? h("div", { class: "flex items-center gap-1 text-muted-foreground" }, [
          h(Phone, { class: "size-3 shrink-0" }),
          row.original.phone
        ]) : h("span", { class: "text-muted-foreground" }, "—")
      },
      {
        accessorKey: "address",
        header: "Address",
        enableSorting: false,
        cell: ({ row }) => row.original.address ? h("div", { class: "flex items-center gap-1 text-muted-foreground" }, [
          h(MapPin, { class: "size-3 shrink-0" }),
          h("span", { class: "max-w-40 truncate" }, row.original.address)
        ]) : h("span", { class: "text-muted-foreground" }, "—")
      },
      {
        accessorKey: "balance",
        header: "Balance",
        cell: ({ row }) => {
          const bal = row.original.balance || 0;
          return h("span", { class: `tabular-nums font-medium block ${bal > 0 ? "text-green-600" : bal < 0 ? "text-red-600" : ""}` }, bal.toFixed(2));
        }
      },
      {
        id: "orders",
        header: "Orders",
        enableSorting: false,
        cell: ({ row }) => h("span", { class: "tabular-nums text-muted-foreground block" }, String(row.original._count?.salesOrders ?? 0))
      },
      {
        id: "invoices",
        header: "Invoices",
        enableSorting: false,
        cell: ({ row }) => h("span", { class: "tabular-nums text-muted-foreground block" }, String(row.original._count?.invoices ?? 0))
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => h("div", { class: "flex justify-end" }, [
          h(_sfc_main$1, { variant: "ghost", size: "icon", class: "size-7", onClick: () => openEdit(row.original) }, {
            default: () => h(Pencil, { class: "size-3.5" })
          })
        ])
      }
    ];
    async function load() {
      await customersStore.fetchCustomers({ search: search.value || void 0, page: page.value, limit });
    }
    watch([search, page], load);
    function openCreate() {
      form.name = "";
      form.phone = "";
      form.address = "";
      showCreateSheet.value = true;
    }
    function openEdit(customer) {
      editingCustomer.value = customer;
      form.name = customer.name;
      form.phone = customer.phone || "";
      form.address = customer.address || "";
      showEditSheet.value = true;
    }
    async function handleCreate() {
      if (!form.name.trim()) return;
      formSaving.value = true;
      try {
        await customersStore.createCustomer({ name: form.name.trim(), phone: form.phone || void 0, address: form.address || void 0 });
        toast.success("Customer created");
        showCreateSheet.value = false;
        await load();
      } catch (err) {
        toast.error(err?.message || "Failed to create customer");
      } finally {
        formSaving.value = false;
      }
    }
    async function handleUpdate() {
      if (!editingCustomer.value || !form.name.trim()) return;
      formSaving.value = true;
      try {
        await customersStore.updateCustomer(editingCustomer.value.id, { name: form.name.trim(), phone: form.phone || void 0, address: form.address || void 0 });
        toast.success("Customer updated");
        showEditSheet.value = false;
        editingCustomer.value = null;
        await load();
      } catch (err) {
        toast.error(err?.message || "Failed to update customer");
      } finally {
        formSaving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = PageHeader;
      const _component_UiInput = _sfc_main$2;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiSheet = _sfc_main$8;
      const _component_UiSheetContent = _sfc_main$5;
      const _component_UiSheetHeader = _sfc_main$2$1;
      const _component_UiSheetTitle = _sfc_main$1$1;
      const _component_UiSheetDescription = _sfc_main$4;
      const _component_UiLabel = _sfc_main$3;
      const _component_UiTextarea = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PageHeader, {
        title: "Customers",
        description: "Manage your customers and their balances"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              size: "sm",
              onClick: openCreate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` New Customer `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "size-4" }),
                    createTextVNode(" New Customer ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1), {
                size: "sm",
                onClick: openCreate
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), { class: "size-4" }),
                  createTextVNode(" New Customer ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative mb-4">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        placeholder: "Search customers...",
        class: "pl-9"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AppTable, {
        data: unref(customersStore).customers,
        columns,
        loading: unref(customersStore).loading,
        "show-search": false,
        "show-column-toggle": false,
        "show-pagination": false
      }, {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EmptyState, {
              icon: unref(Users),
              title: "No customers found",
              description: "Add your first customer to get started",
              action: "New Customer",
              onAction: openCreate
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EmptyState, {
                icon: unref(Users),
                title: "No customers found",
                description: "Add your first customer to get started",
                action: "New Customer",
                onAction: openCreate
              }, null, 8, ["icon"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiSheet, {
        open: unref(showCreateSheet),
        "onUpdate:open": ($event) => showCreateSheet.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiSheetContent, {
              side: "right",
              class: "w-full sm:max-w-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiSheetHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSheetTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`New Customer`);
                            } else {
                              return [
                                createTextVNode("New Customer")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSheetDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add a new customer to your list`);
                            } else {
                              return [
                                createTextVNode("Add a new customer to your list")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSheetTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("New Customer")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSheetDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Add a new customer to your list")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mt-6 space-y-4 px-3"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
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
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    placeholder: "Customer name",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
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
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    placeholder: "Phone number",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
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
                    modelValue: unref(form).address,
                    "onUpdate:modelValue": ($event) => unref(form).address = $event,
                    placeholder: "Address",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    class: "w-full",
                    disabled: unref(formSaving) || !unref(form).name.trim(),
                    onClick: handleCreate
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(formSaving) ? "Creating..." : "Create Customer")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(formSaving) ? "Creating..." : "Create Customer"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_UiSheetHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiSheetTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("New Customer")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSheetDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Add a new customer to your list")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-6 space-y-4 px-3" }, [
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Name *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Customer name",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          placeholder: "Phone number",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Address")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          modelValue: unref(form).address,
                          "onUpdate:modelValue": ($event) => unref(form).address = $event,
                          placeholder: "Address",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        class: "w-full",
                        disabled: unref(formSaving) || !unref(form).name.trim(),
                        onClick: handleCreate
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formSaving) ? "Creating..." : "Create Customer"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiSheetContent, {
                side: "right",
                class: "w-full sm:max-w-md"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiSheetHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiSheetTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("New Customer")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSheetDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Add a new customer to your list")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "mt-6 space-y-4 px-3" }, [
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Name *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        placeholder: "Customer name",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Phone")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(form).phone,
                        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                        placeholder: "Phone number",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Address")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        modelValue: unref(form).address,
                        "onUpdate:modelValue": ($event) => unref(form).address = $event,
                        placeholder: "Address",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$1), {
                      class: "w-full",
                      disabled: unref(formSaving) || !unref(form).name.trim(),
                      onClick: handleCreate
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(formSaving) ? "Creating..." : "Create Customer"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiSheet, {
        open: unref(showEditSheet),
        "onUpdate:open": ($event) => showEditSheet.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiSheetContent, {
              side: "right",
              class: "w-full sm:max-w-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiSheetHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSheetTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Edit Customer`);
                            } else {
                              return [
                                createTextVNode("Edit Customer")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSheetDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update customer information`);
                            } else {
                              return [
                                createTextVNode("Update customer information")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSheetTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Customer")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSheetDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Update customer information")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="mt-6 space-y-4 px-3"${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
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
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    placeholder: "Customer name",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
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
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    placeholder: "Phone number",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
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
                    modelValue: unref(form).address,
                    "onUpdate:modelValue": ($event) => unref(form).address = $event,
                    placeholder: "Address",
                    class: "mt-1"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$1), {
                    class: "w-full",
                    disabled: unref(formSaving) || !unref(form).name.trim(),
                    onClick: handleUpdate
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(formSaving) ? "Saving..." : "Save Changes")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(formSaving) ? "Saving..." : "Save Changes"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_UiSheetHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiSheetTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Edit Customer")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSheetDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Update customer information")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "mt-6 space-y-4 px-3" }, [
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Name *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Customer name",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          placeholder: "Phone number",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Address")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          modelValue: unref(form).address,
                          "onUpdate:modelValue": ($event) => unref(form).address = $event,
                          placeholder: "Address",
                          class: "mt-1"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$1), {
                        class: "w-full",
                        disabled: unref(formSaving) || !unref(form).name.trim(),
                        onClick: handleUpdate
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(formSaving) ? "Saving..." : "Save Changes"), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiSheetContent, {
                side: "right",
                class: "w-full sm:max-w-md"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiSheetHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiSheetTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Edit Customer")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSheetDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Update customer information")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "mt-6 space-y-4 px-3" }, [
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Name *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        placeholder: "Customer name",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Phone")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(form).phone,
                        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                        placeholder: "Phone number",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Address")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        modelValue: unref(form).address,
                        "onUpdate:modelValue": ($event) => unref(form).address = $event,
                        placeholder: "Address",
                        class: "mt-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$1), {
                      class: "w-full",
                      disabled: unref(formSaving) || !unref(form).name.trim(),
                      onClick: handleUpdate
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(formSaving) ? "Saving..." : "Save Changes"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/contacts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-u417pvRC.mjs.map
