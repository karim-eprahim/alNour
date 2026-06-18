<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue';
import Navbar from '~/components/layout/Navbar.vue';
useSeoMeta({
  titleTemplate: '%s | Dashboard | Al Nour',
})
</script>

<template>
  <AppShell>
    <Navbar class="mb-4"/>
    <div class="space-y-6">
      <slot />
    </div>
  </AppShell>
</template>
