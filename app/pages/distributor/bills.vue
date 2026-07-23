<script setup lang="ts">
import { Receipt, Search, Filter, DollarSign, ArrowLeft, ChevronRight, Eye, Printer } from '@lucide/vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()

const search = ref('')
const statusFilter = ref('__all__')
const page = ref(1)
const limit = 20

const showDetail = ref(false)
const selectedInvoice = ref<any>(null)
const payAmount = ref(0)
const paying = ref(false)
const invoiceDetailLoading = ref(false)

const statusOptions = [
  { value: '__all__', label: 'All' },
  { value: 'UNPAID', label: 'Unpaid' },
  { value: 'PARTIAL', label: 'Partial' },
  { value: 'PAID', label: 'Paid' },
]

async function load() {
  const status = statusFilter.value !== '__all__' ? statusFilter.value : undefined
  await store.fetchInvoices({ search: search.value || undefined, status, page: page.value, limit })
}

watch([search, statusFilter], () => { page.value = 1; load() })
watch(page, load)
onMounted(load)

function statusVariant(s: string) {
  const map: Record<string, string> = { UNPAID: 'destructive', PARTIAL: 'default', PAID: 'success', CANCELLED: 'secondary' }
  return (map[s] || 'secondary') as any
}

async function viewDetail(inv: any) {
  invoiceDetailLoading.value = true
  showDetail.value = true
  try {
    const data: any = await $fetch(`/api/invoices/${inv.id}`)
    selectedInvoice.value = data.invoice || data
  } catch (err: any) {
    selectedInvoice.value = inv
  } finally {
    invoiceDetailLoading.value = false
  }
  payAmount.value = inv.totalAmount - inv.paidAmount
}

function goBack() {
  showDetail.value = false
  selectedInvoice.value = null
}

async function handlePay() {
  if (!selectedInvoice.value || payAmount.value <= 0) return
  paying.value = true
  try {
    await store.payInvoice(selectedInvoice.value.id, { amount: payAmount.value, paymentMethod: 'CASH' })
    toast.success(`Payment recorded`)
    await load()
    goBack()
    await store.fetchCashOnHand()
  } catch (err: any) {
    toast.error(err?.message || 'Payment failed')
  } finally {
    paying.value = false
  }
}

function printInvoice() {
  if (!selectedInvoice.value) return
  window.print()
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="My Invoices" description="Invoices from your direct sales">
      <template #actions>
        <UiButton variant="outline" size="sm" @click="navigateTo('/distributor/sales/new')">
          <DollarSign class="size-4" /> New Sale
        </UiButton>
      </template>
    </PageHeader>

    <div v-if="!showDetail" class="space-y-4">
      <div class="flex flex-col gap-2 sm:flex-row">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <UiInput v-model="search" placeholder="Search invoices..." class="pl-9" />
        </div>
        <UiSelect v-model="statusFilter">
          <UiSelectTrigger class="w-full sm:w-36">
            <UiSelectValue placeholder="Status" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>

      <div v-if="store.loading" class="flex justify-center py-12"><LoadingState /></div>

      <div v-else-if="store.invoices.length === 0" class="text-center py-12 text-sm text-muted-foreground">
        <Receipt class="mx-auto mb-2 size-8 text-muted-foreground/60" />
        <p>No invoices found</p>
      </div>

      <template v-else>
        <div class="hidden sm:block">
          <div class="rounded-lg border">
            <div class="grid grid-cols-12 gap-2 border-b bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground">
              <div class="col-span-3">Invoice</div>
              <div class="col-span-3">Customer</div>
              <div class="col-span-2 text-right">Total</div>
              <div class="col-span-2 text-right">Paid</div>
              <div class="col-span-1">Status</div>
              <div class="col-span-1" />
            </div>
            <div v-for="inv in store.invoices" :key="inv.id"
              class="grid grid-cols-12 gap-2 border-b px-4 py-3 text-sm transition-colors hover:bg-accent/50 cursor-pointer last:border-0 items-center"
              @click="viewDetail(inv)">
              <div class="col-span-3 font-medium truncate">{{ inv.invoiceNumber }}</div>
              <div class="col-span-3 truncate text-muted-foreground">{{ inv.customer?.name || '—' }}</div>
              <div class="col-span-2 text-right font-semibold">{{ inv.totalAmount.toFixed(2) }}</div>
              <div class="col-span-2 text-right text-muted-foreground">{{ inv.paidAmount.toFixed(2) }}</div>
              <div class="col-span-1">
                <UiBadge :variant="statusVariant(inv.status)" class="text-[10px]">{{ inv.status }}</UiBadge>
              </div>
              <div class="col-span-1 flex justify-end">
                <ChevronRight class="size-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-2 sm:hidden">
          <div v-for="inv in store.invoices" :key="inv.id"
            class="rounded-lg border p-4 transition-colors hover:bg-accent/50 cursor-pointer"
            @click="viewDetail(inv)">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium truncate">{{ inv.invoiceNumber }}</p>
              <UiBadge :variant="statusVariant(inv.status)" class="text-[10px]">{{ inv.status }}</UiBadge>
            </div>
            <p class="mt-1 text-xs text-muted-foreground truncate">{{ inv.customer?.name || '—' }}</p>
            <div class="mt-2 flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Total <strong>{{ inv.totalAmount.toFixed(2) }}</strong></span>
              <span class="text-muted-foreground">Paid <strong>{{ inv.paidAmount.toFixed(2) }}</strong></span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div v-else-if="selectedInvoice" class="space-y-6 print-area">
      <div class="flex items-center gap-3 print:hidden">
        <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="goBack">
          <ArrowLeft class="size-4" />
        </UiButton>
        <div>
          <h2 class="text-lg font-semibold">{{ selectedInvoice.invoiceNumber }}</h2>
          <p class="text-sm text-muted-foreground">{{ selectedInvoice.customer?.name || '—' }}</p>
        </div>
        <div class="ml-auto">
          <UiButton variant="outline" size="sm" @click="printInvoice">
            <Printer class="size-4" /> Print
          </UiButton>
        </div>
      </div>

      <div v-if="invoiceDetailLoading" class="flex justify-center py-12"><LoadingState /></div>

      <template v-else>
        <UiCard>
          <UiCardHeader>
            <div class="flex items-center justify-between">
              <div>
                <UiCardTitle class="text-base">{{ selectedInvoice.invoiceNumber }}</UiCardTitle>
                <UiCardDescription>{{ new Date(selectedInvoice.createdAt).toLocaleDateString() }}</UiCardDescription>
              </div>
              <UiBadge :variant="statusVariant(selectedInvoice.status)" class="text-xs print:border print:border-gray-300">
                {{ selectedInvoice.status }}
              </UiBadge>
            </div>
          </UiCardHeader>
          <UiCardContent class="space-y-3 text-sm">
            <div class="flex justify-between"><span class="text-muted-foreground">Customer</span><span>{{ selectedInvoice.customer?.name || '—' }}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Warehouse</span><span>{{ selectedInvoice.warehouse?.name || '—' }}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Sale Source</span><span>{{ selectedInvoice.saleSource || '—' }}</span></div>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader><UiCardTitle class="text-base">Items</UiCardTitle></UiCardHeader>
          <UiCardContent>
            <div class="grid grid-cols-4 gap-2 border-b pb-2 text-xs font-medium text-muted-foreground">
              <span class="col-span-2">Product</span><span class="text-right">Qty</span><span class="text-right">Total</span>
            </div>
            <div v-for="item in (selectedInvoice.items || [])" :key="item.id" class="grid grid-cols-4 gap-2 py-2 text-sm border-b last:border-0">
              <span class="col-span-2 truncate">{{ item.product?.name || item.productId }}</span>
              <span class="text-right">{{ item.quantity.toFixed(1) }}</span>
              <span class="text-right font-medium">{{ item.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between pt-2 text-sm font-semibold">
              <span>Total</span>
              <span>{{ selectedInvoice.totalAmount.toFixed(2) }}</span>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader><UiCardTitle class="text-base">Payments</UiCardTitle></UiCardHeader>
          <UiCardContent>
            <div v-if="!(selectedInvoice.payments && selectedInvoice.payments.length)" class="text-sm text-muted-foreground py-2 text-center">
              No payments recorded
            </div>
            <div v-for="p in (selectedInvoice.payments || [])" :key="p.id" class="flex items-center justify-between border-b py-2 text-sm last:border-0">
              <div>
                <p class="font-medium">{{ p.paymentMethod }}</p>
                <p class="text-xs text-muted-foreground">{{ new Date(p.createdAt).toLocaleDateString() }}</p>
              </div>
              <span class="font-semibold text-green-600">{{ p.amount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between pt-2 text-sm border-t mt-2">
              <span class="text-muted-foreground">Total Paid</span>
              <span class="font-semibold">{{ selectedInvoice.paidAmount.toFixed(2) }}</span>
            </div>
            <div v-if="selectedInvoice.status !== 'PAID'" class="flex justify-between text-sm">
              <span class="text-muted-foreground">Remaining</span>
              <span class="font-semibold text-red-600">{{ (selectedInvoice.totalAmount - selectedInvoice.paidAmount).toFixed(2) }}</span>
            </div>
          </UiCardContent>
        </UiCard>

        <div v-if="selectedInvoice.status !== 'PAID' && selectedInvoice.status !== 'CANCELLED'" class="print:hidden">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="text-base">Collect Payment</UiCardTitle>
              <UiCardDescription>Remaining: {{ (selectedInvoice.totalAmount - selectedInvoice.paidAmount).toFixed(2) }}</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div>
                <UiLabel>Amount</UiLabel>
                <UiInput v-model="payAmount" type="number" min="0" step="0.01" :max="selectedInvoice.totalAmount - selectedInvoice.paidAmount" class="mt-1" />
              </div>
              <UiButton class="w-full" :disabled="paying || payAmount <= 0" @click="handlePay">
                <DollarSign class="size-4" />
                {{ paying ? 'Recording...' : 'Record Payment' }}
              </UiButton>
            </UiCardContent>
          </UiCard>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
@media print {
  .print-area { margin: 0; padding: 0; }
  .print-area .ui-card { break-inside: avoid; border: 1px solid #e5e7eb; }
}
</style>
