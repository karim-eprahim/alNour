export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

import { readonly } from 'vue'

export const useUser = () => {
  const user = useState<User | null>('current-user', () => null)

  function setUser(u: User) {
    user.value = u
  }

  function clearUser() {
    user.value = null
  }

  return {
    user: readonly(user),
    isAuthenticated: computed(() => user.value !== null),
    setUser,
    clearUser,
  }
}
