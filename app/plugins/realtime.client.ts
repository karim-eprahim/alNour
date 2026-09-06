import { useAuthStore } from '@/modules/auth/store'
import { useRealtimeStore } from '@/stores/realtime'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  const realtimeStore = useRealtimeStore()

  const unwatch = authStore.$subscribe(() => {
    realtimeStore.onAuthChange(authStore.isAuthenticated)
  })

  console.log("llllllllllllllllllonw",authStore.isAuthenticated)
  if (authStore.isAuthenticated) {
    realtimeStore.connect()
  }

  if (import.meta.client) {
    window.addEventListener('beforeunload', () => {
      unwatch()
      realtimeStore.disconnect()
    })
  }
})