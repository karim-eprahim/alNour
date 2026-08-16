<script setup lang="ts">
import { Receipt } from '@lucide/vue'
import { useSalesStore } from '@/modules/sales/store'

const store = useSalesStore()
const loading = ref(true)

const orders = computed(() => store.orders)

function orderStatusVariant(status: string) {
  const map: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    COMPLETED: 'default',
    CONFIRMED: 'secondary',
    PENDING: 'outline',
    CANCELLED: 'destructive',
  }
  return map[status] || 'secondary'
}

function formatMoney(value: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(value || 0)
}

onMounted(async () => {
  try {
    await store.fetchOrders({ limit: 5, page: 1 })
  } catch {
    // keep existing data on failure
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <UiCard class="shadow-sm transition-shadow hover:shadow-md">
    <UiCardHeader class="flex flex-row items-start justify-between gap-4">
      <div>
        <UiCardTitle>Recent Orders</UiCardTitle>
        <UiCardDescription>Latest sales orders</UiCardDescription>
      </div>
      <UiButton as="NuxtLink" to="/sales/orders" variant="ghost" size="sm" class="h-7 px-2 text-xs text-muted-foreground">
        View all
      </UiButton>
    </UiCardHeader>
    <UiCardContent>
      <div v-if="loading" class="flex justify-center py-8">
        <LoadingState />
      </div>
      <div v-else-if="orders.length === 0" class="py-4">
        <EmptyState title="No orders yet" description="New sales orders will appear here" />
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="order in orders"
          :key="order.id"
          class="flex items-center justify-between gap-3 rounded-lg border p-3"
        >
          <div class="flex min-w-0 items-center gap-3">
            <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Receipt class="size-4 text-muted-foreground" />
            </div>
            <div class="min-w-0">
              <NuxtLink
                :to="`/sales/${order.id}`"
                class="block truncate text-sm font-medium hover:underline"
              >
                {{ order.orderNumber }}
              </NuxtLink>
              <p class="truncate text-xs text-muted-foreground">
                {{ order.customer?.name || '—' }}
              </p>
            </div>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <span class="text-sm font-medium tabular-nums">{{ formatMoney(order.totalAmount) }}</span>
            <UiBadge :variant="orderStatusVariant(order.status)">{{ order.status }}</UiBadge>
          </div>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>