<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

useSeoMeta({
  titleTemplate: '%s | Distributor | Al Nour',
})
</script>

<template>
  <DistributorShell>
    <slot />
  </DistributorShell>
  <UiToaster />
</template>
