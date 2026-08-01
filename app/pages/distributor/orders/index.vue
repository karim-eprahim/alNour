<script setup lang="ts">
import { getDistributorOrderColumns, type DistributorOrderActions } from '@/modules/distributor/components/orderColumns'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()

const statusFilter = ref('__all__')
const page = ref(1)
const limit = 10

const orderActions: DistributorOrderActions = {
  onView: (id) => navigateTo(`/distributor/orders/${id}`),
}

const columns = getDistributorOrderColumns(orderActions)

async function load() {
  await store.fetchOrders({
    status: statusFilter.value !== '__all__' ? statusFilter.value : undefined,
    page: page.value,
    limit,
  })
}

watch(statusFilter, () => { page.value = 1; load() })
watch(page, load)
onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Orders" description="Orders assigned to you">
      <template #actions>
        <UiSelect v-model="statusFilter">
          <UiSelectTrigger class="w-40"><UiSelectValue placeholder="All Status" /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="__all__">All Status</UiSelectItem>
            <UiSelectItem value="ASSIGNED">Assigned</UiSelectItem>
            <UiSelectItem value="ACCEPTED">Accepted</UiSelectItem>
            <UiSelectItem value="OUT_FOR_DELIVERY">Out for Delivery</UiSelectItem>
            <UiSelectItem value="DELIVERED">Delivered</UiSelectItem>
            <UiSelectItem value="COMPLETED">Completed</UiSelectItem>
            <UiSelectItem value="CANCELLED">Cancelled</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardContent>
        <AppTable
          :data="store.orders"
          :columns="columns"
          :loading="store.loading"
          :server-total="store.ordersTotal"
          :show-search="false"
          :show-column-toggle="false"
        >
          <template #empty>
            <EmptyState title="No orders found" description="Orders assigned to you will appear here" />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>
  </div>
</template>
