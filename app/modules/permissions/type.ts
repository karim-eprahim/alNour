export interface ModuleInfo {
  id: string
  name: string
  label: string
}

export interface ActionInfo {
  id: string
  name: string
  label: string
}

export interface Permission {
  id: string
  moduleId: string
  actionId: string
  label: string
  module?: ModuleInfo
  action?: ActionInfo
}

export interface PermissionWithModule {
  id: string
  actionId: string
  action: string
  actionLabel: string
  label: string
}

export interface PermissionGroup {
  id: string
  name: string
  label: string
  permissions: PermissionWithModule[]
}

export interface Role {
  id: string
  name: string
  label?: string | null
  createdAt: string
  updatedAt: string
  _count?: { users: number }
  permissions?: RolePermission[]
}

export interface RolePermission {
  id: string
  roleId: string
  permissionId: string
  permission?: Permission
}

export interface UserPermission {
  id: string
  userId: string
  permissionId: string
  permission: Permission
}

export interface CreatePermissionPayload {
  moduleId: string
  actionId: string
  label: string
}

export interface CreateRolePayload {
  name: string
  label?: string
}

export interface PermissionsListResponse {
  permissions: Permission[]
}

export interface GroupedPermissionsResponse {
  modules: PermissionGroup[]
}

export interface RolesListResponse {
  roles: Role[]
}

export interface RoleResponse {
  role: Role
}

export interface UserPermissionsResponse {
  userPermissions: UserPermission[]
}
