<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { toast } from 'vue-sonner'
import { Loader2, Save } from '@lucide/vue'
import type { PermissionGroup, Role } from '~/modules/permissions/type'
import {
  fetchGroupedPermissionsApi,
  fetchRolePermissionIdsApi,
  saveRolePermissionsApi,
  fetchRoleApi,
  updateRoleApi,
} from '~/modules/permissions/api'

const props = defineProps<{
  roleId?: string
}>()

const emit = defineEmits<{
  saved: []
  cancelled: []
}>()

const loading = ref(true)
const saving = ref(false)
const role = ref<Role | null>(null)
const modules = ref<PermissionGroup[]>([])
const selectedIds = ref<Set<string>>(new Set())
const roleName = ref('')

const roleLabel = computed(() => role.value?.label || role.value?.name || '')

async function loadData() {
  loading.value = true
  try {
    const [groupedRes, permIdsRes] = await Promise.all([
      fetchGroupedPermissionsApi(),
      props.roleId ? fetchRolePermissionIdsApi(props.roleId) : Promise.resolve({ permissionIds: [] }),
      props.roleId ? fetchRoleApi(props.roleId) : Promise.resolve(null),
    ])
    modules.value = groupedRes.modules
    selectedIds.value = new Set(permIdsRes.permissionIds)
    if (props.roleId && permIdsRes.permissionIds) {
      const roleRes = await fetchRoleApi(props.roleId)
      role.value = roleRes.role
      roleName.value = roleRes.role.name
    }
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load permissions data')
  } finally {
    loading.value = false
  }
}

function togglePermission(permissionId: string) {
  const next = new Set(selectedIds.value)
  if (next.has(permissionId)) {
    next.delete(permissionId)
  } else {
    next.add(permissionId)
  }
  selectedIds.value = next
}

function toggleModuleAll(moduleName: string, checked: boolean) {
  const mod = modules.value.find((m) => m.name === moduleName)
  if (!mod) return
  const next = new Set(selectedIds.value)
  for (const p of mod.permissions) {
    if (checked) {
      next.add(p.id)
    } else {
      next.delete(p.id)
    }
  }
  selectedIds.value = next
}

async function handleSave() {
  if (!props.roleId) return
  saving.value = true
  try {
    if (roleName.value && role.value && roleName.value !== role.value.name) {
      await updateRoleApi(props.roleId, { name: roleName.value })
    }
    await saveRolePermissionsApi(props.roleId, Array.from(selectedIds.value))
    toast.success('Role permissions saved successfully')
    emit('saved')
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to save permissions')
  } finally {
    saving.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading" class="flex justify-center py-12">
      <LoadingState />
    </div>
    <template v-else>
      <div class="flex items-center gap-4">
        <div class="space-y-1 flex-1">
          <UiLabel for="role-name">Role Name</UiLabel>
          <UiInput
            id="role-name"
            v-model="roleName"
            :placeholder="roleLabel || 'Enter role name'"
            class="max-w-xs"
          />
        </div>
        <UiButton
          v-if="roleId"
          :disabled="saving"
          @click="handleSave"
          class="mt-6"
        >
          <Loader2 v-if="saving" class="size-4 mr-1 animate-spin" />
          <Save v-else class="size-4 mr-1" />
          Save Role
        </UiButton>
      </div>

      <div class="space-y-4">
        <PermissionGroup
          v-for="mod in modules"
          :key="mod.id"
          :module-name="mod.name"
          :module-label="mod.label"
          :permissions="mod.permissions"
          :selected-ids="selectedIds"
          @toggle="togglePermission"
          @toggle-all="toggleModuleAll"
        />
      </div>

      <div v-if="modules.length === 0" class="py-12">
        <EmptyState
          title="No modules configured"
          description="Create modules and permissions in the database first"
        />
      </div>
    </template>
  </div>
</template>
