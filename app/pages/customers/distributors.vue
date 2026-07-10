<script setup lang="ts">
import { h, ref, reactive, computed, onMounted } from 'vue'
import { ArrowLeft, Truck, RotateCcw, Package, DollarSign, Loader2 } from '@lucide/vue'
import { toast } from 'vue-sonner'
import type { ColumnDef } from '@tanstack/vue-table'
import {
  UiBadge, UiButton, UiCard, UiCardContent, UiCardHeader, UiCardTitle, UiCardDescription,
  UiDialog, UiDialogContent, UiDialogHeader, UiDialogTitle, UiDialogDescription, UiDialogFooter,
  UiInput, UiLabel, UiSelect, UiSelectTrigger, UiSelectContent, UiSelectItem, UiSelectValue,
} from '#components'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: {
    module: 'SALES',
    action: 'READ'
  }
})

interface CustodyProduct {
  id: string
  name: string
  nameAr: string
  sku: string
  sellingPrice: string | null
}

interface CustodyItem {
  id: string
  productId: string
  quantity: number
  product: CustodyProduct
}

interface Distributor {
  id: string
  name: string
  email: string
  phone: string | null
  avatar: string | null
  role: string
  status: string
  createdAt: string
  custodies: CustodyItem[]
  totalCustody: number
  balance: number
}

interface Product {
  id: string
  name: string
  nameAr: string
  sku: string
}

interface Warehouse {
  id: string
  name: string
}

const loading = ref(true)
const distributors = ref<Distributor[]>([])
const products = ref<Product[]>([])
const warehouses = ref<Warehouse[]>([])

const showLoadDialog = ref(false)
const showReturnDialog = ref(false)
const selectedDistributor = ref<Distributor | null>(null)
const submitting = ref(false)

const loadForm = reactive({
  distributorId: '',
  productId: '',
  warehouseId: '',
  quantity: 0,
  notes: '',
})

const returnForm = reactive({
  distributorId: '',
  productId: '',
  warehouseId: '',
  quantity: 0,
  notes: '',
})

const columns: ColumnDef<Distributor>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.name),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.phone || '—'),
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const variant = status === 'ACTIVE' ? 'success' : status === 'INACTIVE' ? 'secondary' : 'destructive'
      return h(UiBadge, { variant: variant as any }, { default: () => status })
    },
  },
  {
    id: 'custody',
    header: 'Current Custody',
    cell: ({ row }) => {
      console.log(row.original)
      const total = row.original.totalCustody || 0
      const items = row.original.custodies || []
      const children: any[] = [
        h('p', { class: 'text-sm font-medium tabular-nums' }, `${total.toFixed(3)} total`),
      ]
      items.forEach(c => {
        children.push(
          h('p', { class: 'text-xs text-muted-foreground' }, `${c.product.name}: ${c.quantity}`),
        )
      })
      return h('div', { class: 'space-y-1' }, children)
    },
  },
  {
    id: 'balance',
    header: 'Financial Balance',
    cell: ({ row }) => {
      const bal = row.original.balance || 0
      return h('span', {
        class: `tabular-nums font-medium ${bal > 0 ? 'text-destructive' : 'text-green-600'}`,
      }, `${bal > 0 ? '' : ''}${bal.toFixed(2)}`)
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    cell: ({ row }) => {
      const d = row.original
      return h('div', { class: 'flex gap-2' }, [
        h(UiButton, {
          size: 'sm',
          variant: 'default',
          onClick: () => openLoad(d),
        }, { default: () => [h(Truck, { class: 'size-3.5 mr-1' }), ' Load Truck'] }),
        h(UiButton, {
          size: 'sm',
          variant: 'outline',
          onClick: () => openReturn(d),
        }, { default: () => [h(RotateCcw, { class: 'size-3.5 mr-1' }), ' Return Stock'] }),
      ])
    },
  },
]

function openLoad(distributor: Distributor) {
  selectedDistributor.value = distributor
  loadForm.distributorId = distributor.id
  loadForm.productId = ''
  loadForm.warehouseId = ''
  loadForm.quantity = 0
  loadForm.notes = ''
  showLoadDialog.value = true
}

function openReturn(distributor: Distributor) {
  selectedDistributor.value = distributor
  returnForm.distributorId = distributor.id
  returnForm.productId = ''
  returnForm.warehouseId = ''
  returnForm.quantity = 0
  returnForm.notes = ''
  showReturnDialog.value = true
}

async function handleLoad() {
  if (!loadForm.productId || !loadForm.warehouseId || loadForm.quantity <= 0) {
    toast.error('Please fill all required fields')
    return
  }
  submitting.value = true
  try {
    await $fetch('/api/distributors/load', {
      method: 'POST',
      body: loadForm,
    })
    toast.success('Truck loaded successfully')
    showLoadDialog.value = false
    await fetchDistributors()
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load truck')
  } finally {
    submitting.value = false
  }
}

async function handleReturn() {
  if (!returnForm.productId || !returnForm.warehouseId || returnForm.quantity <= 0) {
    toast.error('Please fill all required fields')
    return
  }
  submitting.value = true
  try {
    await $fetch('/api/distributors/return', {
      method: 'POST',
      body: returnForm,
    })
    toast.success('Stock returned successfully')
    showReturnDialog.value = false
    await fetchDistributors()
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to return stock')
  } finally {
    submitting.value = false
  }
}

async function fetchDistributors() {
  try {
    const data = await $fetch<{ distributors: Distributor[] }>('/api/distributors/users')
    distributors.value = data.distributors
  } catch (err: any) {
    toast.error(err?.data?.statusMessage || 'Failed to load distributors')
  }
}

async function fetchProducts() {
  try {
    const data = await $fetch<{ products: Product[]; total: number }>('/api/products')
    products.value = data.products
  } catch {}
}

async function fetchWarehouses() {
  try {
    const data = await $fetch<{ warehouses: Warehouse[]; total: number }>('/api/warehouses')
    warehouses.value = data.warehouses
  } catch {}
}

const availableCustodyProducts = computed(() => {
  if (!selectedDistributor.value) return []
  return selectedDistributor.value.custodies.map(c => c.product)
})

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchDistributors(), fetchProducts(), fetchWarehouses()])
  loading.value = false
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/customers')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <PageHeader title="Distributors" description="Distributor custody & operations management" />
    </div>

    <UiCard>
      <UiCardHeader class="pb-3">
        <UiCardTitle>Active Distributors</UiCardTitle>
        <UiCardDescription>Manage truck loads, returns, and track custody balances</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="distributors"
          :columns="columns"
          :loading="loading"
          :show-search="true"
          :show-column-toggle="false"
          :show-pagination="false"
          search-placeholder="Search distributors..."
        >
          <template #empty>
            <EmptyState
              title="No distributors found"
              description="Create a user with the DISTRIBUTOR role to get started"
              action="Create Distributor"
              @action="navigateTo('/users')"
            />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>

    <!-- Load Truck Dialog -->
    <UiDialog :open="showLoadDialog" @update:open="showLoadDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Load Truck</UiDialogTitle>
          <UiDialogDescription>
            Load inventory onto {{ selectedDistributor?.name }}'s truck
          </UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="handleLoad" class="space-y-4">
          <div class="space-y-2">
            <UiLabel>Distributor</UiLabel>
            <UiInput :model-value="selectedDistributor?.name" disabled />
          </div>
          <div class="space-y-2">
            <UiLabel for="load-product">Product *</UiLabel>
            <UiSelect v-model="loadForm.productId">
              <UiSelectTrigger id="load-product"><UiSelectValue placeholder="Select product" /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="p in products" :key="p.id" :value="p.id">{{ p.name }} ({{ p.sku }})</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="load-warehouse">From Warehouse *</UiLabel>
            <UiSelect v-model="loadForm.warehouseId">
              <UiSelectTrigger id="load-warehouse"><UiSelectValue placeholder="Select warehouse" /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.name }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="load-qty">Quantity *</UiLabel>
            <UiInput id="load-qty" v-model.number="loadForm.quantity" type="number" step="0.001" min="0" placeholder="0.000" />
          </div>
          <div class="space-y-2">
            <UiLabel for="load-notes">Notes</UiLabel>
            <UiInput id="load-notes" v-model="loadForm.notes" placeholder="Optional notes" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showLoadDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="submitting">
              <Loader2 v-if="submitting" class="size-4 mr-1 animate-spin" />
              <Truck v-else class="size-4 mr-1" />
              Load Truck
            </UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Return Stock Dialog -->
    <UiDialog :open="showReturnDialog" @update:open="showReturnDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Return Stock</UiDialogTitle>
          <UiDialogDescription>
            Return unsold stock from {{ selectedDistributor?.name }}'s truck to warehouse
          </UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="handleReturn" class="space-y-4">
          <div class="space-y-2">
            <UiLabel>Distributor</UiLabel>
            <UiInput :model-value="selectedDistributor?.name" disabled />
          </div>
          <div class="space-y-2">
            <UiLabel for="return-product">Product *</UiLabel>
            <UiSelect v-model="returnForm.productId">
              <UiSelectTrigger id="return-product"><UiSelectValue placeholder="Select product on truck" /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem
                  v-for="p in availableCustodyProducts"
                  :key="p.id"
                  :value="p.id"
                >
                  {{ p.name }} ({{ p.sku }})
                </UiSelectItem>
                <UiSelectItem v-if="availableCustodyProducts.length === 0" value="" disabled>
                  No products on truck
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="return-warehouse">To Warehouse *</UiLabel>
            <UiSelect v-model="returnForm.warehouseId">
              <UiSelectTrigger id="return-warehouse"><UiSelectValue placeholder="Select warehouse" /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.name }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="return-qty">Quantity *</UiLabel>
            <UiInput id="return-qty" v-model.number="returnForm.quantity" type="number" step="0.001" min="0" placeholder="0.000" />
          </div>
          <div class="space-y-2">
            <UiLabel for="return-notes">Notes</UiLabel>
            <UiInput id="return-notes" v-model="returnForm.notes" placeholder="Optional notes" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showReturnDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="submitting">
              <Loader2 v-if="submitting" class="size-4 mr-1 animate-spin" />
              <RotateCcw v-else class="size-4 mr-1" />
              Return Stock
            </UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
