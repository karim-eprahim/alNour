<script setup lang="ts">
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Appearance" description="Customize the look and feel of your workspace." />

    <div class="space-y-6">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Theme</UiCardTitle>
          <UiCardDescription>Choose a color theme for your workspace. The whole application updates instantly.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <ThemePicker />
        </UiCardContent>
      </UiCard>

      <div class="grid gap-6 lg:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Appearance Mode</UiCardTitle>
            <UiCardDescription>Choose between light, dark, or system appearance.</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <ColorModePicker />
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Border Radius</UiCardTitle>
            <UiCardDescription>Adjust the roundness of cards, buttons, and surfaces.</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <RadiusPicker />
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Live Preview</UiCardTitle>
          <UiCardDescription>See how the current theme, mode, and radius look together.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <AppearancePreview />
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
