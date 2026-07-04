import { useAuthStore } from '@/modules/auth/store'

export function usePermissions() {
  const auth = useAuthStore()

  function has(permission: string): boolean {
    return auth.permissions.has(permission)
  }

  function can(module: string, action: string): boolean {
    return auth.permissions.has(`${module}.${action}`)
  }

  function cannot(module: string, action: string): boolean {
    return !auth.permissions.has(`${module}.${action}`)
  }

  function hasAny(...permissions: string[]): boolean {
    return permissions.some(p => auth.permissions.has(p))
  }

  function hasAll(...permissions: string[]): boolean {
    return permissions.every(p => auth.permissions.has(p))
  }

  return { has, can, cannot, hasAny, hasAll }
}
