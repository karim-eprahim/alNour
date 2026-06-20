<script setup lang="ts">
import { h } from 'vue'
import { Eye, DollarSign } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Invoice } from '@/modules/sales/type'
import { UiBadge, UiButton } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const salesStore = useSalesStore()
const customersStore = useCustomersStore()

const statusFilter = ref('__all__')
const customerFilter = ref('__all__')
const page = ref(1)
const limit = 20

function statusBadgeVariant(s: string) {
  const map: Record<string, string> = { UNPAID: 'destructive', PARTIAL: 'warning', PAID: 'success', CANCELLED: 'secondary' }
  return map[s] || 'secondary'
}

const showPayDialog = ref(false)
const payForm = reactive({ amount: 0, paymentMethod: 'CASH' as string, notes: '' })
const paying = ref(false)
const selectedInvoiceId = ref('')

function openPay(invoice: Invoice) {
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

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice #',
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.invoiceNumber),
  },
  {
    accessorKey: 'customer.name',
    header: 'Customer',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.customer?.name || '—'),
  },
  {
    accessorKey: 'salesOrder.orderNumber',
    header: 'Order',
    cell: ({ row }) => h('span', { class: 'text-muted-foreground text-sm' }, row.original.salesOrder?.orderNumber || '—'),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(UiBadge, { variant: statusBadgeVariant(row.original.status) as any, class: 'text-xs' }, row.original.status),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total',
    cell: ({ row }) => h('span', { class: 'tabular-nums block' }, Number(row.original.totalAmount).toFixed(2)),
  },
  {
    accessorKey: 'paidAmount',
    header: 'Paid',
    cell: ({ row }) => h('span', { class: 'tabular-nums text-green-600 block' }, Number(row.original.paidAmount).toFixed(2)),
  },
  {
    id: 'due',
    header: 'Due',
    cell: ({ row }) => {
      const due = Number(row.original.totalAmount) - Number(row.original.paidAmount)
      return h('span', { class: 'tabular-nums font-medium text-destructive block' }, due.toFixed(2))
    },
  },
  {
    id: 'payments',
    header: 'Payments',
    cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.payments ?? 0)),
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
    cell: ({ row }) => {
      const inv = row.original
      const due = Number(inv.totalAmount) - Number(inv.paidAmount)
      return h('div', { class: 'flex gap-1' }, [
        h(UiButton, { variant: 'ghost', size: 'icon-xs', disabled: due <= 0, onClick: () => openPay(inv) }, () => h(DollarSign, { class: 'size-3.5' })),
        h(UiButton, { variant: 'ghost', size: 'icon-xs', onClick: () => navigateTo(`/sales/${inv.salesOrderId}`) }, () => h(Eye, { class: 'size-3.5' })),
      ])
    },
  },
]

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

    <div class="flex flex-wrap gap-3">
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

    <AppTable
      :data="salesStore.invoices"
      :columns="columns"
      :loading="salesStore.loading"
      :server-total="salesStore.totalInvoices"
      :show-search="false"
      :show-column-toggle="false"
      search-placeholder="Search invoices..."
    >
      <template #empty>
        <EmptyState title="No invoices found" description="Invoices appear when sales orders are created" />
      </template>
    </AppTable>

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
