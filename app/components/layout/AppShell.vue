<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar'
import { cn } from '@/lib/utils'
import { X } from '@lucide/vue'

const { collapsed, isMobileOpen, closeMobile } = useSidebar()
</script>

<template>
  <div class="relative flex min-h-screen">
    <Sidebar />

    <div
      v-if="isMobileOpen"
      class="fixed inset-0 z-20 bg-black/50 lg:hidden"
      @click="closeMobile"
    />

    <div
      :class="cn(
        'flex flex-1 flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'lg:ml-16' : 'lg:ml-64',
      )"
    >
      <Navbar />
      <main class="flex-1 p-4 lg:p-6">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>
