<script setup lang="ts">
import { h } from 'vue'
import { ArrowLeft, ArrowLeftRight, FileText, Link, MapPin, Phone, Receipt, ShoppingCart, Wallet } from '@lucide/vue'
import { getLedgerColumns } from '@/modules/customers/components/column'
import { useTabData } from '@/modules/customers/composables/useCustomerTabs'
import type { ColumnDef } from '@tanstack/vue-table'
import { UiBadge } from '#components'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'CUSTOMERS', action: 'READ' },
})

const route = useRoute()
const customersStore = useCustomersStore()

const customer = computed(() => customersStore.currentCustomer)

const linkedSupplier = computed(() => (customer.value as any)?.linkedSupplier ?? null)
const linkedSupplierBalance = computed(() => linkedSupplier.value?.balance ?? 0)
const netBalance = computed(() => (customer.value as any)?.netBalance ?? (customer.value?.balance ?? 0))

const showContraDialog = ref(false)
const contraForm = reactive({ amount: null as number | null })

const activeTab = ref('invoices')

const { data: invoices, loading: invoicesLoading, load: loadInvoices } = useTabData<any[]>(async () => {
  const data: any = await $fetch('/api/invoices', { params: { customerId: route.params.id, limit: 100 } })
  return data.invoices || []
})

const { data: ledgerRaw, loading: ledgerLoading, load: loadLedger } = useTabData<{ entries: any[]; summary: any }>(async () => {
  const [entriesData, summaryData] = await Promise.all([
    $fetch('/api/ledger', { params: { customerId: route.params.id, limit: 100 } }),
    $fetch('/api/ledger/summary', { params: { customerId: route.params.id } }),
  ])
  return { entries: (entriesData as any).entries || [], summary: summaryData as any }
})

const { data: orders, loading: ordersLoading, load: loadOrders } = useTabData<any[]>(async () => {
  const data: any = await $fetch('/api/sales', { params: { customerId: route.params.id, limit: 100 } })
  return data.orders || []
})

const ledgerEntries = computed(() => ledgerRaw.value?.entries ?? [])
const ledgerSummary = computed(() => ledgerRaw.value?.summary ?? null)

watch(activeTab, (tab) => {
  if (tab === 'invoices') loadInvoices()
  else if (tab === 'ledger') loadLedger()
  else if (tab === 'orders') loadOrders()
})

onMounted(async () => {
  await customersStore.fetchCustomer(route.params.id as string)
  loadInvoices()
})

function statusVariant(s: string) {
  const map: Record<string, string> = { UNPAID: 'destructive', PARTIAL: 'default', PAID: 'success', CANCELLED: 'secondary' }
  return (map[s] || 'secondary') as any
}

const invoiceColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice',
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.invoiceNumber),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleDateString()),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalAmount).toFixed(2)),
  },
  {
    accessorKey: 'paidAmount',
    header: 'Paid',
    cell: ({ row }) => h('span', { class: 'tabular-nums text-muted-foreground block' }, Number(row.original.paidAmount).toFixed(2)),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(UiBadge, { variant: statusVariant(row.original.status), class: 'text-[10px]' }, () => row.original.status),
  },
]

const orderColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'orderNumber',
    header: 'Order',
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.orderNumber),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleDateString()),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalAmount).toFixed(2)),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.status),
  },
]

async function handleContraSettlement() {
  if (!contraForm.amount && contraForm.amount !== 0) return
  try {
    await $fetch('/api/accounting/reconcile-partner', {
      method: 'POST',
      body: {
        supplierId: linkedSupplier.value.id,
        customerId: route.params.id,
        amount: contraForm.amount,
      },
    })
    showContraDialog.value = false
    contraForm.amount = null
    toast.success('Contra settlement completed')
    await customersStore.fetchCustomer(route.params.id as string)
  } catch (e: any) {
    toast.error(e?.data?.statusMessage || 'Settlement failed')
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/customers')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader v-if="customer" :title="customer.name" description="Customer details">
        <template #actions>
          <UiBadge :class="(customer.balance || 0) > 0 ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'">
            Balance: {{ (customer.balance || 0).toFixed(2) }}
          </UiBadge>
        </template>
      </PageHeader>
    </div>

    <div v-if="linkedSupplier" class="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 p-4">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-2">
          <Link class="size-4 text-blue-600" />
          <span class="text-sm font-medium">Linked to Supplier: <NuxtLink :to="`/suppliers/${linkedSupplier.id}`" class="text-blue-600 hover:underline">{{ linkedSupplier.name }}</NuxtLink></span>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-xs text-muted-foreground">Customer Balance</p>
            <p class="text-sm font-medium tabular-nums" :class="(customer?.balance ?? 0) > 0 ? 'text-destructive' : 'text-green-600'">{{ Number(customer?.balance ?? 0).toFixed(2) }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-muted-foreground">Supplier Balance</p>
            <p class="text-sm font-medium tabular-nums" :class="linkedSupplierBalance > 0 ? 'text-destructive' : 'text-green-600'">{{ Number(linkedSupplierBalance).toFixed(2) }}</p>
          </div>
          <div class="text-right border-l pl-4">
            <p class="text-xs text-muted-foreground">Net Balance</p>
            <p class="text-sm font-bold tabular-nums" :class="netBalance > 0 ? 'text-destructive' : netBalance < 0 ? 'text-green-600' : ''">
              {{ netBalance > 0 ? `مدين لنا بـ ${Number(netBalance).toFixed(2)}` : netBalance < 0 ? `نحن مدينون له بـ ${Number(Math.abs(netBalance)).toFixed(2)}` : 'صفر' }}
            </p>
          </div>
          <UiButton size="sm" variant="outline" class="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400" @click="showContraDialog = true">
            <ArrowLeftRight class="size-4" /> مقاصة مالية
          </UiButton>
        </div>
      </div>
    </div>

    <div v-if="customer" class="grid gap-4 sm:grid-cols-3">
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Phone</UiCardTitle>
          <Phone class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-lg font-medium">{{ customer.phone || '—' }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Address</UiCardTitle>
          <MapPin class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-lg font-medium">{{ customer.address || '—' }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Orders / Invoices</UiCardTitle>
          <FileText class="size-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <p class="text-lg font-medium">{{ customer._count?.salesOrders || 0 }} / {{ customer._count?.invoices || 0 }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <UiTabs v-model="activeTab" class="space-y-4">
      <UiTabsList>
        <UiTabsTrigger value="invoices">
          <Receipt class="size-4" /> Invoices
        </UiTabsTrigger>
        <UiTabsTrigger value="ledger">
          <Wallet class="size-4" /> Ledger
        </UiTabsTrigger>
        <UiTabsTrigger value="orders">
          <ShoppingCart class="size-4" /> Orders
        </UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="invoices">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Invoices</UiCardTitle>
            <UiCardDescription>All invoices for this customer</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <AppTable
              :data="invoices || []"
              :columns="invoiceColumns"
              :loading="invoicesLoading"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="false"
            >
              <template #empty>
                <EmptyState
                  title="No invoices"
                  description="No invoices have been created for this customer yet."
                />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="ledger">
        <div v-if="ledgerSummary" class="grid grid-cols-3 gap-3 mb-4">
          <UiCard size="sm">
            <UiCardContent class="flex items-center gap-3 p-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                <Wallet class="size-4 text-red-500" />
              </div>
              <div class="min-w-0">
                <p class="text-xs text-muted-foreground truncate">Total Debit</p>
                <p class="text-sm font-semibold tabular-nums text-destructive">{{ ledgerSummary.totalDebit.toFixed(2) }}</p>
              </div>
            </UiCardContent>
          </UiCard>
          <UiCard size="sm">
            <UiCardContent class="flex items-center gap-3 p-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                <Wallet class="size-4 text-green-500" />
              </div>
              <div class="min-w-0">
                <p class="text-xs text-muted-foreground truncate">Total Credit</p>
                <p class="text-sm font-semibold tabular-nums text-green-600">{{ ledgerSummary.totalCredit.toFixed(2) }}</p>
              </div>
            </UiCardContent>
          </UiCard>
          <UiCard size="sm">
            <UiCardContent class="flex items-center gap-3 p-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg" :class="ledgerSummary.balance > 0 ? 'bg-orange-500/10' : 'bg-emerald-500/10'">
                <Wallet class="size-4" :class="ledgerSummary.balance > 0 ? 'text-orange-500' : 'text-emerald-500'" />
              </div>
              <div class="min-w-0">
                <p class="text-xs text-muted-foreground truncate">Balance</p>
                <p class="text-sm font-semibold tabular-nums" :class="ledgerSummary.balance > 0 ? 'text-destructive' : 'text-green-600'">{{ ledgerSummary.balance.toFixed(2) }}</p>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Ledger Entries</UiCardTitle>
            <UiCardDescription>Financial transactions history</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <AppTable
              :data="ledgerEntries"
              :columns="getLedgerColumns()"
              :loading="ledgerLoading"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="false"
            >
              <template #empty>
                <EmptyState title="No transactions" description="No ledger entries recorded" />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="orders">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Orders</UiCardTitle>
            <UiCardDescription>All sales orders for this customer</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <AppTable
              :data="orders || []"
              :columns="orderColumns"
              :loading="ordersLoading"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="false"
            >
              <template #empty>
                <EmptyState
                  title="No orders"
                  description="No sales orders have been created for this customer yet."
                />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>
    </UiTabs>

    <UiDialog :open="showContraDialog" @update:open="showContraDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Contra Settlement (مقاصة مالية)</UiDialogTitle>
          <UiDialogDescription>Settle outstanding balances between {{ customer?.name }} and {{ linkedSupplier?.name }}</UiDialogDescription>
        </UiDialogHeader>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between"><span>Customer Balance:</span><span :class="(customer?.balance ?? 0) > 0 ? 'text-destructive' : 'text-green-600'" class="font-medium">{{ Number(customer?.balance ?? 0).toFixed(2) }}</span></div>
          <div class="flex justify-between"><span>Supplier Balance:</span><span :class="linkedSupplierBalance > 0 ? 'text-destructive' : 'text-green-600'" class="font-medium">{{ Number(linkedSupplierBalance).toFixed(2) }}</span></div>
          <div class="flex justify-between border-t pt-2"><span>Current Net:</span><span class="font-bold" :class="netBalance > 0 ? 'text-destructive' : netBalance < 0 ? 'text-green-600' : ''">{{ Number(netBalance).toFixed(2) }}</span></div>
        </div>
        <form class="space-y-4" @submit.prevent="handleContraSettlement">
          <div class="space-y-2">
            <UiLabel for="contra-amount">Settlement Amount</UiLabel>
            <UiInput id="contra-amount" v-model="contraForm.amount as number" type="number" step="0.01" placeholder="0.00" required />
            <p class="text-xs text-muted-foreground">Leave empty to auto-calculate the minimum of both balances</p>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showContraDialog = false">Cancel</UiButton>
            <UiButton type="submit">Execute Settlement</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
