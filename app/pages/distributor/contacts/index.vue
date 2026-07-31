<script setup lang="ts">
import { h } from 'vue'
import { Search, Plus, Pencil, Phone, MapPin, Users } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Customer, CreateCustomerPayload } from '@/modules/customers/type'
import { NuxtLink, UiButton } from '#components'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const customersStore = useCustomersStore()

const search = ref('')
const page = ref(1)
const limit = 20

const showCreateSheet = ref(false)
const showEditSheet = ref(false)
const editingCustomer = ref<Customer | null>(null)

const form = reactive<CreateCustomerPayload>({ name: '', phone: '', address: '' })
const formSaving = ref(false)

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => h(NuxtLink, { to: `/distributor/contacts/${row.original.id}`, class: 'font-medium hover:underline' }, row.original.name),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    enableSorting: false,
    cell: ({ row }) => row.original.phone
      ? h('div', { class: 'flex items-center gap-1 text-muted-foreground' }, [
          h(Phone, { class: 'size-3 shrink-0' }),
          row.original.phone,
        ])
      : h('span', { class: 'text-muted-foreground' }, '—'),
  },
  {
    accessorKey: 'address',
    header: 'Address',
    enableSorting: false,
    cell: ({ row }) => row.original.address
      ? h('div', { class: 'flex items-center gap-1 text-muted-foreground' }, [
          h(MapPin, { class: 'size-3 shrink-0' }),
          h('span', { class: 'max-w-40 truncate' }, row.original.address),
        ])
      : h('span', { class: 'text-muted-foreground' }, '—'),
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    cell: ({ row }) => {
      const bal = row.original.balance || 0
      return h('span', { class: `tabular-nums font-medium block ${bal > 0 ? 'text-green-600' : bal < 0 ? 'text-red-600' : ''}` }, bal.toFixed(2))
    },
  },
  {
    id: 'orders',
    header: 'Orders',
    enableSorting: false,
    cell: ({ row }) => h('span', { class: 'tabular-nums text-muted-foreground block' }, String(row.original._count?.salesOrders ?? 0)),
  },
  {
    id: 'invoices',
    header: 'Invoices',
    enableSorting: false,
    cell: ({ row }) => h('span', { class: 'tabular-nums text-muted-foreground block' }, String(row.original._count?.invoices ?? 0)),
  },
  {
    id: 'actions',
    header: '',
    enableSorting: false,
    cell: ({ row }) => h('div', { class: 'flex justify-end' }, [
      h(UiButton, { variant: 'ghost', size: 'icon', class: 'size-7', onClick: () => openEdit(row.original) }, {
        default: () => h(Pencil, { class: 'size-3.5' }),
      }),
    ]),
  },
]

async function load() {
  await customersStore.fetchCustomers({ search: search.value || undefined, page: page.value, limit })
}

watch([search, page], load)
onMounted(load)

function openCreate() {
  form.name = ''
  form.phone = ''
  form.address = ''
  showCreateSheet.value = true
}

function openEdit(customer: Customer) {
  editingCustomer.value = customer
  form.name = customer.name
  form.phone = customer.phone || ''
  form.address = customer.address || ''
  showEditSheet.value = true
}

async function handleCreate() {
  if (!form.name.trim()) return
  formSaving.value = true
  try {
    await customersStore.createCustomer({ name: form.name.trim(), phone: form.phone || undefined, address: form.address || undefined })
    toast.success('Customer created')
    showCreateSheet.value = false
  } catch (err: any) {
    toast.error(err?.message || 'Failed to create customer')
  } finally {
    formSaving.value = false
  }
}

async function handleUpdate() {
  if (!editingCustomer.value || !form.name.trim()) return
  formSaving.value = true
  try {
    await customersStore.updateCustomer(editingCustomer.value.id, { name: form.name.trim(), phone: form.phone || undefined, address: form.address || undefined })
    toast.success('Customer updated')
    showEditSheet.value = false
    editingCustomer.value = null
  } catch (err: any) {
    toast.error(err?.message || 'Failed to update customer')
  } finally {
    formSaving.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Customers" description="Manage your customers and their balances">
      <template #actions>
        <UiButton size="sm" @click="openCreate">
          <Plus class="size-4" /> New Customer
        </UiButton>
      </template>
    </PageHeader>

    <div class="relative mb-4">
      <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <UiInput v-model="search" placeholder="Search customers..." class="pl-9" />
    </div>

    <AppTable
      :data="customersStore.customers"
      :columns="columns"
      :loading="customersStore.loading"
      :show-search="false"
      :show-column-toggle="false"
      :show-pagination="false"
    >
      <template #empty>
        <EmptyState
          :icon="Users"
          title="No customers found"
          description="Add your first customer to get started"
          action="New Customer"
          @action="openCreate"
        />
      </template>
    </AppTable>

    <UiSheet :open="showCreateSheet" @update:open="showCreateSheet = $event">
      <UiSheetContent side="right" class="w-full sm:max-w-md">
        <UiSheetHeader>
          <UiSheetTitle>New Customer</UiSheetTitle>
          <UiSheetDescription>Add a new customer to your list</UiSheetDescription>
        </UiSheetHeader>
        <div class="mt-6 space-y-4 px-3">
          <div>
            <UiLabel>Name *</UiLabel>
            <UiInput v-model="form.name" placeholder="Customer name" class="mt-1" />
          </div>
          <div>
            <UiLabel>Phone</UiLabel>
            <UiInput v-model="form.phone" placeholder="Phone number" class="mt-1" />
          </div>
          <div>
            <UiLabel>Address</UiLabel>
            <UiTextarea v-model="form.address" placeholder="Address" class="mt-1" />
          </div>
          <UiButton class="w-full" :disabled="formSaving || !form.name.trim()" @click="handleCreate">
            {{ formSaving ? 'Creating...' : 'Create Customer' }}
          </UiButton>
        </div>
      </UiSheetContent>
    </UiSheet>

    <UiSheet :open="showEditSheet" @update:open="showEditSheet = $event">
      <UiSheetContent side="right" class="w-full sm:max-w-md">
        <UiSheetHeader>
          <UiSheetTitle>Edit Customer</UiSheetTitle>
          <UiSheetDescription>Update customer information</UiSheetDescription>
        </UiSheetHeader>
        <div class="mt-6 space-y-4 px-3">
          <div>
            <UiLabel>Name *</UiLabel>
            <UiInput v-model="form.name" placeholder="Customer name" class="mt-1" />
          </div>
          <div>
            <UiLabel>Phone</UiLabel>
            <UiInput v-model="form.phone" placeholder="Phone number" class="mt-1" />
          </div>
          <div>
            <UiLabel>Address</UiLabel>
            <UiTextarea v-model="form.address" placeholder="Address" class="mt-1" />
          </div>
          <UiButton class="w-full" :disabled="formSaving || !form.name.trim()" @click="handleUpdate">
            {{ formSaving ? 'Saving...' : 'Save Changes' }}
          </UiButton>
        </div>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>
