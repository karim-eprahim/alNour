import { useAuthStore } from '@/modules/auth/store'

export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.client) return

  const auth = useAuthStore()
  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }
  if (auth.userRole !== 'DISTRIBUTOR') {
    return navigateTo('/dashboard')
  }
})
