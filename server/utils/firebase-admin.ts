import { initializeApp, cert, getApps, type App } from 'firebase-admin/app'
import { getMessaging, type Messaging } from 'firebase-admin/messaging'

let cachedApp: App | null = null

/**
 * Normalizes a PEM private key pasted into .env.
 * Handles: surrounding quotes, single-escaped \n, double-escaped \\n
 * (single-quoted dotenv values), real newlines, and CRLF.
 */
function normalizePrivateKey(raw: string): string {
  let key = raw.trim()
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1)
  }
  key = key.replace(/\\\\n/g, '\n') // double-escaped \\n -> newline
  key = key.replace(/\\n/g, '\n') // escaped \n -> newline
  key = key.replace(/\r\n?/g, '\n')
  return key.trim()
}

function isPlausiblePrivateKey(key: string): boolean {
  return (
    key.includes('-----BEGIN') &&
    key.includes('PRIVATE KEY-----') &&
    key.includes('-----END') &&
    key.length > 500 && // a real RSA key is ~1600+ chars; anything shorter is truncated
    !key.includes('....')
  )
}

function resolveCredentials() {
  const config = useRuntimeConfig()
  const admin = config.firebaseAdmin as
    | { projectId?: string; clientEmail?: string; privateKey?: string }
    | undefined

  if (admin?.projectId && admin?.clientEmail && admin?.privateKey) {
    const privateKey = normalizePrivateKey(admin.privateKey)
    if (!isPlausiblePrivateKey(privateKey)) {
      console.error(
        '[firebase-admin] FIREBASE_ADMIN_PRIVATE_KEY looks truncated or is a placeholder '
        + `(${privateKey.length} chars). Paste the full single-line key from Firebase Console → `
        + 'Project settings → Service accounts → Generate new private key, keeping the \\n escapes. '
        + 'FCM push is disabled until then.',
      )
      return null
    }
    return {
      projectId: admin.projectId,
      clientEmail: admin.clientEmail,
      // Service account private keys are stored with escaped newlines in .env
      privateKey,
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
    console.error(
      '[firebase-admin] Failed to initialize Firebase Admin (FCM push disabled). '
      + 'If this mentions "Failed to parse private key", re-paste the full FIREBASE_ADMIN_PRIVATE_KEY '
      + 'as one line with \\n escapes:',
      e,
    )
    return null
  }
}
