import { h } from 'vue'
import { MoreHorizontal, Trash2, Pencil, FileText } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Customer } from '../type'
import { usePermissions } from '~/composables/usePermissions'
import {
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuTrigger,
  UiDropdownMenuContent,
  UiDropdownMenuItem,
  UiDropdownMenuSeparator,
} from '#components'

export interface CustomerActions {
  onView: (id: string) => void
  onEdit: (customer: Customer) => void
  onDelete: (id: string) => void
}

export function getCustomerColumns(actions: CustomerActions): ColumnDef<Customer>[] {
  return [
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
        const { can } = usePermissions()
        const canEdit = can('CUSTOMERS', 'UPDATE')
        const canDelete = can('CUSTOMERS', 'DELETE')
        const items: any[] = []
        items.push(h(UiDropdownMenuItem, { onClick: () => actions.onView(c.id) }, [h(FileText, { class: 'size-4' }), ' View']))
        if (canEdit) items.push(h(UiDropdownMenuItem, { onClick: () => actions.onEdit(c) }, [h(Pencil, { class: 'size-4' }), ' Edit']))
        if (canDelete) items.push(h(UiDropdownMenuSeparator), h(UiDropdownMenuItem, { variant: 'destructive', onClick: () => actions.onDelete(c.id) }, [h(Trash2, { class: 'size-4' }), ' Delete']))
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
}

export function getLedgerColumns(): ColumnDef<any>[] {
  return [
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' }, new Date(row.original.createdAt).toLocaleDateString()),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => h('span', { class: 'text-sm' }, row.original.description || '—'),
    },
    {
      id: 'debit',
      header: 'Debit',
      cell: ({ row }) => {
        const amt = row.original.type === 'DEBIT' ? Number(row.original.amount).toFixed(2) : '—'
        return h('span', { class: 'tabular-nums text-destructive block' }, amt)
      },
    },
    {
      id: 'credit',
      header: 'Credit',
      cell: ({ row }) => {
        const amt = row.original.type === 'CREDIT' ? Number(row.original.amount).toFixed(2) : '—'
        return h('span', { class: 'tabular-nums text-green-600 block' }, amt)
      },
    },
  ]
}
