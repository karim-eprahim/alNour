<script setup lang="ts">
import { DollarSign, Wallet, ArrowUpRight, ArrowDownLeft, History } from '@lucide/vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()
const movementsPage = ref(1)

async function load() {
  await Promise.all([
    store.fetchCashOnHand(),
    store.fetchCashMovements({ page: movementsPage.value, limit: 50 }),
  ])
}

watch(movementsPage, load)
onMounted(load)

const movementTypeIcon = (type: string) => {
  switch (type) {
    case 'PAYMENT_COLLECTED': return ArrowDownLeft
    case 'CASH_HANDOVER': return ArrowUpRight
    default: return History
  }
}

const movementTypeLabel = (type: string) => {
  switch (type) {
    case 'PAYMENT_COLLECTED': return 'Payment Collected'
    case 'CASH_HANDOVER': return 'Cash Handover'
    case 'ADJUSTMENT': return 'Adjustment'
    default: return type
  }
}

const movementTypeColor = (type: string) => {
  switch (type) {
    case 'PAYMENT_COLLECTED': return 'text-green-600'
    case 'CASH_HANDOVER': return 'text-red-600'
    default: return 'text-muted-foreground'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">Payments</h1>
        <p class="text-sm text-muted-foreground">Your cash and payment history</p>
      </div>
    </div>

    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2">
        <div>
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Cash On Hand</UiCardTitle>
        </div>
        <Wallet class="size-5 text-green-500" />
      </UiCardHeader>
      <UiCardContent>
        <p class="text-3xl font-bold text-green-600">{{ store.cashOnHand.toFixed(2) }}</p>
      </UiCardContent>
    </UiCard>

    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="text-base">Cash Movements</UiCardTitle>
        <UiCardDescription>History of all cash transactions</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div v-if="store.loading" class="flex justify-center py-8">
          <LoadingState />
        </div>

        <div v-else-if="store.cashMovements.length === 0" class="text-center py-8 text-sm text-muted-foreground">
          <History class="mx-auto mb-2 size-6 text-muted-foreground/60" />
          <p>No cash movements yet</p>
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="m in store.cashMovements"
            :key="m.id"
            class="flex items-center justify-between rounded-lg border p-3"
          >
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <component :is="movementTypeIcon(m.type)" :class="['size-5 shrink-0', movementTypeColor(m.type)]" />
              <div class="min-w-0">
                <p class="text-sm font-medium truncate">{{ movementTypeLabel(m.type) }}</p>
                <p v-if="m.notes" class="text-xs text-muted-foreground truncate">{{ m.notes }}</p>
                <p class="text-[10px] text-muted-foreground/60">{{ new Date(m.createdAt).toLocaleDateString() }}</p>
              </div>
            </div>
            <span :class="['text-sm font-semibold shrink-0 ml-2', m.type === 'CASH_HANDOVER' ? 'text-red-600' : 'text-green-600']">
              {{ m.type === 'CASH_HANDOVER' ? '-' : '+' }}{{ m.amount.toFixed(2) }}
            </span>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>
