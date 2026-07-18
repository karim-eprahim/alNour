import type { LookupResponse, LookupQuery } from '@/types/lookup'
import type {
  Permission,
  CreatePermissionPayload,
  PermissionsListResponse,
  UserPermissionsResponse,
  GroupedPermissionsResponse,
  RolesListResponse,
  RoleResponse,
  CreateRolePayload,
  ModuleInfo,
  ActionInfo,
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

export async function fetchRolesApi(): Promise<RolesListResponse> {
  return $fetch<RolesListResponse>('/api/roles')
}

export async function createRoleApi(payload: CreateRolePayload): Promise<RoleResponse> {
  return $fetch<RoleResponse>('/api/roles', {
    method: 'POST',
    body: payload,
  })
}

export async function fetchRoleApi(id: string): Promise<RoleResponse> {
  return $fetch<RoleResponse>(`/api/roles/${id}`)
}

export async function updateRoleApi(id: string, payload: Partial<CreateRolePayload>): Promise<RoleResponse> {
  return $fetch<RoleResponse>(`/api/roles/${id}`, {
    method: 'PATCH',
    body: payload,
  })
}

export async function deleteRoleApi(id: string): Promise<void> {
  await $fetch(`/api/roles/${id}`, { method: 'DELETE' })
}

export async function fetchGroupedPermissionsApi(): Promise<GroupedPermissionsResponse> {
  return $fetch<GroupedPermissionsResponse>('/api/permissions/grouped')
}

export async function fetchRolePermissionIdsApi(roleId: string): Promise<{ permissionIds: string[] }> {
  return $fetch<{ permissionIds: string[] }>(`/api/roles/${roleId}/permissions`)
}

export async function saveRolePermissionsApi(roleId: string, permissionIds: string[]): Promise<{ success: boolean }> {
  return $fetch<{ success: boolean }>(`/api/roles/${roleId}/permissions`, {
    method: 'PUT',
    body: { permissionIds },
  })
}

export async function fetchPermissionOptionsApi(): Promise<{ modules: ModuleInfo[]; actions: ActionInfo[] }> {
  return $fetch<{ modules: ModuleInfo[]; actions: ActionInfo[] }>('/api/permissions/options')
}

export async function fetchRolesLookupApi(params?: LookupQuery): Promise<LookupResponse> {
  return $fetch<LookupResponse>('/api/roles/lookup', { params })
}
