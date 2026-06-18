<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar'
import { useColorMode } from '@/composables/useColorMode'
import {useAuthStore} from "@/modules/auth/store"

import { cn } from '@/lib/utils'
import {
  Menu,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from '@lucide/vue'

const { openMobile } = useSidebar()
const { isDark, toggle: toggleColorMode } = useColorMode()
const auth = useAuthStore()

const roles = ['Super Admin', 'Admin', 'Manager', 'Supervisor', 'Operator']
const currentRole = ref('Super Admin')

const notifications = ref([
  { id: 1, title: 'Low stock alert', description: 'Charcoal grade A is below minimum', time: '5m ago' },
  { id: 2, title: 'Production batch complete', description: 'Batch #PB-2024-089 completed', time: '1h ago' },
  { id: 3, title: 'New order received', description: 'Order #INV-2024-456 from Distributor Co.', time: '2h ago' },
])
</script>

<template>
  <header
    class="sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background px-4 lg:px-6"
  >
    <UiButton
      variant="ghost"
      size="icon"
      class="size-8 shrink-0 lg:hidden"
      @click="openMobile"
    >
      <Menu class="size-4" />
    </UiButton>

    <div class="flex-1" />

    <div class="flex items-center gap-1">
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost" size="sm" class="h-8 gap-1.5 px-2 text-xs font-medium">
            <User class="size-3.5" />
            <span class="hidden sm:inline">{{ currentRole }}</span>
            <ChevronDown class="size-3 opacity-50" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end" class="w-44">
          <UiDropdownMenuLabel>Switch Role</UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem
            v-for="role in roles"
            :key="role"
            :class="cn(role === currentRole && 'bg-accent font-medium')"
            @click="currentRole = role"
          >
            {{ role }}
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>

      <UiSeparator orientation="vertical" class="mx-1 h-6" />

      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost" size="icon" class="size-8 relative">
            <Bell class="size-4" />
            <span class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {{ notifications.length }}
            </span>
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end" class="w-72">
          <UiDropdownMenuLabel>Notifications</UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <div class="max-h-72 overflow-y-auto">
            <button
              v-for="n in notifications"
              :key="n.id"
              class="flex w-full flex-col gap-0.5 px-2 py-2 text-left text-sm transition-colors hover:bg-accent"
            >
              <span class="font-medium">{{ n.title }}</span>
              <span class="text-xs text-muted-foreground line-clamp-1">{{ n.description }}</span>
              <span class="text-[10px] text-muted-foreground/60">{{ n.time }}</span>
            </button>
          </div>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem class="justify-center text-xs font-medium text-primary">
            View all notifications
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>

      <UiButton
        variant="ghost"
        size="icon"
        class="size-8"
        @click="toggleColorMode"
      >
        <Sun v-if="isDark" class="size-4" />
        <Moon v-else class="size-4" />
      </UiButton>

      <UiSeparator orientation="vertical" class="mx-1 h-6" />

      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost" size="sm" class="h-8 gap-2 px-1.5">
            <UiAvatar class="size-7">
              <UiAvatarImage :src="auth.user?.avatar ?? ''" :alt="auth.user?.name ?? ''" />
              <UiAvatarFallback class="bg-primary text-primary-foreground text-xs">
                {{ auth.user?.name?.charAt(0) || 'U' }}
              </UiAvatarFallback>
            </UiAvatar>
            <div v-if="auth.user" class="hidden text-left md:block">
              <p class="text-xs font-medium leading-tight">{{ auth.user.name }}</p>
              <p class="text-[10px] text-muted-foreground leading-tight">{{ auth.user.email }}</p>
            </div>
            <ChevronDown class="hidden size-3 opacity-50 md:block" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end" class="w-48">
          <UiDropdownMenuLabel>
            <div class="flex flex-col">
              <span>{{ auth.user?.name || 'User' }}</span>
              <span class="text-xs font-normal text-muted-foreground">{{ auth.user?.email || 'user@example.com' }}</span>
            </div>
          </UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem>
            <User class="size-4" />
            Profile
          </UiDropdownMenuItem>
          <UiDropdownMenuItem>
            <Settings class="size-4" />
            Settings
          </UiDropdownMenuItem>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem variant="destructive" @click="auth.logout()">
            <LogOut class="size-4" />
            Sign Out
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>
  </header>
</template>
