<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { Plus, Shield, Pencil, Trash2, Loader2, Save } from '@lucide/vue'
import { toast } from 'vue-sonner'
import type { User, UserStatus } from '@/modules/users/type'
import type { UserActions } from '@/modules/users/components/column'
import { getUserColumns } from '@/modules/users/components/column'
import type { Role, ModuleInfo, ActionInfo } from '@/modules/permissions/type'
import PageHeader from '~/components/shared/PageHeader.vue'
import PermissionGroupP from '@/components/permissions/PermissionGroup.vue'
import {
  fetchRolesApi,
  createRoleApi,
  deleteRoleApi,
  fetchGroupedPermissionsApi,
  fetchRolePermissionIdsApi,
  saveRolePermissionsApi,
  updateRoleApi,
  createPermissionApi,
  fetchPermissionOptionsApi,
} from '~/modules/permissions/api'
import type { PermissionGroup } from '~/modules/permissions/type'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'USERS', action: 'READ' },
})

const userActions: UserActions = {
  onView: (id) => navigateTo(`/users/${id}`),
  onEdit: (user) => openEdit(user),
  onDelete: (user) => openDelete(user),
}
const userColumns = getUserColumns(userActions)

// Users
const usersStore = useUsersStore()
const rolesStore = usePermissionsStore()

const roleFilter = ref<string>('all')
const statusFilter = ref<string>('all')

const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingUser = ref<User | null>(null)
const deletingUser = ref<User | null>(null)

const createForm = reactive({ name: '', email: '', password: '', phone: '', roleId: '' })
const editForm = reactive({ name: '', email: '', phone: '', roleId: '', status: 'ACTIVE' as UserStatus })

const allRoles = computed(() => rolesStore.roles)

watch([roleFilter, statusFilter], () => fetchUsers())

async function fetchUsers() {
  await usersStore.fetchUsers({ role: roleFilter.value === 'all' ? undefined : roleFilter.value, status: statusFilter.value === 'all' ? undefined : statusFilter.value })
}

async function handleCreate() {
  try {
    await usersStore.createUser(createForm as any)
    showCreateDialog.value = false
    resetCreateForm()
  } catch {}
}

function resetCreateForm() {
  createForm.name = ''
  createForm.email = ''
  createForm.password = ''
  createForm.phone = ''
  createForm.roleId = ''
}

function openEdit(user: User) {
  editingUser.value = user
  editForm.name = user.name
  editForm.email = user.email
  editForm.phone = user.phone ?? ''
  editForm.roleId = user.roleId
  editForm.status = user.status
  showEditDialog.value = true
}

async function handleEdit() {
  if (!editingUser.value) return
  try {
    await usersStore.updateUser(editingUser.value.id, editForm)
    showEditDialog.value = false
    editingUser.value = null
  } catch {}
}

function openDelete(user: User) {
  deletingUser.value = user
  showDeleteDialog.value = true
}

async function handleDeleteUser() {
  if (!deletingUser.value) return
  try {
    await usersStore.deleteUser(deletingUser.value.id)
    showDeleteDialog.value = false
    deletingUser.value = null
  } catch {}
}

const userStatuses: UserStatus[] = ['ACTIVE', 'INACTIVE', 'BLOCKED']

// Create Permission
const showCreatePermissionDialog = ref(false)
const permissionModules = ref<ModuleInfo[]>([])
const permissionActions = ref<ActionInfo[]>([])
const createPermissionForm = reactive({
  moduleId: '',
  actionId: '',
  label: '',
})

async function openCreatePermission() {
  showCreatePermissionDialog.value = true
  try {
    const data = await fetchPermissionOptionsApi()
    permissionModules.value = data.modules
    permissionActions.value = data.actions
  } catch {
    toast.error('Failed to load permission options')
  }
}

async function handleCreatePermission() {
  if (!createPermissionForm.moduleId || !createPermissionForm.actionId || !createPermissionForm.label) {
    toast.error('All fields are required')
    return
  }
  try {
    await createPermissionApi(createPermissionForm)
    toast.success('Permission created')
    showCreatePermissionDialog.value = false
    createPermissionForm.moduleId = ''
    createPermissionForm.actionId = ''
    createPermissionForm.label = ''
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to create permission')
  }
}

// Roles
const roles = ref<Role[]>([])
const rolesLoading = ref(false)

const editingRoleId = ref<string | null>(null)
const showRoleEditor = ref(false)
const showCreateRoleDialog = ref(false)
const showDeleteRoleDialog = ref(false)
const deletingRole = ref<Role | null>(null)
const newRoleName = ref('')
const roleModules = ref<PermissionGroup[]>([])
const roleSelectedIds = ref<Set<string>>(new Set())
const roleEditName = ref('')
const roleSaving = ref(false)

async function fetchRoles() {
  rolesLoading.value = true
  try {
    await rolesStore.fetchRoles()
    roles.value = rolesStore.roles
  } catch {
    toast.error('Failed to load roles')
  } finally {
    rolesLoading.value = false
  }
}

async function openRoleEditor(role: Role) {
  editingRoleId.value = role.id
  roleEditName.value = role.name
  showRoleEditor.value = true
  roleSaving.value = false
  try {
    const [grouped, permIds] = await Promise.all([
      fetchGroupedPermissionsApi(),
      fetchRolePermissionIdsApi(role.id),
    ])
    roleModules.value = grouped.modules
    roleSelectedIds.value = new Set(permIds.permissionIds)
  } catch {
    toast.error('Failed to load permissions')
  }
}

function togglePermission(permissionId: string) {
  const next = new Set(roleSelectedIds.value)
  if (next.has(permissionId)) next.delete(permissionId)
  else next.add(permissionId)
  roleSelectedIds.value = next
}

function toggleModuleAll(moduleName: string, checked: boolean) {
  const mod = roleModules.value.find((m) => m.name === moduleName)
  if (!mod) return
  const next = new Set(roleSelectedIds.value)
  for (const p of mod.permissions) {
    if (checked) next.add(p.id)
    else next.delete(p.id)
  }
  roleSelectedIds.value = next
}

async function handleSaveRole() {
  if (!editingRoleId.value) return
  roleSaving.value = true
  try {
    if (roleEditName.value) {
      await updateRoleApi(editingRoleId.value, { name: roleEditName.value })
    }
    await saveRolePermissionsApi(editingRoleId.value, Array.from(roleSelectedIds.value))
    toast.success('Role saved')
    showRoleEditor.value = false
    await fetchRoles()
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to save role')
  } finally {
    roleSaving.value = false
  }
}

async function handleCreateRole() {
  if (!newRoleName.value) {
    toast.error('Role name is required')
    return
  }
  try {
    await createRoleApi({ name: newRoleName.value.toUpperCase(), label: newRoleName.value })
    toast.success('Role created')
    showCreateRoleDialog.value = false
    newRoleName.value = ''
    await fetchRoles()
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to create role')
  }
}

function confirmDeleteRole(role: Role) {
  deletingRole.value = role
  showDeleteRoleDialog.value = true
}

async function handleDeleteRole() {
  if (!deletingRole.value) return
  try {
    await deleteRoleApi(deletingRole.value.id)
    toast.success('Role deleted')
    showDeleteRoleDialog.value = false
    deletingRole.value = null
    await fetchRoles()
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to delete role')
  }
}

onMounted(() => {
  fetchUsers()
  fetchRoles()
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Users & Permissions" description="Manage system users and role-based permissions">
      <template #actions>
        <UiButton v-can="{ module: 'USERS', action: 'CREATE' }" @click="showCreateDialog = true">Create User</UiButton>
        <UiButton v-can="{ module: 'USERS', action: 'CREATE' }" variant="outline" @click="showCreateRoleDialog = true">
          <Plus class="size-4" /> Create Role
        </UiButton>
        <!-- <UiButton variant="outline" @click="openCreatePermission">
          <Plus class="size-4" /> Create Permission
        </UiButton> -->
      </template>
    </PageHeader>

    <!-- Users Table -->
    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Users</h3>
          <div class="flex items-center gap-2">
            <UiSelect v-model="roleFilter">
              <UiSelectTrigger class="w-36">
                <UiSelectValue placeholder="All roles" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="all">All roles</UiSelectItem>
                <UiSelectItem v-for="r in allRoles" :key="r.id" :value="r.name">{{ r.name }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
            <UiSelect v-model="statusFilter">
              <UiSelectTrigger class="w-36">
                <UiSelectValue placeholder="All statuses" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="all">All statuses</UiSelectItem>
                <UiSelectItem v-for="s in userStatuses" :key="s" :value="s">{{ s }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
        </div>
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="usersStore.users"
          :columns="userColumns"
          :loading="usersStore.loading"
          :server-total="usersStore.total"
          search-placeholder="Search by name or email..."
        >
          <template #empty>
            <EmptyState
              title="No users found"
              :description="roleFilter !== 'all' || statusFilter !== 'all' ? 'Try adjusting your filters' : 'Create your first user to get started'"
              :action="roleFilter === 'all' && statusFilter === 'all' ? 'Create User' : undefined"
              @action="showCreateDialog = true"
            />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>

    <!-- Roles Section -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Roles</UiCardTitle>
        <UiCardDescription>Manage role-based permissions. Each role defines what actions users can perform.</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div v-if="rolesLoading && roles.length === 0" class="py-8">
          <LoadingState />
        </div>
        <div v-else-if="roles.length === 0" class="py-8">
          <EmptyState title="No roles defined" description="Create your first role to set up access control" action="Create Role" @action="showCreateRoleDialog = true" />
        </div>
        <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="role in roles"
            :key="role.id"
            class="rounded-lg border p-4 flex items-center justify-between hover:bg-accent/30 transition-colors"
          >
            <div>
              <p class="font-medium">{{ role.name }}</p>
              <p class="text-xs text-muted-foreground">{{ role._count?.users ?? 0 }} user{{ (role._count?.users ?? 0) !== 1 ? 's' : '' }}</p>
            </div>
            <div class="flex gap-1">
              <UiButton v-can="{ module: 'USERS', action: 'UPDATE' }" variant="ghost" size="icon-sm" @click="openRoleEditor(role)">
                <Shield class="size-3.5" />
              </UiButton>
              <UiButton v-can="{ module: 'USERS', action: 'DELETE' }" variant="ghost" size="icon-sm" class="text-destructive hover:text-destructive" @click="confirmDeleteRole(role)">
                <Trash2 class="size-3.5" />
              </UiButton>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Create User Dialog -->
    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Create User</UiDialogTitle>
          <UiDialogDescription>Add a new user to the system</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreate">
          <div class="space-y-2">
            <UiLabel for="create-name">Name</UiLabel>
            <UiInput id="create-name" v-model="createForm.name" placeholder="Full name" required />
          </div>
          <div class="space-y-2">
            <UiLabel for="create-email">Email</UiLabel>
            <UiInput id="create-email" v-model="createForm.email" type="email" placeholder="email@example.com" required />
          </div>
          <div class="space-y-2">
            <UiLabel for="create-password">Password</UiLabel>
            <UiInput id="create-password" v-model="createForm.password" type="password" placeholder="Min 6 characters" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="create-role">Role</UiLabel>
              <UiSelect v-model="createForm.roleId">
                <UiSelectTrigger id="create-role"><UiSelectValue placeholder="Select role" /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="r in allRoles" :key="r.id" :value="r.id">{{ r.name }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="space-y-2">
              <UiLabel for="create-phone">Phone</UiLabel>
              <UiInput id="create-phone" v-model="createForm.phone" placeholder="Optional" />
            </div>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="usersStore.loading">Create</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Edit User Dialog -->
    <UiDialog :open="showEditDialog" @update:open="showEditDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Edit User</UiDialogTitle>
          <UiDialogDescription>Update user information</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleEdit">
          <div class="space-y-2">
            <UiLabel for="edit-name">Name</UiLabel>
            <UiInput id="edit-name" v-model="editForm.name" required />
          </div>
          <div class="space-y-2">
            <UiLabel for="edit-email">Email</UiLabel>
            <UiInput id="edit-email" v-model="editForm.email" type="email" required />
          </div>
          <div class="space-y-2">
            <UiLabel for="edit-phone">Phone</UiLabel>
            <UiInput id="edit-phone" v-model="editForm.phone" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="edit-role">Role</UiLabel>
              <UiSelect v-model="editForm.roleId">
                <UiSelectTrigger id="edit-role"><UiSelectValue placeholder="Select role" /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="r in allRoles" :key="r.id" :value="r.id">{{ r.name }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="space-y-2">
              <UiLabel for="edit-status">Status</UiLabel>
              <UiSelect v-model="editForm.status">
                <UiSelectTrigger id="edit-status"><UiSelectValue /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="s in userStatuses" :key="s" :value="s">{{ s }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showEditDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="usersStore.loading">Save</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Delete User Confirm -->
    <ConfirmDialog
      v-model:open="showDeleteDialog"
      title="Delete User"
      :description="`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`"
      confirm-text="Delete"
      variant="destructive"
      :loading="usersStore.loading"
      @confirm="handleDeleteUser"
      @cancel="showDeleteDialog = false"
    />

    <!-- Create Role Dialog -->
    <UiDialog :open="showCreateRoleDialog" @update:open="showCreateRoleDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Create Role</UiDialogTitle>
          <UiDialogDescription>Add a new role to define permissions for a group of users</UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="handleCreateRole" class="space-y-4">
          <div class="space-y-2">
            <UiLabel for="new-role-name">Role Name</UiLabel>
            <UiInput id="new-role-name" v-model="newRoleName" placeholder="e.g. MANAGER" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateRoleDialog = false">Cancel</UiButton>
            <UiButton type="submit">Create</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Delete Role Confirm -->
    <ConfirmDialog
      v-model:open="showDeleteRoleDialog"
      title="Delete Role"
      :description="`Are you sure you want to delete ${deletingRole?.name}? This cannot be undone if no users are assigned.`"
      confirm-text="Delete"
      variant="destructive"
      @confirm="handleDeleteRole"
      @cancel="showDeleteRoleDialog = false"
    />

    <!-- Create Permission Dialog -->
    <UiDialog :open="showCreatePermissionDialog" @update:open="showCreatePermissionDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Create Permission</UiDialogTitle>
          <UiDialogDescription>Add a new permission to the system.</UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="handleCreatePermission" class="space-y-4">
          <div class="space-y-2">
            <UiLabel for="perm-module">Module</UiLabel>
            <UiSelect v-model="createPermissionForm.moduleId">
              <UiSelectTrigger id="perm-module"><UiSelectValue placeholder="Select module" /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="m in permissionModules" :key="m.id" :value="m.id">{{ m.label }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="perm-action">Action</UiLabel>
            <UiSelect v-model="createPermissionForm.actionId">
              <UiSelectTrigger id="perm-action"><UiSelectValue placeholder="Select action" /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="a in permissionActions" :key="a.id" :value="a.id">{{ a.label }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="perm-label">Label</UiLabel>
            <UiInput id="perm-label" v-model="createPermissionForm.label" placeholder="e.g. Create products" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreatePermissionDialog = false">Cancel</UiButton>
            <UiButton type="submit">Create</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Edit Role Permissions Dialog -->
    <UiDialog :open="showRoleEditor" @update:open="showRoleEditor = $event" class="max-h-[90vh]">
      <UiDialogContent class="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <UiDialogHeader>
          <UiDialogTitle>Edit Role: {{ editingRoleId ? roleEditName : '' }}</UiDialogTitle>
          <UiDialogDescription>Select permissions to assign to this role. Changes affect all users with this role.</UiDialogDescription>
        </UiDialogHeader>
        <div class="space-y-4 py-2">
          <div class="flex items-center gap-4">
            <div class="space-y-1 flex-1">
              <UiLabel for="edit-role-name">Role Name</UiLabel>
              <UiInput id="edit-role-name" v-model="roleEditName" class="max-w-xs" />
            </div>
            <UiButton :disabled="roleSaving" @click="handleSaveRole" class="mt-6">
              <Loader2 v-if="roleSaving" class="size-4 mr-1 animate-spin" />
              <Save v-else class="size-4 mr-1" />
              Save
            </UiButton>
          </div>
          <div class="space-y-4">
            <PermissionGroupP
              v-for="mod in roleModules"
              :key="mod.id"
              :module-name="mod.name"
              :module-label="mod.label"
              :permissions="mod.permissions"
              :selected-ids="roleSelectedIds"
              @toggle="togglePermission"
              @toggle-all="toggleModuleAll"
            />
          </div>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
