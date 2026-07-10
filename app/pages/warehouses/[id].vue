<script setup lang="ts">
import { ArrowLeft, Warehouse, MapPin, Package } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'WAREHOUSES', action: 'READ' },
})

const route = useRoute()
const warehouseId = computed(() => route.params.id as string)

const warehousesStore = useWarehousesStore()
const stockStore = useStockStore()

const activeTab = ref('stock')

async function fetchWarehouse() {
  await warehousesStore.fetchWarehouse(warehouseId.value)
  await stockStore.fetchMovements({ warehouseId: warehouseId.value, limit: 20 })
}

const totalItems = computed(() => warehousesStore.currentWarehouse?.stocks?.length ?? 0)
const totalQuantity = computed(() => {
  if (!warehousesStore.currentWarehouse?.stocks) return 0
  return warehousesStore.currentWarehouse.stocks.reduce((sum: number, s: any) => sum + Number(s.quantity), 0)
})

onMounted(fetchWarehouse)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/warehouses')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <div class="flex items-center gap-3">
        <div class="size-9 flex items-center justify-center rounded-lg bg-muted">
          <Warehouse class="size-4 text-muted-foreground" />
        </div>
        <div>
          <h1 class="text-lg font-semibold">{{ warehousesStore.currentWarehouse?.name || 'Loading...' }}</h1>
          <p v-if="warehousesStore.currentWarehouse?.location" class="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin class="size-3" />
            {{ warehousesStore.currentWarehouse.location }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Products</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ totalItems }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Quantity</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ totalQuantity.toFixed(3) }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Stock Keeping Units</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ totalItems }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <UiTabs v-model="activeTab" class="space-y-4">
      <UiTabsList>
        <UiTabsTrigger value="stock">Stock</UiTabsTrigger>
        <UiTabsTrigger value="movements">Recent Movements</UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="stock">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Warehouse Stock</UiCardTitle>
            <UiCardDescription>Current inventory in this location</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <div v-if="!warehousesStore.currentWarehouse?.stocks?.length" class="p-6">
              <EmptyState title="Empty warehouse" description="No products have been added to this warehouse yet" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Product</UiTableHead>
                  <UiTableHead>SKU</UiTableHead>
                  <UiTableHead>Type</UiTableHead>
                  <UiTableHead class="text-right">Quantity</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="stock in warehousesStore.currentWarehouse?.stocks" :key="stock.id">
                  <UiTableCell>
                    <div class="flex items-center gap-2">
                      <div class="size-8 flex items-center justify-center rounded bg-muted overflow-hidden">
                        <img v-if="stock.product.image" :src="stock.product.image" alt="" class="size-full object-cover" />
                        <Package v-else class="size-4 text-muted-foreground" />
                      </div>
                      <NuxtLink :to="`/products/${stock.product.id}`" class="text-sm font-medium hover:underline">
                        {{ stock.product.name }}
                      </NuxtLink>
                    </div>
                  </UiTableCell>
                  <UiTableCell class="text-xs font-mono text-muted-foreground">{{ stock.product.sku }}</UiTableCell>
                  <UiTableCell>
                    <UiBadge variant="secondary" class="text-xs">{{ stock.product.type.replace('_', ' ') }}</UiBadge>
                  </UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums">
                    {{ Number(stock.quantity).toFixed(3) }}
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="movements">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Recent Movements</UiCardTitle>
            <UiCardDescription>Latest stock transactions in this warehouse</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <div v-if="stockStore.movements.length === 0" class="p-6">
              <EmptyState title="No movements" description="Stock movements will appear here" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Date</UiTableHead>
                  <UiTableHead>Product</UiTableHead>
                  <UiTableHead>Type</UiTableHead>
                  <UiTableHead class="text-right">Qty</UiTableHead>
                  <UiTableHead>By</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="m in stockStore.movements" :key="m.id">
                  <UiTableCell class="text-xs text-muted-foreground">{{ new Date(m.createdAt).toLocaleString() }}</UiTableCell>
                  <UiTableCell class="text-sm">
                    <NuxtLink :to="`/products/${m.productId}`" class="hover:underline">{{ m.product?.name }}</NuxtLink>
                  </UiTableCell>
                  <UiTableCell>
                    <UiBadge :variant="Number(m.quantity) > 0 ? 'default' : 'destructive'" class="text-xs">
                      {{ m.type.replace('_', ' ') }}
                    </UiBadge>
                  </UiTableCell>
                  <UiTableCell class="text-right font-medium" :class="Number(m.quantity) > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ Number(m.quantity) > 0 ? '+' : '' }}{{ Number(m.quantity).toFixed(3) }}
                  </UiTableCell>
                  <UiTableCell class="text-xs text-muted-foreground">{{ m.createdBy?.name }}</UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
