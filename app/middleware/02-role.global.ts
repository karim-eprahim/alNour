import { useAuthStore } from '@/modules/auth/store'

const publicRoutes = ['/auth/login', '/auth/register']
const distributorPrefix = '/distributor'

export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return
  if (publicRoutes.includes(to.path)) return

  const auth = useAuthStore()
  if (!auth.isAuthenticated) return

  const isDistributorRoute = to.path.startsWith(distributorPrefix)

  if (auth.userRole === 'DISTRIBUTOR') {
    if (!isDistributorRoute) {
      return navigateTo('/distributor')
    }
  } else {
    if (isDistributorRoute) {
      return navigateTo('/dashboard')
    }
  }
})
