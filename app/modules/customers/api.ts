import type { LookupResponse, LookupQuery } from '@/types/lookup'
import type { Customer, CreateCustomerPayload } from './type'

export async function fetchCustomersApi(params?: {
  search?: string
  page?: number
  limit?: number
}): Promise<{ customers: Customer[]; total: number; page: number; limit: number }> {
  return $fetch('/api/customers', { params })
}

export async function fetchCustomerApi(id: string): Promise<{ customer: Customer }> {
  return $fetch(`/api/customers/${id}`)
}

export async function createCustomerApi(payload: CreateCustomerPayload): Promise<{ customer: Customer }> {
  return $fetch('/api/customers', { method: 'POST', body: payload })
}

export async function updateCustomerApi(id: string, payload: Partial<CreateCustomerPayload>): Promise<{ customer: Customer }> {
  return $fetch(`/api/customers/${id}`, { method: 'PATCH', body: payload })
}

export async function deleteCustomerApi(id: string): Promise<void> {
  await $fetch(`/api/customers/${id}`, { method: 'DELETE' })
}

export async function fetchCustomersLookupApi(params?: LookupQuery): Promise<LookupResponse> {
  return $fetch<LookupResponse>('/api/customers/lookup', { params })
}

export async function fetchDistributorsLookupApi(params?: LookupQuery): Promise<LookupResponse> {
  return $fetch<LookupResponse>('/api/distributors/lookup', { params })
}
