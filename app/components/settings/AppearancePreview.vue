<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Boxes,
  Plus,
  ArrowUp,
  ArrowDown,
} from '@lucide/vue'

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Orders', icon: ShoppingCart },
  { label: 'Customers', icon: Users },
  { label: 'Inventory', icon: Boxes },
]

const kpis = [
  { label: 'Revenue', value: '$24,500', change: '+12.4%', up: true },
  { label: 'Orders', value: '1,284', change: '+3.2%', up: true },
  { label: 'Customers', value: '392', change: '+1.1%', up: true },
  { label: 'Expenses', value: '$3,120', change: '-4.8%', up: false },
]
</script>

<template>
  <div class="flex overflow-hidden rounded-lg border border-border bg-background shadow-sm">
    <div class="hidden w-36 shrink-0 flex-col border-r border-border bg-sidebar p-2.5 sm:flex">
      <div class="mb-2.5 flex items-center gap-1.5 px-1">
        <div class="flex size-4 items-center justify-center rounded bg-sidebar-primary text-[8px] font-bold text-sidebar-primary-foreground">
          N
        </div>
        <span class="text-[10px] font-semibold text-sidebar-foreground">Al Nour</span>
      </div>
      <div class="space-y-0.5">
        <div
          v-for="item in sidebarItems"
          :key="item.label"
          :class="cn(
            'flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10px]',
            item.active
              ? 'bg-sidebar-accent font-medium text-sidebar-foreground'
              : 'text-sidebar-foreground/60',
          )"
        >
          <component :is="item.icon" class="size-3" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div class="flex-1 space-y-2.5 p-3">
      <div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <div
          v-for="kpi in kpis"
          :key="kpi.label"
          class="rounded-md border border-border bg-card p-2"
        >
          <p class="text-[9px] text-muted-foreground">{{ kpi.label }}</p>
          <p class="text-xs font-semibold text-foreground">{{ kpi.value }}</p>
          <p :class="cn('flex items-center text-[9px] font-medium', kpi.up ? 'text-primary' : 'text-destructive')">
            <ArrowUp v-if="kpi.up" class="mr-0.5 size-2.5" aria-hidden="true" />
            <ArrowDown v-else class="mr-0.5 size-2.5" aria-hidden="true" />
            {{ kpi.change }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between gap-2">
        <span class="text-[10px] font-medium text-foreground">Recent Orders</span>
        <div class="flex items-center gap-1.5">
          <UiBadge variant="secondary" class="text-[9px]">12 new</UiBadge>
          <span class="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[9px] font-medium text-primary-foreground">
            <Plus class="size-2.5" aria-hidden="true" />
            Create Order
          </span>
        </div>
      </div>

      <div class="space-y-1.5 rounded-md border border-border bg-card p-2.5">
        <div v-for="row in 3" :key="row" class="flex items-center gap-2">
          <span class="h-1.5 w-16 rounded-sm bg-muted" />
          <span class="h-1.5 flex-1 rounded-sm bg-muted-foreground/15" />
          <span class="size-1.5 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  </div>
</template>
