<script setup lang="ts">
import { Package, Plus, Factory, Eye, Trash2 } from '@lucide/vue'
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
const search = ref('')
const page = ref(1)
const limit = 20

const totalPages = computed(() => Math.ceil(productionStore.total / limit))

const filteredBatches = computed(() => {
  let list = productionStore.batches
  if (warehouseFilter.value !== '__all__') {
    list = list.filter((b) => b.warehouseId === warehouseFilter.value)
  }
  if (statusFilter.value !== '__all__') {
    list = list.filter((b) => b.status === statusFilter.value)
  }
  return list
})

async function load() {
  await Promise.all([
    productionStore.fetchBatches({ page: page.value, limit }),
    warehousesStore.fetchWarehouses(),
  ])
}

async function remove(id: string) {
  if (!confirm('Delete this production batch?')) return
  try {
    await productionStore.deleteBatch(id)
    toast.success('Batch deleted')
  } catch {
    toast.error('Failed to delete batch')
  }
}

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    PENDING: 'secondary',
    PROCESSING: 'warning',
    COMPLETED: 'success',
    CANCELLED: 'destructive',
  }
  return map[status] || 'secondary'
}

onMounted(load)

watch([warehouseFilter, statusFilter], () => { page.value = 1 })
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
      <UiInput v-model="search" placeholder="Search batches..." class="w-64" />
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

    <UiCard>
      <UiCardContent class="p-0">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Batch #</UiTableHead>
              <UiTableHead>Warehouse</UiTableHead>
              <UiTableHead>Status</UiTableHead>
              <UiTableHead class="text-right">Inputs</UiTableHead>
              <UiTableHead class="text-right">Outputs</UiTableHead>
              <UiTableHead class="text-right">Total Cost</UiTableHead>
              <UiTableHead>Date</UiTableHead>
              <UiTableHead class="w-20" />
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="b in filteredBatches" :key="b.id">
              <UiTableCell>
                <NuxtLink :to="`/production/${b.id}`" class="font-medium hover:underline">
                  {{ b.batchNumber }}
                </NuxtLink>
              </UiTableCell>
              <UiTableCell>{{ b.warehouse?.name }}</UiTableCell>
              <UiTableCell>
                <UiBadge :variant="statusBadge(b.status) as any">{{ b.status }}</UiBadge>
              </UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ b._count?.consumptions || 0 }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ b._count?.outputs || 0 }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ Number(b.totalBatchCost).toFixed(2) }}</UiTableCell>
              <UiTableCell class="text-sm text-muted-foreground">{{ new Date(b.createdAt).toLocaleDateString() }}</UiTableCell>
              <UiTableCell>
                <div class="flex gap-1">
                  <UiButton variant="ghost" size="icon-xs" @click="navigateTo(`/production/${b.id}`)">
                    <Eye class="size-3.5" />
                  </UiButton>
                  <UiButton variant="ghost" size="icon-xs" class="text-destructive" @click="remove(b.id)">
                    <Trash2 class="size-3.5" />
                  </UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-if="filteredBatches.length === 0">
              <UiTableCell colspan="8">
                <EmptyState title="No batches found" description="Create your first production batch" action="New Batch" @action="navigateTo('/production/new')" />
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
      <UiCardFooter v-if="totalPages > 1" class="border-t px-4 py-3">
        <div class="flex items-center justify-between w-full">
          <p class="text-sm text-muted-foreground">Page {{ page }} of {{ totalPages }} ({{ productionStore.total }} total)</p>
          <div class="flex gap-2">
            <UiButton variant="outline" size="sm" :disabled="page <= 1" @click="page--">Previous</UiButton>
            <UiButton variant="outline" size="sm" :disabled="page >= totalPages" @click="page++">Next</UiButton>
          </div>
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
