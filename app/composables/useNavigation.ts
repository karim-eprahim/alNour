import type { Component } from 'vue'
import {
  LayoutDashboard,
  Shield,
  Warehouse,
  Package,
  ShoppingBag,
  Truck,
  Factory,
  ArrowRightLeft,
  Users,
  Wallet,
  BookOpen,
  DollarSign,
  Briefcase,
  BarChart3,
  MapPin,
  RefreshCw,
  ClipboardList,
} from '@lucide/vue'

export interface NavItem {
  title: string
  icon?: Component
  to?: string
  badge?: string
  children?: NavItem[]
}

export const useNavigation = () => {
  const navigation: NavItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, to: '/' },
    { title: 'Inventory Dashboard', icon: BarChart3, to: '/inventory' },
    { title: 'Users & Permissions', icon: Shield, to: '/users' },
    {
      title: 'Products',
      icon: ShoppingBag,
      children: [
        { title: 'All Products', to: '/products' },
        { title: 'Add Product', to: '/products' },
      ],
    },
    { title: 'Warehouses', icon: Warehouse, to: '/warehouses' },
    {
      title: 'Raw Materials',
      icon: Package,
      children: [
        { title: 'Charcoal Inventory', to: '/raw-materials' },
        { title: 'Stock Movements', to: '/stock/movements' },
      ],
    },
    {
      title: 'Suppliers & Purchases',
      icon: Truck,
      children: [
        { title: 'Suppliers', to: '/suppliers' },
        { title: 'Purchases', to: '/purchases' },
        { title: 'Weight Tickets', to: '/purchases/weight-tickets' },
      ],
    },
    {
      title: 'Production',
      icon: Factory,
      children: [
        { title: 'Batches', to: '/production/batches' },
        { title: 'Consumption', to: '/production/consumption' },
        { title: 'Output', to: '/production/output' },
      ],
    },
    {
      title: 'Stock',
      icon: ArrowRightLeft,
      children: [
        { title: 'Stock Overview', to: '/stock' },
        { title: 'Stock Movements', to: '/stock/movements' },
        { title: 'Transfers', to: '/stock/transfers' },
      ],
    },
    {
      title: 'Sales',
      icon: Users,
      children: [
        { title: 'Customers', to: '/customers' },
        { title: 'Distributors', to: '/customers/distributors' },
        { title: 'Orders', to: '/sales/orders' },
        { title: 'Invoices', to: '/sales/invoices' },
        { title: 'Payments', to: '/sales/payments' },
      ],
    },
    { title: 'Ledger', icon: BookOpen, to: '/ledger' },
    { title: 'Expenses', icon: DollarSign, to: '/expenses' },
    { title: 'Cash Box', icon: Wallet, to: '/cash-box' },
    {
      title: 'Workers',
      icon: Briefcase,
      children: [
        { title: 'All Workers', to: '/workers' },
        { title: 'Attendance', to: '/workers/attendance' },
        { title: 'Advances', to: '/workers/advances' },
      ],
    },
    { title: 'Productivity', icon: BarChart3, to: '/productivity' },
    { title: 'GPS Tracking', icon: MapPin, to: '/gps-tracking' },
    { title: 'Sync Queue', icon: RefreshCw, to: '/sync-queue' },
    { title: 'Audit Logs', icon: ClipboardList, to: '/audit-logs' },
  ]

  return { navigation }
}
