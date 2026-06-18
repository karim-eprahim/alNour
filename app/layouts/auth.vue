<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s | Al Nour',
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
    </div>

    <div class="relative w-full max-w-sm">
      <div class="mb-8 text-center">
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
          <span class="text-lg font-bold text-primary-foreground">N</span>
        </div>
        <h1 class="text-xl font-semibold tracking-tight">Al Nour Charcoal</h1>
        <p class="mt-1 text-sm text-muted-foreground">Enterprise Management System</p>
      </div>

      <div class="rounded-xl border bg-card p-6 shadow-sm">
        <slot />
      </div>

      <p class="mt-6 text-center text-xs text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} Al Nour Charcoal. All rights reserved.
      </p>
    </div>
  </div>
</template>
