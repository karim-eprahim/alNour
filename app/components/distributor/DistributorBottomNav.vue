<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useDistributorNavigation } from '@/composables/useDistributorNavigation'

const { mobileNav, isActive } = useDistributorNavigation()
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t bg-background px-2 pb-safe lg:hidden">
    <button
      v-for="item in mobileNav"
      :key="item.title"
      :class="cn(
        'flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-medium transition-colors',
        isActive(item.to)
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground',
      )"
      @click="navigateTo(item.to!)"
    >
      <component :is="item.icon" class="size-5" />
      <span>{{ item.title }}</span>
    </button>
  </nav>
</template>
