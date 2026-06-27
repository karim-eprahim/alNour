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
      to:'/products',
      // children: [
      //   { title: 'All Products', to: '/products' },
      //   { title: 'Add Product', to: '/products' },
      // ],
    },
    { title: 'Warehouses', icon: Warehouse, to: '/warehouses' },
    {
      title: 'Suppliers & Purchases',
      icon: Truck,
      children: [
        { title: 'Suppliers', to: '/suppliers' },
        { title: 'Purchases', to: '/purchases' },
        { title: 'Weight Tickets', to: '/purchases/weight-tickets' },
        { title: 'Purchases Report', to: '/purchases/report' },
      ],
    },
        {
      title: 'Workers',
      icon: Briefcase,
      children: [
        { title: 'All Workers', to: '/workers' },
        { title: 'Attendance', to: '/workers/attendance' },
        { title: 'Advances', to: '/workers/advances' },
      ],
    },
    {
      title: 'Production',
      icon: Factory,
      children: [
        { title: 'Batches', to: '/production' },
        { title: 'New Batch', to: '/production/new' },
        { title: 'Reports', to: '/production/report' },
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
    { title: 'Expenses', icon: DollarSign, to: '/expenses' },
    // { title: 'Cash Box', icon: Wallet, to: '/cash-box' },
    // { title: 'Productivity', icon: BarChart3, to: '/productivity' },
    { title: 'GPS Tracking', icon: MapPin, to: '/gps-tracking' },
    { title: 'Sync Queue', icon: RefreshCw, to: '/sync-queue' },
    { title: 'Audit Logs', icon: ClipboardList, to: '/audit-logs' },
  ]

  return { navigation }
}
