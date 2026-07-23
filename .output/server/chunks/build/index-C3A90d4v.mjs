import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, d as _sfc_main$4, e as __nuxt_component_7, c as _sfc_main$3$1 } from './CardTitle-CgdNZisr.mjs';
import { _ as _sfc_main$3 } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$5, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_10 } from './AppTable-D-kyiag3.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$3, d as _sfc_main$5$1, e as _sfc_main$4$1 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$8 } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$b } from './Textarea-B_fNd96X.mjs';
import { _ as __nuxt_component_20 } from './ConfirmDialog-B8hxYJp1.mjs';
import { defineComponent, ref, reactive, computed, watch, resolveDirective, mergeProps, withCtx, unref, createVNode, createTextVNode, withDirectives, openBlock, createBlock, toDisplayString, isRef, Fragment, renderList, withModifiers, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Plus, DollarSign, PieChart, Pencil, Trash2 } from '@lucide/vue';
import { b as usePermissions } from './server.mjs';
import { _ as _sfc_main$c } from './index-CaQj38bB.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { toast } from 'vue-sonner';
import { defineStore } from 'pinia';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './DropdownMenuTrigger-CAUMwd2x.mjs';
import './Checkbox-Yk18XaqA.mjs';
import './TableHeader-Cc67ZnYT.mjs';
import './LoadingState-CyiqDoob.mjs';
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
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';

function getExpenseColumns(actions) {
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => h("span", { class: "font-medium" }, row.original.title)
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => h(_sfc_main$c, { variant: "secondary", class: "text-xs" }, row.original.category)
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => h(
        "span",
        { class: "tabular-nums font-medium text-destructive" },
        Number(row.original.amount).toFixed(2)
      )
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => h(
        "span",
        { class: "text-sm text-muted-foreground" },
        new Date(row.original.date).toLocaleDateString()
      )
    },
    {
      accessorKey: "createdBy.name",
      header: "Created By",
      cell: ({ row }) => h(
        "span",
        { class: "text-sm text-muted-foreground" },
        row.original.createdBy?.name || "—"
      )
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => h(
        "span",
        { class: "text-sm text-muted-foreground" },
        row.original.notes || "—"
      )
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const e = row.original;
        const { can } = usePermissions();
        const canEdit = can("EXPENSES", "UPDATE");
        const canDelete = can("EXPENSES", "DELETE");
        const buttons = [];
        if (canEdit) {
          buttons.push(h(_sfc_main$1, { variant: "ghost", size: "icon-xs", onClick: () => actions.onEdit(e) }, () => h(Pencil, { class: "size-3.5" })));
        }
        if (canDelete) {
          buttons.push(h(_sfc_main$1, { variant: "ghost", size: "icon-xs", class: "text-destructive", onClick: () => actions.onDelete(e) }, () => h(Trash2, { class: "size-3.5" })));
        }
        return h("div", { class: "flex gap-1" }, buttons);
      }
    }
  ];
}
async function fetchExpensesApi(params) {
  return $fetch("/api/expenses", { params });
}
async function createExpenseApi(payload) {
  return $fetch("/api/expenses", { method: "POST", body: payload });
}
async function updateExpenseApi(id, payload) {
  return $fetch(`/api/expenses/${id}`, { method: "PATCH", body: payload });
}
async function deleteExpenseApi(id) {
  await $fetch(`/api/expenses/${id}`, { method: "DELETE" });
}
const useExpensesStore = defineStore("expenses", () => {
  const expenses = ref([]);
  const loading = ref(false);
  const total = ref(0);
  const categories = ref([]);
  async function fetchExpenses(params) {
    loading.value = true;
    try {
      const data = await fetchExpensesApi(params);
      expenses.value = data.expenses;
      total.value = data.total;
      categories.value = data.categories;
      return data;
    } finally {
      loading.value = false;
    }
  }
  async function createExpense(payload) {
    loading.value = true;
    try {
      const data = await createExpenseApi(payload);
      expenses.value.unshift(data.expense);
      return data.expense;
    } finally {
      loading.value = false;
    }
  }
  async function updateExpense(id, payload) {
    loading.value = true;
    try {
      const data = await updateExpenseApi(id, payload);
      const idx = expenses.value.findIndex((e) => e.id === id);
      if (idx !== -1) expenses.value[idx] = data.expense;
      return data.expense;
    } finally {
      loading.value = false;
    }
  }
  async function deleteExpense(id) {
    loading.value = true;
    try {
      await deleteExpenseApi(id);
      expenses.value = expenses.value.filter((e) => e.id !== id);
    } finally {
      loading.value = false;
    }
  }
  return {
    expenses,
    loading,
    total,
    categories,
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense
  };
});
const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const expensesStore = useExpensesStore();
    const search = ref("");
    const categoryFilter = ref("__all__");
    const page = ref(1);
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const editingExpense = ref(null);
    const deletingExpense = ref(null);
    const createForm = reactive({
      title: "",
      amount: null,
      category: "",
      notes: "",
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    const editForm = reactive({
      title: "",
      amount: null,
      category: "",
      notes: "",
      date: ""
    });
    const expenseActions = {
      onEdit: (expense) => openEdit(expense),
      onDelete: (expense) => openDelete(expense)
    };
    const columns = getExpenseColumns(expenseActions);
    const totalByCategory = computed(() => {
      if (!expensesStore.categories.length) return [];
      return expensesStore.categories.map((c) => ({
        category: c.category,
        amount: c._sum.amount || 0,
        count: c._count
      })).sort((a, b) => b.amount - a.amount);
    });
    const totalExpensesAmount = computed(
      () => expensesStore.expenses.reduce((s, e) => s + Number(e.amount), 0)
    );
    const debouncedSearch = ref("");
    watch(search, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedSearch.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    watch(debouncedSearch, () => {
      page.value = 1;
      fetchData();
    });
    watch(categoryFilter, () => {
      page.value = 1;
      fetchData();
    });
    watch(page, fetchData);
    async function fetchData() {
      await expensesStore.fetchExpenses({
        search: debouncedSearch.value || void 0,
        category: categoryFilter.value === "__all__" ? void 0 : categoryFilter.value,
        page: page.value,
        limit
      });
    }
    async function handleCreate() {
      if (!createForm.title || !createForm.amount || !createForm.category) {
        toast.error("Title, amount, and category are required");
        return;
      }
      try {
        await expensesStore.createExpense(createForm);
        showCreateDialog.value = false;
        resetCreateForm();
        toast.success("Expense recorded");
      } catch {
        toast.error("Failed to create expense");
      }
    }
    function resetCreateForm() {
      createForm.title = "";
      createForm.amount = null;
      createForm.category = "";
      createForm.notes = "";
      createForm.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    }
    function openEdit(expense) {
      editingExpense.value = expense;
      editForm.title = expense.title;
      editForm.amount = Number(expense.amount);
      editForm.category = expense.category;
      editForm.notes = expense.notes ?? "";
      editForm.date = expense.date ? expense.date.split("T")[0] || "" : "";
      showEditDialog.value = true;
    }
    async function handleEdit() {
      if (!editingExpense.value) return;
      try {
        await expensesStore.updateExpense(editingExpense.value.id, editForm);
        showEditDialog.value = false;
        editingExpense.value = null;
        toast.success("Expense updated");
      } catch {
        toast.error("Failed to update expense");
      }
    }
    function openDelete(expense) {
      deletingExpense.value = expense;
      showDeleteDialog.value = true;
    }
    async function handleDelete() {
      if (!deletingExpense.value) return;
      try {
        await expensesStore.deleteExpense(deletingExpense.value.id);
        showDeleteDialog.value = false;
        deletingExpense.value = null;
        toast.success("Expense deleted");
      } catch {
        toast.error("Failed to delete expense");
      }
    }
    const EXPENSE_CATEGORIES = [
      "Utilities",
      "Transport",
      "Maintenance",
      "Salaries",
      "Raw Materials",
      "Packaging",
      "Equipment",
      "Rent",
      "Office",
      "Marketing",
      "Other"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiInput = _sfc_main$3;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$5;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiDialog = _sfc_main$9$1;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$2;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5$1;
      const _component_UiLabel = _sfc_main$8;
      const _component_UiTextarea = _sfc_main$b;
      const _component_UiDialogFooter = _sfc_main$4$1;
      const _component_ConfirmDialog = __nuxt_component_20;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Expenses",
        description: "Track and manage all operating expenses"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              onClick: ($event) => showCreateDialog.value = true
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "EXPENSES", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Add Expense `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "size-4" }),
                    createTextVNode(" Add Expense ")
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
                  createTextVNode(" Add Expense ")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "EXPENSES", action: "CREATE" }]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2 flex flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total Expenses`);
                      } else {
                        return [
                          createTextVNode("Total Expenses")
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
                        createTextVNode("Total Expenses")
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
                  _push3(`<p class="text-2xl font-bold text-destructive"${_scopeId2}>${ssrInterpolate(unref(totalExpensesAmount).toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(expensesStore).total)} records</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold text-destructive" }, toDisplayString(unref(totalExpensesAmount).toFixed(2)), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(expensesStore).total) + " records", 1)
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
                      createTextVNode("Total Expenses")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(DollarSign), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold text-destructive" }, toDisplayString(unref(totalExpensesAmount).toFixed(2)), 1),
                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(expensesStore).total) + " records", 1)
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
                        _push4(`Categories`);
                      } else {
                        return [
                          createTextVNode("Categories")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(PieChart), { class: "size-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-muted-foreground" }, {
                      default: withCtx(() => [
                        createTextVNode("Categories")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(PieChart), { class: "size-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(totalByCategory).length)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalByCategory).length), 1)
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
                      createTextVNode("Categories")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(PieChart), { class: "size-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(totalByCategory).length), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid gap-6 lg:grid-cols-3"><div class="lg:col-span-2">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(search),
                    "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                    placeholder: "Search expenses...",
                    class: "max-w-xs"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(categoryFilter),
                    "onUpdate:modelValue": ($event) => isRef(categoryFilter) ? categoryFilter.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "All categories" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue, { placeholder: "All categories" })
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
                                    _push6(`All categories`);
                                  } else {
                                    return [
                                      createTextVNode("All categories")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(EXPENSE_CATEGORIES, (c) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: c,
                                  value: c
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(c)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(c), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                  default: withCtx(() => [
                                    createTextVNode("All categories")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: c,
                                    value: c
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(c), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All categories" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx(() => [
                                  createTextVNode("All categories")
                                ]),
                                _: 1
                              }),
                              (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: c,
                                  value: c
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(c), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
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
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UiInput, {
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        placeholder: "Search expenses...",
                        class: "max-w-xs"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(categoryFilter),
                        "onUpdate:modelValue": ($event) => isRef(categoryFilter) ? categoryFilter.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All categories" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "__all__" }, {
                                default: withCtx(() => [
                                  createTextVNode("All categories")
                                ]),
                                _: 1
                              }),
                              (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: c,
                                  value: c
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(c), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
                    data: unref(expensesStore).expenses,
                    columns: unref(columns),
                    loading: unref(expensesStore).loading,
                    "server-total": unref(expensesStore).total,
                    "show-search": "",
                    "search-placeholder": "Search..."
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No expenses found",
                          description: "Record your first expense",
                          action: "Add Expense",
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No expenses found",
                            description: "Record your first expense",
                            action: "Add Expense",
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
                      data: unref(expensesStore).expenses,
                      columns: unref(columns),
                      loading: unref(expensesStore).loading,
                      "server-total": unref(expensesStore).total,
                      "show-search": "",
                      "search-placeholder": "Search..."
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No expenses found",
                          description: "Record your first expense",
                          action: "Add Expense",
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
                    createVNode(_component_UiInput, {
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      placeholder: "Search expenses...",
                      class: "max-w-xs"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UiSelect, {
                      modelValue: unref(categoryFilter),
                      "onUpdate:modelValue": ($event) => isRef(categoryFilter) ? categoryFilter.value = $event : null
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiSelectTrigger, { class: "w-40" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectValue, { placeholder: "All categories" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelectContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectItem, { value: "__all__" }, {
                              default: withCtx(() => [
                                createTextVNode("All categories")
                              ]),
                              _: 1
                            }),
                            (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                              return createVNode(_component_UiSelectItem, {
                                key: c,
                                value: c
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(c), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(expensesStore).expenses,
                    columns: unref(columns),
                    loading: unref(expensesStore).loading,
                    "server-total": unref(expensesStore).total,
                    "show-search": "",
                    "search-placeholder": "Search..."
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No expenses found",
                        description: "Record your first expense",
                        action: "Add Expense",
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
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`By Category`);
                      } else {
                        return [
                          createTextVNode("By Category")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Expense breakdown`);
                      } else {
                        return [
                          createTextVNode("Expense breakdown")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("By Category")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Expense breakdown")
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
                  if (unref(totalByCategory).length === 0) {
                    _push3(`<div class="py-6"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No data",
                      description: "No expenses recorded"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(totalByCategory), (c) => {
                      _push3(`<div class="flex items-center justify-between"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><div class="size-2 rounded-full bg-primary/60"${_scopeId2}></div><span class="text-sm"${_scopeId2}>${ssrInterpolate(c.category)}</span></div><div class="text-right"${_scopeId2}><p class="text-sm font-medium tabular-nums"${_scopeId2}>${ssrInterpolate(c.amount.toFixed(2))}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(c.count)} entries</p></div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                } else {
                  return [
                    unref(totalByCategory).length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-6"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No data",
                        description: "No expenses recorded"
                      })
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(totalByCategory), (c) => {
                        return openBlock(), createBlock("div", {
                          key: c.category,
                          class: "flex items-center justify-between"
                        }, [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode("div", { class: "size-2 rounded-full bg-primary/60" }),
                            createVNode("span", { class: "text-sm" }, toDisplayString(c.category), 1)
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("p", { class: "text-sm font-medium tabular-nums" }, toDisplayString(c.amount.toFixed(2)), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(c.count) + " entries", 1)
                          ])
                        ]);
                      }), 128))
                    ]))
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
                      createTextVNode("By Category")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Expense breakdown")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  unref(totalByCategory).length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "py-6"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No data",
                      description: "No expenses recorded"
                    })
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(totalByCategory), (c) => {
                      return openBlock(), createBlock("div", {
                        key: c.category,
                        class: "flex items-center justify-between"
                      }, [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("div", { class: "size-2 rounded-full bg-primary/60" }),
                          createVNode("span", { class: "text-sm" }, toDisplayString(c.category), 1)
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          createVNode("p", { class: "text-sm font-medium tabular-nums" }, toDisplayString(c.amount.toFixed(2)), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(c.count) + " entries", 1)
                        ])
                      ]);
                    }), 128))
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
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
                              _push5(`Add Expense`);
                            } else {
                              return [
                                createTextVNode("Add Expense")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Record a new expense entry`);
                            } else {
                              return [
                                createTextVNode("Record a new expense entry")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Add Expense")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Record a new expense entry")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-title" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Title *`);
                      } else {
                        return [
                          createTextVNode("Title *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-title",
                    modelValue: unref(createForm).title,
                    "onUpdate:modelValue": ($event) => unref(createForm).title = $event,
                    placeholder: "Expense title",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-amount" }, {
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
                    id: "create-amount",
                    modelValue: unref(createForm).amount,
                    "onUpdate:modelValue": ($event) => unref(createForm).amount = $event,
                    type: "number",
                    step: "0.01",
                    placeholder: "0.00",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-date" }, {
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
                    id: "create-date",
                    modelValue: unref(createForm).date,
                    "onUpdate:modelValue": ($event) => unref(createForm).date = $event,
                    type: "date"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-category" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Category *`);
                      } else {
                        return [
                          createTextVNode("Category *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(createForm).category,
                    "onUpdate:modelValue": ($event) => unref(createForm).category = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "create-category" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "Select category" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue, { placeholder: "Select category" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(EXPENSE_CATEGORIES, (c) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: c,
                                  value: c
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(c)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(c), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: c,
                                    value: c
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(c), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSelectTrigger, { id: "create-category" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "Select category" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: c,
                                  value: c
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(c), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-notes" }, {
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
                    id: "create-notes",
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
                          disabled: unref(expensesStore).loading
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Create`);
                            } else {
                              return [
                                createTextVNode("Create")
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
                            disabled: unref(expensesStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Create")
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
                            createTextVNode("Add Expense")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Record a new expense entry")
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
                        createVNode(_component_UiLabel, { for: "create-title" }, {
                          default: withCtx(() => [
                            createTextVNode("Title *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-title",
                          modelValue: unref(createForm).title,
                          "onUpdate:modelValue": ($event) => unref(createForm).title = $event,
                          placeholder: "Expense title",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Amount (EGP) *")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-amount",
                            modelValue: unref(createForm).amount,
                            "onUpdate:modelValue": ($event) => unref(createForm).amount = $event,
                            type: "number",
                            step: "0.01",
                            placeholder: "0.00",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-date" }, {
                            default: withCtx(() => [
                              createTextVNode("Date")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-date",
                            modelValue: unref(createForm).date,
                            "onUpdate:modelValue": ($event) => unref(createForm).date = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-category" }, {
                          default: withCtx(() => [
                            createTextVNode("Category *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(createForm).category,
                          "onUpdate:modelValue": ($event) => unref(createForm).category = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "create-category" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue, { placeholder: "Select category" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: c,
                                    value: c
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(c), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-notes" }, {
                          default: withCtx(() => [
                            createTextVNode("Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          id: "create-notes",
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
                            disabled: unref(expensesStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Create")
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
                          createTextVNode("Add Expense")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Record a new expense entry")
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
                      createVNode(_component_UiLabel, { for: "create-title" }, {
                        default: withCtx(() => [
                          createTextVNode("Title *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "create-title",
                        modelValue: unref(createForm).title,
                        "onUpdate:modelValue": ($event) => unref(createForm).title = $event,
                        placeholder: "Expense title",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-amount" }, {
                          default: withCtx(() => [
                            createTextVNode("Amount (EGP) *")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-amount",
                          modelValue: unref(createForm).amount,
                          "onUpdate:modelValue": ($event) => unref(createForm).amount = $event,
                          type: "number",
                          step: "0.01",
                          placeholder: "0.00",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-date" }, {
                          default: withCtx(() => [
                            createTextVNode("Date")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-date",
                          modelValue: unref(createForm).date,
                          "onUpdate:modelValue": ($event) => unref(createForm).date = $event,
                          type: "date"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "create-category" }, {
                        default: withCtx(() => [
                          createTextVNode("Category *")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(createForm).category,
                        "onUpdate:modelValue": ($event) => unref(createForm).category = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { id: "create-category" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "Select category" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: c,
                                  value: c
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(c), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "create-notes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        id: "create-notes",
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
                          disabled: unref(expensesStore).loading
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Create")
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
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showEditDialog),
        "onUpdate:open": ($event) => showEditDialog.value = $event
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
                              _push5(`Edit Expense`);
                            } else {
                              return [
                                createTextVNode("Edit Expense")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update expense information`);
                            } else {
                              return [
                                createTextVNode("Update expense information")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Expense")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Update expense information")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-title" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Title`);
                      } else {
                        return [
                          createTextVNode("Title")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-title",
                    modelValue: unref(editForm).title,
                    "onUpdate:modelValue": ($event) => unref(editForm).title = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-amount" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Amount`);
                      } else {
                        return [
                          createTextVNode("Amount")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-amount",
                    modelValue: unref(editForm).amount,
                    "onUpdate:modelValue": ($event) => unref(editForm).amount = $event,
                    type: "number",
                    step: "0.01"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-date" }, {
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
                    id: "edit-date",
                    modelValue: unref(editForm).date,
                    "onUpdate:modelValue": ($event) => unref(editForm).date = $event,
                    type: "date"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-category" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Category`);
                      } else {
                        return [
                          createTextVNode("Category")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(editForm).category,
                    "onUpdate:modelValue": ($event) => unref(editForm).category = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "edit-category" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(EXPENSE_CATEGORIES, (c) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: c,
                                  value: c
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(c)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(c), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: c,
                                    value: c
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(c), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSelectTrigger, { id: "edit-category" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: c,
                                  value: c
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(c), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-notes" }, {
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
                    id: "edit-notes",
                    modelValue: unref(editForm).notes,
                    "onUpdate:modelValue": ($event) => unref(editForm).notes = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showEditDialog.value = false
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
                          disabled: unref(expensesStore).loading
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Save`);
                            } else {
                              return [
                                createTextVNode("Save")
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
                            onClick: ($event) => showEditDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(expensesStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
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
                            createTextVNode("Edit Expense")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Update expense information")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4",
                      onSubmit: withModifiers(handleEdit, ["prevent"])
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-title" }, {
                          default: withCtx(() => [
                            createTextVNode("Title")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-title",
                          modelValue: unref(editForm).title,
                          "onUpdate:modelValue": ($event) => unref(editForm).title = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Amount")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-amount",
                            modelValue: unref(editForm).amount,
                            "onUpdate:modelValue": ($event) => unref(editForm).amount = $event,
                            type: "number",
                            step: "0.01"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-date" }, {
                            default: withCtx(() => [
                              createTextVNode("Date")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-date",
                            modelValue: unref(editForm).date,
                            "onUpdate:modelValue": ($event) => unref(editForm).date = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-category" }, {
                          default: withCtx(() => [
                            createTextVNode("Category")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: unref(editForm).category,
                          "onUpdate:modelValue": ($event) => unref(editForm).category = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "edit-category" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: c,
                                    value: c
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(c), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-notes" }, {
                          default: withCtx(() => [
                            createTextVNode("Notes")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTextarea, {
                          id: "edit-notes",
                          modelValue: unref(editForm).notes,
                          "onUpdate:modelValue": ($event) => unref(editForm).notes = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showEditDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            type: "submit",
                            disabled: unref(expensesStore).loading
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
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
                          createTextVNode("Edit Expense")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Update expense information")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4",
                    onSubmit: withModifiers(handleEdit, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "edit-title" }, {
                        default: withCtx(() => [
                          createTextVNode("Title")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "edit-title",
                        modelValue: unref(editForm).title,
                        "onUpdate:modelValue": ($event) => unref(editForm).title = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-amount" }, {
                          default: withCtx(() => [
                            createTextVNode("Amount")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-amount",
                          modelValue: unref(editForm).amount,
                          "onUpdate:modelValue": ($event) => unref(editForm).amount = $event,
                          type: "number",
                          step: "0.01"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-date" }, {
                          default: withCtx(() => [
                            createTextVNode("Date")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-date",
                          modelValue: unref(editForm).date,
                          "onUpdate:modelValue": ($event) => unref(editForm).date = $event,
                          type: "date"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "edit-category" }, {
                        default: withCtx(() => [
                          createTextVNode("Category")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(editForm).category,
                        "onUpdate:modelValue": ($event) => unref(editForm).category = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { id: "edit-category" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(EXPENSE_CATEGORIES, (c) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: c,
                                  value: c
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(c), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "edit-notes" }, {
                        default: withCtx(() => [
                          createTextVNode("Notes")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTextarea, {
                        id: "edit-notes",
                        modelValue: unref(editForm).notes,
                        "onUpdate:modelValue": ($event) => unref(editForm).notes = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showEditDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          type: "submit",
                          disabled: unref(expensesStore).loading
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save")
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
      _push(ssrRenderComponent(_component_ConfirmDialog, {
        open: unref(showDeleteDialog),
        "onUpdate:open": ($event) => isRef(showDeleteDialog) ? showDeleteDialog.value = $event : null,
        title: "Delete Expense",
        description: `Are you sure you want to delete ${unref(deletingExpense)?.title}?`,
        "confirm-text": "Delete",
        variant: "destructive",
        loading: unref(expensesStore).loading,
        onConfirm: handleDelete,
        onCancel: ($event) => showDeleteDialog.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/expenses/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C3A90d4v.mjs.map
