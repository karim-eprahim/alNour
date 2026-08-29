import { defineWebSocketHandler } from 'h3'
import { verifyToken } from '../utils/jwt'
import type { JwtPayload } from '../utils/jwt'

interface WebSocketClient {
  id: string
  user: JwtPayload
  ws: any
  rooms: Set<string>
}

const clients = new Map<string, WebSocketClient>()
const userRooms = new Map<string, Set<string>>()

function addUserToRoom(userId: string, roomId: string) {
  if (!userRooms.has(userId)) {
    userRooms.set(userId, new Set())
  }
  userRooms.get(userId)!.add(roomId)
}

function removeUserFromRoom(userId: string, roomId: string) {
  const rooms = userRooms.get(userId)
  if (rooms) {
    rooms.delete(roomId)
    if (rooms.size === 0) {
      userRooms.delete(userId)
    }
  }
}

function broadcastToRoom(roomId: string, event: string, data: any, excludeClientId?: string) {
  for (const [clientId, client] of clients.entries()) {
    if (clientId !== excludeClientId && client.rooms.has(roomId)) {
      client.ws.send(JSON.stringify({ event, data }))
      console.log("notification data",data)
    }
  }
}

function broadcastToUser(userId: string, event: string, data: any) {
  const rooms = userRooms.get(userId)
  console.log("broadcastToRoom",userId,event,rooms)
  if (!rooms) return
  for (const roomId of rooms) {
    broadcastToRoom(roomId, event, data)
  }
}

export default defineWebSocketHandler({
  open(peer: any) {
    const ws = peer
    console.log('[ws] open', peer)
    const url = new URL(peer.url, `http://${peer.headers.host}`)
    let token = url.searchParams.get('token')

    if (!token) {
      const cookieHeader = peer.headers?.cookie || ''
      const match = cookieHeader.match(/(?:^|;\s*)auth_token=([^;]*)/)
      if (match) token = decodeURIComponent(match[1])
    }

    if (!token) {
      ws.close(4001, 'Authentication required')
      return
    }

    const payload = verifyToken(token)
    if (!payload) {
      ws.close(4001, 'Invalid or expired token')
      return
    }

    const clientId = `${payload.userId}-${Date.now()}`
    const client: WebSocketClient = {
      id: clientId,
      user: payload,
      ws,
      rooms: new Set(),
    }

    clients.set(clientId, client)
    addUserToRoom(payload.userId, `user:${payload.userId}`)
    addUserToRoom(payload.userId, `role:${payload.role}`)

    client.rooms.add(`user:${payload.userId}`)
    client.rooms.add(`role:${payload.role}`)

    ws.on('message', (message: Buffer) => {
      try {
        const parsed = JSON.parse(message.toString())
        handleMessage(clientId, parsed)
      } catch (e) {
        ws.send(JSON.stringify({ event: 'ERROR', data: { message: 'Invalid message format' } }))
      }
    })

    ws.on('close', () => {
      cleanupClient(clientId)
    })

    ws.send(JSON.stringify({ event: 'CONNECTED', data: { clientId, user: payload } }))
  },

  close(peer, event) {
    console.log('[ws] close', peer, event)
  },

  error(_peer: any, error: Error) {
    console.error('WebSocket error:', error)
  },
})

function handleMessage(clientId: string, message: any) {
  const client = clients.get(clientId)
  if (!client) return

  switch (message.type) {
    case 'SUBSCRIBE':
      if (message.room) {
        client.rooms.add(message.room)
        addUserToRoom(client.user.userId, message.room)
        client.ws.send(JSON.stringify({ event: 'SUBSCRIBED', data: { room: message.room } }))
      }
      break
    case 'UNSUBSCRIBE':
      if (message.room) {
        client.rooms.delete(message.room)
        removeUserFromRoom(client.user.userId, message.room)
        client.ws.send(JSON.stringify({ event: 'UNSUBSCRIBED', data: { room: message.room } }))
      }
      break
    case 'PING':
      client.ws.send(JSON.stringify({ event: 'PONG', data: { timestamp: Date.now() } }))
      break
  }
}

function cleanupClient(clientId: string) {
  const client = clients.get(clientId)
  if (!client) return

  for (const room of client.rooms) {
    removeUserFromRoom(client.user.userId, room)
  }
  clients.delete(clientId)
}

export const realtime = {
  broadcastToRoom,
  broadcastToUser,
  broadcastToRole: (role: string, event: string, data: any) => {
    broadcastToRoom(`role:${role}`, event, data)
  },
  getConnectedUsers: () => Array.from(userRooms.keys()),
  getClientCount: () => clients.size,
}