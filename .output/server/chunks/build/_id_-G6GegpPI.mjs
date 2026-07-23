import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-y5B8zlzY.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, d as _sfc_main$4, c as _sfc_main$3 } from './CardTitle-St-iDBLB.mjs';
import { _ as __nuxt_component_10 } from './AppTable-Di4p6o0D.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-BVvkGjQ9.mjs';
import { a as useRoute, n as navigateTo } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { ArrowLeft, DollarSign, TrendingDown, Wallet, Calendar } from '@lucide/vue';
import { a as getDailyWageColumns, g as getAdvanceColumns, b as getAttendanceColumns } from './column-DIcNatW1.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useWorkersStore } from './store-CbGTzEpA.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './Input-DA89G3IO.mjs';
import '@vueuse/core';
import './DropdownMenuTrigger-dnC_q6qg.mjs';
import './Checkbox-aOmH4bgm.mjs';
import './TableHeader-f7ALV9Yi.mjs';
import './SelectValue-CDW_Y5sR.mjs';
import '@tanstack/vue-table';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';
import './index-DcmArl0H.mjs';
import './nuxt-link-B_K_Hg2R.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const workersStore = useWorkersStore();
    const worker = computed(() => workersStore.currentWorker);
    const attendanceColumns = getAttendanceColumns();
    const advanceColumns = getAdvanceColumns();
    const dailyWageColumns = getDailyWageColumns();
    const presentPct = computed(() => {
      const s = worker.value?.attendanceSummary;
      if (!s) return 0;
      const total = s.present + s.absent + s.leave;
      if (total === 0) return 0;
      return (s.present / total * 100).toFixed(1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/workers")
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
      if (unref(worker)) {
        _push(ssrRenderComponent(PageHeader, {
          title: unref(worker).name,
          description: `${unref(worker).role || "No role"} · ${unref(worker).phone || "No phone"}`
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(workersStore).loading) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
        _push(`</div>`);
      } else if (unref(worker)) {
        _push(`<!--[--><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Total Wages Earned`);
                        } else {
                          return [
                            createTextVNode("Total Wages Earned")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(DollarSign), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Total Wages Earned")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold text-green-600"${_scopeId2}>${ssrInterpolate(Number(unref(worker).totalWagesEarned || 0).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Default wage: ${ssrInterpolate(unref(worker).defaultDailyWage ? Number(unref(worker).defaultDailyWage).toFixed(2) : "Not set")}</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(Number(unref(worker).totalWagesEarned || 0).toFixed(2)), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Default wage: " + toDisplayString(unref(worker).defaultDailyWage ? Number(unref(worker).defaultDailyWage).toFixed(2) : "Not set"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Wages Earned")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(Number(unref(worker).totalWagesEarned || 0).toFixed(2)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Default wage: " + toDisplayString(unref(worker).defaultDailyWage ? Number(unref(worker).defaultDailyWage).toFixed(2) : "Not set"), 1)
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
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Advances Taken`);
                        } else {
                          return [
                            createTextVNode("Advances Taken")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(TrendingDown), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Advances Taken")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(TrendingDown), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold text-destructive"${_scopeId2}>${ssrInterpolate(Number(unref(worker).totalAdvancesTaken || 0).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>Outstanding loans</p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold text-destructive" }, toDisplayString(Number(unref(worker).totalAdvancesTaken || 0).toFixed(2)), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "Outstanding loans")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Advances Taken")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(TrendingDown), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold text-destructive" }, toDisplayString(Number(unref(worker).totalAdvancesTaken || 0).toFixed(2)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "Outstanding loans")
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
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Net Payout`);
                        } else {
                          return [
                            createTextVNode("Net Payout")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Wallet), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Net Payout")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Wallet), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="${ssrRenderClass([(unref(worker).netPayout || 0) >= 0 ? "text-green-600" : "text-destructive", "text-2xl font-bold"])}"${_scopeId2}>${ssrInterpolate(Number(unref(worker).netPayout || 0).toFixed(2))}</p>`);
                  } else {
                    return [
                      createVNode("p", {
                        class: ["text-2xl font-bold", (unref(worker).netPayout || 0) >= 0 ? "text-green-600" : "text-destructive"]
                      }, toDisplayString(Number(unref(worker).netPayout || 0).toFixed(2)), 3)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Net Payout")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Wallet), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", {
                      class: ["text-2xl font-bold", (unref(worker).netPayout || 0) >= 0 ? "text-green-600" : "text-destructive"]
                    }, toDisplayString(Number(unref(worker).netPayout || 0).toFixed(2)), 3)
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
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Attendance`);
                        } else {
                          return [
                            createTextVNode("Attendance")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Calendar), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode("Attendance")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Calendar), { class: "size-4 text-muted-foreground" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(presentPct))}%</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(worker).attendanceSummary?.present || 0)} present · ${ssrInterpolate(unref(worker).attendanceSummary?.absent || 0)} absent · ${ssrInterpolate(unref(worker).attendanceSummary?.leave || 0)} leave </p>`);
                  } else {
                    return [
                      createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(presentPct)) + "%", 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(worker).attendanceSummary?.present || 0) + " present · " + toDisplayString(unref(worker).attendanceSummary?.absent || 0) + " absent · " + toDisplayString(unref(worker).attendanceSummary?.leave || 0) + " leave ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Attendance")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Calendar), { class: "size-4 text-muted-foreground" })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(presentPct)) + "%", 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(worker).attendanceSummary?.present || 0) + " present · " + toDisplayString(unref(worker).attendanceSummary?.absent || 0) + " absent · " + toDisplayString(unref(worker).attendanceSummary?.leave || 0) + " leave ", 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="grid gap-6 lg:grid-cols-2">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Daily Wages`);
                        } else {
                          return [
                            createTextVNode("Daily Wages")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Wages earned per production batch`);
                        } else {
                          return [
                            createTextVNode("Wages earned per production batch")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Daily Wages")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Wages earned per production batch")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_AppTable, {
                      data: unref(worker).dailyWages || [],
                      columns: unref(dailyWageColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            title: "No wages recorded",
                            description: "No daily wages linked yet"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_EmptyState, {
                              title: "No wages recorded",
                              description: "No daily wages linked yet"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AppTable, {
                        data: unref(worker).dailyWages || [],
                        columns: unref(dailyWageColumns),
                        "show-search": false,
                        "show-column-toggle": false,
                        "show-pagination": false
                      }, {
                        empty: withCtx(() => [
                          createVNode(_component_EmptyState, {
                            title: "No wages recorded",
                            description: "No daily wages linked yet"
                          })
                        ]),
                        _: 1
                      }, 8, ["data", "columns"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Daily Wages")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Wages earned per production batch")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_AppTable, {
                      data: unref(worker).dailyWages || [],
                      columns: unref(dailyWageColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No wages recorded",
                          description: "No daily wages linked yet"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "columns"])
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
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Advances`);
                        } else {
                          return [
                            createTextVNode("Advances")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Financial advances taken`);
                        } else {
                          return [
                            createTextVNode("Financial advances taken")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Advances")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Financial advances taken")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_AppTable, {
                      data: unref(worker).advances || [],
                      columns: unref(advanceColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            title: "No advances",
                            description: "No advances recorded"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_EmptyState, {
                              title: "No advances",
                              description: "No advances recorded"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AppTable, {
                        data: unref(worker).advances || [],
                        columns: unref(advanceColumns),
                        "show-search": false,
                        "show-column-toggle": false,
                        "show-pagination": false
                      }, {
                        empty: withCtx(() => [
                          createVNode(_component_EmptyState, {
                            title: "No advances",
                            description: "No advances recorded"
                          })
                        ]),
                        _: 1
                      }, 8, ["data", "columns"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Advances")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Financial advances taken")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_AppTable, {
                      data: unref(worker).advances || [],
                      columns: unref(advanceColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No advances",
                          description: "No advances recorded"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "columns"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Attendance History`);
                        } else {
                          return [
                            createTextVNode("Attendance History")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Recent attendance records`);
                        } else {
                          return [
                            createTextVNode("Recent attendance records")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Attendance History")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Recent attendance records")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_AppTable, {
                      data: unref(worker).attendance || [],
                      columns: unref(attendanceColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_EmptyState, {
                            title: "No attendance records",
                            description: "Attendance not yet logged"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_EmptyState, {
                              title: "No attendance records",
                              description: "Attendance not yet logged"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_AppTable, {
                        data: unref(worker).attendance || [],
                        columns: unref(attendanceColumns),
                        "show-search": false,
                        "show-column-toggle": false,
                        "show-pagination": false
                      }, {
                        empty: withCtx(() => [
                          createVNode(_component_EmptyState, {
                            title: "No attendance records",
                            description: "Attendance not yet logged"
                          })
                        ]),
                        _: 1
                      }, 8, ["data", "columns"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Attendance History")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Recent attendance records")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_AppTable, {
                      data: unref(worker).attendance || [],
                      columns: unref(attendanceColumns),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No attendance records",
                          description: "Attendance not yet logged"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "columns"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/workers/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-G6GegpPI.mjs.map
