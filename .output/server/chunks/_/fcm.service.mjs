import { p as prisma } from './prisma.mjs';
import { u as useRuntimeConfig } from '../nitro/nitro.mjs';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

let cachedApp = null;
function normalizePrivateKey(raw) {
  let key = raw.trim();
  if (key.startsWith('"') && key.endsWith('"') || key.startsWith("'") && key.endsWith("'")) {
    key = key.slice(1, -1);
  }
  key = key.replace(/\\\\n/g, "\n");
  key = key.replace(/\\n/g, "\n");
  key = key.replace(/\r\n?/g, "\n");
  return key.trim();
}
function isPlausiblePrivateKey(key) {
  return key.includes("-----BEGIN") && key.includes("PRIVATE KEY-----") && key.includes("-----END") && key.length > 500 && // a real RSA key is ~1600+ chars; anything shorter is truncated
  !key.includes("....");
}
function resolveCredentials() {
  const config = useRuntimeConfig();
  const admin = config.firebaseAdmin;
  if ((admin == null ? void 0 : admin.projectId) && (admin == null ? void 0 : admin.clientEmail) && (admin == null ? void 0 : admin.privateKey)) {
    const privateKey = normalizePrivateKey(admin.privateKey);
    if (!isPlausiblePrivateKey(privateKey)) {
      console.error(
        `[firebase-admin] FIREBASE_ADMIN_PRIVATE_KEY looks truncated or is a placeholder (${privateKey.length} chars). Paste the full single-line key from Firebase Console \u2192 Project settings \u2192 Service accounts \u2192 Generate new private key, keeping the \\n escapes. FCM push is disabled until then.`
      );
      return null;
    }
    return {
      projectId: admin.projectId,
      clientEmail: admin.clientEmail,
      // Service account private keys are stored with escaped newlines in .env
      privateKey
    };
  }
  const legacy = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (legacy) {
    try {
      const credentials = JSON.parse(legacy);
      if (credentials.project_id && credentials.client_email && credentials.private_key) {
        return {
          projectId: credentials.project_id,
          clientEmail: credentials.client_email,
          privateKey: credentials.private_key
        };
      }
    } catch (e) {
      console.error("[firebase-admin] Failed to parse FIREBASE_SERVICE_ACCOUNT:", e);
    }
  }
  return null;
}
function getFirebaseAdminApp() {
  const existing = getApps();
  if (existing.length) return existing[0];
  const credentials = resolveCredentials();
  if (!credentials) {
    console.warn("[firebase-admin] Firebase Admin credentials not configured, FCM push is disabled");
    return null;
  }
  cachedApp = initializeApp({ credential: cert(credentials) });
  return cachedApp;
}
function getMessagingInstance() {
  try {
    const app = getFirebaseAdminApp();
    if (!app) return null;
    return getMessaging(app);
  } catch (e) {
    console.error(
      '[firebase-admin] Failed to initialize Firebase Admin (FCM push disabled). If this mentions "Failed to parse private key", re-paste the full FIREBASE_ADMIN_PRIVATE_KEY as one line with \\n escapes:',
      e
    );
    return null;
  }
}

function toStringData(data) {
  if (!data) return {};
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === null || value === void 0 ? "" : String(value)
    ])
  );
}
function buildMulticastMessage(tokens, payload) {
  const data = toStringData(payload.data);
  return {
    tokens,
    // ⭐ P3: Use data-only to prevent automatic notifications when app is open
    // Remove 'notification' from top level, keep only in webpush
    data,
    // ⭐ This is the key - data-only payload
    webpush: {
      notification: {
        title: payload.title,
        body: payload.body,
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-72x72.png",
        // ⭐ P3: Use tag for collapsing duplicate notifications
        tag: data.notificationId || "default",
        renotify: false,
        requireInteraction: true
      },
      fcmOptions: {
        link: data.url || "/"
      },
      headers: {
        "Urgency": "high"
      }
    },
    apns: {
      payload: {
        aps: {
          alert: {
            title: payload.title,
            body: payload.body
          },
          badge: 1,
          sound: "default"
        }
      }
    }
  };
}
async function pruneInvalidTokens(allTokens, response) {
  const invalidTokens = [];
  response.responses.forEach((resp, idx) => {
    var _a;
    if (!resp.success) {
      const code = (_a = resp.error) == null ? void 0 : _a.code;
      if (code === "messaging/registration-token-not-registered" || code === "messaging/invalid-registration-token" || code === "messaging/unregistered") {
        const token = allTokens[idx];
        if (token) invalidTokens.push(token);
      }
    }
  });
  if (invalidTokens.length > 0) {
    console.log("[FCM] Removing invalid tokens:", invalidTokens.length);
    await prisma.deviceToken.deleteMany({
      where: { token: { in: invalidTokens } }
    });
  }
}
async function sendPushToUser(userId, payload) {
  const msg = getMessagingInstance();
  if (!msg) return null;
  const tokens = await prisma.deviceToken.findMany({
    where: { userId },
    select: { token: true }
  });
  if (tokens.length === 0) {
    return null;
  }
  const fcmTokens = tokens.map((t) => t.token);
  try {
    const response = await msg.sendEachForMulticast(
      buildMulticastMessage(fcmTokens, payload)
    );
    await pruneInvalidTokens(fcmTokens, response);
    return response;
  } catch (error) {
    return null;
  }
}
async function sendPushNotification(payload) {
  const response = await sendPushToUser(payload.userId, {
    title: payload.title,
    body: payload.body,
    data: payload.data
  });
  return !!response && response.successCount > 0;
}
async function registerDeviceToken(userId, token, deviceType) {
  await prisma.deviceToken.upsert({
    where: { token },
    update: { userId, deviceType, lastUsedAt: /* @__PURE__ */ new Date() },
    create: { userId, token, deviceType }
  });
}
async function unregisterDeviceToken(token) {
  await prisma.deviceToken.deleteMany({ where: { token } });
}

export { registerDeviceToken as r, sendPushNotification as s, unregisterDeviceToken as u };
//# sourceMappingURL=fcm.service.mjs.map
