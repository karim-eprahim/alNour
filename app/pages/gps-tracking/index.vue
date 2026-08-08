<script setup lang="ts">
import { Navigation, Map as MapIcon, RefreshCw } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { useTrackingPolling } from '@/composables/useTrackingPolling'
import { useTrackingStore } from '@/modules/tracking/store'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: {
    module: 'GPS',
    action: 'READ',
  },
})

const store = useTrackingStore()
const { start, stop } = useTrackingPolling()

const now = ref(Date.now())
let ticker: ReturnType<typeof setInterval> | null = null

function ago(iso: string) {
  const diff = Math.max(0, now.value - new Date(iso).getTime())
  const sec = Math.floor(diff / 1000)
  if (sec < 5) return 'just now'
  if (sec < 60) return `${sec} seconds ago`
  const min = Math.floor(sec / 60)
  return `${min}m ${sec % 60}s ago`
}

function selectTracking(id: string) {
  store.selectedTrackingId = store.selectedTrackingId === id ? null : id
}

onMounted(() => {
  start()
  ticker = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  stop()
  if (ticker) clearInterval(ticker)
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Distributor Tracking" description="Live GPS locations of active deliveries (updates every 20 seconds)">
      <template #actions>
        <UiButton variant="outline" size="sm" :disabled="store.loading" @click="store.fetchActive()">
          <RefreshCw :class="store.loading ? 'animate-spin' : ''" class="size-4" />
          Refresh
        </UiButton>
      </template>
    </PageHeader>

    <div class="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <!-- Active distributors list -->
      <UiCard class="min-h-[60vh] lg:min-h-0 lg:h-[calc(100vh-11rem)] flex flex-col">
        <UiCardHeader class="pb-3">
          <UiCardTitle class="text-base">Active Deliveries</UiCardTitle>
          <UiCardDescription>{{ store.trackings.length }} distributor(s) currently out for delivery</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="flex-1 overflow-y-auto">
          <div v-if="store.loading && store.trackings.length === 0">
            <LoadingState />
          </div>

          <div v-else-if="store.trackings.length === 0" class="py-8">
            <EmptyState
              title="No active deliveries"
              description="Active distributors will appear here once they start a delivery"
            />
          </div>

          <div v-else class="space-y-2">
            <button
              v-for="t in store.trackings"
              :key="t.trackingId"
              class="w-full rounded-lg border p-3 text-left transition-colors"
              :class="store.selectedTrackingId === t.trackingId
                ? 'border-primary bg-primary/5'
                : 'hover:bg-muted'"
              @click="selectTracking(t.trackingId)"
            >
              <div class="flex items-center gap-2">
                <span class="relative flex size-2.5">
                  <span class="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span class="relative inline-flex size-2.5 rounded-full bg-green-500" />
                </span>
                <span class="truncate font-medium">{{ t.distributor.name }}</span>
                <UiBadge :variant="'success' as any" class="ml-auto text-[10px]">Out for Delivery</UiBadge>
              </div>
              <p class="mt-1.5 truncate text-sm text-muted-foreground">
                Order <span class="font-medium text-foreground">{{ t.order.orderNumber }}</span>
              </p>
              <div class="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Last update: {{ ago(t.lastUpdatedAt) }}</span>
                <span v-if="t.currentLocation?.speed != null" class="tabular-nums">{{ t.currentLocation.speed.toFixed(1) }} km/h</span>
              </div>
              <NuxtLink
                :to="`/gps-tracking/${t.trackingId}`"
                class="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                @click.stop
              >
                <Navigation class="size-3.5" />
                View route history
              </NuxtLink>
            </button>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Map -->
      <UiCard class="overflow-hidden">
        <UiCardHeader class="pb-3">
          <UiCardTitle class="flex items-center gap-2">
            <MapIcon class="size-4" />
            Live Map
          </UiCardTitle>
          <UiCardDescription>
            OpenStreetMap · refreshes automatically every 20 seconds
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="p-0">
          <div class="relative h-[60vh] lg:h-[calc(100vh-15rem)] w-full">
            <ClientOnly>
              <DistributorTrackingMap
                :trackings="store.trackings"
                :selected-tracking-id="store.selectedTrackingId"
              />
              <template #fallback>
                <div class="flex h-full w-full items-center justify-center bg-muted/40">
                  <LoadingState />
                </div>
              </template>
            </ClientOnly>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>