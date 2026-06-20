<script setup lang="ts">
import { Users, Plus, Eye, Trash2, Pencil, DollarSign, FileText } from '@lucide/vue'
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

const totalPages = computed(() => Math.ceil(customersStore.total / limit))

function openCreate() {
  editing.value = false
  form.name = ''; form.phone = ''; form.address = ''
  showDialog.value = true
}

function openEdit(customer: any) {
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

const currentId = ref('')

async function remove(id: string) {
  if (!confirm('Delete this customer?')) return
  try {
    await customersStore.deleteCustomer(id)
    toast.success('Customer deleted')
  } catch { toast.error('Failed to delete') }
}

function view(id: string) {
  navigateTo(`/customers/${id}`)
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

    <div class="flex gap-3">
      <UiInput v-model="search" placeholder="Search by name or phone..." class="w-72" />
    </div>

    <UiCard>
      <UiCardContent class="p-0">
        <UiTable>
          <UiTableHeader>
            <UiTableRow>
              <UiTableHead>Name</UiTableHead>
              <UiTableHead>Phone</UiTableHead>
              <UiTableHead>Address</UiTableHead>
              <UiTableHead class="text-right">Orders</UiTableHead>
              <UiTableHead class="text-right">Invoices</UiTableHead>
              <UiTableHead class="text-right">Balance</UiTableHead>
              <UiTableHead class="w-24" />
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="c in customersStore.customers" :key="c.id">
              <UiTableCell class="font-medium">{{ c.name }}</UiTableCell>
              <UiTableCell>{{ c.phone || '—' }}</UiTableCell>
              <UiTableCell class="text-muted-foreground max-w-40 truncate">{{ c.address || '—' }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ c._count?.salesOrders || 0 }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums">{{ c._count?.invoices || 0 }}</UiTableCell>
              <UiTableCell class="text-right tabular-nums font-medium" :class="(c.balance || 0) > 0 ? 'text-destructive' : 'text-green-600'">
                {{ (c.balance || 0).toFixed(2) }}
              </UiTableCell>
              <UiTableCell>
                <div class="flex gap-1">
                  <UiButton variant="ghost" size="icon-xs" @click="view(c.id)"><FileText class="size-3.5" /></UiButton>
                  <UiButton variant="ghost" size="icon-xs" @click="openEdit(c); currentId = c.id"><Pencil class="size-3.5" /></UiButton>
                  <UiButton variant="ghost" size="icon-xs" class="text-destructive" @click="remove(c.id)"><Trash2 class="size-3.5" /></UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-if="customersStore.customers.length === 0">
              <UiTableCell colspan="7">
                <EmptyState title="No customers found" description="Add your first customer" action="Add Customer" @action="openCreate" />
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </UiCardContent>
      <UiCardFooter v-if="totalPages > 1" class="border-t px-4 py-3">
        <div class="flex items-center justify-between w-full">
          <p class="text-sm text-muted-foreground">Page {{ page }} of {{ totalPages }} ({{ customersStore.total }} total)</p>
          <div class="flex gap-2">
            <UiButton variant="outline" size="sm" :disabled="page <= 1" @click="page--">Previous</UiButton>
            <UiButton variant="outline" size="sm" :disabled="page >= totalPages" @click="page++">Next</UiButton>
          </div>
        </div>
      </UiCardFooter>
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
