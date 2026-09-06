import { h as defineWebSocketHandler, v as verifyToken } from '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jsonwebtoken';

const clients = /* @__PURE__ */ new Map();
function getHeader(headers, name) {
  if (!headers) return void 0;
  return typeof headers.get === "function" ? headers.get(name) : headers[name];
}
function addUserToRoom(_userId, _room) {
}
function cleanupClient(clientId) {
  const client = clients.get(clientId);
  if (client) {
    console.log("[WS][SERVER] cleaning up client:", clientId);
  }
  clients.delete(clientId);
  console.log("[WS][SERVER] client removed | total clients now:", clients.size);
}
function handleMessage(clientId, parsed) {
  const client = clients.get(clientId);
  if (!client) return;
  console.log("[WS][SERVER] message from", clientId, ":", parsed);
  if (parsed.type === "SUBSCRIBE" && parsed.room) {
    client.rooms.add(parsed.room);
    client.peer.send(JSON.stringify({ event: "SUBSCRIBED", data: { room: parsed.room } }));
  }
  if (parsed.type === "UNSUBSCRIBE" && parsed.room) {
    client.rooms.delete(parsed.room);
    client.peer.send(JSON.stringify({ event: "UNSUBSCRIBED", data: { room: parsed.room } }));
  }
  if (parsed.type === "PING") {
    client.peer.send(JSON.stringify({ event: "PONG", data: { timestamp: Date.now() } }));
  }
}
function broadcastToRoom(room, event, data) {
  const matched = [...clients.values()].filter((c) => c.rooms.has(room));
  console.log("[WS][BROADCAST] room:", room, "| event:", event, "| matched clients:", matched.length);
  if (matched.length === 0) {
    console.warn("[WS][BROADCAST] \u26A0\uFE0F no clients found in room:", room);
  }
  for (const client of matched) {
    client.peer.send(JSON.stringify({ event, data }));
  }
}
function broadcastToUser(userId, event, data) {
  broadcastToRoom(`user:${userId}`, event, data);
}
const realtime = { broadcastToRoom, broadcastToUser };
const _ws = defineWebSocketHandler({
  open(peer) {
    var _a, _b;
    console.log("[ws] open", peer.id);
    const headers = (_a = peer.request) == null ? void 0 : _a.headers;
    const rawUrl = ((_b = peer.request) == null ? void 0 : _b.url) || "/";
    const host = getHeader(headers, "host") || "localhost";
    const url = new URL(rawUrl, `http://${host}`);
    let token = url.searchParams.get("token");
    if (!token) {
      const cookieHeader = getHeader(headers, "cookie") || "";
      const match = cookieHeader.match(/(?:^|;\s*)auth_token=([^;]*)/);
      if (match) token = decodeURIComponent(match[1]);
    }
    console.log("[WS][SERVER] token extracted:", token ? "FOUND" : "MISSING");
    if (!token) {
      peer.close(4001, "Authentication required");
      return;
    }
    const payload = verifyToken(token);
    console.log("[WS][SERVER] verifyToken result:", payload ? { userId: payload.userId, role: payload.role } : "INVALID");
    if (!payload) {
      peer.close(4001, "Invalid or expired token");
      return;
    }
    const clientId = `${payload.userId}-${Date.now()}`;
    const client = {
      id: clientId,
      user: payload,
      peer,
      rooms: /* @__PURE__ */ new Set()
    };
    clients.set(clientId, client);
    peer.clientId = clientId;
    addUserToRoom(payload.userId, `user:${payload.userId}`);
    addUserToRoom(payload.userId, `role:${payload.role}`);
    client.rooms.add(`user:${payload.userId}`);
    client.rooms.add(`role:${payload.role}`);
    console.log("[WS][SERVER] client registered:", clientId, "| total clients:", clients.size);
    console.log("[WS][SERVER] rooms joined:", Array.from(client.rooms));
    peer.send(JSON.stringify({ event: "CONNECTED", data: { clientId, user: payload } }));
  },
  message(peer, message) {
    const clientId = peer.clientId;
    if (!clientId) return;
    try {
      const parsed = JSON.parse(message.text());
      handleMessage(clientId, parsed);
    } catch (e) {
      peer.send(JSON.stringify({ event: "ERROR", data: { message: "Invalid message format" } }));
    }
  },
  close(peer, event) {
    console.log("[ws] close", peer.clientId, event);
    if (peer.clientId) {
      cleanupClient(peer.clientId);
    }
  },
  error(peer, error) {
    console.error("[WS][SERVER] error:", peer == null ? void 0 : peer.clientId, error);
  }
});

export { broadcastToRoom, broadcastToUser, _ws as default, realtime };
//# sourceMappingURL=_ws.mjs.map
