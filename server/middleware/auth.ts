export default defineEventHandler(async (event) => {
  const path = event.path || getRequestURL(event).pathname

  const publicPaths = [
    '/api/auth/login',
    '/api/auth/register',
  ]

  if (!path.startsWith('/api/')) return

  if (publicPaths.some((p) => path.startsWith(p))) return

  const token = extractToken(event)
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const payload = verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }

  event.context.auth = payload
})
