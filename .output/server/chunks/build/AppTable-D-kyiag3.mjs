import { _ as _sfc_main$1 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$d, a as _sfc_main$2, b as _sfc_main$b, c as _sfc_main$8, d as _sfc_main$5, e as _sfc_main$9 } from './DropdownMenuTrigger-CAUMwd2x.mjs';
import { _ as _sfc_main$3 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$4 } from './Checkbox-Yk18XaqA.mjs';
import { _ as _sfc_main$8$1, a as _sfc_main$6, b as _sfc_main$4$1, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5$1 } from './TableHeader-Cc67ZnYT.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { e as __nuxt_component_7 } from './CardTitle-CgdNZisr.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$c, c as _sfc_main$9$1, d as _sfc_main$7$1 } from './SelectValue-CdUm-rR7.mjs';
import { defineComponent, ref, computed, isRef, unref, withCtx, createVNode, createTextVNode, withModifiers, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useVueTable, getExpandedRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getCoreRowModel, FlexRender, isFunction } from '@tanstack/vue-table';
import { EyeOff, ChevronsUpDown, ChevronUp, ChevronDown, ChevronRight } from '@lucide/vue';

function valueUpdater(updaterOrValue, ref2) {
  ref2.value = isFunction(updaterOrValue) ? updaterOrValue(ref2.value) : updaterOrValue;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppTable",
  __ssrInlineRender: true,
  props: {
    data: {},
    columns: {},
    loading: { type: Boolean, default: false },
    serverTotal: { default: 0 },
    defaultPageSize: { default: 10 },
    pageSizeOptions: { default: () => [10, 20, 30, 50] },
    searchPlaceholder: { default: "Search..." },
    showSearch: { type: Boolean, default: true },
    showColumnToggle: { type: Boolean, default: true },
    showPagination: { type: Boolean, default: true },
    enableExpand: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const sorting = ref([]);
    const expanded = ref({});
    const globalFilter = ref("");
    const columnVisibility = ref({});
    const pagination = ref({
      pageIndex: 0,
      pageSize: props.defaultPageSize
    });
    const table = useVueTable({
      get data() {
        return props.data;
      },
      get columns() {
        return props.columns;
      },
      state: {
        get sorting() {
          return sorting.value;
        },
        get expanded() {
          return expanded.value;
        },
        get globalFilter() {
          return globalFilter.value;
        },
        get columnVisibility() {
          return columnVisibility.value;
        },
        get pagination() {
          return pagination.value;
        }
      },
      onSortingChange: (updater) => valueUpdater(updater, sorting),
      onExpandedChange: (updater) => valueUpdater(updater, expanded),
      onGlobalFilterChange: (updater) => valueUpdater(updater, globalFilter),
      onColumnVisibilityChange: (updater) => valueUpdater(updater, columnVisibility),
      onPaginationChange: (updater) => valueUpdater(updater, pagination),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      globalFilterFn: "includesString",
      enableExpanding: props.enableExpand,
      getRowCanExpand: () => props.enableExpand,
      enableSortingRemoval: false
    });
    const totalFiltered = computed(() => table.getFilteredRowModel().rows.length);
    const totalData = computed(() => props.data.length);
    const columnLength = computed(() => table.getAllColumns().length);
    const pageCount = computed(() => {
      if (props.serverTotal) {
        return Math.ceil(props.serverTotal / table.getState().pagination.pageSize);
      }
      return table.getPageCount();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$1;
      const _component_UiDropdownMenu = _sfc_main$d;
      const _component_UiDropdownMenuTrigger = _sfc_main$2;
      const _component_UiButton = _sfc_main$3;
      const _component_UiDropdownMenuContent = _sfc_main$b;
      const _component_UiDropdownMenuLabel = _sfc_main$8;
      const _component_UiDropdownMenuSeparator = _sfc_main$5;
      const _component_UiDropdownMenuItem = _sfc_main$9;
      const _component_UiCheckbox = _sfc_main$4;
      const _component_UiTable = _sfc_main$8$1;
      const _component_UiTableHeader = _sfc_main$6;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$1;
      const _component_UiTableBody = _sfc_main$7;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$c;
      const _component_UiSelectContent = _sfc_main$9$1;
      const _component_UiSelectItem = _sfc_main$7$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.showSearch || __props.showColumnToggle) {
        _push(`<div class="flex items-center justify-between pb-4">`);
        if (__props.showSearch) {
          _push(ssrRenderComponent(_component_UiInput, {
            modelValue: unref(globalFilter),
            "onUpdate:modelValue": ($event) => isRef(globalFilter) ? globalFilter.value = $event : null,
            placeholder: __props.searchPlaceholder,
            class: "max-w-sm"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.showColumnToggle) {
          _push(ssrRenderComponent(_component_UiDropdownMenu, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "outline",
                        size: "sm"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(EyeOff), { class: "size-4" }, null, _parent4, _scopeId3));
                            _push4(` Columns `);
                          } else {
                            return [
                              createVNode(unref(EyeOff), { class: "size-4" }),
                              createTextVNode(" Columns ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(EyeOff), { class: "size-4" }),
                            createTextVNode(" Columns ")
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiDropdownMenuContent, {
                  align: "end",
                  class: "w-48"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiDropdownMenuLabel, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Column Visibility`);
                          } else {
                            return [
                              createTextVNode("Column Visibility")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiDropdownMenuSeparator, null, null, _parent3, _scopeId2));
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(table).getAllColumns().filter((col) => col.getCanHide()), (column) => {
                        _push3(ssrRenderComponent(_component_UiDropdownMenuItem, {
                          key: column.id,
                          onClick: ($event) => column.toggleVisibility()
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_UiCheckbox, {
                                "model-value": column.getIsVisible(),
                                onClick: ($event) => column.toggleVisibility()
                              }, null, _parent4, _scopeId3));
                              _push4(`<span class="capitalize"${_scopeId3}>${ssrInterpolate(column.id)}</span></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode(_component_UiCheckbox, {
                                    "model-value": column.getIsVisible(),
                                    onClick: withModifiers(($event) => column.toggleVisibility(), ["stop"])
                                  }, null, 8, ["model-value", "onClick"]),
                                  createVNode("span", { class: "capitalize" }, toDisplayString(column.id), 1)
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        createVNode(_component_UiDropdownMenuLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Column Visibility")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDropdownMenuSeparator),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((col) => col.getCanHide()), (column) => {
                          return openBlock(), createBlock(_component_UiDropdownMenuItem, {
                            key: column.id,
                            onClick: ($event) => column.toggleVisibility()
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(_component_UiCheckbox, {
                                  "model-value": column.getIsVisible(),
                                  onClick: withModifiers(($event) => column.toggleVisibility(), ["stop"])
                                }, null, 8, ["model-value", "onClick"]),
                                createVNode("span", { class: "capitalize" }, toDisplayString(column.id), 1)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(EyeOff), { class: "size-4" }),
                          createTextVNode(" Columns ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiDropdownMenuContent, {
                    align: "end",
                    class: "w-48"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UiDropdownMenuLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Column Visibility")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDropdownMenuSeparator),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getAllColumns().filter((col) => col.getCanHide()), (column) => {
                        return openBlock(), createBlock(_component_UiDropdownMenuItem, {
                          key: column.id,
                          onClick: ($event) => column.toggleVisibility()
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(_component_UiCheckbox, {
                                "model-value": column.getIsVisible(),
                                onClick: withModifiers(($event) => column.toggleVisibility(), ["stop"])
                              }, null, 8, ["model-value", "onClick"]),
                              createVNode("span", { class: "capitalize" }, toDisplayString(column.id), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="rounded-md border">`);
      _push(ssrRenderComponent(_component_UiTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiTableHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiTableRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.enableExpand) {
                          _push4(ssrRenderComponent(_component_UiTableHead, { class: "w-10" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(table).getFlatHeaders(), (header) => {
                          _push4(ssrRenderComponent(_component_UiTableHead, {
                            key: header.id,
                            class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                            onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-1"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(FlexRender), {
                                  render: header.column.columnDef.header,
                                  props: header.getContext()
                                }, null, _parent5, _scopeId4));
                                if (header.column.getCanSort() && !header.column.getIsSorted()) {
                                  _push5(ssrRenderComponent(unref(ChevronsUpDown), { class: "size-3.5 text-muted-foreground" }, null, _parent5, _scopeId4));
                                } else if (header.column.getIsSorted() === "asc") {
                                  _push5(ssrRenderComponent(unref(ChevronUp), { class: "size-3.5" }, null, _parent5, _scopeId4));
                                } else if (header.column.getIsSorted() === "desc") {
                                  _push5(ssrRenderComponent(unref(ChevronDown), { class: "size-3.5" }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                    createVNode(unref(FlexRender), {
                                      render: header.column.columnDef.header,
                                      props: header.getContext()
                                    }, null, 8, ["render", "props"]),
                                    header.column.getCanSort() && !header.column.getIsSorted() ? (openBlock(), createBlock(unref(ChevronsUpDown), {
                                      key: 0,
                                      class: "size-3.5 text-muted-foreground"
                                    })) : header.column.getIsSorted() === "asc" ? (openBlock(), createBlock(unref(ChevronUp), {
                                      key: 1,
                                      class: "size-3.5"
                                    })) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock(unref(ChevronDown), {
                                      key: 2,
                                      class: "size-3.5"
                                    })) : createCommentVNode("", true)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          __props.enableExpand ? (openBlock(), createBlock(_component_UiTableHead, {
                            key: 0,
                            class: "w-10"
                          })) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getFlatHeaders(), (header) => {
                            return openBlock(), createBlock(_component_UiTableHead, {
                              key: header.id,
                              class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                              onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  createVNode(unref(FlexRender), {
                                    render: header.column.columnDef.header,
                                    props: header.getContext()
                                  }, null, 8, ["render", "props"]),
                                  header.column.getCanSort() && !header.column.getIsSorted() ? (openBlock(), createBlock(unref(ChevronsUpDown), {
                                    key: 0,
                                    class: "size-3.5 text-muted-foreground"
                                  })) : header.column.getIsSorted() === "asc" ? (openBlock(), createBlock(unref(ChevronUp), {
                                    key: 1,
                                    class: "size-3.5"
                                  })) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock(unref(ChevronDown), {
                                    key: 2,
                                    class: "size-3.5"
                                  })) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["class", "onClick"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTableRow, null, {
                      default: withCtx(() => [
                        __props.enableExpand ? (openBlock(), createBlock(_component_UiTableHead, {
                          key: 0,
                          class: "w-10"
                        })) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getFlatHeaders(), (header) => {
                          return openBlock(), createBlock(_component_UiTableHead, {
                            key: header.id,
                            class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                            onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-1" }, [
                                createVNode(unref(FlexRender), {
                                  render: header.column.columnDef.header,
                                  props: header.getContext()
                                }, null, 8, ["render", "props"]),
                                header.column.getCanSort() && !header.column.getIsSorted() ? (openBlock(), createBlock(unref(ChevronsUpDown), {
                                  key: 0,
                                  class: "size-3.5 text-muted-foreground"
                                })) : header.column.getIsSorted() === "asc" ? (openBlock(), createBlock(unref(ChevronUp), {
                                  key: 1,
                                  class: "size-3.5"
                                })) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock(unref(ChevronDown), {
                                  key: 2,
                                  class: "size-3.5"
                                })) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["class", "onClick"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTableBody, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.loading) {
                    _push3(ssrRenderComponent(_component_UiTableRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiTableCell, {
                            colspan: unref(columnLength) + (__props.enableExpand ? 1 : 0),
                            class: "p-0"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_LoadingState, { count: 5 }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_LoadingState, { count: 5 })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiTableCell, {
                              colspan: unref(columnLength) + (__props.enableExpand ? 1 : 0),
                              class: "p-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_LoadingState, { count: 5 })
                              ]),
                              _: 1
                            }, 8, ["colspan"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else if (unref(table).getRowModel().rows.length === 0) {
                    _push3(ssrRenderComponent(_component_UiTableRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiTableCell, {
                            colspan: unref(columnLength) + (__props.enableExpand ? 1 : 0)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                ssrRenderSlot(_ctx.$slots, "empty", {}, () => {
                                  _push5(ssrRenderComponent(_component_EmptyState, {
                                    title: "No results",
                                    description: "No data found matching your criteria."
                                  }, null, _parent5, _scopeId4));
                                }, _push5, _parent5, _scopeId4);
                              } else {
                                return [
                                  renderSlot(_ctx.$slots, "empty", {}, () => [
                                    createVNode(_component_EmptyState, {
                                      title: "No results",
                                      description: "No data found matching your criteria."
                                    })
                                  ])
                                ];
                              }
                            }),
                            _: 3
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiTableCell, {
                              colspan: unref(columnLength) + (__props.enableExpand ? 1 : 0)
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "empty", {}, () => [
                                  createVNode(_component_EmptyState, {
                                    title: "No results",
                                    description: "No data found matching your criteria."
                                  })
                                ])
                              ]),
                              _: 3
                            }, 8, ["colspan"])
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(table).getRowModel().rows, (row) => {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(_component_UiTableRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (__props.enableExpand && row.getCanExpand()) {
                            _push4(ssrRenderComponent(_component_UiTableCell, { class: "w-10" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_UiButton, {
                                    variant: "ghost",
                                    size: "icon-xs",
                                    onClick: ($event) => row.toggleExpanded()
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (!row.getIsExpanded()) {
                                          _push6(ssrRenderComponent(unref(ChevronRight), { class: "size-4" }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(ssrRenderComponent(unref(ChevronDown), { class: "size-4" }, null, _parent6, _scopeId5));
                                        }
                                      } else {
                                        return [
                                          !row.getIsExpanded() ? (openBlock(), createBlock(unref(ChevronRight), {
                                            key: 0,
                                            class: "size-4"
                                          })) : (openBlock(), createBlock(unref(ChevronDown), {
                                            key: 1,
                                            class: "size-4"
                                          }))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_UiButton, {
                                      variant: "ghost",
                                      size: "icon-xs",
                                      onClick: ($event) => row.toggleExpanded()
                                    }, {
                                      default: withCtx(() => [
                                        !row.getIsExpanded() ? (openBlock(), createBlock(unref(ChevronRight), {
                                          key: 0,
                                          class: "size-4"
                                        })) : (openBlock(), createBlock(unref(ChevronDown), {
                                          key: 1,
                                          class: "size-4"
                                        }))
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--[-->`);
                          ssrRenderList(row.getVisibleCells(), (cell) => {
                            _push4(ssrRenderComponent(_component_UiTableCell, {
                              key: cell.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  ssrRenderSlot(_ctx.$slots, `cell-${cell.column.id}`, {
                                    row,
                                    cell,
                                    getValue: cell.getValue
                                  }, () => {
                                    _push5(ssrRenderComponent(unref(FlexRender), {
                                      render: cell.column.columnDef.cell,
                                      props: cell.getContext()
                                    }, null, _parent5, _scopeId4));
                                  }, _push5, _parent5, _scopeId4);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, `cell-${cell.column.id}`, {
                                      row,
                                      cell,
                                      getValue: cell.getValue
                                    }, () => [
                                      createVNode(unref(FlexRender), {
                                        render: cell.column.columnDef.cell,
                                        props: cell.getContext()
                                      }, null, 8, ["render", "props"])
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            __props.enableExpand && row.getCanExpand() ? (openBlock(), createBlock(_component_UiTableCell, {
                              key: 0,
                              class: "w-10"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiButton, {
                                  variant: "ghost",
                                  size: "icon-xs",
                                  onClick: ($event) => row.toggleExpanded()
                                }, {
                                  default: withCtx(() => [
                                    !row.getIsExpanded() ? (openBlock(), createBlock(unref(ChevronRight), {
                                      key: 0,
                                      class: "size-4"
                                    })) : (openBlock(), createBlock(unref(ChevronDown), {
                                      key: 1,
                                      class: "size-4"
                                    }))
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                              return openBlock(), createBlock(_component_UiTableCell, {
                                key: cell.id
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, `cell-${cell.column.id}`, {
                                    row,
                                    cell,
                                    getValue: cell.getValue
                                  }, () => [
                                    createVNode(unref(FlexRender), {
                                      render: cell.column.columnDef.cell,
                                      props: cell.getContext()
                                    }, null, 8, ["render", "props"])
                                  ])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (__props.enableExpand && row.getIsExpanded()) {
                      _push3(ssrRenderComponent(_component_UiTableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UiTableCell, {
                              colspan: unref(columnLength) + 1
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  ssrRenderSlot(_ctx.$slots, "expand", { row }, () => {
                                    _push5(`<div class="text-muted-foreground p-4 text-center text-sm"${_scopeId4}> No expand content provided. </div>`);
                                  }, _push5, _parent5, _scopeId4);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, "expand", { row }, () => [
                                      createVNode("div", { class: "text-muted-foreground p-4 text-center text-sm" }, " No expand content provided. ")
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_UiTableCell, {
                                colspan: unref(columnLength) + 1
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "expand", { row }, () => [
                                    createVNode("div", { class: "text-muted-foreground p-4 text-center text-sm" }, " No expand content provided. ")
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["colspan"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    __props.loading ? (openBlock(), createBlock(_component_UiTableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableCell, {
                          colspan: unref(columnLength) + (__props.enableExpand ? 1 : 0),
                          class: "p-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_LoadingState, { count: 5 })
                          ]),
                          _: 1
                        }, 8, ["colspan"])
                      ]),
                      _: 1
                    })) : unref(table).getRowModel().rows.length === 0 ? (openBlock(), createBlock(_component_UiTableRow, { key: 1 }, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableCell, {
                          colspan: unref(columnLength) + (__props.enableExpand ? 1 : 0)
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "empty", {}, () => [
                              createVNode(_component_EmptyState, {
                                title: "No results",
                                description: "No data found matching your criteria."
                              })
                            ])
                          ]),
                          _: 3
                        }, 8, ["colspan"])
                      ]),
                      _: 3
                    })) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getRowModel().rows, (row) => {
                      return openBlock(), createBlock(Fragment, {
                        key: row.id
                      }, [
                        createVNode(_component_UiTableRow, null, {
                          default: withCtx(() => [
                            __props.enableExpand && row.getCanExpand() ? (openBlock(), createBlock(_component_UiTableCell, {
                              key: 0,
                              class: "w-10"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiButton, {
                                  variant: "ghost",
                                  size: "icon-xs",
                                  onClick: ($event) => row.toggleExpanded()
                                }, {
                                  default: withCtx(() => [
                                    !row.getIsExpanded() ? (openBlock(), createBlock(unref(ChevronRight), {
                                      key: 0,
                                      class: "size-4"
                                    })) : (openBlock(), createBlock(unref(ChevronDown), {
                                      key: 1,
                                      class: "size-4"
                                    }))
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                              return openBlock(), createBlock(_component_UiTableCell, {
                                key: cell.id
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, `cell-${cell.column.id}`, {
                                    row,
                                    cell,
                                    getValue: cell.getValue
                                  }, () => [
                                    createVNode(unref(FlexRender), {
                                      render: cell.column.columnDef.cell,
                                      props: cell.getContext()
                                    }, null, 8, ["render", "props"])
                                  ])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024),
                        __props.enableExpand && row.getIsExpanded() ? (openBlock(), createBlock(_component_UiTableRow, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_UiTableCell, {
                              colspan: unref(columnLength) + 1
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "expand", { row }, () => [
                                  createVNode("div", { class: "text-muted-foreground p-4 text-center text-sm" }, " No expand content provided. ")
                                ])
                              ]),
                              _: 2
                            }, 1032, ["colspan"])
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiTableHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTableRow, null, {
                    default: withCtx(() => [
                      __props.enableExpand ? (openBlock(), createBlock(_component_UiTableHead, {
                        key: 0,
                        class: "w-10"
                      })) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getFlatHeaders(), (header) => {
                        return openBlock(), createBlock(_component_UiTableHead, {
                          key: header.id,
                          class: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                          onClick: ($event) => header.column.getToggleSortingHandler()?.($event)
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createVNode(unref(FlexRender), {
                                render: header.column.columnDef.header,
                                props: header.getContext()
                              }, null, 8, ["render", "props"]),
                              header.column.getCanSort() && !header.column.getIsSorted() ? (openBlock(), createBlock(unref(ChevronsUpDown), {
                                key: 0,
                                class: "size-3.5 text-muted-foreground"
                              })) : header.column.getIsSorted() === "asc" ? (openBlock(), createBlock(unref(ChevronUp), {
                                key: 1,
                                class: "size-3.5"
                              })) : header.column.getIsSorted() === "desc" ? (openBlock(), createBlock(unref(ChevronDown), {
                                key: 2,
                                class: "size-3.5"
                              })) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class", "onClick"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTableBody, null, {
                default: withCtx(() => [
                  __props.loading ? (openBlock(), createBlock(_component_UiTableRow, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(_component_UiTableCell, {
                        colspan: unref(columnLength) + (__props.enableExpand ? 1 : 0),
                        class: "p-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_LoadingState, { count: 5 })
                        ]),
                        _: 1
                      }, 8, ["colspan"])
                    ]),
                    _: 1
                  })) : unref(table).getRowModel().rows.length === 0 ? (openBlock(), createBlock(_component_UiTableRow, { key: 1 }, {
                    default: withCtx(() => [
                      createVNode(_component_UiTableCell, {
                        colspan: unref(columnLength) + (__props.enableExpand ? 1 : 0)
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "empty", {}, () => [
                            createVNode(_component_EmptyState, {
                              title: "No results",
                              description: "No data found matching your criteria."
                            })
                          ])
                        ]),
                        _: 3
                      }, 8, ["colspan"])
                    ]),
                    _: 3
                  })) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(table).getRowModel().rows, (row) => {
                    return openBlock(), createBlock(Fragment, {
                      key: row.id
                    }, [
                      createVNode(_component_UiTableRow, null, {
                        default: withCtx(() => [
                          __props.enableExpand && row.getCanExpand() ? (openBlock(), createBlock(_component_UiTableCell, {
                            key: 0,
                            class: "w-10"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiButton, {
                                variant: "ghost",
                                size: "icon-xs",
                                onClick: ($event) => row.toggleExpanded()
                              }, {
                                default: withCtx(() => [
                                  !row.getIsExpanded() ? (openBlock(), createBlock(unref(ChevronRight), {
                                    key: 0,
                                    class: "size-4"
                                  })) : (openBlock(), createBlock(unref(ChevronDown), {
                                    key: 1,
                                    class: "size-4"
                                  }))
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                            return openBlock(), createBlock(_component_UiTableCell, {
                              key: cell.id
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, `cell-${cell.column.id}`, {
                                  row,
                                  cell,
                                  getValue: cell.getValue
                                }, () => [
                                  createVNode(unref(FlexRender), {
                                    render: cell.column.columnDef.cell,
                                    props: cell.getContext()
                                  }, null, 8, ["render", "props"])
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024),
                      __props.enableExpand && row.getIsExpanded() ? (openBlock(), createBlock(_component_UiTableRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_UiTableCell, {
                            colspan: unref(columnLength) + 1
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "expand", { row }, () => [
                                createVNode("div", { class: "text-muted-foreground p-4 text-center text-sm" }, " No expand content provided. ")
                              ])
                            ]),
                            _: 2
                          }, 1032, ["colspan"])
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true)
                    ], 64);
                  }), 128))
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
      if (__props.showPagination && unref(pageCount) > 0) {
        _push(`<div class="flex items-center justify-between py-4"><p class="text-sm text-muted-foreground">${ssrInterpolate(unref(totalFiltered))} of ${ssrInterpolate(unref(totalData))} row(s) </p><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "outline",
          size: "sm",
          disabled: !unref(table).getCanPreviousPage(),
          onClick: ($event) => unref(table).previousPage()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Previous `);
            } else {
              return [
                createTextVNode(" Previous ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<p class="text-sm text-muted-foreground min-w-20 text-center"> Page ${ssrInterpolate(unref(table).getState().pagination.pageIndex + 1)} of ${ssrInterpolate(unref(pageCount))}</p>`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "outline",
          size: "sm",
          disabled: !unref(table).getCanNextPage(),
          onClick: ($event) => unref(table).nextPage()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Next `);
            } else {
              return [
                createTextVNode(" Next ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiSelect, {
          "model-value": String(unref(table).getState().pagination.pageSize),
          "onUpdate:modelValue": ($event) => unref(table).setPageSize(Number($event))
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-[70px]" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiSelectValue, null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiSelectValue)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiSelectContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.pageSizeOptions, (size) => {
                      _push3(ssrRenderComponent(_component_UiSelectItem, {
                        key: size,
                        value: String(size)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(size)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(size), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.pageSizeOptions, (size) => {
                        return openBlock(), createBlock(_component_UiSelectItem, {
                          key: size,
                          value: String(size)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(size), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiSelectTrigger, { class: "w-[70px]" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiSelectValue)
                  ]),
                  _: 1
                }),
                createVNode(_component_UiSelectContent, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.pageSizeOptions, (size) => {
                      return openBlock(), createBlock(_component_UiSelectItem, {
                        key: size,
                        value: String(size)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(size), 1)
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/AppTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main, { __name: "AppTable" });

export { __nuxt_component_10 as _ };
//# sourceMappingURL=AppTable-D-kyiag3.mjs.map
