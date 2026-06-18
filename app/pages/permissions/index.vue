<script setup lang="ts">
import { Plus, Trash2, Shield } from '@lucide/vue'
import type { PermissionAction, ModuleName, Permission } from '@/modules/permissions/type'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const permsStore = usePermissionsStore()

const showCreateDialog = ref(false)
const showDeleteDialog = ref(false)
const deletingPerm = ref<Permission | null>(null)

const createForm = reactive({ role: 'WORKER', module: 'PRODUCTS' as ModuleName, action: 'READ' as PermissionAction })

const roles = ['ADMIN', 'MANAGER', 'STOREKEEPER', 'ACCOUNTANT', 'DISTRIBUTOR', 'WORKER']
const modules: ModuleName[] = ['PRODUCTS', 'INVENTORY', 'PURCHASES', 'SALES', 'CUSTOMERS', 'SUPPLIERS', 'PRODUCTION', 'WORKERS', 'ACCOUNTING', 'REPORTS']
const actions: PermissionAction[] = ['CREATE', 'READ', 'UPDATE', 'DELETE']

const groupedPermissions = computed(() => {
  const map: Record<string, Record<string, string[]>> = {}
  for (const role of roles) {
    map[role] = {}
    for (const mod of modules) {
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

function openDelete(perm: Permission) {
  deletingPerm.value = perm
  showDeleteDialog.value = true
}

async function handleDelete() {
  if (!deletingPerm.value) return
  try {
    await permsStore.deletePermission(deletingPerm.value.id)
    showDeleteDialog.value = false
    deletingPerm.value = null
  } catch {}
}

async function handleCreate() {
  try {
    await permsStore.createPermission(createForm)
    showCreateDialog.value = false
  } catch {}
}

onMounted(() => permsStore.fetchPermissions())
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Permissions" description="Manage role-based permissions across all modules">
      <template #actions>
        <UiButton @click="showCreateDialog = true">
          <Plus class="size-4" /> Add Permission
        </UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardContent class="p-0">
        <div v-if="permsStore.loading && permsStore.permissions.length === 0" class="p-6">
          <LoadingState />
        </div>
        <div v-else-if="permsStore.permissions.length === 0" class="p-6">
          <EmptyState title="No permissions defined" description="Create your first permission to set up role-based access control" action="Add Permission" @action="showCreateDialog = true" />
        </div>
        <div v-else class="overflow-x-auto">
          <UiTable>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead class="sticky left-0 z-10 bg-background min-w-[120px]">Role / Module</UiTableHead>
                <UiTableHead v-for="mod in modules" :key="mod" class="min-w-[140px] text-center">{{ mod }}</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-for="role in roles" :key="role">
                <UiTableCell class="sticky left-0 z-10 bg-background font-medium">{{ role }}</UiTableCell>
                <UiTableCell v-for="mod in modules" :key="mod" class="text-center">
                  <div class="flex flex-wrap justify-center gap-1">
                    <template v-for="action in actions" :key="action">
                      <UiBadge
                        v-if="hasPermission(role, mod, action)"
                        variant="default"
                        class="cursor-pointer text-[10px] px-1.5 py-0 hover:opacity-80"
                        @click="openDelete(hasPermission(role, mod, action)!)"
                      >
                        {{ action.charAt(0) }}
                      </UiBadge>
                    </template>
                    <span v-if="actions.every((a) => !hasPermission(role, mod, a))" class="text-[10px] text-muted-foreground">—</span>
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

    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Add Permission</UiDialogTitle>
          <UiDialogDescription>Define which role can perform which action on a module</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreate">
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
            <UiLabel for="create-module">Module</UiLabel>
            <UiSelect v-model="createForm.module">
              <UiSelectTrigger id="create-module"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="mod in modules" :key="mod" :value="mod">{{ mod }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="create-action">Action</UiLabel>
            <UiSelect v-model="createForm.action">
              <UiSelectTrigger id="create-action"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="a in actions" :key="a" :value="a">{{ a }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="permsStore.loading">Add</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <ConfirmDialog
      v-model:open="showDeleteDialog"
      title="Delete Permission"
      :description="`Remove ${deletingPerm?.role} — ${deletingPerm?.module} — ${deletingPerm?.action} permission?`"
      confirm-text="Delete"
      variant="destructive"
      :loading="permsStore.loading"
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>
