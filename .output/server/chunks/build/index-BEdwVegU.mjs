import { _ as __nuxt_component_0 } from './nuxt-link-CZynLBtj.mjs';
import { _ as _sfc_main$5 } from './index-BJ9JiLtz.mjs';
import { _ as _sfc_main$1 } from './index-CUpQupPt.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, a as _sfc_main$4 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-CGCLb5WU.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$2, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CvBB3u-2.mjs';
import { _ as _sfc_main$3 } from './Input-BT7sGQjY.mjs';
import { _ as __nuxt_component_10 } from './AppTable-29woUsdf.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { HandCoins, Eye } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { e as fetchDistributorsLookupApi } from './api-BZnrPRgb.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { n as navigateTo } from './server.mjs';
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
import 'class-variance-authority';
import '@vueuse/core';
import 'reka-ui';
import './Textarea-Cs62HpDa.mjs';
import './DropdownMenuTrigger-CfTxy9kg.mjs';
import './Checkbox-BgWIODM0.mjs';
import './TableHeader-BnIov8Zr.mjs';
import './LoadingState-CjZdJj9x.mjs';
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

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const settlements = ref([]);
    const total = ref(0);
    const loading = ref(false);
    const statusFilter = ref("__all__");
    const distributorFilter = ref("__all__");
    const paymentMethodFilter = ref("__all__");
    const dateFrom = ref("");
    const dateTo = ref("");
    const page = ref(1);
    function statusVariant(s) {
      const map = { SUBMITTED: "warning", CONFIRMED: "success", REJECTED: "destructive" };
      return map[s] || "secondary";
    }
    const columns = [
      {
        accessorKey: "settlementNumber",
        header: "Settlement #",
        cell: ({ row }) => h(__nuxt_component_0, { to: `/sales/settlements/${row.original.id}`, class: "font-medium hover:underline" }, row.original.settlementNumber)
      },
      {
        accessorKey: "distributor.name",
        header: "Distributor",
        cell: ({ row }) => h("span", { class: "text-sm" }, row.original.distributor?.name || "—")
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.amount).toFixed(2))
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment Method",
        cell: ({ row }) => h("span", { class: "text-sm" }, row.original.paymentMethod.replace("_", " "))
      },
      {
        accessorKey: "submittedAt",
        header: "Submitted At",
        cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.submittedAt).toLocaleDateString())
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => h(_sfc_main$5, { variant: statusVariant(row.original.status), class: "text-xs" }, row.original.status)
      },
      {
        accessorKey: "confirmedAt",
        header: "Confirmed At",
        cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, row.original.confirmedAt ? new Date(row.original.confirmedAt).toLocaleDateString() : "—")
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => h(_sfc_main$1, { variant: "ghost", size: "icon-xs", onClick: () => navigateTo(`/sales/settlements/${row.original.id}`) }, () => h(Eye, { class: "size-3.5" }))
      }
    ];
    async function load() {
      loading.value = true;
      try {
        const data = await $fetch("/api/sales/settlements", {
          params: {
            status: statusFilter.value !== "__all__" ? statusFilter.value : void 0,
            distributorId: distributorFilter.value !== "__all__" ? distributorFilter.value : void 0,
            paymentMethod: paymentMethodFilter.value !== "__all__" ? paymentMethodFilter.value : void 0,
            dateFrom: dateFrom.value || void 0,
            dateTo: dateTo.value || void 0,
            page: page.value,
            limit
          }
        });
        settlements.value = data.settlements;
        total.value = data.total;
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to load settlements");
      } finally {
        loading.value = false;
      }
    }
    watch([statusFilter, distributorFilter, paymentMethodFilter, dateFrom, dateTo], () => {
      page.value = 1;
      load();
    });
    watch(page, load);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$2;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_UiInput = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Distributor Settlements",
        description: "Review and confirm cash handed over by distributors"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              variant: "outline",
              onClick: load
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(HandCoins), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Refresh`);
                } else {
                  return [
                    createVNode(unref(HandCoins), { class: "size-4" }),
                    createTextVNode(" Refresh")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1), {
                variant: "outline",
                onClick: load
              }, {
                default: withCtx(() => [
                  createVNode(unref(HandCoins), { class: "size-4" }),
                  createTextVNode(" Refresh")
                ]),
                _: 1
              })
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
                  _push3(`<div class="flex flex-wrap items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(distributorFilter),
                    "onUpdate:modelValue": ($event) => isRef(distributorFilter) ? distributorFilter.value = $event : null,
                    endpoint: unref(fetchDistributorsLookupApi),
                    placeholder: "All Distributors",
                    "include-all": "",
                    "all-value": "__all__",
                    "all-label": "All Distributors",
                    class: "w-44"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(statusFilter),
                    "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-36" }, {
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
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "SUBMITTED" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Submitted`);
                                  } else {
                                    return [
                                      createTextVNode("Submitted")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CONFIRMED" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Confirmed`);
                                  } else {
                                    return [
                                      createTextVNode("Confirmed")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "REJECTED" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Rejected`);
                                  } else {
                                    return [
                                      createTextVNode("Rejected")
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
                                createVNode(_component_UiSelectItem, { value: "SUBMITTED" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Submitted")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CONFIRMED" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Confirmed")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "REJECTED" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Rejected")
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
                          createVNode(_component_UiSelectTrigger, { class: "w-36" }, {
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
                              createVNode(_component_UiSelectItem, { value: "SUBMITTED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Submitted")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CONFIRMED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Confirmed")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "REJECTED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Rejected")
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
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(paymentMethodFilter),
                    "onUpdate:modelValue": ($event) => isRef(paymentMethodFilter) ? paymentMethodFilter.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "All Methods" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue, { placeholder: "All Methods" })
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
                                    _push6(`All Methods`);
                                  } else {
                                    return [
                                      createTextVNode("All Methods")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CASH" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Cash`);
                                  } else {
                                    return [
                                      createTextVNode("Cash")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Bank Transfer`);
                                  } else {
                                    return [
                                      createTextVNode("Bank Transfer")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "CHECK" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Check`);
                                  } else {
                                    return [
                                      createTextVNode("Check")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                  default: withCtx(() => [
                                    createTextVNode("All Methods")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cash")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Bank Transfer")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Check")
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
                              createVNode(_component_UiSelectValue, { placeholder: "All Methods" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx(() => [
                                  createTextVNode("All Methods")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cash")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bank Transfer")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                default: withCtx(() => [
                                  createTextVNode("Check")
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
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(dateFrom),
                    "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
                    type: "date",
                    class: "w-40"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(dateTo),
                    "onUpdate:modelValue": ($event) => isRef(dateTo) ? dateTo.value = $event : null,
                    type: "date",
                    class: "w-40"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(distributorFilter),
                        "onUpdate:modelValue": ($event) => isRef(distributorFilter) ? distributorFilter.value = $event : null,
                        endpoint: unref(fetchDistributorsLookupApi),
                        placeholder: "All Distributors",
                        "include-all": "",
                        "all-value": "__all__",
                        "all-label": "All Distributors",
                        class: "w-44"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(statusFilter),
                        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { class: "w-36" }, {
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
                              createVNode(_component_UiSelectItem, { value: "SUBMITTED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Submitted")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CONFIRMED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Confirmed")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "REJECTED" }, {
                                default: withCtx(() => [
                                  createTextVNode("Rejected")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(paymentMethodFilter),
                        "onUpdate:modelValue": ($event) => isRef(paymentMethodFilter) ? paymentMethodFilter.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All Methods" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx(() => [
                                  createTextVNode("All Methods")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CASH" }, {
                                default: withCtx(() => [
                                  createTextVNode("Cash")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                                default: withCtx(() => [
                                  createTextVNode("Bank Transfer")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                                default: withCtx(() => [
                                  createTextVNode("Check")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiInput, {
                        modelValue: unref(dateFrom),
                        "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
                        type: "date",
                        class: "w-40"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiInput, {
                        modelValue: unref(dateTo),
                        "onUpdate:modelValue": ($event) => isRef(dateTo) ? dateTo.value = $event : null,
                        type: "date",
                        class: "w-40"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    data: unref(settlements),
                    columns,
                    loading: unref(loading),
                    "server-total": unref(total),
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No settlements found",
                          description: "Settlements appear when distributors submit cash handovers"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No settlements found",
                            description: "Settlements appear when distributors submit cash handovers"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(settlements),
                      columns,
                      loading: unref(loading),
                      "server-total": unref(total),
                      "show-search": false,
                      "show-column-toggle": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No settlements found",
                          description: "Settlements appear when distributors submit cash handovers"
                        })
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
                  createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(distributorFilter),
                      "onUpdate:modelValue": ($event) => isRef(distributorFilter) ? distributorFilter.value = $event : null,
                      endpoint: unref(fetchDistributorsLookupApi),
                      placeholder: "All Distributors",
                      "include-all": "",
                      "all-value": "__all__",
                      "all-label": "All Distributors",
                      class: "w-44"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                    createVNode(_component_UiSelect, {
                      modelValue: unref(statusFilter),
                      "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiSelectTrigger, { class: "w-36" }, {
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
                            createVNode(_component_UiSelectItem, { value: "SUBMITTED" }, {
                              default: withCtx(() => [
                                createTextVNode("Submitted")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "CONFIRMED" }, {
                              default: withCtx(() => [
                                createTextVNode("Confirmed")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "REJECTED" }, {
                              default: withCtx(() => [
                                createTextVNode("Rejected")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UiSelect, {
                      modelValue: unref(paymentMethodFilter),
                      "onUpdate:modelValue": ($event) => isRef(paymentMethodFilter) ? paymentMethodFilter.value = $event : null
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectValue, { placeholder: "All Methods" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelectContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectItem, { value: "__all__" }, {
                              default: withCtx(() => [
                                createTextVNode("All Methods")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "CASH" }, {
                              default: withCtx(() => [
                                createTextVNode("Cash")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "BANK_TRANSFER" }, {
                              default: withCtx(() => [
                                createTextVNode("Bank Transfer")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "CHECK" }, {
                              default: withCtx(() => [
                                createTextVNode("Check")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UiInput, {
                      modelValue: unref(dateFrom),
                      "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
                      type: "date",
                      class: "w-40"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UiInput, {
                      modelValue: unref(dateTo),
                      "onUpdate:modelValue": ($event) => isRef(dateTo) ? dateTo.value = $event : null,
                      type: "date",
                      class: "w-40"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(settlements),
                    columns,
                    loading: unref(loading),
                    "server-total": unref(total),
                    "show-search": false,
                    "show-column-toggle": false
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No settlements found",
                        description: "Settlements appear when distributors submit cash handovers"
                      })
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sales/settlements/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BEdwVegU.mjs.map
