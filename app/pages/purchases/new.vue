<script setup lang="ts">
import { Plus, X, Scale, ArrowLeft } from '@lucide/vue'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'
import { fetchSuppliersLookupApi } from '~/modules/suppliers/api'
import { fetchWarehousesLookupApi } from '~/modules/warehouses/api'
import { fetchProductsLookupApi } from '~/modules/products/api'

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
const showWeightTickets = ref(false)

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

const calculatedTotal = computed(() => {
  return form.items.reduce((sum, item) => {
    const qty = item.quantity || 0
    const price = item.unitPrice || 0
    return sum + qty * price
  }, 0)
})

// --- Summary derivations (UI only, reuse existing reactive state) ---
const totalQuantity = computed(() =>
  form.items.reduce((sum, item) => sum + (item.quantity || 0), 0),
)

const paidAmountNumber = computed(() => Number(form.paidAmount) || 0)

const amountDue = computed(() => calculatedTotal.value - paidAmountNumber.value)

const totalNetWeight = computed(() =>
  form.weightTickets.reduce((sum, wt) => {
    if (wt.grossWeight && wt.tareWeight) return sum + (wt.grossWeight - wt.tareWeight)
    return sum
  }, 0),
)

const selectedSupplierName = computed(() => {
  const s = suppliersStore.suppliers.find(s => String(s.id) === String(form.supplierId))
  return s ? `${s.name}${s.company ? ` (${s.company})` : ''}` : '—'
})

const selectedWarehouseName = computed(() => {
  const w = warehousesStore.warehouses.find(w => String(w.id) === String(form.warehouseId))
  return w ? w.name : '—'
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
  <div class="space-y-5">
    <!-- Page header -->
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/purchases')">
        <ArrowLeft class="size-4 rtl:rotate-180" />
      </UiButton>
      <PageHeader title="New Purchase Invoice" description="Create a purchase invoice with items and weight tickets" />
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_330px]">
        <!-- Main column: details + items -->
        <div class="min-w-0 space-y-5">
          <!-- Invoice details (compact grid) -->
          <UiCard>
            <UiCardHeader class="pb-3">
              <UiCardTitle class="text-base">Invoice Details</UiCardTitle>
              <UiCardDescription>Supplier, warehouse, and date information</UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-2">
                  <UiLabel for="supplier">Supplier *</UiLabel>
                  <LookupCombobox v-model="form.supplierId" :endpoint="fetchSuppliersLookupApi" class="max-w-90" />
                </div>
                <div class="space-y-2">
                  <UiLabel for="warehouse">Warehouse *</UiLabel>
                  <LookupCombobox v-model="form.warehouseId" :endpoint="fetchWarehousesLookupApi" placeholder="Select warehouse..." class="max-w-90" />
                </div>
                <div class="space-y-2">
                  <UiLabel for="inv-date">Invoice Date</UiLabel>
                  <UiInput id="inv-date" v-model="form.invoiceDate" type="date" class="max-w-90"/>
                </div>
                <div class="space-y-2">
                  <UiLabel for="paid-amount">Amount Paid</UiLabel>
                  <UiInput id="paid-amount" v-model="form.paidAmount" type="number" step="0.01" placeholder="0.00" class="max-w-90" />
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <!-- Invoice items (primary) -->
          <UiCard>
            <UiCardHeader class="pb-3">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <UiCardTitle class="text-base">Invoice Items</UiCardTitle>
                  <UiCardDescription>Products being purchased</UiCardDescription>
                </div>
                <div class="flex items-center gap-2">
                  <UiButton type="button" variant="outline" size="sm" @click="showWeightTickets = true">
                    <Scale class="size-4" />
                    Weight Tickets{{ form.weightTickets.length > 0 ? ` (${form.weightTickets.length})` : '' }}
                  </UiButton>
                  <UiButton type="button" size="sm" @click="addItem">
                    <Plus class="size-4" /> Add Item
                  </UiButton>
                </div>
              </div>
            </UiCardHeader>
            <UiCardContent class="p-0">
              <div v-if="form.items.length === 0" class="p-6 pt-2">
                <EmptyState title="No items added" description="Add items to this purchase invoice" action="Add Item" @action="addItem" />
              </div>
              <div v-else class="overflow-x-auto">
                <UiTable>
                  <UiTableHeader>
                    <UiTableRow>
                      <UiTableHead class="min-w-45">Product</UiTableHead>
                      <UiTableHead class="w-28">Quantity</UiTableHead>
                      <UiTableHead class="w-32">Unit Price</UiTableHead>
                      <UiTableHead class="w-28 text-end">Total</UiTableHead>
                      <UiTableHead class="w-10"><span class="sr-only">Remove</span></UiTableHead>
                    </UiTableRow>
                  </UiTableHeader>
                  <UiTableBody>
                    <UiTableRow v-for="(item, i) in form.items" :key="i">
                      <UiTableCell class="max-w-90 lg:w-100">
                        <LookupCombobox v-model="item.productId" :endpoint="fetchProductsLookupApi" label-key="_label" placeholder="Product..." class="max-w-90"/>
                      </UiTableCell>
                      <UiTableCell>
                        <UiInput v-model="item.quantity as number" type="number" step="0.001" placeholder="0" class="w-full tabular-nums" />
                      </UiTableCell>
                      <UiTableCell>
                        <UiInput v-model="item.unitPrice as number" type="number" step="0.01" placeholder="0.00" class="w-full tabular-nums" />
                      </UiTableCell>
                      <UiTableCell class="text-end font-medium tabular-nums">
                        {{ ((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2) }}
                      </UiTableCell>
                      <UiTableCell class="text-end">
                        <UiButton type="button" variant="ghost" size="icon-xs" class="text-destructive" @click="removeItem(i)">
                          <X class="size-3.5" />
                          <span class="sr-only">Remove item</span>
                        </UiButton>
                      </UiTableCell>
                    </UiTableRow>
                  </UiTableBody>
                </UiTable>
              </div>
            </UiCardContent>
            <UiCardFooter v-if="form.items.length > 0" class="border-t px-4 py-3">
              <div class="flex w-full items-center justify-between">
                <p class="text-sm text-muted-foreground">{{ form.items.length }} item{{ form.items.length !== 1 ? 's' : '' }}</p>
                <div class="text-end">
                  <p class="text-xs text-muted-foreground">Total Amount</p>
                  <p class="text-xl font-bold tabular-nums">{{ calculatedTotal.toFixed(2) }}</p>
                </div>
              </div>
            </UiCardFooter>
          </UiCard>

          <!-- Form actions -->
          <div class="flex justify-end gap-3">
            <UiButton type="button" variant="outline" @click="navigateTo('/purchases')">Cancel</UiButton>
            <UiButton type="submit" :disabled="saving || !form.supplierId || !form.warehouseId || form.items.length === 0">
              {{ saving ? 'Creating...' : 'Create Invoice' }}
            </UiButton>
          </div>
        </div>

        <!-- Sticky summary -->
        <aside class="min-w-0 lg:sticky lg:top-20">
          <UiCard>
            <UiCardHeader class="pb-3">
              <UiCardTitle class="text-base">Invoice Summary</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="space-y-4 text-sm">
              <div class="space-y-2.5">
                <div>
                  <p class="text-xs text-muted-foreground">Supplier</p>
                  <p class="truncate font-medium">{{ selectedSupplierName }}</p>
                </div>
                <div>
                  <p class="text-xs text-muted-foreground">Warehouse</p>
                  <p class="truncate font-medium">{{ selectedWarehouseName }}</p>
                </div>
                <div>
                  <p class="text-xs text-muted-foreground">Invoice Date</p>
                  <p class="font-medium tabular-nums">{{ form.invoiceDate || '—' }}</p>
                </div>
              </div>

              <UiSeparator />

              <dl class="space-y-2">
                <div class="flex items-center justify-between">
                  <dt class="text-muted-foreground">Items</dt>
                  <dd class="font-medium tabular-nums">{{ form.items.length }}</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-muted-foreground">Total Quantity</dt>
                  <dd class="font-medium tabular-nums">{{ totalQuantity }}</dd>
                </div>
              </dl>

              <UiSeparator />

              <dl class="space-y-2">
                <div class="flex items-center justify-between">
                  <dt class="text-muted-foreground">Subtotal</dt>
                  <dd class="font-medium tabular-nums">{{ calculatedTotal.toFixed(2) }}</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-muted-foreground">Amount Paid</dt>
                  <dd class="font-medium tabular-nums">{{ paidAmountNumber.toFixed(2) }}</dd>
                </div>
                <div class="flex items-center justify-between pt-1">
                  <dt class="font-semibold">Amount Due</dt>
                  <dd class="text-lg font-bold text-primary tabular-nums">{{ amountDue.toFixed(2) }}</dd>
                </div>
              </dl>

              <UiSeparator />

              <button
                type="button"
                class="flex w-full items-center justify-between rounded-md px-1 py-0.5 text-start transition-colors hover:bg-muted/60"
                @click="showWeightTickets = true"
              >
                <span class="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Scale class="size-3.5" /> Weight Tickets
                </span>
                <span class="font-medium tabular-nums">
                  {{ form.weightTickets.length }}{{ totalNetWeight > 0 ? ` · ${totalNetWeight.toFixed(3)}` : '' }}
                </span>
              </button>
            </UiCardContent>
          </UiCard>
        </aside>
      </div>
    </form>

    <!-- Weight tickets modal -->
    <UiDialog :open="showWeightTickets" @update:open="showWeightTickets = $event">
      <UiDialogContent class="sm:max-w-lg">
        <UiDialogHeader>
          <UiDialogTitle>Weight Tickets</UiDialogTitle>
          <UiDialogDescription>Record load weights for raw materials</UiDialogDescription>
        </UiDialogHeader>

        <div class="max-h-[50vh] space-y-3 overflow-y-auto pe-0.5">
          <p v-if="form.weightTickets.length === 0" class="py-4 text-center text-sm text-muted-foreground">
            No weight tickets yet. Add one to record a load.
          </p>
          <div v-for="(wt, i) in form.weightTickets" :key="i" class="space-y-2 rounded-lg border p-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-medium text-muted-foreground">Ticket #{{ i + 1 }}</span>
              <UiButton type="button" variant="ghost" size="icon-xs" class="text-destructive" @click="removeWeightTicket(i)">
                <X class="size-3.5" />
                <span class="sr-only">Remove ticket</span>
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
              Net: <strong class="tabular-nums">{{ (wt.grossWeight - wt.tareWeight).toFixed(3) }}</strong>
            </p>
          </div>
          <UiButton type="button" variant="outline" size="sm" class="w-full" @click="addWeightTicket">
            <Scale class="size-4" /> Add Weight Ticket
          </UiButton>
        </div>

        <UiDialogFooter>
          <div class="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p v-if="form.weightTickets.length > 0" class="text-xs text-muted-foreground tabular-nums">
              Total net: <strong>{{ totalNetWeight.toFixed(3) }}</strong>
            </p>
            <span v-else />
            <UiButton type="button" @click="showWeightTickets = false">Done</UiButton>
          </div>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
