<script setup lang="ts">
import { Search, Plus, Pencil, ArrowUpDown, Phone, MapPin, ShoppingCart, Receipt, DollarSign, Wallet, ChevronRight } from '@lucide/vue'
import type { Customer, CreateCustomerPayload } from '@/modules/customers/type'

definePageMeta({
  layout: 'distributor',
  middleware: 'distributor',
})

const customersStore = useCustomersStore()

const search = ref('')
const page = ref(1)
const limit = 20
const sortField = ref<'name' | 'balance' | 'createdAt'>('name')
const sortDir = ref<'asc' | 'desc'>('asc')

const showCreateSheet = ref(false)
const showEditSheet = ref(false)
const editingCustomer = ref<Customer | null>(null)

const form = reactive<CreateCustomerPayload>({ name: '', phone: '', address: '' })
const formSaving = ref(false)

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'phone', label: 'Phone', sortable: false },
  { key: 'address', label: 'Address', sortable: false },
  { key: 'balance', label: 'Balance', sortable: true },
  { key: 'orders', label: 'Orders', sortable: false },
  { key: 'invoices', label: 'Invoices', sortable: false },
  { key: 'actions', label: '', sortable: false },
]

async function load() {
  await customersStore.fetchCustomers({ search: search.value || undefined, page: page.value, limit })
}

watch([search, page], load)
onMounted(load)

function toggleSort(field: string) {
  if (sortField.value === field) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field as any
    sortDir.value = 'asc'
  }
}

const filteredCustomers = computed(() => {
  let list = [...customersStore.customers]
  const field = sortField.value
  const dir = sortDir.value === 'asc' ? 1 : -1
  list.sort((a, b) => {
    const aVal = field === 'name' ? a.name : field === 'balance' ? (a.balance || 0) : new Date(a.createdAt).getTime()
    const bVal = field === 'name' ? b.name : field === 'balance' ? (b.balance || 0) : new Date(b.createdAt).getTime()
    if (typeof aVal === 'string') return aVal.localeCompare(bVal as string) * dir
    return ((aVal as number) - (bVal as number)) * dir
  })
  return list
})

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

function viewDetails(id: string) {
  navigateTo(`/distributor/contacts/${id}`)
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

    <div v-if="customersStore.loading" class="flex justify-center py-12">
      <LoadingState />
    </div>

    <div v-else-if="customersStore.customers.length === 0" class="text-center py-12 text-sm text-muted-foreground">
      <Users class="mx-auto mb-2 size-8 text-muted-foreground/60" />
      <p>No customers found</p>
    </div>

    <template v-else>
      <div class="hidden sm:block">
        <div class="rounded-lg border">
          <div class="grid grid-cols-12 gap-2 border-b bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground">
            <div class="col-span-3 flex cursor-pointer items-center gap-1 select-none" @click="toggleSort('name')">
              Name <ArrowUpDown class="size-3" />
            </div>
            <div class="col-span-2">Phone</div>
            <div class="col-span-3">Address</div>
            <div class="col-span-1 flex cursor-pointer items-center gap-1 justify-end select-none" @click="toggleSort('balance')">
              Balance <ArrowUpDown class="size-3" />
            </div>
            <div class="col-span-1 text-center">Orders</div>
            <div class="col-span-1 text-center">Invoices</div>
            <div class="col-span-1" />
          </div>
          <div
            v-for="c in filteredCustomers"
            :key="c.id"
            class="grid grid-cols-12 gap-2 border-b px-4 py-3 text-sm transition-colors hover:bg-accent/50 cursor-pointer last:border-0 items-center"
            @click="viewDetails(c.id)"
          >
            <div class="col-span-3 font-medium truncate">{{ c.name }}</div>
            <div class="col-span-2 flex items-center gap-1 truncate text-muted-foreground">
              <Phone class="size-3 shrink-0" />{{ c.phone || '—' }}
            </div>
            <div class="col-span-3 flex items-center gap-1 truncate text-muted-foreground">
              <MapPin class="size-3 shrink-0" />{{ c.address || '—' }}
            </div>
            <div class="col-span-1 text-right font-semibold" :class="(c.balance || 0) > 0 ? 'text-green-600' : (c.balance || 0) < 0 ? 'text-red-600' : ''">
              {{ (c.balance || 0).toFixed(2) }}
            </div>
            <div class="col-span-1 text-center text-muted-foreground">{{ c._count?.salesOrders || 0 }}</div>
            <div class="col-span-1 text-center text-muted-foreground">{{ c._count?.invoices || 0 }}</div>
            <div class="col-span-1 flex justify-end">
              <UiButton variant="ghost" size="icon" class="size-7" @click.stop="openEdit(c)">
                <Pencil class="size-3.5" />
              </UiButton>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-2 sm:hidden">
        <UiCard v-for="c in filteredCustomers" :key="c.id" class="cursor-pointer transition-colors hover:bg-accent/50" @click="viewDetails(c.id)">
          <UiCardContent class="p-4">
            <div class="flex items-start justify-between">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium truncate">{{ c.name }}</p>
                <p v-if="c.phone" class="text-xs text-muted-foreground truncate">{{ c.phone }}</p>
              </div>
              <div class="flex items-center gap-1 shrink-0 ml-2">
                <Wallet class="size-4 text-muted-foreground" />
                <span class="text-sm font-semibold" :class="(c.balance || 0) > 0 ? 'text-green-600' : (c.balance || 0) < 0 ? 'text-red-600' : ''">
                  {{ (c.balance || 0).toFixed(2) }}
                </span>
              </div>
            </div>
            <div v-if="c.address" class="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin class="size-3 shrink-0" />{{ c.address }}
            </div>
            <div class="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span class="flex items-center gap-1"><ShoppingCart class="size-3" /> {{ c._count?.salesOrders || 0 }} orders</span>
              <span class="flex items-center gap-1"><Receipt class="size-3" /> {{ c._count?.invoices || 0 }} invoices</span>
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </template>

    <UiSheet :open="showCreateSheet" @update:open="showCreateSheet = $event">
      <UiSheetContent side="right" class="w-full sm:max-w-md">
        <UiSheetHeader>
          <UiSheetTitle>New Customer</UiSheetTitle>
          <UiSheetDescription>Add a new customer to your list</UiSheetDescription>
        </UiSheetHeader>
        <div class="mt-6 space-y-4">
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
        <div class="mt-6 space-y-4">
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
