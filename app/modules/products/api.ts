import type {
  CreateProductPayload,
  UpdateProductPayload,
  ProductsListResponse,
  ProductResponse,
} from './type'

export async function fetchProductsApi(params?: {
  search?: string
  type?: string
  warehouseId?: string
}): Promise<ProductsListResponse> {
  return $fetch<ProductsListResponse>('/api/products', { params })
}

export async function fetchProductApi(id: string): Promise<ProductResponse> {
  return $fetch<ProductResponse>(`/api/products/${id}`)
}

export async function createProductApi(payload: CreateProductPayload): Promise<ProductResponse> {
  return $fetch<ProductResponse>('/api/products', {
    method: 'POST',
    body: payload,
  })
}

export async function updateProductApi(id: string, payload: UpdateProductPayload): Promise<ProductResponse> {
  return $fetch<ProductResponse>(`/api/products/${id}`, {
    method: 'PATCH',
    body: payload,
  })
}

export async function deleteProductApi(id: string): Promise<void> {
  await $fetch(`/api/products/${id}`, { method: 'DELETE' })
}
