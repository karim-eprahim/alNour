<script setup lang="ts">
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
