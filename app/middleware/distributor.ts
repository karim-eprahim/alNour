import { useAuthStore } from '@/modules/auth/store'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    const auth = useAuthStore()
    if (!auth.isAuthenticated) {
      await auth.fetchUser()
    }
    if (!auth.isAuthenticated) {
      return navigateTo('/auth/login')
    }
    if (auth.userRole !== 'DISTRIBUTOR') {
      return navigateTo('/')
    }
  }
})
