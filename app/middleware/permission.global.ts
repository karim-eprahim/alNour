import { useAuthStore } from '@/modules/auth/store'
import { usePermissions } from '@/composables/usePermissions'

export default defineNuxtRouteMiddleware(async (to) => {
  const permission = to.meta?.permission as { module: string; action: string } | undefined
  if (!permission) return

  if (!import.meta.client) return

  const auth = useAuthStore()

  // Always fetch fresh user/permissions — Pinia persist may have stale data.
  await auth.fetchUser()

  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }

  const { can } = usePermissions()
  if (!can(permission.module, permission.action)) {
    return navigateTo('/403')
  }
})
