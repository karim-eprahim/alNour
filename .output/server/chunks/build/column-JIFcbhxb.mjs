import { h } from 'vue';
import { CircleCheck, CircleX, Ban, Eye, Pencil, Trash2 } from '@lucide/vue';
import { b as usePermissions } from './server.mjs';
import { _ as _sfc_main } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DZSn3naz.mjs';

function getWorkerColumns(actions) {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => h(__nuxt_component_0, {
        to: `/workers/${row.original.id}`,
        class: "font-medium hover:underline"
      }, row.original.name)
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, row.original.phone || "—")
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => h("span", { class: "text-sm" }, row.original.role || "—")
    },
    {
      accessorKey: "defaultDailyWage",
      header: "Default Wage",
      cell: ({ row }) => {
        const wage = row.original.defaultDailyWage;
        return h("span", { class: "tabular-nums font-medium" }, wage ? Number(wage).toFixed(2) : "—");
      }
    },
    {
      accessorKey: "totalWagesEarned",
      header: "Total Earned",
      cell: ({ row }) => h(
        "span",
        { class: "tabular-nums font-medium text-green-600" },
        Number(row.original.totalWagesEarned || 0).toFixed(2)
      )
    },
    {
      accessorKey: "totalAdvancesTaken",
      header: "Advances",
      cell: ({ row }) => h(
        "span",
        { class: "tabular-nums font-medium text-destructive" },
        Number(row.original.totalAdvancesTaken || 0).toFixed(2)
      )
    },
    {
      accessorKey: "netPayout",
      header: "Net Payout",
      cell: ({ row }) => {
        const net = Number(row.original.netPayout || 0);
        return h("span", {
          class: `tabular-nums font-medium ${net >= 0 ? "text-green-600" : "text-destructive"}`
        }, net.toFixed(2));
      }
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const active = row.original.isActive;
        return h("div", { class: "flex items-center gap-1" }, [
          h(active ? CircleCheck : CircleX, { class: `size-3.5 ${active ? "text-green-500" : "text-muted-foreground"}` }),
          h("span", { class: "text-xs" }, active ? "Active" : "Inactive")
        ]);
      }
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const w = row.original;
        const { can } = usePermissions();
        const buttons = [];
        if (actions.onView && can("WORKERS", "READ")) {
          buttons.push(h(_sfc_main$1, { variant: "ghost", size: "icon-xs", onClick: () => actions.onView(w.id) }, () => h(Eye, { class: "size-3.5" })));
        }
        if (actions.onEdit && can("WORKERS", "UPDATE")) {
          buttons.push(h(_sfc_main$1, { variant: "ghost", size: "icon-xs", onClick: () => actions.onEdit(w) }, () => h(Pencil, { class: "size-3.5" })));
        }
        if (actions.onDelete && can("WORKERS", "DELETE")) {
          buttons.push(h(_sfc_main$1, { variant: "ghost", size: "icon-xs", class: "text-destructive", onClick: () => actions.onDelete(w) }, () => h(Trash2, { class: "size-3.5" })));
        }
        return h("div", { class: "flex gap-1" }, buttons);
      }
    }
  ];
}
function getAttendanceColumns() {
  return [
    {
      accessorKey: "worker.name",
      header: "Worker",
      cell: ({ row }) => h("span", { class: "font-medium" }, row.original.worker?.name || "—")
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => h("span", { class: "text-sm" }, new Date(row.original.date).toLocaleDateString())
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const variant = status === "PRESENT" ? "default" : status === "ABSENT" ? "destructive" : "secondary";
        const icon = status === "PRESENT" ? CircleCheck : status === "ABSENT" ? CircleX : Ban;
        return h("div", { class: "flex items-center gap-1" }, [
          h(icon, { class: "size-3.5" }),
          h(_sfc_main, { variant, class: status === "PRESENT" ? "bg-green-100 text-green-800" : "" }, status)
        ]);
      }
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, row.original.notes || "—")
    }
  ];
}
function getAdvanceColumns() {
  return [
    {
      accessorKey: "worker.name",
      header: "Worker",
      cell: ({ row }) => h("span", { class: "font-medium" }, row.original.worker?.name || "—")
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => h(
        "span",
        { class: "tabular-nums font-medium text-destructive" },
        Number(row.original.amount).toFixed(2)
      )
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => h("span", { class: "text-sm" }, new Date(row.original.date).toLocaleDateString())
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, row.original.notes || "—")
    }
  ];
}
function getDailyWageColumns() {
  return [
    {
      accessorKey: "worker.name",
      header: "Worker",
      cell: ({ row }) => h("span", { class: "font-medium" }, row.original.worker?.name || "—")
    },
    {
      accessorKey: "dailyWage",
      header: "Daily Wage",
      cell: ({ row }) => h(
        "span",
        { class: "tabular-nums font-medium" },
        Number(row.original.dailyWage).toFixed(2)
      )
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => h("span", { class: "text-sm" }, new Date(row.original.date).toLocaleDateString())
    },
    {
      accessorKey: "batch.batchNumber",
      header: "Batch",
      cell: ({ row }) => h(__nuxt_component_0, {
        to: `/production/${row.original.batch?.id}`,
        class: "text-sm hover:underline"
      }, row.original.batch?.batchNumber || "—")
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, row.original.notes || "—")
    }
  ];
}

export { getDailyWageColumns as a, getAttendanceColumns as b, getWorkerColumns as c, getAdvanceColumns as g };
//# sourceMappingURL=column-JIFcbhxb.mjs.map
