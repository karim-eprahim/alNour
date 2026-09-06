import { _ as _sfc_main$1 } from './index-CUpQupPt.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, a as _sfc_main$4 } from './CardTitle-CZp9i7Kv.mjs';
import { _ as _sfc_main$2 } from './Input-BT7sGQjY.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$3, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CvBB3u-2.mjs';
import { _ as __nuxt_component_10 } from './AppTable-29woUsdf.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-DoIe0dip.mjs';
import { _ as __nuxt_component_20 } from './ConfirmDialog-BkZ-_oot.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, isRef, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { CheckCheck, RefreshCw, Trash2, Search } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { e as useNotificationStore } from './server.mjs';
import { getNotificationColumns } from './columns-DrK3qbus.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './DropdownMenuTrigger-CfTxy9kg.mjs';
import './Checkbox-BgWIODM0.mjs';
import './TableHeader-BnIov8Zr.mjs';
import './LoadingState-CjZdJj9x.mjs';
import '@tanstack/vue-table';
import './DialogTrigger-C62yxjGQ.mjs';
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
import './index-BJ9JiLtz.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const notificationStore = useNotificationStore();
    const search = ref("");
    const statusFilter = ref("all");
    const selectedIds = ref(/* @__PURE__ */ new Set());
    const showDeleteAllDialog = ref(false);
    const showBulkDeleteDialog = ref(false);
    const actionLoading = ref(false);
    const page = computed(() => notificationStore.pagination.page);
    const totalPages = computed(() => notificationStore.pagination.totalPages);
    const total = computed(() => notificationStore.pagination.total);
    const allOnPageSelected = computed(
      () => notificationStore.items.length > 0 && notificationStore.items.every((n) => selectedIds.value.has(n.id))
    );
    const headerCheckboxState = computed(() => {
      if (allOnPageSelected.value) return true;
      if (notificationStore.items.some((n) => selectedIds.value.has(n.id))) return "indeterminate";
      return false;
    });
    const debouncedSearch = ref("");
    watch(search, (val, _old, onCleanup) => {
      const timer = setTimeout(() => {
        debouncedSearch.value = val;
      }, 300);
      onCleanup(() => clearTimeout(timer));
    });
    async function fetchData(targetPage = 1) {
      selectedIds.value.clear();
      notificationStore.searchQuery = debouncedSearch.value;
      notificationStore.statusFilter = statusFilter.value;
      await notificationStore.fetchNotifications(targetPage);
    }
    watch(debouncedSearch, () => fetchData(1));
    watch(statusFilter, () => fetchData(1));
    function toggleSelectAll(value) {
      if (value === true) {
        notificationStore.items.forEach((n) => selectedIds.value.add(n.id));
      } else {
        notificationStore.items.forEach((n) => selectedIds.value.delete(n.id));
      }
    }
    function toggleSelect(id, value) {
      if (value === true) selectedIds.value.add(id);
      else selectedIds.value.delete(id);
    }
    function getRowNumber(index) {
      return (page.value - 1) * notificationStore.pagination.limit + index + 1;
    }
    const columns = getNotificationColumns({
      getHeaderChecked: () => headerCheckboxState.value,
      toggleSelectAll,
      isSelected: (id) => selectedIds.value.has(id),
      toggleSelect,
      getRowNumber,
      formatDateTime,
      onToggleRead: (n) => handleToggleRead(n),
      onDelete: (id) => handleDelete(id),
      isDeleting: () => actionLoading.value
    });
    async function handleMarkAllAsRead() {
      try {
        await notificationStore.markAllAsRead();
        toast.success("All notifications marked as read");
      } catch {
        toast.error("Failed to mark all as read");
      }
    }
    async function handleRefresh() {
      await fetchData(page.value);
    }
    async function handleToggleRead(n) {
      try {
        if (n.readAt) await notificationStore.markAsUnread(n.id);
        else await notificationStore.markAsRead(n.id);
      } catch {
        toast.error("Failed to update notification");
      }
    }
    async function handleDelete(id) {
      actionLoading.value = true;
      try {
        await notificationStore.deleteNotification(id);
        selectedIds.value.delete(id);
        toast.success("Notification deleted");
      } catch {
        toast.error("Failed to delete notification");
      } finally {
        actionLoading.value = false;
      }
    }
    async function handleBulkDelete() {
      actionLoading.value = true;
      try {
        const ids = [...selectedIds.value];
        const res = await notificationStore.bulkDelete(ids);
        selectedIds.value.clear();
        showBulkDeleteDialog.value = false;
        toast.success(`${res.deletedCount} notification(s) deleted`);
      } catch {
        toast.error("Failed to delete notifications");
      } finally {
        actionLoading.value = false;
      }
    }
    async function handleDeleteAll() {
      actionLoading.value = true;
      try {
        await notificationStore.deleteAllNotifications();
        selectedIds.value.clear();
        showDeleteAllDialog.value = false;
        toast.success("All notifications deleted");
      } catch {
        toast.error("Failed to delete notifications");
      } finally {
        actionLoading.value = false;
      }
    }
    function goToPage(p) {
      if (p < 1 || p > totalPages.value || p === page.value) return;
      fetchData(p);
    }
    function formatDateTime(date) {
      return new Date(date).toLocaleString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiInput = _sfc_main$2;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$3;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_ConfirmDialog = __nuxt_component_20;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Notifications",
        description: unref(notificationStore).unreadCount > 0 ? `You have ${unref(notificationStore).unreadCount} unread notification(s)` : "You are all caught up"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              size: "sm",
              onClick: handleMarkAllAsRead,
              disabled: unref(notificationStore).unreadCount === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(CheckCheck), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Mark all as read `);
                } else {
                  return [
                    createVNode(unref(CheckCheck), { class: "size-4" }),
                    createTextVNode(" Mark all as read ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "outline",
              size: "sm",
              onClick: handleRefresh,
              disabled: unref(notificationStore).loading
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(RefreshCw), {
                    class: ["size-4", unref(notificationStore).loading && "animate-spin"]
                  }, null, _parent3, _scopeId2));
                  _push3(` Refresh `);
                } else {
                  return [
                    createVNode(unref(RefreshCw), {
                      class: ["size-4", unref(notificationStore).loading && "animate-spin"]
                    }, null, 8, ["class"]),
                    createTextVNode(" Refresh ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiButton, {
              variant: "destructive",
              size: "sm",
              onClick: ($event) => showDeleteAllDialog.value = true,
              disabled: unref(notificationStore).items.length === 0 && unref(total) === 0
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Trash2), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Delete all `);
                } else {
                  return [
                    createVNode(unref(Trash2), { class: "size-4" }),
                    createTextVNode(" Delete all ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiButton, {
                variant: "outline",
                size: "sm",
                onClick: handleMarkAllAsRead,
                disabled: unref(notificationStore).unreadCount === 0
              }, {
                default: withCtx(() => [
                  createVNode(unref(CheckCheck), { class: "size-4" }),
                  createTextVNode(" Mark all as read ")
                ]),
                _: 1
              }, 8, ["disabled"]),
              createVNode(_component_UiButton, {
                variant: "outline",
                size: "sm",
                onClick: handleRefresh,
                disabled: unref(notificationStore).loading
              }, {
                default: withCtx(() => [
                  createVNode(unref(RefreshCw), {
                    class: ["size-4", unref(notificationStore).loading && "animate-spin"]
                  }, null, 8, ["class"]),
                  createTextVNode(" Refresh ")
                ]),
                _: 1
              }, 8, ["disabled"]),
              createVNode(_component_UiButton, {
                variant: "destructive",
                size: "sm",
                onClick: ($event) => showDeleteAllDialog.value = true,
                disabled: unref(notificationStore).items.length === 0 && unref(total) === 0
              }, {
                default: withCtx(() => [
                  createVNode(unref(Trash2), { class: "size-4" }),
                  createTextVNode(" Delete all ")
                ]),
                _: 1
              }, 8, ["onClick", "disabled"])
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
                  _push3(`<div class="flex flex-wrap items-center gap-2"${_scopeId2}><div class="relative max-w-xs flex-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Search), { class: "absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    modelValue: unref(search),
                    "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                    placeholder: "Search title or message...",
                    class: "pl-8"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: unref(statusFilter),
                    "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-36" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectValue, { placeholder: "All statuses" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectValue, { placeholder: "All statuses" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelectContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "all" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`All`);
                                  } else {
                                    return [
                                      createTextVNode("All")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "unread" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Unread`);
                                  } else {
                                    return [
                                      createTextVNode("Unread")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectItem, { value: "read" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Read`);
                                  } else {
                                    return [
                                      createTextVNode("Read")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "all" }, {
                                  default: withCtx(() => [
                                    createTextVNode("All")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "unread" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Unread")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectItem, { value: "read" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Read")
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
                              createVNode(_component_UiSelectValue, { placeholder: "All statuses" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "all" }, {
                                default: withCtx(() => [
                                  createTextVNode("All")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "unread" }, {
                                default: withCtx(() => [
                                  createTextVNode("Unread")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "read" }, {
                                default: withCtx(() => [
                                  createTextVNode("Read")
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
                  if (unref(selectedIds).size > 0) {
                    _push3(`<div class="ms-auto flex items-center gap-2"${_scopeId2}><span class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(selectedIds).size)} selected</span>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "destructive",
                      size: "sm",
                      onClick: ($event) => showBulkDeleteDialog.value = true
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Trash2), { class: "size-4" }, null, _parent4, _scopeId3));
                          _push4(` Delete selected `);
                        } else {
                          return [
                            createVNode(unref(Trash2), { class: "size-4" }),
                            createTextVNode(" Delete selected ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                      createVNode("div", { class: "relative max-w-xs flex-1" }, [
                        createVNode(unref(Search), { class: "absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
                        createVNode(_component_UiInput, {
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                          placeholder: "Search title or message...",
                          class: "pl-8"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiSelect, {
                        modelValue: unref(statusFilter),
                        "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiSelectTrigger, { class: "w-36" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue, { placeholder: "All statuses" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectItem, { value: "all" }, {
                                default: withCtx(() => [
                                  createTextVNode("All")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "unread" }, {
                                default: withCtx(() => [
                                  createTextVNode("Unread")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectItem, { value: "read" }, {
                                default: withCtx(() => [
                                  createTextVNode("Read")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(selectedIds).size > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "ms-auto flex items-center gap-2"
                      }, [
                        createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(selectedIds).size) + " selected", 1),
                        createVNode(_component_UiButton, {
                          variant: "destructive",
                          size: "sm",
                          onClick: ($event) => showBulkDeleteDialog.value = true
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Trash2), { class: "size-4" }),
                            createTextVNode(" Delete selected ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])) : createCommentVNode("", true)
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
                    data: unref(notificationStore).items,
                    columns: unref(columns),
                    loading: unref(notificationStore).loading,
                    "server-total": unref(total),
                    "show-search": false,
                    "show-column-toggle": false,
                    "show-pagination": false,
                    "default-page-size": 100
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No notifications found",
                          description: "You are all caught up"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No notifications found",
                            description: "You are all caught up"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(totalPages) > 1) {
                    _push3(`<div class="mt-4 flex items-center justify-between"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}> Page ${ssrInterpolate(unref(page))} of ${ssrInterpolate(unref(totalPages))} (${ssrInterpolate(unref(total))} total) </p><div class="flex gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      size: "sm",
                      disabled: unref(page) <= 1,
                      onClick: ($event) => goToPage(unref(page) - 1)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Previous `);
                        } else {
                          return [
                            createTextVNode(" Previous ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      size: "sm",
                      disabled: unref(page) >= unref(totalPages),
                      onClick: ($event) => goToPage(unref(page) + 1)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Next `);
                        } else {
                          return [
                            createTextVNode(" Next ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(notificationStore).items,
                      columns: unref(columns),
                      loading: unref(notificationStore).loading,
                      "server-total": unref(total),
                      "show-search": false,
                      "show-column-toggle": false,
                      "show-pagination": false,
                      "default-page-size": 100
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No notifications found",
                          description: "You are all caught up"
                        })
                      ]),
                      _: 1
                    }, 8, ["data", "columns", "loading", "server-total"]),
                    unref(totalPages) > 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-4 flex items-center justify-between"
                    }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, " Page " + toDisplayString(unref(page)) + " of " + toDisplayString(unref(totalPages)) + " (" + toDisplayString(unref(total)) + " total) ", 1),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          size: "sm",
                          disabled: unref(page) <= 1,
                          onClick: ($event) => goToPage(unref(page) - 1)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"]),
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          size: "sm",
                          disabled: unref(page) >= unref(totalPages),
                          onClick: ($event) => goToPage(unref(page) + 1)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 1
                        }, 8, ["disabled", "onClick"])
                      ])
                    ])) : createCommentVNode("", true)
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
                    createVNode("div", { class: "relative max-w-xs flex-1" }, [
                      createVNode(unref(Search), { class: "absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
                      createVNode(_component_UiInput, {
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        placeholder: "Search title or message...",
                        class: "pl-8"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiSelect, {
                      modelValue: unref(statusFilter),
                      "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiSelectTrigger, { class: "w-36" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectValue, { placeholder: "All statuses" })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelectContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectItem, { value: "all" }, {
                              default: withCtx(() => [
                                createTextVNode("All")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "unread" }, {
                              default: withCtx(() => [
                                createTextVNode("Unread")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectItem, { value: "read" }, {
                              default: withCtx(() => [
                                createTextVNode("Read")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    unref(selectedIds).size > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "ms-auto flex items-center gap-2"
                    }, [
                      createVNode("span", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(selectedIds).size) + " selected", 1),
                      createVNode(_component_UiButton, {
                        variant: "destructive",
                        size: "sm",
                        onClick: ($event) => showBulkDeleteDialog.value = true
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Trash2), { class: "size-4" }),
                          createTextVNode(" Delete selected ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(notificationStore).items,
                    columns: unref(columns),
                    loading: unref(notificationStore).loading,
                    "server-total": unref(total),
                    "show-search": false,
                    "show-column-toggle": false,
                    "show-pagination": false,
                    "default-page-size": 100
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No notifications found",
                        description: "You are all caught up"
                      })
                    ]),
                    _: 1
                  }, 8, ["data", "columns", "loading", "server-total"]),
                  unref(totalPages) > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4 flex items-center justify-between"
                  }, [
                    createVNode("p", { class: "text-sm text-muted-foreground" }, " Page " + toDisplayString(unref(page)) + " of " + toDisplayString(unref(totalPages)) + " (" + toDisplayString(unref(total)) + " total) ", 1),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        disabled: unref(page) <= 1,
                        onClick: ($event) => goToPage(unref(page) - 1)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Previous ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"]),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        disabled: unref(page) >= unref(totalPages),
                        onClick: ($event) => goToPage(unref(page) + 1)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Next ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "onClick"])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ConfirmDialog, {
        open: unref(showDeleteAllDialog),
        "onUpdate:open": ($event) => isRef(showDeleteAllDialog) ? showDeleteAllDialog.value = $event : null,
        title: "Delete all notifications",
        description: "Are you sure you want to permanently delete all your notifications? This cannot be undone.",
        "confirm-text": "Delete all",
        variant: "destructive",
        loading: unref(actionLoading),
        onConfirm: handleDeleteAll,
        onCancel: ($event) => showDeleteAllDialog.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_ConfirmDialog, {
        open: unref(showBulkDeleteDialog),
        "onUpdate:open": ($event) => isRef(showBulkDeleteDialog) ? showBulkDeleteDialog.value = $event : null,
        title: "Delete selected notifications",
        description: `Are you sure you want to delete ${unref(selectedIds).size} selected notification(s)?`,
        "confirm-text": "Delete",
        variant: "destructive",
        loading: unref(actionLoading),
        onConfirm: handleBulkDelete,
        onCancel: ($event) => showBulkDeleteDialog.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/notifications/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DL_U40hw.mjs.map
