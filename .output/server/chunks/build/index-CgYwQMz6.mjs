import { _ as _sfc_main$a, a as _sfc_main$1, b as _sfc_main$2, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as _sfc_main$6, a as _sfc_main$4 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_10 } from './AppTable-CgemzeWp.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, isRef, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { g as getDistributorOrderColumns } from './orderColumns-CRchmVhY.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useDistributorStore } from './store-DAWlzSoP.mjs';
import { n as navigateTo } from './server.mjs';
import '@vueuse/core';
import 'reka-ui';
import '@lucide/vue';
import './Input-pgd-3rGf.mjs';
import './DropdownMenuTrigger-MlqyivDB.mjs';
import './index-B-gxPDkl.mjs';
import 'class-variance-authority';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
import '@tanstack/vue-table';
import './index-CaQj38bB.mjs';
import './nuxt-link-DZSn3naz.mjs';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const limit = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useDistributorStore();
    const statusFilter = ref("__all__");
    const page = ref(1);
    const orderActions = {
      onView: (id) => navigateTo(`/distributor/orders/${id}`)
    };
    const columns = getDistributorOrderColumns(orderActions);
    async function load() {
      await store.fetchOrders({
        status: statusFilter.value !== "__all__" ? statusFilter.value : void 0,
        page: page.value,
        limit
      });
    }
    watch(statusFilter, () => {
      page.value = 1;
      load();
    });
    watch(page, load);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1;
      const _component_UiSelectValue = _sfc_main$2;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Orders",
        description: "Orders assigned to you"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiSelect, {
              modelValue: unref(statusFilter),
              "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-40" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectValue, { placeholder: "All Status" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSelectValue, { placeholder: "All Status" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelectContent, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectItem, { value: "__all__" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`All Status`);
                            } else {
                              return [
                                createTextVNode("All Status")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectItem, { value: "ASSIGNED" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Assigned`);
                            } else {
                              return [
                                createTextVNode("Assigned")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectItem, { value: "ACCEPTED" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Accepted`);
                            } else {
                              return [
                                createTextVNode("Accepted")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectItem, { value: "OUT_FOR_DELIVERY" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Out for Delivery`);
                            } else {
                              return [
                                createTextVNode("Out for Delivery")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectItem, { value: "COMPLETED" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Completed`);
                            } else {
                              return [
                                createTextVNode("Completed")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectItem, { value: "CANCELLED" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cancelled`);
                            } else {
                              return [
                                createTextVNode("Cancelled")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSelectItem, { value: "__all__" }, {
                            default: withCtx(() => [
                              createTextVNode("All Status")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectItem, { value: "ASSIGNED" }, {
                            default: withCtx(() => [
                              createTextVNode("Assigned")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectItem, { value: "ACCEPTED" }, {
                            default: withCtx(() => [
                              createTextVNode("Accepted")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectItem, { value: "OUT_FOR_DELIVERY" }, {
                            default: withCtx(() => [
                              createTextVNode("Out for Delivery")
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
                  }, _parent3, _scopeId2));
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
                        createVNode(_component_UiSelectItem, { value: "ASSIGNED" }, {
                          default: withCtx(() => [
                            createTextVNode("Assigned")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelectItem, { value: "ACCEPTED" }, {
                          default: withCtx(() => [
                            createTextVNode("Accepted")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelectItem, { value: "OUT_FOR_DELIVERY" }, {
                          default: withCtx(() => [
                            createTextVNode("Out for Delivery")
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
            }, _parent2, _scopeId));
          } else {
            return [
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
                      createVNode(_component_UiSelectItem, { value: "ASSIGNED" }, {
                        default: withCtx(() => [
                          createTextVNode("Assigned")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelectItem, { value: "ACCEPTED" }, {
                        default: withCtx(() => [
                          createTextVNode("Accepted")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelectItem, { value: "OUT_FOR_DELIVERY" }, {
                        default: withCtx(() => [
                          createTextVNode("Out for Delivery")
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
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AppTable, {
                    data: unref(store).orders,
                    columns: unref(columns),
                    loading: unref(store).loading,
                    "server-total": unref(store).ordersTotal,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No orders found",
                          description: "Orders assigned to you will appear here"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No orders found",
                            description: "Orders assigned to you will appear here"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(store).orders,
                      columns: unref(columns),
                      loading: unref(store).loading,
                      "server-total": unref(store).ordersTotal,
                      "show-search": false,
                      "show-column-toggle": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No orders found",
                          description: "Orders assigned to you will appear here"
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
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(store).orders,
                    columns: unref(columns),
                    loading: unref(store).loading,
                    "server-total": unref(store).ordersTotal,
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No orders found",
                        description: "Orders assigned to you will appear here"
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/distributor/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CgYwQMz6.mjs.map
