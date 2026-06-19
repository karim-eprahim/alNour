<script setup lang="ts">
import type { User, UserRole, UserStatus } from '@/modules/users/type'
import type { UserActions } from '@/modules/users/components/column'
import { getUserColumns } from '@/modules/users/components/column'
import type { PermissionAction, ModuleName, Permission } from '@/modules/permissions/type'
import { Plus, Trash2, Shield } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue';
import LoadingState from '~/components/shared/LoadingState.vue'

const userActions: UserActions = {
  onView: (id) => navigateTo(`/users/${id}`),
  onEdit: (user) => openEdit(user),
  onDelete: (user) => openDelete(user),
}

const userColumns = getUserColumns(userActions)

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

// Users
const usersStore = useUsersStore()

const roleFilter = ref<string>('all')
const statusFilter = ref<string>('all')

const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingUser = ref<User | null>(null)
const deletingUser = ref<User | null>(null)

const createForm = reactive({ name: '', email: '', password: '', phone: '', role: 'WORKER' as UserRole })
const editForm = reactive({ name: '', email: '', phone: '', role: 'WORKER' as UserRole, status: 'ACTIVE' as UserStatus })

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
  createForm.role = 'WORKER'
}

function openEdit(user: User) {
  editingUser.value = user
  editForm.name = user.name
  editForm.email = user.email
  editForm.phone = user.phone ?? ''
  editForm.role = user.role
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

const userRoles: UserRole[] = ['ADMIN', 'MANAGER', 'STOREKEEPER', 'ACCOUNTANT', 'DISTRIBUTOR', 'WORKER']
const userStatuses: UserStatus[] = ['ACTIVE', 'INACTIVE', 'BLOCKED']

// Permissions
const permsStore = usePermissionsStore()

const showCreatePermDialog = ref(false)
const showDeletePermDialog = ref(false)
const deletingPerm = ref<Permission | null>(null)

const createPermForm = reactive({ role: 'WORKER', module: 'PRODUCTS' as ModuleName, action: 'READ' as PermissionAction })

const permRoles = ['ADMIN', 'MANAGER', 'STOREKEEPER', 'ACCOUNTANT', 'DISTRIBUTOR', 'WORKER']
const permModules: ModuleName[] = ['PRODUCTS', 'INVENTORY', 'PURCHASES', 'SALES', 'CUSTOMERS', 'SUPPLIERS', 'PRODUCTION', 'WORKERS', 'ACCOUNTING', 'REPORTS']
const permActions: PermissionAction[] = ['CREATE', 'READ', 'UPDATE', 'DELETE']

const groupedPermissions = computed(() => {
  const map: Record<string, Record<string, string[]>> = {}
  for (const role of permRoles) {
    map[role] = {}
    for (const mod of permModules) {
      map[role][mod] = []
    }
  }
  for (const p of permsStore.permissions) {
    map[p.role]![p.module]!.push(p.action)
  }
  return map
})

function hasPermission(role: string, mod: string, action: string): Permission | undefined {
  return permsStore.permissions.find((p) => p.role === role && p.module === mod && p.action === action)
}

function openDeletePerm(perm: Permission) {
  deletingPerm.value = perm
  showDeletePermDialog.value = true
}

async function handleDeletePerm() {
  if (!deletingPerm.value) return
  try {
    await permsStore.deletePermission(deletingPerm.value.id)
    showDeletePermDialog.value = false
    deletingPerm.value = null
  } catch {}
}

async function handleCreatePerm() {
  try {
    await permsStore.createPermission(createPermForm)
    showCreatePermDialog.value = false
  } catch {}
}

onMounted(() => {
  fetchUsers()
  permsStore.fetchPermissions()
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Users & Permissions" description="Manage system users and role-based permissions">
      <template #actions>
        <UiButton @click="showCreateDialog = true">Create User</UiButton>
        <UiButton variant="outline" @click="showCreatePermDialog = true">
          <Plus class="size-4" /> Add Permission
        </UiButton>
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
                <UiSelectItem v-for="r in userRoles" :key="r" :value="r">{{ r }}</UiSelectItem>
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

    <!-- Permissions Matrix -->
    <UiCard>
      <UiCardHeader>
        <div class="flex items-center justify-between">
          <div>
            <UiCardTitle>Permissions</UiCardTitle>
            <UiCardDescription>Role-based access control across all modules</UiCardDescription>
          </div>
        </div>
      </UiCardHeader>
      <UiCardContent class="p-0">
        <div v-if="permsStore.loading && permsStore.permissions.length === 0" class="p-6">
          <LoadingState />
        </div>
        <div v-else-if="permsStore.permissions.length === 0" class="p-6">
          <EmptyState title="No permissions defined" description="Create your first permission to set up role-based access control" action="Add Permission" @action="showCreatePermDialog = true" />
        </div>
        <div v-else class="overflow-x-auto">
          <UiTable>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead class="sticky left-0 z-10 bg-background min-w-[120px]">Role / Module</UiTableHead>
                <UiTableHead v-for="mod in permModules" :key="mod" class="min-w-[140px] text-center">{{ mod }}</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-for="role in permRoles" :key="role">
                <UiTableCell class="sticky left-0 z-10 bg-background font-medium">{{ role }}</UiTableCell>
                <UiTableCell v-for="mod in permModules" :key="mod" class="text-center">
                  <div class="flex flex-wrap justify-center gap-1">
                    <template v-for="action in permActions" :key="action">
                      <UiBadge
                        v-if="hasPermission(role, mod, action)"
                        variant="default"
                        class="cursor-pointer text-[10px] px-1.5 py-0 hover:opacity-80"
                        @click="openDeletePerm(hasPermission(role, mod, action)!)"
                      >
                        {{ action.charAt(0) }}
                      </UiBadge>
                    </template>
                    <span v-if="permActions.every((a) => !hasPermission(role, mod, a))" class="text-[10px] text-muted-foreground">—</span>
                  </div>
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </div>
      </UiCardContent>
      <UiCardFooter v-if="permsStore.permissions.length > 0" class="border-t px-4 py-3">
        <p class="text-xs text-muted-foreground">{{ permsStore.permissions.length }} permission{{ permsStore.permissions.length !== 1 ? 's' : '' }} defined</p>
      </UiCardFooter>
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
              <UiSelect v-model="createForm.role">
                <UiSelectTrigger id="create-role"><UiSelectValue /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="r in userRoles" :key="r" :value="r">{{ r }}</UiSelectItem>
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
              <UiSelect v-model="editForm.role">
                <UiSelectTrigger id="edit-role"><UiSelectValue /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="r in userRoles" :key="r" :value="r">{{ r }}</UiSelectItem>
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

    <!-- Create Permission Dialog -->
    <UiDialog :open="showCreatePermDialog" @update:open="showCreatePermDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Add Permission</UiDialogTitle>
          <UiDialogDescription>Define which role can perform which action on a module</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreatePerm">
          <div class="space-y-2">
            <UiLabel for="create-perm-role">Role</UiLabel>
            <UiSelect v-model="createPermForm.role">
              <UiSelectTrigger id="create-perm-role"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="r in permRoles" :key="r" :value="r">{{ r }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="create-perm-module">Module</UiLabel>
            <UiSelect v-model="createPermForm.module">
              <UiSelectTrigger id="create-perm-module"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="mod in permModules" :key="mod" :value="mod">{{ mod }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="create-perm-action">Action</UiLabel>
            <UiSelect v-model="createPermForm.action">
              <UiSelectTrigger id="create-perm-action"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="a in permActions" :key="a" :value="a">{{ a }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreatePermDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="permsStore.loading">Add</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Delete Permission Confirm -->
    <ConfirmDialog
      v-model:open="showDeletePermDialog"
      title="Delete Permission"
      :description="`Remove ${deletingPerm?.role} — ${deletingPerm?.module} — ${deletingPerm?.action} permission?`"
      confirm-text="Delete"
      variant="destructive"
      :loading="permsStore.loading"
      @confirm="handleDeletePerm"
      @cancel="showDeletePermDialog = false"
    />
  </div>
</template>
