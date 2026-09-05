import { ref, onUnmounted } from 'vue'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/modules/auth/store'

export const FCM_TOKEN_STORAGE_KEY = 'alnour-fcm-token'

export function useFcm() {
  const authStore = useAuthStore()
  const fcmToken = ref<string | null>(null)
  const permissionGranted = ref(false)
  let messaging: any = null
  let unsubscribeForeground: (() => void) | null = null

  function getStoredToken(): string | null {
    try {
      return localStorage.getItem(FCM_TOKEN_STORAGE_KEY)
    }
    catch {
      return null
    }
  }

  function setStoredToken(token: string | null) {
    try {
      if (token) localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token)
      else localStorage.removeItem(FCM_TOKEN_STORAGE_KEY)
    }
    catch {
      // storage unavailable (SSR/private mode) — non-fatal
    }
  }

  /**
   * Explicit user-action entry point (e.g. a settings-page toggle).
   * Only prompts the browser when permission is still undecided ('default');
   * never re-prompts after a denial — the user must re-enable via browser UI.
   */
  async function requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('[FCM] Notification API not available')
      return false
    }
    if (Notification.permission === 'granted') {
      permissionGranted.value = true
      return true
    }
    if (Notification.permission === 'denied') {
      permissionGranted.value = false
      console.warn('[FCM] Notification permission previously denied')
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
    }
    catch (err) {
      console.error('[FCM] Failed to register token on server:', err)
    }
  }

  async function init() {
    console.log('[FCM] Initializing Firebase Cloud Messaging...', import.meta.client, authStore.isAuthenticated)
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
      console.warn('[FCM] Notification permission not granted')
      return
    }

    messaging = getMessaging(app)

    try {
      // No onTokenRefresh in the modular SDK — re-fetch on every init and
      // re-register whenever the token rotated.
      const currentToken = await getToken(messaging, {
        vapidKey: firebaseConfig.vapidKey,
      })
      console.log('[FCM] Current registration token:', currentToken)
      if (!currentToken) {
        console.warn('[FCM] No registration token available')
        return
      }
      fcmToken.value = currentToken
      if (currentToken !== getStoredToken()) {
        await registerTokenOnServer(currentToken)
        setStoredToken(currentToken)
      }
    }
    catch (err) {
      console.error('[FCM] Error getting token:', err)
      return
    }

    if (unsubscribeForeground) {
      unsubscribeForeground()
      unsubscribeForeground = null
    }
    unsubscribeForeground = onMessage(messaging, (payload) => {
      const title = payload.notification?.title || 'Notification'
      const body = payload.notification?.body || ''

      toast(title, {
        description: body,
      })
    })
  }

  async function unregisterToken() {
    const token = fcmToken.value || getStoredToken()
    if (token) {
      try {
        await $fetch('/api/notifications/unregister-token', {
          method: 'POST',
          body: { token },
        })
      }
      catch (err) {
        console.error('[FCM] Failed to unregister token on server:', err)
      }
    }
    fcmToken.value = null
    setStoredToken(null)
    cleanup()
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
    requestPermission,
    unregisterToken,
  }
}
