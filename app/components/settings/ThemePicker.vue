<script setup lang="ts">
import type { ThemeName } from '@/composables/useTheme'
import type { AcceptableValue } from 'reka-ui'

const { theme, setTheme, themes } = useTheme()
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function onSelect(value: AcceptableValue) {
  setTheme(value as ThemeName)
}
</script>

<template>
<UiRadioGroup
  :model-value="theme"
  class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
  @update:model-value="onSelect"
>
  <div
    v-for="t in themes"
    :key="t"
    class="relative"
  >
    <UiRadioGroupItem
      :id="t"
      :value="t"
      class="sr-only"
    />

    <Label
      :for="t"
      class="block cursor-pointer"
    >
      <ThemeCard
        :theme="t"
        :selected="theme === t"
        :dark="isDark"
      />
    </Label>
  </div>
</UiRadioGroup>
</template>
