<script setup lang="ts">
import { ArrowLeft, Printer, DollarSign, Receipt, Building2, User, Package } from '@lucide/vue'
import type { DistributorInvoice } from '@/modules/distributor/type'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const route = useRoute()
const store = useDistributorStore()

const invoice = ref<DistributorInvoice | null>(null)
const loading = ref(true)
const payAmount = ref(0)
const paying = ref(false)

async function load() {
  loading.value = true
  try {
    const data: any = await $fetch(`/api/invoices/${route.params.id}`)
    invoice.value = data.invoice || data
    payAmount.value = (invoice.value?.totalAmount || 0) - (invoice.value?.paidAmount || 0)
  } catch (err: any) {
    toast.error('Failed to load invoice')
  } finally {
    loading.value = false
  }
}

onMounted(load)

async function handlePay() {
  if (!invoice.value || payAmount.value <= 0) return
  paying.value = true
  try {
    await store.payInvoice(invoice.value.id, { amount: payAmount.value, paymentMethod: 'CASH' })
    toast.success('Payment recorded')
    await load()
    await store.fetchCashOnHand()
  } catch (err: any) {
    toast.error(err?.message || 'Payment failed')
  } finally {
    paying.value = false
  }
}

function printInvoice() {
  window.print()
}

const statusVariant = (s: string) => {
  const map: Record<string, string> = { UNPAID: 'destructive', PARTIAL: 'default', PAID: 'success', CANCELLED: 'secondary' }
  return (map[s] || 'secondary') as any
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 print:hidden">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/distributor/bills')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <div class="flex-1" />
      <UiButton variant="outline" size="sm" @click="printInvoice">
        <Printer class="size-4" /> Print
      </UiButton>
    </div>

    <div v-if="loading" class="flex justify-center py-12"><LoadingState /></div>

    <template v-else-if="invoice">
      <div class="mx-auto max-w-2xl print-area">
        <UiCard class="border-2">
          <UiCardHeader class="text-center border-b print:border-gray-300">
            <h1 class="text-xl font-bold">Al Nour</h1>
            <p class="text-sm text-muted-foreground">INVOICE</p>
            <p class="text-lg font-semibold mt-1">{{ invoice.invoiceNumber }}</p>
            <p class="text-xs text-muted-foreground">{{ new Date(invoice.createdAt).toLocaleDateString() }}</p>
          </UiCardHeader>
          <UiCardContent class="space-y-4 pt-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-xs text-muted-foreground flex items-center gap-1"><User class="size-3" /> Customer</p>
                <p class="font-medium">{{ invoice.customer?.name || '—' }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-muted-foreground flex items-center gap-1 justify-end"><Building2 class="size-3" /> Warehouse</p>
                <p class="font-medium">{{ invoice.warehouse?.name || '—' }}</p>
              </div>
            </div>

            <div class="rounded-lg border">
              <div class="grid grid-cols-4 gap-2 border-b bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground print:bg-gray-100">
                <span class="col-span-2">Product</span>
                <span class="text-right">Qty</span>
                <span class="text-right">Total</span>
              </div>
              <div v-for="item in (invoice.items || [])" :key="item.id" class="grid grid-cols-4 gap-2 border-b px-3 py-2 text-sm last:border-0">
                <span class="col-span-2 truncate">{{ item.product?.name || item.productId }}</span>
                <span class="text-right">{{ item.quantity.toFixed(1) }}</span>
                <span class="text-right font-medium">{{ item.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between px-3 py-2 text-sm font-semibold border-t">
                <span>Total</span>
                <span>{{ invoice.totalAmount.toFixed(2) }}</span>
              </div>
            </div>

            <div class="rounded-lg border p-3 space-y-2 text-sm">
              <p class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Payment Summary</p>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Paid Amount</span>
                <span class="font-medium text-green-600">{{ invoice.paidAmount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Remaining</span>
                <span class="font-medium" :class="(invoice.totalAmount - invoice.paidAmount) > 0 ? 'text-red-600' : ''">
                  {{ (invoice.totalAmount - invoice.paidAmount).toFixed(2) }}
                </span>
              </div>
              <div class="flex justify-between pt-1 border-t">
                <span class="font-medium">Status</span>
                <UiBadge :variant="statusVariant(invoice.status)">{{ invoice.status }}</UiBadge>
              </div>
            </div>

            <div v-if="invoice.payments && invoice.payments.length" class="rounded-lg border p-3 text-sm">
              <p class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Payments</p>
              <div v-for="p in invoice.payments" :key="p.id" class="flex justify-between border-b py-1.5 last:border-0">
                <div>
                  <span class="font-medium">{{ p.paymentMethod }}</span>
                  <span class="text-xs text-muted-foreground ml-2">{{ new Date(p.createdAt).toLocaleDateString() }}</span>
                </div>
                <span class="font-semibold text-green-600">{{ p.amount.toFixed(2) }}</span>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <div v-if="invoice.status !== 'PAID' && invoice.status !== 'CANCELLED'" class="mt-6 print:hidden">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle class="text-base">Collect Payment</UiCardTitle>
              <UiCardDescription>Remaining: {{ (invoice.totalAmount - invoice.paidAmount).toFixed(2) }}</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div>
                <UiLabel>Amount</UiLabel>
                <UiInput v-model="payAmount" type="number" min="0" step="0.01" :max="invoice.totalAmount - invoice.paidAmount" class="mt-1" />
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
  </div>
</template>

<style>
@media print {
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .print-area { margin: 0 auto; max-width: 100%; }
}
</style>
