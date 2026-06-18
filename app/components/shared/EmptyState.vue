<script setup lang="ts">
import { Inbox } from '@lucide/vue'

interface Props {
  title?: string
  description?: string
  icon?: Component
  action?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No data found',
  description: 'There are no records to display yet.',
})

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
      <component :is="icon || Inbox" class="size-6 text-muted-foreground" />
    </div>
    <h3 class="mb-1 text-sm font-semibold">{{ title }}</h3>
    <p class="mb-4 max-w-xs text-xs text-muted-foreground">{{ description }}</p>
    <UiButton v-if="action" size="sm" @click="emit('action')">
      {{ action }}
    </UiButton>
  </div>
</template>
