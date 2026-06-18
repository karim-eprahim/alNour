import type { User } from './useUser'

interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: User
}

export const useAuth = () => {
  const { user, setUser, clearUser } = useUser()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: payload,
      })

      setUser(data.user)
      return data
    } catch (err: any) {
      const message = err?.data?.statusMessage || err?.message || 'Login failed'
      error.value = message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      clearUser()
      navigateTo('/auth/login')
    }
  }

  async function fetchUser() {
    try {
      const data = await $fetch<{ user: User }>('/api/auth/me')
      setUser(data.user)
      return data.user
    } catch {
      clearUser()
      return null
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    fetchUser,
  }
}
