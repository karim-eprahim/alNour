<script setup lang="ts">
import type { Product, ProductType } from '@/modules/products/type'
import type { ProductActions } from '@/modules/products/components/column'
import { getProductColumns } from '@/modules/products/components/column'
import { PRODUCT_TYPES } from '@/modules/products/type'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'


const productActions: ProductActions = {
  onView: (id) => navigateTo(`/products/${id}`),
  onEdit: (product) => openEdit(product),
  onDelete: (product) => openDelete(product),
}

const productColumns = getProductColumns(productActions)

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'PRODUCTS', action: 'READ' },
})

const productsStore = useProductsStore()
const warehousesStore = useWarehousesStore()

const search = ref('')
const typeFilter = ref<string>('all')
const warehouseFilter = ref<string>('all')

const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingProduct = ref<Product | null>(null)
const deletingProduct = ref<Product | null>(null)

const createForm = reactive({
  name: '',
  nameAr: '',
  type: 'RAW_CHARCOAL' as ProductType,
  image: null as string | null,
  weight: null as number | null,
  purchaseCost: null as number | null,
  sellingPrice: null as number | null,
  warehouseId: null as string | null,
  initialQuantity: null as number | null,
})

const showInitialStock = ref(false)

const editForm = reactive({
  name: '',
  nameAr: '',
  type: 'RAW_CHARCOAL' as ProductType,
  image: null as string | null,
  weight: null as number | null,
  purchaseCost: null as number | null,
  sellingPrice: null as number | null,
})

const debouncedSearch = ref('')
watch(search, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedSearch.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})

watch(debouncedSearch, () => fetchData())
watch([typeFilter, warehouseFilter], () => fetchData())

async function fetchData() {
  await productsStore.fetchProducts({
    search: debouncedSearch.value || undefined,
    type: typeFilter.value === 'all' ? undefined : typeFilter.value,
    warehouseId: warehouseFilter.value === 'all' ? undefined : warehouseFilter.value,
  })
}

async function handleCreate() {
  try {
    await productsStore.createProduct(createForm as any)
    showCreateDialog.value = false
    resetCreateForm()
    toast.success('Product created successfully')
  } catch {}
}

function resetCreateForm() {
  createForm.name = ''
  createForm.nameAr = ''
  createForm.type = 'RAW_CHARCOAL'
  createForm.image = null
  createForm.weight = null
  createForm.purchaseCost = null
  createForm.sellingPrice = null
  createForm.warehouseId = null
  createForm.initialQuantity = null
  showInitialStock.value = false
}

function openEdit(product: Product) {
  editingProduct.value = product
  editForm.name = product.name
  editForm.nameAr = product.nameAr
  editForm.type = product.type
  editForm.image = product.image ?? null
  editForm.weight = product.weight ? Number(product.weight) : null
  editForm.purchaseCost = product.purchaseCost ? Number(product.purchaseCost) : null
  editForm.sellingPrice = product.sellingPrice ? Number(product.sellingPrice) : null
  showEditDialog.value = true
}

async function handleEdit() {
  if (!editingProduct.value) return
  try {
    await productsStore.updateProduct(editingProduct.value.id, editForm)
    showEditDialog.value = false
    editingProduct.value = null
    toast.success('Product updated successfully')
  } catch {}
}

function openDelete(product: Product) {
  deletingProduct.value = product
  showDeleteDialog.value = true
}

async function handleDelete() {
  if (!deletingProduct.value) return
  try {
    await productsStore.deleteProduct(deletingProduct.value.id)
    showDeleteDialog.value = false
    deletingProduct.value = null
    toast.success('Product deleted successfully')
  } catch {}
}

onMounted(() => {
  fetchData()
  warehousesStore.fetchWarehouses()
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Products" description="Manage all products and inventory items">
      <template #actions>
        <UiButton v-can="{ module: 'PRODUCTS', action: 'CREATE' }" @click="showCreateDialog = true">Create Product</UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <div class="flex items-center gap-2">
          <UiInput v-model="search" placeholder="Search by name or SKU..." class="max-w-xs" />
          <UiSelect v-model="typeFilter">
            <UiSelectTrigger class="w-40">
              <UiSelectValue placeholder="All types" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="all">All types</UiSelectItem>
              <UiSelectItem v-for="t in PRODUCT_TYPES" :key="t.value" :value="t.value">{{ t.label }}</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
          <LookupCombobox v-model="warehouseFilter" :items="warehousesStore.warehouses" placeholder="All warehouses" include-all class="w-44" />
        </div>
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="productsStore.products"
          :columns="productColumns"
          :loading="productsStore.loading"
          :server-total="productsStore.total"
          show-search
          search-placeholder="Search..."
        >
          <template #empty>
            <EmptyState
              title="No products found"
              :description="search || typeFilter !== 'all' || warehouseFilter !== 'all' ? 'Try adjusting your filters' : 'Create your first product to get started'"
              :action="!search && typeFilter === 'all' && warehouseFilter === 'all' ? 'Create Product' : undefined"
              @action="showCreateDialog = true"
            />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>

    <!-- Create Product Dialog -->
    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-lg">
        <UiDialogHeader>
          <UiDialogTitle>Create Product</UiDialogTitle>
          <UiDialogDescription>Add a new product to the inventory</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreate">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="create-name">Name (English)</UiLabel>
              <UiInput id="create-name" v-model="createForm.name" placeholder="Product name" required />
            </div>
            <div class="space-y-2">
              <UiLabel for="create-name-ar">Name (Arabic)</UiLabel>
              <UiInput id="create-name-ar" v-model="createForm.nameAr" placeholder="اسم المنتج" required />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="create-type">Type</UiLabel>
              <UiSelect v-model="createForm.type">
                <UiSelectTrigger id="create-type"><UiSelectValue /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="t in PRODUCT_TYPES" :key="t.value" :value="t.value">{{ t.label }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="space-y-2">
              <UiLabel for="create-weight">Weight (tons/kg)</UiLabel>
              <UiInput id="create-weight" v-model="createForm.weight as number" step="0.001" placeholder="0.000" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="create-cost">Purchase Cost</UiLabel>
              <UiInput id="create-cost" v-model="createForm.purchaseCost as number" step="0.01" placeholder="0.00" />
            </div>
            <div class="space-y-2">
              <UiLabel for="create-price">Selling Price</UiLabel>
              <UiInput id="create-price" v-model="createForm.sellingPrice as number" step="0.01" placeholder="0.00" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel>Image</UiLabel>
            <ImageUpload v-model="createForm.image" />
          </div>
          <UiSeparator />
          <div class="flex items-center gap-2">
            <UiSwitch id="initial-stock-toggle" v-model="showInitialStock" />
            <UiLabel for="initial-stock-toggle" class="cursor-pointer">Add Initial Stock</UiLabel>
          </div>
          <template v-if="showInitialStock">
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-2">
                <UiLabel for="create-warehouse">Warehouse</UiLabel>
                <LookupCombobox v-model="createForm.warehouseId" :items="warehousesStore.warehouses" placeholder="Select warehouse" />
              </div>
              <div class="space-y-2">
                <UiLabel for="create-initial-qty">Initial Quantity</UiLabel>
                <UiInput id="create-initial-qty" v-model="createForm.initialQuantity as number" type="number" step="0.001" placeholder="0.000" />
              </div>
            </div>
          </template>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="productsStore.loading">Create</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Edit Product Dialog -->
    <UiDialog :open="showEditDialog" @update:open="showEditDialog = $event">
      <UiDialogContent class="sm:max-w-lg">
        <UiDialogHeader>
          <UiDialogTitle>Edit Product</UiDialogTitle>
          <UiDialogDescription>Update product information</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleEdit">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="edit-name">Name (English)</UiLabel>
              <UiInput id="edit-name" v-model="editForm.name" required />
            </div>
            <div class="space-y-2">
              <UiLabel for="edit-name-ar">Name (Arabic)</UiLabel>
              <UiInput id="edit-name-ar" v-model="editForm.nameAr" required />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="edit-type">Type</UiLabel>
              <UiSelect v-model="editForm.type">
                <UiSelectTrigger id="edit-type"><UiSelectValue /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="t in PRODUCT_TYPES" :key="t.value" :value="t.value">{{ t.label }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="space-y-2">
              <UiLabel for="edit-weight">Weight (tons/kg)</UiLabel>
              <UiInput id="edit-weight" v-model="editForm.weight as number" step="0.001" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="edit-cost">Purchase Cost</UiLabel>
              <UiInput id="edit-cost" v-model="editForm.purchaseCost as number" step="0.01" />
            </div>
            <div class="space-y-2">
              <UiLabel for="edit-price">Selling Price</UiLabel>
              <UiInput id="edit-price" v-model="editForm.sellingPrice as number" step="0.01" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel>Image</UiLabel>
            <ImageUpload v-model="editForm.image" />
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showEditDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="productsStore.loading">Save</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- Delete Confirm -->
    <ConfirmDialog
      v-model:open="showDeleteDialog"
      title="Delete Product"
      :description="`Are you sure you want to delete ${deletingProduct?.name}? This action cannot be undone.`"
      confirm-text="Delete"
      variant="destructive"
      :loading="productsStore.loading"
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>
