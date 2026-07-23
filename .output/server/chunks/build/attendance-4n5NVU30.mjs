import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, d as _sfc_main$4 } from './CardTitle-St-iDBLB.mjs';
import { _ as _sfc_main$2 } from './Label-fqACuvH5.mjs';
import { _ as _sfc_main$3 } from './Input-DA89G3IO.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-KK7k7FV7.mjs';
import { _ as _sfc_main$8, a as _sfc_main$5, b as _sfc_main$4$1, c as _sfc_main$1$2, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-f7ALV9Yi.mjs';
import { _ as _sfc_main$7 } from './Checkbox-aOmH4bgm.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-BVvkGjQ9.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$3, b as _sfc_main$9, c as _sfc_main$9$1, d as _sfc_main$7$2 } from './SelectValue-CDW_Y5sR.mjs';
import { _ as _sfc_main$b } from './index-DcmArl0H.mjs';
import { defineComponent, ref, computed, watch, resolveDirective, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, withDirectives, openBlock, createBlock, isRef, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Check } from '@lucide/vue';
import { u as useProductionStore, f as fetchProductionLookupApi } from './store-C09GJ09r.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
import { u as useWorkersStore } from './store-CbGTzEpA.mjs';
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
import './Textarea-BYfzemxZ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "attendance",
  __ssrInlineRender: true,
  setup(__props) {
    const workersStore = useWorkersStore();
    const productionStore = useProductionStore();
    const selectedDate = ref((/* @__PURE__ */ new Date()).toISOString().split("T")[0] || "");
    const selectedBatchId = ref("__none__");
    const workerRecords = ref({});
    const submitting = ref(false);
    const activeWorkers = computed(() => workersStore.workers.filter((w) => w.isActive));
    function initRecords() {
      workerRecords.value = {};
      console.log(activeWorkers.value, "activeWorkers.value");
      for (const w of activeWorkers.value) {
        workerRecords.value[w.id] = {
          checked: false,
          status: "PRESENT",
          dailyWage: w.defaultDailyWage ? Number(w.defaultDailyWage) : null,
          notes: ""
        };
      }
    }
    watch(activeWorkers, initRecords, { immediate: true });
    async function handleSubmit() {
      const attendanceRecords = Object.entries(workerRecords.value).map(([workerId, rec]) => ({
        workerId,
        status: rec.checked ? "PRESENT" : rec.status,
        notes: rec.notes || void 0
      }));
      const dailyWageRecords = Object.entries(workerRecords.value).filter(([_, rec]) => rec.checked && rec.dailyWage !== null && selectedBatchId.value !== "__none__").map(([workerId, rec]) => ({
        workerId,
        dailyWage: rec.dailyWage,
        notes: rec.notes || void 0
      }));
      submitting.value = true;
      try {
        await workersStore.logAttendance({
          date: selectedDate.value,
          records: attendanceRecords
        });
        if (dailyWageRecords.length > 0 && selectedBatchId.value !== "__none__") {
          await workersStore.logDailyWages({
            productionBatchId: selectedBatchId.value,
            date: selectedDate.value || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            records: dailyWageRecords
          });
          await productionStore.fetchBatches({ limit: 50 });
        }
        toast.success(`Logged attendance for ${attendanceRecords.length} workers`);
      } catch {
        toast.error("Failed to log attendance");
      } finally {
        submitting.value = false;
      }
    }
    function getRec(id) {
      const rec = workerRecords.value[id];
      console.log(rec);
      if (!rec) {
        const fallback = { checked: false, status: "ABSENT", dailyWage: null, notes: "" };
        workerRecords.value[id] = fallback;
        return workerRecords.value[id];
      }
      return rec;
    }
    function toggleAll(checked) {
      console.log("checked", checked);
      for (const id of Object.keys(workerRecords.value)) {
        getRec(id).checked = checked;
      }
    }
    function setAllStatus(status) {
      for (const id of Object.keys(workerRecords.value)) {
        const rec = getRec(id);
        rec.status = status;
        rec.checked = status === "PRESENT";
      }
    }
    const isAllChecked = computed(() => {
      if (activeWorkers.value.length === 0) return false;
      return Object.values(workerRecords.value).every((r) => r.checked);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiLabel = _sfc_main$2;
      const _component_UiInput = _sfc_main$3;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$5;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$2;
      const _component_UiCheckbox = _sfc_main$7;
      const _component_UiTableBody = _sfc_main$7$1;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$3;
      const _component_UiSelectValue = _sfc_main$9;
      const _component_UiSelectContent = _sfc_main$9$1;
      const _component_UiSelectItem = _sfc_main$7$2;
      const _component_UiBadge = _sfc_main$b;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Attendance & Daily Wages",
        description: "Log daily attendance and assign workers to production batches"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              onClick: handleSubmit,
              disabled: unref(submitting)
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "ATTENDANCE", action: "UPDATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Check), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` ${ssrInterpolate(unref(submitting) ? "Saving..." : "Save All")}`);
                } else {
                  return [
                    createVNode(unref(Check), { class: "size-4" }),
                    createTextVNode(" " + toDisplayString(unref(submitting) ? "Saving..." : "Save All"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              withDirectives((openBlock(), createBlock(_component_UiButton, {
                onClick: handleSubmit,
                disabled: unref(submitting)
              }, {
                default: withCtx(() => [
                  createVNode(unref(Check), { class: "size-4" }),
                  createTextVNode(" " + toDisplayString(unref(submitting) ? "Saving..." : "Save All"), 1)
                ]),
                _: 1
              }, 8, ["disabled"])), [
                [_directive_can, { module: "ATTENDANCE", action: "UPDATE" }]
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
                  _push3(`<div class="flex flex-wrap items-center gap-3"${_scopeId2}><div class="space-y-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs text-muted-foreground" }, {
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
                    modelValue: unref(selectedDate),
                    "onUpdate:modelValue": ($event) => isRef(selectedDate) ? selectedDate.value = $event : null,
                    type: "date",
                    class: "w-44"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { class: "text-xs text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Production Batch`);
                      } else {
                        return [
                          createTextVNode("Production Batch")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(selectedBatchId),
                    "onUpdate:modelValue": ($event) => isRef(selectedBatchId) ? selectedBatchId.value = $event : null,
                    endpoint: unref(fetchProductionLookupApi),
                    "label-key": "_label",
                    placeholder: "No batch (attendance only)",
                    "include-all": "",
                    "all-value": "__none__",
                    "all-label": "No batch (attendance only)",
                    class: "w-56"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-end gap-1 pb-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => setAllStatus("PRESENT")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`All Present`);
                      } else {
                        return [
                          createTextVNode("All Present")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiButton, {
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => setAllStatus("ABSENT")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`All Absent`);
                      } else {
                        return [
                          createTextVNode("All Absent")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiButton, {
                    variant: "outline",
                    size: "sm",
                    onClick: ($event) => toggleAll(false)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Clear All`);
                      } else {
                        return [
                          createTextVNode("Clear All")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode(_component_UiLabel, { class: "text-xs text-muted-foreground" }, {
                          default: withCtx(() => [
                            createTextVNode("Date")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(selectedDate),
                          "onUpdate:modelValue": ($event) => isRef(selectedDate) ? selectedDate.value = $event : null,
                          type: "date",
                          class: "w-44"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode(_component_UiLabel, { class: "text-xs text-muted-foreground" }, {
                          default: withCtx(() => [
                            createTextVNode("Production Batch")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(selectedBatchId),
                          "onUpdate:modelValue": ($event) => isRef(selectedBatchId) ? selectedBatchId.value = $event : null,
                          endpoint: unref(fetchProductionLookupApi),
                          "label-key": "_label",
                          placeholder: "No batch (attendance only)",
                          "include-all": "",
                          "all-value": "__none__",
                          "all-label": "No batch (attendance only)",
                          class: "w-56"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "flex items-end gap-1 pb-1" }, [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          size: "sm",
                          onClick: ($event) => setAllStatus("PRESENT")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("All Present")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          size: "sm",
                          onClick: ($event) => setAllStatus("ABSENT")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("All Absent")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          size: "sm",
                          onClick: ($event) => toggleAll(false)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Clear All")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="rounded-md border"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiTable, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiTableHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiTableRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiTableHead, { class: "w-12" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_UiCheckbox, {
                                            modelValue: unref(isAllChecked),
                                            "onUpdate:modelValue": ($event) => isRef(isAllChecked) ? isAllChecked.value = $event : null,
                                            indeterminate: Object.values(unref(workerRecords)).some((r) => r.checked) && !Object.values(unref(workerRecords)).every((r) => r.checked),
                                            onClick: ($event) => toggleAll(!Object.values(unref(workerRecords)).every((r) => r.checked))
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_UiCheckbox, {
                                              modelValue: unref(isAllChecked),
                                              "onUpdate:modelValue": ($event) => isRef(isAllChecked) ? isAllChecked.value = $event : null,
                                              indeterminate: Object.values(unref(workerRecords)).some((r) => r.checked) && !Object.values(unref(workerRecords)).every((r) => r.checked),
                                              onClick: ($event) => toggleAll(!Object.values(unref(workerRecords)).every((r) => r.checked))
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "indeterminate", "onClick"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Worker`);
                                        } else {
                                          return [
                                            createTextVNode("Worker")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Role`);
                                        } else {
                                          return [
                                            createTextVNode("Role")
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
                                    if (unref(selectedBatchId) !== "__none__") {
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "w-40" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Daily Wage (EGP)`);
                                          } else {
                                            return [
                                              createTextVNode("Daily Wage (EGP)")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Notes`);
                                        } else {
                                          return [
                                            createTextVNode("Notes")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiTableHead, { class: "w-12" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiCheckbox, {
                                            modelValue: unref(isAllChecked),
                                            "onUpdate:modelValue": ($event) => isRef(isAllChecked) ? isAllChecked.value = $event : null,
                                            indeterminate: Object.values(unref(workerRecords)).some((r) => r.checked) && !Object.values(unref(workerRecords)).every((r) => r.checked),
                                            onClick: ($event) => toggleAll(!Object.values(unref(workerRecords)).every((r) => r.checked))
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "indeterminate", "onClick"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Worker")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Role")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      }),
                                      unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableHead, {
                                        key: 0,
                                        class: "w-40"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Daily Wage (EGP)")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Notes")
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
                                    createVNode(_component_UiTableHead, { class: "w-12" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiCheckbox, {
                                          modelValue: unref(isAllChecked),
                                          "onUpdate:modelValue": ($event) => isRef(isAllChecked) ? isAllChecked.value = $event : null,
                                          indeterminate: Object.values(unref(workerRecords)).some((r) => r.checked) && !Object.values(unref(workerRecords)).every((r) => r.checked),
                                          onClick: ($event) => toggleAll(!Object.values(unref(workerRecords)).every((r) => r.checked))
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "indeterminate", "onClick"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Worker")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Role")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    }),
                                    unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableHead, {
                                      key: 0,
                                      class: "w-40"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Daily Wage (EGP)")
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Notes")
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
                              if (unref(activeWorkers).length === 0) {
                                _push5(ssrRenderComponent(_component_UiTableRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableCell, {
                                        colspan: unref(selectedBatchId) !== "__none__" ? 6 : 5
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_EmptyState, {
                                              title: "No workers found",
                                              description: "Add workers first"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_EmptyState, {
                                                title: "No workers found",
                                                description: "Add workers first"
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableCell, {
                                          colspan: unref(selectedBatchId) !== "__none__" ? 6 : 5
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_EmptyState, {
                                              title: "No workers found",
                                              description: "Add workers first"
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["colspan"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<!--[-->`);
                              ssrRenderList(unref(activeWorkers), (w) => {
                                _push5(ssrRenderComponent(_component_UiTableRow, {
                                  key: w.id
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_UiCheckbox, {
                                              modelValue: getRec(w.id).checked,
                                              "onUpdate:modelValue": ($event) => getRec(w.id).checked = $event,
                                              onClick: ($event) => getRec(w.id).checked = !getRec(w.id).checked
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_UiCheckbox, {
                                                modelValue: getRec(w.id).checked,
                                                "onUpdate:modelValue": ($event) => getRec(w.id).checked = $event,
                                                onClick: ($event) => getRec(w.id).checked = !getRec(w.id).checked
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<span class="font-medium"${_scopeId6}>${ssrInterpolate(w.name)}</span>`);
                                          } else {
                                            return [
                                              createVNode("span", { class: "font-medium" }, toDisplayString(w.name), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<span class="text-sm text-muted-foreground"${_scopeId6}>${ssrInterpolate(w.role || "—")}</span>`);
                                          } else {
                                            return [
                                              createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(w.role || "—"), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            if (!getRec(w.id).checked) {
                                              _push7(ssrRenderComponent(_component_UiSelect, {
                                                "model-value": getRec(w.id).status,
                                                "onUpdate:modelValue": ($event) => getRec(w.id).status = $event
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-32 h-8" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_UiSelectValue, null, null, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_UiSelectValue)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiSelectContent, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_UiSelectItem, { value: "ABSENT" }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`Absent`);
                                                              } else {
                                                                return [
                                                                  createTextVNode("Absent")
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                          _push9(ssrRenderComponent(_component_UiSelectItem, { value: "LEAVE" }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`On Leave`);
                                                              } else {
                                                                return [
                                                                  createTextVNode("On Leave")
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_UiSelectItem, { value: "ABSENT" }, {
                                                              default: withCtx(() => [
                                                                createTextVNode("Absent")
                                                              ]),
                                                              _: 1
                                                            }),
                                                            createVNode(_component_UiSelectItem, { value: "LEAVE" }, {
                                                              default: withCtx(() => [
                                                                createTextVNode("On Leave")
                                                              ]),
                                                              _: 1
                                                            })
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_UiSelectTrigger, { class: "w-32 h-8" }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_UiSelectValue)
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(_component_UiSelectContent, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_UiSelectItem, { value: "ABSENT" }, {
                                                            default: withCtx(() => [
                                                              createTextVNode("Absent")
                                                            ]),
                                                            _: 1
                                                          }),
                                                          createVNode(_component_UiSelectItem, { value: "LEAVE" }, {
                                                            default: withCtx(() => [
                                                              createTextVNode("On Leave")
                                                            ]),
                                                            _: 1
                                                          })
                                                        ]),
                                                        _: 1
                                                      })
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              _push7(ssrRenderComponent(_component_UiBadge, {
                                                variant: "default",
                                                class: "text-xs bg-green-100 text-green-800 hover:bg-green-100"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`Present`);
                                                  } else {
                                                    return [
                                                      createTextVNode("Present")
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            }
                                          } else {
                                            return [
                                              !getRec(w.id).checked ? (openBlock(), createBlock(_component_UiSelect, {
                                                key: 0,
                                                "model-value": getRec(w.id).status,
                                                "onUpdate:modelValue": ($event) => getRec(w.id).status = $event
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiSelectTrigger, { class: "w-32 h-8" }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_UiSelectValue)
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiSelectContent, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_UiSelectItem, { value: "ABSENT" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("Absent")
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(_component_UiSelectItem, { value: "LEAVE" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("On Leave")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["model-value", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_UiBadge, {
                                                key: 1,
                                                variant: "default",
                                                class: "text-xs bg-green-100 text-green-800 hover:bg-green-100"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Present")
                                                ]),
                                                _: 1
                                              }))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      if (unref(selectedBatchId) !== "__none__") {
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              if (getRec(w.id).checked) {
                                                _push7(ssrRenderComponent(_component_UiInput, {
                                                  modelValue: getRec(w.id).dailyWage,
                                                  "onUpdate:modelValue": ($event) => getRec(w.id).dailyWage = $event,
                                                  type: "number",
                                                  step: "0.01",
                                                  class: "w-32 h-8",
                                                  placeholder: String(w.defaultDailyWage ? Number(w.defaultDailyWage).toFixed(2) : "0.00")
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<span class="text-sm text-muted-foreground"${_scopeId6}>—</span>`);
                                              }
                                            } else {
                                              return [
                                                getRec(w.id).checked ? (openBlock(), createBlock(_component_UiInput, {
                                                  key: 0,
                                                  modelValue: getRec(w.id).dailyWage,
                                                  "onUpdate:modelValue": ($event) => getRec(w.id).dailyWage = $event,
                                                  type: "number",
                                                  step: "0.01",
                                                  class: "w-32 h-8",
                                                  placeholder: String(w.defaultDailyWage ? Number(w.defaultDailyWage).toFixed(2) : "0.00")
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock("span", {
                                                  key: 1,
                                                  class: "text-sm text-muted-foreground"
                                                }, "—"))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        _push6(`<!---->`);
                                      }
                                      _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_UiInput, {
                                              modelValue: getRec(w.id).notes,
                                              "onUpdate:modelValue": ($event) => getRec(w.id).notes = $event,
                                              placeholder: "Optional note",
                                              class: "h-8 max-w-40"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_UiInput, {
                                                modelValue: getRec(w.id).notes,
                                                "onUpdate:modelValue": ($event) => getRec(w.id).notes = $event,
                                                placeholder: "Optional note",
                                                class: "h-8 max-w-40"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiCheckbox, {
                                              modelValue: getRec(w.id).checked,
                                              "onUpdate:modelValue": ($event) => getRec(w.id).checked = $event,
                                              onClick: ($event) => getRec(w.id).checked = !getRec(w.id).checked
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode("span", { class: "font-medium" }, toDisplayString(w.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(w.role || "—"), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            !getRec(w.id).checked ? (openBlock(), createBlock(_component_UiSelect, {
                                              key: 0,
                                              "model-value": getRec(w.id).status,
                                              "onUpdate:modelValue": ($event) => getRec(w.id).status = $event
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiSelectTrigger, { class: "w-32 h-8" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiSelectValue)
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiSelectContent, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiSelectItem, { value: "ABSENT" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Absent")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiSelectItem, { value: "LEAVE" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("On Leave")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["model-value", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_UiBadge, {
                                              key: 1,
                                              variant: "default",
                                              class: "text-xs bg-green-100 text-green-800 hover:bg-green-100"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode("Present")
                                              ]),
                                              _: 1
                                            }))
                                          ]),
                                          _: 2
                                        }, 1024),
                                        unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableCell, { key: 0 }, {
                                          default: withCtx(() => [
                                            getRec(w.id).checked ? (openBlock(), createBlock(_component_UiInput, {
                                              key: 0,
                                              modelValue: getRec(w.id).dailyWage,
                                              "onUpdate:modelValue": ($event) => getRec(w.id).dailyWage = $event,
                                              type: "number",
                                              step: "0.01",
                                              class: "w-32 h-8",
                                              placeholder: String(w.defaultDailyWage ? Number(w.defaultDailyWage).toFixed(2) : "0.00")
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock("span", {
                                              key: 1,
                                              class: "text-sm text-muted-foreground"
                                            }, "—"))
                                          ]),
                                          _: 2
                                        }, 1024)) : createCommentVNode("", true),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiInput, {
                                              modelValue: getRec(w.id).notes,
                                              "onUpdate:modelValue": ($event) => getRec(w.id).notes = $event,
                                              placeholder: "Optional note",
                                              class: "h-8 max-w-40"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                unref(activeWorkers).length === 0 ? (openBlock(), createBlock(_component_UiTableRow, { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableCell, {
                                      colspan: unref(selectedBatchId) !== "__none__" ? 6 : 5
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_EmptyState, {
                                          title: "No workers found",
                                          description: "Add workers first"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["colspan"])
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(activeWorkers), (w) => {
                                  return openBlock(), createBlock(_component_UiTableRow, {
                                    key: w.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiCheckbox, {
                                            modelValue: getRec(w.id).checked,
                                            "onUpdate:modelValue": ($event) => getRec(w.id).checked = $event,
                                            onClick: ($event) => getRec(w.id).checked = !getRec(w.id).checked
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "font-medium" }, toDisplayString(w.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(w.role || "—"), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          !getRec(w.id).checked ? (openBlock(), createBlock(_component_UiSelect, {
                                            key: 0,
                                            "model-value": getRec(w.id).status,
                                            "onUpdate:modelValue": ($event) => getRec(w.id).status = $event
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiSelectTrigger, { class: "w-32 h-8" }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiSelectValue)
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_UiSelectContent, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiSelectItem, { value: "ABSENT" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Absent")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiSelectItem, { value: "LEAVE" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("On Leave")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["model-value", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_UiBadge, {
                                            key: 1,
                                            variant: "default",
                                            class: "text-xs bg-green-100 text-green-800 hover:bg-green-100"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Present")
                                            ]),
                                            _: 1
                                          }))
                                        ]),
                                        _: 2
                                      }, 1024),
                                      unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableCell, { key: 0 }, {
                                        default: withCtx(() => [
                                          getRec(w.id).checked ? (openBlock(), createBlock(_component_UiInput, {
                                            key: 0,
                                            modelValue: getRec(w.id).dailyWage,
                                            "onUpdate:modelValue": ($event) => getRec(w.id).dailyWage = $event,
                                            type: "number",
                                            step: "0.01",
                                            class: "w-32 h-8",
                                            placeholder: String(w.defaultDailyWage ? Number(w.defaultDailyWage).toFixed(2) : "0.00")
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock("span", {
                                            key: 1,
                                            class: "text-sm text-muted-foreground"
                                          }, "—"))
                                        ]),
                                        _: 2
                                      }, 1024)) : createCommentVNode("", true),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiInput, {
                                            modelValue: getRec(w.id).notes,
                                            "onUpdate:modelValue": ($event) => getRec(w.id).notes = $event,
                                            placeholder: "Optional note",
                                            class: "h-8 max-w-40"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                  createVNode(_component_UiTableHead, { class: "w-12" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiCheckbox, {
                                        modelValue: unref(isAllChecked),
                                        "onUpdate:modelValue": ($event) => isRef(isAllChecked) ? isAllChecked.value = $event : null,
                                        indeterminate: Object.values(unref(workerRecords)).some((r) => r.checked) && !Object.values(unref(workerRecords)).every((r) => r.checked),
                                        onClick: ($event) => toggleAll(!Object.values(unref(workerRecords)).every((r) => r.checked))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "indeterminate", "onClick"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Worker")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Role")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Status")
                                    ]),
                                    _: 1
                                  }),
                                  unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableHead, {
                                    key: 0,
                                    class: "w-40"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Daily Wage (EGP)")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Notes")
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
                              unref(activeWorkers).length === 0 ? (openBlock(), createBlock(_component_UiTableRow, { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, {
                                    colspan: unref(selectedBatchId) !== "__none__" ? 6 : 5
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_EmptyState, {
                                        title: "No workers found",
                                        description: "Add workers first"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["colspan"])
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(activeWorkers), (w) => {
                                return openBlock(), createBlock(_component_UiTableRow, {
                                  key: w.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiCheckbox, {
                                          modelValue: getRec(w.id).checked,
                                          "onUpdate:modelValue": ($event) => getRec(w.id).checked = $event,
                                          onClick: ($event) => getRec(w.id).checked = !getRec(w.id).checked
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "font-medium" }, toDisplayString(w.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(w.role || "—"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        !getRec(w.id).checked ? (openBlock(), createBlock(_component_UiSelect, {
                                          key: 0,
                                          "model-value": getRec(w.id).status,
                                          "onUpdate:modelValue": ($event) => getRec(w.id).status = $event
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiSelectTrigger, { class: "w-32 h-8" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiSelectValue)
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiSelectContent, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiSelectItem, { value: "ABSENT" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Absent")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiSelectItem, { value: "LEAVE" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("On Leave")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["model-value", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_UiBadge, {
                                          key: 1,
                                          variant: "default",
                                          class: "text-xs bg-green-100 text-green-800 hover:bg-green-100"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Present")
                                          ]),
                                          _: 1
                                        }))
                                      ]),
                                      _: 2
                                    }, 1024),
                                    unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableCell, { key: 0 }, {
                                      default: withCtx(() => [
                                        getRec(w.id).checked ? (openBlock(), createBlock(_component_UiInput, {
                                          key: 0,
                                          modelValue: getRec(w.id).dailyWage,
                                          "onUpdate:modelValue": ($event) => getRec(w.id).dailyWage = $event,
                                          type: "number",
                                          step: "0.01",
                                          class: "w-32 h-8",
                                          placeholder: String(w.defaultDailyWage ? Number(w.defaultDailyWage).toFixed(2) : "0.00")
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-sm text-muted-foreground"
                                        }, "—"))
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiInput, {
                                          modelValue: getRec(w.id).notes,
                                          "onUpdate:modelValue": ($event) => getRec(w.id).notes = $event,
                                          placeholder: "Optional note",
                                          class: "h-8 max-w-40"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "rounded-md border" }, [
                      createVNode(_component_UiTable, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiTableHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHead, { class: "w-12" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiCheckbox, {
                                        modelValue: unref(isAllChecked),
                                        "onUpdate:modelValue": ($event) => isRef(isAllChecked) ? isAllChecked.value = $event : null,
                                        indeterminate: Object.values(unref(workerRecords)).some((r) => r.checked) && !Object.values(unref(workerRecords)).every((r) => r.checked),
                                        onClick: ($event) => toggleAll(!Object.values(unref(workerRecords)).every((r) => r.checked))
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "indeterminate", "onClick"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Worker")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Role")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Status")
                                    ]),
                                    _: 1
                                  }),
                                  unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableHead, {
                                    key: 0,
                                    class: "w-40"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Daily Wage (EGP)")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Notes")
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
                              unref(activeWorkers).length === 0 ? (openBlock(), createBlock(_component_UiTableRow, { key: 0 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, {
                                    colspan: unref(selectedBatchId) !== "__none__" ? 6 : 5
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_EmptyState, {
                                        title: "No workers found",
                                        description: "Add workers first"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["colspan"])
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(activeWorkers), (w) => {
                                return openBlock(), createBlock(_component_UiTableRow, {
                                  key: w.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiCheckbox, {
                                          modelValue: getRec(w.id).checked,
                                          "onUpdate:modelValue": ($event) => getRec(w.id).checked = $event,
                                          onClick: ($event) => getRec(w.id).checked = !getRec(w.id).checked
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "font-medium" }, toDisplayString(w.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(w.role || "—"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        !getRec(w.id).checked ? (openBlock(), createBlock(_component_UiSelect, {
                                          key: 0,
                                          "model-value": getRec(w.id).status,
                                          "onUpdate:modelValue": ($event) => getRec(w.id).status = $event
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiSelectTrigger, { class: "w-32 h-8" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiSelectValue)
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiSelectContent, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiSelectItem, { value: "ABSENT" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Absent")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiSelectItem, { value: "LEAVE" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("On Leave")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["model-value", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_UiBadge, {
                                          key: 1,
                                          variant: "default",
                                          class: "text-xs bg-green-100 text-green-800 hover:bg-green-100"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Present")
                                          ]),
                                          _: 1
                                        }))
                                      ]),
                                      _: 2
                                    }, 1024),
                                    unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableCell, { key: 0 }, {
                                      default: withCtx(() => [
                                        getRec(w.id).checked ? (openBlock(), createBlock(_component_UiInput, {
                                          key: 0,
                                          modelValue: getRec(w.id).dailyWage,
                                          "onUpdate:modelValue": ($event) => getRec(w.id).dailyWage = $event,
                                          type: "number",
                                          step: "0.01",
                                          class: "w-32 h-8",
                                          placeholder: String(w.defaultDailyWage ? Number(w.defaultDailyWage).toFixed(2) : "0.00")
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-sm text-muted-foreground"
                                        }, "—"))
                                      ]),
                                      _: 2
                                    }, 1024)) : createCommentVNode("", true),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiInput, {
                                          modelValue: getRec(w.id).notes,
                                          "onUpdate:modelValue": ($event) => getRec(w.id).notes = $event,
                                          placeholder: "Optional note",
                                          class: "h-8 max-w-40"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                    createVNode("div", { class: "space-y-1" }, [
                      createVNode(_component_UiLabel, { class: "text-xs text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Date")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(selectedDate),
                        "onUpdate:modelValue": ($event) => isRef(selectedDate) ? selectedDate.value = $event : null,
                        type: "date",
                        class: "w-44"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-1" }, [
                      createVNode(_component_UiLabel, { class: "text-xs text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Production Batch")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(selectedBatchId),
                        "onUpdate:modelValue": ($event) => isRef(selectedBatchId) ? selectedBatchId.value = $event : null,
                        endpoint: unref(fetchProductionLookupApi),
                        "label-key": "_label",
                        placeholder: "No batch (attendance only)",
                        "include-all": "",
                        "all-value": "__none__",
                        "all-label": "No batch (attendance only)",
                        class: "w-56"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                    ]),
                    createVNode("div", { class: "flex items-end gap-1 pb-1" }, [
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => setAllStatus("PRESENT")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("All Present")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => setAllStatus("ABSENT")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("All Absent")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => toggleAll(false)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Clear All")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "rounded-md border" }, [
                    createVNode(_component_UiTable, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiTableRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHead, { class: "w-12" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiCheckbox, {
                                      modelValue: unref(isAllChecked),
                                      "onUpdate:modelValue": ($event) => isRef(isAllChecked) ? isAllChecked.value = $event : null,
                                      indeterminate: Object.values(unref(workerRecords)).some((r) => r.checked) && !Object.values(unref(workerRecords)).every((r) => r.checked),
                                      onClick: ($event) => toggleAll(!Object.values(unref(workerRecords)).every((r) => r.checked))
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "indeterminate", "onClick"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Worker")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Role")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Status")
                                  ]),
                                  _: 1
                                }),
                                unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableHead, {
                                  key: 0,
                                  class: "w-40"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Daily Wage (EGP)")
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Notes")
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
                            unref(activeWorkers).length === 0 ? (openBlock(), createBlock(_component_UiTableRow, { key: 0 }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableCell, {
                                  colspan: unref(selectedBatchId) !== "__none__" ? 6 : 5
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_EmptyState, {
                                      title: "No workers found",
                                      description: "Add workers first"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["colspan"])
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(activeWorkers), (w) => {
                              return openBlock(), createBlock(_component_UiTableRow, {
                                key: w.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiCheckbox, {
                                        modelValue: getRec(w.id).checked,
                                        "onUpdate:modelValue": ($event) => getRec(w.id).checked = $event,
                                        onClick: ($event) => getRec(w.id).checked = !getRec(w.id).checked
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onClick"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "font-medium" }, toDisplayString(w.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(w.role || "—"), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      !getRec(w.id).checked ? (openBlock(), createBlock(_component_UiSelect, {
                                        key: 0,
                                        "model-value": getRec(w.id).status,
                                        "onUpdate:modelValue": ($event) => getRec(w.id).status = $event
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiSelectTrigger, { class: "w-32 h-8" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiSelectValue)
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiSelectContent, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiSelectItem, { value: "ABSENT" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("Absent")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_UiSelectItem, { value: "LEAVE" }, {
                                                default: withCtx(() => [
                                                  createTextVNode("On Leave")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["model-value", "onUpdate:modelValue"])) : (openBlock(), createBlock(_component_UiBadge, {
                                        key: 1,
                                        variant: "default",
                                        class: "text-xs bg-green-100 text-green-800 hover:bg-green-100"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Present")
                                        ]),
                                        _: 1
                                      }))
                                    ]),
                                    _: 2
                                  }, 1024),
                                  unref(selectedBatchId) !== "__none__" ? (openBlock(), createBlock(_component_UiTableCell, { key: 0 }, {
                                    default: withCtx(() => [
                                      getRec(w.id).checked ? (openBlock(), createBlock(_component_UiInput, {
                                        key: 0,
                                        modelValue: getRec(w.id).dailyWage,
                                        "onUpdate:modelValue": ($event) => getRec(w.id).dailyWage = $event,
                                        type: "number",
                                        step: "0.01",
                                        class: "w-32 h-8",
                                        placeholder: String(w.defaultDailyWage ? Number(w.defaultDailyWage).toFixed(2) : "0.00")
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-sm text-muted-foreground"
                                      }, "—"))
                                    ]),
                                    _: 2
                                  }, 1024)) : createCommentVNode("", true),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiInput, {
                                        modelValue: getRec(w.id).notes,
                                        "onUpdate:modelValue": ($event) => getRec(w.id).notes = $event,
                                        placeholder: "Optional note",
                                        class: "h-8 max-w-40"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/workers/attendance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=attendance-4n5NVU30.mjs.map
