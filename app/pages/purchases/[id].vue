<script setup lang="ts">
import { ArrowLeft, FileText, Building2, Warehouse, Scale, Package, CreditCard } from '@lucide/vue'
import { createWeightTicketApi, deleteWeightTicketApi } from '@/modules/purchases/api'
import PageHeader from '~/components/shared/PageHeader.vue'
import {usePurchasesStore} from "@/modules/purchases/store"
import { toast } from 'vue-sonner'


definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'PURCHASES', action: 'READ' },
})

const route = useRoute()
const invoiceId = computed(() => route.params.id as string)

const purchasesStore = usePurchasesStore()
const { can } = usePermissions()

const activeTab = ref('items')
const showPayDialog = ref(false)
const showAddTicketDialog = ref(false)
const payForm = reactive({ amount: null as number | null, description: '' })
const ticketForm = reactive({ ticketNumber: '', grossWeight: null as number | null, tareWeight: null as number | null, carNumber: '' })

async function fetchInvoice() {
  await purchasesStore.fetchPurchase(invoiceId.value)
}

const invoice = computed(() => purchasesStore.currentInvoice)
const dueAmount = computed(() => {
  if (!invoice.value) return 0
  return Number(invoice.value.totalAmount) - Number(invoice.value.paidAmount)
})

async function handlePay() {
  if (!payForm.amount) return
  try {
    await purchasesStore.payInvoice(invoiceId.value, {
      amount: payForm.amount,
      description: payForm.description || undefined,
    })
    showPayDialog.value = false
    payForm.amount = null; payForm.description = ''
    toast.success('Payment recorded')
  } catch {}
}

async function handleAddTicket() {
  if (!ticketForm.ticketNumber || !ticketForm.grossWeight || !ticketForm.tareWeight) return
  try {
    await createWeightTicketApi({
      purchaseInvoiceId: invoiceId.value,
      ticketNumber: ticketForm.ticketNumber,
      grossWeight: ticketForm.grossWeight,
      tareWeight: ticketForm.tareWeight,
      carNumber: ticketForm.carNumber || undefined,
    })
    showAddTicketDialog.value = false
    ticketForm.ticketNumber = ''; ticketForm.grossWeight = null; ticketForm.tareWeight = null; ticketForm.carNumber = ''
    toast.success('Weight ticket added')
    fetchInvoice()
  } catch {}
}

async function handleDeleteTicket(id: string) {
  try {
    await deleteWeightTicketApi(id)
    toast.success('Weight ticket removed')
    fetchInvoice()
  } catch {}
}

onMounted(fetchInvoice)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/purchases')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <div class="flex items-center gap-3">
        <div class="size-9 flex items-center justify-center rounded-lg bg-muted">
          <FileText class="size-4 text-muted-foreground" />
        </div>
        <div>
          <h1 class="text-lg font-semibold font-mono">{{ invoice?.invoiceNumber || 'Loading...' }}</h1>
          <p class="text-xs text-muted-foreground">{{ invoice?.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '' }}</p>
        </div>
      </div>
    </div>

    <div v-if="invoice" class="grid gap-4 sm:grid-cols-4">
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Total Amount</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold">{{ Number(invoice.totalAmount).toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Paid</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold text-green-600">{{ Number(invoice.paidAmount).toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Due</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-2xl font-bold" :class="dueAmount > 0 ? 'text-destructive' : ''">{{ dueAmount.toFixed(2) }}</p>
        </UiCardContent>
      </UiCard>
      <UiCard v-can="{ module: 'PURCHASES', action: 'EDIT' }" class="cursor-pointer hover:bg-accent/50" @click="showPayDialog = true">
        <UiCardHeader class="pb-2">
          <UiCardTitle class="text-sm font-medium text-muted-foreground">Make Payment</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <CreditCard class="size-6 text-muted-foreground" />
        </UiCardContent>
      </UiCard>
    </div>

    <div v-if="invoice" class="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
      <span class="flex items-center gap-1"><Building2 class="size-3.5" /> <NuxtLink :to="`/suppliers/${invoice.supplierId}`" class="hover:underline">{{ invoice.supplier?.name }}</NuxtLink></span>
      <span class="flex items-center gap-1"><Warehouse class="size-3.5" /> {{ invoice.warehouse?.name }}</span>
      <span class="text-xs">Items: {{ invoice.items?.length || 0 }}</span>
      <span class="text-xs">Tickets: {{ invoice.weightTickets?.length || 0 }}</span>
    </div>

    <UiTabs v-model="activeTab" class="space-y-4">
      <UiTabsList>
        <UiTabsTrigger value="items">Items</UiTabsTrigger>
        <UiTabsTrigger value="tickets">Weight Tickets</UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="items">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Invoice Items</UiCardTitle>
            <UiCardDescription>Products in this purchase</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <UiTable>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Product</UiTableHead>
                  <UiTableHead>SKU</UiTableHead>
                  <UiTableHead class="text-right">Quantity</UiTableHead>
                  <UiTableHead class="text-right">Unit Price</UiTableHead>
                  <UiTableHead class="text-right">Total</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="item in invoice?.items" :key="item.id">
                  <UiTableCell>
                    <div class="flex items-center gap-2">
                      <Package class="size-4 text-muted-foreground" />
                      <NuxtLink :to="`/products/${item.productId}`" class="text-sm font-medium hover:underline">{{ item.product?.name }}</NuxtLink>
                    </div>
                  </UiTableCell>
                  <UiTableCell class="text-xs font-mono text-muted-foreground">{{ item.product?.sku }}</UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums">{{ Number(item.quantity).toFixed(3) }}</UiTableCell>
                  <UiTableCell class="text-right tabular-nums">{{ Number(item.unitPrice).toFixed(2) }}</UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums">{{ Number(item.totalPrice).toFixed(2) }}</UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="tickets">
        <UiCard>
          <UiCardHeader class="flex flex-row items-center justify-between">
            <div>
              <UiCardTitle>Weight Tickets</UiCardTitle>
              <UiCardDescription>Load weight records for this invoice</UiCardDescription>
            </div>
            <UiButton v-can="{ module: 'PURCHASES', action: 'EDIT' }" size="sm" variant="outline" @click="showAddTicketDialog = true">
              <Scale class="size-4" /> Add Ticket
            </UiButton>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <div v-if="!invoice?.weightTickets?.length" class="p-6">
              <EmptyState title="No weight tickets" description="Add weight tickets to record load weights" action="Add Ticket" @action="showAddTicketDialog = true" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Ticket #</UiTableHead>
                  <UiTableHead>Car #</UiTableHead>
                  <UiTableHead class="text-right">Gross</UiTableHead>
                  <UiTableHead class="text-right">Tare</UiTableHead>
                  <UiTableHead class="text-right">Net</UiTableHead>
                  <UiTableHead>Date</UiTableHead>
                  <UiTableHead class="w-16 text-right">Action</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="t in invoice?.weightTickets" :key="t.id">
                  <UiTableCell class="text-sm font-mono">{{ t.ticketNumber }}</UiTableCell>
                  <UiTableCell class="text-sm">{{ t.carNumber || '—' }}</UiTableCell>
                  <UiTableCell class="text-right tabular-nums">{{ Number(t.grossWeight).toFixed(3) }}</UiTableCell>
                  <UiTableCell class="text-right tabular-nums">{{ Number(t.tareWeight).toFixed(3) }}</UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums text-primary">{{ Number(t.netWeight).toFixed(3) }}</UiTableCell>
                  <UiTableCell class="text-xs text-muted-foreground">{{ new Date(t.createdAt).toLocaleDateString() }}</UiTableCell>
                  <UiTableCell class="text-right">
                    <UiButton v-if="can('PURCHASES', 'DELETE')" variant="ghost" size="icon-xs" class="text-destructive" @click="handleDeleteTicket(t.id)">
                      <X class="size-3.5" />
                    </UiButton>
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>
    </UiTabs>

    <UiDialog :open="showPayDialog" @update:open="showPayDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Make Payment</UiDialogTitle>
          <UiDialogDescription>Record a payment for this invoice</UiDialogDescription>
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
            <UiButton type="submit" :disabled="purchasesStore.loading">Record Payment</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <UiDialog :open="showAddTicketDialog" @update:open="showAddTicketDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Add Weight Ticket</UiDialogTitle>
          <UiDialogDescription>Record a weight ticket for this invoice</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleAddTicket">
          <div class="space-y-2">
            <UiLabel for="ticket-number">Ticket Number</UiLabel>
            <UiInput id="ticket-number" v-model="ticketForm.ticketNumber" placeholder="WT-001" required />
          </div>
          <div class="space-y-2">
            <UiLabel for="car-number">Car Number</UiLabel>
            <UiInput id="car-number" v-model="ticketForm.carNumber" placeholder="Optional" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="gross">Gross Weight</UiLabel>
              <UiInput id="gross" v-model="ticketForm.grossWeight as number" type="number" step="0.001" placeholder="0.000" required />
            </div>
            <div class="space-y-2">
              <UiLabel for="tare">Tare Weight</UiLabel>
              <UiInput id="tare" v-model="ticketForm.tareWeight as number" type="number" step="0.001" placeholder="0.000" required />
            </div>
          </div>
          <p v-if="ticketForm.grossWeight && ticketForm.tareWeight" class="text-sm text-muted-foreground">
            Net weight: <strong>{{ (ticketForm.grossWeight - ticketForm.tareWeight).toFixed(3) }}</strong>
          </p>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showAddTicketDialog = false">Cancel</UiButton>
            <UiButton type="submit">Add Ticket</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
