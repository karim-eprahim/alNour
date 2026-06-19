import type {
  CreateWarehousePayload,
  UpdateWarehousePayload,
  WarehousesListResponse,
  WarehouseResponse,
} from './type'

export async function fetchWarehousesApi(params?: { search?: string }): Promise<WarehousesListResponse> {
  return $fetch<WarehousesListResponse>('/api/warehouses', { params })
}

export async function fetchWarehouseApi(id: string): Promise<WarehouseResponse> {
  return $fetch<WarehouseResponse>(`/api/warehouses/${id}`)
}

export async function createWarehouseApi(payload: CreateWarehousePayload): Promise<WarehouseResponse> {
  return $fetch<WarehouseResponse>('/api/warehouses', {
    method: 'POST',
    body: payload,
  })
}

export async function updateWarehouseApi(id: string, payload: UpdateWarehousePayload): Promise<WarehouseResponse> {
  return $fetch<WarehouseResponse>(`/api/warehouses/${id}`, {
    method: 'PATCH',
    body: payload,
  })
}

export async function deleteWarehouseApi(id: string): Promise<void> {
  await $fetch(`/api/warehouses/${id}`, { method: 'DELETE' })
}
