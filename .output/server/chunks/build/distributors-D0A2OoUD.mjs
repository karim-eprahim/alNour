import { _ as _sfc_main$a } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { _ as __nuxt_component_10 } from './AppTable-fABlY_aP.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { n as navigateTo } from './server.mjs';
import { f as fetchProductsLookupApi } from './api-Dq8IcxCC.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, withModifiers, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { ArrowLeft, Loader2, Truck, RotateCcw } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { _ as _sfc_main$6, b as _sfc_main$1$1, c as _sfc_main$2, d as _sfc_main$3, a as _sfc_main$4 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$2, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$8 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$7 } from './Label-Di1i-yIq.mjs';
import 'class-variance-authority';
import '@vueuse/core';
import 'reka-ui';
import './DropdownMenuTrigger-MlqyivDB.mjs';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
import './SelectValue-CdUm-rR7.mjs';
import '@tanstack/vue-table';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "distributors",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const distributors = ref([]);
    const products = ref([]);
    ref([]);
    const showLoadDialog = ref(false);
    const showReturnDialog = ref(false);
    const selectedDistributor = ref(null);
    const submitting = ref(false);
    const loadForm = reactive({
      distributorId: "",
      productId: "",
      warehouseId: "",
      quantity: 0,
      notes: ""
    });
    const returnForm = reactive({
      distributorId: "",
      productId: "",
      warehouseId: "",
      quantity: 0,
      notes: ""
    });
    const columns = [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => h("span", { class: "font-medium" }, row.original.name)
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => h("span", { class: "text-sm" }, row.original.phone || "—")
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const variant = status === "ACTIVE" ? "success" : status === "INACTIVE" ? "secondary" : "destructive";
          return h(_sfc_main$a, { variant }, { default: () => status });
        }
      },
      {
        id: "custody",
        header: "Current Custody",
        cell: ({ row }) => {
          console.log(row.original);
          const total = row.original.totalCustody || 0;
          const items = row.original.custodies || [];
          const children = [
            h("p", { class: "text-sm font-medium tabular-nums" }, `${total.toFixed(3)} total`)
          ];
          items.forEach((c) => {
            children.push(
              h("p", { class: "text-xs text-muted-foreground" }, `${c.product.name}: ${c.quantity}`)
            );
          });
          return h("div", { class: "space-y-1" }, children);
        }
      },
      {
        id: "balance",
        header: "Financial Balance",
        cell: ({ row }) => {
          const bal = row.original.balance || 0;
          return h("span", {
            class: `tabular-nums font-medium ${bal > 0 ? "text-destructive" : "text-green-600"}`
          }, `${bal > 0 ? "" : ""}${bal.toFixed(2)}`);
        }
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const d = row.original;
          return h("div", { class: "flex gap-2" }, [
            h(_sfc_main$1, {
              size: "sm",
              variant: "default",
              onClick: () => openLoad(d)
            }, { default: () => [h(Truck, { class: "size-3.5 mr-1" }), " Load Truck"] }),
            h(_sfc_main$1, {
              size: "sm",
              variant: "outline",
              onClick: () => openReturn(d)
            }, { default: () => [h(RotateCcw, { class: "size-3.5 mr-1" }), " Return Stock"] })
          ]);
        }
      }
    ];
    function openLoad(distributor) {
      selectedDistributor.value = distributor;
      loadForm.distributorId = distributor.id;
      loadForm.productId = "";
      loadForm.warehouseId = "";
      loadForm.quantity = 0;
      loadForm.notes = "";
      showLoadDialog.value = true;
    }
    function openReturn(distributor) {
      selectedDistributor.value = distributor;
      returnForm.distributorId = distributor.id;
      returnForm.productId = "";
      returnForm.warehouseId = "";
      returnForm.quantity = 0;
      returnForm.notes = "";
      showReturnDialog.value = true;
    }
    async function handleLoad() {
      if (!loadForm.productId || !loadForm.warehouseId || loadForm.quantity <= 0) {
        toast.error("Please fill all required fields");
        return;
      }
      submitting.value = true;
      try {
        await $fetch("/api/distributors/load", {
          method: "POST",
          body: loadForm
        });
        toast.success("Truck loaded successfully");
        showLoadDialog.value = false;
        await fetchDistributors();
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to load truck");
      } finally {
        submitting.value = false;
      }
    }
    async function handleReturn() {
      if (!returnForm.productId || !returnForm.warehouseId || returnForm.quantity <= 0) {
        toast.error("Please fill all required fields");
        return;
      }
      submitting.value = true;
      try {
        await $fetch("/api/distributors/return", {
          method: "POST",
          body: returnForm
        });
        toast.success("Stock returned successfully");
        showReturnDialog.value = false;
        await fetchDistributors();
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to return stock");
      } finally {
        submitting.value = false;
      }
    }
    async function fetchDistributors() {
      try {
        const data = await $fetch("/api/distributors/users");
        distributors.value = data.distributors;
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to load distributors");
      }
    }
    computed(
      () => products.value.map((p) => ({ ...p, _label: `${p.name} (${p.sku})` }))
    );
    computed(
      () => availableCustodyProducts.value.map((p) => ({ ...p, _label: `${p.name} (${p.sku})` }))
    );
    const availableCustodyProducts = computed(() => {
      if (!selectedDistributor.value) return [];
      return selectedDistributor.value.custodies.map((c) => c.product);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = PageHeader;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_LookupCombobox = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/customers")
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
      _push(ssrRenderComponent(_component_PageHeader, {
        title: "Distributors",
        description: "Distributor custody & operations management"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(_sfc_main$6), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1$1), { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$2), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Active Distributors`);
                      } else {
                        return [
                          createTextVNode("Active Distributors")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Manage truck loads, returns, and track custody balances`);
                      } else {
                        return [
                          createTextVNode("Manage truck loads, returns, and track custody balances")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$2), null, {
                      default: withCtx(() => [
                        createTextVNode("Active Distributors")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$3), null, {
                      default: withCtx(() => [
                        createTextVNode("Manage truck loads, returns, and track custody balances")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AppTable, {
                    data: distributors.value,
                    columns,
                    loading: loading.value,
                    "show-search": true,
                    "show-column-toggle": false,
                    "show-pagination": false,
                    "search-placeholder": "Search distributors..."
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No distributors found",
                          description: "Create a user with the DISTRIBUTOR role to get started",
                          action: "Create Distributor",
                          onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/users")
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No distributors found",
                            description: "Create a user with the DISTRIBUTOR role to get started",
                            action: "Create Distributor",
                            onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/users")
                          }, null, 8, ["onAction"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: distributors.value,
                      columns,
                      loading: loading.value,
                      "show-search": true,
                      "show-column-toggle": false,
                      "show-pagination": false,
                      "search-placeholder": "Search distributors..."
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No distributors found",
                          description: "Create a user with the DISTRIBUTOR role to get started",
                          action: "Create Distributor",
                          onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/users")
                        }, null, 8, ["onAction"])
                      ]),
                      _: 1
                    }, 8, ["data", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1$1), { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$2), null, {
                    default: withCtx(() => [
                      createTextVNode("Active Distributors")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$3), null, {
                    default: withCtx(() => [
                      createTextVNode("Manage truck loads, returns, and track custody balances")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: distributors.value,
                    columns,
                    loading: loading.value,
                    "show-search": true,
                    "show-column-toggle": false,
                    "show-pagination": false,
                    "search-placeholder": "Search distributors..."
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No distributors found",
                        description: "Create a user with the DISTRIBUTOR role to get started",
                        action: "Create Distributor",
                        onAction: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/users")
                      }, null, 8, ["onAction"])
                    ]),
                    _: 1
                  }, 8, ["data", "loading"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        open: showLoadDialog.value,
        "onUpdate:open": ($event) => showLoadDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Load Truck`);
                            } else {
                              return [
                                createTextVNode("Load Truck")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Load inventory onto ${ssrInterpolate(selectedDistributor.value?.name)}&#39;s truck `);
                            } else {
                              return [
                                createTextVNode(" Load inventory onto " + toDisplayString(selectedDistributor.value?.name) + "'s truck ", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$2), null, {
                            default: withCtx(() => [
                              createTextVNode("Load Truck")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(" Load inventory onto " + toDisplayString(selectedDistributor.value?.name) + "'s truck ", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Distributor`);
                      } else {
                        return [
                          createTextVNode("Distributor")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    "model-value": selectedDistributor.value?.name,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "load-product" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Product *`);
                      } else {
                        return [
                          createTextVNode("Product *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: loadForm.productId,
                    "onUpdate:modelValue": ($event) => loadForm.productId = $event,
                    endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                    "label-key": "_label",
                    placeholder: "Select product"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "load-warehouse" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`From Warehouse *`);
                      } else {
                        return [
                          createTextVNode("From Warehouse *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: loadForm.warehouseId,
                    "onUpdate:modelValue": ($event) => loadForm.warehouseId = $event,
                    endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                    placeholder: "Select warehouse"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "load-qty" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Quantity *`);
                      } else {
                        return [
                          createTextVNode("Quantity *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "load-qty",
                    modelValue: loadForm.quantity,
                    "onUpdate:modelValue": ($event) => loadForm.quantity = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    step: "0.001",
                    min: "0",
                    placeholder: "0.000"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "load-notes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Notes`);
                      } else {
                        return [
                          createTextVNode("Notes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "load-notes",
                    modelValue: loadForm.notes,
                    "onUpdate:modelValue": ($event) => loadForm.notes = $event,
                    placeholder: "Optional notes"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showLoadDialog.value = false
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
                          disabled: submitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (submitting.value) {
                                _push5(ssrRenderComponent(unref(Loader2), { class: "size-4 mr-1 animate-spin" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(Truck), { class: "size-4 mr-1" }, null, _parent5, _scopeId4));
                              }
                              _push5(` Load Truck `);
                            } else {
                              return [
                                submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "size-4 mr-1 animate-spin"
                                })) : (openBlock(), createBlock(unref(Truck), {
                                  key: 1,
                                  class: "size-4 mr-1"
                                })),
                                createTextVNode(" Load Truck ")
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
                            onClick: ($event) => showLoadDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: submitting.value
                          }, {
                            default: withCtx(() => [
                              submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "size-4 mr-1 animate-spin"
                              })) : (openBlock(), createBlock(unref(Truck), {
                                key: 1,
                                class: "size-4 mr-1"
                              })),
                              createTextVNode(" Load Truck ")
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
                    createVNode(unref(_sfc_main$3$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$2), null, {
                          default: withCtx(() => [
                            createTextVNode("Load Truck")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(" Load inventory onto " + toDisplayString(selectedDistributor.value?.name) + "'s truck ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(handleLoad, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Distributor")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          "model-value": selectedDistributor.value?.name,
                          disabled: ""
                        }, null, 8, ["model-value"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "load-product" }, {
                          default: withCtx(() => [
                            createTextVNode("Product *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: loadForm.productId,
                          "onUpdate:modelValue": ($event) => loadForm.productId = $event,
                          endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                          "label-key": "_label",
                          placeholder: "Select product"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "load-warehouse" }, {
                          default: withCtx(() => [
                            createTextVNode("From Warehouse *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: loadForm.warehouseId,
                          "onUpdate:modelValue": ($event) => loadForm.warehouseId = $event,
                          endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                          placeholder: "Select warehouse"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "load-qty" }, {
                          default: withCtx(() => [
                            createTextVNode("Quantity *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          id: "load-qty",
                          modelValue: loadForm.quantity,
                          "onUpdate:modelValue": ($event) => loadForm.quantity = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          step: "0.001",
                          min: "0",
                          placeholder: "0.000"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "load-notes" }, {
                          default: withCtx(() => [
                            createTextVNode("Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          id: "load-notes",
                          modelValue: loadForm.notes,
                          "onUpdate:modelValue": ($event) => loadForm.notes = $event,
                          placeholder: "Optional notes"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$4$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showLoadDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: submitting.value
                          }, {
                            default: withCtx(() => [
                              submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "size-4 mr-1 animate-spin"
                              })) : (openBlock(), createBlock(unref(Truck), {
                                key: 1,
                                class: "size-4 mr-1"
                              })),
                              createTextVNode(" Load Truck ")
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
              createVNode(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$1), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$2), null, {
                        default: withCtx(() => [
                          createTextVNode("Load Truck")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode(" Load inventory onto " + toDisplayString(selectedDistributor.value?.name) + "'s truck ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(handleLoad, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createTextVNode("Distributor")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        "model-value": selectedDistributor.value?.name,
                        disabled: ""
                      }, null, 8, ["model-value"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "load-product" }, {
                        default: withCtx(() => [
                          createTextVNode("Product *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: loadForm.productId,
                        "onUpdate:modelValue": ($event) => loadForm.productId = $event,
                        endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                        "label-key": "_label",
                        placeholder: "Select product"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "load-warehouse" }, {
                        default: withCtx(() => [
                          createTextVNode("From Warehouse *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: loadForm.warehouseId,
                        "onUpdate:modelValue": ($event) => loadForm.warehouseId = $event,
                        endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                        placeholder: "Select warehouse"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "load-qty" }, {
                        default: withCtx(() => [
                          createTextVNode("Quantity *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "load-qty",
                        modelValue: loadForm.quantity,
                        "onUpdate:modelValue": ($event) => loadForm.quantity = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        step: "0.001",
                        min: "0",
                        placeholder: "0.000"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "load-notes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "load-notes",
                        modelValue: loadForm.notes,
                        "onUpdate:modelValue": ($event) => loadForm.notes = $event,
                        placeholder: "Optional notes"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$4$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showLoadDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: submitting.value
                        }, {
                          default: withCtx(() => [
                            submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "size-4 mr-1 animate-spin"
                            })) : (openBlock(), createBlock(unref(Truck), {
                              key: 1,
                              class: "size-4 mr-1"
                            })),
                            createTextVNode(" Load Truck ")
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
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        open: showReturnDialog.value,
        "onUpdate:open": ($event) => showReturnDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1$2), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Return Stock`);
                            } else {
                              return [
                                createTextVNode("Return Stock")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$5), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Return unsold stock from ${ssrInterpolate(selectedDistributor.value?.name)}&#39;s truck to warehouse `);
                            } else {
                              return [
                                createTextVNode(" Return unsold stock from " + toDisplayString(selectedDistributor.value?.name) + "'s truck to warehouse ", 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$1$2), null, {
                            default: withCtx(() => [
                              createTextVNode("Return Stock")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$5), null, {
                            default: withCtx(() => [
                              createTextVNode(" Return unsold stock from " + toDisplayString(selectedDistributor.value?.name) + "'s truck to warehouse ", 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Distributor`);
                      } else {
                        return [
                          createTextVNode("Distributor")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    "model-value": selectedDistributor.value?.name,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "return-product" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Product *`);
                      } else {
                        return [
                          createTextVNode("Product *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: returnForm.productId,
                    "onUpdate:modelValue": ($event) => returnForm.productId = $event,
                    endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                    "label-key": "_label",
                    placeholder: "Select product on truck",
                    "empty-message": "No products on truck"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "return-warehouse" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`To Warehouse *`);
                      } else {
                        return [
                          createTextVNode("To Warehouse *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: returnForm.warehouseId,
                    "onUpdate:modelValue": ($event) => returnForm.warehouseId = $event,
                    endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                    placeholder: "Select warehouse"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "return-qty" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Quantity *`);
                      } else {
                        return [
                          createTextVNode("Quantity *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "return-qty",
                    modelValue: returnForm.quantity,
                    "onUpdate:modelValue": ($event) => returnForm.quantity = $event,
                    modelModifiers: { number: true },
                    type: "number",
                    step: "0.001",
                    min: "0",
                    placeholder: "0.000"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), { for: "return-notes" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Notes`);
                      } else {
                        return [
                          createTextVNode("Notes")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    id: "return-notes",
                    modelValue: returnForm.notes,
                    "onUpdate:modelValue": ($event) => returnForm.notes = $event,
                    placeholder: "Optional notes"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4$1), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showReturnDialog.value = false
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
                          disabled: submitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (submitting.value) {
                                _push5(ssrRenderComponent(unref(Loader2), { class: "size-4 mr-1 animate-spin" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(unref(RotateCcw), { class: "size-4 mr-1" }, null, _parent5, _scopeId4));
                              }
                              _push5(` Return Stock `);
                            } else {
                              return [
                                submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                  key: 0,
                                  class: "size-4 mr-1 animate-spin"
                                })) : (openBlock(), createBlock(unref(RotateCcw), {
                                  key: 1,
                                  class: "size-4 mr-1"
                                })),
                                createTextVNode(" Return Stock ")
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
                            onClick: ($event) => showReturnDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: submitting.value
                          }, {
                            default: withCtx(() => [
                              submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "size-4 mr-1 animate-spin"
                              })) : (openBlock(), createBlock(unref(RotateCcw), {
                                key: 1,
                                class: "size-4 mr-1"
                              })),
                              createTextVNode(" Return Stock ")
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
                    createVNode(unref(_sfc_main$3$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1$2), null, {
                          default: withCtx(() => [
                            createTextVNode("Return Stock")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$5), null, {
                          default: withCtx(() => [
                            createTextVNode(" Return unsold stock from " + toDisplayString(selectedDistributor.value?.name) + "'s truck to warehouse ", 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(handleReturn, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), null, {
                          default: withCtx(() => [
                            createTextVNode("Distributor")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          "model-value": selectedDistributor.value?.name,
                          disabled: ""
                        }, null, 8, ["model-value"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "return-product" }, {
                          default: withCtx(() => [
                            createTextVNode("Product *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: returnForm.productId,
                          "onUpdate:modelValue": ($event) => returnForm.productId = $event,
                          endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                          "label-key": "_label",
                          placeholder: "Select product on truck",
                          "empty-message": "No products on truck"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "return-warehouse" }, {
                          default: withCtx(() => [
                            createTextVNode("To Warehouse *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: returnForm.warehouseId,
                          "onUpdate:modelValue": ($event) => returnForm.warehouseId = $event,
                          endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                          placeholder: "Select warehouse"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "return-qty" }, {
                          default: withCtx(() => [
                            createTextVNode("Quantity *")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          id: "return-qty",
                          modelValue: returnForm.quantity,
                          "onUpdate:modelValue": ($event) => returnForm.quantity = $event,
                          modelModifiers: { number: true },
                          type: "number",
                          step: "0.001",
                          min: "0",
                          placeholder: "0.000"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$7), { for: "return-notes" }, {
                          default: withCtx(() => [
                            createTextVNode("Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$8), {
                          id: "return-notes",
                          modelValue: returnForm.notes,
                          "onUpdate:modelValue": ($event) => returnForm.notes = $event,
                          placeholder: "Optional notes"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(unref(_sfc_main$4$1), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$1), {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showReturnDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(unref(_sfc_main$1), {
                            type: "submit",
                            disabled: submitting.value
                          }, {
                            default: withCtx(() => [
                              submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                                key: 0,
                                class: "size-4 mr-1 animate-spin"
                              })) : (openBlock(), createBlock(unref(RotateCcw), {
                                key: 1,
                                class: "size-4 mr-1"
                              })),
                              createTextVNode(" Return Stock ")
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
              createVNode(unref(_sfc_main$6$1), { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3$1), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$1$2), null, {
                        default: withCtx(() => [
                          createTextVNode("Return Stock")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$5), null, {
                        default: withCtx(() => [
                          createTextVNode(" Return unsold stock from " + toDisplayString(selectedDistributor.value?.name) + "'s truck to warehouse ", 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(handleReturn, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createTextVNode("Distributor")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        "model-value": selectedDistributor.value?.name,
                        disabled: ""
                      }, null, 8, ["model-value"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "return-product" }, {
                        default: withCtx(() => [
                          createTextVNode("Product *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: returnForm.productId,
                        "onUpdate:modelValue": ($event) => returnForm.productId = $event,
                        endpoint: "fetchProductsLookupApi" in _ctx ? _ctx.fetchProductsLookupApi : unref(fetchProductsLookupApi),
                        "label-key": "_label",
                        placeholder: "Select product on truck",
                        "empty-message": "No products on truck"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "return-warehouse" }, {
                        default: withCtx(() => [
                          createTextVNode("To Warehouse *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: returnForm.warehouseId,
                        "onUpdate:modelValue": ($event) => returnForm.warehouseId = $event,
                        endpoint: "fetchWarehousesLookupApi" in _ctx ? _ctx.fetchWarehousesLookupApi : unref(fetchWarehousesLookupApi),
                        placeholder: "Select warehouse"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "return-qty" }, {
                        default: withCtx(() => [
                          createTextVNode("Quantity *")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "return-qty",
                        modelValue: returnForm.quantity,
                        "onUpdate:modelValue": ($event) => returnForm.quantity = $event,
                        modelModifiers: { number: true },
                        type: "number",
                        step: "0.001",
                        min: "0",
                        placeholder: "0.000"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(unref(_sfc_main$7), { for: "return-notes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$8), {
                        id: "return-notes",
                        modelValue: returnForm.notes,
                        "onUpdate:modelValue": ($event) => returnForm.notes = $event,
                        placeholder: "Optional notes"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(unref(_sfc_main$4$1), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$1), {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showReturnDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(_sfc_main$1), {
                          type: "submit",
                          disabled: submitting.value
                        }, {
                          default: withCtx(() => [
                            submitting.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "size-4 mr-1 animate-spin"
                            })) : (openBlock(), createBlock(unref(RotateCcw), {
                              key: 1,
                              class: "size-4 mr-1"
                            })),
                            createTextVNode(" Return Stock ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/customers/distributors.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=distributors-D0A2OoUD.mjs.map
