<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar'
import { useAuthStore } from '@/modules/auth/store'
import NotificationDropdown from '@/components/layout/NotificationDropdown.vue'

import { cn } from '@/lib/utils'
import {
  Menu,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from '@lucide/vue'

const { openMobile } = useSidebar()
const colorMode = useColorMode()
const auth = useAuthStore()

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const roles = ['Super Admin', 'Admin', 'Manager', 'Supervisor', 'Operator']
const currentRole = ref('Super Admin')

function navigateToSettings() {
  navigateTo('settings/appearance')
}
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

      <NotificationDropdown :notifications="[]" :unread-count="0" />

      <UiButton
        variant="ghost"
        size="icon"
        class="size-8"
        @click="toggleColorMode"
      >
        <Sun v-if="colorMode.preference === 'dark'" class="size-4" />
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
          <UiDropdownMenuItem @click="navigateToSettings()">
            <Settings class="size-4"/>
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
