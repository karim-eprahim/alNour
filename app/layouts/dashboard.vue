<script setup lang="ts">
import AppShell from '~/components/layout/AppShell.vue';
useSeoMeta({
  titleTemplate: '%s | Dashboard | Al Nour',
})
</script>

<template>
  <AppShell>
    <div class="space-y-6">
      <slot />
    </div>
  </AppShell>
</template>
