export interface Customer {
  id: string
  name: string
  phone?: string | null
  address?: string | null
  latitude?: number | null
  longitude?: number | null
  balance?: number
  netBalance?: number
  linkedSupplier?: { id: string; name: string; balance?: number } | null
  createdAt: string
  updatedAt: string
  _count?: { salesOrders: number; invoices: number }
  salesOrders?: any[]
  invoices?: any[]
  ledgerEntries?: any[]
}

export interface CreateCustomerPayload {
  name: string
  phone?: string
  address?: string
  latitude?: number | null
  longitude?: number | null
  linkedSupplierId?: string | null
}
