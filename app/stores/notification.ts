import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Notification } from '@/types/notification'

export const useNotificationStore = defineStore('notification', () => {
  const items = ref<Notification[]>([])
  const unreadCount = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })
  const unreadOnly = ref(false)

  const hasMore = computed(() => pagination.value.page < pagination.value.totalPages)

  async function fetchNotifications(page = 1, append = false) {
    if (loading.value) return
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.value.limit.toString(),
        unreadOnly: unreadOnly.value.toString(),
      })

      const response = await $fetch<{
        items: Notification[]
        total: number
        unreadCount: number
        page: number
        totalPages: number
      }>(`/api/notifications?${params}`)

      if (append) {
        items.value = [...items.value, ...response.items]
      } else {
        items.value = response.items
      }

      unreadCount.value = response.unreadCount
      pagination.value = {
        page: response.page,
        limit: pagination.value.limit,
        total: response.total,
        totalPages: response.totalPages,
      }
    } catch (e: any) {
      error.value = e.data?.statusMessage || e.message || 'Failed to fetch notifications'
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    if (!hasMore.value || loading.value) return
    await fetchNotifications(pagination.value.page + 1, true)
  }

  async function markAsRead(id: string) {
    const notification = items.value.find(n => n.id === id)
    if (!notification || notification.readAt) return

    try {
      await $fetch(`/api/notifications/${id}/read`, { method: 'PATCH' })
      notification.readAt = new Date().toISOString()
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    } catch (e) {
      console.error('Failed to mark notification as read:', e)
    }
  }

  async function markAllAsRead() {
    if (unreadCount.value === 0) return

    try {
      await $fetch('/api/notifications/read-all', { method: 'PATCH' })
      items.value.forEach(n => { n.readAt = new Date().toISOString() })
      unreadCount.value = 0
    } catch (e) {
      console.error('Failed to mark all notifications as read:', e)
    }
  }

  function addNotification(notification: Notification) {
    const exists = items.value.some(n => n.id === notification.id)
    if (!exists) {
      items.value.unshift(notification)
      if (!notification.readAt) {
        unreadCount.value += 1
      }
      if (items.value.length > pagination.value.limit) {
        items.value = items.value.slice(0, pagination.value.limit)
      }
    }
  }

  function setUnreadCount(count: number) {
    unreadCount.value = count
  }

  function toggleUnreadFilter() {
    unreadOnly.value = !unreadOnly.value
    fetchNotifications(1)
  }

  function clear() {
    items.value = []
    unreadCount.value = 0
    pagination.value = { page: 1, limit: 20, total: 0, totalPages: 0 }
    error.value = null
  }

  return {
    items,
    unreadCount,
    loading,
    error,
    pagination,
    unreadOnly,
    hasMore,
    fetchNotifications,
    loadMore,
    markAsRead,
    markAllAsRead,
    addNotification,
    setUnreadCount,
    toggleUnreadFilter,
    clear,
  }
}, {
  persist: {
    key: 'alnour-notifications',
    storage: localStorage,
    pick: ['unreadCount'],
  }
})