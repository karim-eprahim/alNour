<script setup lang="ts">
import { Scale, Truck } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'PURCHASES', action: 'READ' },
})

const tickets = ref<any[]>([])
const loading = ref(false)
const total = ref(0)

async function fetchTickets() {
  loading.value = true
  try {
    const data = await $fetch('/api/purchases/weight-tickets', { params: { limit: 50 } })
    tickets.value = data.tickets
    total.value = data.total
  } finally {
    loading.value = false
  }
}

onMounted(fetchTickets)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Weight Tickets" description="All weight ticket records across purchases">
      <template #actions>
        <UiButton variant="outline" @click="fetchTickets">
          <Scale class="size-4" /> Refresh
        </UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardContent class="p-0">
        <div v-if="loading && tickets.length === 0" class="p-6">
          <LoadingState />
        </div>
        <div v-else-if="tickets.length === 0" class="p-6">
          <EmptyState title="No weight tickets" description="Weight tickets will appear once added to purchase invoices" />
        </div>
        <UiTable v-else>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Ticket #</UiTableHead>
              <UiTableHead>Invoice</UiTableHead>
              <UiTableHead>Supplier</UiTableHead>
              <UiTableHead>Car #</UiTableHead>
              <UiTableHead class="text-right">Gross</UiTableHead>
              <UiTableHead class="text-right">Tare</UiTableHead>
              <UiTableHead class="text-right">Net</UiTableHead>
              <UiTableHead>Date</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="t in tickets" :key="t.id">
              <UiTableCell class="text-sm font-mono font-medium">{{ t.ticketNumber }}</UiTableCell>
              <UiTableCell>
                <NuxtLink :to="`/purchases/${t.purchaseInvoiceId}`" class="text-sm hover:underline">{{ t.invoice?.invoiceNumber }}</NuxtLink>
              </UiTableCell>
              <UiTableCell class="text-sm">{{ t.invoice?.supplier?.name }}</UiTableCell>
              <UiTableCell class="text-sm">{{ t.carNumber || '—' }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ Number(t.grossWeight).toFixed(3) }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ Number(t.tareWeight).toFixed(3) }}</UiTableCell>
              <UiTableCell class="text-right font-medium tabular-nums text-primary">{{ Number(t.netWeight).toFixed(3) }}</UiTableCell>
              <UiTableCell class="text-xs text-muted-foreground">{{ new Date(t.createdAt).toLocaleDateString() }}</UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
    </UiCard>
  </div>
</template>
