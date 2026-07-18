<script setup lang="ts">
import { FileText, TrendingUp, DollarSign, ArrowUpRight, Calendar } from '@lucide/vue'
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

const supplierFilter = ref<string>('all')
const warehouseFilter = ref<string>('all')
const startDate = ref('')
const endDate = ref('')

const debouncedStart = ref('')
const debouncedEnd = ref('')
watch(startDate, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedStart.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})
watch(endDate, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedEnd.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})

watch([supplierFilter, warehouseFilter, debouncedStart, debouncedEnd], () => fetchReport())

async function fetchReport() {
  await purchasesStore.fetchReport({
    supplierId: supplierFilter.value === 'all' ? undefined : supplierFilter.value,
    warehouseId: warehouseFilter.value === 'all' ? undefined : warehouseFilter.value,
    startDate: debouncedStart.value || undefined,
    endDate: debouncedEnd.value || undefined,
  })
}

onMounted(async () => {
  await fetchReport()
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Purchases Report" description="Analyze purchase invoices over time">
      <template #actions>
        <UiButton variant="outline" @click="fetchReport">
          <TrendingUp class="size-4" /> Refresh
        </UiButton>
      </template>
    </PageHeader>

    <div v-if="purchasesStore.reportSummary" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Invoices</UiCardTitle>
          <FileText class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ purchasesStore.reportSummary.totalInvoices }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Amount</UiCardTitle>
          <DollarSign class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ purchasesStore.reportSummary.totalAmount.toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Paid</UiCardTitle>
          <ArrowUpRight class="size-4 text-green-600" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold text-green-600">{{ purchasesStore.reportSummary.totalPaid.toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Due</UiCardTitle>
          <ArrowUpRight class="size-4 text-destructive" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold text-destructive">{{ purchasesStore.reportSummary.totalDue.toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <LookupCombobox v-model="supplierFilter" :endpoint="fetchSuppliersLookupApi" placeholder="All suppliers" include-all class="w-44" />
          <LookupCombobox v-model="warehouseFilter" :endpoint="fetchWarehousesLookupApi" placeholder="All warehouses" include-all class="w-44" />
          <UiInput v-model="startDate" type="date" class="w-40" placeholder="Start date" />
          <UiInput v-model="endDate" type="date" class="w-40" placeholder="End date" />
        </div>
      </UiCardHeader>
      <UiCardContent class="p-0">
        <div v-if="purchasesStore.loading && purchasesStore.reportInvoices.length === 0" class="p-6">
          <LoadingState />
        </div>
        <div v-else-if="purchasesStore.reportInvoices.length === 0" class="p-6">
          <EmptyState title="No invoices found" description="Try adjusting your filters" />
        </div>
        <UiTable v-else>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Invoice #</UiTableHead>
              <UiTableHead>Supplier</UiTableHead>
              <UiTableHead>Warehouse</UiTableHead>
              <UiTableHead>Date</UiTableHead>
              <UiTableHead class="text-right">Items</UiTableHead>
              <UiTableHead class="text-right">Amount</UiTableHead>
              <UiTableHead class="text-right">Paid</UiTableHead>
              <UiTableHead class="text-right">Due</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="inv in purchasesStore.reportInvoices" :key="inv.id">
              <UiTableCell>
                <NuxtLink :to="`/purchases/${inv.id}`" class="text-sm font-mono font-medium hover:underline">{{ inv.invoiceNumber }}</NuxtLink>
              </UiTableCell>
              <UiTableCell class="text-sm">{{ inv.supplier?.name }}</UiTableCell>
              <UiTableCell class="text-sm">{{ inv.warehouse?.name }}</UiTableCell>
              <UiTableCell class="text-xs text-muted-foreground">{{ new Date(inv.invoiceDate).toLocaleDateString() }}</UiTableCell>
              <UiTableCell class="text-right text-sm">{{ inv.items?.length || 0 }}</UiTableCell>
              <UiTableCell class="text-right font-medium tabular-nums">{{ Number(inv.totalAmount).toFixed(2) }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums text-green-600">{{ Number(inv.paidAmount).toFixed(2) }}</UiTableCell>
              <UiTableCell class="text-right font-medium tabular-nums" :class="Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? 'text-destructive' : ''">
                {{ (Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2) }}
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
      <UiCardFooter v-if="purchasesStore.reportInvoices.length > 0" class="border-t px-4 py-3">
        <div class="flex items-center justify-between w-full">
          <p class="text-xs text-muted-foreground">
            {{ purchasesStore.reportInvoices.length }} invoices · {{ purchasesStore.reportSummary?.totalItems.toFixed(3) }} total qty
          </p>
          <p class="text-xs text-muted-foreground">Total: {{ purchasesStore.reportSummary?.totalAmount.toFixed(2) }}</p>
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
