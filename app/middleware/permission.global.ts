import { usePermissions } from '@/composables/usePermissions'

export default defineNuxtRouteMiddleware((to) => {
  const permission = to.meta?.permission as { module: string; action: string } | undefined
  if (!permission) return
  if (!import.meta.client) return

  const { can } = usePermissions()
  if (!can(permission.module, permission.action)) {
    return navigateTo('/403')
  }
})
