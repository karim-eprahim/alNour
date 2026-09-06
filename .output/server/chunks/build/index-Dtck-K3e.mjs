import { _ as _sfc_main$2 } from './index-CUpQupPt.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, a as _sfc_main$4 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as _sfc_main$3 } from './Input-BT7sGQjY.mjs';
import { _ as __nuxt_component_10 } from './AppTable-29woUsdf.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$2, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-C62yxjGQ.mjs';
import { _ as _sfc_main$7 } from './Label-C-S6OHzh.mjs';
import { _ as _sfc_main$8 } from './Textarea-Cs62HpDa.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-B5GN9aF8.mjs';
import { defineComponent, ref, reactive, watch, resolveDirective, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, openBlock, createBlock, isRef, toDisplayString, withModifiers, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import { u as useSuppliersStore, f as fetchSuppliersLookupApi } from './store-C8FOXexX.mjs';
import { Plus, MapPin, Trash2 } from '@lucide/vue';
import { a as getCustomerColumns } from './column-Cok7n7JV.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
import { u as useCustomersStore } from './store-DY7FxZ8O.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './DropdownMenuTrigger-CfTxy9kg.mjs';
import './Checkbox-BgWIODM0.mjs';
import './TableHeader-BnIov8Zr.mjs';
import './LoadingState-CjZdJj9x.mjs';
import './SelectValue-CvBB3u-2.mjs';
import '@tanstack/vue-table';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
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
import './api-BZnrPRgb.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MapLocationPicker",
  __ssrInlineRender: true,
  props: {
    latitude: {},
    longitude: {}
  },
  emits: ["update:latitude", "update:longitude"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const mapEl = ref(null);
    watch(
      () => [props.latitude, props.longitude],
      () => {
        return;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "mapEl",
        ref: mapEl,
        class: "map-picker-root h-full w-full"
      }, _attrs))} data-v-3f3e1cc5></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/map/MapLocationPicker.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_16 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-3f3e1cc5"]]), { __name: "MapLocationPicker" });
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
    const showMapPicker = ref(false);
    const editing = ref(false);
    const form = reactive({ name: "", phone: "", address: "", latitude: null, longitude: null, linkedSupplierId: "" });
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
          await load();
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
      form.latitude = null;
      form.longitude = null;
      form.linkedSupplierId = "";
      showDialog.value = true;
    }
    function openEdit(customer) {
      editing.value = true;
      form.name = customer.name;
      form.phone = customer.phone || "";
      form.address = customer.address || "";
      form.latitude = customer.latitude ?? null;
      form.longitude = customer.longitude ?? null;
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
        if (form.latitude !== null && form.longitude !== null) {
          payload.latitude = form.latitude;
          payload.longitude = form.longitude;
        }
        if (form.linkedSupplierId) payload.linkedSupplierId = form.linkedSupplierId;
        if (editing.value) {
          await customersStore.updateCustomer(currentId.value, payload);
          toast.success("Customer updated");
        } else {
          await customersStore.createCustomer(payload);
          toast.success("Customer created");
        }
        showDialog.value = false;
        await load();
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to save customer");
      }
    }
    async function load() {
      await customersStore.fetchCustomers({ search: debouncedSearch.value || void 0, page: page.value, limit });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$2;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiInput = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$2;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiTextarea = _sfc_main$8;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiDialogFooter = _sfc_main$4$1;
      const _component_MapLocationPicker = __nuxt_component_16;
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
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "customer-location" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Customer Location <span class="text-xs text-muted-foreground"${_scopeId3}>(optional)</span>`);
                      } else {
                        return [
                          createTextVNode("Customer Location "),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center justify-between rounded-lg border p-3"${_scopeId2}>`);
                  if (unref(form).latitude !== null && unref(form).longitude !== null) {
                    _push3(`<div class="flex items-center gap-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(MapPin), { class: "size-5 text-primary" }, null, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>Location selected</p><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(form).latitude.toFixed(6))}, ${ssrInterpolate(unref(form).longitude.toFixed(6))}</p></div></div>`);
                  } else {
                    _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>No location selected</p>`);
                  }
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                  if (unref(form).latitude !== null && unref(form).longitude !== null) {
                    _push3(ssrRenderComponent(_component_UiButton, {
                      type: "button",
                      variant: "ghost",
                      size: "sm",
                      onClick: ($event) => {
                        unref(form).latitude = null;
                        unref(form).longitude = null;
                      }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Trash2), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` Clear `);
                        } else {
                          return [
                            createVNode(unref(Trash2), { class: "size-4" }),
                            createTextVNode(" Clear ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => showMapPicker.value = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(MapPin), { class: "size-4" }, null, _parent4, _scopeId3));
                        _push4(` Select location on map `);
                      } else {
                        return [
                          createVNode(unref(MapPin), { class: "size-4" }),
                          createTextVNode(" Select location on map ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="space-y-2 *:w-full"${_scopeId2}>`);
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
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "customer-location" }, {
                          default: withCtx(() => [
                            createTextVNode("Customer Location "),
                            createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex items-center justify-between rounded-lg border p-3" }, [
                          unref(form).latitude !== null && unref(form).longitude !== null ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex items-center gap-3"
                          }, [
                            createVNode(unref(MapPin), { class: "size-5 text-primary" }),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm font-medium" }, "Location selected"),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).latitude.toFixed(6)) + ", " + toDisplayString(unref(form).longitude.toFixed(6)), 1)
                            ])
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted-foreground"
                          }, "No location selected")),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            unref(form).latitude !== null && unref(form).longitude !== null ? (openBlock(), createBlock(_component_UiButton, {
                              key: 0,
                              type: "button",
                              variant: "ghost",
                              size: "sm",
                              onClick: ($event) => {
                                unref(form).latitude = null;
                                unref(form).longitude = null;
                              }
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Trash2), { class: "size-4" }),
                                createTextVNode(" Clear ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true),
                            createVNode(_component_UiButton, {
                              type: "button",
                              variant: "outline",
                              size: "sm",
                              onClick: ($event) => showMapPicker.value = true
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(MapPin), { class: "size-4" }),
                                createTextVNode(" Select location on map ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ])
                        ])
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
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "customer-location" }, {
                        default: withCtx(() => [
                          createTextVNode("Customer Location "),
                          createVNode("span", { class: "text-xs text-muted-foreground" }, "(optional)")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex items-center justify-between rounded-lg border p-3" }, [
                        unref(form).latitude !== null && unref(form).longitude !== null ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-3"
                        }, [
                          createVNode(unref(MapPin), { class: "size-5 text-primary" }),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm font-medium" }, "Location selected"),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(form).latitude.toFixed(6)) + ", " + toDisplayString(unref(form).longitude.toFixed(6)), 1)
                          ])
                        ])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-sm text-muted-foreground"
                        }, "No location selected")),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          unref(form).latitude !== null && unref(form).longitude !== null ? (openBlock(), createBlock(_component_UiButton, {
                            key: 0,
                            type: "button",
                            variant: "ghost",
                            size: "sm",
                            onClick: ($event) => {
                              unref(form).latitude = null;
                              unref(form).longitude = null;
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "size-4" }),
                              createTextVNode(" Clear ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true),
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            onClick: ($event) => showMapPicker.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(MapPin), { class: "size-4" }),
                              createTextVNode(" Select location on map ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])
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
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showMapPicker),
        "onUpdate:open": ($event) => showMapPicker.value = $event
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
                              _push5(`Select customer location`);
                            } else {
                              return [
                                createTextVNode("Select customer location")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Click on the map to place the marker, or drag it to fine-tune the position.`);
                            } else {
                              return [
                                createTextVNode("Click on the map to place the marker, or drag it to fine-tune the position.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Select customer location")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Click on the map to place the marker, or drag it to fine-tune the position.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-3"${_scopeId2}><div class="h-72 w-full overflow-hidden rounded-lg border"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_MapLocationPicker, {
                    latitude: unref(form).latitude,
                    "onUpdate:latitude": ($event) => unref(form).latitude = $event,
                    longitude: unref(form).longitude,
                    "onUpdate:longitude": ($event) => unref(form).longitude = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><p class="text-center text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(form).latitude !== null && unref(form).longitude !== null ? `${unref(form).latitude.toFixed(6)}, ${unref(form).longitude.toFixed(6)}` : "No location selected yet")}</p></div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showMapPicker.value = false
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
                          type: "button",
                          disabled: unref(form).latitude === null || unref(form).longitude === null,
                          onClick: ($event) => showMapPicker.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Confirm location`);
                            } else {
                              return [
                                createTextVNode("Confirm location")
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
                            onClick: ($event) => showMapPicker.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "button",
                            disabled: unref(form).latitude === null || unref(form).longitude === null,
                            onClick: ($event) => showMapPicker.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Confirm location")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Select customer location")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Click on the map to place the marker, or drag it to fine-tune the position.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "h-72 w-full overflow-hidden rounded-lg border" }, [
                        createVNode(_component_MapLocationPicker, {
                          latitude: unref(form).latitude,
                          "onUpdate:latitude": ($event) => unref(form).latitude = $event,
                          longitude: unref(form).longitude,
                          "onUpdate:longitude": ($event) => unref(form).longitude = $event
                        }, null, 8, ["latitude", "onUpdate:latitude", "longitude", "onUpdate:longitude"])
                      ]),
                      createVNode("p", { class: "text-center text-sm text-muted-foreground" }, toDisplayString(unref(form).latitude !== null && unref(form).longitude !== null ? `${unref(form).latitude.toFixed(6)}, ${unref(form).longitude.toFixed(6)}` : "No location selected yet"), 1)
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showMapPicker.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "button",
                          disabled: unref(form).latitude === null || unref(form).longitude === null,
                          onClick: ($event) => showMapPicker.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Confirm location")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
                      ]),
                      _: 1
                    })
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
                          createTextVNode("Select customer location")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Click on the map to place the marker, or drag it to fine-tune the position.")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode("div", { class: "h-72 w-full overflow-hidden rounded-lg border" }, [
                      createVNode(_component_MapLocationPicker, {
                        latitude: unref(form).latitude,
                        "onUpdate:latitude": ($event) => unref(form).latitude = $event,
                        longitude: unref(form).longitude,
                        "onUpdate:longitude": ($event) => unref(form).longitude = $event
                      }, null, 8, ["latitude", "onUpdate:latitude", "longitude", "onUpdate:longitude"])
                    ]),
                    createVNode("p", { class: "text-center text-sm text-muted-foreground" }, toDisplayString(unref(form).latitude !== null && unref(form).longitude !== null ? `${unref(form).latitude.toFixed(6)}, ${unref(form).longitude.toFixed(6)}` : "No location selected yet"), 1)
                  ]),
                  createVNode(_component_UiDialogFooter, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiButton, {
                        type: "button",
                        variant: "outline",
                        onClick: ($event) => showMapPicker.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiButton, {
                        type: "button",
                        disabled: unref(form).latitude === null || unref(form).longitude === null,
                        onClick: ($event) => showMapPicker.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Confirm location")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"])
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
//# sourceMappingURL=index-Dtck-K3e.mjs.map
