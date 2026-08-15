<script setup lang="ts">
import { Sun, Moon, Monitor } from '@lucide/vue'
import type { AcceptableValue } from 'reka-ui'

const colorMode = useColorMode()

const options = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]
const isSelected = (value: string) => colorMode?.preference === value

function onSelect(value: AcceptableValue) {
  colorMode.preference = value as 'light' | 'dark' | 'system'
}
</script>

<template>
<UiRadioGroup
  :model-value="colorMode?.preference"
  class="grid grid-cols-1 gap-2 sm:grid-cols-3"
  @update:model-value="onSelect"
>
  <label
    v-for="opt in options"
    :key="opt.value"
    :for="`color-mode-${opt.value}`"
      :class="[
        'flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors',
        isSelected(opt.value)
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      ]"
  >

    <component
      :is="opt.icon"
      class="size-4"
    />

    <span>{{ opt.label }}</span>
  </label>
</UiRadioGroup>
</template>