<script setup lang="ts">
import type { RadiusName } from '@/composables/useTheme'
import type { AcceptableValue } from 'reka-ui'

const { radius, setRadius, radiusOptions } = useTheme()

const options = [
  { value: 'compact', label: 'Compact' },
  { value: 'default', label: 'Default' },
  { value: 'rounded', label: 'Rounded' },
] as const

const isSelected = (value: RadiusName) => radius.value === value

function onSelect(value: AcceptableValue) {
  if (
    value === 'compact' ||
    value === 'default' ||
    value === 'rounded'
  ) {
    setRadius(value)
  }
}
</script>

<template>
  <UiRadioGroup
    :model-value="radius"
    class="grid grid-cols-1 gap-2 sm:grid-cols-3"
    @update:model-value="onSelect"
  >
    <label
      v-for="opt in options"
      :key="opt.value"
      :for="`radius-${opt.value}`"
      :class="[
        'flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors',
        isSelected(opt.value)
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      ]"
    >
      <!-- <UiRadioGroupItem
        :id="`radius-${opt.value}`"
        :value="opt.value"
      />

      <span
        class="size-3 border-2"
        :class="
          isSelected(opt.value)
            ? 'border-primary'
            : 'border-muted-foreground/40'
        "
        :style="{
          borderRadius: radiusOptions[opt.value],
        }"
        aria-hidden="true"
      /> -->

      <span>{{ opt.label }}</span>
    </label>
  </UiRadioGroup>
</template>