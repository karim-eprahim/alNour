import { useAuthStore } from '@/modules/auth/store'

const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot']

export default defineNuxtRouteMiddleware(async (to) => {
  if (publicRoutes.includes(to.path)) return

  if (!import.meta.client) return

  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    await auth.fetchUser()
  }

  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }
})
