import { _ as _sfc_main$2 } from './index-B-gxPDkl.mjs';
import { _ as _sfc_main$6, b as _sfc_main$1$1, a as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$3$1 } from './CardTitle-D6ZW0MPQ.mjs';
import { _ as __nuxt_component_3 } from './LookupCombobox-siniPGUU.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$3, c as _sfc_main$9, d as _sfc_main$7 } from './SelectValue-CdUm-rR7.mjs';
import { _ as __nuxt_component_10 } from './AppTable-fABlY_aP.mjs';
import { _ as __nuxt_component_7 } from './EmptyState-8bR4hl7N.mjs';
import { _ as __nuxt_component_1 } from './LoadingState-CyiqDoob.mjs';
import { _ as _sfc_main$9$1, a as _sfc_main$6$1, b as _sfc_main$3$2, c as _sfc_main$1$3, d as _sfc_main$5$1, e as _sfc_main$4$1 } from './DialogTrigger-CScv0ZwO.mjs';
import { _ as _sfc_main$8 } from './Label-Di1i-yIq.mjs';
import { _ as _sfc_main$b } from './Input-pgd-3rGf.mjs';
import { _ as _sfc_main$c } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$d } from './Checkbox-Yk18XaqA.mjs';
import { _ as __nuxt_component_20 } from './ConfirmDialog-B8hxYJp1.mjs';
import { defineComponent, ref, reactive, computed, watch, resolveDirective, mergeProps, withCtx, createTextVNode, unref, createVNode, withDirectives, openBlock, createBlock, toDisplayString, Fragment, renderList, createCommentVNode, withModifiers, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { Plus, Shield, Trash2, ChevronsUpDownIcon, XIcon, Loader2, Save, Eye, Pencil, MoreHorizontal } from '@lucide/vue';
import { toast } from 'vue-sonner';
import { h as usePermissions, n as navigateTo } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DEwgn_ii.mjs';
import { _ as _sfc_main$5$2, a as _sfc_main$3$3 } from './index-B7fxc1h0.mjs';
import { e as _sfc_main$9$2, d as _sfc_main$5$3, _ as _sfc_main$d$1, a as _sfc_main$e, b as _sfc_main$b$1 } from './DropdownMenuTrigger-MlqyivDB.mjs';
import { P as PageHeader } from './PageHeader-CZERfSxB.mjs';
import { u as useUsersStore, a as usePermissionsStore, f as fetchRolesLookupApi, b as fetchGroupedPermissionsApi, c as fetchRolePermissionIdsApi, d as createRoleApi, e as deleteRoleApi, g as createPermissionApi, h as updateRoleApi, s as saveRolePermissionsApi } from './store-B2e60c9z.mjs';
import 'class-variance-authority';
import 'reka-ui';
import '@vueuse/core';
import './Textarea-B_fNd96X.mjs';
import './TableHeader-Cc67ZnYT.mjs';
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
import 'clsx';
import 'tailwind-merge';

function roleBadgeVariant(role) {
  const map = {
    ADMIN: "destructive",
    MANAGER: "default",
    STOREKEEPER: "secondary",
    ACCOUNTANT: "outline",
    DISTRIBUTOR: "secondary",
    WORKER: "outline"
  };
  return map[role] || "outline";
}
function statusBadgeVariant(status) {
  return status === "ACTIVE" ? "default" : status === "INACTIVE" ? "secondary" : "destructive";
}
function getUserColumns(actions) {
  return [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        const user = row.original;
        return h("div", { class: "flex items-center gap-3" }, [
          h(_sfc_main$5$2, { class: "size-8" }, {
            default: () => h(_sfc_main$3$3, { class: "bg-primary/10 text-primary text-xs font-medium" }, user.name.charAt(0))
          }),
          h("div", null, [
            h(__nuxt_component_0, { to: `/users/${user.id}`, class: "text-sm font-medium hover:underline" }, user.name),
            h("p", { class: "text-xs text-muted-foreground" }, user.email)
          ])
        ]);
      }
    },
    {
      id: "role",
      header: "Role",
      accessorFn: (row) => row.role?.name || "",
      cell: ({ row }) => {
        const roleName = row.original.role?.name || "—";
        return h(_sfc_main$c, { variant: roleBadgeVariant(roleName), class: "text-xs" }, roleName);
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(_sfc_main$c, { variant: statusBadgeVariant(row.original.status), class: "text-xs" }, row.original.status)
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => {
        const date = row.original.lastLogin;
        return h("span", { class: "text-xs text-muted-foreground" }, date ? new Date(date).toLocaleDateString() : "Never");
      }
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        const { can } = usePermissions();
        const canEdit = can("USERS", "UPDATE");
        const canDelete = can("USERS", "DELETE");
        const items = [
          h(_sfc_main$9$2, { onClick: () => actions.onView(user.id) }, [
            h(Eye, { class: "size-4" }),
            " View"
          ])
        ];
        if (canEdit) {
          items.push(h(_sfc_main$9$2, { onClick: () => actions.onEdit(user) }, [
            h(Pencil, { class: "size-4" }),
            " Edit"
          ]));
        }
        if (canDelete) {
          items.push(h(_sfc_main$5$3));
          items.push(h(_sfc_main$9$2, { variant: "destructive", onClick: () => actions.onDelete(user) }, [
            h(Trash2, { class: "size-4" }),
            " Delete"
          ]));
        }
        return h("div", [
          h(_sfc_main$d$1, null, {
            default: () => [
              h(_sfc_main$e, { "as-child": true }, {
                default: () => h(_sfc_main$2, { variant: "ghost", size: "icon-sm" }, {
                  default: () => h(MoreHorizontal, { class: "size-4" })
                })
              }),
              h(_sfc_main$b$1, { align: "end", class: "w-36" }, items)
            ]
          })
        ]);
      }
    }
  ];
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PermissionGroup",
  __ssrInlineRender: true,
  props: {
    moduleName: {},
    moduleLabel: {},
    permissions: {},
    selectedIds: {}
  },
  emits: ["toggle", "toggleAll"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const allSelected = computed(
      () => props.permissions.length > 0 && props.permissions.every((p) => props.selectedIds.has(p.id))
    );
    const someSelected = computed(
      () => props.permissions.some((p) => props.selectedIds.has(p.id)) && !allSelected.value
    );
    function handleToggleAll() {
      emit("toggleAll", props.moduleName, !allSelected.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$5;
      const _component_UiCheckbox = _sfc_main$d;
      const _component_UiCardContent = _sfc_main$4;
      _push(ssrRenderComponent(_component_UiCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-base font-semibold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.moduleLabel || __props.moduleName)} Permissions`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.moduleLabel || __props.moduleName) + " Permissions", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<label class="flex items-center gap-2 text-sm cursor-pointer select-none"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCheckbox, {
                    "model-value": allSelected.value,
                    indeterminate: someSelected.value,
                    "onUpdate:modelValue": handleToggleAll
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-muted-foreground text-xs"${_scopeId2}>Select All</span></label></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode(_component_UiCardTitle, { class: "text-base font-semibold" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(__props.moduleLabel || __props.moduleName) + " Permissions", 1)
                        ]),
                        _: 1
                      }),
                      createVNode("label", { class: "flex items-center gap-2 text-sm cursor-pointer select-none" }, [
                        createVNode(_component_UiCheckbox, {
                          "model-value": allSelected.value,
                          indeterminate: someSelected.value,
                          "onUpdate:modelValue": handleToggleAll
                        }, null, 8, ["model-value", "indeterminate"]),
                        createVNode("span", { class: "text-muted-foreground text-xs" }, "Select All")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"${_scopeId2}><!--[-->`);
                  ssrRenderList(__props.permissions, (perm) => {
                    _push3(`<label class="${ssrRenderClass([{ "border-primary/30 bg-primary/5": __props.selectedIds.has(perm.id) }, "flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none"])}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiCheckbox, {
                      "model-value": __props.selectedIds.has(perm.id),
                      "onUpdate:modelValue": ($event) => emit("toggle", perm.id)
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="text-sm"${_scopeId2}>${ssrInterpolate(perm.label)}</span></label>`);
                  });
                  _push3(`<!--]--></div>`);
                  if (__props.permissions.length === 0) {
                    _push3(`<div class="py-3 text-center text-sm text-muted-foreground"${_scopeId2}> No permissions defined for this module </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.permissions, (perm) => {
                        return openBlock(), createBlock("label", {
                          key: perm.id,
                          class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": __props.selectedIds.has(perm.id) }]
                        }, [
                          createVNode(_component_UiCheckbox, {
                            "model-value": __props.selectedIds.has(perm.id),
                            "onUpdate:modelValue": ($event) => emit("toggle", perm.id)
                          }, null, 8, ["model-value", "onUpdate:modelValue"]),
                          createVNode("span", { class: "text-sm" }, toDisplayString(perm.label), 1)
                        ], 2);
                      }), 128))
                    ]),
                    __props.permissions.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-3 text-center text-sm text-muted-foreground"
                    }, " No permissions defined for this module ")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode(_component_UiCardTitle, { class: "text-base font-semibold" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.moduleLabel || __props.moduleName) + " Permissions", 1)
                      ]),
                      _: 1
                    }),
                    createVNode("label", { class: "flex items-center gap-2 text-sm cursor-pointer select-none" }, [
                      createVNode(_component_UiCheckbox, {
                        "model-value": allSelected.value,
                        indeterminate: someSelected.value,
                        "onUpdate:modelValue": handleToggleAll
                      }, null, 8, ["model-value", "indeterminate"]),
                      createVNode("span", { class: "text-muted-foreground text-xs" }, "Select All")
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.permissions, (perm) => {
                      return openBlock(), createBlock("label", {
                        key: perm.id,
                        class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": __props.selectedIds.has(perm.id) }]
                      }, [
                        createVNode(_component_UiCheckbox, {
                          "model-value": __props.selectedIds.has(perm.id),
                          "onUpdate:modelValue": ($event) => emit("toggle", perm.id)
                        }, null, 8, ["model-value", "onUpdate:modelValue"]),
                        createVNode("span", { class: "text-sm" }, toDisplayString(perm.label), 1)
                      ], 2);
                    }), 128))
                  ]),
                  __props.permissions.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "py-3 text-center text-sm text-muted-foreground"
                  }, " No permissions defined for this module ")) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/permissions/PermissionGroup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const userActions = {
      onView: (id) => navigateTo(`/users/${id}`),
      onEdit: (user) => openEdit(user),
      onDelete: (user) => openDelete(user)
    };
    const userColumns = getUserColumns(userActions);
    const usersStore = useUsersStore();
    const rolesStore = usePermissionsStore();
    const roleFilter = ref("all");
    const statusFilter = ref("all");
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const showDeleteDialog = ref(false);
    const editingUser = ref(null);
    const deletingUser = ref(null);
    const createForm = reactive({ name: "", email: "", password: "", phone: "", roleId: "" });
    const editForm = reactive({ name: "", email: "", phone: "", roleId: "", status: "ACTIVE" });
    const warehouses = ref([]);
    const createWarehouseIds = ref([]);
    const editWarehouseIds = ref([]);
    const showCreateWarehousePicker = ref(false);
    const showEditWarehousePicker = ref(false);
    function toggleCreateWarehouse(id) {
      const idx = createWarehouseIds.value.indexOf(id);
      if (idx === -1) createWarehouseIds.value.push(id);
      else createWarehouseIds.value.splice(idx, 1);
    }
    function toggleEditWarehouse(id) {
      const idx = editWarehouseIds.value.indexOf(id);
      if (idx === -1) editWarehouseIds.value.push(id);
      else editWarehouseIds.value.splice(idx, 1);
    }
    computed(() => rolesStore.roles);
    watch([roleFilter, statusFilter], () => fetchUsers());
    async function fetchUsers() {
      console.log("Fetching users with filters:", roleFilter.value, statusFilter.value);
      await usersStore.fetchUsers({ role: roleFilter.value === "all" ? void 0 : roleFilter.value, status: statusFilter.value === "all" ? void 0 : statusFilter.value });
    }
    async function handleCreate() {
      try {
        await usersStore.createUser({ ...createForm, warehouseIds: createWarehouseIds.value });
        showCreateDialog.value = false;
        resetCreateForm();
      } catch {
      }
    }
    function resetCreateForm() {
      createForm.name = "";
      createForm.email = "";
      createForm.password = "";
      createForm.phone = "";
      createForm.roleId = "";
      createWarehouseIds.value = [];
    }
    function openEdit(user) {
      editingUser.value = user;
      editForm.name = user.name;
      editForm.email = user.email;
      editForm.phone = user.phone ?? "";
      editForm.roleId = user.roleId;
      editForm.status = user.status;
      editWarehouseIds.value = (user.userWarehouses || []).map((uw) => uw.warehouse.id);
      showEditDialog.value = true;
    }
    async function handleEdit() {
      if (!editingUser.value) return;
      try {
        await usersStore.updateUser(editingUser.value.id, { ...editForm, warehouseIds: editWarehouseIds.value });
        showEditDialog.value = false;
        editingUser.value = null;
      } catch {
      }
    }
    function openDelete(user) {
      deletingUser.value = user;
      showDeleteDialog.value = true;
    }
    async function handleDeleteUser() {
      if (!deletingUser.value) return;
      try {
        await usersStore.deleteUser(deletingUser.value.id);
        showDeleteDialog.value = false;
        deletingUser.value = null;
      } catch {
      }
    }
    const userStatuses = ["ACTIVE", "INACTIVE", "BLOCKED"];
    const showCreatePermissionDialog = ref(false);
    const permissionModules = ref([]);
    const permissionActions = ref([]);
    const createPermissionForm = reactive({
      moduleId: "",
      actionId: "",
      label: ""
    });
    async function handleCreatePermission() {
      if (!createPermissionForm.moduleId || !createPermissionForm.actionId || !createPermissionForm.label) {
        toast.error("All fields are required");
        return;
      }
      try {
        await createPermissionApi(createPermissionForm);
        toast.success("Permission created");
        showCreatePermissionDialog.value = false;
        createPermissionForm.moduleId = "";
        createPermissionForm.actionId = "";
        createPermissionForm.label = "";
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to create permission");
      }
    }
    const roles = ref([]);
    const rolesLoading = ref(false);
    const editingRoleId = ref(null);
    const showRoleEditor = ref(false);
    const showCreateRoleDialog = ref(false);
    const showDeleteRoleDialog = ref(false);
    const deletingRole = ref(null);
    const newRoleName = ref("");
    const roleModules = ref([]);
    const roleSelectedIds = ref(/* @__PURE__ */ new Set());
    const roleEditName = ref("");
    const roleSaving = ref(false);
    async function fetchRoles() {
      rolesLoading.value = true;
      try {
        await rolesStore.fetchRoles();
        roles.value = rolesStore.roles;
      } catch {
        toast.error("Failed to load roles");
      } finally {
        rolesLoading.value = false;
      }
    }
    async function openRoleEditor(role) {
      editingRoleId.value = role.id;
      roleEditName.value = role.name;
      showRoleEditor.value = true;
      roleSaving.value = false;
      try {
        const [grouped, permIds] = await Promise.all([
          fetchGroupedPermissionsApi(),
          fetchRolePermissionIdsApi(role.id)
        ]);
        roleModules.value = grouped.modules;
        roleSelectedIds.value = new Set(permIds.permissionIds);
      } catch {
        toast.error("Failed to load permissions");
      }
    }
    function togglePermission(permissionId) {
      const next = new Set(roleSelectedIds.value);
      if (next.has(permissionId)) next.delete(permissionId);
      else next.add(permissionId);
      roleSelectedIds.value = next;
    }
    function toggleModuleAll(moduleName, checked) {
      const mod = roleModules.value.find((m) => m.name === moduleName);
      if (!mod) return;
      const next = new Set(roleSelectedIds.value);
      for (const p of mod.permissions) {
        if (checked) next.add(p.id);
        else next.delete(p.id);
      }
      roleSelectedIds.value = next;
    }
    async function handleSaveRole() {
      if (!editingRoleId.value) return;
      roleSaving.value = true;
      try {
        if (roleEditName.value) {
          await updateRoleApi(editingRoleId.value, { name: roleEditName.value });
        }
        await saveRolePermissionsApi(editingRoleId.value, Array.from(roleSelectedIds.value));
        toast.success("Role saved");
        showRoleEditor.value = false;
        await fetchRoles();
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to save role");
      } finally {
        roleSaving.value = false;
      }
    }
    async function handleCreateRole() {
      if (!newRoleName.value) {
        toast.error("Role name is required");
        return;
      }
      try {
        await createRoleApi({ name: newRoleName.value.toUpperCase(), label: newRoleName.value });
        toast.success("Role created");
        showCreateRoleDialog.value = false;
        newRoleName.value = "";
        await fetchRoles();
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to create role");
      }
    }
    function confirmDeleteRole(role) {
      deletingRole.value = role;
      showDeleteRoleDialog.value = true;
    }
    async function handleDeleteRole() {
      if (!deletingRole.value) return;
      try {
        await deleteRoleApi(deletingRole.value.id);
        toast.success("Role deleted");
        showDeleteRoleDialog.value = false;
        deletingRole.value = null;
        await fetchRoles();
      } catch (err) {
        toast.error(err?.data?.statusMessage || "Failed to delete role");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$2;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_LookupCombobox = __nuxt_component_3;
      const _component_UiSelect = _sfc_main$a;
      const _component_UiSelectTrigger = _sfc_main$1$2;
      const _component_UiSelectValue = _sfc_main$3;
      const _component_UiSelectContent = _sfc_main$9;
      const _component_UiSelectItem = _sfc_main$7;
      const _component_UiCardContent = _sfc_main$4;
      const _component_AppTable = __nuxt_component_10;
      const _component_EmptyState = __nuxt_component_7;
      const _component_UiCardTitle = _sfc_main$5;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_LoadingState = __nuxt_component_1;
      const _component_UiDialog = _sfc_main$9$1;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$2;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5$1;
      const _component_UiLabel = _sfc_main$8;
      const _component_UiInput = _sfc_main$b;
      const _component_UiBadge = _sfc_main$c;
      const _component_UiCheckbox = _sfc_main$d;
      const _component_UiDialogFooter = _sfc_main$4$1;
      const _component_ConfirmDialog = __nuxt_component_20;
      const _directive_can = resolveDirective("can");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(PageHeader, {
        title: "Users & Permissions",
        description: "Manage system users and role-based permissions"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              onClick: ($event) => showCreateDialog.value = true
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "USERS", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Create User`);
                } else {
                  return [
                    createTextVNode("Create User")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiButton, mergeProps({
              variant: "outline",
              onClick: ($event) => showCreateRoleDialog.value = true
            }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "USERS", action: "CREATE" })), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "size-4" }, null, _parent3, _scopeId2));
                  _push3(` Create Role `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "size-4" }),
                    createTextVNode(" Create Role ")
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
                  createTextVNode("Create User")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "USERS", action: "CREATE" }]
              ]),
              withDirectives((openBlock(), createBlock(_component_UiButton, {
                variant: "outline",
                onClick: ($event) => showCreateRoleDialog.value = true
              }, {
                default: withCtx(() => [
                  createVNode(unref(Plus), { class: "size-4" }),
                  createTextVNode(" Create Role ")
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_can, { module: "USERS", action: "CREATE" }]
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
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><h3 class="text-lg font-semibold"${_scopeId2}>Users</h3><div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    class: "w-50",
                    modelValue: roleFilter.value,
                    "onUpdate:modelValue": ($event) => roleFilter.value = $event,
                    endpoint: unref(fetchRolesLookupApi),
                    placeholder: "All roles",
                    "include-all": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: statusFilter.value,
                    "onUpdate:modelValue": ($event) => statusFilter.value = $event
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
                                    _push6(`All statuses`);
                                  } else {
                                    return [
                                      createTextVNode("All statuses")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<!--[-->`);
                              ssrRenderList(userStatuses, (s) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: s,
                                  value: s
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(s)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(s), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                createVNode(_component_UiSelectItem, { value: "all" }, {
                                  default: withCtx(() => [
                                    createTextVNode("All statuses")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(), createBlock(Fragment, null, renderList(userStatuses, (s) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: s,
                                    value: s
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(s), 1)
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
                                  createTextVNode("All statuses")
                                ]),
                                _: 1
                              }),
                              (openBlock(), createBlock(Fragment, null, renderList(userStatuses, (s) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: s,
                                  value: s
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(s), 1)
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
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h3", { class: "text-lg font-semibold" }, "Users"),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_LookupCombobox, {
                          class: "w-50",
                          modelValue: roleFilter.value,
                          "onUpdate:modelValue": ($event) => roleFilter.value = $event,
                          endpoint: unref(fetchRolesLookupApi),
                          placeholder: "All roles",
                          "include-all": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                        createVNode(_component_UiSelect, {
                          modelValue: statusFilter.value,
                          "onUpdate:modelValue": ($event) => statusFilter.value = $event
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
                                    createTextVNode("All statuses")
                                  ]),
                                  _: 1
                                }),
                                (openBlock(), createBlock(Fragment, null, renderList(userStatuses, (s) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: s,
                                    value: s
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(s), 1)
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
                    data: unref(usersStore).users,
                    columns: unref(userColumns),
                    loading: unref(usersStore).loading,
                    "server-total": unref(usersStore).total,
                    "search-placeholder": "Search by name or email..."
                  }, {
                    empty: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_EmptyState, {
                          title: "No users found",
                          description: roleFilter.value !== "all" || statusFilter.value !== "all" ? "Try adjusting your filters" : "Create your first user to get started",
                          action: roleFilter.value === "all" && statusFilter.value === "all" ? "Create User" : void 0,
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_EmptyState, {
                            title: "No users found",
                            description: roleFilter.value !== "all" || statusFilter.value !== "all" ? "Try adjusting your filters" : "Create your first user to get started",
                            action: roleFilter.value === "all" && statusFilter.value === "all" ? "Create User" : void 0,
                            onAction: ($event) => showCreateDialog.value = true
                          }, null, 8, ["description", "action", "onAction"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppTable, {
                      data: unref(usersStore).users,
                      columns: unref(userColumns),
                      loading: unref(usersStore).loading,
                      "server-total": unref(usersStore).total,
                      "search-placeholder": "Search by name or email..."
                    }, {
                      empty: withCtx(() => [
                        createVNode(_component_EmptyState, {
                          title: "No users found",
                          description: roleFilter.value !== "all" || statusFilter.value !== "all" ? "Try adjusting your filters" : "Create your first user to get started",
                          action: roleFilter.value === "all" && statusFilter.value === "all" ? "Create User" : void 0,
                          onAction: ($event) => showCreateDialog.value = true
                        }, null, 8, ["description", "action", "onAction"])
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
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("h3", { class: "text-lg font-semibold" }, "Users"),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_LookupCombobox, {
                        class: "w-50",
                        modelValue: roleFilter.value,
                        "onUpdate:modelValue": ($event) => roleFilter.value = $event,
                        endpoint: unref(fetchRolesLookupApi),
                        placeholder: "All roles",
                        "include-all": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"]),
                      createVNode(_component_UiSelect, {
                        modelValue: statusFilter.value,
                        "onUpdate:modelValue": ($event) => statusFilter.value = $event
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
                                  createTextVNode("All statuses")
                                ]),
                                _: 1
                              }),
                              (openBlock(), createBlock(Fragment, null, renderList(userStatuses, (s) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: s,
                                  value: s
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(s), 1)
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
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode(_component_AppTable, {
                    data: unref(usersStore).users,
                    columns: unref(userColumns),
                    loading: unref(usersStore).loading,
                    "server-total": unref(usersStore).total,
                    "search-placeholder": "Search by name or email..."
                  }, {
                    empty: withCtx(() => [
                      createVNode(_component_EmptyState, {
                        title: "No users found",
                        description: roleFilter.value !== "all" || statusFilter.value !== "all" ? "Try adjusting your filters" : "Create your first user to get started",
                        action: roleFilter.value === "all" && statusFilter.value === "all" ? "Create User" : void 0,
                        onAction: ($event) => showCreateDialog.value = true
                      }, null, 8, ["description", "action", "onAction"])
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
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Roles`);
                      } else {
                        return [
                          createTextVNode("Roles")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Manage role-based permissions. Each role defines what actions users can perform.`);
                      } else {
                        return [
                          createTextVNode("Manage role-based permissions. Each role defines what actions users can perform.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Roles")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Manage role-based permissions. Each role defines what actions users can perform.")
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
                  if (rolesLoading.value && roles.value.length === 0) {
                    _push3(`<div class="py-8"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_LoadingState, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (roles.value.length === 0) {
                    _push3(`<div class="py-8"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_EmptyState, {
                      title: "No roles defined",
                      description: "Create your first role to set up access control",
                      action: "Create Role",
                      onAction: ($event) => showCreateRoleDialog.value = true
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(roles.value, (role) => {
                      _push3(`<div class="rounded-lg border p-4 flex items-center justify-between hover:bg-accent/30 transition-colors"${_scopeId2}><div${_scopeId2}><p class="font-medium"${_scopeId2}>${ssrInterpolate(role.name)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(role._count?.users ?? 0)} user${ssrInterpolate((role._count?.users ?? 0) !== 1 ? "s" : "")}</p></div><div class="flex gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiButton, mergeProps({
                        variant: "ghost",
                        size: "icon-sm",
                        onClick: ($event) => openRoleEditor(role)
                      }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "USERS", action: "UPDATE" })), {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Shield), { class: "size-3.5" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(Shield), { class: "size-3.5" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiButton, mergeProps({
                        variant: "ghost",
                        size: "icon-sm",
                        class: "text-destructive hover:text-destructive",
                        onClick: ($event) => confirmDeleteRole(role)
                      }, ssrGetDirectiveProps(_ctx, _directive_can, { module: "USERS", action: "DELETE" })), {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(Trash2), { class: "size-3.5" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(Trash2), { class: "size-3.5" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                } else {
                  return [
                    rolesLoading.value && roles.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-8"
                    }, [
                      createVNode(_component_LoadingState)
                    ])) : roles.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-8"
                    }, [
                      createVNode(_component_EmptyState, {
                        title: "No roles defined",
                        description: "Create your first role to set up access control",
                        action: "Create Role",
                        onAction: ($event) => showCreateRoleDialog.value = true
                      }, null, 8, ["onAction"])
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(roles.value, (role) => {
                        return openBlock(), createBlock("div", {
                          key: role.id,
                          class: "rounded-lg border p-4 flex items-center justify-between hover:bg-accent/30 transition-colors"
                        }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "font-medium" }, toDisplayString(role.name), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(role._count?.users ?? 0) + " user" + toDisplayString((role._count?.users ?? 0) !== 1 ? "s" : ""), 1)
                          ]),
                          createVNode("div", { class: "flex gap-1" }, [
                            withDirectives((openBlock(), createBlock(_component_UiButton, {
                              variant: "ghost",
                              size: "icon-sm",
                              onClick: ($event) => openRoleEditor(role)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Shield), { class: "size-3.5" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])), [
                              [_directive_can, { module: "USERS", action: "UPDATE" }]
                            ]),
                            withDirectives((openBlock(), createBlock(_component_UiButton, {
                              variant: "ghost",
                              size: "icon-sm",
                              class: "text-destructive hover:text-destructive",
                              onClick: ($event) => confirmDeleteRole(role)
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Trash2), { class: "size-3.5" })
                              ]),
                              _: 1
                            }, 8, ["onClick"])), [
                              [_directive_can, { module: "USERS", action: "DELETE" }]
                            ])
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
                      createTextVNode("Roles")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Manage role-based permissions. Each role defines what actions users can perform.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  rolesLoading.value && roles.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "py-8"
                  }, [
                    createVNode(_component_LoadingState)
                  ])) : roles.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-8"
                  }, [
                    createVNode(_component_EmptyState, {
                      title: "No roles defined",
                      description: "Create your first role to set up access control",
                      action: "Create Role",
                      onAction: ($event) => showCreateRoleDialog.value = true
                    }, null, 8, ["onAction"])
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(roles.value, (role) => {
                      return openBlock(), createBlock("div", {
                        key: role.id,
                        class: "rounded-lg border p-4 flex items-center justify-between hover:bg-accent/30 transition-colors"
                      }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "font-medium" }, toDisplayString(role.name), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(role._count?.users ?? 0) + " user" + toDisplayString((role._count?.users ?? 0) !== 1 ? "s" : ""), 1)
                        ]),
                        createVNode("div", { class: "flex gap-1" }, [
                          withDirectives((openBlock(), createBlock(_component_UiButton, {
                            variant: "ghost",
                            size: "icon-sm",
                            onClick: ($event) => openRoleEditor(role)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Shield), { class: "size-3.5" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])), [
                            [_directive_can, { module: "USERS", action: "UPDATE" }]
                          ]),
                          withDirectives((openBlock(), createBlock(_component_UiButton, {
                            variant: "ghost",
                            size: "icon-sm",
                            class: "text-destructive hover:text-destructive",
                            onClick: ($event) => confirmDeleteRole(role)
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Trash2), { class: "size-3.5" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])), [
                            [_directive_can, { module: "USERS", action: "DELETE" }]
                          ])
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
      _push(ssrRenderComponent(_component_UiDialog, {
        open: showCreateDialog.value,
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
                              _push5(`Create User`);
                            } else {
                              return [
                                createTextVNode("Create User")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add a new user to the system`);
                            } else {
                              return [
                                createTextVNode("Add a new user to the system")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Create User")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Add a new user to the system")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-name",
                    modelValue: createForm.name,
                    "onUpdate:modelValue": ($event) => createForm.name = $event,
                    placeholder: "Full name",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email`);
                      } else {
                        return [
                          createTextVNode("Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-email",
                    modelValue: createForm.email,
                    "onUpdate:modelValue": ($event) => createForm.email = $event,
                    type: "email",
                    placeholder: "email@example.com",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-password",
                    modelValue: createForm.password,
                    "onUpdate:modelValue": ($event) => createForm.password = $event,
                    type: "password",
                    placeholder: "Min 6 characters",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-role" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Role`);
                      } else {
                        return [
                          createTextVNode("Role")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: createForm.roleId,
                    "onUpdate:modelValue": ($event) => createForm.roleId = $event,
                    endpoint: unref(fetchRolesLookupApi),
                    placeholder: "Select role"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "create-phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone`);
                      } else {
                        return [
                          createTextVNode("Phone")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "create-phone",
                    modelValue: createForm.phone,
                    "onUpdate:modelValue": ($event) => createForm.phone = $event,
                    placeholder: "Optional"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Warehouses`);
                      } else {
                        return [
                          createTextVNode("Warehouses")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiButton, {
                    variant: "outline",
                    class: "w-full justify-between font-normal",
                    onClick: ($event) => showCreateWarehousePicker.value = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (createWarehouseIds.value.length === 0) {
                          _push4(`<span class="text-muted-foreground"${_scopeId3}>Select warehouses...</span>`);
                        } else {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(createWarehouseIds.value.length)} warehouse${ssrInterpolate(createWarehouseIds.value.length !== 1 ? "s" : "")} selected</span>`);
                        }
                        _push4(ssrRenderComponent(unref(ChevronsUpDownIcon), { class: "size-4 shrink-0 opacity-50" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createWarehouseIds.value.length === 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-muted-foreground"
                          }, "Select warehouses...")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(createWarehouseIds.value.length) + " warehouse" + toDisplayString(createWarehouseIds.value.length !== 1 ? "s" : "") + " selected", 1)),
                          createVNode(unref(ChevronsUpDownIcon), { class: "size-4 shrink-0 opacity-50" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (createWarehouseIds.value.length > 0) {
                    _push3(`<div class="flex flex-wrap gap-1 mt-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(createWarehouseIds.value, (id) => {
                      _push3(ssrRenderComponent(_component_UiBadge, {
                        key: id,
                        variant: "secondary",
                        class: "cursor-pointer gap-1",
                        onClick: ($event) => toggleCreateWarehouse(id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(warehouses.value.find((w) => w.id === id)?.name || id)} `);
                            _push4(ssrRenderComponent(unref(XIcon), { class: "size-3" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createTextVNode(toDisplayString(warehouses.value.find((w) => w.id === id)?.name || id) + " ", 1),
                              createVNode(unref(XIcon), { class: "size-3" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialog, {
                    open: showCreateWarehousePicker.value,
                    "onUpdate:open": ($event) => showCreateWarehousePicker.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiDialogHeader, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiDialogTitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Select Warehouses`);
                                        } else {
                                          return [
                                            createTextVNode("Select Warehouses")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_UiDialogDescription, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Choose which warehouses this user can access`);
                                        } else {
                                          return [
                                            createTextVNode("Choose which warehouses this user can access")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiDialogTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Select Warehouses")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiDialogDescription, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Choose which warehouses this user can access")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="space-y-1 max-h-80 overflow-y-auto py-2"${_scopeId4}><!--[-->`);
                              ssrRenderList(warehouses.value, (w) => {
                                _push5(`<div class="${ssrRenderClass([{ "border-primary/30 bg-primary/5": createWarehouseIds.value.includes(w.id) }, "flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none"])}"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_UiCheckbox, {
                                  "model-value": createWarehouseIds.value.includes(w.id)
                                }, null, _parent5, _scopeId4));
                                _push5(`<span class="text-sm"${_scopeId4}>${ssrInterpolate(w.name)}</span></div>`);
                              });
                              _push5(`<!--]-->`);
                              if (warehouses.value.length === 0) {
                                _push5(`<div class="py-3 text-center text-sm text-muted-foreground"${_scopeId4}> No warehouses available </div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(_component_UiDialogFooter, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiButton, {
                                      onClick: ($event) => showCreateWarehousePicker.value = false
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Done`);
                                        } else {
                                          return [
                                            createTextVNode("Done")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiButton, {
                                        onClick: ($event) => showCreateWarehousePicker.value = false
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Done")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiDialogHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiDialogTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Select Warehouses")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiDialogDescription, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Choose which warehouses this user can access")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "space-y-1 max-h-80 overflow-y-auto py-2" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(warehouses.value, (w) => {
                                    return openBlock(), createBlock("div", {
                                      key: w.id,
                                      class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": createWarehouseIds.value.includes(w.id) }],
                                      onClick: ($event) => toggleCreateWarehouse(w.id)
                                    }, [
                                      createVNode(_component_UiCheckbox, {
                                        "model-value": createWarehouseIds.value.includes(w.id)
                                      }, null, 8, ["model-value"]),
                                      createVNode("span", { class: "text-sm" }, toDisplayString(w.name), 1)
                                    ], 10, ["onClick"]);
                                  }), 128)),
                                  warehouses.value.length === 0 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "py-3 text-center text-sm text-muted-foreground"
                                  }, " No warehouses available ")) : createCommentVNode("", true)
                                ]),
                                createVNode(_component_UiDialogFooter, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiButton, {
                                      onClick: ($event) => showCreateWarehousePicker.value = false
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Done")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
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
                          createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiDialogHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiDialogTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Select Warehouses")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiDialogDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Choose which warehouses this user can access")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "space-y-1 max-h-80 overflow-y-auto py-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(warehouses.value, (w) => {
                                  return openBlock(), createBlock("div", {
                                    key: w.id,
                                    class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": createWarehouseIds.value.includes(w.id) }],
                                    onClick: ($event) => toggleCreateWarehouse(w.id)
                                  }, [
                                    createVNode(_component_UiCheckbox, {
                                      "model-value": createWarehouseIds.value.includes(w.id)
                                    }, null, 8, ["model-value"]),
                                    createVNode("span", { class: "text-sm" }, toDisplayString(w.name), 1)
                                  ], 10, ["onClick"]);
                                }), 128)),
                                warehouses.value.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "py-3 text-center text-sm text-muted-foreground"
                                }, " No warehouses available ")) : createCommentVNode("", true)
                              ]),
                              createVNode(_component_UiDialogFooter, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiButton, {
                                    onClick: ($event) => showCreateWarehousePicker.value = false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Done")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
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
                          disabled: unref(usersStore).loading
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
                            disabled: unref(usersStore).loading
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
                            createTextVNode("Create User")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Add a new user to the system")
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
                        createVNode(_component_UiLabel, { for: "create-name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-name",
                          modelValue: createForm.name,
                          "onUpdate:modelValue": ($event) => createForm.name = $event,
                          placeholder: "Full name",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-email",
                          modelValue: createForm.email,
                          "onUpdate:modelValue": ($event) => createForm.email = $event,
                          type: "email",
                          placeholder: "email@example.com",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-password" }, {
                          default: withCtx(() => [
                            createTextVNode("Password")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-password",
                          modelValue: createForm.password,
                          "onUpdate:modelValue": ($event) => createForm.password = $event,
                          type: "password",
                          placeholder: "Min 6 characters",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-role" }, {
                            default: withCtx(() => [
                              createTextVNode("Role")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LookupCombobox, {
                            modelValue: createForm.roleId,
                            "onUpdate:modelValue": ($event) => createForm.roleId = $event,
                            endpoint: unref(fetchRolesLookupApi),
                            placeholder: "Select role"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "create-phone" }, {
                            default: withCtx(() => [
                              createTextVNode("Phone")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "create-phone",
                            modelValue: createForm.phone,
                            "onUpdate:modelValue": ($event) => createForm.phone = $event,
                            placeholder: "Optional"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Warehouses")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          class: "w-full justify-between font-normal",
                          onClick: ($event) => showCreateWarehousePicker.value = true
                        }, {
                          default: withCtx(() => [
                            createWarehouseIds.value.length === 0 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-muted-foreground"
                            }, "Select warehouses...")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(createWarehouseIds.value.length) + " warehouse" + toDisplayString(createWarehouseIds.value.length !== 1 ? "s" : "") + " selected", 1)),
                            createVNode(unref(ChevronsUpDownIcon), { class: "size-4 shrink-0 opacity-50" })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createWarehouseIds.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-wrap gap-1 mt-1"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(createWarehouseIds.value, (id) => {
                            return openBlock(), createBlock(_component_UiBadge, {
                              key: id,
                              variant: "secondary",
                              class: "cursor-pointer gap-1",
                              onClick: ($event) => toggleCreateWarehouse(id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(warehouses.value.find((w) => w.id === id)?.name || id) + " ", 1),
                                createVNode(unref(XIcon), { class: "size-3" })
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode(_component_UiDialog, {
                        open: showCreateWarehousePicker.value,
                        "onUpdate:open": ($event) => showCreateWarehousePicker.value = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiDialogHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiDialogTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Select Warehouses")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiDialogDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Choose which warehouses this user can access")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "space-y-1 max-h-80 overflow-y-auto py-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(warehouses.value, (w) => {
                                  return openBlock(), createBlock("div", {
                                    key: w.id,
                                    class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": createWarehouseIds.value.includes(w.id) }],
                                    onClick: ($event) => toggleCreateWarehouse(w.id)
                                  }, [
                                    createVNode(_component_UiCheckbox, {
                                      "model-value": createWarehouseIds.value.includes(w.id)
                                    }, null, 8, ["model-value"]),
                                    createVNode("span", { class: "text-sm" }, toDisplayString(w.name), 1)
                                  ], 10, ["onClick"]);
                                }), 128)),
                                warehouses.value.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "py-3 text-center text-sm text-muted-foreground"
                                }, " No warehouses available ")) : createCommentVNode("", true)
                              ]),
                              createVNode(_component_UiDialogFooter, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiButton, {
                                    onClick: ($event) => showCreateWarehousePicker.value = false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Done")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["open", "onUpdate:open"]),
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
                            disabled: unref(usersStore).loading
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
                          createTextVNode("Create User")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Add a new user to the system")
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
                      createVNode(_component_UiLabel, { for: "create-name" }, {
                        default: withCtx(() => [
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "create-name",
                        modelValue: createForm.name,
                        "onUpdate:modelValue": ($event) => createForm.name = $event,
                        placeholder: "Full name",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "create-email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "create-email",
                        modelValue: createForm.email,
                        "onUpdate:modelValue": ($event) => createForm.email = $event,
                        type: "email",
                        placeholder: "email@example.com",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "create-password" }, {
                        default: withCtx(() => [
                          createTextVNode("Password")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "create-password",
                        modelValue: createForm.password,
                        "onUpdate:modelValue": ($event) => createForm.password = $event,
                        type: "password",
                        placeholder: "Min 6 characters",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-role" }, {
                          default: withCtx(() => [
                            createTextVNode("Role")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: createForm.roleId,
                          "onUpdate:modelValue": ($event) => createForm.roleId = $event,
                          endpoint: unref(fetchRolesLookupApi),
                          placeholder: "Select role"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "create-phone" }, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "create-phone",
                          modelValue: createForm.phone,
                          "onUpdate:modelValue": ($event) => createForm.phone = $event,
                          placeholder: "Optional"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Warehouses")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        class: "w-full justify-between font-normal",
                        onClick: ($event) => showCreateWarehousePicker.value = true
                      }, {
                        default: withCtx(() => [
                          createWarehouseIds.value.length === 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-muted-foreground"
                          }, "Select warehouses...")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(createWarehouseIds.value.length) + " warehouse" + toDisplayString(createWarehouseIds.value.length !== 1 ? "s" : "") + " selected", 1)),
                          createVNode(unref(ChevronsUpDownIcon), { class: "size-4 shrink-0 opacity-50" })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createWarehouseIds.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-wrap gap-1 mt-1"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(createWarehouseIds.value, (id) => {
                          return openBlock(), createBlock(_component_UiBadge, {
                            key: id,
                            variant: "secondary",
                            class: "cursor-pointer gap-1",
                            onClick: ($event) => toggleCreateWarehouse(id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(warehouses.value.find((w) => w.id === id)?.name || id) + " ", 1),
                              createVNode(unref(XIcon), { class: "size-3" })
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_UiDialog, {
                      open: showCreateWarehousePicker.value,
                      "onUpdate:open": ($event) => showCreateWarehousePicker.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiDialogHeader, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiDialogTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Select Warehouses")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiDialogDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Choose which warehouses this user can access")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "space-y-1 max-h-80 overflow-y-auto py-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(warehouses.value, (w) => {
                                return openBlock(), createBlock("div", {
                                  key: w.id,
                                  class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": createWarehouseIds.value.includes(w.id) }],
                                  onClick: ($event) => toggleCreateWarehouse(w.id)
                                }, [
                                  createVNode(_component_UiCheckbox, {
                                    "model-value": createWarehouseIds.value.includes(w.id)
                                  }, null, 8, ["model-value"]),
                                  createVNode("span", { class: "text-sm" }, toDisplayString(w.name), 1)
                                ], 10, ["onClick"]);
                              }), 128)),
                              warehouses.value.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "py-3 text-center text-sm text-muted-foreground"
                              }, " No warehouses available ")) : createCommentVNode("", true)
                            ]),
                            createVNode(_component_UiDialogFooter, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiButton, {
                                  onClick: ($event) => showCreateWarehousePicker.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Done")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["open", "onUpdate:open"]),
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
                          disabled: unref(usersStore).loading
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
        open: showEditDialog.value,
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
                              _push5(`Edit User`);
                            } else {
                              return [
                                createTextVNode("Edit User")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update user information`);
                            } else {
                              return [
                                createTextVNode("Update user information")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit User")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Update user information")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-name",
                    modelValue: editForm.name,
                    "onUpdate:modelValue": ($event) => editForm.name = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email`);
                      } else {
                        return [
                          createTextVNode("Email")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-email",
                    modelValue: editForm.email,
                    "onUpdate:modelValue": ($event) => editForm.email = $event,
                    type: "email",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone`);
                      } else {
                        return [
                          createTextVNode("Phone")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-phone",
                    modelValue: editForm.phone,
                    "onUpdate:modelValue": ($event) => editForm.phone = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid grid-cols-2 gap-3"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-role" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Role`);
                      } else {
                        return [
                          createTextVNode("Role")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: editForm.roleId,
                    "onUpdate:modelValue": ($event) => editForm.roleId = $event,
                    endpoint: unref(fetchRolesLookupApi),
                    placeholder: "Select role"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-status" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Status`);
                      } else {
                        return [
                          createTextVNode("Status")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelect, {
                    modelValue: editForm.status,
                    "onUpdate:modelValue": ($event) => editForm.status = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectTrigger, { id: "edit-status" }, {
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
                              ssrRenderList(userStatuses, (s) => {
                                _push5(ssrRenderComponent(_component_UiSelectItem, {
                                  key: s,
                                  value: s
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(s)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(s), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(userStatuses, (s) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: s,
                                    value: s
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(s), 1)
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
                          createVNode(_component_UiSelectTrigger, { id: "edit-status" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectValue)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelectContent, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(userStatuses, (s) => {
                                return createVNode(_component_UiSelectItem, {
                                  key: s,
                                  value: s
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(s), 1)
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
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Warehouses`);
                      } else {
                        return [
                          createTextVNode("Warehouses")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiButton, {
                    variant: "outline",
                    class: "w-full justify-between font-normal",
                    onClick: ($event) => showEditWarehousePicker.value = true
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (editWarehouseIds.value.length === 0) {
                          _push4(`<span class="text-muted-foreground"${_scopeId3}>Select warehouses...</span>`);
                        } else {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(editWarehouseIds.value.length)} warehouse${ssrInterpolate(editWarehouseIds.value.length !== 1 ? "s" : "")} selected</span>`);
                        }
                        _push4(ssrRenderComponent(unref(ChevronsUpDownIcon), { class: "size-4 shrink-0 opacity-50" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          editWarehouseIds.value.length === 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-muted-foreground"
                          }, "Select warehouses...")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(editWarehouseIds.value.length) + " warehouse" + toDisplayString(editWarehouseIds.value.length !== 1 ? "s" : "") + " selected", 1)),
                          createVNode(unref(ChevronsUpDownIcon), { class: "size-4 shrink-0 opacity-50" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (editWarehouseIds.value.length > 0) {
                    _push3(`<div class="flex flex-wrap gap-1 mt-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(editWarehouseIds.value, (id) => {
                      _push3(ssrRenderComponent(_component_UiBadge, {
                        key: id,
                        variant: "secondary",
                        class: "cursor-pointer gap-1",
                        onClick: ($event) => toggleEditWarehouse(id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(warehouses.value.find((w) => w.id === id)?.name || id)} `);
                            _push4(ssrRenderComponent(unref(XIcon), { class: "size-3" }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createTextVNode(toDisplayString(warehouses.value.find((w) => w.id === id)?.name || id) + " ", 1),
                              createVNode(unref(XIcon), { class: "size-3" })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialog, {
                    open: showEditWarehousePicker.value,
                    "onUpdate:open": ($event) => showEditWarehousePicker.value = $event
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiDialogHeader, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiDialogTitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Select Warehouses`);
                                        } else {
                                          return [
                                            createTextVNode("Select Warehouses")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_UiDialogDescription, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Choose which warehouses this user can access`);
                                        } else {
                                          return [
                                            createTextVNode("Choose which warehouses this user can access")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiDialogTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Select Warehouses")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiDialogDescription, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Choose which warehouses this user can access")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="space-y-1 max-h-80 overflow-y-auto py-2"${_scopeId4}><!--[-->`);
                              ssrRenderList(warehouses.value, (w) => {
                                _push5(`<div class="${ssrRenderClass([{ "border-primary/30 bg-primary/5": editWarehouseIds.value.includes(w.id) }, "flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none"])}"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_UiCheckbox, {
                                  "model-value": editWarehouseIds.value.includes(w.id)
                                }, null, _parent5, _scopeId4));
                                _push5(`<span class="text-sm"${_scopeId4}>${ssrInterpolate(w.name)}</span></div>`);
                              });
                              _push5(`<!--]-->`);
                              if (warehouses.value.length === 0) {
                                _push5(`<div class="py-3 text-center text-sm text-muted-foreground"${_scopeId4}> No warehouses available </div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(_component_UiDialogFooter, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiButton, {
                                      onClick: ($event) => showEditWarehousePicker.value = false
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Done`);
                                        } else {
                                          return [
                                            createTextVNode("Done")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiButton, {
                                        onClick: ($event) => showEditWarehousePicker.value = false
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Done")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiDialogHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiDialogTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Select Warehouses")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiDialogDescription, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Choose which warehouses this user can access")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "space-y-1 max-h-80 overflow-y-auto py-2" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(warehouses.value, (w) => {
                                    return openBlock(), createBlock("div", {
                                      key: w.id,
                                      class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": editWarehouseIds.value.includes(w.id) }],
                                      onClick: ($event) => toggleEditWarehouse(w.id)
                                    }, [
                                      createVNode(_component_UiCheckbox, {
                                        "model-value": editWarehouseIds.value.includes(w.id)
                                      }, null, 8, ["model-value"]),
                                      createVNode("span", { class: "text-sm" }, toDisplayString(w.name), 1)
                                    ], 10, ["onClick"]);
                                  }), 128)),
                                  warehouses.value.length === 0 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "py-3 text-center text-sm text-muted-foreground"
                                  }, " No warehouses available ")) : createCommentVNode("", true)
                                ]),
                                createVNode(_component_UiDialogFooter, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiButton, {
                                      onClick: ($event) => showEditWarehousePicker.value = false
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Done")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
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
                          createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiDialogHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiDialogTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Select Warehouses")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiDialogDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Choose which warehouses this user can access")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "space-y-1 max-h-80 overflow-y-auto py-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(warehouses.value, (w) => {
                                  return openBlock(), createBlock("div", {
                                    key: w.id,
                                    class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": editWarehouseIds.value.includes(w.id) }],
                                    onClick: ($event) => toggleEditWarehouse(w.id)
                                  }, [
                                    createVNode(_component_UiCheckbox, {
                                      "model-value": editWarehouseIds.value.includes(w.id)
                                    }, null, 8, ["model-value"]),
                                    createVNode("span", { class: "text-sm" }, toDisplayString(w.name), 1)
                                  ], 10, ["onClick"]);
                                }), 128)),
                                warehouses.value.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "py-3 text-center text-sm text-muted-foreground"
                                }, " No warehouses available ")) : createCommentVNode("", true)
                              ]),
                              createVNode(_component_UiDialogFooter, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiButton, {
                                    onClick: ($event) => showEditWarehousePicker.value = false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Done")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
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
                          disabled: unref(usersStore).loading
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
                            disabled: unref(usersStore).loading
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
                            createTextVNode("Edit User")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Update user information")
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
                        createVNode(_component_UiLabel, { for: "edit-name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-name",
                          modelValue: editForm.name,
                          "onUpdate:modelValue": ($event) => editForm.name = $event,
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-email" }, {
                          default: withCtx(() => [
                            createTextVNode("Email")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-email",
                          modelValue: editForm.email,
                          "onUpdate:modelValue": ($event) => editForm.email = $event,
                          type: "email",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-phone" }, {
                          default: withCtx(() => [
                            createTextVNode("Phone")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-phone",
                          modelValue: editForm.phone,
                          "onUpdate:modelValue": ($event) => editForm.phone = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-role" }, {
                            default: withCtx(() => [
                              createTextVNode("Role")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_LookupCombobox, {
                            modelValue: editForm.roleId,
                            "onUpdate:modelValue": ($event) => editForm.roleId = $event,
                            endpoint: unref(fetchRolesLookupApi),
                            placeholder: "Select role"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-status" }, {
                            default: withCtx(() => [
                              createTextVNode("Status")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            modelValue: editForm.status,
                            "onUpdate:modelValue": ($event) => editForm.status = $event
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { id: "edit-status" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(userStatuses, (s) => {
                                    return createVNode(_component_UiSelectItem, {
                                      key: s,
                                      value: s
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(s), 1)
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
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, null, {
                          default: withCtx(() => [
                            createTextVNode("Warehouses")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          class: "w-full justify-between font-normal",
                          onClick: ($event) => showEditWarehousePicker.value = true
                        }, {
                          default: withCtx(() => [
                            editWarehouseIds.value.length === 0 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-muted-foreground"
                            }, "Select warehouses...")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(editWarehouseIds.value.length) + " warehouse" + toDisplayString(editWarehouseIds.value.length !== 1 ? "s" : "") + " selected", 1)),
                            createVNode(unref(ChevronsUpDownIcon), { class: "size-4 shrink-0 opacity-50" })
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        editWarehouseIds.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex flex-wrap gap-1 mt-1"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(editWarehouseIds.value, (id) => {
                            return openBlock(), createBlock(_component_UiBadge, {
                              key: id,
                              variant: "secondary",
                              class: "cursor-pointer gap-1",
                              onClick: ($event) => toggleEditWarehouse(id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(warehouses.value.find((w) => w.id === id)?.name || id) + " ", 1),
                                createVNode(unref(XIcon), { class: "size-3" })
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode(_component_UiDialog, {
                        open: showEditWarehousePicker.value,
                        "onUpdate:open": ($event) => showEditWarehousePicker.value = $event
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                            default: withCtx(() => [
                              createVNode(_component_UiDialogHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiDialogTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Select Warehouses")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiDialogDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Choose which warehouses this user can access")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "space-y-1 max-h-80 overflow-y-auto py-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(warehouses.value, (w) => {
                                  return openBlock(), createBlock("div", {
                                    key: w.id,
                                    class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": editWarehouseIds.value.includes(w.id) }],
                                    onClick: ($event) => toggleEditWarehouse(w.id)
                                  }, [
                                    createVNode(_component_UiCheckbox, {
                                      "model-value": editWarehouseIds.value.includes(w.id)
                                    }, null, 8, ["model-value"]),
                                    createVNode("span", { class: "text-sm" }, toDisplayString(w.name), 1)
                                  ], 10, ["onClick"]);
                                }), 128)),
                                warehouses.value.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "py-3 text-center text-sm text-muted-foreground"
                                }, " No warehouses available ")) : createCommentVNode("", true)
                              ]),
                              createVNode(_component_UiDialogFooter, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiButton, {
                                    onClick: ($event) => showEditWarehousePicker.value = false
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Done")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["open", "onUpdate:open"]),
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
                            disabled: unref(usersStore).loading
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
                          createTextVNode("Edit User")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Update user information")
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
                      createVNode(_component_UiLabel, { for: "edit-name" }, {
                        default: withCtx(() => [
                          createTextVNode("Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "edit-name",
                        modelValue: editForm.name,
                        "onUpdate:modelValue": ($event) => editForm.name = $event,
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "edit-email" }, {
                        default: withCtx(() => [
                          createTextVNode("Email")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "edit-email",
                        modelValue: editForm.email,
                        "onUpdate:modelValue": ($event) => editForm.email = $event,
                        type: "email",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "edit-phone" }, {
                        default: withCtx(() => [
                          createTextVNode("Phone")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "edit-phone",
                        modelValue: editForm.phone,
                        "onUpdate:modelValue": ($event) => editForm.phone = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-role" }, {
                          default: withCtx(() => [
                            createTextVNode("Role")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: editForm.roleId,
                          "onUpdate:modelValue": ($event) => editForm.roleId = $event,
                          endpoint: unref(fetchRolesLookupApi),
                          placeholder: "Select role"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "endpoint"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "edit-status" }, {
                          default: withCtx(() => [
                            createTextVNode("Status")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSelect, {
                          modelValue: editForm.status,
                          "onUpdate:modelValue": ($event) => editForm.status = $event
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiSelectTrigger, { id: "edit-status" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectValue)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelectContent, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(userStatuses, (s) => {
                                  return createVNode(_component_UiSelectItem, {
                                    key: s,
                                    value: s
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(s), 1)
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
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, null, {
                        default: withCtx(() => [
                          createTextVNode("Warehouses")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        class: "w-full justify-between font-normal",
                        onClick: ($event) => showEditWarehousePicker.value = true
                      }, {
                        default: withCtx(() => [
                          editWarehouseIds.value.length === 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-muted-foreground"
                          }, "Select warehouses...")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(editWarehouseIds.value.length) + " warehouse" + toDisplayString(editWarehouseIds.value.length !== 1 ? "s" : "") + " selected", 1)),
                          createVNode(unref(ChevronsUpDownIcon), { class: "size-4 shrink-0 opacity-50" })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      editWarehouseIds.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-wrap gap-1 mt-1"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(editWarehouseIds.value, (id) => {
                          return openBlock(), createBlock(_component_UiBadge, {
                            key: id,
                            variant: "secondary",
                            class: "cursor-pointer gap-1",
                            onClick: ($event) => toggleEditWarehouse(id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(warehouses.value.find((w) => w.id === id)?.name || id) + " ", 1),
                              createVNode(unref(XIcon), { class: "size-3" })
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_UiDialog, {
                      open: showEditWarehousePicker.value,
                      "onUpdate:open": ($event) => showEditWarehousePicker.value = $event
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                          default: withCtx(() => [
                            createVNode(_component_UiDialogHeader, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiDialogTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Select Warehouses")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiDialogDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Choose which warehouses this user can access")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "space-y-1 max-h-80 overflow-y-auto py-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(warehouses.value, (w) => {
                                return openBlock(), createBlock("div", {
                                  key: w.id,
                                  class: ["flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none", { "border-primary/30 bg-primary/5": editWarehouseIds.value.includes(w.id) }],
                                  onClick: ($event) => toggleEditWarehouse(w.id)
                                }, [
                                  createVNode(_component_UiCheckbox, {
                                    "model-value": editWarehouseIds.value.includes(w.id)
                                  }, null, 8, ["model-value"]),
                                  createVNode("span", { class: "text-sm" }, toDisplayString(w.name), 1)
                                ], 10, ["onClick"]);
                              }), 128)),
                              warehouses.value.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "py-3 text-center text-sm text-muted-foreground"
                              }, " No warehouses available ")) : createCommentVNode("", true)
                            ]),
                            createVNode(_component_UiDialogFooter, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiButton, {
                                  onClick: ($event) => showEditWarehousePicker.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Done")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["open", "onUpdate:open"]),
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
                          disabled: unref(usersStore).loading
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
        open: showDeleteDialog.value,
        "onUpdate:open": ($event) => showDeleteDialog.value = $event,
        title: "Delete User",
        description: `Are you sure you want to delete ${deletingUser.value?.name}? This action cannot be undone.`,
        "confirm-text": "Delete",
        variant: "destructive",
        loading: unref(usersStore).loading,
        onConfirm: handleDeleteUser,
        onCancel: ($event) => showDeleteDialog.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiDialog, {
        open: showCreateRoleDialog.value,
        "onUpdate:open": ($event) => showCreateRoleDialog.value = $event
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
                              _push5(`Create Role`);
                            } else {
                              return [
                                createTextVNode("Create Role")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add a new role to define permissions for a group of users`);
                            } else {
                              return [
                                createTextVNode("Add a new role to define permissions for a group of users")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Create Role")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Add a new role to define permissions for a group of users")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "new-role-name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Role Name`);
                      } else {
                        return [
                          createTextVNode("Role Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "new-role-name",
                    modelValue: newRoleName.value,
                    "onUpdate:modelValue": ($event) => newRoleName.value = $event,
                    placeholder: "e.g. MANAGER"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreateRoleDialog.value = false
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
                        _push4(ssrRenderComponent(_component_UiButton, { type: "submit" }, {
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
                            onClick: ($event) => showCreateRoleDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode("Create")
                            ]),
                            _: 1
                          })
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
                            createTextVNode("Create Role")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Add a new role to define permissions for a group of users")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(handleCreateRole, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "new-role-name" }, {
                          default: withCtx(() => [
                            createTextVNode("Role Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "new-role-name",
                          modelValue: newRoleName.value,
                          "onUpdate:modelValue": ($event) => newRoleName.value = $event,
                          placeholder: "e.g. MANAGER"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showCreateRoleDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode("Create")
                            ]),
                            _: 1
                          })
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Create Role")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Add a new role to define permissions for a group of users")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(handleCreateRole, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "new-role-name" }, {
                        default: withCtx(() => [
                          createTextVNode("Role Name")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "new-role-name",
                        modelValue: newRoleName.value,
                        "onUpdate:modelValue": ($event) => newRoleName.value = $event,
                        placeholder: "e.g. MANAGER"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreateRoleDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, { type: "submit" }, {
                          default: withCtx(() => [
                            createTextVNode("Create")
                          ]),
                          _: 1
                        })
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
        open: showDeleteRoleDialog.value,
        "onUpdate:open": ($event) => showDeleteRoleDialog.value = $event,
        title: "Delete Role",
        description: `Are you sure you want to delete ${deletingRole.value?.name}? This cannot be undone if no users are assigned.`,
        "confirm-text": "Delete",
        variant: "destructive",
        onConfirm: handleDeleteRole,
        onCancel: ($event) => showDeleteRoleDialog.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiDialog, {
        open: showCreatePermissionDialog.value,
        "onUpdate:open": ($event) => showCreatePermissionDialog.value = $event
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
                              _push5(`Create Permission`);
                            } else {
                              return [
                                createTextVNode("Create Permission")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Add a new permission to the system.`);
                            } else {
                              return [
                                createTextVNode("Add a new permission to the system.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Create Permission")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Add a new permission to the system.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "perm-module" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Module`);
                      } else {
                        return [
                          createTextVNode("Module")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: createPermissionForm.moduleId,
                    "onUpdate:modelValue": ($event) => createPermissionForm.moduleId = $event,
                    items: permissionModules.value,
                    "label-key": "label",
                    placeholder: "Select module"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "perm-action" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Action`);
                      } else {
                        return [
                          createTextVNode("Action")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LookupCombobox, {
                    modelValue: createPermissionForm.actionId,
                    "onUpdate:modelValue": ($event) => createPermissionForm.actionId = $event,
                    items: permissionActions.value,
                    "label-key": "label",
                    placeholder: "Select action"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "perm-label" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Label`);
                      } else {
                        return [
                          createTextVNode("Label")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "perm-label",
                    modelValue: createPermissionForm.label,
                    "onUpdate:modelValue": ($event) => createPermissionForm.label = $event,
                    placeholder: "e.g. Create products"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreatePermissionDialog.value = false
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
                        _push4(ssrRenderComponent(_component_UiButton, { type: "submit" }, {
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
                            onClick: ($event) => showCreatePermissionDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode("Create")
                            ]),
                            _: 1
                          })
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
                            createTextVNode("Create Permission")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Add a new permission to the system.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      onSubmit: withModifiers(handleCreatePermission, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "perm-module" }, {
                          default: withCtx(() => [
                            createTextVNode("Module")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: createPermissionForm.moduleId,
                          "onUpdate:modelValue": ($event) => createPermissionForm.moduleId = $event,
                          items: permissionModules.value,
                          "label-key": "label",
                          placeholder: "Select module"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "perm-action" }, {
                          default: withCtx(() => [
                            createTextVNode("Action")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_LookupCombobox, {
                          modelValue: createPermissionForm.actionId,
                          "onUpdate:modelValue": ($event) => createPermissionForm.actionId = $event,
                          items: permissionActions.value,
                          "label-key": "label",
                          placeholder: "Select action"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(_component_UiLabel, { for: "perm-label" }, {
                          default: withCtx(() => [
                            createTextVNode("Label")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "perm-label",
                          modelValue: createPermissionForm.label,
                          "onUpdate:modelValue": ($event) => createPermissionForm.label = $event,
                          placeholder: "e.g. Create products"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            type: "button",
                            variant: "outline",
                            onClick: ($event) => showCreatePermissionDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode("Create")
                            ]),
                            _: 1
                          })
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
              createVNode(_component_UiDialogContent, { class: "sm:max-w-sm" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Create Permission")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Add a new permission to the system.")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    onSubmit: withModifiers(handleCreatePermission, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "perm-module" }, {
                        default: withCtx(() => [
                          createTextVNode("Module")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: createPermissionForm.moduleId,
                        "onUpdate:modelValue": ($event) => createPermissionForm.moduleId = $event,
                        items: permissionModules.value,
                        "label-key": "label",
                        placeholder: "Select module"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "perm-action" }, {
                        default: withCtx(() => [
                          createTextVNode("Action")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_LookupCombobox, {
                        modelValue: createPermissionForm.actionId,
                        "onUpdate:modelValue": ($event) => createPermissionForm.actionId = $event,
                        items: permissionActions.value,
                        "label-key": "label",
                        placeholder: "Select action"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UiLabel, { for: "perm-label" }, {
                        default: withCtx(() => [
                          createTextVNode("Label")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiInput, {
                        id: "perm-label",
                        modelValue: createPermissionForm.label,
                        "onUpdate:modelValue": ($event) => createPermissionForm.label = $event,
                        placeholder: "e.g. Create products"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          type: "button",
                          variant: "outline",
                          onClick: ($event) => showCreatePermissionDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, { type: "submit" }, {
                          default: withCtx(() => [
                            createTextVNode("Create")
                          ]),
                          _: 1
                        })
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
        open: showRoleEditor.value,
        "onUpdate:open": ($event) => showRoleEditor.value = $event,
        class: "max-h-[90vh]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-3xl max-h-[90vh] overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Edit Role: ${ssrInterpolate(editingRoleId.value ? roleEditName.value : "")}`);
                            } else {
                              return [
                                createTextVNode("Edit Role: " + toDisplayString(editingRoleId.value ? roleEditName.value : ""), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Select permissions to assign to this role. Changes affect all users with this role.`);
                            } else {
                              return [
                                createTextVNode("Select permissions to assign to this role. Changes affect all users with this role.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Role: " + toDisplayString(editingRoleId.value ? roleEditName.value : ""), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Select permissions to assign to this role. Changes affect all users with this role.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="space-y-4 py-2"${_scopeId2}><div class="flex items-center gap-4"${_scopeId2}><div class="space-y-1 flex-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiLabel, { for: "edit-role-name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Role Name`);
                      } else {
                        return [
                          createTextVNode("Role Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    id: "edit-role-name",
                    modelValue: roleEditName.value,
                    "onUpdate:modelValue": ($event) => roleEditName.value = $event,
                    class: "max-w-xs"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UiButton, {
                    disabled: roleSaving.value,
                    onClick: handleSaveRole,
                    class: "mt-6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (roleSaving.value) {
                          _push4(ssrRenderComponent(unref(Loader2), { class: "size-4 mr-1 animate-spin" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(unref(Save), { class: "size-4 mr-1" }, null, _parent4, _scopeId3));
                        }
                        _push4(` Save `);
                      } else {
                        return [
                          roleSaving.value ? (openBlock(), createBlock(unref(Loader2), {
                            key: 0,
                            class: "size-4 mr-1 animate-spin"
                          })) : (openBlock(), createBlock(unref(Save), {
                            key: 1,
                            class: "size-4 mr-1"
                          })),
                          createTextVNode(" Save ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-4"${_scopeId2}><!--[-->`);
                  ssrRenderList(roleModules.value, (mod) => {
                    _push3(ssrRenderComponent(_sfc_main$1, {
                      key: mod.id,
                      "module-name": mod.name,
                      "module-label": mod.label,
                      permissions: mod.permissions,
                      "selected-ids": roleSelectedIds.value,
                      onToggle: togglePermission,
                      onToggleAll: toggleModuleAll
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div></div>`);
                } else {
                  return [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Edit Role: " + toDisplayString(editingRoleId.value ? roleEditName.value : ""), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Select permissions to assign to this role. Changes affect all users with this role.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-4 py-2" }, [
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("div", { class: "space-y-1 flex-1" }, [
                          createVNode(_component_UiLabel, { for: "edit-role-name" }, {
                            default: withCtx(() => [
                              createTextVNode("Role Name")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-role-name",
                            modelValue: roleEditName.value,
                            "onUpdate:modelValue": ($event) => roleEditName.value = $event,
                            class: "max-w-xs"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(_component_UiButton, {
                          disabled: roleSaving.value,
                          onClick: handleSaveRole,
                          class: "mt-6"
                        }, {
                          default: withCtx(() => [
                            roleSaving.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "size-4 mr-1 animate-spin"
                            })) : (openBlock(), createBlock(unref(Save), {
                              key: 1,
                              class: "size-4 mr-1"
                            })),
                            createTextVNode(" Save ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(roleModules.value, (mod) => {
                          return openBlock(), createBlock(_sfc_main$1, {
                            key: mod.id,
                            "module-name": mod.name,
                            "module-label": mod.label,
                            permissions: mod.permissions,
                            "selected-ids": roleSelectedIds.value,
                            onToggle: togglePermission,
                            onToggleAll: toggleModuleAll
                          }, null, 8, ["module-name", "module-label", "permissions", "selected-ids"]);
                        }), 128))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiDialogContent, { class: "sm:max-w-3xl max-h-[90vh] overflow-y-auto" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Edit Role: " + toDisplayString(editingRoleId.value ? roleEditName.value : ""), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Select permissions to assign to this role. Changes affect all users with this role.")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "space-y-4 py-2" }, [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "space-y-1 flex-1" }, [
                        createVNode(_component_UiLabel, { for: "edit-role-name" }, {
                          default: withCtx(() => [
                            createTextVNode("Role Name")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiInput, {
                          id: "edit-role-name",
                          modelValue: roleEditName.value,
                          "onUpdate:modelValue": ($event) => roleEditName.value = $event,
                          class: "max-w-xs"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_component_UiButton, {
                        disabled: roleSaving.value,
                        onClick: handleSaveRole,
                        class: "mt-6"
                      }, {
                        default: withCtx(() => [
                          roleSaving.value ? (openBlock(), createBlock(unref(Loader2), {
                            key: 0,
                            class: "size-4 mr-1 animate-spin"
                          })) : (openBlock(), createBlock(unref(Save), {
                            key: 1,
                            class: "size-4 mr-1"
                          })),
                          createTextVNode(" Save ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(roleModules.value, (mod) => {
                        return openBlock(), createBlock(_sfc_main$1, {
                          key: mod.id,
                          "module-name": mod.name,
                          "module-label": mod.label,
                          permissions: mod.permissions,
                          "selected-ids": roleSelectedIds.value,
                          onToggle: togglePermission,
                          onToggleAll: toggleModuleAll
                        }, null, 8, ["module-name", "module-label", "permissions", "selected-ids"]);
                      }), 128))
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-KFyF1mMs.mjs.map
