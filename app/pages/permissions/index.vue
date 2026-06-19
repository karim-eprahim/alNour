<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

await navigateTo('/users', { replace: true })
</script>

<template>
  <div />
</template>
