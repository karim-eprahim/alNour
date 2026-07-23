import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, a as _sfc_main$4 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as _sfc_main$8, a as _sfc_main$2, b as _sfc_main$4$1, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-Cc67ZnYT.mjs';
import { _ as _sfc_main$3 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$1, c as _sfc_main$1$2, d as _sfc_main$5$1, e as _sfc_main$4$2 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$a } from './Label-Di1i-yIq.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$b } from './Input-pgd-3rGf.mjs';
import { defineComponent, ref, reactive, resolveDirective, mergeProps, withCtx, createTextVNode, withDirectives, openBlock, createBlock, unref, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Check, X } from '@lucide/vue';
import { b as completeTransferApi, d as createTransferApi } from './api-CNHGsjgp.mjs';
import { f as fetchWarehousesLookupApi } from './api-CBXtItch.mjs';
import { f as fetchProductsLookupApi } from './api-Dq8IcxCC.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
import { u as useWarehousesStore } from './store-CfM_MLuy.mjs';
import { u as useProductsStore } from './store-Bedv-yYB.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './server.mjs';
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
import '@vueuse/core';
import 'clsx';
import 'tailwind-merge';
import './Textarea-B_fNd96X.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transfers",
  __ssrInlineRender: true,
  setup(__props) {
    useWarehousesStore();
    useProductsStore();
    const showCreateDialog = ref(false);
    const loading = ref(false);
    const transfers = ref([]);
    const createForm = reactive({
      fromWarehouseId: "",
      toWarehouseId: "",
      items: []
    });
    function addItem() {
      createForm.items.push({ productId: "", quantity: null });
    }
    function removeItem(index) {
      createForm.items.splice(index, 1);
    }
    async function fetchTransfers() {
      loading.value = true;
      try {
        const data = await $fetch("/api/stock/transfers");
        transfers.value = data.transfers;
      } catch {
      } finally {
        loading.value = false;
      }
    }
    async function handleCreate() {
      if (!createForm.fromWarehouseId || !createForm.toWarehouseId || createForm.items.length === 0) return;
      try {
        await createTransferApi({
          fromWarehouseId: createForm.fromWarehouseId,
          toWarehouseId: createForm.toWarehouseId,
          items: createForm.items.map((i) => ({ productId: i.productId, quantity: i.quantity || 0 }))
        });
        showCreateDialog.value = false;
        createForm.fromWarehouseId = "";
        createForm.toWarehouseId = "";
        createForm.items = [];
        toast.success("Transfer created");
        fetchTransfers();
      } catch {
      }
    }
    async function handleComplete(id) {
      try {
        await completeTransferApi(id);
        toast.success("Transfer completed");
        fetchTransfers();
      } catch {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$2;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$1;
      const _component_UiTableBody = _sfc_main$7;
      const _component_UiTableCell = _sfc_main$5;
      const _component_UiBadge = _sfc_main$3;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$2;
      const _component_UiDialogDescription = _sfc_main$5$1;
      const _component_UiLabel = _sfc_main$a;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiInput = _sfc_main$b;
      const _component_UiDialogFooter = _sfc_main$4$2;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Stock Transfers",
        description: "Move stock between warehouses"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              onClick: ($event) => showCreateDialog.value = true
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "INVENTORY", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`New Transfer`);
                } else {
                  return [
                    createTextVNode("New Transfer")
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
                  createTextVNode("New Transfer")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "INVENTORY", action: "CREATE" }]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(loading) && unref(transfers).length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (unref(transfers).length === 0) {
                    _push3(`<div class="p-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No transfers",
                      description: "Create a transfer to move stock between warehouses",
                      action: "New Transfer",
                      onAction: ($event) => showCreateDialog.value = true
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(ssrRenderComponent(_component_UiTable, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiTableHeader, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiTableRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Transfer #`);
                                          } else {
                                            return [
                                              createTextVNode("Transfer #")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`From`);
                                          } else {
                                            return [
                                              createTextVNode("From")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`To`);
                                          } else {
                                            return [
                                              createTextVNode("To")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Items`);
                                          } else {
                                            return [
                                              createTextVNode("Items")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Status`);
                                          } else {
                                            return [
                                              createTextVNode("Status")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Date`);
                                          } else {
                                            return [
                                              createTextVNode("Date")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "w-20 text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Action`);
                                          } else {
                                            return [
                                              createTextVNode("Action")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Transfer #")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("From")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("To")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Items")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Date")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Action")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Transfer #")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("From")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("To")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Items")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Date")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Action")
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
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiTableBody, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(transfers), (t) => {
                                  _push5(ssrRenderComponent(_component_UiTableRow, {
                                    key: t.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-sm font-mono font-medium" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(t.transferNumber)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(t.transferNumber), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(t.fromWarehouse?.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(t.fromWarehouse?.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(t.toWarehouse?.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(t.toWarehouse?.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(t.items?.length || 0)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(t.items?.length || 0), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_UiBadge, {
                                                variant: t.status === "COMPLETED" ? "default" : t.status === "CANCELLED" ? "destructive" : "secondary",
                                                class: "text-xs"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(t.status)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(t.status), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiBadge, {
                                                  variant: t.status === "COMPLETED" ? "default" : t.status === "CANCELLED" ? "destructive" : "secondary",
                                                  class: "text-xs"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(t.status), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(new Date(t.createdAt).toLocaleDateString())}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              if (t.status === "PENDING") {
                                                _push7(ssrRenderComponent(_component_UiButton, mergeProps({
                                                  variant: "ghost",
                                                  size: "icon-xs",
                                                  class: "text-green-600",
                                                  onClick: ($event) => handleComplete(t.id)
                                                }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "INVENTORY", action: "UPDATE" })), {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(unref(Check), { class: "size-3.5" }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(unref(Check), { class: "size-3.5" })
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                            } else {
                                              return [
                                                t.status === "PENDING" ? withDirectives((openBlock(), createBlock(_component_UiButton, {
                                                  key: 0,
                                                  variant: "ghost",
                                                  size: "icon-xs",
                                                  class: "text-green-600",
                                                  onClick: ($event) => handleComplete(t.id)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(Check), { class: "size-3.5" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])), [
                                                  [_directive_can, { module: "INVENTORY", action: "UPDATE" }]
                                                ]) : createCommentVNode("", true)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, { class: "text-sm font-mono font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(t.transferNumber), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(t.fromWarehouse?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(t.toWarehouse?.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(t.items?.length || 0), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiBadge, {
                                                variant: t.status === "COMPLETED" ? "default" : t.status === "CANCELLED" ? "destructive" : "secondary",
                                                class: "text-xs"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(t.status), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              t.status === "PENDING" ? withDirectives((openBlock(), createBlock(_component_UiButton, {
                                                key: 0,
                                                variant: "ghost",
                                                size: "icon-xs",
                                                class: "text-green-600",
                                                onClick: ($event) => handleComplete(t.id)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(Check), { class: "size-3.5" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])), [
                                                [_directive_can, { module: "INVENTORY", action: "UPDATE" }]
                                              ]) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(transfers), (t) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: t.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, { class: "text-sm font-mono font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(t.transferNumber), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(t.fromWarehouse?.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(t.toWarehouse?.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(t.items?.length || 0), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiBadge, {
                                              variant: t.status === "COMPLETED" ? "default" : t.status === "CANCELLED" ? "destructive" : "secondary",
                                              class: "text-xs"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(t.status), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            t.status === "PENDING" ? withDirectives((openBlock(), createBlock(_component_UiButton, {
                                              key: 0,
                                              variant: "ghost",
                                              size: "icon-xs",
                                              class: "text-green-600",
                                              onClick: ($event) => handleComplete(t.id)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(Check), { class: "size-3.5" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])), [
                                              [_directive_can, { module: "INVENTORY", action: "UPDATE" }]
                                            ]) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiTableHeader, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableRow, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Transfer #")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("From")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("To")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Items")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Date")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Action")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiTableBody, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(transfers), (t) => {
                                  return openBlock(), createBlock(_component_UiTableRow, {
                                    key: t.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, { class: "text-sm font-mono font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(t.transferNumber), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(t.fromWarehouse?.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(t.toWarehouse?.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(t.items?.length || 0), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiBadge, {
                                            variant: t.status === "COMPLETED" ? "default" : t.status === "CANCELLED" ? "destructive" : "secondary",
                                            class: "text-xs"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(t.status), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          t.status === "PENDING" ? withDirectives((openBlock(), createBlock(_component_UiButton, {
                                            key: 0,
                                            variant: "ghost",
                                            size: "icon-xs",
                                            class: "text-green-600",
                                            onClick: ($event) => handleComplete(t.id)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(Check), { class: "size-3.5" })
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])), [
                                            [_directive_can, { module: "INVENTORY", action: "UPDATE" }]
                                          ]) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    unref(loading) && unref(transfers).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-6"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : unref(transfers).length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-6"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No transfers",
                        description: "Create a transfer to move stock between warehouses",
                        action: "New Transfer",
                        onAction: ($event) => showCreateDialog.value = true
                      }, null, 8, ["onAction"])
                    ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiTableRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Transfer #")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("From")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("To")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Items")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Status")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Date")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Action")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTableBody, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(transfers), (t) => {
                              return openBlock(), createBlock(_component_UiTableRow, {
                                key: t.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, { class: "text-sm font-mono font-medium" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t.transferNumber), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t.fromWarehouse?.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t.toWarehouse?.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t.items?.length || 0), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiBadge, {
                                        variant: t.status === "COMPLETED" ? "default" : t.status === "CANCELLED" ? "destructive" : "secondary",
                                        class: "text-xs"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(t.status), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      t.status === "PENDING" ? withDirectives((openBlock(), createBlock(_component_UiButton, {
                                        key: 0,
                                        variant: "ghost",
                                        size: "icon-xs",
                                        class: "text-green-600",
                                        onClick: ($event) => handleComplete(t.id)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Check), { class: "size-3.5" })
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])), [
                                        [_directive_can, { module: "INVENTORY", action: "UPDATE" }]
                                      ]) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx(() => [
                  unref(loading) && unref(transfers).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : unref(transfers).length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-6"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No transfers",
                      description: "Create a transfer to move stock between warehouses",
                      action: "New Transfer",
                      onAction: ($event) => showCreateDialog.value = true
                    }, null, 8, ["onAction"])
                  ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                    default: withCtx(() => [
                      createVNode(_component_UiTableHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiTableRow, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Transfer #")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("From")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("To")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Items")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Status")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, null, {
                                default: withCtx(() => [
                                  createTextVNode("Date")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiTableHead, { class: "w-20 text-right" }, {
                                default: withCtx(() => [
                                  createTextVNode("Action")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTableBody, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(transfers), (t) => {
                            return openBlock(), createBlock(_component_UiTableRow, {
                              key: t.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableCell, { class: "text-sm font-mono font-medium" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t.transferNumber), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t.fromWarehouse?.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t.toWarehouse?.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-sm" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t.items?.length || 0), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiBadge, {
                                      variant: t.status === "COMPLETED" ? "default" : t.status === "CANCELLED" ? "destructive" : "secondary",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(t.status), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(new Date(t.createdAt).toLocaleDateString()), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiTableCell, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    t.status === "PENDING" ? withDirectives((openBlock(), createBlock(_component_UiButton, {
                                      key: 0,
                                      variant: "ghost",
                                      size: "icon-xs",
                                      class: "text-green-600",
                                      onClick: ($event) => handleComplete(t.id)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Check), { class: "size-3.5" })
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])), [
                                      [_directive_can, { module: "INVENTORY", action: "UPDATE" }]
                                    ]) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }))
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
                              _push5(`Create Stock Transfer`);
                            } else {
                              return [
                                createTextVNode("Create Stock Transfer")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Move inventory between warehouses`);
                            } else {
                              return [
                                createTextVNode("Move inventory between warehouses")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Create Stock Transfer")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Move inventory between warehouses")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "from-wh" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`From Warehouse`);
                      } else {
                        return [
                          createTextVNode("From Warehouse")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(createForm).fromWarehouseId,
                    "onUpdate:modelValue": ($event) => unref(createForm).fromWarehouseId = $event,
                    endpoint: unref(fetchWarehousesLookupApi),
                    placeholder: "Source..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "to-wh" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`To Warehouse`);
                      } else {
                        return [
                          createTextVNode("To Warehouse")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(createForm).toWarehouseId,
                    "onUpdate:modelValue": ($event) => unref(createForm).toWarehouseId = $event,
                    endpoint: unref(fetchWarehousesLookupApi),
                    placeholder: "Destination..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Items`);
                      } else {
                        return [
                          createTextVNode("Items")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiButton, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: addItem
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Add Item`);
                      } else {
                        return [
                          createTextVNode("Add Item")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><!--[-->`);
                  ssrRenderList(unref(createForm).items, (item, i) => {
                    _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LookupCombobox, {
                      modelValue: item.productId,
                      "onUpdate:modelValue": ($event) => item.productId = $event,
                      endpoint: unref(fetchProductsLookupApi),
                      "label-key": "_label",
                      placeholder: "Product...",
                      class: "flex-1"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiInput, {
                      modelValue: item.quantity,
                      "onUpdate:modelValue": ($event) => item.quantity = $event,
                      type: "number",
                      step: "0.001",
                      placeholder: "Qty",
                      class: "w-24"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiButton, {
                      type: "button",
                      variant: "ghost",
                      size: "icon-xs",
                      class: "text-destructive shrink-0",
                      onClick: ($event) => removeItem(i)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(X), { class: "size-3.5" }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(X), { class: "size-3.5" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div>`);
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
                          disabled: unref(loading) || unref(createForm).items.length === 0
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Create Transfer`);
                            } else {
                              return [
                                createTextVNode("Create Transfer")
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
                            disabled: unref(loading) || unref(createForm).items.length === 0
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Create Transfer")
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
                            createTextVNode("Create Stock Transfer")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Move inventory between warehouses")
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
                          createVNode(_component_UiLabel, { for: "from-wh" }, {
                            default: withCtx(() => [
                              createTextVNode("From Warehouse")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LookupCombobox, {
                            modelValue: unref(createForm).fromWarehouseId,
                            "onUpdate:modelValue": ($event) => unref(createForm).fromWarehouseId = $event,
                            endpoint: unref(fetchWarehousesLookupApi),
                            placeholder: "Source..."
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "to-wh" }, {
                            default: withCtx(() => [
                              createTextVNode("To Warehouse")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LookupCombobox, {
                            modelValue: unref(createForm).toWarehouseId,
                            "onUpdate:modelValue": ($event) => unref(createForm).toWarehouseId = $event,
                            endpoint: unref(fetchWarehousesLookupApi),
                            placeholder: "Destination..."
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Items")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            size: "sm",
                            onClick: addItem
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Add Item")
                            ]),
                            _: 1
                          })
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(createForm).items, (item, i) => {
                          return openBlock(), createBlock("div", {
                            key: i,
                            class: "flex items-center gap-2"
                          }, [
                            createVNode(_component_LookupCombobox, {
                              modelValue: item.productId,
                              "onUpdate:modelValue": ($event) => item.productId = $event,
                              endpoint: unref(fetchProductsLookupApi),
                              "label-key": "_label",
                              placeholder: "Product...",
                              class: "flex-1"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                            createVNode(_component_UiInput, {
                              modelValue: item.quantity,
                              "onUpdate:modelValue": ($event) => item.quantity = $event,
                              type: "number",
                              step: "0.001",
                              placeholder: "Qty",
                              class: "w-24"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UiButton, {
                              type: "button",
                              variant: "ghost",
                              size: "icon-xs",
                              class: "text-destructive shrink-0",
                              onClick: ($event) => removeItem(i)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(X), { class: "size-3.5" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]);
                        }), 128))
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
                            disabled: unref(loading) || unref(createForm).items.length === 0
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Create Transfer")
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
                          createTextVNode("Create Stock Transfer")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Move inventory between warehouses")
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
                        createVNode(_component_UiLabel, { for: "from-wh" }, {
                          default: withCtx(() => [
                            createTextVNode("From Warehouse")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(createForm).fromWarehouseId,
                          "onUpdate:modelValue": ($event) => unref(createForm).fromWarehouseId = $event,
                          endpoint: unref(fetchWarehousesLookupApi),
                          placeholder: "Source..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "to-wh" }, {
                          default: withCtx(() => [
                            createTextVNode("To Warehouse")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(createForm).toWarehouseId,
                          "onUpdate:modelValue": ($event) => unref(createForm).toWarehouseId = $event,
                          endpoint: unref(fetchWarehousesLookupApi),
                          placeholder: "Destination..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Items")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          onClick: addItem
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Add Item")
                          ]),
                          _: 1
                        })
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(createForm).items, (item, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "flex items-center gap-2"
                        }, [
                          createVNode(_component_LookupCombobox, {
                            modelValue: item.productId,
                            "onUpdate:modelValue": ($event) => item.productId = $event,
                            endpoint: unref(fetchProductsLookupApi),
                            "label-key": "_label",
                            placeholder: "Product...",
                            class: "flex-1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                          createVNode(_component_UiInput, {
                            modelValue: item.quantity,
                            "onUpdate:modelValue": ($event) => item.quantity = $event,
                            type: "number",
                            step: "0.001",
                            placeholder: "Qty",
                            class: "w-24"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "ghost",
                            size: "icon-xs",
                            class: "text-destructive shrink-0",
                            onClick: ($event) => removeItem(i)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(X), { class: "size-3.5" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]);
                      }), 128))
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
                          disabled: unref(loading) || unref(createForm).items.length === 0
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Create Transfer")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stock/transfers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transfers-D2obrs4f.mjs.map
