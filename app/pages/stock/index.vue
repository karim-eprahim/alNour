<script setup lang="ts">
import { h } from 'vue'
import { Warehouse, Package } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { StockEntry } from '@/modules/stock/type'
import { fetchWarehousesLookupApi } from '@/modules/warehouses/api'
import { NuxtLink, UiBadge } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'INVENTORY', action: 'READ' },
})

const stockStore = useStockStore()
const warehousesStore = useWarehousesStore()

const warehouseFilter = ref<string>('all')

watch(warehouseFilter, () => fetchData())

async function fetchData() {
  await stockStore.fetchStocks({
    warehouseId: warehouseFilter.value === 'all' ? undefined : warehouseFilter.value,
  })
}

const columns: ColumnDef<StockEntry>[] = [
  {
    accessorKey: 'product.name',
    header: 'Product',
    cell: ({ row }) => h('div', { class: 'flex items-center gap-2' }, [
      h('div', { class: 'size-8 flex items-center justify-center rounded bg-muted overflow-hidden' }, [
        row.original.product?.image
          ? h('img', { src: row.original.product.image, alt: '', class: 'size-full object-cover' })
          : h(Package, { class: 'size-4 text-muted-foreground' }),
      ]),
      h(NuxtLink, { to: `/products/${row.original.productId}`, class: 'text-sm font-medium hover:underline' }, row.original.product?.name),
    ]),
  },
  {
    accessorKey: 'product.sku',
    header: 'SKU',
    cell: ({ row }) => h('span', { class: 'text-xs font-mono text-muted-foreground' }, row.original.product?.sku),
  },
  {
    accessorKey: 'product.type',
    header: 'Type',
    cell: ({ row }) => h(UiBadge, { variant: 'secondary', class: 'text-xs' }, row.original.product?.type?.replace('_', ' ') || ''),
  },
  {
    accessorKey: 'warehouse.name',
    header: 'Warehouse',
    cell: ({ row }) => h('div', { class: 'flex items-center gap-1.5 text-sm' }, [
      h(Warehouse, { class: 'size-3.5 text-muted-foreground' }),
      row.original.warehouse?.name,
    ]),
  },
  {
    id: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => h('span', { class: 'font-medium tabular-nums' }, Number(row.original.quantity).toFixed(3)),
  },
]

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Stock Overview" description="Current inventory levels across all warehouses" />

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <LookupCombobox v-model="warehouseFilter" :endpoint="fetchWarehousesLookupApi" placeholder="All warehouses" include-all class="w-44" />
        </div>
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="stockStore.stocks"
          :columns="columns"
          :loading="stockStore.loading"
          :server-total="stockStore.totalStocks"
          :show-search="false"
          :show-column-toggle="false"
        >
          <template #empty>
            <EmptyState title="No stock records" description="Stock entries will appear once products are added to warehouses" />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>
  </div>
</template>
