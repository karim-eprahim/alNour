<script setup lang="ts">
import { h } from 'vue'
import { ArrowLeft, Building2, Phone, Mail, MapPin, FileText, CreditCard, Link, ArrowLeftRight, Wallet, Receipt } from '@lucide/vue'
import { getLedgerColumns } from '@/modules/customers/components/column'
import type { ColumnDef } from '@tanstack/vue-table'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'SUPPLIERS', action: 'READ' },
})

const route = useRoute()
const supplierId = computed(() => route.params.id as string)
const suppliersStore = useSuppliersStore()
const { can } = usePermissions()

const supplier = computed(() => suppliersStore.currentSupplier)

const linkedCustomer = computed(() => (supplier.value as any)?.linkedCustomer ?? null)
const linkedCustomerBalance = computed(() => linkedCustomer.value?.balance ?? 0)
const netBalance = computed(() => (supplier.value as any)?.netBalance ?? 0)

const activeTab = ref('invoices')
const showLedgerDialog = ref(false)
const showPayDialog = ref(false)
const showContraDialog = ref(false)
const payingInvoice = ref<any>(null)

const ledgerForm = reactive({ amount: null as number | null, type: 'DEBIT' as 'DEBIT' | 'CREDIT', description: '' })
const payForm = reactive({ amount: null as number | null, description: '' })
const contraForm = reactive({ amount: null as number | null })

const { data: purchaseInvoices, loading: purchasesLoading, load: loadPurchases } = useTabData<any[]>(async () => {
  const data: any = await $fetch('/api/purchases', { params: { supplierId: supplierId.value, limit: 100 } })
  return data.invoices || []
})

const { data: ledgerRaw, loading: ledgerLoading, load: loadLedger } = useTabData<{ entries: any[]; summary: any }>(async () => {
  const [entriesData, summaryData] = await Promise.all([
    $fetch('/api/ledger', { params: { supplierId: supplierId.value, limit: 100 } }),
    $fetch('/api/ledger/summary', { params: { supplierId: supplierId.value } }),
  ])
  return { entries: (entriesData as any).entries || [], summary: summaryData as any }
})

const ledgerEntries = computed(() => ledgerRaw.value?.entries ?? [])
const ledgerSummary = computed(() => ledgerRaw.value?.summary ?? null)

watch(activeTab, (tab) => {
  if (tab === 'invoices') loadPurchases()
  else if (tab === 'ledger') loadLedger()
})

onMounted(async () => {
  await suppliersStore.fetchSupplier(supplierId.value)
  loadPurchases()
})

const purchaseInvoiceColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice #',
    cell: ({ row }) => h('span', { class: 'font-mono font-medium' }, row.original.invoiceNumber),
  },
  {
    accessorKey: 'invoiceDate',
    header: 'Date',
    cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.invoiceDate).toLocaleDateString()),
  },
  {
    accessorKey: 'warehouse',
    header: 'Warehouse',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.warehouse?.name || '—'),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Amount',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium block' }, Number(row.original.totalAmount).toFixed(2)),
  },
  {
    accessorKey: 'paidAmount',
    header: 'Paid',
    cell: ({ row }) => h('span', { class: 'tabular-nums font-medium text-green-600 block' }, Number(row.original.paidAmount).toFixed(2)),
  },
  {
    id: 'due',
    header: 'Due',
    cell: ({ row }) => {
      const due = Number(row.original.totalAmount) - Number(row.original.paidAmount)
      return h('span', { class: `tabular-nums font-medium block ${due > 0 ? 'text-destructive' : ''}` }, due.toFixed(2))
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const due = Number(row.original.totalAmount) - Number(row.original.paidAmount)
      if (due <= 0 || !can('SUPPLIERS', 'UPDATE')) return null
      return h('div', { class: 'text-right' }, [
        h('button', {
          class: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 text-green-600',
          onClick: () => openPay(row.original),
        }, [h(CreditCard, { class: 'size-3.5' })]),
      ])
    },
  },
]

async function handleContraSettlement() {
  if (!contraForm.amount && contraForm.amount !== 0) return
  try {
    await $fetch('/api/accounting/reconcile-partner', {
      method: 'POST',
      body: {
        supplierId: supplierId.value,
        customerId: linkedCustomer.value.id,
        amount: contraForm.amount,
      },
    })
    showContraDialog.value = false
    contraForm.amount = null
    toast.success('Contra settlement completed')
    await suppliersStore.fetchSupplier(supplierId.value)
  } catch (e: any) {
    toast.error(e?.data?.statusMessage || 'Settlement failed')
  }
}

async function handleLedgerEntry() {
  if (!ledgerForm.amount) return
  try {
    await suppliersStore.addLedgerEntry(supplierId.value, {
      amount: ledgerForm.amount,
      type: ledgerForm.type,
      description: ledgerForm.description || undefined,
    })
    showLedgerDialog.value = false
    ledgerForm.amount = null; ledgerForm.type = 'DEBIT'; ledgerForm.description = ''
    toast.success('Ledger entry added')
    loadLedger()
  } catch {}
}

function openPay(invoice: any) {
  payingInvoice.value = invoice
  payForm.amount = null; payForm.description = ''
  showPayDialog.value = true
}

async function handlePay() {
  if (!payingInvoice.value || !payForm.amount) return
  try {
    await usePurchasesStore().payInvoice(payingInvoice.value.id, {
      amount: payForm.amount,
      description: payForm.description || undefined,
    })
    showPayDialog.value = false; payingInvoice.value = null
    toast.success('Payment recorded')
    loadPurchases()
  } catch {}
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/suppliers')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <div class="flex items-center gap-3">
        <div class="size-9 flex items-center justify-center rounded-lg bg-muted">
          <Building2 class="size-4 text-muted-foreground" />
        </div>
        <div>
          <h1 class="text-lg font-semibold">{{ supplier?.name || 'Loading...' }}</h1>
          <p v-if="supplier?.company" class="text-xs text-muted-foreground">{{ supplier.company }}</p>
        </div>
      </div>
    </div>

    <div v-if="linkedCustomer" class="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20 p-4">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-2">
          <Link class="size-4 text-blue-600" />
          <span class="text-sm font-medium">Linked to Customer: <NuxtLink :to="`/customers/${linkedCustomer.id}`" class="text-blue-600 hover:underline">{{ linkedCustomer.name }}</NuxtLink></span>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-xs text-muted-foreground">Supplier Balance</p>
            <p class="text-sm font-medium tabular-nums" :class="(supplier?.balance ?? 0) > 0 ? 'text-destructive' : 'text-green-600'">{{ Number(supplier?.balance ?? 0).toFixed(2) }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-muted-foreground">Customer Balance</p>
            <p class="text-sm font-medium tabular-nums" :class="linkedCustomerBalance > 0 ? 'text-destructive' : 'text-green-600'">{{ Number(linkedCustomerBalance).toFixed(2) }}</p>
          </div>
          <div class="text-right border-l pl-4">
            <p class="text-xs text-muted-foreground">Net Balance</p>
            <p class="text-sm font-bold tabular-nums" :class="netBalance > 0 ? 'text-destructive' : netBalance < 0 ? 'text-green-600' : ''">
              {{ netBalance > 0 ? `نحن ندين له بـ ${Number(netBalance).toFixed(2)}` : netBalance < 0 ? `هو مدين لنا بـ ${Number(Math.abs(netBalance)).toFixed(2)}` : 'صفر' }}
            </p>
          </div>
          <UiButton v-can="{ module: 'SUPPLIERS', action: 'UPDATE' }" size="sm" variant="outline" class="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400" @click="showContraDialog = true">
            <ArrowLeftRight class="size-4" /> مقاصة مالية
          </UiButton>
        </div>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-4">
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Balance</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold" :class="(supplier?.balance ?? 0) > 0 ? 'text-destructive' : (supplier?.balance ?? 0) < 0 ? 'text-green-600' : ''">
            {{ Number(supplier?.balance ?? 0).toFixed(2) }}
          </p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Invoices</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ supplier?._count?.purchaseInvoices ?? 0 }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Purchases</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ Number((supplier as any)?.totalPurchases ?? 0).toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Paid</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ Number((supplier as any)?.totalPaid ?? 0).toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <div v-if="supplier" class="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
      <span v-if="supplier.phone" class="flex items-center gap-1"><Phone class="size-3.5" /> {{ supplier.phone }}</span>
      <span v-if="supplier.email" class="flex items-center gap-1"><Mail class="size-3.5" /> {{ supplier.email }}</span>
      <span v-if="supplier.address" class="flex items-center gap-1"><MapPin class="size-3.5" /> {{ supplier.address }}</span>
    </div>

    <UiTabs v-model="activeTab" class="space-y-4">
      <UiTabsList>
        <UiTabsTrigger value="invoices">
          <Receipt class="size-4" /> Purchase Invoices
        </UiTabsTrigger>
        <UiTabsTrigger value="ledger">
          <Wallet class="size-4" /> Ledger
        </UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="invoices">
        <UiCard>
          <UiCardHeader class="flex flex-row items-center justify-between">
            <div>
              <UiCardTitle>Purchase Invoices</UiCardTitle>
              <UiCardDescription>All purchase invoices from this supplier</UiCardDescription>
            </div>
            <UiButton v-can="{ module: 'SUPPLIERS', action: 'UPDATE' }" size="sm" @click="navigateTo('/purchases/new')">
              <FileText class="size-4" /> New Invoice
            </UiButton>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <AppTable
              :data="purchaseInvoices || []"
              :columns="purchaseInvoiceColumns"
              :loading="purchasesLoading"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="false"
            >
              <template #empty>
                <EmptyState
                  title="No invoices"
                  description="No purchase invoices recorded for this supplier yet"
                  action="New Invoice"
                  @action="navigateTo('/purchases/new')"
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
          <UiCardHeader class="flex flex-row items-center justify-between">
            <div>
              <UiCardTitle>Ledger Entries</UiCardTitle>
              <UiCardDescription>Financial transactions with this supplier</UiCardDescription>
            </div>
            <UiButton v-can="{ module: 'SUPPLIERS', action: 'UPDATE' }" size="sm" variant="outline" @click="showLedgerDialog = true">
              <CreditCard class="size-4" /> Add Entry
            </UiButton>
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
                <EmptyState title="No transactions" description="Financial transactions will appear here" />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>
    </UiTabs>

    <UiDialog :open="showLedgerDialog" @update:open="showLedgerDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Add Ledger Entry</UiDialogTitle>
          <UiDialogDescription>Record a financial transaction</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleLedgerEntry">
          <div class="space-y-2">
            <UiLabel for="ledger-type">Type</UiLabel>
            <UiSelect v-model="ledgerForm.type">
              <UiSelectTrigger id="ledger-type"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="DEBIT">Debit (Amount Due)</UiSelectItem>
                <UiSelectItem value="CREDIT">Credit (Payment)</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="ledger-amount">Amount</UiLabel>
            <UiInput id="ledger-amount" v-model="ledgerForm.amount as number" type="number" step="0.01" placeholder="0.00" required />
          </div>
          <div class="space-y-2">
            <UiLabel for="ledger-desc">Description</UiLabel>
            <UiInput id="ledger-desc" v-model="ledgerForm.description" placeholder="Optional description" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showLedgerDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="suppliersStore.loading">Add Entry</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <UiDialog :open="showContraDialog" @update:open="showContraDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Contra Settlement (مقاصة مالية)</UiDialogTitle>
          <UiDialogDescription>Settle outstanding balances between {{ supplier?.name }} and {{ linkedCustomer?.name }}</UiDialogDescription>
        </UiDialogHeader>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between"><span>Supplier Balance:</span><span :class="(supplier?.balance ?? 0) > 0 ? 'text-destructive' : 'text-green-600'" class="font-medium">{{ Number(supplier?.balance ?? 0).toFixed(2) }}</span></div>
          <div class="flex justify-between"><span>Customer Balance:</span><span :class="linkedCustomerBalance > 0 ? 'text-destructive' : 'text-green-600'" class="font-medium">{{ Number(linkedCustomerBalance).toFixed(2) }}</span></div>
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

    <UiDialog :open="showPayDialog" @update:open="showPayDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Record Payment</UiDialogTitle>
          <UiDialogDescription>Pay towards invoice {{ payingInvoice?.invoiceNumber }}</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handlePay">
          <div class="space-y-2">
            <UiLabel for="pay-amount">Amount</UiLabel>
            <UiInput id="pay-amount" v-model="payForm.amount as number" type="number" step="0.01" placeholder="0.00" required />
          </div>
          <div class="space-y-2">
            <UiLabel for="pay-desc">Description</UiLabel>
            <UiInput id="pay-desc" v-model="payForm.description" placeholder="Optional" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showPayDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="usePurchasesStore().loading">Record Payment</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
