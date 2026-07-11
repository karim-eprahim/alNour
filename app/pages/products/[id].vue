<script setup lang="ts">
import { ArrowLeft, Package, Warehouse, ArrowRightLeft, History } from '@lucide/vue'
import type { StockMovement, MovementType } from '@/modules/stock/type'
import { MOVEMENT_TYPES } from '@/modules/stock/type'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'PRODUCTS', action: 'READ' },
})

const route = useRoute()
const productId = computed(() => route.params.id as string)

const productsStore = useProductsStore()
const warehousesStore = useWarehousesStore()
const stockStore = useStockStore()

const activeTab = ref('details')
const showMovementDialog = ref(false)
const movementForm = reactive({
  warehouseId: '',
  type: 'ADJUSTMENT' as MovementType,
  quantity: null as number | null,
})

const adjustmentTypes = MOVEMENT_TYPES.filter((m) => ['PURCHASE', 'ADJUSTMENT', 'SALE'].includes(m.value))

async function fetchProduct() {
  await productsStore.fetchProduct(productId.value)
  await stockStore.fetchMovements({ productId: productId.value, limit: 20 })
  await warehousesStore.fetchWarehouses()
}

async function handleMovement() {
  if (!movementForm.warehouseId || !movementForm.quantity) return
  try {
    await stockStore.createMovement({
      productId: productId.value,
      warehouseId: movementForm.warehouseId,
      type: movementForm.type,
      quantity: movementForm.quantity,
    })
    showMovementDialog.value = false
    movementForm.warehouseId = ''
    movementForm.type = 'ADJUSTMENT'
    movementForm.quantity = null
    toast.success('Stock movement recorded')
    fetchProduct()
  } catch {}
}

function movementTypeVariant(type: string) {
  const increase = MOVEMENT_TYPES.find((m) => m.value === type)?.isIncrease
  return increase ? 'default' : 'destructive'
}

onMounted(fetchProduct)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <UiButton variant="ghost" size="icon" class="size-8 shrink-0" @click="navigateTo('/products')">
        <ArrowLeft class="size-4" />
      </UiButton>
      <div class="flex items-center gap-3 flex-1">
        <div class="size-10 flex items-center justify-center rounded-lg bg-muted overflow-hidden">
          <img
            v-if="productsStore.currentProduct?.image"
            :src="productsStore.currentProduct.image"
            alt=""
            class="size-full object-cover"
          />
          <Package v-else class="size-5 text-muted-foreground" />
        </div>
        <div>
          <h1 class="text-lg font-semibold">{{ productsStore.currentProduct?.name || 'Loading...' }}</h1>
          <p class="text-xs text-muted-foreground">{{ productsStore.currentProduct?.sku }}</p>
        </div>
      </div>
    </div>

    <UiTabs v-model="activeTab" class="space-y-4">
      <UiTabsList>
        <UiTabsTrigger value="details">Details</UiTabsTrigger>
        <UiTabsTrigger value="stock">Stock</UiTabsTrigger>
        <UiTabsTrigger value="movements">Movements</UiTabsTrigger>
      </UiTabsList>

      <UiTabsContent value="details">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Product Information</UiCardTitle>
            <UiCardDescription>Product details and pricing</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div v-if="productsStore.loading && !productsStore.currentProduct" class="flex justify-center py-8">
              <LoadingState />
            </div>
            <div v-else-if="productsStore.currentProduct" class="grid gap-6 sm:grid-cols-2">
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Name (English)</p>
                <p class="text-sm">{{ productsStore.currentProduct.name }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Name (Arabic)</p>
                <p class="text-sm">{{ productsStore.currentProduct.nameAr }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">SKU</p>
                <p class="text-sm font-mono">{{ productsStore.currentProduct.sku }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Type</p>
                <UiBadge variant="secondary" class="text-xs">{{ productsStore.currentProduct.type.replace('_', ' ') }}</UiBadge>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Weight</p>
                <p class="text-sm">{{ productsStore.currentProduct.weight ? `${Number(productsStore.currentProduct.weight).toFixed(3)}` : 'Not set' }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Purchase Cost</p>
                <p class="text-sm">{{ productsStore.currentProduct.purchaseCost ? `${Number(productsStore.currentProduct.purchaseCost).toFixed(2)}` : 'Not set' }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Selling Price</p>
                <p class="text-sm">{{ productsStore.currentProduct.sellingPrice ? `${Number(productsStore.currentProduct.sellingPrice).toFixed(2)}` : 'Not set' }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-xs font-medium text-muted-foreground">Created</p>
                <p class="text-sm">{{ new Date(productsStore.currentProduct.createdAt).toLocaleDateString() }}</p>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="stock">
        <UiCard>
          <UiCardHeader class="flex flex-row items-center justify-between">
            <div>
              <UiCardTitle>Stock by Warehouse</UiCardTitle>
              <UiCardDescription>Current inventory levels across all warehouses</UiCardDescription>
            </div>
            <UiButton v-can="{ module: 'PRODUCTS', action: 'UPDATE' }" size="sm" @click="showMovementDialog = true">
              <ArrowRightLeft class="size-4" /> Record Movement
            </UiButton>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <div v-if="!productsStore.currentProduct?.stocks?.length" class="p-6">
              <EmptyState title="No stock available" description="This product has no stock in any warehouse" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Warehouse</UiTableHead>
                  <UiTableHead class="text-right">Quantity</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="stock in productsStore.currentProduct?.stocks" :key="stock.id">
                  <UiTableCell>
                    <div class="flex items-center gap-2">
                      <Warehouse class="size-4 text-muted-foreground" />
                      <span class="text-sm font-medium">{{ stock.warehouse.name }}</span>
                    </div>
                  </UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums">
                    {{ Number(stock.quantity).toFixed(3) }}
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>

      <UiTabsContent value="movements">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Stock Movements</UiCardTitle>
            <UiCardDescription>Recent inventory transactions for this product</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="p-0">
            <div v-if="stockStore.loading && stockStore.movements.length === 0" class="p-6">
              <LoadingState />
            </div>
            <div v-else-if="stockStore.movements.length === 0" class="p-6">
              <EmptyState title="No movements yet" description="Stock movements will appear here" />
            </div>
            <UiTable v-else>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Date</UiTableHead>
                  <UiTableHead>Type</UiTableHead>
                  <UiTableHead>Warehouse</UiTableHead>
                  <UiTableHead class="text-right">Qty</UiTableHead>
                  <UiTableHead>By</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="m in stockStore.movements" :key="m.id">
                  <UiTableCell class="text-xs text-muted-foreground">{{ new Date(m.createdAt).toLocaleString() }}</UiTableCell>
                  <UiTableCell>
                    <UiBadge :variant="movementTypeVariant(m.type) as any" class="text-xs">
                      {{ MOVEMENT_TYPES.find((mt) => mt.value === m.type)?.label || m.type }}
                    </UiBadge>
                  </UiTableCell>
                  <UiTableCell class="text-sm">{{ m.warehouse?.name }}</UiTableCell>
                  <UiTableCell class="text-right font-medium tabular-nums" :class="m.quantity > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ m.quantity > 0 ? '+' : '' }}{{ Number(m.quantity).toFixed(3) }}
                  </UiTableCell>
                  <UiTableCell class="text-xs text-muted-foreground">{{ m.createdBy?.name }}</UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </UiTabsContent>
    </UiTabs>

    <!-- Record Movement Dialog -->
    <UiDialog :open="showMovementDialog" @update:open="showMovementDialog = $event">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Record Stock Movement</UiDialogTitle>
          <UiDialogDescription>Adjust inventory for this product</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleMovement">
          <div class="space-y-2">
            <UiLabel for="mov-warehouse">Warehouse</UiLabel>
            <LookupCombobox v-model="movementForm.warehouseId" :items="warehousesStore.warehouses" placeholder="Select warehouse..." />
          </div>
          <div class="space-y-2">
            <UiLabel for="mov-type">Movement Type</UiLabel>
            <UiSelect v-model="movementForm.type">
              <UiSelectTrigger id="mov-type"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="mt in adjustmentTypes" :key="mt.value" :value="mt.value">{{ mt.label }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="mov-qty">Quantity</UiLabel>
            <UiInput id="mov-qty" v-model="movementForm.quantity as number" type="number" step="0.001" placeholder="0.000" required />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showMovementDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="stockStore.loading">Record</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
