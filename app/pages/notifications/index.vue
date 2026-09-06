<script setup lang="ts">
import { Bell, CheckCheck, Eye, EyeOff, RefreshCw, Search, Trash2 } from '@lucide/vue'
import { toast } from 'vue-sonner'
import PageHeader from '~/components/shared/PageHeader.vue'
import { useNotificationStore } from '@/stores/notification'
import type { Notification } from '@/types/notification'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const notificationStore = useNotificationStore()

const search = ref('')
const statusFilter = ref<'all' | 'read' | 'unread'>('all')
const selectedIds = ref<Set<string>>(new Set())
const showDeleteAllDialog = ref(false)
const showBulkDeleteDialog = ref(false)
const actionLoading = ref(false)

const page = computed(() => notificationStore.pagination.page)
const totalPages = computed(() => notificationStore.pagination.totalPages)
const total = computed(() => notificationStore.pagination.total)

const allOnPageSelected = computed(() =>
  notificationStore.items.length > 0 &&
  notificationStore.items.every(n => selectedIds.value.has(n.id)),
)
const headerCheckboxState = computed<boolean | 'indeterminate'>(() => {
  if (allOnPageSelected.value) return true
  if (notificationStore.items.some(n => selectedIds.value.has(n.id))) return 'indeterminate'
  return false
})

const debouncedSearch = ref('')
watch(search, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedSearch.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})

async function fetchData(targetPage = 1) {
  selectedIds.value.clear()
  notificationStore.searchQuery = debouncedSearch.value
  notificationStore.statusFilter = statusFilter.value
  await notificationStore.fetchNotifications(targetPage)
}

watch(debouncedSearch, () => fetchData(1))
watch(statusFilter, () => fetchData(1))

function toggleSelectAll(value: boolean | 'indeterminate') {
  if (value === true) {
    notificationStore.items.forEach(n => selectedIds.value.add(n.id))
  } else {
    notificationStore.items.forEach(n => selectedIds.value.delete(n.id))
  }
}

function toggleSelect(id: string, value: boolean | 'indeterminate') {
  if (value === true) selectedIds.value.add(id)
  else selectedIds.value.delete(id)
}

async function handleMarkAllAsRead() {
  try {
    await notificationStore.markAllAsRead()
    toast.success('All notifications marked as read')
  } catch { toast.error('Failed to mark all as read') }
}

async function handleRefresh() {
  await fetchData(page.value)
}

async function handleToggleRead(n: Notification) {
  try {
    if (n.readAt) await notificationStore.markAsUnread(n.id)
    else await notificationStore.markAsRead(n.id)
  } catch { toast.error('Failed to update notification') }
}

async function handleDelete(id: string) {
  actionLoading.value = true
  try {
    await notificationStore.deleteNotification(id)
    selectedIds.value.delete(id)
    toast.success('Notification deleted')
  } catch { toast.error('Failed to delete notification') }
  finally { actionLoading.value = false }
}

async function handleBulkDelete() {
  actionLoading.value = true
  try {
    const ids = [...selectedIds.value]
    const res = await notificationStore.bulkDelete(ids)
    selectedIds.value.clear()
    showBulkDeleteDialog.value = false
    toast.success(`${res.deletedCount} notification(s) deleted`)
  } catch { toast.error('Failed to delete notifications') }
  finally { actionLoading.value = false }
}

async function handleDeleteAll() {
  actionLoading.value = true
  try {
    await notificationStore.deleteAllNotifications()
    selectedIds.value.clear()
    showDeleteAllDialog.value = false
    toast.success('All notifications deleted')
  } catch { toast.error('Failed to delete notifications') }
  finally { actionLoading.value = false }
}

function goToPage(p: number) {
  if (p < 1 || p > totalPages.value || p === page.value) return
  fetchData(p)
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString()
}

onMounted(() => fetchData(1))
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Notifications"
      :description="notificationStore.unreadCount > 0
        ? `You have ${notificationStore.unreadCount} unread notification(s)`
        : 'You are all caught up'"
    >
      <template #actions>
        <UiButton variant="outline" size="sm" @click="handleMarkAllAsRead" :disabled="notificationStore.unreadCount === 0">
          <CheckCheck class="size-4" /> Mark all as read
        </UiButton>
        <UiButton variant="outline" size="sm" @click="handleRefresh" :disabled="notificationStore.loading">
          <RefreshCw class="size-4" :class="notificationStore.loading && 'animate-spin'" /> Refresh
        </UiButton>
        <UiButton variant="destructive" size="sm" @click="showDeleteAllDialog = true" :disabled="notificationStore.items.length === 0 && total === 0">
          <Trash2 class="size-4" /> Delete all
        </UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex flex-wrap items-center gap-2">
          <div class="relative max-w-xs flex-1">
            <Search class="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <UiInput v-model="search" placeholder="Search title or message..." class="pl-8" />
          </div>
          <UiSelect v-model="statusFilter">
            <UiSelectTrigger class="w-36">
              <UiSelectValue placeholder="All statuses" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="all">All</UiSelectItem>
              <UiSelectItem value="unread">Unread</UiSelectItem>
              <UiSelectItem value="read">Read</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
          <div v-if="selectedIds.size > 0" class="ms-auto flex items-center gap-2">
            <span class="text-sm text-muted-foreground">{{ selectedIds.size }} selected</span>
            <UiButton variant="destructive" size="sm" @click="showBulkDeleteDialog = true">
              <Trash2 class="size-4" /> Delete selected
            </UiButton>
          </div>
        </div>
      </UiCardHeader>
      <UiCardContent>
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead class="w-10">
                <UiCheckbox
                  :model-value="headerCheckboxState"
                  @update:model-value="toggleSelectAll"
                  aria-label="Select all on page"
                />
              </UiTableHead>
              <UiTableHead class="w-12">#</UiTableHead>
              <UiTableHead>Title</UiTableHead>
              <UiTableHead>Message</UiTableHead>
              <UiTableHead class="w-24">Status</UiTableHead>
              <UiTableHead class="w-44">Created At</UiTableHead>
              <UiTableHead class="w-28 text-right">Actions</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-if="notificationStore.loading">
              <UiTableCell colspan="7" class="py-8 text-center text-sm text-muted-foreground">
                Loading...
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-else-if="notificationStore.items.length === 0">
              <UiTableCell colspan="7" class="py-8 text-center">
                <div class="flex flex-col items-center gap-2 text-muted-foreground">
                  <Bell class="size-8 opacity-50" />
                  <p class="text-sm">No notifications found</p>
                </div>
              </UiTableCell>
            </UiTableRow>
            <UiTableRow
              v-else
              v-for="(n, idx) in notificationStore.items"
              :key="n.id"
              :class="!n.readAt && 'bg-accent/40'"
            >
              <UiTableCell>
                <UiCheckbox
                  :model-value="selectedIds.has(n.id)"
                  @update:model-value="(v) => toggleSelect(n.id, v)"
                  :aria-label="`Select ${n.title}`"
                />
              </UiTableCell>
              <UiTableCell class="text-muted-foreground tabular-nums">
                {{ (page - 1) * notificationStore.pagination.limit + idx + 1 }}
              </UiTableCell>
              <UiTableCell class="font-medium">{{ n.title }}</UiTableCell>
              <UiTableCell class="max-w-xs truncate text-muted-foreground" :title="n.message">
                {{ n.message }}
              </UiTableCell>
              <UiTableCell>
                <UiBadge :variant="n.readAt ? 'secondary' : 'default'">
                  {{ n.readAt ? 'Read' : 'Unread' }}
                </UiBadge>
              </UiTableCell>
              <UiTableCell class="whitespace-nowrap text-sm text-muted-foreground">
                {{ formatDateTime(n.createdAt) }}
              </UiTableCell>
              <UiTableCell>
                <div class="flex justify-end gap-1">
                  <UiButton
                    variant="ghost"
                    size="icon"
                    class="size-8"
                    :title="n.readAt ? 'Mark as unread' : 'Mark as read'"
                    @click="handleToggleRead(n)"
                  >
                    <EyeOff v-if="n.readAt" class="size-4" />
                    <Eye v-else class="size-4" />
                  </UiButton>
                  <UiButton
                    variant="ghost"
                    size="icon"
                    class="size-8 text-destructive hover:text-destructive"
                    title="Delete"
                    :disabled="actionLoading"
                    @click="handleDelete(n.id)"
                  >
                    <Trash2 class="size-4" />
                  </UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>

        <div v-if="totalPages > 1" class="mt-4 flex items-center justify-between">
          <p class="text-sm text-muted-foreground">
            Page {{ page }} of {{ totalPages }} ({{ total }} total)
          </p>
          <div class="flex gap-2">
            <UiButton variant="outline" size="sm" :disabled="page <= 1" @click="goToPage(page - 1)">
              Previous
            </UiButton>
            <UiButton variant="outline" size="sm" :disabled="page >= totalPages" @click="goToPage(page + 1)">
              Next
            </UiButton>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <ConfirmDialog
      v-model:open="showDeleteAllDialog"
      title="Delete all notifications"
      description="Are you sure you want to permanently delete all your notifications? This cannot be undone."
      confirm-text="Delete all"
      variant="destructive"
      :loading="actionLoading"
      @confirm="handleDeleteAll"
      @cancel="showDeleteAllDialog = false"
    />

    <ConfirmDialog
      v-model:open="showBulkDeleteDialog"
      title="Delete selected notifications"
      :description="`Are you sure you want to delete ${selectedIds.size} selected notification(s)?`"
      confirm-text="Delete"
      variant="destructive"
      :loading="actionLoading"
      @confirm="handleBulkDelete"
      @cancel="showBulkDeleteDialog = false"
    />
  </div>
</template>
