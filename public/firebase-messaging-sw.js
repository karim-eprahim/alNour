importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAgk2dzKSQRKwB6VnCNkISagbTDfvqkMWk',
  authDomain: 'alnourerp-57ff1.firebaseapp.com',
  projectId: 'alnourerp-57ff1',
  storageBucket: 'alnourerp-57ff1.firebasestorage.app',
  messagingSenderId: '966640700849',
  appId: '1:966640700849:web:ee589d86d1b8af0f1ec190',
  measurementId: 'G-GV05C3DME9',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(async (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const data = payload.data || {}

  // ⭐ P1: Safety net - if app window is visible, skip system notification
  // (WebSocket in-app toast already covered this event)
  const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true })
  console.log('[firebase-messaging-sw.js] Open windows:', windows.length)
  
  if (windows.some((client) => client.visibilityState === 'visible')) {
    console.log('[firebase-messaging-sw.js] App is visible, skipping system notification')
    return
  }

  // check the tag 
  if (data.notificationId) {
    const existingNotifications = await self.registration.getNotifications({ tag: data.notificationId })
    if (existingNotifications.length > 0) {
      console.log('[firebase-messaging-sw.js] Duplicate notification, skipping:', data.notificationId)
      return
    }
  }

  const notificationTitle = payload.notification?.title || 'AlNourERP'
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icons/logo96x96.png',
    badge: '/icons/logo96x96.png',
    // ⭐ P1: Collapse repeat pushes for the same event using tag
    tag: data.notificationId || 'alnour-default',
    renotify: false,
    data: {
      ...data,
      url: data.url || '/',
    },
    requireInteraction: true,
    timestamp: Date.now(),
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// ⭐ Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  const url = event.notification.data?.url || '/'
  const notificationId = event.notification.data?.notificationId
  
  console.log('[SW] Notification clicked:', { notificationId, url })
  
  event.waitUntil((async () => {
    // Focus the open tab when there is one instead of opening a duplicate
    const windows = await clients.matchAll({ type: 'window', includeUncontrolled: true })
    
    for (const client of windows) {
      if ('focus' in client) {
        if ('navigate' in client) {
          await client.navigate(url)
        }
        return client.focus()
      }
    }
    
    // No open window, open a new one
    return clients.openWindow(url)
  })())
})

// ⭐ Optional: Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('[SW] Notification closed:', event.notification.tag)
})