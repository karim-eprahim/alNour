<script setup lang="ts">
import { Receipt, Search, ArrowLeft, DollarSign } from '@lucide/vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()
const page = ref(1)
const limit = 20
const showPay = ref(false)
const selectedInvoice = ref<any>(null)
const payAmount = ref(0)
const paying = ref(false)

async function load() {
  await store.fetchInvoices({ page: page.value, limit })
}

watch(page, load)
onMounted(load)

function openPay(inv: any) {
  selectedInvoice.value = inv
  payAmount.value = inv.totalAmount - inv.paidAmount
  showPay.value = true
}

async function handlePay() {
  if (!selectedInvoice.value || payAmount.value <= 0) return
  paying.value = true
  try {
    await store.payInvoice(selectedInvoice.value.id, {
      amount: payAmount.value,
      paymentMethod: 'CASH',
    })
    toast.success(`Payment recorded for ${selectedInvoice.value.invoiceNumber}`)
    showPay.value = false
    await store.fetchCashOnHand()
  } catch (err: any) {
    toast.error(err?.message || 'Payment failed')
  } finally {
    paying.value = false
  }
}

const statusVariant = (s: string) => {
  const map: Record<string, string> = { UNPAID: 'destructive', PARTIAL: 'default', PAID: 'success', CANCELLED: 'secondary' }
  return (map[s] || 'secondary') as any
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Invoices</h1>
        <p class="text-sm text-muted-foreground">Your created invoices</p>
      </div>
    </div>

    <div v-if="store.loading" class="flex justify-center py-12">
      <LoadingState />
    </div>

    <div v-else-if="store.invoices.length === 0" class="text-center py-12 text-sm text-muted-foreground">
      <Receipt class="mx-auto mb-2 size-8 text-muted-foreground/60" />
      <p>No invoices yet</p>
    </div>

    <template v-else-if="!showPay">
      <div class="grid gap-2">
        <div
          v-for="inv in store.invoices"
          :key="inv.id"
          class="rounded-lg border p-4"
        >
          <div class="flex items-center justify-between">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium truncate">{{ inv.invoiceNumber }}</p>
              <p class="text-xs text-muted-foreground truncate">{{ inv.customer?.name }}</p>
            </div>
            <UiBadge :variant="statusVariant(inv.status)" class="text-[10px] shrink-0 ml-2">
              {{ inv.status }}
            </UiBadge>
          </div>
          <div class="mt-2 flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Total: <strong>{{ inv.totalAmount.toFixed(2) }}</strong></span>
            <span class="text-muted-foreground">Paid: <strong>{{ inv.paidAmount.toFixed(2) }}</strong></span>
          </div>
          <div v-if="inv.status !== 'PAID' && inv.status !== 'CANCELLED'" class="mt-2">
            <UiButton size="sm" class="w-full" @click="openPay(inv)">
              <DollarSign class="size-4" /> Collect Payment
            </UiButton>
          </div>
        </div>
      </div>
    </template>

    <div v-else-if="selectedInvoice" class="space-y-6">
      <div class="flex items-center gap-3">
        <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="showPay = false">
          <ArrowLeft class="size-4" />
        </UiButton>
        <div>
          <h2 class="text-lg font-semibold">{{ selectedInvoice.invoiceNumber }}</h2>
          <p class="text-sm text-muted-foreground">{{ selectedInvoice.customer?.name }}</p>
        </div>
      </div>

      <UiCard>
        <UiCardHeader>
          <UiCardTitle class="text-base">Record Payment</UiCardTitle>
          <UiCardDescription>
            Total: {{ selectedInvoice.totalAmount.toFixed(2) }} | Remaining: {{ (selectedInvoice.totalAmount - selectedInvoice.paidAmount).toFixed(2) }}
          </UiCardDescription>
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
  </div>
</template>
