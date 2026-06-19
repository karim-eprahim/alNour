<script setup lang="ts">
import AppShell from '~/components/layout/AppShell.vue';
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
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
