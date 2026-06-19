export interface Supplier {
  id: string
  name: string
  phone?: string | null
  email?: string | null
  address?: string | null
  company?: string | null
  createdAt: string
  updatedAt: string
  balance?: number
  _count?: { purchaseInvoices: number; ledgerEntries: number }
}

export interface CreateSupplierPayload {
  name: string
  phone?: string
  email?: string
  address?: string
  company?: string
}

export interface UpdateSupplierPayload {
  name?: string
  phone?: string | null
  email?: string | null
  address?: string | null
  company?: string | null
}

export interface LedgerEntry {
  id: string
  supplierId?: string | null
  customerId?: string | null
  amount: number
  type: 'DEBIT' | 'CREDIT'
  description?: string | null
  createdAt: string
}
