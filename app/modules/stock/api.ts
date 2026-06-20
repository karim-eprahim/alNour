import type {
  StockEntry,
  StockMovement,
  CreateMovementPayload,
  StockTransfer,
} from './type'

export async function fetchStockApi(params?: {
  warehouseId?: string
  productId?: string
  lowStock?: string
}): Promise<{ stocks: StockEntry[]; total: number }> {
  return $fetch<{ stocks: StockEntry[]; total: number }>('/api/stock', { params })
}

export async function fetchMovementsApi(params?: {
  productId?: string
  warehouseId?: string
  type?: string
  page?: number
  limit?: number
}): Promise<{ movements: StockMovement[]; total: number; page: number; limit: number }> {
  return $fetch<{ movements: StockMovement[]; total: number; page: number; limit: number }>('/api/stock/movements', { params })
}

export async function createMovementApi(payload: CreateMovementPayload): Promise<{ movement: StockMovement }> {
  return $fetch<{ movement: StockMovement }>('/api/stock/movements', {
    method: 'POST',
    body: payload,
  })
}

export async function createTransferApi(payload: {
  fromWarehouseId: string
  toWarehouseId: string
  items: { productId: string; quantity: number }[]
  status?: string
}): Promise<{ transfer: StockTransfer }> {
  return $fetch<{ transfer: StockTransfer }>('/api/stock/transfers', {
    method: 'POST',
    body: payload,
  })
}

export async function completeTransferApi(id: string): Promise<void> {
  await $fetch<void>(`/api/stock/transfers/${id}/complete`, { method: 'PATCH' })
}

export async function uploadImageApi(dataUrl: string, name?: string): Promise<{ url: string }> {
  return $fetch<{ url: string }>('/api/upload', {
    method: 'POST',
    body: { image: dataUrl, name },
  })
}
