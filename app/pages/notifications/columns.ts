import { h } from 'vue'
import { Eye, EyeOff, Trash2 } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Notification } from '@/types/notification'
import { UiBadge, UiButton, UiCheckbox } from '#components'

export interface NotificationTableActions {
  getHeaderChecked: () => boolean | 'indeterminate'
  toggleSelectAll: (value: boolean | 'indeterminate') => void
  isSelected: (id: string) => boolean
  toggleSelect: (id: string, value: boolean | 'indeterminate') => void
  getRowNumber: (index: number) => number
  formatDateTime: (date: string) => string
  onToggleRead: (notification: Notification) => void
  onDelete: (id: string) => void
  isDeleting: () => boolean
}

export function getNotificationColumns(actions: NotificationTableActions): ColumnDef<Notification>[] {
  return [
    {
      id: 'select',
      header: () => h(UiCheckbox, {
        modelValue: actions.getHeaderChecked(),
        'onUpdate:modelValue': (v: boolean | 'indeterminate') => actions.toggleSelectAll(v),
        ariaLabel: 'Select all on page',
      }),
      cell: ({ row }) => h(UiCheckbox, {
        modelValue: actions.isSelected(row.original.id),
        'onUpdate:modelValue': (v: boolean | 'indeterminate') => actions.toggleSelect(row.original.id, v),
        ariaLabel: `Select ${row.original.title}`,
      }),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'index',
      header: '#',
      cell: ({ row }) => h('span', { class: 'text-muted-foreground tabular-nums' },
        String(actions.getRowNumber(row.index))),
      enableSorting: false,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.title),
    },
    {
      accessorKey: 'message',
      header: 'Message',
      cell: ({ row }) => h('span', {
        class: 'block max-w-xs truncate text-muted-foreground',
        title: row.original.message,
      }, row.original.message),
    },
    {
      accessorKey: 'readAt',
      header: 'Status',
      cell: ({ row }) => row.original.readAt
        ? h(UiBadge, { variant: 'secondary' }, () => 'Read')
        : h(UiBadge, { variant: 'default' }, () => 'Unread'),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => h('span', { class: 'whitespace-nowrap text-sm text-muted-foreground' },
        actions.formatDateTime(row.original.createdAt)),
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        const n = row.original
        return h('div', { class: 'flex justify-end gap-1' }, [
          h(UiButton, {
            variant: 'ghost',
            size: 'icon',
            class: 'size-8',
            title: n.readAt ? 'Mark as unread' : 'Mark as read',
            onClick: () => actions.onToggleRead(n),
          }, () => h(n.readAt ? EyeOff : Eye, { class: 'size-4' })),
          h(UiButton, {
            variant: 'ghost',
            size: 'icon',
            class: 'size-8 text-destructive hover:text-destructive',
            title: 'Delete',
            disabled: actions.isDeleting(),
            onClick: () => actions.onDelete(n.id),
          }, () => h(Trash2, { class: 'size-4' })),
        ])
      },
    },
  ]
}
