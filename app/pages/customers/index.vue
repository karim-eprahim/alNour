<script setup lang="ts">
import { Plus, MapPin, Trash2 } from '@lucide/vue'
import type { CustomerActions } from '@/modules/customers/components/column'
import type { Customer } from '@/modules/customers/type'
import { getCustomerColumns } from '@/modules/customers/components/column'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: {
    module: 'CUSTOMERS',
    action: 'READ'
  }
})

const customersStore = useCustomersStore()
const suppliersStore = useSuppliersStore()
const supplierOptions = ref<{ id: string; name: string }[]>([])
const search = ref('')
const page = ref(1)
const limit = 20
const showDialog = ref(false)
const showMapPicker = ref(false)
const editing = ref(false)
const form = reactive({ name: '', phone: '', address: '', latitude: null as number | null, longitude: null as number | null, linkedSupplierId: '' })
const currentId = ref('')

const customerActions: CustomerActions = {
  onView: (id) => navigateTo(`/customers/${id}`),
  onEdit: (customer) => { currentId.value = customer.id; openEdit(customer) },
  onDelete: async (id) => {
    if (!confirm('Delete this customer?')) return
    try { await customersStore.deleteCustomer(id); toast.success('Customer deleted'); await load() }
    catch { toast.error('Failed to delete') }
  },
}

const columns = getCustomerColumns(customerActions)

const debouncedSearch = ref('')
watch(search, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedSearch.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})
watch(debouncedSearch, () => { page.value = 1; load() })
watch(page, load)

async function loadSupplierOptions() {
  console.log('loadSupplierOptions')
  try {
    const res = await $fetch('/api/suppliers')
    supplierOptions.value = (res as any).suppliers?.map((s: any) => ({ id: s.id, name: s.name })) ?? []
    console.log('supplierOptions', res,supplierOptions.value)
  } catch {}
}

function openCreate() {
  editing.value = false
  form.name = ''; form.phone = ''; form.address = ''; form.latitude = null; form.longitude = null; form.linkedSupplierId = ''
  showDialog.value = true
}

function openEdit(customer: Customer) {
  editing.value = true
  form.name = customer.name; form.phone = customer.phone || ''; form.address = customer.address || ''
  form.latitude = customer.latitude ?? null
  form.longitude = customer.longitude ?? null
  form.linkedSupplierId = (customer as any).linkedSupplier?.id ?? ''
  showDialog.value = true
}

async function save() {
  if (!form.name) { toast.error('Name is required'); return }
  try {
    const payload: any = { name: form.name, phone: form.phone, address: form.address }
    if (form.latitude !== null && form.longitude !== null) {
      payload.latitude = form.latitude
      payload.longitude = form.longitude
    }
    if (form.linkedSupplierId) payload.linkedSupplierId = form.linkedSupplierId
    if (editing.value) { await customersStore.updateCustomer(currentId.value, payload); toast.success('Customer updated') }
    else { await customersStore.createCustomer(payload); toast.success('Customer created') }
    showDialog.value = false
    await load()
  } catch (err: any) { toast.error(err?.data?.statusMessage || 'Failed to save customer') }
}

async function load() {
  await customersStore.fetchCustomers({ search: debouncedSearch.value || undefined, page: page.value, limit })
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Customers" description="Customer directory and balances">
      <template #actions>
        <UiButton v-can="{ module: 'CUSTOMERS', action: 'CREATE' }" @click="openCreate"><Plus class="size-4" /> Add Customer</UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <UiInput v-model="search" placeholder="Search by name or phone..." class="max-w-xs" />
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="customersStore.customers"
          :columns="columns"
          :loading="customersStore.loading"
          :server-total="customersStore.total"
          :show-search="false"
          :show-column-toggle="false"
        >
          <template #empty>
            <EmptyState title="No customers found" description="Add your first customer" action="Add Customer" @action="openCreate" />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>

    <UiDialog :open="showDialog" @update:open="showDialog = $event">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>{{ editing ? 'Edit' : 'Add' }} Customer</UiDialogTitle>
          <UiDialogDescription>Enter customer contact information</UiDialogDescription>
        </UiDialogHeader>
        <form @submit.prevent="save" class="space-y-4">
          <div class="space-y-2">
            <UiLabel for="name">Name *</UiLabel>
            <UiInput id="name" v-model="form.name" placeholder="Customer name" />
          </div>
          <div class="space-y-2">
            <UiLabel for="phone">Phone</UiLabel>
            <UiInput id="phone" v-model="form.phone" placeholder="Phone number" />
          </div>
          <div class="space-y-2">
            <UiLabel for="address">Address</UiLabel>
            <UiTextarea id="address" v-model="form.address" placeholder="Address" />
          </div>
          <div class="space-y-2">
            <UiLabel for="customer-location">Customer Location <span class="text-xs text-muted-foreground">(optional)</span></UiLabel>
            <div class="flex items-center justify-between rounded-lg border p-3">
              <div v-if="form.latitude !== null && form.longitude !== null" class="flex items-center gap-3">
                <MapPin class="size-5 text-primary" />
                <div>
                  <p class="text-sm font-medium">Location selected</p>
                  <p class="text-sm text-muted-foreground">{{ form.latitude.toFixed(6) }}, {{ form.longitude.toFixed(6) }}</p>
                </div>
              </div>
              <p v-else class="text-sm text-muted-foreground">No location selected</p>
              <div class="flex items-center gap-2">
                <UiButton v-if="form.latitude !== null && form.longitude !== null" type="button" variant="ghost" size="sm" @click="form.latitude = null; form.longitude = null">
                  <Trash2 class="size-4" /> Clear
                </UiButton>
                <UiButton type="button" variant="outline" size="sm" @click="showMapPicker = true">
                  <MapPin class="size-4" /> Select location on map
                </UiButton>
              </div>
            </div>
          </div>
          <div class="space-y-2 *:w-full">
            <UiLabel for="supplier-link">Link to Supplier <span class="text-xs text-muted-foreground">(optional)</span></UiLabel>
            <LookupCombobox v-model="form.linkedSupplierId" :endpoint="fetchSuppliersLookupApi" placeholder="Select a supplier..." include-all all-value="__all__" all-label="None"/>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showDialog = false">Cancel</UiButton>
            <UiButton type="submit">{{ editing ? 'Update' : 'Create' }}</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <UiDialog :open="showMapPicker" @update:open="showMapPicker = $event">
      <UiDialogContent class="sm:max-w-lg">
        <UiDialogHeader>
          <UiDialogTitle>Select customer location</UiDialogTitle>
          <UiDialogDescription>Click on the map to place the marker, or drag it to fine-tune the position.</UiDialogDescription>
        </UiDialogHeader>
        <div class="space-y-3">
          <div class="h-72 w-full overflow-hidden rounded-lg border">
            <MapLocationPicker v-model:latitude="form.latitude" v-model:longitude="form.longitude" />
          </div>
          <p class="text-center text-sm text-muted-foreground">
            {{ form.latitude !== null && form.longitude !== null ? `${form.latitude.toFixed(6)}, ${form.longitude.toFixed(6)}` : 'No location selected yet' }}
          </p>
        </div>
        <UiDialogFooter>
          <UiButton type="button" variant="outline" @click="showMapPicker = false">Cancel</UiButton>
          <UiButton type="button" :disabled="form.latitude === null || form.longitude === null" @click="showMapPicker = false">Confirm location</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
