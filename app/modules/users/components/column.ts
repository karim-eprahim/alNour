import { h } from 'vue'
import { MoreHorizontal, Eye, Pencil, Trash2 } from '@lucide/vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '../type'
import { usePermissions } from '~/composables/usePermissions'
import {
  NuxtLink,
  UiAvatar,
  UiAvatarFallback,
  UiBadge,
  UiButton,
  UiDropdownMenu,
  UiDropdownMenuTrigger,
  UiDropdownMenuContent,
  UiDropdownMenuItem,
  UiDropdownMenuSeparator,
} from '#components'

export interface UserActions {
  onView: (id: string) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

function roleBadgeVariant(role: string) {
  const map: Record<string, string> = {
    ADMIN: 'destructive',
    MANAGER: 'default',
    STOREKEEPER: 'secondary',
    ACCOUNTANT: 'outline',
    DISTRIBUTOR: 'secondary',
    WORKER: 'outline',
  }
  return map[role] || 'outline'
}

function statusBadgeVariant(status: string) {
  return status === 'ACTIVE' ? 'default' : status === 'INACTIVE' ? 'secondary' : 'destructive'
}

export function getUserColumns(actions: UserActions): ColumnDef<User>[] {
  return [
    {
      accessorKey: 'name',
      header: 'User',
      cell: ({ row }) => {
        const user = row.original
        return h('div', { class: 'flex items-center gap-3' }, [
          h(UiAvatar, { class: 'size-8' }, {
            default: () => h(UiAvatarFallback, { class: 'bg-primary/10 text-primary text-xs font-medium' }, user.name.charAt(0)),
          }),
          h('div', null, [
            h(NuxtLink, { to: `/users/${user.id}`, class: 'text-sm font-medium hover:underline' }, user.name),
            h('p', { class: 'text-xs text-muted-foreground' }, user.email),
          ]),
        ])
      },
    },
    {
      id: 'role',
      header: 'Role',
      accessorFn: (row) => row.role?.name || '',
      cell: ({ row }) => {
        const roleName = row.original.role?.name || '—'
        return h(UiBadge, { variant: roleBadgeVariant(roleName) as any, class: 'text-xs' }, roleName)
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => h(UiBadge, { variant: statusBadgeVariant(row.original.status) as any, class: 'text-xs' }, row.original.status),
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: ({ row }) => {
        const date = row.original.lastLogin
        return h('span', { class: 'text-xs text-muted-foreground' }, date ? new Date(date).toLocaleDateString() : 'Never')
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original
        const { can } = usePermissions()
        const canEdit = can('USERS', 'UPDATE')
        const canDelete = can('USERS', 'DELETE')
        const items: any[] = [
          h(UiDropdownMenuItem, { onClick: () => actions.onView(user.id) }, [
            h(Eye, { class: 'size-4' }),
            ' View',
          ]),
        ]
        if (canEdit) {
          items.push(h(UiDropdownMenuItem, { onClick: () => actions.onEdit(user) }, [
            h(Pencil, { class: 'size-4' }),
            ' Edit',
          ]))
        }
        if (canDelete) {
          items.push(h(UiDropdownMenuSeparator))
          items.push(h(UiDropdownMenuItem, { variant: 'destructive', onClick: () => actions.onDelete(user) }, [
            h(Trash2, { class: 'size-4' }),
            ' Delete',
          ]))
        }
        return h('div',[
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
