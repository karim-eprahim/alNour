<script setup lang="ts">
import { Plus, Eye, ShoppingCart } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const salesStore = useSalesStore()
const customersStore = useCustomersStore()
const warehousesStore = useWarehousesStore()

const search = ref('')
const customerFilter = ref('__all__')
const statusFilter = ref('__all__')
const page = ref(1)
const limit = 20

const totalPages = computed(() => Math.ceil(salesStore.total / limit))

const statusBadge = (s: string) => {
  const map: Record<string, string> = { PENDING: 'secondary', CONFIRMED: 'warning', COMPLETED: 'success', CANCELLED: 'destructive' }
  return map[s] || 'secondary'
}

async function load() {
  await Promise.all([
    salesStore.fetchOrders({
      search: search.value || undefined,
      customerId: customerFilter.value !== '__all__' ? customerFilter.value : undefined,
      status: statusFilter.value !== '__all__' ? statusFilter.value : undefined,
      page: page.value,
      limit,
    }),
    customersStore.fetchCustomers({ limit: 100 }),
    warehousesStore.fetchWarehouses(),
  ])
}

let debounce: ReturnType<typeof setTimeout>
watch(search, () => {
  clearTimeout(debounce)
  debounce = setTimeout(() => { page.value = 1; load() }, 300)
})
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
      <UiInput v-model="search" placeholder="Search orders..." class="w-64" />
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

    <UiCard>
      <UiCardContent class="p-0">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Order #</UiTableHead>
              <UiTableHead>Customer</UiTableHead>
              <UiTableHead>Warehouse</UiTableHead>
              <UiTableHead>Status</UiTableHead>
              <UiTableHead class="text-right">Items</UiTableHead>
              <UiTableHead class="text-right">Total</UiTableHead>
              <UiTableHead class="text-right">Paid</UiTableHead>
              <UiTableHead>Date</UiTableHead>
              <UiTableHead class="w-16" />
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="o in salesStore.orders" :key="o.id">
              <UiTableCell>
                <NuxtLink :to="`/sales/${o.id}`" class="font-medium hover:underline">{{ o.orderNumber }}</NuxtLink>
              </UiTableCell>
              <UiTableCell>{{ o.customer?.name }}</UiTableCell>
              <UiTableCell class="text-muted-foreground">{{ o.warehouse?.name }}</UiTableCell>
              <UiTableCell><UiBadge :variant="statusBadge(o.status) as any">{{ o.status }}</UiBadge></UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ o._count?.items || 0 }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums font-medium">{{ Number(o.totalAmount).toFixed(2) }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ o.invoices?.reduce((s, inv) => s + Number(inv.paidAmount), 0).toFixed(2) || '0.00' }}</UiTableCell>
              <UiTableCell class="text-sm text-muted-foreground">{{ new Date(o.createdAt).toLocaleDateString() }}</UiTableCell>
              <UiTableCell>
                <UiButton variant="ghost" size="icon-xs" @click="navigateTo(`/sales/${o.id}`)"><Eye class="size-3.5" /></UiButton>
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-if="salesStore.orders.length === 0">
              <UiTableCell colspan="9">
                <EmptyState title="No orders found" description="Create your first sales order" action="New Order" @action="navigateTo('/sales/new')" />
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
      <UiCardFooter v-if="totalPages > 1" class="border-t px-4 py-3">
        <div class="flex items-center justify-between w-full">
          <p class="text-sm text-muted-foreground">Page {{ page }} of {{ totalPages }}</p>
          <div class="flex gap-2">
            <UiButton variant="outline" size="sm" :disabled="page <= 1" @click="page--">Previous</UiButton>
            <UiButton variant="outline" size="sm" :disabled="page >= totalPages" @click="page++">Next</UiButton>
          </div>
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
