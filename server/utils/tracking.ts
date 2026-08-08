import type { H3Event } from 'h3'

export interface TrackedLocationInput {
  latitude: number
  longitude: number
  accuracy?: number | null
  speed?: number | null
  heading?: number | null
  recordedAt?: Date | null
}

function toOptionalNumber(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

export function isValidLatitude(value: number): boolean {
  return Number.isFinite(value) && value >= -90 && value <= 90
}

export function isValidLongitude(value: number): boolean {
  return Number.isFinite(value) && value >= -180 && value <= 180
}

export function validateTrackedLocation(body: Record<string, unknown>): TrackedLocationInput {
  const latitude = Number(body.latitude)
  const longitude = Number(body.longitude)

  if (!isValidLatitude(latitude)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid latitude: must be between -90 and 90' })
  }
  if (!isValidLongitude(longitude)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid longitude: must be between -180 and 180' })
  }

  const accuracy = toOptionalNumber(body.accuracy)
  if (accuracy !== null && accuracy < 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid accuracy: must be a non-negative number' })
  }

  const speed = toOptionalNumber(body.speed)
  if (speed !== null && speed < 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid speed: must be a non-negative number' })
  }

  const heading = toOptionalNumber(body.heading)
  if (heading !== null && (heading < 0 || heading > 360)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid heading: must be between 0 and 360' })
  }

  let recordedAt: Date | null = null
  if (body.recordedAt !== undefined && body.recordedAt !== null && body.recordedAt !== '') {
    const parsed = new Date(body.recordedAt as string)
    if (Number.isNaN(parsed.getTime())) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid recordedAt timestamp' })
    }
    recordedAt = parsed
  }

  return { latitude, longitude, accuracy, speed, heading, recordedAt }
}

export function serializeLocation(location: any) {
  if (!location) return null
  return {
    latitude: location.latitude,
    longitude: location.longitude,
    accuracy: location.accuracy,
    speed: location.speed,
    heading: location.heading,
    recordedAt: location.recordedAt,
  }
}

export async function getActiveTrackingForEvent(event: H3Event, trackingId: string) {
  const auth = event.context.auth
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const tracking = await prisma.deliveryTracking.findFirst({
    where: { id: trackingId },
    include: {
      salesOrder: {
        select: { status: true, assignedDistributorId: true },
      },
    },
  })

  if (!tracking) {
    throw createError({ statusCode: 404, statusMessage: 'Tracking session not found' })
  }
  if (tracking.distributorId !== auth.userId) {
    throw createError({ statusCode: 403, statusMessage: 'This tracking session belongs to another distributor' })
  }

  return tracking
}