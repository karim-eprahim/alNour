import { h } from 'vue';
import { EyeOff, Eye, Trash2 } from '@lucide/vue';
import { _ as _sfc_main$1 } from './index-BJ9JiLtz.mjs';
import { _ as _sfc_main$2 } from './index-CUpQupPt.mjs';
import { _ as _sfc_main } from './Checkbox-BgWIODM0.mjs';
import 'class-variance-authority';
import 'vue/server-renderer';
import '@vueuse/core';
import 'reka-ui';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jsonwebtoken';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import 'vue-sonner';
import 'perfect-debounce';
import '@vue/shared';
import 'clsx';
import 'tailwind-merge';

function getNotificationColumns(actions) {
  return [
    {
      id: "select",
      header: () => h(_sfc_main, {
        modelValue: actions.getHeaderChecked(),
        "onUpdate:modelValue": (v) => actions.toggleSelectAll(v),
        ariaLabel: "Select all on page"
      }),
      cell: ({ row }) => h(_sfc_main, {
        modelValue: actions.isSelected(row.original.id),
        "onUpdate:modelValue": (v) => actions.toggleSelect(row.original.id, v),
        ariaLabel: `Select ${row.original.title}`
      }),
      enableSorting: false,
      enableHiding: false
    },
    {
      id: "index",
      header: "#",
      cell: ({ row }) => h(
        "span",
        { class: "text-muted-foreground tabular-nums" },
        String(actions.getRowNumber(row.index))
      ),
      enableSorting: false
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => h("span", { class: "font-medium" }, row.original.title)
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => h("span", {
        class: "block max-w-xs truncate text-muted-foreground",
        title: row.original.message
      }, row.original.message)
    },
    {
      accessorKey: "readAt",
      header: "Status",
      cell: ({ row }) => row.original.readAt ? h(_sfc_main$1, { variant: "secondary" }, () => "Read") : h(_sfc_main$1, { variant: "default" }, () => "Unread")
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => h(
        "span",
        { class: "whitespace-nowrap text-sm text-muted-foreground" },
        actions.formatDateTime(row.original.createdAt)
      )
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        const n = row.original;
        return h("div", { class: "flex justify-end gap-1" }, [
          h(_sfc_main$2, {
            variant: "ghost",
            size: "icon",
            class: "size-8",
            title: n.readAt ? "Mark as unread" : "Mark as read",
            onClick: () => actions.onToggleRead(n)
          }, () => h(n.readAt ? EyeOff : Eye, { class: "size-4" })),
          h(_sfc_main$2, {
            variant: "ghost",
            size: "icon",
            class: "size-8 text-destructive hover:text-destructive",
            title: "Delete",
            disabled: actions.isDeleting(),
            onClick: () => actions.onDelete(n.id)
          }, () => h(Trash2, { class: "size-4" }))
        ]);
      }
    }
  ];
}

export { getNotificationColumns };
//# sourceMappingURL=columns-MiNaZrQM.mjs.map
