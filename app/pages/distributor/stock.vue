<script setup lang="ts">
import { Package, Search, PackageOpen } from '@lucide/vue'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const store = useDistributorStore()
const search = ref('')

const filteredCustodies = computed(() => {
  if (!search.value) return store.custodies
  const q = search.value.toLowerCase()
  return store.custodies.filter(
    (c) =>
      c.product.name.toLowerCase().includes(q) ||
      c.product.nameAr.toLowerCase().includes(q) ||
      c.product.sku.toLowerCase().includes(q),
  )
})

onMounted(() => store.fetchCustody())
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">My Stock</h1>
        <p class="text-sm text-muted-foreground">Products currently in your custody</p>
      </div>
    </div>

    <div class="relative">
      <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <UiInput
        v-model="search"
        placeholder="Search products..."
        class="pl-9"
      />
    </div>

    <div v-if="store.loading" class="flex justify-center py-12">
      <LoadingState />
    </div>

    <template v-else-if="filteredCustodies.length === 0">
      <UiCard>
        <UiCardContent class="flex flex-col items-center gap-4 py-12">
          <PackageOpen class="size-12 text-muted-foreground/60" />
          <div class="text-center">
            <p class="text-lg font-medium">No stock</p>
            <p class="text-sm text-muted-foreground">
              {{ search ? 'No products match your search' : 'You have no products in custody. Visit the warehouse to load stock.' }}
            </p>
          </div>
        </UiCardContent>
      </UiCard>
    </template>

    <template v-else>
      <div class="hidden lg:block">
        <UiCard>
          <UiCardContent class="p-0">
            <UiTable>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Product</UiTableHead>
                  <UiTableHead>SKU</UiTableHead>
                  <UiTableHead class="text-right">Quantity</UiTableHead>
                  <UiTableHead class="text-right">Selling Price</UiTableHead>
                  <UiTableHead class="text-right">Total Value</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody>
                <UiTableRow v-for="item in filteredCustodies" :key="item.id">
                  <UiTableCell>
                    <div class="flex items-center gap-3">
                      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Package class="size-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p class="text-sm font-medium">{{ item.product.name }}</p>
                        <p class="text-xs text-muted-foreground">{{ item.product.nameAr }}</p>
                      </div>
                    </div>
                  </UiTableCell>
                  <UiTableCell class="text-sm text-muted-foreground">{{ item.product.sku }}</UiTableCell>
                  <UiTableCell class="text-right font-medium">{{ item.quantity.toFixed(1) }}</UiTableCell>
                  <UiTableCell class="text-right">{{ item.product.sellingPrice?.toFixed(2) || '—' }}</UiTableCell>
                  <UiTableCell class="text-right font-semibold">{{ (item.quantity * (item.product.sellingPrice || 0)).toFixed(2) }}</UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="grid gap-3 lg:hidden">
        <UiCard v-for="item in filteredCustodies" :key="item.id">
          <UiCardContent class="flex items-start gap-3 p-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Package class="size-6 text-muted-foreground" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium truncate">{{ item.product.name }}</p>
              <p class="text-xs text-muted-foreground truncate">{{ item.product.nameAr }}</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-xs text-muted-foreground">Qty: <strong>{{ item.quantity.toFixed(1) }}</strong></span>
                <span class="text-xs text-muted-foreground">Price: <strong>{{ item.product.sellingPrice?.toFixed(2) || '—' }}</strong></span>
              </div>
              <p class="mt-1 text-sm font-semibold">Total: {{ (item.quantity * (item.product.sellingPrice || 0)).toFixed(2) }}</p>
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </template>
  </div>
</template>
