import type { PurchaseInvoice, CreatePurchasePayload, WeightTicket, CreateWeightTicketPayload, PurchaseReportSummary } from './type'

export async function fetchPurchasesApi(params?: {
  search?: string
  supplierId?: string
  warehouseId?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}): Promise<{ invoices: PurchaseInvoice[]; total: number; page: number; limit: number }> {
  return $fetch('/api/purchases', { params })
}

export async function fetchPurchaseApi(id: string): Promise<{ invoice: PurchaseInvoice }> {
  return $fetch(`/api/purchases/${id}`)
}

export async function createPurchaseApi(payload: CreatePurchasePayload): Promise<{ invoice: PurchaseInvoice }> {
  return $fetch('/api/purchases', { method: 'POST', body: payload })
}

export async function payPurchaseApi(id: string, payload: { amount: number; description?: string }): Promise<{ invoice: PurchaseInvoice }> {
  return $fetch(`/api/purchases/${id}/pay`, { method: 'POST', body: payload })
}

export async function createWeightTicketApi(payload: CreateWeightTicketPayload): Promise<{ ticket: WeightTicket }> {
  return $fetch('/api/purchases/weight-tickets', { method: 'POST', body: payload })
}

export async function deleteWeightTicketApi(id: string): Promise<void> {
  await $fetch(`/api/purchases/weight-tickets/${id}`, { method: 'DELETE' })
}

export async function fetchPurchaseReportApi(params?: {
  supplierId?: string
  warehouseId?: string
  startDate?: string
  endDate?: string
}): Promise<{ invoices: PurchaseInvoice[]; summary: PurchaseReportSummary }> {
  return $fetch('/api/purchases/report', { params })
}
