<script setup lang="ts">
import { Plus, X, Scale, ArrowLeft, Package } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'


definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'PURCHASES', action: 'CREATE' },
})

const purchasesStore = usePurchasesStore()
const suppliersStore = useSuppliersStore()
const warehousesStore = useWarehousesStore()
const productsStore = useProductsStore()

const saving = ref(false)

const form = reactive({
  supplierId: '',
  warehouseId: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  paidAmount: 0,
  items: [] as { productId: string; quantity: number | null; unitPrice: number | null }[],
  weightTickets: [] as { ticketNumber: string; grossWeight: number | null; tareWeight: number | null; carNumber: string }[],
})

function addItem() {
  form.items.push({ productId: '', quantity: null, unitPrice: null })
}

function removeItem(index: number) {
  form.items.splice(index, 1)
}

function addWeightTicket() {
  form.weightTickets.push({ ticketNumber: '', grossWeight: null, tareWeight: null, carNumber: '' })
}

function removeWeightTicket(index: number) {
  form.weightTickets.splice(index, 1)
}

const supplierItems = computed(() =>
  suppliersStore.suppliers.map(s => ({ ...s, _label: `${s.name}${s.company ? ` (${s.company})` : ''}` }))
)

const purchaseProductItems = computed(() =>
  productsStore.products.map(p => ({ ...p, _label: `${p.name} (${p.sku})` }))
)

const calculatedTotal = computed(() => {
  return form.items.reduce((sum, item) => {
    const qty = item.quantity || 0
    const price = item.unitPrice || 0
    return sum + qty * price
  }, 0)
})

async function handleSubmit() {
  if (!form.supplierId || !form.warehouseId || form.items.length === 0) return

  saving.value = true
  try {
    const invoice = await purchasesStore.createPurchase({
      supplierId: form.supplierId,
      warehouseId: form.warehouseId,
      invoiceDate: form.invoiceDate || undefined,
      paidAmount: form.paidAmount || 0,
      items: form.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity || 0,
        unitPrice: i.unitPrice || 0,
      })),
    })

    console.log("thi ersdofe",invoice)

    if (form.weightTickets.length > 0) {
      for (const wt of form.weightTickets) {
        if (wt.ticketNumber && wt.grossWeight && wt.tareWeight) {
          await $fetch('/api/purchases/weight-tickets', {
            method: 'POST',
            body: {
              purchaseInvoiceId: invoice.id,
              ticketNumber: wt.ticketNumber,
              grossWeight: wt.grossWeight,
              tareWeight: wt.tareWeight,
              carNumber: wt.carNumber || undefined,
            },
          })
        }
      }
    }

    toast.success(`Invoice ${invoice.invoiceNumber} created`)
    navigateTo(`/purchases/${invoice.id}`)
  } catch (err) {
    toast.error('Failed to create invoice')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    suppliersStore.fetchSuppliers(),
    warehousesStore.fetchWarehouses(),
    productsStore.fetchProducts(),
  ])
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/purchases')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader title="New Purchase Invoice" description="Create a purchase invoice with items and weight tickets" />
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="grid gap-6 lg:grid-cols-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Invoice Details</UiCardTitle>
            <UiCardDescription>Supplier, warehouse, and date information</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div class="space-y-2">
              <UiLabel for="supplier">Supplier *</UiLabel>
              <LookupCombobox v-model="form.supplierId" :items="supplierItems" label-key="_label" placeholder="Select supplier..." />
            </div>
            <div class="space-y-2">
              <UiLabel for="warehouse">Warehouse *</UiLabel>
              <LookupCombobox v-model="form.warehouseId" :items="warehousesStore.warehouses" placeholder="Select warehouse..." />
            </div>
            <div class="space-y-2">
              <UiLabel for="inv-date">Invoice Date</UiLabel>
              <UiInput id="inv-date" v-model="form.invoiceDate" type="date" />
            </div>
            <div class="space-y-2">
              <UiLabel for="paid-amount">Amount Paid</UiLabel>
              <UiInput id="paid-amount" v-model="form.paidAmount" type="number" step="0.01" placeholder="0.00" />
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Weight Tickets</UiCardTitle>
            <UiCardDescription>Record load weights for raw materials</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-3">
            <div v-for="(wt, i) in form.weightTickets" :key="i" class="rounded-lg border p-3 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-muted-foreground">Ticket #{{ i + 1 }}</span>
                <UiButton type="button" variant="ghost" size="icon-xs" class="text-destructive" @click="removeWeightTicket(i)">
                  <X class="size-3.5" />
                </UiButton>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <UiLabel class="text-xs">Ticket #</UiLabel>
                  <UiInput v-model="wt.ticketNumber" placeholder="WT-001" />
                </div>
                <div class="space-y-1">
                  <UiLabel class="text-xs">Car #</UiLabel>
                  <UiInput v-model="wt.carNumber" placeholder="Car plate" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <UiLabel class="text-xs">Gross Weight</UiLabel>
                  <UiInput v-model="wt.grossWeight as number" type="number" step="0.001" placeholder="0.000" />
                </div>
                <div class="space-y-1">
                  <UiLabel class="text-xs">Tare Weight</UiLabel>
                  <UiInput v-model="wt.tareWeight as number" type="number" step="0.001" placeholder="0.000" />
                </div>
              </div>
              <p v-if="wt.grossWeight && wt.tareWeight" class="text-xs text-muted-foreground">
                Net: <strong>{{ (wt.grossWeight - wt.tareWeight).toFixed(3) }}</strong>
              </p>
            </div>
            <UiButton type="button" variant="outline" size="sm" class="w-full" @click="addWeightTicket">
              <Scale class="size-4" /> Add Weight Ticket
            </UiButton>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard class="mt-6">
        <UiCardHeader class="flex flex-row items-center justify-between">
          <div>
            <UiCardTitle>Invoice Items</UiCardTitle>
            <UiCardDescription>Products being purchased</UiCardDescription>
          </div>
          <UiButton type="button" variant="outline" size="sm" @click="addItem">
            <Plus class="size-4" /> Add Item
          </UiButton>
        </UiCardHeader>
        <UiCardContent class="p-0">
          <div v-if="form.items.length === 0" class="p-6">
            <EmptyState title="No items added" description="Add items to this purchase invoice" action="Add Item" @action="addItem" />
          </div>
          <UiTable v-else>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead class="w-8" />
                <UiTableHead>Product</UiTableHead>
                <UiTableHead class="text-right">Quantity</UiTableHead>
                <UiTableHead class="text-right">Unit Price</UiTableHead>
                <UiTableHead class="text-right">Total</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-for="(item, i) in form.items" :key="i">
                <UiTableCell>
                  <UiButton type="button" variant="ghost" size="icon-xs" class="text-destructive" @click="removeItem(i)">
                    <X class="size-3.5" />
                  </UiButton>
                </UiTableCell>
                <UiTableCell>
                  <LookupCombobox v-model="item.productId" :items="purchaseProductItems" label-key="_label" placeholder="Product..." class="w-56" />
                </UiTableCell>
                <UiTableCell>
                  <UiInput v-model="item.quantity as number" type="number" step="0.001" placeholder="0" class="w-24 text-right" />
                </UiTableCell>
                <UiTableCell>
                  <UiInput v-model="item.unitPrice as number" type="number" step="0.01" placeholder="0.00" class="w-24 text-right" />
                </UiTableCell>
                <UiTableCell class="text-right font-medium tabular-nums">
                  {{ ((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2) }}
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </UiCardContent>
        <UiCardFooter v-if="form.items.length > 0" class="border-t px-4 py-3">
          <div class="flex items-center justify-between w-full">
            <p class="text-sm text-muted-foreground">{{ form.items.length }} item{{ form.items.length !== 1 ? 's' : '' }}</p>
            <div class="text-right">
              <p class="text-xs text-muted-foreground">Total Amount</p>
              <p class="text-xl font-bold">{{ calculatedTotal.toFixed(2) }}</p>
            </div>
          </div>
        </UiCardFooter>
      </UiCard>

      <div class="flex justify-end gap-3 mt-6">
        <UiButton type="button" variant="outline" @click="navigateTo('/purchases')">Cancel</UiButton>
        <UiButton type="submit" :disabled="saving || !form.supplierId || !form.warehouseId || form.items.length === 0">
          {{ saving ? 'Creating...' : 'Create Invoice' }}
        </UiButton>
      </div>
    </form>
  </div>
</template>
