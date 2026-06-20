<script setup lang="ts">
import { h } from 'vue'
import { Plus, Factory, Eye, Trash2, MoreHorizontal } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ProductionBatch } from '@/modules/production/type'
import { NuxtLink, UiBadge, UiButton, UiDropdownMenu, UiDropdownMenuTrigger, UiDropdownMenuContent, UiDropdownMenuItem, UiDropdownMenuSeparator } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const productionStore = useProductionStore()
const warehousesStore = useWarehousesStore()

const warehouseFilter = ref('__all__')
const statusFilter = ref('__all__')
const page = ref(1)
const limit = 20

function statusBadgeVariant(s: string) {
  const map: Record<string, string> = { PENDING: 'secondary', PROCESSING: 'warning', COMPLETED: 'success', CANCELLED: 'destructive' }
  return map[s] || 'secondary'
}

const columns: ColumnDef<ProductionBatch>[] = [
  {
    accessorKey: 'batchNumber',
    header: 'Batch #',
    cell: ({ row }) => h(NuxtLink, { to: `/production/${row.original.id}`, class: 'font-medium hover:underline' }, row.original.batchNumber),
  },
  {
    accessorKey: 'warehouse.name',
    header: 'Warehouse',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.warehouse?.name || '—'),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(UiBadge, { variant: statusBadgeVariant(row.original.status) as any, class: 'text-xs' }, row.original.status),
  },
  {
    id: 'inputs',
    header: 'Inputs',
    cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.consumptions ?? 0)),
  },
  {
    id: 'outputs',
    header: 'Outputs',
    cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.outputs ?? 0)),
  },
  {
    accessorKey: 'totalBatchCost',
    header: 'Total Cost',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalBatchCost).toFixed(2)),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleDateString()),
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    cell: ({ row }) => {
      const b = row.original
      return h('div', { class: 'flex gap-1' }, [
        h(UiButton, { variant: 'ghost', size: 'icon-xs', onClick: () => navigateTo(`/production/${b.id}`) }, () => h(Eye, { class: 'size-3.5' })),
        h(UiButton, { variant: 'ghost', size: 'icon-xs', class: 'text-destructive', onClick: () => remove(b.id) }, () => h(Trash2, { class: 'size-3.5' })),
      ])
    },
  },
]

async function remove(id: string) {
  if (!confirm('Delete this production batch?')) return
  try {
    await productionStore.deleteBatch(id)
    toast.success('Batch deleted')
  } catch {
    toast.error('Failed to delete batch')
  }
}

async function load() {
  await Promise.all([
    productionStore.fetchBatches({ page: page.value, limit }),
    warehousesStore.fetchWarehouses(),
  ])
}

onMounted(load)
watch([warehouseFilter, statusFilter], () => { page.value = 1; load() })
watch(page, load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Production Batches" description="Manage production batches and track output">
      <template #actions>
        <UiButton @click="navigateTo('/production/new')">
          <Plus class="size-4" /> New Batch
        </UiButton>
      </template>
    </PageHeader>

    <div class="flex flex-wrap gap-3">
      <UiSelect v-model="warehouseFilter">
        <UiSelectTrigger class="w-44"><UiSelectValue placeholder="All Warehouses" /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="__all__">All Warehouses</UiSelectItem>
          <UiSelectItem v-for="w in warehousesStore.warehouses" :key="w.id" :value="w.id">{{ w.name }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <UiSelect v-model="statusFilter">
        <UiSelectTrigger class="w-40"><UiSelectValue placeholder="All Status" /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="__all__">All Status</UiSelectItem>
          <UiSelectItem value="PENDING">Pending</UiSelectItem>
          <UiSelectItem value="PROCESSING">Processing</UiSelectItem>
          <UiSelectItem value="COMPLETED">Completed</UiSelectItem>
          <UiSelectItem value="CANCELLED">Cancelled</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <AppTable
      :data="productionStore.batches"
      :columns="columns"
      :loading="productionStore.loading"
      :server-total="productionStore.total"
      :show-search="false"
      :show-column-toggle="false"
      :show-pagination="false"
      search-placeholder="Search batches..."
    >
      <template #empty>
        <EmptyState title="No batches found" description="Create your first production batch" action="New Batch" @action="navigateTo('/production/new')" />
      </template>
    </AppTable>
  </div>
</template>
