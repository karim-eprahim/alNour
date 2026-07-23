import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$3, a as _sfc_main$1$1, b as _sfc_main$2, c as _sfc_main$2$1 } from './index-CsamvZIh.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$2, b as _sfc_main$4, c as _sfc_main$3$1, d as _sfc_main$4$1, e as __nuxt_component_7 } from './CardTitle-CgdNZisr.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$5 } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$8, a as _sfc_main$7, b as _sfc_main$4$2, c as _sfc_main$1$3, d as _sfc_main$7$1, e as _sfc_main$5$1 } from './TableHeader-Cc67ZnYT.mjs';
import { _ as _sfc_main$9, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$4, d as _sfc_main$5$2, e as _sfc_main$4$3 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$a } from './Label-Di1i-yIq.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { a as useRoute, n as navigateTo } from './server.mjs';
import { defineComponent, computed, ref, resolveDirective, mergeProps, unref, withCtx, createVNode, isRef, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withDirectives, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrGetDirectiveProps } from 'vue/server-renderer';
import { ArrowLeft, Shield, ShieldX } from '@lucide/vue';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useUsersStore, a as usePermissionsStore } from './store-B2e60c9z.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './Input-pgd-3rGf.mjs';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const userId = computed(() => route.params.id);
    const usersStore = useUsersStore();
    const permsStore = usePermissionsStore();
    const activeTab = ref("details");
    const showAssignDialog = ref(false);
    const selectedPermissionId = ref("");
    async function handleAssign() {
      if (!selectedPermissionId.value) return;
      try {
        await permsStore.assignUserPermission(userId.value, selectedPermissionId.value);
        showAssignDialog.value = false;
        selectedPermissionId.value = "";
      } catch {
      }
    }
    async function handleRemove(permissionId) {
      try {
        await permsStore.removeUserPermission(userId.value, permissionId);
      } catch {
      }
    }
    const assignedPermissionIds = computed(
      () => permsStore.userPermissions.map((up) => up.permissionId)
    );
    const availablePermissions = computed(
      () => permsStore.permissions.filter((p) => !assignedPermissionIds.value.includes(p.id)).map((p) => ({ ...p, _label: `${p.module?.name || p.moduleId} — ${p.action?.name || p.actionId} (${p.label})` }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$1;
      const _component_UiTabs = _sfc_main$3;
      const _component_UiTabsList = _sfc_main$1$1;
      const _component_UiTabsTrigger = _sfc_main$2;
      const _component_UiTabsContent = _sfc_main$2$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$4;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiBadge = _sfc_main$5;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$7;
      const _component_UiTableRow = _sfc_main$4$2;
      const _component_UiTableHead = _sfc_main$1$3;
      const _component_UiTableBody = _sfc_main$7$1;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$2;
      const _component_UiDialogTitle = _sfc_main$1$4;
      const _component_UiDialogDescription = _sfc_main$5$2;
      const _component_UiLabel = _sfc_main$a;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiDialogFooter = _sfc_main$4$3;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UiButton, {
        variant: "ghost",
        size: "icon",
        class: "size-8 shrink-0",
        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/users")
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
      _push(ssrRenderComponent(PageHeader, {
        title: unref(usersStore).currentUser?.name || "User Details",
        description: unref(usersStore).currentUser?.email || "Loading..."
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiTabs, {
        modelValue: unref(activeTab),
        "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
        class: "space-y-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiTabsList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "details" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Details`);
                      } else {
                        return [
                          createTextVNode("Details")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "permissions" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Permissions`);
                      } else {
                        return [
                          createTextVNode("Permissions")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsTrigger, { value: "details" }, {
                      default: withCtx(() => [
                        createTextVNode("Details")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "permissions" }, {
                      default: withCtx(() => [
                        createTextVNode("Permissions")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "details" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardHeader, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`User Information`);
                                  } else {
                                    return [
                                      createTextVNode("User Information")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Detailed user profile and account info`);
                                  } else {
                                    return [
                                      createTextVNode("Detailed user profile and account info")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("User Information")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Detailed user profile and account info")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(usersStore).loading && !unref(usersStore).currentUser) {
                                _push5(`<div class="flex justify-center py-8"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_LoadingState, null, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else if (unref(usersStore).currentUser) {
                                _push5(`<div class="grid gap-6 sm:grid-cols-2"${_scopeId4}><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Name</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(unref(usersStore).currentUser.name)}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Email</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(unref(usersStore).currentUser.email)}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Phone</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(unref(usersStore).currentUser.phone || "Not set")}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Role</p>`);
                                _push5(ssrRenderComponent(_component_UiBadge, {
                                  variant: "secondary",
                                  class: "text-xs"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(unref(usersStore).currentUser.role?.name || "—")}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(unref(usersStore).currentUser.role?.name || "—"), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Status</p>`);
                                _push5(ssrRenderComponent(_component_UiBadge, {
                                  variant: unref(usersStore).currentUser.status === "ACTIVE" ? "default" : "destructive",
                                  class: "text-xs"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(unref(usersStore).currentUser.status)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(unref(usersStore).currentUser.status), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(`</div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Last Login</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(unref(usersStore).currentUser.lastLogin ? new Date(unref(usersStore).currentUser.lastLogin).toLocaleString() : "Never")}</p></div><div class="space-y-1"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Created</p><p class="text-sm"${_scopeId4}>${ssrInterpolate(new Date(unref(usersStore).currentUser.createdAt).toLocaleDateString())}</p></div><div class="space-y-1 sm:col-span-2"${_scopeId4}><p class="text-xs font-medium text-muted-foreground"${_scopeId4}>Assigned Warehouses</p>`);
                                if (unref(usersStore).currentUser.userWarehouses && unref(usersStore).currentUser.userWarehouses.length > 0) {
                                  _push5(`<div class="flex flex-wrap gap-1"${_scopeId4}><!--[-->`);
                                  ssrRenderList(unref(usersStore).currentUser.userWarehouses, (uw) => {
                                    _push5(ssrRenderComponent(_component_UiBadge, {
                                      key: uw.warehouse.id,
                                      variant: "secondary",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(uw.warehouse.name)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(uw.warehouse.name), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]--></div>`);
                                } else {
                                  _push5(`<p class="text-sm text-muted-foreground"${_scopeId4}>No warehouses assigned (admin)</p>`);
                                }
                                _push5(`</div></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                unref(usersStore).loading && !unref(usersStore).currentUser ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex justify-center py-8"
                                }, [
                                  createVNode(_component_LoadingState)
                                ])) : unref(usersStore).currentUser ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "grid gap-6 sm:grid-cols-2"
                                }, [
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.name), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Email"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.email), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Phone"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.phone || "Not set"), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Role"),
                                    createVNode(_component_UiBadge, {
                                      variant: "secondary",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(usersStore).currentUser.role?.name || "—"), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Status"),
                                    createVNode(_component_UiBadge, {
                                      variant: unref(usersStore).currentUser.status === "ACTIVE" ? "default" : "destructive",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(usersStore).currentUser.status), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["variant"])
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Last Login"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.lastLogin ? new Date(unref(usersStore).currentUser.lastLogin).toLocaleString() : "Never"), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Created"),
                                    createVNode("p", { class: "text-sm" }, toDisplayString(new Date(unref(usersStore).currentUser.createdAt).toLocaleDateString()), 1)
                                  ]),
                                  createVNode("div", { class: "space-y-1 sm:col-span-2" }, [
                                    createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Assigned Warehouses"),
                                    unref(usersStore).currentUser.userWarehouses && unref(usersStore).currentUser.userWarehouses.length > 0 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex flex-wrap gap-1"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(usersStore).currentUser.userWarehouses, (uw) => {
                                        return openBlock(), createBlock(_component_UiBadge, {
                                          key: uw.warehouse.id,
                                          variant: "secondary",
                                          class: "text-xs"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(uw.warehouse.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ])) : (openBlock(), createBlock("p", {
                                      key: 1,
                                      class: "text-sm text-muted-foreground"
                                    }, "No warehouses assigned (admin)"))
                                  ])
                                ])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiCardHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("User Information")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Detailed user profile and account info")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, null, {
                            default: withCtx(() => [
                              unref(usersStore).loading && !unref(usersStore).currentUser ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex justify-center py-8"
                              }, [
                                createVNode(_component_LoadingState)
                              ])) : unref(usersStore).currentUser ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "grid gap-6 sm:grid-cols-2"
                              }, [
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.name), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Email"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.email), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Phone"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.phone || "Not set"), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Role"),
                                  createVNode(_component_UiBadge, {
                                    variant: "secondary",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(usersStore).currentUser.role?.name || "—"), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Status"),
                                  createVNode(_component_UiBadge, {
                                    variant: unref(usersStore).currentUser.status === "ACTIVE" ? "default" : "destructive",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(usersStore).currentUser.status), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["variant"])
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Last Login"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.lastLogin ? new Date(unref(usersStore).currentUser.lastLogin).toLocaleString() : "Never"), 1)
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Created"),
                                  createVNode("p", { class: "text-sm" }, toDisplayString(new Date(unref(usersStore).currentUser.createdAt).toLocaleDateString()), 1)
                                ]),
                                createVNode("div", { class: "space-y-1 sm:col-span-2" }, [
                                  createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Assigned Warehouses"),
                                  unref(usersStore).currentUser.userWarehouses && unref(usersStore).currentUser.userWarehouses.length > 0 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex flex-wrap gap-1"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(usersStore).currentUser.userWarehouses, (uw) => {
                                      return openBlock(), createBlock(_component_UiBadge, {
                                        key: uw.warehouse.id,
                                        variant: "secondary",
                                        class: "text-xs"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(uw.warehouse.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ])) : (openBlock(), createBlock("p", {
                                    key: 1,
                                    class: "text-sm text-muted-foreground"
                                  }, "No warehouses assigned (admin)"))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCard, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("User Information")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Detailed user profile and account info")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, null, {
                          default: withCtx(() => [
                            unref(usersStore).loading && !unref(usersStore).currentUser ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex justify-center py-8"
                            }, [
                              createVNode(_component_LoadingState)
                            ])) : unref(usersStore).currentUser ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "grid gap-6 sm:grid-cols-2"
                            }, [
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.name), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Email"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.email), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Phone"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.phone || "Not set"), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Role"),
                                createVNode(_component_UiBadge, {
                                  variant: "secondary",
                                  class: "text-xs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(usersStore).currentUser.role?.name || "—"), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Status"),
                                createVNode(_component_UiBadge, {
                                  variant: unref(usersStore).currentUser.status === "ACTIVE" ? "default" : "destructive",
                                  class: "text-xs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(usersStore).currentUser.status), 1)
                                  ]),
                                  _: 1
                                }, 8, ["variant"])
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Last Login"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.lastLogin ? new Date(unref(usersStore).currentUser.lastLogin).toLocaleString() : "Never"), 1)
                              ]),
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Created"),
                                createVNode("p", { class: "text-sm" }, toDisplayString(new Date(unref(usersStore).currentUser.createdAt).toLocaleDateString()), 1)
                              ]),
                              createVNode("div", { class: "space-y-1 sm:col-span-2" }, [
                                createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Assigned Warehouses"),
                                unref(usersStore).currentUser.userWarehouses && unref(usersStore).currentUser.userWarehouses.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex flex-wrap gap-1"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(usersStore).currentUser.userWarehouses, (uw) => {
                                    return openBlock(), createBlock(_component_UiBadge, {
                                      key: uw.warehouse.id,
                                      variant: "secondary",
                                      class: "text-xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(uw.warehouse.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ])) : (openBlock(), createBlock("p", {
                                  key: 1,
                                  class: "text-sm text-muted-foreground"
                                }, "No warehouses assigned (admin)"))
                              ])
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "permissions" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UiCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`User Permissions`);
                                  } else {
                                    return [
                                      createTextVNode("User Permissions")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiCardDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Manage granular permissions for this user (overrides role permissions)`);
                                  } else {
                                    return [
                                      createTextVNode("Manage granular permissions for this user (overrides role permissions)")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(_component_UiButton, mergeProps({
                                size: "sm",
                                disabled: unref(availablePermissions).length === 0,
                                onClick: ($event) => showAssignDialog.value = true
                              }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "USERS", action: "UPDATE" })), {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Shield), { class: "size-4" }, null, _parent6, _scopeId5));
                                    _push6(` Assign `);
                                  } else {
                                    return [
                                      createVNode(unref(Shield), { class: "size-4" }),
                                      createTextVNode(" Assign ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode(_component_UiCardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("User Permissions")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiCardDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Manage granular permissions for this user (overrides role permissions)")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                withDirectives((openBlock(), createBlock(_component_UiButton, {
                                  size: "sm",
                                  disabled: unref(availablePermissions).length === 0,
                                  onClick: ($event) => showAssignDialog.value = true
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Shield), { class: "size-4" }),
                                    createTextVNode(" Assign ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled", "onClick"])), [
                                  [_directive_can, { module: "USERS", action: "UPDATE" }]
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(permsStore).loading && unref(permsStore).userPermissions.length === 0) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_LoadingState, null, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else if (unref(permsStore).userPermissions.length === 0) {
                                _push5(`<div class="p-6"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_EmptyState, {
                                  title: "No permissions assigned",
                                  description: "This user has no custom permissions. They inherit permissions from their role."
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                _push5(ssrRenderComponent(_component_UiTable, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHeader, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_UiTableRow, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Module`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Module")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Action`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Action")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Label`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Label")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(_component_UiTableHead, { class: "w-20 text-right" }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`Action`);
                                                      } else {
                                                        return [
                                                          createTextVNode("Action")
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Module")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Action")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_UiTableHead, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Label")
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
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_UiTableRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Module")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Action")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_UiTableHead, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Label")
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
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableBody, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(unref(permsStore).userPermissions, (up) => {
                                              _push7(ssrRenderComponent(_component_UiTableRow, {
                                                key: up.id
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-sm font-medium" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(up.permission.module?.name || up.permission.moduleId)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(up.permission.module?.name || up.permission.moduleId), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, null, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_UiBadge, {
                                                            variant: "outline",
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(`${ssrInterpolate(up.permission.action?.name || up.permission.actionId)}`);
                                                              } else {
                                                                return [
                                                                  createTextVNode(toDisplayString(up.permission.action?.name || up.permission.actionId), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            createVNode(_component_UiBadge, {
                                                              variant: "outline",
                                                              class: "text-xs"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(toDisplayString(up.permission.action?.name || up.permission.actionId), 1)
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(`${ssrInterpolate(up.permission.label)}`);
                                                        } else {
                                                          return [
                                                            createTextVNode(toDisplayString(up.permission.label), 1)
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_UiTableCell, { class: "text-right" }, {
                                                      default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                        if (_push9) {
                                                          _push9(ssrRenderComponent(_component_UiButton, mergeProps({
                                                            variant: "ghost",
                                                            size: "icon-xs",
                                                            class: "text-destructive hover:text-destructive",
                                                            onClick: ($event) => handleRemove(up.permissionId)
                                                          }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "USERS", action: "UPDATE" })), {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(ssrRenderComponent(unref(ShieldX), { class: "size-3.5" }, null, _parent10, _scopeId9));
                                                              } else {
                                                                return [
                                                                  createVNode(unref(ShieldX), { class: "size-3.5" })
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        } else {
                                                          return [
                                                            withDirectives((openBlock(), createBlock(_component_UiButton, {
                                                              variant: "ghost",
                                                              size: "icon-xs",
                                                              class: "text-destructive hover:text-destructive",
                                                              onClick: ($event) => handleRemove(up.permissionId)
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(ShieldX), { class: "size-3.5" })
                                                              ]),
                                                              _: 1
                                                            }, 8, ["onClick"])), [
                                                              [_directive_can, { module: "USERS", action: "UPDATE" }]
                                                            ])
                                                          ];
                                                        }
                                                      }),
                                                      _: 2
                                                    }, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_UiTableCell, { class: "text-sm font-medium" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(up.permission.module?.name || up.permission.moduleId), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, null, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_UiBadge, {
                                                            variant: "outline",
                                                            class: "text-xs"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(toDisplayString(up.permission.action?.name || up.permission.actionId), 1)
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(up.permission.label), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                        default: withCtx(() => [
                                                          withDirectives((openBlock(), createBlock(_component_UiButton, {
                                                            variant: "ghost",
                                                            size: "icon-xs",
                                                            class: "text-destructive hover:text-destructive",
                                                            onClick: ($event) => handleRemove(up.permissionId)
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(ShieldX), { class: "size-3.5" })
                                                            ]),
                                                            _: 1
                                                          }, 8, ["onClick"])), [
                                                            [_directive_can, { module: "USERS", action: "UPDATE" }]
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(unref(permsStore).userPermissions, (up) => {
                                                return openBlock(), createBlock(_component_UiTableRow, {
                                                  key: up.id
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_UiTableCell, { class: "text-sm font-medium" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(up.permission.module?.name || up.permission.moduleId), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_UiBadge, {
                                                          variant: "outline",
                                                          class: "text-xs"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(toDisplayString(up.permission.action?.name || up.permission.actionId), 1)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(up.permission.label), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                      default: withCtx(() => [
                                                        withDirectives((openBlock(), createBlock(_component_UiButton, {
                                                          variant: "ghost",
                                                          size: "icon-xs",
                                                          class: "text-destructive hover:text-destructive",
                                                          onClick: ($event) => handleRemove(up.permissionId)
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(ShieldX), { class: "size-3.5" })
                                                          ]),
                                                          _: 1
                                                        }, 8, ["onClick"])), [
                                                          [_directive_can, { module: "USERS", action: "UPDATE" }]
                                                        ])
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
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHeader, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Module")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Action")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_UiTableHead, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Label")
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
                                            (openBlock(true), createBlock(Fragment, null, renderList(unref(permsStore).userPermissions, (up) => {
                                              return openBlock(), createBlock(_component_UiTableRow, {
                                                key: up.id
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiTableCell, { class: "text-sm font-medium" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(up.permission.module?.name || up.permission.moduleId), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_UiBadge, {
                                                        variant: "outline",
                                                        class: "text-xs"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(toDisplayString(up.permission.action?.name || up.permission.actionId), 1)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(up.permission.label), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                    default: withCtx(() => [
                                                      withDirectives((openBlock(), createBlock(_component_UiButton, {
                                                        variant: "ghost",
                                                        size: "icon-xs",
                                                        class: "text-destructive hover:text-destructive",
                                                        onClick: ($event) => handleRemove(up.permissionId)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(ShieldX), { class: "size-3.5" })
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"])), [
                                                        [_directive_can, { module: "USERS", action: "UPDATE" }]
                                                      ])
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
                                }, _parent5, _scopeId4));
                              }
                            } else {
                              return [
                                unref(permsStore).loading && unref(permsStore).userPermissions.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_LoadingState)
                                ])) : unref(permsStore).userPermissions.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "p-6"
                                }, [
                                  createVNode(_component_EmptyState, {
                                    title: "No permissions assigned",
                                    description: "This user has no custom permissions. They inherit permissions from their role."
                                  })
                                ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHeader, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Module")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Action")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_UiTableHead, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Label")
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
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(permsStore).userPermissions, (up) => {
                                          return openBlock(), createBlock(_component_UiTableRow, {
                                            key: up.id
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiTableCell, { class: "text-sm font-medium" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(up.permission.module?.name || up.permission.moduleId), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_UiBadge, {
                                                    variant: "outline",
                                                    class: "text-xs"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(up.permission.action?.name || up.permission.actionId), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(up.permission.label), 1)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(_component_UiTableCell, { class: "text-right" }, {
                                                default: withCtx(() => [
                                                  withDirectives((openBlock(), createBlock(_component_UiButton, {
                                                    variant: "ghost",
                                                    size: "icon-xs",
                                                    class: "text-destructive hover:text-destructive",
                                                    onClick: ($event) => handleRemove(up.permissionId)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(ShieldX), { class: "size-3.5" })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])), [
                                                    [_directive_can, { module: "USERS", action: "UPDATE" }]
                                                  ])
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode(_component_UiCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("User Permissions")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiCardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Manage granular permissions for this user (overrides role permissions)")
                                  ]),
                                  _: 1
                                })
                              ]),
                              withDirectives((openBlock(), createBlock(_component_UiButton, {
                                size: "sm",
                                disabled: unref(availablePermissions).length === 0,
                                onClick: ($event) => showAssignDialog.value = true
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Shield), { class: "size-4" }),
                                  createTextVNode(" Assign ")
                                ]),
                                _: 1
                              }, 8, ["disabled", "onClick"])), [
                                [_directive_can, { module: "USERS", action: "UPDATE" }]
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardContent, { class: "p-0" }, {
                            default: withCtx(() => [
                              unref(permsStore).loading && unref(permsStore).userPermissions.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-6"
                              }, [
                                createVNode(_component_LoadingState)
                              ])) : unref(permsStore).userPermissions.length === 0 ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "p-6"
                              }, [
                                createVNode(_component_EmptyState, {
                                  title: "No permissions assigned",
                                  description: "This user has no custom permissions. They inherit permissions from their role."
                                })
                              ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Module")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Action")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_UiTableHead, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Label")
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(permsStore).userPermissions, (up) => {
                                        return openBlock(), createBlock(_component_UiTableRow, {
                                          key: up.id
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiTableCell, { class: "text-sm font-medium" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(up.permission.module?.name || up.permission.moduleId), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_UiBadge, {
                                                  variant: "outline",
                                                  class: "text-xs"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(up.permission.action?.name || up.permission.actionId), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(up.permission.label), 1)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(_component_UiTableCell, { class: "text-right" }, {
                                              default: withCtx(() => [
                                                withDirectives((openBlock(), createBlock(_component_UiButton, {
                                                  variant: "ghost",
                                                  size: "icon-xs",
                                                  class: "text-destructive hover:text-destructive",
                                                  onClick: ($event) => handleRemove(up.permissionId)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(ShieldX), { class: "size-3.5" })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])), [
                                                  [_directive_can, { module: "USERS", action: "UPDATE" }]
                                                ])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCard, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode(_component_UiCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("User Permissions")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiCardDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Manage granular permissions for this user (overrides role permissions)")
                                ]),
                                _: 1
                              })
                            ]),
                            withDirectives((openBlock(), createBlock(_component_UiButton, {
                              size: "sm",
                              disabled: unref(availablePermissions).length === 0,
                              onClick: ($event) => showAssignDialog.value = true
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Shield), { class: "size-4" }),
                                createTextVNode(" Assign ")
                              ]),
                              _: 1
                            }, 8, ["disabled", "onClick"])), [
                              [_directive_can, { module: "USERS", action: "UPDATE" }]
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiCardContent, { class: "p-0" }, {
                          default: withCtx(() => [
                            unref(permsStore).loading && unref(permsStore).userPermissions.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-6"
                            }, [
                              createVNode(_component_LoadingState)
                            ])) : unref(permsStore).userPermissions.length === 0 ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "p-6"
                            }, [
                              createVNode(_component_EmptyState, {
                                title: "No permissions assigned",
                                description: "This user has no custom permissions. They inherit permissions from their role."
                              })
                            ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Module")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Action")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Label")
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(permsStore).userPermissions, (up) => {
                                      return openBlock(), createBlock(_component_UiTableRow, {
                                        key: up.id
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiTableCell, { class: "text-sm font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(up.permission.module?.name || up.permission.moduleId), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiBadge, {
                                                variant: "outline",
                                                class: "text-xs"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(up.permission.action?.name || up.permission.actionId), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(up.permission.label), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              withDirectives((openBlock(), createBlock(_component_UiButton, {
                                                variant: "ghost",
                                                size: "icon-xs",
                                                class: "text-destructive hover:text-destructive",
                                                onClick: ($event) => handleRemove(up.permissionId)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(ShieldX), { class: "size-3.5" })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])), [
                                                [_directive_can, { module: "USERS", action: "UPDATE" }]
                                              ])
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
              createVNode(_component_UiTabsList, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsTrigger, { value: "details" }, {
                    default: withCtx(() => [
                      createTextVNode("Details")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "permissions" }, {
                    default: withCtx(() => [
                      createTextVNode("Permissions")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "details" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("User Information")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiCardDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Detailed user profile and account info")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, null, {
                        default: withCtx(() => [
                          unref(usersStore).loading && !unref(usersStore).currentUser ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex justify-center py-8"
                          }, [
                            createVNode(_component_LoadingState)
                          ])) : unref(usersStore).currentUser ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "grid gap-6 sm:grid-cols-2"
                          }, [
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Name"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.name), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Email"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.email), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Phone"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.phone || "Not set"), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Role"),
                              createVNode(_component_UiBadge, {
                                variant: "secondary",
                                class: "text-xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(usersStore).currentUser.role?.name || "—"), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Status"),
                              createVNode(_component_UiBadge, {
                                variant: unref(usersStore).currentUser.status === "ACTIVE" ? "default" : "destructive",
                                class: "text-xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(usersStore).currentUser.status), 1)
                                ]),
                                _: 1
                              }, 8, ["variant"])
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Last Login"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(unref(usersStore).currentUser.lastLogin ? new Date(unref(usersStore).currentUser.lastLogin).toLocaleString() : "Never"), 1)
                            ]),
                            createVNode("div", { class: "space-y-1" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Created"),
                              createVNode("p", { class: "text-sm" }, toDisplayString(new Date(unref(usersStore).currentUser.createdAt).toLocaleDateString()), 1)
                            ]),
                            createVNode("div", { class: "space-y-1 sm:col-span-2" }, [
                              createVNode("p", { class: "text-xs font-medium text-muted-foreground" }, "Assigned Warehouses"),
                              unref(usersStore).currentUser.userWarehouses && unref(usersStore).currentUser.userWarehouses.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex flex-wrap gap-1"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(usersStore).currentUser.userWarehouses, (uw) => {
                                  return openBlock(), createBlock(_component_UiBadge, {
                                    key: uw.warehouse.id,
                                    variant: "secondary",
                                    class: "text-xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(uw.warehouse.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ])) : (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-sm text-muted-foreground"
                              }, "No warehouses assigned (admin)"))
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_UiTabsContent, { value: "permissions" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(_component_UiCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("User Permissions")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiCardDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Manage granular permissions for this user (overrides role permissions)")
                              ]),
                              _: 1
                            })
                          ]),
                          withDirectives((openBlock(), createBlock(_component_UiButton, {
                            size: "sm",
                            disabled: unref(availablePermissions).length === 0,
                            onClick: ($event) => showAssignDialog.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Shield), { class: "size-4" }),
                              createTextVNode(" Assign ")
                            ]),
                            _: 1
                          }, 8, ["disabled", "onClick"])), [
                            [_directive_can, { module: "USERS", action: "UPDATE" }]
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardContent, { class: "p-0" }, {
                        default: withCtx(() => [
                          unref(permsStore).loading && unref(permsStore).userPermissions.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-6"
                          }, [
                            createVNode(_component_LoadingState)
                          ])) : unref(permsStore).userPermissions.length === 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "p-6"
                          }, [
                            createVNode(_component_EmptyState, {
                              title: "No permissions assigned",
                              description: "This user has no custom permissions. They inherit permissions from their role."
                            })
                          ])) : (openBlock(), createBlock(_component_UiTable, { key: 2 }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Module")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Action")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Label")
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(permsStore).userPermissions, (up) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: up.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, { class: "text-sm font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(up.permission.module?.name || up.permission.moduleId), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiBadge, {
                                              variant: "outline",
                                              class: "text-xs"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(up.permission.action?.name || up.permission.actionId), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-xs text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(up.permission.label), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            withDirectives((openBlock(), createBlock(_component_UiButton, {
                                              variant: "ghost",
                                              size: "icon-xs",
                                              class: "text-destructive hover:text-destructive",
                                              onClick: ($event) => handleRemove(up.permissionId)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(ShieldX), { class: "size-3.5" })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])), [
                                              [_directive_can, { module: "USERS", action: "UPDATE" }]
                                            ])
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
      }, _parent));
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(showAssignDialog),
        "onUpdate:open": ($event) => showAssignDialog.value = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Assign Permission`);
                            } else {
                              return [
                                createTextVNode("Assign Permission")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Select a permission to assign to this user`);
                            } else {
                              return [
                                createTextVNode("Select a permission to assign to this user")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Assign Permission")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Select a permission to assign to this user")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "assign-perm" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Permission`);
                      } else {
                        return [
                          createTextVNode("Permission")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: unref(selectedPermissionId),
                    "onUpdate:modelValue": ($event) => isRef(selectedPermissionId) ? selectedPermissionId.value = $event : null,
                    items: unref(availablePermissions),
                    "label-key": "_label",
                    placeholder: "Select permission..."
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          variant: "outline",
                          onClick: ($event) => showAssignDialog.value = false
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
                          disabled: !unref(selectedPermissionId) || unref(permsStore).loading,
                          onClick: handleAssign
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Assign`);
                            } else {
                              return [
                                createTextVNode("Assign")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiButton, {
                            variant: "outline",
                            onClick: ($event) => showAssignDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            disabled: !unref(selectedPermissionId) || unref(permsStore).loading,
                            onClick: handleAssign
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Assign")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Assign Permission")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Select a permission to assign to this user")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "assign-perm" }, {
                          default: withCtx(() => [
                            createTextVNode("Permission")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: unref(selectedPermissionId),
                          "onUpdate:modelValue": ($event) => isRef(selectedPermissionId) ? selectedPermissionId.value = $event : null,
                          items: unref(availablePermissions),
                          "label-key": "_label",
                          placeholder: "Select permission..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            variant: "outline",
                            onClick: ($event) => showAssignDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            disabled: !unref(selectedPermissionId) || unref(permsStore).loading,
                            onClick: handleAssign
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Assign")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Assign Permission")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Select a permission to assign to this user")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "assign-perm" }, {
                        default: withCtx(() => [
                          createTextVNode("Permission")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: unref(selectedPermissionId),
                        "onUpdate:modelValue": ($event) => isRef(selectedPermissionId) ? selectedPermissionId.value = $event : null,
                        items: unref(availablePermissions),
                        "label-key": "_label",
                        placeholder: "Select permission..."
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          onClick: ($event) => showAssignDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          disabled: !unref(selectedPermissionId) || unref(permsStore).loading,
                          onClick: handleAssign
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Assign")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-i6hkV6UY.mjs.map
