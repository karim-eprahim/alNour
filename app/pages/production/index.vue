<script setup lang="ts">
import { Plus } from '@lucide/vue'
import type { BatchActions } from '@/modules/production/components/column'
import { getBatchColumns } from '@/modules/production/components/column'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'PRODUCTION', action: 'READ' },
})

const productionStore = useProductionStore()
const warehousesStore = useWarehousesStore()

const warehouseFilter = ref('__all__')
const statusFilter = ref('__all__')
const page = ref(1)
const limit = 20

const batchActions: BatchActions = {
  onView: (id) => navigateTo(`/production/${id}`),
  onDelete: async (id) => {
    if (!confirm('Delete this production batch?')) return
    try {
      await productionStore.deleteBatch(id)
      toast.success('Batch deleted')
    } catch { toast.error('Failed to delete batch') }
  },
}

const columns = getBatchColumns(batchActions)

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
        <UiButton v-can="{ module: 'PRODUCTION', action: 'CREATE' }" @click="navigateTo('/production/new')">
          <Plus class="size-4" /> New Batch
        </UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <LookupCombobox v-model="warehouseFilter" :endpoint="fetchWarehousesLookupApi" placeholder="All Warehouses" include-all all-value="__all__" all-label="All Warehouses" class="w-44" />
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
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="productionStore.batches"
          :columns="columns"
          :loading="productionStore.loading"
          :server-total="productionStore.total"
          :show-search="false"
          :show-column-toggle="false"
        >
          <template #empty>
            <EmptyState title="No batches found" description="Create your first production batch" action="New Batch" @action="navigateTo('/production/new')" />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>
  </div>
</template>
