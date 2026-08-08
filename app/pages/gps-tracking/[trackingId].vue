<script setup lang="ts">
import { ArrowLeft, Map as MapIcon, Navigation } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { fetchTrackingLocationsApi } from '@/modules/tracking/api'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: {
    module: 'GPS',
    action: 'READ',
  },
})

const route = useRoute()
const trackingId = route.params.trackingId as string

const loading = ref(true)
const error = ref<string | null>(null)
const data = ref<Awaited<ReturnType<typeof fetchTrackingLocationsApi>> | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    data.value = await fetchTrackingLocationsApi(trackingId)
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Failed to load tracking history'
  } finally {
    loading.value = false
  }
}

const routeCustomer = computed(() => {
  const c = data.value?.tracking.customer
  if (!c || c.latitude == null || c.longitude == null) return null
  return { name: c.name, latitude: c.latitude, longitude: c.longitude }
})

function formatDuration(startedAt: string, endedAt?: string | null) {
  const end = endedAt ? new Date(endedAt).getTime() : Date.now()
  const ms = Math.max(0, end - new Date(startedAt).getTime())
  const totalMin = Math.floor(ms / 60000)
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/gps-tracking')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader
        title="Route History"
        :description="data ? `${data.tracking.distributor.name} · ${data.tracking.order.orderNumber}` : 'Delivery GPS history'"
      />
    </div>

    <div v-if="loading" class="flex justify-center py-16">
      <LoadingState />
    </div>

    <template v-else-if="error">
      <UiCard>
        <UiCardContent class="py-12">
          <EmptyState title="Unable to load history" :description="error" />
        </UiCardContent>
      </UiCard>
    </template>

    <template v-else-if="data">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiCard>
          <UiCardHeader class="pb-2">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Status</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <UiBadge :variant="(data.tracking.status === 'ACTIVE' ? 'default' : data.tracking.status === 'COMPLETED' ? 'success' : 'destructive') as any">
              {{ data.tracking.status }}
            </UiBadge>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">GPS Points</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold tabular-nums">{{ data.total }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Duration</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold tabular-nums">{{ formatDuration(data.tracking.startedAt, data.tracking.endedAt) }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Customer</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="truncate font-medium">{{ data.tracking.customer?.name || '—' }}</p>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard>
        <UiCardContent class="p-0">
          <div class="h-[70vh] w-full">
            <ClientOnly>
              <DistributorTrackingMap
                :route="data.locations"
                :route-customer="routeCustomer"
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
    </template>
  </div>
</template>