
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useNotificationStore } from './notification'
import { useAuthStore } from '@/modules/auth/store'
 
export const useRealtimeStore = defineStore('realtime', () => {
  const ws = ref<WebSocket | null>(null)
  const connected = ref(false)
  const connecting = ref(false)
  const reconnectAttempts = ref(0)
  const maxReconnectAttempts = 5
  const reconnectDelay = 1000
  const subscribedRooms = ref<Set<string>>(new Set())
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null
  let pingTimer: ReturnType<typeof setInterval> | null = null
 
  const authStore = useAuthStore()
  const notificationStore = useNotificationStore()
 
  const wsUrl = computed(() => {
    const base = import.meta.env.DEV
      ? 'ws://localhost:3000'
      : `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`
    return `${base}/_ws`
  })
 
  function connect() {
    console.log('Attempting to connect to WebSocket')
    // لو فيه اتصال شغال بالفعل أو جاري الاتصال، متعملش حاجة
    if (ws.value?.readyState === WebSocket.OPEN || connecting.value) return
    if (!authStore.isAuthenticated) return
 
    connecting.value = true
 
    try {
      // متبعتش التوكن في الـ query، لأن الكوكي (httpOnly) بتتبعت
      // تلقائيًا مع الـ WebSocket handshake من المتصفح للسيرفر.
      // السيرفر (_ws.ts) هو اللي بيقراها من peer.headers.cookie مباشرة.
      ws.value = new WebSocket(wsUrl.value)
      setupEventHandlers()
    } catch (e) {
      console.error('WebSocket connection error:', e)
      connecting.value = false
      scheduleReconnect()
    }
  }
 
  function setupEventHandlers() {
    if (!ws.value) return
 
    ws.value.onopen = () => {
      console.log('WebSocket connected')
      connected.value = true
      connecting.value = false
      reconnectAttempts.value = 0
 
      subscribe(`user:${authStore.user?.id}`)
      subscribe(`role:${authStore.user?.role}`)
 
      startPing()
    }
 
    ws.value.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        handleMessage(message)
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e)
      }
    }
 
    ws.value.onclose = (event) => {
      console.log('WebSocket disconnected:', event.code, event.reason)
      connected.value = false
      connecting.value = false
      stopPing()
      subscribedRooms.value.clear()
      scheduleReconnect()
    }
 
    ws.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }
 
  function handleMessage(message: { event: string; data: any }) {
    switch (message.event) {
      case 'CONNECTED':
        console.log('WebSocket authenticated:', message.data)
        break
      case 'SUBSCRIBED':
        subscribedRooms.value.add(message.data.room)
        console.log('Subscribed to room:', message.data.room)
        break
      case 'UNSUBSCRIBED':
        subscribedRooms.value.delete(message.data.room)
        console.log('Unsubscribed from room:', message.data.room)
        break
      case 'NOTIFICATION_CREATED':
        notificationStore.addNotification(message.data)
        break
      case 'ORDER_STATUS_UPDATED':
        handleOrderStatusUpdate(message.data)
        break
      case 'PONG':
        break
      case 'ERROR':
        console.error('Server error:', message.data)
        break
    }
  }
 
  function handleOrderStatusUpdate(data: any) {
    const event = new CustomEvent('order-status-updated', { detail: data })
    window.dispatchEvent(event)
  }
 
  function subscribe(room: string) {
    if (!ws.value || ws.value.readyState !== WebSocket.OPEN) return
    if (subscribedRooms.value.has(room)) return
 
    ws.value.send(JSON.stringify({ type: 'SUBSCRIBE', room }))
  }
 
  function unsubscribe(room: string) {
    if (!ws.value || ws.value.readyState !== WebSocket.OPEN) return
    if (!subscribedRooms.value.has(room)) return
 
    ws.value.send(JSON.stringify({ type: 'UNSUBSCRIBE', room }))
  }
 
  function subscribeToOrder(orderId: string) {
    subscribe(`order:${orderId}`)
  }
 
  function unsubscribeFromOrder(orderId: string) {
    unsubscribe(`order:${orderId}`)
  }
 
  function startPing() {
    stopPing()
    pingTimer = setInterval(() => {
      if (ws.value?.readyState === WebSocket.OPEN) {
        ws.value.send(JSON.stringify({ type: 'PING' }))
      }
    }, 30000)
  }
 
  function stopPing() {
    if (pingTimer) {
      clearInterval(pingTimer)
      pingTimer = null
    }
  }
 
  function scheduleReconnect() {
    if (reconnectTimer) return
    if (reconnectAttempts.value >= maxReconnectAttempts) {
      console.log('Max reconnect attempts reached')
      return
    }
    if (!authStore.isAuthenticated) return
 
    reconnectAttempts.value++
    const delay = reconnectDelay * Math.pow(2, reconnectAttempts.value - 1)
 
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null
      connect()
    }, delay)
  }
 
  function disconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    stopPing()
 
    if (ws.value) {
      ws.value.close(1000, 'Client disconnect')
      ws.value = null
    }
    connected.value = false
    connecting.value = false
    subscribedRooms.value.clear()
    reconnectAttempts.value = 0
  }
 
  function onAuthChange(isAuthenticated: boolean) {
    if (isAuthenticated) {
      connect()
    } else {
      disconnect()
    }
  }
 
  return {
    ws,
    connected,
    connecting,
    subscribedRooms,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    subscribeToOrder,
    unsubscribeFromOrder,
    onAuthChange,
  }
})