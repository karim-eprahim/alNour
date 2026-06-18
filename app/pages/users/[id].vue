<script setup lang="ts">
import { ArrowLeft, Shield, ShieldCheck, ShieldX } from '@lucide/vue'
import type { Permission, UserPermission } from '@/modules/permissions/type'
import PageHeader from '~/components/shared/PageHeader.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const userId = computed(() => route.params.id as string)

const usersStore = useUsersStore()
const permsStore = usePermissionsStore()

const activeTab = ref('details')

const showAssignDialog = ref(false)
const selectedPermissionId = ref('')

async function fetchUser() {
  await usersStore.fetchUser(userId.value)
}

async function fetchUserPerms() {
  await permsStore.fetchUserPermissions(userId.value)
}

async function fetchAllPerms() {
  await permsStore.fetchPermissions()
}

async function handleAssign() {
  if (!selectedPermissionId.value) return
  try {
    await permsStore.assignUserPermission(userId.value, selectedPermissionId.value)
    showAssignDialog.value = false
    selectedPermissionId.value = ''
  } catch {}
}

async function handleRemove(permissionId: string) {
  try {
    await permsStore.removeUserPermission(userId.value, permissionId)
  } catch {}
}

const assignedPermissionIds = computed(() =>
  permsStore.userPermissions.map((up) => up.permissionId)
)

const availablePermissions = computed(() =>
  permsStore.permissions.filter((p) => !assignedPermissionIds.value.includes(p.id))
)

onMounted(async () => {
  await Promise.all([fetchUser(), fetchUserPerms(), fetchAllPerms()])
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/users')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader
        :title="usersStore.currentUser?.name || 'User Details'"
        :description="usersStore.currentUser?.email || 'Loading...'"
      />
    </div>

    <UiTabs v-model="activeTab" class="space-y-4">
      <UiTabsList>
        <UiTabsTrigger value="details">Details</UiTabsTrigger>
        <UiTabsTrigger value="permissions">Permissions</UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="details">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>User Information</UiCardTitle>
            <UiCardDescription>Detailed user profile and account info</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="usersStore.loading && !usersStore.currentUser" class="flex justify-center py-8">
              <LoadingState />
            </div>
            <div v-else-if="usersStore.currentUser" class="grid gap-6 sm:grid-cols-2">
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Name</p>
                <p class="text-sm">{{ usersStore.currentUser.name }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Email</p>
                <p class="text-sm">{{ usersStore.currentUser.email }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Phone</p>
                <p class="text-sm">{{ usersStore.currentUser.phone || 'Not set' }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Role</p>
                <UiBadge variant="secondary" class="text-xs">{{ usersStore.currentUser.role }}</UiBadge>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Status</p>
                <UiBadge :variant="usersStore.currentUser.status === 'ACTIVE' ? 'default' : 'destructive'" class="text-xs">
                  {{ usersStore.currentUser.status }}
                </UiBadge>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Last Login</p>
                <p class="text-sm">{{ usersStore.currentUser.lastLogin ? new Date(usersStore.currentUser.lastLogin).toLocaleString() : 'Never' }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Created</p>
                <p class="text-sm">{{ new Date(usersStore.currentUser.createdAt).toLocaleDateString() }}</p>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="permissions">
        <UiCard>
          <UiCardHeader class="flex flex-row items-center justify-between">
            <div>
              <UiCardTitle>User Permissions</UiCardTitle>
              <UiCardDescription>Manage granular permissions for this user</UiCardDescription>
            </div>
            <UiButton size="sm" :disabled="availablePermissions.length === 0" @click="showAssignDialog = true">
              <Shield class="size-4" /> Assign
            </UiButton>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <div v-if="permsStore.loading && permsStore.userPermissions.length === 0" class="p-6">
              <LoadingState />
            </div>
            <div v-else-if="permsStore.userPermissions.length === 0" class="p-6">
              <EmptyState title="No permissions assigned" description="This user has no custom permissions. They inherit permissions from their role." />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Module</UiTableHead>
                  <UiTableHead>Action</UiTableHead>
                  <UiTableHead>Assigned</UiTableHead>
                  <UiTableHead class="w-20 text-right">Action</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="up in permsStore.userPermissions" :key="up.id">
                  <UiTableCell class="text-sm font-medium">{{ up.permission.module }}</UiTableCell>
                  <UiTableCell>
                    <UiBadge variant="outline" class="text-xs">{{ up.permission.action }}</UiBadge>
                  </UiTableCell>
                  <UiTableCell class="text-xs text-muted-foreground">{{ new Date(up.permission.createdAt || '').toLocaleDateString() }}</UiTableCell>
                  <UiTableCell class="text-right">
                    <UiButton variant="ghost" size="icon-xs" class="text-destructive hover:text-destructive" @click="handleRemove(up.permissionId)">
                      <ShieldX class="size-3.5" />
                    </UiButton>
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>
    </UiTabs>

    <UiDialog :open="showAssignDialog" @update:open="showAssignDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Assign Permission</UiDialogTitle>
          <UiDialogDescription>Select a permission to assign to this user</UiDialogDescription>
        </UiDialogHeader>
        <div class="space-y-4">
          <div class="space-y-2">
            <UiLabel for="assign-perm">Permission</UiLabel>
            <UiSelect v-model="selectedPermissionId">
              <UiSelectTrigger id="assign-perm"><UiSelectValue placeholder="Select permission..." /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectGroup v-for="(perms, role) in (Object.groupBy(availablePermissions, (p) => p.role) ?? {})" :key="role">
                  <UiSelectLabel>{{ role }}</UiSelectLabel>
                  <UiSelectItem v-for="p in perms" :key="p.id" :value="p.id">
                    {{ p.module }} — {{ p.action }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </div>
          <UiDialogFooter>
            <UiButton variant="outline" @click="showAssignDialog = false">Cancel</UiButton>
            <UiButton :disabled="!selectedPermissionId || permsStore.loading" @click="handleAssign">Assign</UiButton>
          </UiDialogFooter>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
