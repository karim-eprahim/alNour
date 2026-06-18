<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue';
import Navbar from '~/components/layout/Navbar.vue';
useSeoMeta({
  titleTemplate: '%s | Al Nour',
})
</script>

<template>
  <AppShell>
    <slot />
  </AppShell>
</template>
