import type {
  DistributorCustodyItem,
  DistributorOrder,
  DistributorInvoice,
  DistributorPayment,
  DistributorCashMovement,
  CreateDirectSalePayload,
  CompleteDeliveryPayload,
} from './type'

export async function fetchCustodyApi(): Promise<{ custodies: DistributorCustodyItem[]; totalItems: number; totalValue: number }> {
  return $fetch('/api/distributors/custody')
}

export async function fetchDistributorOrdersApi(params?: {
  search?: string
  status?: string
  page?: number
  limit?: number
}): Promise<{ orders: DistributorOrder[]; total: number; page: number; limit: number }> {
  return $fetch('/api/distributors/orders', { params })
}

export async function completeDeliveryApi(id: string, payload: CompleteDeliveryPayload): Promise<{ invoice: DistributorInvoice }> {
  return $fetch(`/api/distributors/orders/${id}/complete`, { method: 'POST', body: payload })
}

export async function createDirectSaleApi(payload: CreateDirectSalePayload): Promise<{ invoice: DistributorInvoice }> {
  return $fetch('/api/distributors/sales', { method: 'POST', body: payload })
}

export async function fetchDistributorInvoicesApi(params?: {
  search?: string
  customerId?: string
  status?: string
  page?: number
  limit?: number
}): Promise<{ invoices: DistributorInvoice[]; total: number; page: number; limit: number }> {
  return $fetch('/api/invoices', { params: { ...params, saleSource: 'DIRECT_DISTRIBUTOR' } })
}

export async function fetchAssignedInvoicesApi(params?: {
  search?: string
  customerId?: string
  status?: string
  page?: number
  limit?: number
}): Promise<{ invoices: DistributorInvoice[]; total: number; page: number; limit: number }> {
  return $fetch('/api/invoices', { params })
}

export async function payInvoiceApi(id: string, payload: { amount: number; paymentMethod: string; notes?: string }): Promise<{ payment: DistributorPayment }> {
  return $fetch(`/api/invoices/${id}/pay`, { method: 'POST', body: payload })
}

export async function returnInventoryApi(payload: { productId: string; warehouseId: string; quantity: number; notes?: string }): Promise<any> {
  return $fetch('/api/distributors/return', { method: 'POST', body: payload })
}

export async function fetchCashOnHandApi(distributorId?: string): Promise<{ distributor: { id: string; name: string; cashOnHand: number } }> {
  return $fetch('/api/distributors/cash', { params: { distributorId } })
}

export async function fetchCashMovementsApi(params?: {
  type?: string
  page?: number
  limit?: number
}): Promise<{ movements: DistributorCashMovement[]; total: number; page: number; limit: number }> {
  return $fetch('/api/distributors/cash/movements', { params })
}
