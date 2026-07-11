<script setup lang="ts">
import { DollarSign } from '@lucide/vue'
import type { InvoiceActions } from '@/modules/sales/components/column'
import { getInvoiceColumns } from '@/modules/sales/components/column'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'SALES', action: 'READ' },
})

const salesStore = useSalesStore()
const customersStore = useCustomersStore()

const statusFilter = ref('__all__')
const customerFilter = ref('__all__')
const page = ref(1)
const limit = 20

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

const invoiceActions: InvoiceActions = {
  onPay: (invoice) => openPay(invoice),
  onViewOrder: (orderId) => navigateTo(`/sales/${orderId}`),
}

const columns = getInvoiceColumns(invoiceActions)

async function load() {
  await Promise.all([
    salesStore.fetchInvoices({
      status: statusFilter.value !== '__all__' ? statusFilter.value : undefined,
      customerId: customerFilter.value !== '__all__' ? customerFilter.value : undefined,
      page: page.value,
      limit,
    }),
    customersStore.fetchCustomers({ limit: 100 }),
  ])
}

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

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <LookupCombobox v-model="customerFilter" :items="customersStore.customers" placeholder="All Customers" include-all all-value="__all__" all-label="All Customers" class="w-44" />
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
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="salesStore.invoices"
          :columns="columns"
          :loading="salesStore.loading"
          :server-total="salesStore.totalInvoices"
          :show-search="false"
          :show-column-toggle="false"
        >
          <template #empty>
            <EmptyState title="No invoices found" description="Invoices appear when sales orders are created" />
          </template>
        </AppTable>
      </UiCardContent>
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
