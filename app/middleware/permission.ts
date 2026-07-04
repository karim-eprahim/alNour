import { useAuthStore } from '@/modules/auth/store'
import { usePermissions } from '@/composables/usePermissions'

export default defineNuxtRouteMiddleware(async (to) => {
  const permission = to.meta?.permission as { module: string; action: string } | undefined
  if (!permission) return

  const auth = useAuthStore()
  if (!auth.isAuthenticated) {
    await auth.fetchUser()
  }

  const { can } = usePermissions()
  if (!can(permission.module, permission.action)) {
    return navigateTo('/403')
  }
})
