import type { Supplier, CreateSupplierPayload, UpdateSupplierPayload, LedgerEntry } from './type'

export async function fetchSuppliersApi(params?: { search?: string }): Promise<{ suppliers: Supplier[]; total: number }> {
  return $fetch('/api/suppliers', { params })
}

export async function fetchSupplierApi(id: string): Promise<{ supplier: Supplier & { purchaseInvoices: any[]; ledgerEntries: LedgerEntry[] } }> {
  return $fetch(`/api/suppliers/${id}`)
}

export async function createSupplierApi(payload: CreateSupplierPayload): Promise<{ supplier: Supplier }> {
  return $fetch('/api/suppliers', { method: 'POST', body: payload })
}

export async function updateSupplierApi(id: string, payload: UpdateSupplierPayload): Promise<{ supplier: Supplier }> {
  return $fetch(`/api/suppliers/${id}`, { method: 'PATCH', body: payload })
}

export async function deleteSupplierApi(id: string): Promise<void> {
  await $fetch(`/api/suppliers/${id}`, { method: 'DELETE' })
}

export async function addLedgerEntryApi(supplierId: string, payload: { amount: number; type: 'DEBIT' | 'CREDIT'; description?: string }): Promise<{ entry: LedgerEntry }> {
  return $fetch(`/api/suppliers/${supplierId}/ledger`, { method: 'POST', body: payload })
}
