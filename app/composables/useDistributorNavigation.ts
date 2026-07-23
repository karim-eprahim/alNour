import type { Component } from 'vue'
import {
  LayoutDashboard,
  Package,
  Users,
  ClipboardList,
  Receipt,
  DollarSign,
  Undo2,
  User,
  PlusCircle,
} from '@lucide/vue'

export interface DistributorNavItem {
  title: string
  icon?: Component
  to?: string
  badge?: string
}

export const useDistributorNavigation = () => {
  const route = useRoute()

  const desktopNav: DistributorNavItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, to: '/distributor' },
    { title: 'My Stock', icon: Package, to: '/distributor/stock' },
    { title: 'Customers', icon: Users, to: '/distributor/customers' },
    { title: 'Orders', icon: ClipboardList, to: '/distributor/orders' },
    { title: 'Invoices', icon: Receipt, to: '/distributor/invoices' },
    { title: 'Payments', icon: DollarSign, to: '/distributor/payments' },
    { title: 'Returns', icon: Undo2, to: '/distributor/returns' },
    { title: 'Profile', icon: User, to: '/distributor/profile' },
  ]

  const mobileNav: DistributorNavItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, to: '/distributor' },
    { title: 'Stock', icon: Package, to: '/distributor/stock' },
    { title: 'New Sale', icon: PlusCircle, to: '/distributor/customers' },
    { title: 'Payments', icon: DollarSign, to: '/distributor/payments' },
    { title: 'Profile', icon: User, to: '/distributor/profile' },
  ]

  function isActive(path?: string) {
    if (!path) return false
    if (path === '/distributor') return route.path === '/distributor'
    return route.path.startsWith(path)
  }

  return { desktopNav, mobileNav, isActive }
}
