import { initializeApp, cert, getApps, type App } from 'firebase-admin/app'
import { getMessaging, type Messaging } from 'firebase-admin/messaging'

let cachedApp: App | null = null

function resolveCredentials() {
  const config = useRuntimeConfig()
  const admin = config.firebaseAdmin as
    | { projectId?: string; clientEmail?: string; privateKey?: string }
    | undefined

    console.log('[firebase-admin] Resolving credentials from runtime config:', admin)
  if (admin?.projectId && admin?.clientEmail && admin?.privateKey) {
    return {
      projectId: admin.projectId,
      clientEmail: admin.clientEmail,
      // Service account private keys are stored with escaped newlines in .env
      privateKey: admin.privateKey.replace(/\\n/g, '\n'),
    }
  }

  // Backwards compatibility with the previous FIREBASE_SERVICE_ACCOUNT JSON setup
  const legacy = process.env.FIREBASE_SERVICE_ACCOUNT
  if (legacy) {
    try {
      const credentials = JSON.parse(legacy)
      if (credentials.project_id && credentials.client_email && credentials.private_key) {
        return {
          projectId: credentials.project_id,
          clientEmail: credentials.client_email,
          privateKey: credentials.private_key,
        }
      }
    }
    catch (e) {
      console.error('[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT:', e)
    }
  }

  return null
}

function getFirebaseAdminApp(): App | null {
  const existing = getApps()
  if (existing.length) return existing[0]!

  const credentials = resolveCredentials()
  if (!credentials) {
    console.warn('[firebase-admin] Firebase Admin credentials not configured, FCM push is disabled')
    return null
  }

  cachedApp = initializeApp({ credential: cert(credentials) })
  return cachedApp
}

/**
 * Singleton accessor for Firebase Cloud Messaging.
 * Returns null (instead of throwing) when Admin credentials are not
 * configured, so the app keeps working with WebSocket-only delivery.
 */
export function getMessagingInstance(): Messaging | null {
  try {
    const app = getFirebaseAdminApp()
    if (!app) return null
    return getMessaging(app)
  }
  catch (e) {
    console.error('[firebase-admin] Failed to initialize Firebase Admin:', e)
    return null
  }
}
