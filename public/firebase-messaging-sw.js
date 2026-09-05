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

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const notificationTitle = payload.notification?.title || 'AlNourERP'
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icons/icon-192x192.png',
    data: payload.data || {},
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  event.waitUntil(clients.openWindow(url))
})