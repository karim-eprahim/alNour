import type { H3Event } from 'h3'
import jwt from 'jsonwebtoken'

const getSecret = () => {
  return useRuntimeConfig().jwtSecret || process.env.NUXT_JWT_SECRET || 'alnour-dev-secret-change-in-production'
}

export interface JwtPayload {
  userId: string
  email: string
  role: string
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: '7d' })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getSecret()) as JwtPayload
  } catch {
    return null
  }
}

export function extractToken(event: H3Event): string | null {
  const authHeader = getHeader(event, 'authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  const cookie = parseCookies(event)
  return cookie?.auth_token || null
}
