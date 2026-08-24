<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Bell, X } from '@lucide/vue'
import { useAuthStore } from '@/modules/auth/store'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  data?: Record<string, unknown>
  readAt?: string | null
  createdAt: string
}

const props = defineProps<{
  notifications: Notification[]
  unreadCount: number
}>()

const auth = useAuthStore()

function formatTime(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

function markAsRead(notification: Notification) {
  if (!notification.readAt) {
    $fetch(`/api/notifications/${notification.id}/read`, { method: 'POST' })
  }
}

function markAllAsRead() {
  $fetch('/api/notifications/read-all', { method: 'POST' })
}
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" size="icon" class="size-8 relative">
        <Bell class="size-4" />
        <span
          v-if="unreadCount > 0"
          class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground"
        >
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </span>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" class="w-80">
      <div class="flex items-center justify-between px-2 py-2">
        <UiDropdownMenuLabel>Notifications</UiDropdownMenuLabel>
        <UiButton
          v-if="unreadCount > 0"
          variant="ghost"
          size="icon"
          class="size-6"
          @click="markAllAsRead"
        >
          <X class="size-3.5" />
        </UiButton>
      </div>
      <UiDropdownMenuSeparator />
      <div class="max-h-80 overflow-y-auto">
        <div v-if="notifications.length === 0" class="px-4 py-6 text-center text-sm text-muted-foreground">
          No notifications
        </div>
        <button
          v-else
          v-for="n in notifications"
          :key="n.id"
          @click="markAsRead(n)"
          :class="[
            'flex w-full flex-col gap-0.5 px-2 py-2 text-left text-sm transition-colors hover:bg-accent',
            cn(!n.readAt && 'bg-accent/50'),
          ]"
        >
          <div class="flex items-start justify-between gap-2">
            <span class="font-medium flex-1">{{ n.title }}</span>
            <span class="text-[10px] text-muted-foreground/60 whitespace-nowrap">{{ formatTime(n.createdAt) }}</span>
          </div>
          <span class="text-xs text-muted-foreground line-clamp-2">{{ n.message }}</span>
        </button>
      </div>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem class="justify-center text-xs font-medium text-primary" @click="$router.push('/notifications')">
        View all notifications
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>