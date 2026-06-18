import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Permission, CreatePermissionPayload, UserPermission } from './type'
import {
  fetchPermissionsApi,
  createPermissionApi,
  deletePermissionApi,
  fetchUserPermissionsApi,
  assignUserPermissionApi,
  removeUserPermissionApi,
} from './api'

export const usePermissionsStore = defineStore('permissions', () => {
  const permissions = ref<Permission[]>([])
  const userPermissions = ref<UserPermission[]>([])
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

  return {
    permissions, userPermissions, loading, error,
    fetchPermissions, createPermission, deletePermission,
    fetchUserPermissions, assignUserPermission, removeUserPermission,
  }
})
