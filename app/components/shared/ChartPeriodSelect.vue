<script setup lang="ts">
import type { DashboardPeriod } from '@/lib/period'
import { DASHBOARD_PERIOD_OPTIONS } from '@/lib/period'

defineProps<{
  modelValue: DashboardPeriod
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: DashboardPeriod): void
}>()
</script>

<template>
  <div class="flex items-center gap-1">
    <UiButton
      v-for="option in DASHBOARD_PERIOD_OPTIONS"
      :key="option.value"
      :variant="modelValue === option.value ? 'default' : 'ghost'"
      size="sm"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </UiButton>
  </div>
</template>