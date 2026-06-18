import {useAuthStore} from "@/modules/auth/store"
export default defineNuxtRouteMiddleware(async (to, from) => {
  const publicRoutes = ['/auth/login', '/auth/register']


  if (publicRoutes.includes(to.path)) {
    return
  }

  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    await auth.fetchUser()
  }

  if (!auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }
})
