export interface LedgerEntry {
  id: string
  customerId?: string | null
  supplierId?: string | null
  workerId?: string | null
  distributorId?: string | null
  amount: number
  type: 'DEBIT' | 'CREDIT'
  description?: string | null
  createdAt: string
  customer?: { id: string; name: string } | null
  supplier?: { id: string; name: string } | null
  worker?: { id: string; name: string } | null
  distributor?: { id: string; name: string } | null
}

export interface CreateLedgerEntryPayload {
  customerId?: string
  supplierId?: string
  workerId?: string
  distributorId?: string
  amount: number
  type: 'DEBIT' | 'CREDIT'
  description?: string
}

export interface UpdateLedgerEntryPayload {
  amount?: number
  type?: 'DEBIT' | 'CREDIT'
  description?: string
  customerId?: string
  supplierId?: string
  workerId?: string
  distributorId?: string
}

export interface LedgerSummary {
  totalDebit: number
  totalCredit: number
  balance: number
  totalEntries: number
}

export interface LedgerQueryParams {
  customerId?: string
  supplierId?: string
  workerId?: string
  distributorId?: string
  type?: 'DEBIT' | 'CREDIT'
  search?: string
  dateFrom?: string
  dateTo?: string
  amountMin?: number
  amountMax?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  page?: number
  limit?: number
}
