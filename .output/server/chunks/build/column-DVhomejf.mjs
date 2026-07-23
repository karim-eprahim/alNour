import { h } from 'vue';
import { FileText, Pencil, Trash2, MoreHorizontal } from '@lucide/vue';
import { b as usePermissions } from './server.mjs';
import { _ as _sfc_main$1 } from './index-OEEPQgbM.mjs';
import { e as _sfc_main$9, d as _sfc_main$5, _ as _sfc_main$d, a as _sfc_main, b as _sfc_main$b } from './DropdownMenuTrigger-dnC_q6qg.mjs';

function getCustomerColumns(actions) {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => h("span", { class: "font-medium" }, row.original.name)
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => h("span", { class: "text-sm" }, row.original.phone || "—")
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        const addr = row.original.address;
        return h("span", { class: "text-muted-foreground max-w-40 truncate block" }, addr || "—");
      }
    },
    {
      id: "orders",
      header: "Orders",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, String(row.original._count?.salesOrders ?? 0))
    },
    {
      id: "invoices",
      header: "Invoices",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, String(row.original._count?.invoices ?? 0))
    },
    {
      id: "balance",
      header: "Balance",
      cell: ({ row }) => {
        const bal = row.original.balance || 0;
        return h("span", { class: `tabular-nums font-medium block ${bal > 0 ? "text-destructive" : "text-green-600"}` }, bal.toFixed(2));
      }
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const c = row.original;
        const { can } = usePermissions();
        const canEdit = can("CUSTOMERS", "UPDATE");
        const canDelete = can("CUSTOMERS", "DELETE");
        const items = [];
        items.push(h(_sfc_main$9, { onClick: () => actions.onView(c.id) }, [h(FileText, { class: "size-4" }), " View"]));
        if (canEdit) items.push(h(_sfc_main$9, { onClick: () => actions.onEdit(c) }, [h(Pencil, { class: "size-4" }), " Edit"]));
        if (canDelete) items.push(h(_sfc_main$5), h(_sfc_main$9, { variant: "destructive", onClick: () => actions.onDelete(c.id) }, [h(Trash2, { class: "size-4" }), " Delete"]));
        return h("div", [
          h(_sfc_main$d, null, {
            default: () => [
              h(_sfc_main, { "as-child": true }, {
                default: () => h(_sfc_main$1, { variant: "ghost", size: "icon-sm" }, {
                  default: () => h(MoreHorizontal, { class: "size-4" })
                })
              }),
              h(_sfc_main$b, { align: "end", class: "w-36" }, items)
            ]
          })
        ]);
      }
    }
  ];
}
function getLedgerColumns() {
  return [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.createdAt).toLocaleDateString())
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => h("span", { class: "text-sm" }, row.original.description || "—")
    },
    {
      id: "debit",
      header: "Debit",
      cell: ({ row }) => {
        const amt = row.original.type === "DEBIT" ? Number(row.original.amount).toFixed(2) : "—";
        return h("span", { class: "tabular-nums text-destructive block" }, amt);
      }
    },
    {
      id: "credit",
      header: "Credit",
      cell: ({ row }) => {
        const amt = row.original.type === "CREDIT" ? Number(row.original.amount).toFixed(2) : "—";
        return h("span", { class: "tabular-nums text-green-600 block" }, amt);
      }
    }
  ];
}

export { getCustomerColumns as a, getLedgerColumns as g };
//# sourceMappingURL=column-DVhomejf.mjs.map
