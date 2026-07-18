<script setup lang="ts">
import { FileText, Plus, Search } from '@lucide/vue'
import { fetchSuppliersLookupApi } from '@/modules/suppliers/api'
import { fetchWarehousesLookupApi } from '@/modules/warehouses/api'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'PURCHASES', action: 'READ' },
})

const purchasesStore = usePurchasesStore()
const suppliersStore = useSuppliersStore()
const warehousesStore = useWarehousesStore()

const search = ref('')
const supplierFilter = ref<string>('all')
const warehouseFilter = ref<string>('all')
const page = ref(1)

const debouncedSearch = ref('')
watch(search, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedSearch.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})

watch([debouncedSearch, supplierFilter, warehouseFilter, page], () => fetchData())

async function fetchData() {
  await purchasesStore.fetchPurchases({
    search: debouncedSearch.value || undefined,
    supplierId: supplierFilter.value === 'all' ? undefined : supplierFilter.value,
    warehouseId: warehouseFilter.value === 'all' ? undefined : warehouseFilter.value,
    page: page.value,
    limit: 20,
  })
}

const totalPages = computed(() => Math.ceil(purchasesStore.total / 20))

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Purchase Invoices" description="Manage supplier invoices and raw material purchases">
      <template #actions>
        <UiButton v-can="{ module: 'PURCHASES', action: 'CREATE' }" @click="navigateTo('/purchases/new')">
          <Plus class="size-4" /> New Invoice
        </UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <UiInput v-model="search" placeholder="Search by invoice # or supplier..." class="max-w-xs" />
          <LookupCombobox v-model="supplierFilter" :endpoint="fetchSuppliersLookupApi" placeholder="All suppliers" include-all class="w-44" />
          <LookupCombobox v-model="warehouseFilter" :endpoint="fetchWarehousesLookupApi" placeholder="All warehouses" include-all class="w-44" />
        </div>
      </UiCardHeader>
      <UiCardContent class="p-0">
        <div v-if="purchasesStore.loading && purchasesStore.invoices.length === 0" class="p-6">
          <LoadingState />
        </div>
        <div v-else-if="purchasesStore.invoices.length === 0" class="p-6">
          <EmptyState title="No purchase invoices" description="Create your first purchase invoice" action="New Invoice" @action="navigateTo('/purchases/new')" />
        </div>
        <UiTable v-else>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Invoice #</UiTableHead>
              <UiTableHead>Supplier</UiTableHead>
              <UiTableHead>Warehouse</UiTableHead>
              <UiTableHead>Date</UiTableHead>
              <UiTableHead class="text-right">Amount</UiTableHead>
              <UiTableHead class="text-right">Paid</UiTableHead>
              <UiTableHead class="text-right">Due</UiTableHead>
              <UiTableHead class="text-center">Items</UiTableHead>
              <UiTableHead class="w-20 text-right">Action</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="inv in purchasesStore.invoices" :key="inv.id">
              <UiTableCell>
                <NuxtLink :to="`/purchases/${inv.id}`" class="text-sm font-mono font-medium hover:underline">{{ inv.invoiceNumber }}</NuxtLink>
              </UiTableCell>
              <UiTableCell class="text-sm">
                <NuxtLink :to="`/suppliers/${inv.supplierId}`" class="hover:underline">{{ inv.supplier?.name }}</NuxtLink>
              </UiTableCell>
              <UiTableCell class="text-sm">{{ inv.warehouse?.name }}</UiTableCell>
              <UiTableCell class="text-xs text-muted-foreground">{{ new Date(inv.invoiceDate).toLocaleDateString() }}</UiTableCell>
              <UiTableCell class="text-right font-medium tabular-nums">{{ Number(inv.totalAmount).toFixed(2) }}</UiTableCell>
              <UiTableCell class="text-right font-medium tabular-nums text-green-600">{{ Number(inv.paidAmount).toFixed(2) }}</UiTableCell>
              <UiTableCell class="text-right font-medium tabular-nums" :class="Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? 'text-destructive' : ''">
                {{ (Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2) }}
              </UiTableCell>
              <UiTableCell class="text-center text-sm">{{ inv._count?.items ?? 0 }}</UiTableCell>
              <UiTableCell class="text-right">
                <UiButton variant="ghost" size="icon-sm" @click="navigateTo(`/purchases/${inv.id}`)">
                  <FileText class="size-4" />
                </UiButton>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
      <UiCardFooter v-if="purchasesStore.invoices.length > 0" class="border-t px-4 py-3">
        <div class="flex items-center justify-between w-full">
          <p class="text-xs text-muted-foreground">{{ purchasesStore.total }} invoice{{ purchasesStore.total !== 1 ? 's' : '' }}</p>
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
