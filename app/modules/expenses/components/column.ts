import { h } from 'vue'
import { Pencil, Trash2, CircleDollarSign } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Expense } from '../type'
import { UiBadge, UiButton } from '#components'

export interface ExpenseActions {
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
}

export function getExpenseColumns(actions: ExpenseActions): ColumnDef<Expense>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.title),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => h(UiBadge, { variant: 'secondary' as any, class: 'text-xs' }, row.original.category),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => h('span', { class: 'tabular-nums font-medium text-destructive' },
        Number(row.original.amount).toFixed(2)),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' },
        new Date(row.original.date).toLocaleDateString()),
    },
    {
      accessorKey: 'createdBy.name',
      header: 'Created By',
      cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' },
        row.original.createdBy?.name || '—'),
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) => h('span', { class: 'text-sm text-muted-foreground' },
        row.original.notes || '—'),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const e = row.original
        return h('div', { class: 'flex gap-1' }, [
          h(UiButton, { variant: 'ghost', size: 'icon-xs', onClick: () => actions.onEdit(e) }, () => h(Pencil, { class: 'size-3.5' })),
          h(UiButton, { variant: 'ghost', size: 'icon-xs', class: 'text-destructive', onClick: () => actions.onDelete(e) }, () => h(Trash2, { class: 'size-3.5' })),
        ])
      },
    },
  ]
}
