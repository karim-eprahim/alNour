<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div class="text-center space-y-4">
      <h1 class="text-7xl font-bold text-destructive">403</h1>
      <h2 class="text-2xl font-semibold">Access Denied</h2>
      <p class="text-muted-foreground max-w-md">
        You do not have the required permissions to access this page.
      </p>
      <UiButton as-child>
        <NuxtLink to="/">Back to Dashboard</NuxtLink>
      </UiButton>
    </div>
  </div>
</template>
