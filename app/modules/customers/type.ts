export interface Customer {
  id: string
  name: string
  phone?: string | null
  address?: string | null
  balance?: number
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
}
