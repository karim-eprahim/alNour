import { h } from 'vue';
import { Eye, Trash2 } from '@lucide/vue';
import { h as usePermissions } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DEwgn_ii.mjs';
import { _ as _sfc_main } from './index-CaQj38bB.mjs';
import { _ as _sfc_main$1 } from './index-B-gxPDkl.mjs';

function statusVariant(s) {
  const map = { PENDING: "secondary", PROCESSING: "warning", COMPLETED: "success", CANCELLED: "destructive" };
  return map[s] || "secondary";
}
function getBatchColumns(actions) {
  return [
    {
      accessorKey: "batchNumber",
      header: "Batch #",
      cell: ({ row }) => h(__nuxt_component_0, { to: `/production/${row.original.id}`, class: "font-medium hover:underline" }, row.original.batchNumber)
    },
    {
      accessorKey: "warehouse.name",
      header: "Warehouse",
      cell: ({ row }) => h("span", { class: "text-sm" }, row.original.warehouse?.name || "—")
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => h(_sfc_main, { variant: statusVariant(row.original.status), class: "text-xs" }, row.original.status)
    },
    {
      id: "inputs",
      header: "Inputs",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, String(row.original._count?.consumptions ?? 0))
    },
    {
      id: "outputs",
      header: "Outputs",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, String(row.original._count?.outputs ?? 0))
    },
    {
      accessorKey: "totalBatchCost",
      header: "Total Cost",
      cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.totalBatchCost).toFixed(2))
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.createdAt).toLocaleDateString())
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => {
        const b = row.original;
        const { can } = usePermissions();
        const canDelete = can("PRODUCTION", "DELETE");
        const buttons = [
          h(_sfc_main$1, { variant: "ghost", size: "icon-xs", onClick: () => actions.onView(b.id) }, () => h(Eye, { class: "size-3.5" }))
        ];
        if (canDelete) {
          buttons.push(h(_sfc_main$1, { variant: "ghost", size: "icon-xs", class: "text-destructive", onClick: () => actions.onDelete(b.id) }, () => h(Trash2, { class: "size-3.5" })));
        }
        return h("div", { class: "flex gap-1" }, buttons);
      }
    }
  ];
}
function getConsumptionColumns() {
  return [
    {
      accessorKey: "product.name",
      header: "Product",
      cell: ({ row }) => h("span", { class: "text-sm" }, `${row.original.product?.name || "—"} (${row.original.product?.sku || ""})`)
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, Number(row.original.quantity).toFixed(3))
    },
    {
      accessorKey: "unitCost",
      header: "Unit Cost",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, Number(row.original.unitCost).toFixed(2))
    },
    {
      accessorKey: "totalCost",
      header: "Total",
      cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.totalCost).toFixed(2))
    }
  ];
}
function getOutputColumns() {
  return [
    {
      accessorKey: "product.name",
      header: "Product",
      cell: ({ row }) => {
        const p = row.original.product;
        return h(__nuxt_component_0, { to: `/products/${row.original.productId}`, class: "hover:underline text-sm" }, `${p?.name || "—"} (${p?.sku || ""})`);
      }
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => h("span", { class: "tabular-nums block" }, Number(row.original.quantity).toFixed(3))
    },
    {
      accessorKey: "waste",
      header: "Waste",
      cell: ({ row }) => h("span", { class: "tabular-nums text-destructive block" }, Number(row.original.waste).toFixed(3))
    },
    {
      accessorKey: "costPerUnit",
      header: "Cost/Unit",
      cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.costPerUnit).toFixed(2))
    }
  ];
}
function getBatchReportColumns() {
  return [
    {
      accessorKey: "batchNumber",
      header: "Batch #",
      cell: ({ row }) => h(__nuxt_component_0, { to: `/production/${row.original.id}`, class: "font-medium hover:underline" }, row.original.batchNumber)
    },
    {
      accessorKey: "warehouse.name",
      header: "Warehouse",
      cell: ({ row }) => h("span", { class: "text-sm" }, row.original.warehouse?.name || "—")
    },
    {
      id: "inputs",
      header: "Inputs",
      cell: ({ row }) => {
        const total = row.original.consumptions?.reduce((s, c) => s + Number(c.quantity), 0) || 0;
        return h("span", { class: "tabular-nums block" }, total.toFixed(3));
      }
    },
    {
      id: "output",
      header: "Output",
      cell: ({ row }) => {
        const total = row.original.outputs?.reduce((s, o) => s + Number(o.quantity), 0) || 0;
        return h("span", { class: "tabular-nums block" }, total.toFixed(3));
      }
    },
    {
      id: "waste",
      header: "Waste",
      cell: ({ row }) => {
        const total = row.original.outputs?.reduce((s, o) => s + Number(o.waste), 0) || 0;
        return h("span", { class: "tabular-nums text-destructive block" }, total.toFixed(3));
      }
    },
    {
      id: "efficiency",
      header: "Efficiency",
      cell: ({ row }) => {
        const out = row.original.outputs?.reduce((s, o) => s + Number(o.quantity), 0) || 0;
        const waste = row.original.outputs?.reduce((s, o) => s + Number(o.waste), 0) || 0;
        const total = out + waste;
        const pct = total > 0 ? out / total * 100 : 0;
        return h("span", { class: "tabular-nums block" }, `${pct.toFixed(1)}%`);
      }
    },
    {
      accessorKey: "totalBatchCost",
      header: "Cost",
      cell: ({ row }) => h("span", { class: "tabular-nums font-medium block" }, Number(row.original.totalBatchCost).toFixed(2))
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => h("span", { class: "text-sm text-muted-foreground" }, new Date(row.original.createdAt).toLocaleDateString())
    }
  ];
}

export { getConsumptionColumns as a, getOutputColumns as b, getBatchColumns as c, getBatchReportColumns as g };
//# sourceMappingURL=column-DlfrMlov.mjs.map
