<script setup lang="ts">
import { FileText, Eye, DollarSign } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const salesStore = useSalesStore()
const customersStore = useCustomersStore()

const search = ref('')
const statusFilter = ref('__all__')
const customerFilter = ref('__all__')
const page = ref(1)
const limit = 20

const totalPages = computed(() => Math.ceil(salesStore.totalInvoices / limit))

const statusBadge = (s: string) => {
  const map: Record<string, string> = { UNPAID: 'destructive', PARTIAL: 'warning', PAID: 'success', CANCELLED: 'secondary' }
  return map[s] || 'secondary'
}

const showPayDialog = ref(false)
const payForm = reactive({ amount: 0, paymentMethod: 'CASH' as string, notes: '' })
const paying = ref(false)
const selectedInvoiceId = ref('')

function openPay(invoice: any) {
  const due = Number(invoice.totalAmount) - Number(invoice.paidAmount)
  if (due <= 0) { toast.error('Invoice is already paid'); return }
  selectedInvoiceId.value = invoice.id
  payForm.amount = due
  payForm.paymentMethod = 'CASH'
  payForm.notes = ''
  showPayDialog.value = true
}

async function submitPayment() {
  if (!payForm.amount || payForm.amount <= 0) { toast.error('Amount must be positive'); return }
  paying.value = true
  try {
    await salesStore.payInvoice(selectedInvoiceId.value, {
      amount: payForm.amount,
      paymentMethod: payForm.paymentMethod,
      notes: payForm.notes || undefined,
    })
    toast.success('Payment recorded')
    showPayDialog.value = false
    await load()
  } catch { toast.error('Failed to record payment') }
  finally { paying.value = false }
}

async function load() {
  await Promise.all([
    salesStore.fetchInvoices({
      search: search.value || undefined,
      status: statusFilter.value !== '__all__' ? statusFilter.value : undefined,
      customerId: customerFilter.value !== '__all__' ? customerFilter.value : undefined,
      page: page.value,
      limit,
    }),
    customersStore.fetchCustomers({ limit: 100 }),
  ])
}

let debounce: ReturnType<typeof setTimeout>
watch(search, () => {
  clearTimeout(debounce)
  debounce = setTimeout(() => { page.value = 1; load() }, 300)
})
watch([statusFilter, customerFilter], () => { page.value = 1; load() })
watch(page, load)
onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Invoices" description="Track invoice statuses and payments">
      <template #actions>
        <UiButton variant="outline" @click="load"><DollarSign class="size-4" /> Refresh</UiButton>
      </template>
    </PageHeader>

    <div class="flex flex-wrap gap-3">
      <UiInput v-model="search" placeholder="Search invoices..." class="w-64" />
      <UiSelect v-model="customerFilter">
        <UiSelectTrigger class="w-44"><UiSelectValue placeholder="All Customers" /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="__all__">All Customers</UiSelectItem>
          <UiSelectItem v-for="c in customersStore.customers" :key="c.id" :value="c.id">{{ c.name }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <UiSelect v-model="statusFilter">
        <UiSelectTrigger class="w-32"><UiSelectValue placeholder="All Status" /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="__all__">All Status</UiSelectItem>
          <UiSelectItem value="UNPAID">Unpaid</UiSelectItem>
          <UiSelectItem value="PARTIAL">Partial</UiSelectItem>
          <UiSelectItem value="PAID">Paid</UiSelectItem>
          <UiSelectItem value="CANCELLED">Cancelled</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <UiCard>
      <UiCardContent class="p-0">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Invoice #</UiTableHead>
              <UiTableHead>Customer</UiTableHead>
              <UiTableHead>Order</UiTableHead>
              <UiTableHead>Status</UiTableHead>
              <UiTableHead class="text-right">Total</UiTableHead>
              <UiTableHead class="text-right">Paid</UiTableHead>
              <UiTableHead class="text-right">Due</UiTableHead>
              <UiTableHead class="text-right">Payments</UiTableHead>
              <UiTableHead>Date</UiTableHead>
              <UiTableHead class="w-24" />
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="inv in salesStore.invoices" :key="inv.id">
              <UiTableCell class="font-medium">{{ inv.invoiceNumber }}</UiTableCell>
              <UiTableCell>{{ inv.customer?.name }}</UiTableCell>
              <UiTableCell class="text-muted-foreground">{{ inv.salesOrder?.orderNumber }}</UiTableCell>
              <UiTableCell><UiBadge :variant="statusBadge(inv.status) as any">{{ inv.status }}</UiBadge></UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ Number(inv.totalAmount).toFixed(2) }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums text-green-600">{{ Number(inv.paidAmount).toFixed(2) }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums font-medium text-destructive">{{ (Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2) }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ inv._count?.payments || 0 }}</UiTableCell>
              <UiTableCell class="text-sm text-muted-foreground">{{ new Date(inv.createdAt).toLocaleDateString() }}</UiTableCell>
              <UiTableCell>
                <div class="flex gap-1">
                  <UiButton variant="ghost" size="icon-xs" :disabled="Number(inv.totalAmount) - Number(inv.paidAmount) <= 0" @click="openPay(inv)">
                    <DollarSign class="size-3.5" />
                  </UiButton>
                  <UiButton variant="ghost" size="icon-xs" @click="navigateTo(`/sales/${inv.salesOrderId}`)">
                    <Eye class="size-3.5" />
                  </UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-if="salesStore.invoices.length === 0">
              <UiTableCell colspan="10">
                <EmptyState title="No invoices found" description="Invoices appear when sales orders are created" />
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

    <UiDialog :open="showPayDialog" @update:open="showPayDialog = $event">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Record Payment</UiDialogTitle>
          <UiDialogDescription>Enter payment details</UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="submitPayment" class="space-y-4">
          <div class="space-y-2">
            <UiLabel for="payAmount">Amount *</UiLabel>
            <UiInput id="payAmount" v-model="payForm.amount" type="number" step="0.01" placeholder="0.00" />
          </div>
          <div class="space-y-2">
            <UiLabel for="payMethod">Payment Method</UiLabel>
            <UiSelect v-model="payForm.paymentMethod">
              <UiSelectTrigger id="payMethod"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="CASH">Cash</UiSelectItem>
                <UiSelectItem value="BANK_TRANSFER">Bank Transfer</UiSelectItem>
                <UiSelectItem value="CHECK">Check</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="payNotes">Notes</UiLabel>
            <UiInput id="payNotes" v-model="payForm.notes" placeholder="Optional" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showPayDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="paying || !payForm.amount">{{ paying ? 'Recording...' : 'Record Payment' }}</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
