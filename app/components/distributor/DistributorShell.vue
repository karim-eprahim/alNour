<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Menu, LogOut, Sun, Moon } from '@lucide/vue'
import { useColorMode } from '@/composables/useColorMode'
import { useAuthStore } from '@/modules/auth/store'

const { isDark, toggle: toggleColorMode } = useColorMode()
const auth = useAuthStore()
const route = useRoute()

const { desktopNav, isActive } = useDistributorNavigation()

const sidebarOpen = ref(false)

function closeSidebar() {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="relative flex min-h-screen bg-background">
    <aside
      class="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-sidebar lg:flex"
    >
      <div class="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
          N
        </div>
        <span class="font-semibold text-sidebar-foreground">Distributor</span>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto p-3">
        <button
          v-for="item in desktopNav"
          :key="item.title"
          :class="cn(
            'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive(item.to)
              ? 'bg-sidebar-accent text-sidebar-primary font-semibold'
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
          )"
          @click="navigateTo(item.to!)"
        >
          <component :is="item.icon" class="size-4 shrink-0" />
          <span class="flex-1 text-left truncate">{{ item.title }}</span>
        </button>
      </nav>

      <div class="border-t border-sidebar-border p-3">
        <button
          class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          @click="auth.logout()"
        >
          <LogOut class="size-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>

    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-20 bg-black/50 lg:hidden"
      @click="closeSidebar"
    />

    <aside
      :class="cn(
        'fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r bg-sidebar transition-transform duration-300 lg:hidden',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )"
    >
      <div class="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
          N
        </div>
        <span class="font-semibold text-sidebar-foreground">Distributor</span>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto p-3">
        <button
          v-for="item in desktopNav"
          :key="item.title"
          :class="cn(
            'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive(item.to)
              ? 'bg-sidebar-accent text-sidebar-primary font-semibold'
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
          )"
          @click="navigateTo(item.to!)"
        >
          <component :is="item.icon" class="size-4 shrink-0" />
          <span class="flex-1 text-left truncate">{{ item.title }}</span>
        </button>
      </nav>
    </aside>

    <div class="flex flex-1 flex-col pb-16 lg:pb-0 lg:ml-64">
      <header class="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4 lg:px-6">
        <UiButton variant="ghost" size="icon" class="size-8 shrink-0 lg:hidden" @click="sidebarOpen = true">
          <Menu class="size-4" />
        </UiButton>

        <div class="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span class="hidden sm:inline">Distributor</span>
          <span class="hidden sm:inline">/</span>
          <span class="font-medium text-foreground">{{ desktopNav.find(n => isActive(n.to))?.title || 'Dashboard' }}</span>
        </div>

        <div class="flex-1" />

        <UiButton variant="ghost" size="icon" class="size-8" @click="toggleColorMode">
          <Sun v-if="isDark" class="size-4" />
          <Moon v-else class="size-4" />
        </UiButton>

        <UiAvatar class="size-7">
          <UiAvatarImage :src="auth.user?.avatar ?? ''" :alt="auth.user?.name ?? ''" />
          <UiAvatarFallback class="bg-primary text-primary-foreground text-xs">
            {{ auth.user?.name?.charAt(0) || 'U' }}
          </UiAvatarFallback>
        </UiAvatar>
      </header>

      <main class="flex-1 p-4 lg:p-6">
        <slot />
      </main>
    </div>

    <DistributorBottomNav />
  </div>
</template>
