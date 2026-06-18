<script setup lang="ts">
import { MoreHorizontal, Eye, Pencil, Trash2 } from '@lucide/vue'
import type { User, UserRole, UserStatus } from '@/modules/users/type'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const usersStore = useUsersStore()

const search = ref('')
const roleFilter = ref<string>('all')
const statusFilter = ref<string>('all')

const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingUser = ref<User | null>(null)
const deletingUser = ref<User | null>(null)

const createForm = reactive({ name: '', email: '', password: '', phone: '', role: 'WORKER' as UserRole })
const editForm = reactive({ name: '', email: '', phone: '', role: 'WORKER' as UserRole, status: 'ACTIVE' as UserStatus })

watch([search, roleFilter, statusFilter], () => fetchData())

async function fetchData() {
  await usersStore.fetchUsers({ search: search.value || undefined, role: roleFilter.value === 'all' ? undefined : roleFilter.value, status: statusFilter.value === 'all' ? undefined : statusFilter.value })
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

async function handleDelete() {
  if (!deletingUser.value) return
  try {
    await usersStore.deleteUser(deletingUser.value.id)
    showDeleteDialog.value = false
    deletingUser.value = null
  } catch {}
}

function roleBadgeVariant(role: string) {
  const map: Record<string, string> = { ADMIN: 'destructive', MANAGER: 'default', STOREKEEPER: 'secondary', ACCOUNTANT: 'outline', DISTRIBUTOR: 'secondary', WORKER: 'outline' }
  return map[role] || 'outline'
}

function statusBadgeVariant(status: string) {
  return status === 'ACTIVE' ? 'default' : status === 'INACTIVE' ? 'secondary' : 'destructive'
}

const roles: UserRole[] = ['ADMIN', 'MANAGER', 'STOREKEEPER', 'ACCOUNTANT', 'DISTRIBUTOR', 'WORKER']
const statuses: UserStatus[] = ['ACTIVE', 'INACTIVE', 'BLOCKED']

onMounted(() => fetchData())
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Users" description="Manage system users and their roles">
      <template #actions>
      </template>
    </PageHeader>
    
    <UiCard>
      <UiCardHeader class="pb-3">
        <UiButton @click="showCreateDialog = true">Create User</UiButton>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <UiInput v-model="search" placeholder="Search by name or email..." class="max-w-xs" />
          <div class="flex items-center gap-2">
            <UiSelect v-model="roleFilter">
              <UiSelectTrigger class="w-36">
                <UiSelectValue placeholder="All roles" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="all">All roles</UiSelectItem>
                <UiSelectItem v-for="r in roles" :key="r" :value="r">{{ r }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
            <UiSelect v-model="statusFilter">
              <UiSelectTrigger class="w-36">
                <UiSelectValue placeholder="All statuses" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="all">All statuses</UiSelectItem>
                <UiSelectItem v-for="s in statuses" :key="s" :value="s">{{ s }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
        </div>
      </UiCardHeader>
      <UiCardContent class="p-0">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="w-[250px]">User</UiTableHead>
              <UiTableHead>Role</UiTableHead>
              <UiTableHead>Status</UiTableHead>
              <UiTableHead>Last Login</UiTableHead>
              <UiTableHead class="w-[100px] text-right">Actions</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-if="usersStore.loading">
              <UiTableCell colspan="5"><LoadingState :count="3" /></UiTableCell>
            </UiTableRow>
            <UiTableRow v-else-if="usersStore.users.length === 0">
              <UiTableCell colspan="5">
                <EmptyState
                  title="No users found"
                  :description="search || roleFilter || statusFilter ? 'Try adjusting your filters' : 'Create your first user to get started'"
                  :action="!search && !roleFilter && !statusFilter ? 'Create User' : undefined"
                  @action="showCreateDialog = true"
                />
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-for="user in usersStore.users" :key="user.id">
              <UiTableCell>
                <div class="flex items-center gap-3">
                  <UiAvatar class="size-8">
                    <UiAvatarFallback class="bg-primary/10 text-primary text-xs font-medium">
                      {{ user.name.charAt(0) }}
                    </UiAvatarFallback>
                  </UiAvatar>
                  <div>
                    <NuxtLink :to="`/users/${user.id}`" class="text-sm font-medium hover:underline">{{ user.name }}</NuxtLink>
                    <p class="text-xs text-muted-foreground">{{ user.email }}</p>
                  </div>
                </div>
              </UiTableCell>
              <UiTableCell>
                <UiBadge :variant="roleBadgeVariant(user.role) as any" class="text-xs">{{ user.role }}</UiBadge>
              </UiTableCell>
              <UiTableCell>
                <UiBadge :variant="statusBadgeVariant(user.status) as any" class="text-xs">{{ user.status }}</UiBadge>
              </UiTableCell>
              <UiTableCell class="text-xs text-muted-foreground">
                {{ user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never' }}
              </UiTableCell>
              <UiTableCell class="text-right">
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm"><MoreHorizontal class="size-4" /></UiButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent align="end" class="w-36">
                    <UiDropdownMenuItem @click="navigateTo(`/users/${user.id}`)">
                      <Eye class="size-4" /> View
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem @click="openEdit(user)">
                      <Pencil class="size-4" /> Edit
                    </UiDropdownMenuItem>
                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem variant="destructive" @click="openDelete(user)">
                      <Trash2 class="size-4" /> Delete
                    </UiDropdownMenuItem>
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
      <UiCardFooter v-if="usersStore.total > 0" class="border-t px-4 py-3">
        <p class="text-xs text-muted-foreground">{{ usersStore.total }} user{{ usersStore.total !== 1 ? 's' : '' }} total</p>
      </UiCardFooter>
    </UiCard>

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
                  <UiSelectItem v-for="r in roles" :key="r" :value="r">{{ r }}</UiSelectItem>
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
                  <UiSelectItem v-for="r in roles" :key="r" :value="r">{{ r }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="space-y-2">
              <UiLabel for="edit-status">Status</UiLabel>
              <UiSelect v-model="editForm.status">
                <UiSelectTrigger id="edit-status"><UiSelectValue /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="s in statuses" :key="s" :value="s">{{ s }}</UiSelectItem>
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

    <ConfirmDialog
      v-model:open="showDeleteDialog"
      title="Delete User"
      :description="`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`"
      confirm-text="Delete"
      variant="destructive"
      :loading="usersStore.loading"
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>
