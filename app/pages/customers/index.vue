<script setup lang="ts">
import { Plus } from '@lucide/vue'
import type { CustomerActions } from '@/modules/customers/components/column'
import type { Customer } from '@/modules/customers/type'
import { getCustomerColumns } from '@/modules/customers/components/column'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const customersStore = useCustomersStore()
const search = ref('')
const page = ref(1)
const limit = 20
const showDialog = ref(false)
const editing = ref(false)
const form = reactive({ name: '', phone: '', address: '' })
const currentId = ref('')

const customerActions: CustomerActions = {
  onView: (id) => navigateTo(`/customers/${id}`),
  onEdit: (customer) => { currentId.value = customer.id; openEdit(customer) },
  onDelete: async (id) => {
    if (!confirm('Delete this customer?')) return
    try { await customersStore.deleteCustomer(id); toast.success('Customer deleted') }
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

function openCreate() {
  editing.value = false
  form.name = ''; form.phone = ''; form.address = ''
  showDialog.value = true
}

function openEdit(customer: Customer) {
  editing.value = true
  form.name = customer.name; form.phone = customer.phone || ''; form.address = customer.address || ''
  showDialog.value = true
}

async function save() {
  if (!form.name) { toast.error('Name is required'); return }
  try {
    if (editing.value) { await customersStore.updateCustomer(currentId.value, { ...form }); toast.success('Customer updated') }
    else { await customersStore.createCustomer({ ...form }); toast.success('Customer created') }
    showDialog.value = false
  } catch { toast.error('Failed to save customer') }
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
        <UiButton @click="openCreate"><Plus class="size-4" /> Add Customer</UiButton>
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
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showDialog = false">Cancel</UiButton>
            <UiButton type="submit">{{ editing ? 'Update' : 'Create' }}</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
