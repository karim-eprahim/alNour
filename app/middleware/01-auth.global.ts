import { useAuthStore } from '@/modules/auth/store'

const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot']

export default defineNuxtRouteMiddleware(async (to) => {
  if (!import.meta.client) return

  const auth = useAuthStore()

  await auth.initialize()

  if (publicRoutes.includes(to.path)) return

  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }
})