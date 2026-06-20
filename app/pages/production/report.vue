<script setup lang="ts">
import { h } from 'vue'
import { Factory, Package, Scale, TrendingUp, AlertTriangle, DollarSign } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ProductionBatch } from '@/modules/production/type'
import { NuxtLink } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const productionStore = useProductionStore()
const warehousesStore = useWarehousesStore()

const warehouseFilter = ref('__all__')
const startDate = ref('')
const endDate = ref('')

const summary = computed(() => productionStore.reportSummary)

const batchColumns: ColumnDef<ProductionBatch>[] = [
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
    id: 'inputs',
    header: 'Inputs',
    cell: ({ row }) => {
      const total = row.original.consumptions?.reduce((s, c) => s + Number(c.quantity), 0) || 0
      return h('span', { class: 'tabular-nums block' }, total.toFixed(3))
    },
  },
  {
    id: 'output',
    header: 'Output',
    cell: ({ row }) => {
      const total = row.original.outputs?.reduce((s, o) => s + Number(o.quantity), 0) || 0
      return h('span', { class: 'tabular-nums block' }, total.toFixed(3))
    },
  },
  {
    id: 'waste',
    header: 'Waste',
    cell: ({ row }) => {
      const total = row.original.outputs?.reduce((s, o) => s + Number(o.waste), 0) || 0
      return h('span', { class: 'tabular-nums text-destructive block' }, total.toFixed(3))
    },
  },
  {
    id: 'efficiency',
    header: 'Efficiency',
    cell: ({ row }) => {
      const out = row.original.outputs?.reduce((s, o) => s + Number(o.quantity), 0) || 0
      const waste = row.original.outputs?.reduce((s, o) => s + Number(o.waste), 0) || 0
      const total = out + waste
      const pct = total > 0 ? (out / total) * 100 : 0
      return h('span', { class: 'tabular-nums block' }, `${pct.toFixed(1)}%`)
    },
  },
  {
    accessorKey: 'totalBatchCost',
    header: 'Cost',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalBatchCost).toFixed(2)),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleDateString()),
  },
]

async function load() {
  await Promise.all([
    warehousesStore.fetchWarehouses(),
    productionStore.fetchReport({
      warehouseId: warehouseFilter.value !== '__all__' ? warehouseFilter.value : undefined,
      startDate: startDate.value || undefined,
      endDate: endDate.value || undefined,
    }),
  ])
}

watch([warehouseFilter, startDate, endDate], load)

const wasteColor = (pct: number) => {
  if (pct <= 10) return 'text-green-600'
  if (pct <= 20) return 'text-yellow-600'
  return 'text-red-600'
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Production Reports" description="Efficiency and output analytics">
      <template #actions>
        <UiButton variant="outline" @click="load">
          <TrendingUp class="size-4" /> Refresh
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
      <div class="flex items-center gap-2">
        <UiLabel class="text-sm sr-only">From</UiLabel>
        <UiInput v-model="startDate" type="date" class="w-40" />
        <span class="text-muted-foreground">—</span>
        <UiLabel class="text-sm sr-only">To</UiLabel>
        <UiInput v-model="endDate" type="date" class="w-40" />
      </div>
    </div>

    <template v-if="summary">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Batches</UiCardTitle>
            <Factory class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ summary.totalBatches }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Output</UiCardTitle>
            <Package class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ summary.totalOutput.toFixed(3) }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Waste %</UiCardTitle>
            <AlertTriangle class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold" :class="wasteColor(summary.wastePercentage)">
              {{ summary.wastePercentage.toFixed(1) }}%
            </p>
            <p class="text-xs text-muted-foreground">{{ summary.totalWaste.toFixed(3) }} units wasted</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Avg Cost / Unit</UiCardTitle>
            <DollarSign class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ summary.averageCostPerUnit.toFixed(2) }}</p>
            <p class="text-xs text-muted-foreground">Total cost: {{ summary.totalCost.toFixed(2) }}</p>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Consumption vs Output</UiCardTitle>
            <UiCardDescription>Raw materials used vs finished goods produced</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-muted-foreground">Raw Materials Consumed</span>
                  <span class="font-medium tabular-nums">{{ summary.totalConsumption.toFixed(3) }}</span>
                </div>
                <div class="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div class="h-full bg-amber-500 rounded-full" :style="{ width: '100%' }" />
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-muted-foreground">Finished Output</span>
                  <span class="font-medium tabular-nums">{{ summary.totalOutput.toFixed(3) }}</span>
                </div>
                <div class="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div class="h-full bg-green-500 rounded-full" :style="{ width: summary.totalConsumption > 0 ? (summary.totalOutput / summary.totalConsumption) * 100 + '%' : '0%' }" />
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-muted-foreground">Waste</span>
                  <span class="font-medium tabular-nums text-destructive">{{ summary.totalWaste.toFixed(3) }}</span>
                </div>
                <div class="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div class="h-full bg-red-500 rounded-full" :style="{ width: summary.totalConsumption > 0 ? (summary.totalWaste / summary.totalConsumption) * 100 + '%' : '0%' }" />
                </div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Cost Breakdown</UiCardTitle>
            <UiCardDescription>Financial summary across all batches</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div class="space-y-4">
              <div class="flex items-center justify-between rounded-lg border p-3">
                <div class="flex items-center gap-2">
                  <DollarSign class="size-4 text-muted-foreground" />
                  <span class="text-sm">Total Production Cost</span>
                </div>
                <span class="font-bold text-lg tabular-nums">{{ summary.totalCost.toFixed(2) }}</span>
              </div>
              <div class="flex items-center justify-between rounded-lg border p-3">
                <div class="flex items-center gap-2">
                  <Scale class="size-4 text-muted-foreground" />
                  <span class="text-sm">Avg Cost Per Unit</span>
                </div>
                <span class="font-bold text-lg tabular-nums">{{ summary.averageCostPerUnit.toFixed(2) }}</span>
              </div>
              <div class="flex items-center justify-between rounded-lg border p-3">
                <div class="flex items-center gap-2">
                  <Package class="size-4 text-muted-foreground" />
                  <span class="text-sm">Total Batches</span>
                </div>
                <span class="font-bold text-lg tabular-nums">{{ summary.totalBatches }}</span>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Batch History</UiCardTitle>
          <UiCardDescription>All completed batches in this period</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="p-0">
          <AppTable
            :data="productionStore.reportBatches"
            :columns="batchColumns"
            :show-search="false"
            :show-column-toggle="false"
            :show-pagination="false"
          >
            <template #empty>
              <EmptyState title="No batches found" description="Complete some production batches to see reports" />
            </template>
          </AppTable>
        </UiCardContent>
      </UiCard>
    </template>
  </div>
</template>
