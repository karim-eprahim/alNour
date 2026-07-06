import { useAuthStore } from '@/modules/auth/store'

export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ['/auth/login', '/auth/register']

  if (publicRoutes.includes(to.path)) {
    return
  }

  const auth = useAuthStore()

  // On the server, localStorage doesn't exist, so Pinia persist can't hydrate.
  // Skip fetchUser() on SSR — let the page render, the client will verify on mount.
  // API endpoints are still protected by server middleware.
  if (import.meta.client) {
    if (!auth.isAuthenticated) {
      await auth.fetchUser()
    }

    if (!auth.isAuthenticated) {
      return navigateTo('/auth/login')
    }
  }
})
