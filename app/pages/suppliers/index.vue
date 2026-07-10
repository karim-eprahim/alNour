<script setup lang="ts">
import { h } from 'vue'
import { MoreHorizontal, Eye, Pencil, Trash2, Building2, Phone, MapPin, Link } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Supplier } from '@/modules/suppliers/type'
import { usePermissions } from '~/composables/usePermissions'
import { NuxtLink, UiBadge, UiButton, UiDropdownMenu, UiDropdownMenuTrigger, UiDropdownMenuContent, UiDropdownMenuItem, UiDropdownMenuSeparator } from '#components'
import PageHeader from '~/components/shared/PageHeader.vue'
import { toast } from 'vue-sonner'


definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  permission: { module: 'SUPPLIERS', action: 'READ' },
})

const suppliersStore = useSuppliersStore()
const customersStore = useCustomersStore()
const customerOptions = ref<{ id: string; name: string }[]>([])
const search = ref('')
const debouncedSearch = ref('')
watch(search, (val, _old, onCleanup) => {
  const timer = setTimeout(() => { debouncedSearch.value = val }, 300)
  onCleanup(() => clearTimeout(timer))
})

watch(debouncedSearch, () => suppliersStore.fetchSuppliers({ search: debouncedSearch.value || undefined }))

const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const editingSupplier = ref<Supplier | null>(null)
const deletingSupplier = ref<Supplier | null>(null)

const createForm = reactive({ name: '', phone: '', email: '', address: '', company: '', linkedCustomerId: '' })
const editForm = reactive({ name: '', phone: '', email: '', address: '', company: '', linkedCustomerId: '' })

async function loadCustomerOptions() {
  const res = await customersStore.fetchCustomers({ limit: 200 })
  if (res) customerOptions.value = res.customers.map((c: any) => ({ id: c.id, name: c.name }))
}

function openEdit(s: Supplier) {
  editingSupplier.value = s
  editForm.name = s.name
  editForm.phone = s.phone ?? ''
  editForm.email = s.email ?? ''
  editForm.address = s.address ?? ''
  editForm.company = s.company ?? ''
  editForm.linkedCustomerId = (s as any).linkedCustomer?.id ?? ''
  showEditDialog.value = true
}

function openDelete(s: Supplier) {
  deletingSupplier.value = s
  showDeleteDialog.value = true
}

async function handleCreate() {
  try {
    const payload: any = { ...createForm }
    if (!payload.linkedCustomerId) payload.linkedCustomerId = null
    await suppliersStore.createSupplier(payload)
    showCreateDialog.value = false
    createForm.name = ''; createForm.phone = ''; createForm.email = ''; createForm.address = ''; createForm.company = ''; createForm.linkedCustomerId = ''
    toast.success('Supplier created')
  } catch {}
}

async function handleEdit() {
  if (!editingSupplier.value) return
  try {
    await suppliersStore.updateSupplier(editingSupplier.value.id, editForm)
    showEditDialog.value = false; editingSupplier.value = null
    toast.success('Supplier updated')
  } catch {}
}

async function handleDelete() {
  if (!deletingSupplier.value) return
  try {
    await suppliersStore.deleteSupplier(deletingSupplier.value.id)
    showDeleteDialog.value = false; deletingSupplier.value = null
    toast.success('Supplier deleted')
  } catch {}
}

const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: 'name',
    header: 'Supplier',
    cell: ({ row }) => h('div', { class: 'flex items-center gap-3' }, [
      h('div', { class: 'size-8 flex items-center justify-center rounded-lg bg-muted' }, [
        h(Building2, { class: 'size-4 text-muted-foreground' }),
      ]),
      h('div', null, [
        h(NuxtLink, { to: `/suppliers/${row.original.id}`, class: 'text-sm font-medium hover:underline' }, row.original.name),
        row.original.company ? h('p', { class: 'text-xs text-muted-foreground' }, row.original.company) : null,
      ]),
    ]),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => {
      const p = row.original.phone
      return p ? h('div', { class: 'flex items-center gap-1.5 text-sm' }, [
        h(Phone, { class: 'size-3.5 text-muted-foreground' }), p,
      ]) : h('span', { class: 'text-xs text-muted-foreground' }, '—')
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email || '—',
  },
  {
    id: 'balance',
    header: 'Balance',
    cell: ({ row }) => {
      const bal = row.original.balance ?? 0
      return h('span', {
        class: `text-sm font-medium tabular-nums ${bal > 0 ? 'text-destructive' : bal < 0 ? 'text-green-600' : ''}`,
      }, `${Number(bal).toFixed(2)}`)
    },
  },
  {
    id: 'invoices',
    header: 'Invoices',
    cell: ({ row }) => h('span', { class: 'text-sm' }, String(row.original._count?.purchaseInvoices ?? 0)),
  },
  {
    id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const s = row.original
        const { can } = usePermissions()
        const items: any[] = []
        if (can('SUPPLIERS', 'READ')) {
          items.push(h(UiDropdownMenuItem, { onClick: () => navigateTo(`/suppliers/${s.id}`) }, [h(Eye, { class: 'size-4' }), ' View']))
        }
        if (can('SUPPLIERS', 'UPDATE')) {
          items.push(h(UiDropdownMenuItem, { onClick: () => openEdit(s) }, [h(Pencil, { class: 'size-4' }), ' Edit']))
        }
        if (can('SUPPLIERS', 'DELETE')) {
          items.push(h(UiDropdownMenuSeparator))
          items.push(h(UiDropdownMenuItem, { variant: 'destructive', onClick: () => openDelete(s) }, [h(Trash2, { class: 'size-4' }), ' Delete']))
        }
        if (items.length === 0) return h('span')
        return h('div', [
          h(UiDropdownMenu, null, {
            default: () => [
              h(UiDropdownMenuTrigger, { 'as-child': true }, {
                default: () => h(UiButton, { variant: 'ghost', size: 'icon-sm' }, {
                  default: () => h(MoreHorizontal, { class: 'size-4' }),
                }),
              }),
              h(UiDropdownMenuContent, { align: 'end', class: 'w-36' }, items),
            ],
          }),
        ])
      },
    },
]

onMounted(() => suppliersStore.fetchSuppliers())
</script>

<template>
  <div class="space-y-6">
    <PageHeader title="Suppliers" description="Manage supplier directory and outstanding balances">
      <template #actions>
        <UiButton v-can="{ module: 'SUPPLIERS', action: 'CREATE' }" @click="showCreateDialog = true">Add Supplier</UiButton>
      </template>
    </PageHeader>

    <UiCard>
      <UiCardHeader class="pb-3">
        <UiInput v-model="search" placeholder="Search by name, company, or phone..." class="max-w-sm" />
      </UiCardHeader>
      <UiCardContent>
        <AppTable
          :data="suppliersStore.suppliers"
          :columns="columns"
          :loading="suppliersStore.loading"
          :server-total="suppliersStore.total"
          :show-search="false"
          :show-column-toggle="false"
        >
          <template #empty>
            <EmptyState title="No suppliers" description="Add your first supplier to get started" action="Add Supplier" @action="showCreateDialog = true" />
          </template>
        </AppTable>
      </UiCardContent>
    </UiCard>

    <UiDialog :open="showCreateDialog" @update:open="showCreateDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Add Supplier</UiDialogTitle>
          <UiDialogDescription>Add a new supplier to the directory</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleCreate">
          <div class="space-y-2">
            <UiLabel for="create-name">Name *</UiLabel>
            <UiInput id="create-name" v-model="createForm.name" placeholder="Supplier name" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="create-phone">Phone</UiLabel>
              <UiInput id="create-phone" v-model="createForm.phone" placeholder="Phone number" />
            </div>
            <div class="space-y-2">
              <UiLabel for="create-email">Email</UiLabel>
              <UiInput id="create-email" v-model="createForm.email" type="email" placeholder="email@example.com" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel for="create-company">Company</UiLabel>
            <UiInput id="create-company" v-model="createForm.company" placeholder="Company name" />
          </div>
          <div class="space-y-2">
            <UiLabel for="create-address">Address</UiLabel>
            <UiTextarea id="create-address" v-model="createForm.address" placeholder="Address" />
          </div>
          <div class="space-y-2 *:w-full">
            <UiLabel for="create-customer-link">Link to Customer <span class="text-xs text-muted-foreground">(optional)</span></UiLabel>
            <UiSelect style="width: 100%;" v-model="createForm.linkedCustomerId" @update:open="(isOpen) => isOpen && loadCustomerOptions()" class="w-full">
              <UiSelectTrigger id="create-customer-link"><UiSelectValue placeholder="Select a customer..." /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="__all__">None</UiSelectItem>
                <UiSelectItem v-for="c in customerOptions" :key="c.id" :value="c.id">{{ c.name }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showCreateDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="suppliersStore.loading">Create</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <UiDialog :open="showEditDialog" @update:open="showEditDialog = $event">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Edit Supplier</UiDialogTitle>
          <UiDialogDescription>Update supplier information</UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-4" @submit.prevent="handleEdit">
          <div class="space-y-2">
            <UiLabel for="edit-name">Name *</UiLabel>
            <UiInput id="edit-name" v-model="editForm.name" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2">
              <UiLabel for="edit-phone">Phone</UiLabel>
              <UiInput id="edit-phone" v-model="editForm.phone" />
            </div>
            <div class="space-y-2">
              <UiLabel for="edit-email">Email</UiLabel>
              <UiInput id="edit-email" v-model="editForm.email" type="email" />
            </div>
          </div>
          <div class="space-y-2">
            <UiLabel for="edit-company">Company</UiLabel>
            <UiInput id="edit-company" v-model="editForm.company" />
          </div>
          <div class="space-y-2">
            <UiLabel for="edit-address">Address</UiLabel>
            <UiTextarea id="edit-address" v-model="editForm.address" />
          </div>
          <div class="space-y-2 *:w-full">
            <UiLabel for="edit-customer-link">Link to Customer<span class="text-xs text-muted-foreground">(optional)</span></UiLabel>
            <UiSelect style="width: 100%;" v-model="editForm.linkedCustomerId" @update:open="(isOpen) => isOpen && loadCustomerOptions()" class="w-full">
              <UiSelectTrigger id="edit-customer-link"><UiSelectValue placeholder="Select a customer..." /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="__all__">None</UiSelectItem>
                <UiSelectItem v-for="c in customerOptions" :key="c.id" :value="c.id">{{ c.name }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <UiDialogFooter>
            <UiButton type="button" variant="outline" @click="showEditDialog = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="suppliersStore.loading">Save</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <ConfirmDialog
      v-model:open="showDeleteDialog"
      title="Delete Supplier"
      :description="`Are you sure you want to delete ${deletingSupplier?.name}?`"
      confirm-text="Delete"
      variant="destructive"
      :loading="suppliersStore.loading"
      @confirm="handleDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>
