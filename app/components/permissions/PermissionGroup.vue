<script setup lang="ts">
import { computed } from 'vue'
import type { PermissionWithModule } from '~/modules/permissions/type'

const props = defineProps<{
  moduleName: string
  moduleLabel: string
  permissions: PermissionWithModule[]
  selectedIds: Set<string>
}>()

const emit = defineEmits<{
  toggle: [permissionId: string]
  toggleAll: [moduleName: string, checked: boolean]
}>()

const allSelected = computed(() =>
  props.permissions.length > 0 && props.permissions.every((p) => props.selectedIds.has(p.id))
)

const someSelected = computed(() =>
  props.permissions.some((p) => props.selectedIds.has(p.id)) && !allSelected.value
)

function handleToggleAll() {
  emit('toggleAll', props.moduleName, !allSelected.value)
}

function getPermissionModel(id: string) {
  return computed({
    get() {
      return props.selectedIds.has(id)
    },

    set(value: boolean) {
      emit('toggle', id)
    }
  })
}
</script>

<template>
  <UiCard>
    <UiCardHeader class="pb-3">
      <div class="flex items-center justify-between">
        <UiCardTitle class="text-base font-semibold">{{ moduleLabel || moduleName }} Permissions</UiCardTitle>
        <label class="flex items-center gap-2 text-sm cursor-pointer select-none">
          <UiCheckbox
            :model-value="allSelected"
            :indeterminate="someSelected"
            @update:model-value="handleToggleAll"
          />
          <span class="text-muted-foreground text-xs">Select All</span>
        </label>
      </div>
    </UiCardHeader>
    <UiCardContent>
      <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <label
          v-for="perm in permissions"
          :key="perm.id"
          class="flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-accent/50 transition-colors select-none"
          :class="{ 'border-primary/30 bg-primary/5': selectedIds.has(perm.id) }"
        >
<UiCheckbox
  :model-value="selectedIds.has(perm.id)"
  @update:model-value="emit('toggle', perm.id)"
/>
          <span class="text-sm">{{ perm.label }}</span>
        </label>
      </div>
      <div v-if="permissions.length === 0" class="py-3 text-center text-sm text-muted-foreground">
        No permissions defined for this module
      </div>
    </UiCardContent>
  </UiCard>
</template>
