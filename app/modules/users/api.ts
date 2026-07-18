import type { LookupResponse, LookupQuery } from '@/types/lookup'
import type {
  CreateUserPayload,
  UpdateUserPayload,
  UsersListResponse,
  UserResponse,
} from './type'

export async function fetchUsersApi(params?: { search?: string; role?: string; status?: string }): Promise<UsersListResponse> {
  return $fetch<UsersListResponse>('/api/users', { params })
}

export async function fetchUserApi(id: string): Promise<UserResponse> {
  return $fetch<UserResponse>(`/api/users/${id}`)
}

export async function createUserApi(payload: CreateUserPayload): Promise<UserResponse> {
  return $fetch<UserResponse>('/api/users', {
    method: 'POST',
    body: payload,
  })
}

export async function updateUserApi(id: string, payload: UpdateUserPayload): Promise<UserResponse> {
  return $fetch<UserResponse>(`/api/users/${id}`, {
    method: 'PATCH',
    body: payload,
  })
}

export async function deleteUserApi(id: string): Promise<void> {
  await $fetch<{ success: boolean }>(`/api/users/${id}`, { method: 'DELETE' })
}

export async function fetchUsersLookupApi(params?: LookupQuery): Promise<LookupResponse> {
  return $fetch<LookupResponse>('/api/users/lookup', { params })
}
