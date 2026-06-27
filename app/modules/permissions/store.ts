import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  Permission,
  CreatePermissionPayload,
  UserPermission,
  Role,
  CreateRolePayload,
} from './type'
import {
  fetchPermissionsApi,
  createPermissionApi,
  deletePermissionApi,
  fetchUserPermissionsApi,
  assignUserPermissionApi,
  removeUserPermissionApi,
  fetchRolesApi,
  createRoleApi,
  deleteRoleApi,
} from './api'

export const usePermissionsStore = defineStore('permissions', () => {
  const permissions = ref<Permission[]>([])
  const userPermissions = ref<UserPermission[]>([])
  const roles = ref<Role[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPermissions() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchPermissionsApi()
      permissions.value = data.permissions
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Failed to fetch permissions'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createPermission(payload: CreatePermissionPayload) {
    loading.value = true
    error.value = null
    try {
      const data = await createPermissionApi(payload)
      permissions.value.push(data.permission)
      return data.permission
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Failed to create permission'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deletePermission(id: string) {
    loading.value = true
    error.value = null
    try {
      await deletePermissionApi(id)
      permissions.value = permissions.value.filter((p) => p.id !== id)
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Failed to delete permission'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchUserPermissions(userId: string) {
    loading.value = true
    error.value = null
    try {
      const data = await fetchUserPermissionsApi(userId)
      userPermissions.value = data.userPermissions
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Failed to fetch user permissions'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function assignUserPermission(userId: string, permissionId: string) {
    loading.value = true
    error.value = null
    try {
      const data = await assignUserPermissionApi(userId, permissionId)
      userPermissions.value.push(data.userPermission)
      return data.userPermission
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Failed to assign permission'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function removeUserPermission(userId: string, permissionId: string) {
    loading.value = true
    error.value = null
    try {
      await removeUserPermissionApi(userId, permissionId)
      userPermissions.value = userPermissions.value.filter(
        (up) => up.permissionId !== permissionId
      )
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Failed to remove permission'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchRoles() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchRolesApi()
      roles.value = data.roles
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Failed to fetch roles'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createRole(payload: CreateRolePayload) {
    loading.value = true
    error.value = null
    try {
      const data = await createRoleApi(payload)
      roles.value.push(data.role)
      return data.role
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Failed to create role'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function removeRole(id: string) {
    loading.value = true
    error.value = null
    try {
      await deleteRoleApi(id)
      roles.value = roles.value.filter((r) => r.id !== id)
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Failed to delete role'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    permissions, userPermissions, roles, loading, error,
    fetchPermissions, createPermission, deletePermission,
    fetchUserPermissions, assignUserPermission, removeUserPermission,
    fetchRoles, createRole, removeRole,
  }
})
