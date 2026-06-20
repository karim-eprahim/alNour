<script setup lang="ts">
import { ArrowLeft, DollarSign, Package, User, Building } from '@lucide/vue'
import type { InvoiceActions } from '@/modules/sales/components/column'
import { getInvoiceColumns, getOrderItemColumns } from '@/modules/sales/components/column'
import { UiBadge, UiButton } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const route = useRoute()
const salesStore = useSalesStore()

const order = computed(() => salesStore.currentOrder)

const statusBadge = (s: string) => {
  const map: Record<string, string> = { PENDING: 'secondary', CONFIRMED: 'warning', COMPLETED: 'success', CANCELLED: 'destructive' }
  return map[s] || 'secondary'
}

const invoiceStatusBadge = (s: string) => {
  const map: Record<string, string> = { UNPAID: 'destructive', PARTIAL: 'warning', PAID: 'success', CANCELLED: 'secondary' }
  return map[s] || 'secondary'
}

const itemColumns = getOrderItemColumns()

const invoiceActions: InvoiceActions = {
  onPay: (invoice) => openPay(invoice.id, Number(invoice.totalAmount) - Number(invoice.paidAmount)),
  onViewOrder: (orderId) => navigateTo(`/sales/${orderId}`),
}

const invoiceColumns = getInvoiceColumns(invoiceActions)

const showPayDialog = ref(false)
const payForm = reactive({ amount: 0, paymentMethod: 'CASH' as string, notes: '' })
const paying = ref(false)
const selectedInvoiceId = ref('')

function openPay(invoiceId: string, maxAmount: number) {
  selectedInvoiceId.value = invoiceId
  payForm.amount = maxAmount
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
    await salesStore.fetchOrder(route.params.id as string)
  } catch { toast.error('Failed to record payment') }
  finally { paying.value = false }
}

onMounted(async () => {
  await salesStore.fetchOrder(route.params.id as string)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/sales/orders')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader v-if="order" :title="order.orderNumber" :description="`Created ${new Date(order.createdAt).toLocaleDateString()}`">
        <template #actions>
          <UiBadge :variant="statusBadge(order.status) as any">{{ order.status }}</UiBadge>
        </template>
      </PageHeader>
    </div>

    <template v-if="order">
      <div class="grid gap-4 sm:grid-cols-4">
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Customer</UiCardTitle>
            <User class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <NuxtLink :to="`/customers/${order.customerId}`" class="text-lg font-medium hover:underline">{{ order.customer?.name }}</NuxtLink>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Warehouse</UiCardTitle>
            <Building class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-lg font-medium">{{ order.warehouse?.name }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Total</UiCardTitle>
            <DollarSign class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ Number(order.totalAmount).toFixed(2) }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2 flex flex-row items-center justify-between">
            <UiCardTitle class="text-sm font-medium text-muted-foreground">Items</UiCardTitle>
            <Package class="size-4 text-muted-foreground" />
          </UiCardHeader>
          <UiCardContent>
            <p class="text-2xl font-bold">{{ order.items?.length || 0 }}</p>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Order Items</UiCardTitle>
            <UiCardDescription>Products in this order</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <AppTable
              :data="order.items || []"
              :columns="itemColumns"
              :show-search="false"
              :show-column-toggle="false"
              :show-pagination="false"
            >
              <template #empty>
                <EmptyState title="No items" description="No products in this order" />
              </template>
            </AppTable>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Invoices</UiCardTitle>
            <UiCardDescription>Generated invoices and payments</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-3">
            <div v-if="!order.invoices?.length" class="py-4">
              <EmptyState title="No invoices" description="No invoices generated yet" />
            </div>
            <UiCard v-for="inv in order.invoices" :key="inv.id" class="border">
              <UiCardHeader class="py-3 px-4 flex flex-row items-center justify-between">
                <div>
                  <p class="text-sm font-medium">{{ inv.invoiceNumber }}</p>
                  <p class="text-xs text-muted-foreground">{{ new Date(inv.createdAt).toLocaleDateString() }}</p>
                </div>
                <UiBadge :variant="invoiceStatusBadge(inv.status) as any">{{ inv.status }}</UiBadge>
              </UiCardHeader>
              <UiCardContent class="px-4 pb-3 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Total</span>
                  <span class="font-medium">{{ Number(inv.totalAmount).toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Paid</span>
                  <span class="font-medium text-green-600">{{ Number(inv.paidAmount).toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Due</span>
                  <span class="font-medium text-destructive">{{ (Number(inv.totalAmount) - Number(inv.paidAmount)).toFixed(2) }}</span>
                </div>
                <div v-if="inv.payments?.length" class="pt-2 border-t">
                  <p class="text-xs font-medium text-muted-foreground mb-1">Payments</p>
                  <div v-for="p in inv.payments" :key="p.id" class="flex justify-between text-xs">
                    <span>{{ new Date(p.createdAt).toLocaleDateString() }} · {{ p.paymentMethod }} {{ p.createdBy ? `by ${p.createdBy.name}` : '' }}</span>
                    <span class="font-medium text-green-600">{{ Number(p.amount).toFixed(2) }}</span>
                  </div>
                </div>
                <UiButton v-if="Number(inv.totalAmount) > Number(inv.paidAmount)" size="sm" class="w-full mt-2" @click="openPay(inv.id, Number(inv.totalAmount) - Number(inv.paidAmount))">
                  <DollarSign class="size-3.5" /> Record Payment
                </UiButton>
              </UiCardContent>
            </UiCard>
          </UiCardContent>
        </UiCard>
      </div>
    </template>

    <UiDialog :open="showPayDialog" @update:open="showPayDialog = $event">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Record Payment</UiDialogTitle>
          <UiDialogDescription>Enter payment details for this invoice</UiDialogDescription>
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
            <UiInput id="payNotes" v-model="payForm.notes" placeholder="Optional notes" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showPayDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="paying || !payForm.amount"><DollarSign class="size-4" /> {{ paying ? 'Recording...' : 'Record Payment' }}</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
