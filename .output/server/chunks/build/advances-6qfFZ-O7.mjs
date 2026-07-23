import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, d as _sfc_main$4 } from './CardTitle-St-iDBLB.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-KK7k7FV7.mjs';
import { _ as __nuxt_component_10 } from './AppTable-Di4p6o0D.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-BVvkGjQ9.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3, c as _sfc_main$1$2, d as _sfc_main$5, e as _sfc_main$4$1 } from './DialogTrigger-Isr81J2S.mjs';
import { _ as _sfc_main$2 } from './Label-fqACuvH5.mjs';
import { _ as _sfc_main$7 } from './Input-DA89G3IO.mjs';
import { _ as _sfc_main$8 } from './Textarea-BYfzemxZ.mjs';
import { defineComponent, computed, ref, reactive, watch, resolveDirective, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, openBlock, createBlock, isRef, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
import { Plus } from '@lucide/vue';
import { g as getAdvanceColumns } from './column-DIcNatW1.mjs';
import { u as useWorkersStore, f as fetchWorkersLookupApi } from './store-CbGTzEpA.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
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
import './DropdownMenuTrigger-dnC_q6qg.mjs';
import './Checkbox-aOmH4bgm.mjs';
import './TableHeader-f7ALV9Yi.mjs';
import './LoadingState-y5B8zlzY.mjs';
import './SelectValue-CDW_Y5sR.mjs';
import '@tanstack/vue-table';
import './index-DcmArl0H.mjs';
import './nuxt-link-B_K_Hg2R.mjs';

const limit = 50;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "advances",
  __ssrInlineRender: true,
  setup(__props) {
    const workersStore = useWorkersStore();
    computed(() => workersStore.workers);
    const showCreateDialog = ref(false);
    const page = ref(1);
    const workerFilter = ref("__all__");
    const createForm = reactive({
      workerId: "",
      amount: null,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      notes: ""
    });
    const columns = getAdvanceColumns();
    watch(workerFilter, () => {
      page.value = 1;
      fetchData();
    });
    watch(page, fetchData);
    async function fetchData() {
      await Promise.all([
        workersStore.fetchAdvances({
          workerId: workerFilter.value === "__all__" ? void 0 : workerFilter.value,
          page: page.value,
          limit
        })
      ]);
    }
    async function handleCreate() {
      if (!createForm.workerId || !createForm.amount) {
        toast.error("Worker and amount are required");
        return;
      }
      try {
        await workersStore.createAdvance({
          workerId: createForm.workerId,
          amount: createForm.amount,
          date: createForm.date || void 0,
          notes: createForm.notes || void 0
        });
        showCreateDialog.value = false;
        createForm.workerId = "";
        createForm.amount = null;
        createForm.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        createForm.notes = "";
        toast.success("Advance recorded");
      } catch {
        toast.error("Failed to record advance");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3;
      const _component_UiDialogTitle = _sfc_main$1$2;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_UiLabel = _sfc_main$2;
      const _component_UiInput = _sfc_main$7;
      const _component_UiTextarea = _sfc_main$8;
      const _component_UiDialogFooter = _sfc_main$4$1;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Worker Advances",
        description: "Track financial advances given to workers"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              onClick: ($event) => showCreateDialog.value = true
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "WORKERS", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` New Advance `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "size-4" }),
                    createTextVNode(" New Advance ")
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
                  createTextVNode(" New Advance ")
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
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(workerFilter),
                    "onUpdate:modelValue": ($event) => isRef(workerFilter) ? workerFilter.value = $event : null,
                    endpoint: unref(fetchWorkersLookupApi),
                    placeholder: "All Workers",
                    "include-all": "",
                    "all-value": "__all__",
                    "all-label": "All Workers",
                    class: "w-56"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(workerFilter),
                        "onUpdate:modelValue": ($event) => isRef(workerFilter) ? workerFilter.value = $event : null,
                        endpoint: unref(fetchWorkersLookupApi),
                        placeholder: "All Workers",
                        "include-all": "",
                        "all-value": "__all__",
                        "all-label": "All Workers",
                        class: "w-56"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
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
                    data: unref(workersStore).advances,
                    columns: unref(columns),
                    loading: unref(workersStore).loading,
                    "server-total": unref(workersStore).advancesTotal,
                    "show-search": "",
                    "search-placeholder": "Search..."
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No advances",
                          description: "No advances recorded yet",
                          action: "New Advance",
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No advances",
                            description: "No advances recorded yet",
                            action: "New Advance",
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
                      data: unref(workersStore).advances,
                      columns: unref(columns),
                      loading: unref(workersStore).loading,
                      "server-total": unref(workersStore).advancesTotal,
                      "show-search": "",
                      "search-placeholder": "Search..."
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No advances",
                          description: "No advances recorded yet",
                          action: "New Advance",
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
                    createVNode(_component_LookupCombobox, {
                      modelValue: unref(workerFilter),
                      "onUpdate:modelValue": ($event) => isRef(workerFilter) ? workerFilter.value = $event : null,
                      endpoint: unref(fetchWorkersLookupApi),
                      placeholder: "All Workers",
                      "include-all": "",
                      "all-value": "__all__",
                      "all-label": "All Workers",
                      class: "w-56"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(workersStore).advances,
                    columns: unref(columns),
                    loading: unref(workersStore).loading,
                    "server-total": unref(workersStore).advancesTotal,
                    "show-search": "",
                    "search-placeholder": "Search..."
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No advances",
                        description: "No advances recorded yet",
                        action: "New Advance",
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
                              _push5(`Record Advance`);
                            } else {
                              return [
                                createTextVNode("Record Advance")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record a financial advance for a worker`);
                            } else {
                              return [
                                createTextVNode("Record a financial advance for a worker")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Record Advance")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Record a financial advance for a worker")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "adv-worker" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Worker *`);
                      } else {
                        return [
                          createTextVNode("Worker *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(createForm).workerId,
                    "onUpdate:modelValue": ($event) => unref(createForm).workerId = $event,
                    endpoint: unref(fetchWorkersLookupApi),
                    placeholder: "Select worker"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "adv-amount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Amount (EGP) *`);
                      } else {
                        return [
                          createTextVNode("Amount (EGP) *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "adv-amount",
                    modelValue: unref(createForm).amount,
                    "onUpdate:modelValue": ($event) => unref(createForm).amount = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "adv-date" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Date`);
                      } else {
                        return [
                          createTextVNode("Date")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "adv-date",
                    modelValue: unref(createForm).date,
                    "onUpdate:modelValue": ($event) => unref(createForm).date = $event,
                    type: "date"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "adv-notes" }, {
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
                  _push3(ssrRenderComponent(_component_UiTextarea, {
                    id: "adv-notes",
                    modelValue: unref(createForm).notes,
                    "onUpdate:modelValue": ($event) => unref(createForm).notes = $event,
                    placeholder: "Optional notes"
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
                              _push5(`Record`);
                            } else {
                              return [
                                createTextVNode("Record")
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
                              createTextVNode("Record")
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
                            createTextVNode("Record Advance")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Record a financial advance for a worker")
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
                        createVNode(_component_UiLabel, { for: "adv-worker" }, {
                          default: withCtx(() => [
                            createTextVNode("Worker *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(createForm).workerId,
                          "onUpdate:modelValue": ($event) => unref(createForm).workerId = $event,
                          endpoint: unref(fetchWorkersLookupApi),
                          placeholder: "Select worker"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "adv-amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Amount (EGP) *")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "adv-amount",
                            modelValue: unref(createForm).amount,
                            "onUpdate:modelValue": ($event) => unref(createForm).amount = $event,
                            type: "number",
                            step: "0.01",
                            placeholder: "0.00",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "adv-date" }, {
                            default: withCtx(() => [
                              createTextVNode("Date")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "adv-date",
                            modelValue: unref(createForm).date,
                            "onUpdate:modelValue": ($event) => unref(createForm).date = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "adv-notes" }, {
                          default: withCtx(() => [
                            createTextVNode("Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          id: "adv-notes",
                          modelValue: unref(createForm).notes,
                          "onUpdate:modelValue": ($event) => unref(createForm).notes = $event,
                          placeholder: "Optional notes"
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
                              createTextVNode("Record")
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
                          createTextVNode("Record Advance")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Record a financial advance for a worker")
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
                      createVNode(_component_UiLabel, { for: "adv-worker" }, {
                        default: withCtx(() => [
                          createTextVNode("Worker *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(createForm).workerId,
                        "onUpdate:modelValue": ($event) => unref(createForm).workerId = $event,
                        endpoint: unref(fetchWorkersLookupApi),
                        placeholder: "Select worker"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "adv-amount" }, {
                          default: withCtx(() => [
                            createTextVNode("Amount (EGP) *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "adv-amount",
                          modelValue: unref(createForm).amount,
                          "onUpdate:modelValue": ($event) => unref(createForm).amount = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "0.00",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "adv-date" }, {
                          default: withCtx(() => [
                            createTextVNode("Date")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "adv-date",
                          modelValue: unref(createForm).date,
                          "onUpdate:modelValue": ($event) => unref(createForm).date = $event,
                          type: "date"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "adv-notes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        id: "adv-notes",
                        modelValue: unref(createForm).notes,
                        "onUpdate:modelValue": ($event) => unref(createForm).notes = $event,
                        placeholder: "Optional notes"
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
                            createTextVNode("Record")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/workers/advances.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=advances-6qfFZ-O7.mjs.map
