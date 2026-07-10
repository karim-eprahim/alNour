<script setup lang="ts">
import { ArrowLeft, Building2, Phone, Mail, MapPin, FileText, CreditCard, ArrowUpRight, ArrowDownRight, Link, ArrowLeftRight } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
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

const activeTab = ref('invoices')
const showLedgerDialog = ref(false)
const showPayDialog = ref(false)
const showContraDialog = ref(false)
const payingInvoice = ref<any>(null)

const ledgerForm = reactive({ amount: null as number | null, type: 'DEBIT' as 'DEBIT' | 'CREDIT', description: '' })
const payForm = reactive({ amount: null as number | null, description: '' })
const contraForm = reactive({ amount: null as number | null })

async function fetchSupplier() {
  await suppliersStore.fetchSupplier(supplierId.value)
}

const balance = computed(() => (suppliersStore.currentSupplier as any)?.balance ?? 0)
const invoices = computed(() => (suppliersStore.currentSupplier as any)?.purchaseInvoices ?? [])
const ledgerEntries = computed(() => (suppliersStore.currentSupplier as any)?.ledgerEntries ?? [])

const linkedCustomer = computed(() => (suppliersStore.currentSupplier as any)?.linkedCustomer ?? null)
const linkedCustomerBalance = computed(() => linkedCustomer.value?.balance ?? 0)
const netBalance = computed(() => (suppliersStore.currentSupplier as any)?.netBalance ?? balance.value)

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
    fetchSupplier()
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
    fetchSupplier()
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
    fetchSupplier()
  } catch {}
}

onMounted(fetchSupplier)
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
          <h1 class="text-lg font-semibold">{{ suppliersStore.currentSupplier?.name || 'Loading...' }}</h1>
          <p v-if="suppliersStore.currentSupplier?.company" class="text-xs text-muted-foreground">{{ suppliersStore.currentSupplier.company }}</p>
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
            <p class="text-sm font-medium tabular-nums" :class="balance > 0 ? 'text-destructive' : 'text-green-600'">{{ Number(balance).toFixed(2) }}</p>
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
          <p class="text-2xl font-bold" :class="balance > 0 ? 'text-destructive' : balance < 0 ? 'text-green-600' : ''">
            {{ Number(balance).toFixed(2) }}
          </p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Invoices</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ invoices.length }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Purchases</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ invoices.reduce((s: number, i: any) => s + Number(i.totalAmount), 0).toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Paid</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ invoices.reduce((s: number, i: any) => s + Number(i.paidAmount), 0).toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
    </div>

    <div v-if="suppliersStore.currentSupplier" class="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
      <span v-if="suppliersStore.currentSupplier.phone" class="flex items-center gap-1"><Phone class="size-3.5" /> {{ suppliersStore.currentSupplier.phone }}</span>
      <span v-if="suppliersStore.currentSupplier.email" class="flex items-center gap-1"><Mail class="size-3.5" /> {{ suppliersStore.currentSupplier.email }}</span>
      <span v-if="suppliersStore.currentSupplier.address" class="flex items-center gap-1"><MapPin class="size-3.5" /> {{ suppliersStore.currentSupplier.address }}</span>
    </div>

    <UiTabs v-model="activeTab" class="space-y-4">
      <UiTabsList>
        <UiTabsTrigger value="invoices">Purchase Invoices</UiTabsTrigger>
        <UiTabsTrigger value="ledger">Ledger</UiTabsTrigger>
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
            <div v-if="invoices.length === 0" class="p-6">
              <EmptyState title="No invoices" description="No purchase invoices recorded for this supplier yet" action="New Invoice" @action="navigateTo('/purchases/new')" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Invoice #</UiTableHead>
                  <UiTableHead>Date</UiTableHead>
                  <UiTableHead>Warehouse</UiTableHead>
                  <UiTableHead class="text-right">Amount</UiTableHead>
                  <UiTableHead class="text-right">Paid</UiTableHead>
                  <UiTableHead class="text-right">Due</UiTableHead>
                  <UiTableHead class="w-20 text-right">Action</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="inv in invoices" :key="inv.id">
                  <UiTableCell>
                    <NuxtLink :to="`/purchases/${inv.id}`" class="text-sm font-mono font-medium hover:underline">{{ inv.invoiceNumber }}</NuxtLink>
                  </UiTableCell>
                  <UiTableCell class="text-xs text-muted-foreground">{{ new Date(inv.invoiceDate).toLocaleDateString() }}</UiTableCell>
                  <UiTableCell class="text-sm">{{ inv.warehouse?.name }}</UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums">{{ Number(inv.totalAmount).toFixed(2) }}</UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums text-green-600">{{ Number(inv.paidAmount).toFixed(2) }}</UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums" :class="Number(inv.totalAmount) - Number(inv.paidAmount) > 0 ? 'text-destructive' : ''">
                    {{ (Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2) }}
                  </UiTableCell>
                  <UiTableCell class="text-right">
                    <UiButton
                      v-if="Number(inv.totalAmount) > Number(inv.paidAmount) && can('SUPPLIERS', 'UPDATE')"
                      variant="ghost" size="icon-xs" class="text-green-600"
                      @click="openPay(inv)"
                    >
                      <CreditCard class="size-3.5" />
                    </UiButton>
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="ledger">
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
            <div v-if="ledgerEntries.length === 0" class="p-6">
              <EmptyState title="No ledger entries" description="Financial transactions will appear here" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Date</UiTableHead>
                  <UiTableHead>Type</UiTableHead>
                  <UiTableHead>Description</UiTableHead>
                  <UiTableHead class="text-right">Amount</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="entry in ledgerEntries" :key="entry.id">
                  <UiTableCell class="text-xs text-muted-foreground">{{ new Date(entry.createdAt).toLocaleString() }}</UiTableCell>
                  <UiTableCell>
                    <UiBadge :variant="entry.type === 'DEBIT' ? 'destructive' : 'default'" class="text-xs">
                      <div class="flex items-center gap-1">
                        <ArrowUpRight v-if="entry.type === 'DEBIT'" class="size-3" />
                        <ArrowDownRight v-else class="size-3" />
                        {{ entry.type }}
                      </div>
                    </UiBadge>
                  </UiTableCell>
                  <UiTableCell class="text-sm text-muted-foreground">{{ entry.description || '—' }}</UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums" :class="entry.type === 'DEBIT' ? 'text-destructive' : 'text-green-600'">
                    {{ Number(entry.amount).toFixed(2) }}
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
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
          <UiDialogDescription>Settle outstanding balances between {{ suppliersStore.currentSupplier?.name }} and {{ linkedCustomer?.name }}</UiDialogDescription>
        </UiDialogHeader>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between"><span>Supplier Balance:</span><span :class="balance > 0 ? 'text-destructive' : 'text-green-600'" class="font-medium">{{ Number(balance).toFixed(2) }}</span></div>
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
