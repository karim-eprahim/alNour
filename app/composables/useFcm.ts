import { ref, onUnmounted } from 'vue'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/modules/auth/store'

export function useFcm() {
  const authStore = useAuthStore()
  const fcmToken = ref<string | null>(null)
  const permissionGranted = ref(false)
  let messaging: any = null
  let unsubscribeForeground: (() => void) | null = null

  async function requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('[FCM] Notification API not available')
      return false
    }
    const result = await Notification.requestPermission()
    permissionGranted.value = result === 'granted'
    return permissionGranted.value
  }

  async function registerTokenOnServer(token: string) {
    try {
      await $fetch('/api/notifications/register-token', {
        method: 'POST',
        body: { token, deviceType: 'web' },
      })
    } catch (err) {
      console.error('[FCM] Failed to register token on server:', err)
    }
  }

  async function init() {
    console.log('[FCM] Initializing Firebase Cloud Messaging...',import.meta.client,authStore.isAuthenticated)
    if (!import.meta.client) return
    if (!authStore.isAuthenticated) return

    const { initializeApp, getApps, getApp } = await import('firebase/app')
    const { getMessaging, getToken, onMessage } = await import('firebase/messaging')

    const runtimeConfig = useRuntimeConfig()
    const firebaseConfig = runtimeConfig.public.firebase

    if (getApps().length === 0) {
      initializeApp(firebaseConfig)
    }
    const app = getApp()
    console.log('[FCM] Firebase app initialized:', app)

    const granted = await requestPermission()
    if (!granted) {
      console.warn('[FCM] Notification permission denied')
      return
    }

    messaging = getMessaging(app)
    
    try {
const currentToken = await getToken(messaging, {
  vapidKey: firebaseConfig.vapidKey,
})
      console.log('[FCM] Current registration token:', currentToken)
      if (currentToken) {
        fcmToken.value = currentToken
        await registerTokenOnServer(currentToken)
      } else {
        console.warn('[FCM] No registration token available')
        return
      }
    } catch (err) {
      console.error('[FCM] Error getting token:', err)
      return
    }
    unsubscribeForeground = onMessage(messaging, (payload) => {
      const title = payload.notification?.title || 'Notification'
      const body = payload.notification?.body || ''

      toast(title, {
        description: body,
      })
    })
  }

  function cleanup() {
    if (unsubscribeForeground) {
      unsubscribeForeground()
      unsubscribeForeground = null
    }
  }

  onUnmounted(() => cleanup())

  return {
    fcmToken,
    permissionGranted,
    init,
    cleanup,
  }
}