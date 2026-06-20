<script setup lang="ts">
import { h } from 'vue'
import { Plus, Eye } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { SalesOrder } from '@/modules/sales/type'
import { NuxtLink, UiBadge, UiButton } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const salesStore = useSalesStore()
const customersStore = useCustomersStore()
const warehousesStore = useWarehousesStore()

const customerFilter = ref('__all__')
const statusFilter = ref('__all__')
const page = ref(1)
const limit = 20

function statusBadgeVariant(s: string) {
  const map: Record<string, string> = { PENDING: 'secondary', CONFIRMED: 'warning', COMPLETED: 'success', CANCELLED: 'destructive' }
  return map[s] || 'secondary'
}

const columns: ColumnDef<SalesOrder>[] = [
  {
    accessorKey: 'orderNumber',
    header: 'Order #',
    cell: ({ row }) => h(NuxtLink, { to: `/sales/${row.original.id}`, class: 'font-medium hover:underline' }, row.original.orderNumber),
  },
  {
    accessorKey: 'customer.name',
    header: 'Customer',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.customer?.name || '—'),
  },
  {
    accessorKey: 'warehouse.name',
    header: 'Warehouse',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, row.original.warehouse?.name || '—'),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(UiBadge, { variant: statusBadgeVariant(row.original.status) as any, class: 'text-xs' }, row.original.status),
  },
  {
    id: 'items',
    header: 'Items',
    cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.items ?? 0)),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalAmount).toFixed(2)),
  },
  {
    id: 'paid',
    header: 'Paid',
    cell: ({ row }) => {
      const paid = row.original.invoices?.reduce((s, inv) => s + Number(inv.paidAmount), 0) || 0
      return h('span', { class: 'tabular-nums block' }, paid.toFixed(2))
    },
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
    cell: ({ row }) => h(UiButton, { variant: 'ghost', size: 'icon-xs', onClick: () => navigateTo(`/sales/${row.original.id}`) }, () => h(Eye, { class: 'size-3.5' })),
  },
]

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
        <UiButton @click="navigateTo('/sales/new')"><Plus class="size-4" /> New Order</UiButton>
      </template>
    </PageHeader>

    <div class="flex flex-wrap gap-3">
      <UiSelect v-model="customerFilter">
        <UiSelectTrigger class="w-44"><UiSelectValue placeholder="All Customers" /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="__all__">All Customers</UiSelectItem>
          <UiSelectItem v-for="c in customersStore.customers" :key="c.id" :value="c.id">{{ c.name }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
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

    <AppTable
      :data="salesStore.orders"
      :columns="columns"
      :loading="salesStore.loading"
      :server-total="salesStore.total"
      :show-search="false"
      :show-column-toggle="false"
      search-placeholder="Search orders..."
    >
      <template #empty>
        <EmptyState title="No orders found" description="Create your first sales order" action="New Order" @action="navigateTo('/sales/new')" />
      </template>
    </AppTable>
  </div>
</template>
