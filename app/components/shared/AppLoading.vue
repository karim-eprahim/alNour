<template>
  <div class="relative flex min-h-screen flex-col items-center justify-center bg-background p-4">
    <div class="flex flex-col items-center gap-5">
      <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
        <span class="text-lg font-bold text-primary-foreground">N</span>
      </div>

      <div class="text-center">
        <p class="text-xl font-semibold tracking-tight text-foreground">alNour</p>
        <p class="mt-1 text-sm text-muted-foreground">Loading...</p>
      </div>

      <div class="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  </div>
</template>
