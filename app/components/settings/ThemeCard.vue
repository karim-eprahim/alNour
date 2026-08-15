<script setup lang="ts">
import type { ThemeName } from '@/composables/useTheme'
import { cn } from '@/lib/utils'
import { Check } from '@lucide/vue'

defineProps<{
  theme: ThemeName
  selected?: boolean
  dark?: boolean
}>()

const labels: Record<ThemeName, string> = {
  emerald: 'Emerald',
  blue: 'Blue',
  violet: 'Violet',
  orange: 'Orange',
}
</script>

<template>
  <div
    :data-theme="theme"
    :class="cn(
      'group relative flex h-full cursor-pointer flex-col gap-3 rounded-lg border bg-card p-3 transition-colors',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
      dark && 'dark',
      selected
        ? 'border-primary ring-2 ring-ring ring-offset-2 ring-offset-background'
        : 'border-border hover:bg-accent/50',
    )"
  >
    <div class="flex overflow-hidden rounded-md border border-border">
      <div class="flex w-6 shrink-0 flex-col gap-1 bg-sidebar p-1">
        <div class="h-1 w-full rounded-sm bg-sidebar-primary" />
        <div class="h-1 w-full rounded-sm bg-sidebar-accent" />
        <div class="h-1 w-4 rounded-sm bg-sidebar-accent" />
      </div>
      <div class="flex-1 space-y-1 bg-card p-1.5">
        <div class="h-2 w-8 rounded-sm bg-primary" />
        <div class="h-1 w-full rounded-sm bg-muted" />
        <div class="h-1 w-3/4 rounded-sm bg-muted" />
        <div class="h-1 w-2/3 rounded-sm bg-accent" />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-foreground">{{ labels[theme] }}</span>
      <span
        v-if="selected"
        class="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
        aria-hidden="true"
      >
        <Check class="size-3" />
      </span>
      <span v-else class="size-5" aria-hidden="true" />
    </div>
  </div>
</template>
