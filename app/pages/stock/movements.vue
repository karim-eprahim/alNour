<script setup lang="ts">
import { History, ArrowUp, ArrowDown, Filter } from '@lucide/vue'
import { MOVEMENT_TYPES } from '@/modules/stock/type'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'INVENTORY', action: 'READ' },
})

const stockStore = useStockStore()
const warehousesStore = useWarehousesStore()
const productsStore = useProductsStore()

const typeFilter = ref<string>('all')
const warehouseFilter = ref<string>('all')
const productSearch = ref('')
const page = ref(1)
const limit = 30

watch([typeFilter, warehouseFilter, page], () => fetchData())
const debouncedSearch = ref('')
watch(productSearch, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedSearch.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})
watch(debouncedSearch, () => { page.value = 1; fetchData() })

async function fetchData() {
  await stockStore.fetchMovements({
    type: typeFilter.value === 'all' ? undefined : typeFilter.value,
    warehouseId: warehouseFilter.value === 'all' ? undefined : warehouseFilter.value,
    page: page.value,
    limit,
  })
}

const totalPages = computed(() => Math.ceil(stockStore.totalMovements / limit))

onMounted(async () => {
  await Promise.all([
    fetchData(),
    warehousesStore.fetchWarehouses(),
    productsStore.fetchProducts(),
  ])
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Stock Movements" description="Complete inventory transaction log">
      <template #actions>
        <UiButton variant="outline" @click="fetchData">
          <History class="size-4" /> Refresh
        </UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <UiSelect v-model="typeFilter">
            <UiSelectTrigger class="w-40">
              <UiSelectValue placeholder="All types" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="all">All types</UiSelectItem>
              <UiSelectItem v-for="mt in MOVEMENT_TYPES" :key="mt.value" :value="mt.value">{{ mt.label }}</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
          <LookupCombobox v-model="warehouseFilter" :items="warehousesStore.warehouses" placeholder="All warehouses" include-all class="w-44" />
        </div>
      </UiCardHeader>
      <UiCardContent class="p-0">
        <div v-if="stockStore.loading && stockStore.movements.length === 0" class="p-6">
          <LoadingState />
        </div>
        <div v-else-if="stockStore.movements.length === 0" class="p-6">
          <EmptyState title="No movements found" description="Try adjusting your filters" />
        </div>
        <UiTable v-else>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Date & Time</UiTableHead>
              <UiTableHead>Product</UiTableHead>
              <UiTableHead>Warehouse</UiTableHead>
              <UiTableHead>Type</UiTableHead>
              <UiTableHead class="text-right">Quantity</UiTableHead>
              <UiTableHead>Reference</UiTableHead>
              <UiTableHead>By</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="m in stockStore.movements" :key="m.id">
              <UiTableCell class="text-xs text-muted-foreground whitespace-nowrap">
                {{ new Date(m.createdAt).toLocaleString() }}
              </UiTableCell>
              <UiTableCell>
                <NuxtLink :to="`/products/${m.productId}`" class="text-sm font-medium hover:underline">
                  {{ m.product?.name }}
                </NuxtLink>
                <p class="text-xs text-muted-foreground font-mono">{{ m.product?.sku }}</p>
              </UiTableCell>
              <UiTableCell class="text-sm">{{ m.warehouse?.name }}</UiTableCell>
              <UiTableCell>
                <UiBadge :variant="Number(m.quantity) > 0 ? 'default' : 'destructive'" class="text-xs">
                  {{ MOVEMENT_TYPES.find((mt) => mt.value === m.type)?.label || m.type }}
                </UiBadge>
              </UiTableCell>
              <UiTableCell class="text-right font-medium tabular-nums" :class="Number(m.quantity) > 0 ? 'text-green-600' : 'text-red-600'">
                <div class="flex items-center justify-end gap-1">
                  <ArrowUp v-if="Number(m.quantity) > 0" class="size-3" />
                  <ArrowDown v-else class="size-3" />
                  {{ Number(m.quantity) > 0 ? '+' : '' }}{{ Number(m.quantity).toFixed(3) }}
                </div>
              </UiTableCell>
              <UiTableCell class="text-xs text-muted-foreground font-mono">{{ m.referenceId ? m.referenceId.slice(0, 8) + '...' : '—' }}</UiTableCell>
              <UiTableCell class="text-xs text-muted-foreground">{{ m.createdBy?.name }}</UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
      <UiCardFooter v-if="stockStore.movements.length > 0" class="border-t px-4 py-3">
        <div class="flex items-center justify-between w-full">
          <p class="text-xs text-muted-foreground">{{ stockStore.totalMovements }} movement{{ stockStore.totalMovements !== 1 ? 's' : '' }}</p>
          <div class="flex items-center gap-2">
            <UiButton variant="outline" size="sm" :disabled="page <= 1" @click="page--">Previous</UiButton>
            <span class="text-xs text-muted-foreground">Page {{ page }} of {{ totalPages }}</span>
            <UiButton variant="outline" size="sm" :disabled="page >= totalPages" @click="page++">Next</UiButton>
          </div>
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
