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
  permission?: { module: string; action: string }
}

export const useNavigation = () => {
  const navigation: NavItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, to: '/', permission: { module: 'DASHBOARD', action: 'READ' } },
    { title: 'Inventory Dashboard', icon: BarChart3, to: '/inventory', permission: { module: 'INVENTORY', action: 'READ' } },
    { title: 'Users & Permissions', icon: Shield, to: '/users', permission: { module: 'USERS', action: 'READ' } },
    {
      title: 'Products',
      icon: ShoppingBag,
      to:'/products',
      permission: { module: 'PRODUCTS', action: 'READ' },
    },
    { title: 'Warehouses', icon: Warehouse, to: '/warehouses', permission: { module: 'WAREHOUSES', action: 'READ' } },
    {
      title: 'Suppliers & Purchases',
      icon: Truck,
      permission: { module: 'PURCHASES', action: 'READ' },
      children: [
        { title: 'Suppliers', to: '/suppliers', permission: { module: 'SUPPLIERS', action: 'READ' } },
        { title: 'Purchases', to: '/purchases', permission: { module: 'PURCHASES', action: 'READ' } },
        { title: 'Weight Tickets', to: '/purchases/weight-tickets', permission: { module: 'PURCHASES', action: 'READ' } },
        { title: 'Purchases Report', to: '/purchases/report', permission: { module: 'PURCHASES', action: 'READ' } },
      ],
    },
    {
      title: 'Workers',
      icon: Briefcase,
      permission: { module: 'WORKERS', action: 'READ' },
      children: [
        { title: 'All Workers', to: '/workers', permission: { module: 'WORKERS', action: 'READ' } },
        { title: 'Attendance', to: '/workers/attendance', permission: { module: 'WORKERS', action: 'READ' } },
        { title: 'Advances', to: '/workers/advances', permission: { module: 'WORKERS', action: 'READ' } },
      ],
    },
    {
      title: 'Production',
      icon: Factory,
      permission: { module: 'PRODUCTION', action: 'READ' },
      children: [
        { title: 'Batches', to: '/production', permission: { module: 'PRODUCTION', action: 'READ' } },
        { title: 'New Batch', to: '/production/new', permission: { module: 'PRODUCTION', action: 'CREATE' } },
        { title: 'Reports', to: '/production/report', permission: { module: 'PRODUCTION', action: 'READ' } },
      ],
    },
    {
      title: 'Stock',
      icon: ArrowRightLeft,
      permission: { module: 'STOCK', action: 'READ' },
      children: [
        { title: 'Stock Overview', to: '/stock', permission: { module: 'STOCK', action: 'READ' } },
        { title: 'Stock Movements', to: '/stock/movements', permission: { module: 'STOCK', action: 'READ' } },
        { title: 'Transfers', to: '/stock/transfers', permission: { module: 'STOCK', action: 'CREATE' } },
      ],
    },
    {
      title: 'Sales',
      icon: Users,
      permission: { module: 'SALES', action: 'READ' },
      children: [
        { title: 'Customers', to: '/customers', permission: { module: 'SALES', action: 'READ' } },
        { title: 'Distributors', to: '/customers/distributors', permission: { module: 'SALES', action: 'READ' } },
        { title: 'Orders', to: '/sales/orders', permission: { module: 'SALES', action: 'READ' } },
        { title: 'Invoices', to: '/sales/invoices', permission: { module: 'SALES', action: 'READ' } },
        { title: 'Payments', to: '/sales/payments', permission: { module: 'SALES', action: 'READ' } },
      ],
    },
    { title: 'Expenses', icon: DollarSign, to: '/expenses', permission: { module: 'EXPENSES', action: 'READ' } },
    { title: 'GPS Tracking', icon: MapPin, to: '/gps-tracking', permission: { module: 'GPS', action: 'READ' } },
    { title: 'Sync Queue', icon: RefreshCw, to: '/sync-queue', permission: { module: 'SYSTEM', action: 'READ' } },
    { title: 'Audit Logs', icon: ClipboardList, to: '/audit-logs', permission: { module: 'AUDIT', action: 'READ' } },
  ]

  return { navigation }
}
