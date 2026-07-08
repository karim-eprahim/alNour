<script setup lang="ts">
import { Package, Warehouse, AlertTriangle, History, ArrowUp, ArrowDown } from '@lucide/vue'
import { MOVEMENT_TYPES } from '@/modules/stock/type'
import PageHeader from '~/components/shared/PageHeader.vue'
import {useStockStore} from '@/modules/stock/store'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'INVENTORY', action: 'READ' },
})

const productsStore = useProductsStore()
const warehousesStore = useWarehousesStore()
const stockStore = useStockStore()

const loading = ref(true)

const totalProducts = computed(() => productsStore.total)
const totalWarehouses = computed(() => warehousesStore.warehouses.length)
const totalStockValue = computed(() => {
  let total = 0
  for (const s of stockStore.stocks) {
    const price = s.product ? 0 : 0
    total += Number(s.quantity)
  }
  return total
})
console.log("totalStock",stockStore)

const lowStockItems = computed(() =>
  stockStore.stocks.filter((s) => Number(s.quantity) <= 0)
)

const recentMovements = computed(() => stockStore.movements.slice(0, 10))

async function fetchAll() {
  loading.value = true
  try {
    await Promise.all([
      productsStore.fetchProducts(),
      warehousesStore.fetchWarehouses(),
      stockStore.fetchStocks(),
      stockStore.fetchMovements({ limit: 10 }),
    ])
  } finally {
    loading.value = false
  }
}

onMounted(fetchAll)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Inventory Dashboard" description="Overview of stock levels, alerts, and activity">
      <template #actions>
        <UiButton variant="outline" @click="fetchAll">
          <History class="size-4" /> Refresh
        </UiButton>
      </template>
    </PageHeader>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingState />
    </div>
    <template v-else>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Products</UiCardTitle>
            <Package class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ totalProducts }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Warehouses</UiCardTitle>
            <Warehouse class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ totalWarehouses }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Stock Qty</UiCardTitle>
            <ArrowUp class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ totalStockValue.toFixed(1) }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Low Stock Items</UiCardTitle>
            <AlertTriangle class="size-4 text-destructive" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold" :class="lowStockItems.length > 0 ? 'text-destructive' : ''">
              {{ lowStockItems.length }}
            </p>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Low Stock Alerts</UiCardTitle>
            <UiCardDescription>Items with zero or negative stock levels</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="lowStockItems.length === 0" class="py-6">
              <EmptyState title="All stock levels healthy" description="No low stock alerts at this time" />
            </div>
            <div v-else class="space-y-2">
              <div v-for="item in lowStockItems" :key="item.id" class="flex items-center justify-between rounded-lg border p-3">
                <div class="flex items-center gap-2">
                  <AlertTriangle class="size-4 text-destructive shrink-0" />
                  <div>
                    <NuxtLink :to="`/products/${item.productId}`" class="text-sm font-medium hover:underline">
                      {{ item.product?.name }}
                    </NuxtLink>
                    <p class="text-xs text-muted-foreground">{{ item.warehouse?.name }}</p>
                  </div>
                </div>
                <UiBadge variant="destructive" class="text-xs">{{ Number(item.quantity).toFixed(3) }}</UiBadge>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Recent Movements</UiCardTitle>
            <UiCardDescription>Latest inventory transactions</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="recentMovements.length === 0" class="py-6">
              <EmptyState title="No movements yet" description="Stock movements will appear here" />
            </div>
            <div v-else class="space-y-2">
              <div v-for="m in recentMovements" :key="m.id" class="flex items-center justify-between rounded-lg border p-3">
                <div class="flex items-center gap-2">
                  <div :class="['size-8 flex items-center justify-center rounded-lg', Number(m.quantity) > 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20']">
                    <ArrowUp v-if="Number(m.quantity) > 0" class="size-4 text-green-600" />
                    <ArrowDown v-else class="size-4 text-red-600" />
                  </div>
                  <div>
                    <NuxtLink :to="`/products/${m.productId}`" class="text-sm font-medium hover:underline">
                      {{ m.product?.name }}
                    </NuxtLink>
                    <p class="text-xs text-muted-foreground">{{ m.warehouse?.name }} · {{ MOVEMENT_TYPES.find((mt) => mt.value === m.type)?.label || m.type }}</p>
                  </div>
                </div>
                <span class="text-sm font-medium tabular-nums" :class="Number(m.quantity) > 0 ? 'text-green-600' : 'text-red-600'">
                  {{ Number(m.quantity) > 0 ? '+' : '' }}{{ Number(m.quantity).toFixed(3) }}
                </span>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </template>
  </div>
</template>
