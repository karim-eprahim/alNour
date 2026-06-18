<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t bg-background px-4 lg:px-6">
    <div class="flex h-12 items-center justify-between text-xs text-muted-foreground">
      <p>&copy; {{ year }} Al Nour Charcoal. All rights reserved.</p>
      <p class="hidden sm:block">v1.0.0</p>
    </div>
  </footer>
</template>
