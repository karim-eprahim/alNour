import { defineWebSocketHandler } from 'h3'
import { verifyToken } from '../utils/jwt'

interface WebSocketClient {
  id: string
  user: { userId: string; role: string; [key: string]: any }
  peer: any
  rooms: Set<string>
}

const clients = new Map<string, WebSocketClient>()

function getHeader(headers: any, name: string): string | undefined {
  if (!headers) return undefined
  return typeof headers.get === 'function' ? headers.get(name) : headers[name]
}

function addUserToRoom(_userId: string, _room: string) {
}

function cleanupClient(clientId: string) {
  const client = clients.get(clientId)
  if (client) {
    console.log('[WS][SERVER] cleaning up client:', clientId)
  }
  clients.delete(clientId)
  console.log('[WS][SERVER] client removed | total clients now:', clients.size)
}

function handleMessage(clientId: string, parsed: any) {
  const client = clients.get(clientId)
  if (!client) return

  console.log('[WS][SERVER] message from', clientId, ':', parsed)

  if (parsed.type === 'SUBSCRIBE' && parsed.room) {
    client.rooms.add(parsed.room)
    client.peer.send(JSON.stringify({ event: 'SUBSCRIBED', data: { room: parsed.room } }))
  }

  if (parsed.type === 'UNSUBSCRIBE' && parsed.room) {
    client.rooms.delete(parsed.room)
    client.peer.send(JSON.stringify({ event: 'UNSUBSCRIBED', data: { room: parsed.room } }))
  }

  if (parsed.type === 'PING') {
    client.peer.send(JSON.stringify({ event: 'PONG', data: { timestamp: Date.now() } }))
  }
}

export function broadcastToRoom(room: string, event: string, data: any) {
  const matched = [...clients.values()].filter((c) => c.rooms.has(room))
  console.log('[WS][BROADCAST] room:', room, '| event:', event, '| matched clients:', matched.length)
  if (matched.length === 0) {
    console.warn('[WS][BROADCAST] ⚠️ no clients found in room:', room)
  }
  for (const client of matched) {
    client.peer.send(JSON.stringify({ event, data }))
  }
}

export function broadcastToUser(userId: string, event: string, data: any) {
  broadcastToRoom(`user:${userId}`, event, data)
}

export const realtime = { broadcastToRoom, broadcastToUser }

export default defineWebSocketHandler({
  open(peer: any) {
    console.log('[ws] open', peer.id)

    const headers = peer.request?.headers
    const rawUrl = peer.request?.url || '/'
    const host = getHeader(headers, 'host') || 'localhost'

    const url = new URL(rawUrl, `http://${host}`)
    let token = url.searchParams.get('token')

    if (!token) {
      const cookieHeader = getHeader(headers, 'cookie') || ''
      const match = cookieHeader.match(/(?:^|;\s*)auth_token=([^;]*)/)
      if (match) token = decodeURIComponent(match[1])
    }

    console.log('[WS][SERVER] token extracted:', token ? 'FOUND' : 'MISSING')

    if (!token) {
      peer.close(4001, 'Authentication required')
      return
    }

    const payload = verifyToken(token)
    console.log('[WS][SERVER] verifyToken result:', payload ? { userId: payload.userId, role: payload.role } : 'INVALID')

    if (!payload) {
      peer.close(4001, 'Invalid or expired token')
      return
    }

    const clientId = `${payload.userId}-${Date.now()}`
    const client: WebSocketClient = {
      id: clientId,
      user: payload,
      peer,
      rooms: new Set(),
    }

    clients.set(clientId, client)
    peer.clientId = clientId

    addUserToRoom(payload.userId, `user:${payload.userId}`)
    addUserToRoom(payload.userId, `role:${payload.role}`)

    client.rooms.add(`user:${payload.userId}`)
    client.rooms.add(`role:${payload.role}`)

    console.log('[WS][SERVER] client registered:', clientId, '| total clients:', clients.size)
    console.log('[WS][SERVER] rooms joined:', Array.from(client.rooms))

    peer.send(JSON.stringify({ event: 'CONNECTED', data: { clientId, user: payload } }))
  },

  message(peer: any, message: any) {
    const clientId = peer.clientId
    if (!clientId) return

    try {
      const parsed = JSON.parse(message.text())
      handleMessage(clientId, parsed)
    } catch (e) {
      peer.send(JSON.stringify({ event: 'ERROR', data: { message: 'Invalid message format' } }))
    }
  },

  close(peer: any, event: any) {
    console.log('[ws] close', peer.clientId, event)
    if (peer.clientId) {
      cleanupClient(peer.clientId)
    }
  },

  error(peer: any, error: Error) {
    console.error('[WS][SERVER] error:', peer?.clientId, error)
  },
})