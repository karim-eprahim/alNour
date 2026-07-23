import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, d as _sfc_main$4 } from './CardTitle-St-iDBLB.mjs';
import { _ as _sfc_main$2 } from './Input-DA89G3IO.mjs';
import { _ as __nuxt_component_10 } from './AppTable-Di4p6o0D.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-BVvkGjQ9.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3, c as _sfc_main$1$2, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-Isr81J2S.mjs';
import { _ as _sfc_main$7 } from './Label-fqACuvH5.mjs';
import { _ as _sfc_main$8 } from './Textarea-BYfzemxZ.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-KK7k7FV7.mjs';
import { u as useSuppliersStore, f as fetchSuppliersLookupApi } from './store-DXABWweC.mjs';
import { defineComponent, ref, reactive, watch, resolveDirective, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, openBlock, createBlock, isRef, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { Plus } from '@lucide/vue';
import { a as getCustomerColumns } from './column-DVhomejf.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
import { u as useCustomersStore } from './store-KONj_zbv.mjs';
import { n as navigateTo } from './server.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './DropdownMenuTrigger-dnC_q6qg.mjs';
import './Checkbox-aOmH4bgm.mjs';
import './TableHeader-f7ALV9Yi.mjs';
import './LoadingState-y5B8zlzY.mjs';
import './SelectValue-CDW_Y5sR.mjs';
import '@tanstack/vue-table';
import 'pinia';
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
    const customersStore = useCustomersStore();
    useSuppliersStore();
    ref([]);
    const search = ref("");
    const page = ref(1);
    const showDialog = ref(false);
    const editing = ref(false);
    const form = reactive({ name: "", phone: "", address: "", linkedSupplierId: "" });
    const currentId = ref("");
    const customerActions = {
      onView: (id) => navigateTo(`/customers/${id}`),
      onEdit: (customer) => {
        currentId.value = customer.id;
        openEdit(customer);
      },
      onDelete: async (id) => {
        if (!confirm("Delete this customer?")) return;
        try {
          await customersStore.deleteCustomer(id);
          toast.success("Customer deleted");
        } catch {
          toast.error("Failed to delete");
        }
      }
    };
    const columns = getCustomerColumns(customerActions);
    const debouncedSearch = ref("");
    watch(search, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedSearch.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    watch(debouncedSearch, () => {
      page.value = 1;
      load();
    });
    watch(page, load);
    function openCreate() {
      editing.value = false;
      form.name = "";
      form.phone = "";
      form.address = "";
      form.linkedSupplierId = "";
      showDialog.value = true;
    }
    function openEdit(customer) {
      editing.value = true;
      form.name = customer.name;
      form.phone = customer.phone || "";
      form.address = customer.address || "";
      form.linkedSupplierId = customer.linkedSupplier?.id ?? "";
      showDialog.value = true;
    }
    async function save() {
      if (!form.name) {
        toast.error("Name is required");
        return;
      }
      try {
        const payload = { name: form.name, phone: form.phone, address: form.address };
        if (form.linkedSupplierId) payload.linkedSupplierId = form.linkedSupplierId;
        if (editing.value) {
          await customersStore.updateCustomer(currentId.value, payload);
          toast.success("Customer updated");
        } else {
          await customersStore.createCustomer(payload);
          toast.success("Customer created");
        }
        showDialog.value = false;
      } catch {
        toast.error("Failed to save customer");
      }
    }
    async function load() {
      await customersStore.fetchCustomers({ search: debouncedSearch.value || void 0, page: page.value, limit });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
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
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Customers",
        description: "Customer directory and balances"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({ onClick: openCreate }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "CUSTOMERS", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Add Customer`);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "size-4" }),
                    createTextVNode(" Add Customer")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_UiButton, { onClick: openCreate }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), { class: "size-4" }),
                  createTextVNode(" Add Customer")
                ]),
                _: 1
              })), [
                [_directive_can, { module: "CUSTOMERS", action: "CREATE" }]
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
                    placeholder: "Search by name or phone...",
                    class: "max-w-xs"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiInput, {
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      placeholder: "Search by name or phone...",
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
                    data: unref(customersStore).customers,
                    columns: unref(columns),
                    loading: unref(customersStore).loading,
                    "server-total": unref(customersStore).total,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No customers found",
                          description: "Add your first customer",
                          action: "Add Customer",
                          onAction: openCreate
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No customers found",
                            description: "Add your first customer",
                            action: "Add Customer",
                            onAction: openCreate
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(customersStore).customers,
                      columns: unref(columns),
                      loading: unref(customersStore).loading,
                      "server-total": unref(customersStore).total,
                      "show-search": false,
                      "show-column-toggle": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No customers found",
                          description: "Add your first customer",
                          action: "Add Customer",
                          onAction: openCreate
                        })
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
                  createVNode(_component_UiInput, {
                    modelValue: unref(search),
                    "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                    placeholder: "Search by name or phone...",
                    class: "max-w-xs"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(customersStore).customers,
                    columns: unref(columns),
                    loading: unref(customersStore).loading,
                    "server-total": unref(customersStore).total,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No customers found",
                        description: "Add your first customer",
                        action: "Add Customer",
                        onAction: openCreate
                      })
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
        open: unref(showDialog),
        "onUpdate:open": ($event) => showDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(editing) ? "Edit" : "Add")} Customer`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(editing) ? "Edit" : "Add") + " Customer", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Enter customer contact information`);
                            } else {
                              return [
                                createTextVNode("Enter customer contact information")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(editing) ? "Edit" : "Add") + " Customer", 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Enter customer contact information")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "name" }, {
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
                    id: "name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    placeholder: "Customer name"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "phone" }, {
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
                    id: "phone",
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    placeholder: "Phone number"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "address" }, {
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
                    id: "address",
                    modelValue: unref(form).address,
                    "onUpdate:modelValue": ($event) => unref(form).address = $event,
                    placeholder: "Address"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2 *:w-full"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "supplier-link" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Link to Supplier <span class="text-xs text-muted-foreground"${_scopeId3}>(optional)</span>`);
                      } else {
                        return [
                          createTextVNode("Link to Supplier "),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(form).linkedSupplierId,
                    "onUpdate:modelValue": ($event) => unref(form).linkedSupplierId = $event,
                    endpoint: "fetchSuppliersLookupApi" in _ctx ? _ctx.fetchSuppliersLookupApi : unref(fetchSuppliersLookupApi),
                    placeholder: "Select a supplier...",
                    "include-all": "",
                    "all-value": "__all__",
                    "all-label": "None"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showDialog.value = false
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
                        _push4(ssrRenderComponent(_component_UiButton, { type: "submit" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(editing) ? "Update" : "Create")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(editing) ? "Update" : "Create"), 1)
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
                            onClick: ($event) => showDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(editing) ? "Update" : "Create"), 1)
                            ]),
                            _: 1
                          })
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
                            createTextVNode(toDisplayString(unref(editing) ? "Edit" : "Add") + " Customer", 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Enter customer contact information")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(save, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          placeholder: "Customer name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "phone" }, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          placeholder: "Phone number"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "address" }, {
                          default: withCtx(() => [
                            createTextVNode("Address")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          id: "address",
                          modelValue: unref(form).address,
                          "onUpdate:modelValue": ($event) => unref(form).address = $event,
                          placeholder: "Address"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2 *:w-full" }, [
                        createVNode(_component_UiLabel, { for: "supplier-link" }, {
                          default: withCtx(() => [
                            createTextVNode("Link to Supplier "),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(form).linkedSupplierId,
                          "onUpdate:modelValue": ($event) => unref(form).linkedSupplierId = $event,
                          endpoint: "fetchSuppliersLookupApi" in _ctx ? _ctx.fetchSuppliersLookupApi : unref(fetchSuppliersLookupApi),
                          placeholder: "Select a supplier...",
                          "include-all": "",
                          "all-value": "__all__",
                          "all-label": "None"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(editing) ? "Update" : "Create"), 1)
                            ]),
                            _: 1
                          })
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
              createVNode(_component_UiDialogContent, null, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(editing) ? "Edit" : "Add") + " Customer", 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Enter customer contact information")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(save, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "name" }, {
                        default: withCtx(() => [
                          createTextVNode("Name *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "name",
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        placeholder: "Customer name"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "phone" }, {
                        default: withCtx(() => [
                          createTextVNode("Phone")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "phone",
                        modelValue: unref(form).phone,
                        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                        placeholder: "Phone number"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "address" }, {
                        default: withCtx(() => [
                          createTextVNode("Address")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        id: "address",
                        modelValue: unref(form).address,
                        "onUpdate:modelValue": ($event) => unref(form).address = $event,
                        placeholder: "Address"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2 *:w-full" }, [
                      createVNode(_component_UiLabel, { for: "supplier-link" }, {
                        default: withCtx(() => [
                          createTextVNode("Link to Supplier "),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(form).linkedSupplierId,
                        "onUpdate:modelValue": ($event) => unref(form).linkedSupplierId = $event,
                        endpoint: "fetchSuppliersLookupApi" in _ctx ? _ctx.fetchSuppliersLookupApi : unref(fetchSuppliersLookupApi),
                        placeholder: "Select a supplier...",
                        "include-all": "",
                        "all-value": "__all__",
                        "all-label": "None"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, { type: "submit" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(editing) ? "Update" : "Create"), 1)
                          ]),
                          _: 1
                        })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/customers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-JuB3kkDA.mjs.map
