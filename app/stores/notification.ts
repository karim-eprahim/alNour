import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'
import type { Notification } from '@/types/notification'

// How long a delivered notification id is remembered for cross-channel dedupe
const SEEN_TTL_MS = 5 * 60 * 1000

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
  const searchQuery = ref('')
  const statusFilter = ref<'all' | 'read' | 'unread'>('all')

  // Ids already delivered via WebSocket (in-app toast shown). The FCM
  // foreground handler consults this set and stays silent on duplicates,
  // so an open app shows exactly one toast. Not persisted.
  const seenIds = ref<Set<string>>(new Set())

  function markSeen(id: string) {
    if (!id || seenIds.value.has(id)) return
    seenIds.value.add(id)
    setTimeout(() => { seenIds.value.delete(id) }, SEEN_TTL_MS)
  }

  function hasSeen(id: string): boolean {
    return !!id && seenIds.value.has(id)
  }

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
        status: statusFilter.value,
      })
      if (searchQuery.value.trim()) {
        params.set('search', searchQuery.value.trim())
      }

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

  async function markAsUnread(id: string) {
    const notification = items.value.find(n => n.id === id)
    if (!notification || !notification.readAt) return

    try {
      await $fetch(`/api/notifications/${id}/unread`, { method: 'PATCH' })
      notification.readAt = null
      unreadCount.value += 1
    } catch (e) {
      console.error('Failed to mark notification as unread:', e)
      throw e
    }
  }

  async function deleteNotification(id: string) {
    const notification = items.value.find(n => n.id === id)
    try {
      await $fetch(`/api/notifications/${id}`, { method: 'DELETE' })
      items.value = items.value.filter(n => n.id !== id)
      if (notification && !notification.readAt) {
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
      pagination.value.total = Math.max(0, pagination.value.total - 1)
      // Step back a page if the current one became empty
      if (items.value.length === 0 && pagination.value.page > 1) {
        await fetchNotifications(pagination.value.page - 1)
      }
    } catch (e) {
      console.error('Failed to delete notification:', e)
      throw e
    }
  }

  async function deleteAllNotifications() {
    try {
      await $fetch('/api/notifications', { method: 'DELETE' })
      items.value = []
      unreadCount.value = 0
      pagination.value = { ...pagination.value, page: 1, total: 0, totalPages: 0 }
    } catch (e) {
      console.error('Failed to delete all notifications:', e)
      throw e
    }
  }

  async function bulkDelete(ids: string[]) {
    if (ids.length === 0) return { deletedCount: 0 }
    try {
      const response = await $fetch<{ success: boolean; deletedCount: number }>(
        '/api/notifications/bulk-delete',
        { method: 'POST', body: { ids } },
      )
      const deleted = new Set(ids)
      const removedUnread = items.value.filter(n => deleted.has(n.id) && !n.readAt).length
      items.value = items.value.filter(n => !deleted.has(n.id))
      unreadCount.value = Math.max(0, unreadCount.value - removedUnread)
      if (items.value.length === 0 && pagination.value.page > 1) {
        await fetchNotifications(pagination.value.page - 1)
      } else {
        await fetchNotifications(pagination.value.page)
      }
      return response
    } catch (e) {
      console.error('Failed to bulk delete notifications:', e)
      throw e
    }
  }

  // ⭐ P2: Enhanced addNotification with better dedupe
  function addNotification(notification: Notification) {
    console.log('[NotificationStore] Adding notification:', notification)
    // Check if notification already exists
    const exists = items.value.some(n => n.id === notification.id)
    if (!exists) {
      items.value.unshift(notification)
      if (!notification.readAt) {
        unreadCount.value += 1
      }
      if (items.value.length > pagination.value.limit * 2) {
        items.value = items.value.slice(0, pagination.value.limit * 2)
      }
      
      // ⭐ WebSocket owns the open-app experience: toast here, once.
      markSeen(notification.id)
      
      // Show toast with notification details
      toast(notification.title, {
        description: notification.message,
        duration: 4000,
        position: 'top-right',
        // action: {
        //   label: 'View',
        //   onClick: () => {
        //     if (notification.data?.url) {
        //       navigateTo(notification.data.url)
        //     }
        //   }
        // }
      })
    } else {
      console.log('[NotificationStore] Duplicate notification ignored:', notification.id)
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
    searchQuery,
    statusFilter,
    hasMore,
    fetchNotifications,
    loadMore,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    bulkDelete,
    addNotification,
    markSeen,
    hasSeen,
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