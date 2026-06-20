import type { SalesOrder, CreateSalesOrderPayload, Invoice, Payment, CreatePaymentPayload } from './type'

export async function fetchSalesOrdersApi(params?: {
  search?: string
  customerId?: string
  warehouseId?: string
  status?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}): Promise<{ orders: SalesOrder[]; total: number; page: number; limit: number }> {
  return $fetch('/api/sales', { params })
}

export async function fetchSalesOrderApi(id: string): Promise<{ order: SalesOrder }> {
  return $fetch(`/api/sales/${id}`)
}

export async function createSalesOrderApi(payload: CreateSalesOrderPayload): Promise<{ order: SalesOrder }> {
  return $fetch('/api/sales', { method: 'POST', body: payload })
}

export async function updateSalesOrderApi(id: string, payload: { status?: string }): Promise<{ order: SalesOrder }> {
  return $fetch(`/api/sales/${id}`, { method: 'PATCH', body: payload })
}

export async function deleteSalesOrderApi(id: string): Promise<void> {
  await $fetch(`/api/sales/${id}`, { method: 'DELETE' })
}

export async function fetchInvoicesApi(params?: {
  search?: string
  customerId?: string
  status?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}): Promise<{ invoices: Invoice[]; total: number; page: number; limit: number }> {
  return $fetch('/api/invoices', { params })
}

export async function fetchInvoiceApi(id: string): Promise<{ invoice: Invoice }> {
  return $fetch(`/api/invoices/${id}`)
}

export async function payInvoiceApi(id: string, payload: CreatePaymentPayload): Promise<{ payment: Payment }> {
  return $fetch(`/api/invoices/${id}/pay`, { method: 'POST', body: payload })
}
