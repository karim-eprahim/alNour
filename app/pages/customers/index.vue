<script setup lang="ts">
import { h } from 'vue'
import { Plus, Trash2, Pencil, FileText, MoreHorizontal } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Customer } from '@/modules/customers/type'
import { UiButton, UiDropdownMenu, UiDropdownMenuTrigger, UiDropdownMenuContent, UiDropdownMenuItem, UiDropdownMenuSeparator } from '#components'
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

const columns: ColumnDef<Customer>[] = [
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
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const addr = row.original.address
      return h('span', { class: 'text-muted-foreground max-w-40 truncate block' }, addr || '—')
    },
  },
  {
    id: 'orders',
    header: 'Orders',
    cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.salesOrders ?? 0)),
  },
  {
    id: 'invoices',
    header: 'Invoices',
    cell: ({ row }) => h('span', { class: 'tabular-nums block' }, String(row.original._count?.invoices ?? 0)),
  },
  {
    id: 'balance',
    header: 'Balance',
    cell: ({ row }) => {
      const bal = row.original.balance || 0
      return h('span', { class: `tabular-nums font-medium block ${bal > 0 ? 'text-destructive' : 'text-green-600'}` }, bal.toFixed(2))
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    cell: ({ row }) => {
      const c = row.original
      return h('div', [
        h(UiDropdownMenu, null, {
          default: () => [
            h(UiDropdownMenuTrigger, { 'as-child': true }, {
              default: () => h(UiButton, { variant: 'ghost', size: 'icon-sm' }, {
                default: () => h(MoreHorizontal, { class: 'size-4' }),
              }),
            }),
            h(UiDropdownMenuContent, { align: 'end', class: 'w-36' }, [
              h(UiDropdownMenuItem, { onClick: () => navigateTo(`/customers/${c.id}`) }, [h(FileText, { class: 'size-4' }), ' View']),
              h(UiDropdownMenuItem, { onClick: () => { currentId = c.id; openEdit(c) } }, [h(Pencil, { class: 'size-4' }), ' Edit']),
              h(UiDropdownMenuSeparator),
              h(UiDropdownMenuItem, { variant: 'destructive', onClick: () => remove(c.id) }, [h(Trash2, { class: 'size-4' }), ' Delete']),
            ]),
          ],
        }),
      ])
    },
  },
]

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
    if (editing.value) {
      await customersStore.updateCustomer(currentId.value, { ...form })
      toast.success('Customer updated')
    } else {
      await customersStore.createCustomer({ ...form })
      toast.success('Customer created')
    }
    showDialog.value = false
  } catch { toast.error('Failed to save customer') }
}

async function remove(id: string) {
  if (!confirm('Delete this customer?')) return
  try {
    await customersStore.deleteCustomer(id)
    toast.success('Customer deleted')
  } catch { toast.error('Failed to delete') }
}

async function load() {
  await customersStore.fetchCustomers({ search: search.value || undefined, page: page.value, limit })
}

let debounce: ReturnType<typeof setTimeout>
watch(search, () => {
  clearTimeout(debounce)
  debounce = setTimeout(() => { page.value = 1; load() }, 300)
})
watch(page, load)
onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Customers" description="Customer directory and balances">
      <template #actions>
        <UiButton @click="openCreate"><Plus class="size-4" /> Add Customer</UiButton>
      </template>
    </PageHeader>

    <AppTable
      :data="customersStore.customers"
      :columns="columns"
      :loading="customersStore.loading"
      :server-total="customersStore.total"
      search-placeholder="Search by name or phone..."
      :show-column-toggle="false"
    >
      <template #empty>
        <EmptyState title="No customers found" description="Add your first customer" action="Add Customer" @action="openCreate" />
      </template>
    </AppTable>

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
