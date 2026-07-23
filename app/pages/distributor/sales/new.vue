<script setup lang="ts">
import { Search, Plus, X, Check, CreditCard, ShoppingCart, ArrowLeft, DollarSign, ChevronRight, ChevronLeft, Package, User } from '@lucide/vue'
import type { LookupQuery, LookupResponse } from '@/types/lookup'
import type { DistributorCustodyItem } from '@/modules/distributor/type'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()

const isMobile = ref(false)
function checkMobile() {
  isMobile.value = window.innerWidth < 640
}
onMounted(() => { checkMobile(); window.addEventListener('resize', checkMobile) })
onUnmounted(() => window.removeEventListener('resize', checkMobile))

const step = ref(1)

const customerSearch = ref('')
const customerResults = ref<{ value: string; label: string }[]>([])
const customerLoading = ref(false)
const selectedCustomer = ref<{ value: string; label: string } | null>(null)

const warehouseId = ref('')
const warehouseLoading = ref(false)
const custodyItems = ref<DistributorCustodyItem[]>([])

const saleItems = ref<{ productId: string; productName: string; availableQty: number; quantity: number | null; unitPrice: number | null }[]>([])

const totalAmount = computed(() => saleItems.value.reduce((s, i) => s + (i.quantity || 0) * (i.unitPrice || 0), 0))

const paymentOption = ref<'paid' | 'partial' | 'unpaid'>('paid')
const paidAmount = ref(0)
const paymentMethod = ref('CASH')
const paymentNotes = ref('')

const saving = ref(false)
const createdInvoice = ref<any>(null)

function debounce<T extends (...args: any[]) => any>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

const searchCustomers = debounce(async (q: string) => {
  if (q.length < 2) { customerResults.value = []; return }
  customerLoading.value = true
  try {
    const data: LookupResponse = await $fetch('/api/customers/lookup', { params: { q, take: 20 } })
    customerResults.value = data.items
  } finally { customerLoading.value = false }
}, 300)

function selectCustomer(c: { value: string; label: string }) {
  selectedCustomer.value = c
  customerSearch.value = c.label
  customerResults.value = []
  loadCustody()
}

async function loadCustody() {
  await store.fetchCustody()
  if (store.custodies.length > 0) {
    custodyItems.value = store.custodies
    if (!warehouseId.value) {
      warehouseId.value = store.custodies[0].product?.name || ''
    }
  }
}

function addItem() {
  saleItems.value.push({ productId: '', productName: '', availableQty: 0, quantity: null, unitPrice: null })
}

function removeItem(index: number) {
  saleItems.value.splice(index, 1)
}

function selectProduct(index: number, productId: string) {
  const custody = custodyItems.value.find((c) => c.productId === productId)
  if (custody) {
    saleItems.value[index].productId = custody.productId
    saleItems.value[index].productName = custody.product.name
    saleItems.value[index].availableQty = custody.quantity
    if (!saleItems.value[index].unitPrice) {
      saleItems.value[index].unitPrice = custody.product.sellingPrice ? Number(custody.product.sellingPrice) : null
    }
  }
}

const itemErrors = computed(() => {
  return saleItems.value.map((item, idx) => {
    if (!item.productId) return 'Select a product'
    if (!item.quantity || item.quantity <= 0) return 'Enter quantity'
    if (item.quantity > item.availableQty) return `Only ${item.availableQty.toFixed(1)} available in custody`
    if (!item.unitPrice || item.unitPrice <= 0) return 'Enter a valid price'
    return null
  })
})

const canProceed = computed(() => {
  switch (step.value) {
    case 1: return !!selectedCustomer.value
    case 2: return saleItems.value.length > 0 && itemErrors.value.every((e) => e === null)
    case 3: return paymentOption.value === 'unpaid' || (paidAmount.value > 0)
    case 4: return true
    default: return false
  }
})

function nextStep() {
  if (step.value < 4 && canProceed.value) step.value++
}

function prevStep() {
  if (step.value > 1) step.value--
}

function goToStep(s: number) {
  if (s < step.value) { step.value = s; return }
  for (let i = step.value; i < s; i++) {
    if (i === 1 && !selectedCustomer.value) return
    if (i === 2 && (!saleItems.value.length || itemErrors.value.some((e) => e !== null))) return
    if (i === 3 && paymentOption.value !== 'unpaid' && paidAmount.value <= 0) return
  }
  step.value = s
}

const finalPaidAmount = computed(() => {
  if (paymentOption.value === 'paid') return totalAmount.value
  if (paymentOption.value === 'partial') return Math.min(paidAmount.value || 0, totalAmount.value)
  return 0
})

const finalPaymentMethod = computed(() => {
  if (finalPaidAmount.value <= 0) return undefined
  return paymentMethod.value
})

async function handleCreate() {
  if (!selectedCustomer.value || saleItems.value.length === 0) return
  saving.value = true
  try {
    const invoice = await store.createDirectSale({
      customerId: selectedCustomer.value.value,
      warehouseId: warehouseId.value || undefined as any,
      paidAmount: finalPaidAmount.value || 0,
      paymentMethod: finalPaymentMethod.value,
      items: saleItems.value.map((i) => ({
        productId: i.productId,
        quantity: i.quantity || 0,
        unitPrice: i.unitPrice || 0,
      })),
    })
    createdInvoice.value = invoice
    toast.success(`Invoice ${invoice.invoiceNumber} created successfully`)
  } catch (err: any) {
    toast.error(err?.message || 'Failed to create sale')
  } finally {
    saving.value = false
  }
}

const steps = [
  { num: 1, label: 'Customer', icon: User },
  { num: 2, label: 'Products', icon: Package },
  { num: 3, label: 'Payment', icon: DollarSign },
  { num: 4, label: 'Review', icon: Check },
]

onMounted(() => {
  store.fetchCustody()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">New Sale</h1>
        <p v-if="!createdInvoice" class="text-sm text-muted-foreground">Create a new direct sale invoice</p>
      </div>
    </div>

    <div v-if="createdInvoice" class="space-y-6">
      <UiCard class="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <UiCardContent class="flex flex-col items-center py-10 text-center">
          <div class="mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Check class="size-7 text-green-600 dark:text-green-400" />
          </div>
          <h2 class="text-xl font-semibold">Invoice Created!</h2>
          <p class="mt-1 text-sm text-muted-foreground">{{ createdInvoice.invoiceNumber }}</p>
          <p class="mt-1 text-sm font-medium">Total: {{ createdInvoice.totalAmount.toFixed(2) }} | Paid: {{ createdInvoice.paidAmount.toFixed(2) }}</p>
          <div class="mt-6 flex gap-3">
            <UiButton variant="outline" @click="navigateTo('/distributor/bills')">View Invoices</UiButton>
            <UiButton @click="navigateTo('/distributor/sales/new')">New Sale</UiButton>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <template v-else>
      <div class="hidden sm:flex items-center gap-1 mb-6">
        <div v-for="(s, i) in steps" :key="s.num" class="flex items-center">
          <div class="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm cursor-pointer"
            :class="step === s.num ? 'bg-primary text-primary-foreground font-medium' : step > s.num ? 'text-primary font-medium' : 'text-muted-foreground'"
            @click="goToStep(s.num)">
            <component :is="s.icon" class="size-4" />
            <span>{{ s.label }}</span>
          </div>
          <ChevronRight v-if="i < steps.length - 1" class="size-4 text-muted-foreground/40 mx-1" />
        </div>
      </div>

      <div class="sm:hidden mb-6">
        <div class="flex items-center justify-between mb-2">
          <UiButton variant="ghost" size="sm" :disabled="step === 1" @click="prevStep">
            <ArrowLeft class="size-4" /> Back
          </UiButton>
          <span class="text-sm font-medium text-muted-foreground">Step {{ step }} of 4</span>
          <UiButton variant="ghost" size="sm" :disabled="!canProceed" @click="nextStep">
            Next <ChevronRight class="size-4" />
          </UiButton>
        </div>
        <div class="flex gap-1">
          <div v-for="s in steps" :key="s.num" class="h-1.5 flex-1 rounded-full transition-colors"
            :class="s.num <= step ? 'bg-primary' : 'bg-muted'" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div :class="['space-y-4', { 'sm:col-span-2 lg:col-span-3': step !== 1 && isMobile }]">
          <UiCard v-show="!isMobile || step === 1">
            <UiCardHeader>
              <UiCardTitle class="flex items-center gap-2 text-base"><User class="size-4" /> Customer</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="space-y-3">
              <div v-if="!selectedCustomer">
                <div class="relative">
                  <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <UiInput v-model="customerSearch" placeholder="Search customers..." class="pl-9" @input="searchCustomers(customerSearch)" />
                </div>
                <div v-if="customerLoading" class="mt-2 text-sm text-muted-foreground">Searching...</div>
                <div v-else-if="customerResults.length" class="mt-2 space-y-1 max-h-48 overflow-y-auto">
                  <button v-for="c in customerResults" :key="c.value"
                    class="w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
                    @click="selectCustomer(c)">{{ c.label }}</button>
                </div>
              </div>
              <div v-else class="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p class="text-sm font-medium">{{ selectedCustomer.label }}</p>
                </div>
                <UiButton variant="ghost" size="sm" @click="selectedCustomer = null; customerSearch = ''">Change</UiButton>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <div :class="{ 'sm:col-span-2 lg:col-span-3': step !== 2 && isMobile }">
          <UiCard v-show="!isMobile || step === 2">
            <UiCardHeader>
              <UiCardTitle class="flex items-center gap-2 text-base"><Package class="size-4" /> Products</UiCardTitle>
              <UiCardDescription>Select products from your custody</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-3">
              <div v-if="custodyItems.length === 0" class="text-center py-4 text-sm text-muted-foreground">
                <Package class="mx-auto mb-2 size-6 text-muted-foreground/60" />
                <p>No products in your custody</p>
              </div>

              <div v-for="(item, idx) in saleItems" :key="idx" class="space-y-2 rounded-lg border p-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-medium text-muted-foreground">Item {{ idx + 1 }}</span>
                  <UiButton variant="ghost" size="icon" class="size-6" @click="removeItem(idx)">
                    <X class="size-3.5" />
                  </UiButton>
                </div>
                <div class="grid grid-cols-1 gap-2 sm:grid-cols-4">
                  <div class="sm:col-span-2">
                    <UiLabel class="text-xs">Product</UiLabel>
                    <UiSelect :model-value="item.productId" @update:model-value="selectProduct(idx, $event)">
                      <UiSelectTrigger class="mt-0.5">
                        <UiSelectValue placeholder="Select product" />
                      </UiSelectTrigger>
                      <UiSelectContent>
                        <UiSelectItem v-for="c in custodyItems" :key="c.productId" :value="c.productId">
                          {{ c.product.name }} ({{ c.quantity.toFixed(1) }} available)
                        </UiSelectItem>
                      </UiSelectContent>
                    </UiSelect>
                  </div>
                  <div>
                    <UiLabel class="text-xs">Qty</UiLabel>
                    <UiInput v-model="item.quantity" type="number" min="0" :max="item.availableQty" step="0.001" placeholder="0" class="mt-0.5" />
                  </div>
                  <div>
                    <UiLabel class="text-xs">Price</UiLabel>
                    <UiInput v-model="item.unitPrice" type="number" min="0" step="0.01" placeholder="0.00" class="mt-0.5" />
                  </div>
                </div>
                <p v-if="item.quantity !== null && item.quantity > item.availableQty" class="text-xs text-red-500">
                  Only {{ item.availableQty.toFixed(1) }} available in custody
                </p>
                <p v-if="item.productId && item.quantity && item.unitPrice" class="text-xs text-muted-foreground text-right">
                  Subtotal: {{ (item.quantity * item.unitPrice).toFixed(2) }}
                </p>
              </div>

              <UiButton variant="outline" size="sm" class="w-full" @click="addItem">
                <Plus class="size-4" /> Add Product
              </UiButton>
            </UiCardContent>
          </UiCard>
        </div>

        <div :class="{ 'sm:col-span-2 lg:col-span-3': step !== 3 && isMobile }">
          <UiCard v-show="!isMobile || step === 3">
            <UiCardHeader>
              <UiCardTitle class="flex items-center gap-2 text-base"><DollarSign class="size-4" /> Payment</UiCardTitle>
              <UiCardDescription>Set payment amount and method</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div class="flex flex-wrap gap-2">
                <UiButton
                  :variant="paymentOption === 'paid' ? 'default' : 'outline'"
                  size="sm" @click="paymentOption = 'paid'"
                >Paid ({{ totalAmount.toFixed(2) }})</UiButton>
                <UiButton
                  :variant="paymentOption === 'partial' ? 'default' : 'outline'"
                  size="sm" @click="paymentOption = 'partial'"
                >Partial</UiButton>
                <UiButton
                  :variant="paymentOption === 'unpaid' ? 'default' : 'outline'"
                  size="sm" @click="paymentOption = 'unpaid'"
                >Unpaid (0.00)</UiButton>
              </div>

              <div v-if="paymentOption === 'partial'">
                <UiLabel>Amount</UiLabel>
                <UiInput v-model="paidAmount" type="number" min="0" :max="totalAmount" step="0.01" placeholder="Enter amount" class="mt-1" />
                <p class="mt-1 text-xs text-muted-foreground">Max: {{ totalAmount.toFixed(2) }} | Remaining: {{ (totalAmount - (paidAmount || 0)).toFixed(2) }}</p>
              </div>

              <div v-if="paymentOption !== 'unpaid'">
                <UiLabel>Payment Method</UiLabel>
                <UiSelect v-model="paymentMethod">
                  <UiSelectTrigger class="mt-1">
                    <UiSelectValue />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem value="CASH">Cash</UiSelectItem>
                    <UiSelectItem value="BANK_TRANSFER">Bank Transfer</UiSelectItem>
                    <UiSelectItem value="CHECK">Check</UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>

              <div>
                <UiLabel>Notes (optional)</UiLabel>
                <UiInput v-model="paymentNotes" placeholder="Payment notes" class="mt-1" />
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <div :class="{ 'sm:col-span-2 lg:col-span-3': step !== 4 && isMobile }">
          <UiCard v-show="!isMobile || step === 4">
            <UiCardHeader>
              <UiCardTitle class="flex items-center gap-2 text-base"><Check class="size-4" /> Review</UiCardTitle>
              <UiCardDescription>Review the sale before creating the invoice</UiCardDescription>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div class="rounded-lg border p-3">
                <p class="text-xs text-muted-foreground">Customer</p>
                <p class="text-sm font-medium">{{ selectedCustomer?.label }}</p>
              </div>

              <div class="rounded-lg border">
                <div class="grid grid-cols-4 gap-2 border-b bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground">
                  <span class="col-span-2">Product</span>
                  <span class="text-right">Qty</span>
                  <span class="text-right">Total</span>
                </div>
                <div v-for="(item, idx) in saleItems" :key="idx" class="grid grid-cols-4 gap-2 border-b px-3 py-2 text-sm last:border-0">
                  <span class="col-span-2 truncate">{{ item.productName || '—' }}</span>
                  <span class="text-right">{{ (item.quantity || 0).toFixed(1) }}</span>
                  <span class="text-right font-medium">{{ ((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2) }}</span>
                </div>
                <div class="flex justify-between border-t px-3 py-2 text-sm font-semibold">
                  <span>Total</span>
                  <span>{{ totalAmount.toFixed(2) }}</span>
                </div>
              </div>

              <div class="rounded-lg border p-3 space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">Payment</span>
                  <span>{{ paymentOption === 'paid' ? 'Paid in Full' : paymentOption === 'partial' ? 'Partial' : 'Unpaid' }}</span>
                </div>
                <div v-if="finalPaidAmount > 0" class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">Amount Paid</span>
                  <span class="font-medium text-green-600">{{ finalPaidAmount.toFixed(2) }}</span>
                </div>
                <div v-if="finalPaidAmount > 0" class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">Method</span>
                  <span>{{ finalPaymentMethod }}</span>
                </div>
                <div v-if="finalPaidAmount < totalAmount" class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">Remaining</span>
                  <span class="font-medium text-red-600">{{ (totalAmount - finalPaidAmount).toFixed(2) }}</span>
                </div>
              </div>

              <UiButton class="w-full" :disabled="saving || totalAmount <= 0" @click="handleCreate">
                <CreditCard class="size-4" />
                {{ saving ? 'Creating...' : 'Create Invoice' }}
              </UiButton>
            </UiCardContent>
          </UiCard>
        </div>
      </div>

      <div class="hidden sm:flex items-center justify-between">
        <UiButton variant="outline" :disabled="step === 1" @click="prevStep">
          <ArrowLeft class="size-4" /> Back
        </UiButton>
        <UiButton :disabled="!canProceed" @click="nextStep">
          {{ step === 4 ? 'Review' : 'Next' }} <ChevronRight class="size-4" />
        </UiButton>
      </div>
    </template>
  </div>
</template>
