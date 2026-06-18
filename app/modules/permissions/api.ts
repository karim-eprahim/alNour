import type {
  Permission,
  CreatePermissionPayload,
  PermissionsListResponse,
  UserPermissionsResponse,
} from './type'

export async function fetchPermissionsApi(): Promise<PermissionsListResponse> {
  return $fetch<PermissionsListResponse>('/api/permissions')
}

export async function createPermissionApi(payload: CreatePermissionPayload): Promise<{ permission: Permission }> {
  return $fetch<{ permission: Permission }>('/api/permissions', {
    method: 'POST',
    body: payload,
  })
}

export async function deletePermissionApi(id: string): Promise<void> {
  await $fetch<{ success: boolean }>(`/api/permissions/${id}`, { method: 'DELETE' })
}

export async function fetchUserPermissionsApi(userId: string): Promise<UserPermissionsResponse> {
  return $fetch<UserPermissionsResponse>(`/api/users/${userId}/permissions`)
}

export async function assignUserPermissionApi(userId: string, permissionId: string): Promise<{ userPermission: UserPermission }> {
  return $fetch<{ userPermission: UserPermission }>(`/api/users/${userId}/permissions`, {
    method: 'POST',
    body: { permissionId },
  })
}

export async function removeUserPermissionApi(userId: string, permissionId: string): Promise<void> {
  await $fetch<{ success: boolean }>(`/api/users/${userId}/permissions/${permissionId}`, { method: 'DELETE' })
}
