<script setup lang="ts">
interface Props {
  text?: string
  count?: number
}

withDefaults(defineProps<Props>(), {
  text: 'Loading...',
  count: 1,
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="mb-4">
      <UiSkeleton class="h-10 w-10 rounded-full" />
    </div>
    <UiSkeleton class="mb-2 h-4 w-32" />
    <UiSkeleton class="h-3 w-48" />
  </div>

  <div v-if="count > 1" class="space-y-3">
    <template v-for="i in count" :key="i">
      <UiSkeleton class="h-12 w-full rounded-lg" />
    </template>
  </div>
</template>
