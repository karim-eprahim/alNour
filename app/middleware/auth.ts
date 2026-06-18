export default defineNuxtRouteMiddleware(async (to, from) => {
  const publicRoutes = ['/auth/login', '/auth/register']

  if (publicRoutes.includes(to.path)) {
    return
  }

  const { user, fetchUser } = useAuth()

  if (!user.value) {
    await fetchUser()
  }

  if (!user.value) {
    return navigateTo('/auth/login')
  }
})
