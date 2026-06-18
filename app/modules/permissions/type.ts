export type PermissionAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'
export type ModuleName = 'PRODUCTS' | 'INVENTORY' | 'PURCHASES' | 'SALES' | 'CUSTOMERS' | 'SUPPLIERS' | 'PRODUCTION' | 'WORKERS' | 'ACCOUNTING' | 'REPORTS'

export interface Permission {
  id: string
  role: string
  module: ModuleName
  action: PermissionAction
  createdAt?: string
}

export interface UserPermission {
  id: string
  userId: string
  permissionId: string
  permission: Permission
}

export interface CreatePermissionPayload {
  role: string
  module: ModuleName
  action: PermissionAction
}

export interface PermissionsListResponse {
  permissions: Permission[]
}

export interface UserPermissionsResponse {
  userPermissions: UserPermission[]
}
