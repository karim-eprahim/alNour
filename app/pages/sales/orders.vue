<script setup lang="ts">
import { Plus } from '@lucide/vue'
import type { OrderActions } from '@/modules/sales/components/column'
import { getOrderColumns } from '@/modules/sales/components/column'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'SALES', action: 'READ' },
})

const salesStore = useSalesStore()
const customersStore = useCustomersStore()
const warehousesStore = useWarehousesStore()

const customerFilter = ref('__all__')
const statusFilter = ref('__all__')
const page = ref(1)
const limit = 20

const orderActions: OrderActions = {
  onView: (id) => navigateTo(`/sales/${id}`),
}

const columns = getOrderColumns(orderActions)

async function load() {
  await Promise.all([
    salesStore.fetchOrders({
      customerId: customerFilter.value !== '__all__' ? customerFilter.value : undefined,
      status: statusFilter.value !== '__all__' ? statusFilter.value : undefined,
      page: page.value,
      limit,
    }),
    customersStore.fetchCustomers({ limit: 100 }),
    warehousesStore.fetchWarehouses(),
  ])
}

watch([customerFilter, statusFilter], () => { page.value = 1; load() })
watch(page, load)
onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Sales Orders" description="Manage customer orders">
      <template #actions>
        <UiButton v-can="{ module: 'SALES', action: 'CREATE' }" @click="navigateTo('/sales/new')"><Plus class="size-4" /> New Order</UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <LookupCombobox v-model="customerFilter" :items="customersStore.customers" placeholder="All Customers" include-all all-value="__all__" all-label="All Customers" class="w-44" />
          <UiSelect v-model="statusFilter">
            <UiSelectTrigger class="w-36"><UiSelectValue placeholder="All Status" /></UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="__all__">All Status</UiSelectItem>
              <UiSelectItem value="PENDING">Pending</UiSelectItem>
              <UiSelectItem value="CONFIRMED">Confirmed</UiSelectItem>
              <UiSelectItem value="COMPLETED">Completed</UiSelectItem>
              <UiSelectItem value="CANCELLED">Cancelled</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="salesStore.orders"
          :columns="columns"
          :loading="salesStore.loading"
          :server-total="salesStore.total"
          :show-search="false"
          :show-column-toggle="false"
        >
          <template #empty>
            <EmptyState title="No orders found" description="Create your first sales order" action="New Order" @action="navigateTo('/sales/new')" />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>
  </div>
</template>
