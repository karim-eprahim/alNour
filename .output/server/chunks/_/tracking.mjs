import { c as createError } from '../nitro/nitro.mjs';
import { p as prisma } from './prisma.mjs';

function toOptionalNumber(value) {
  if (value === void 0 || value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
function isValidLatitude(value) {
  return Number.isFinite(value) && value >= -90 && value <= 90;
}
function isValidLongitude(value) {
  return Number.isFinite(value) && value >= -180 && value <= 180;
}
function validateTrackedLocation(body) {
  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);
  if (!isValidLatitude(latitude)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid latitude: must be between -90 and 90" });
  }
  if (!isValidLongitude(longitude)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid longitude: must be between -180 and 180" });
  }
  const accuracy = toOptionalNumber(body.accuracy);
  if (accuracy !== null && accuracy < 0) {
    throw createError({ statusCode: 400, statusMessage: "Invalid accuracy: must be a non-negative number" });
  }
  const speed = toOptionalNumber(body.speed);
  if (speed !== null && speed < 0) {
    throw createError({ statusCode: 400, statusMessage: "Invalid speed: must be a non-negative number" });
  }
  const heading = toOptionalNumber(body.heading);
  if (heading !== null && (heading < 0 || heading > 360)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid heading: must be between 0 and 360" });
  }
  let recordedAt = null;
  if (body.recordedAt !== void 0 && body.recordedAt !== null && body.recordedAt !== "") {
    const parsed = new Date(body.recordedAt);
    if (Number.isNaN(parsed.getTime())) {
      throw createError({ statusCode: 400, statusMessage: "Invalid recordedAt timestamp" });
    }
    recordedAt = parsed;
  }
  return { latitude, longitude, accuracy, speed, heading, recordedAt };
}
function serializeLocation(location) {
  if (!location) return null;
  return {
    latitude: location.latitude,
    longitude: location.longitude,
    accuracy: location.accuracy,
    speed: location.speed,
    heading: location.heading,
    recordedAt: location.recordedAt
  };
}
async function getActiveTrackingForEvent(event, trackingId) {
  const auth = event.context.auth;
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }
  const tracking = await prisma.deliveryTracking.findFirst({
    where: { id: trackingId },
    include: {
      salesOrder: {
        select: { status: true, assignedDistributorId: true }
      }
    }
  });
  if (!tracking) {
    throw createError({ statusCode: 404, statusMessage: "Tracking session not found" });
  }
  if (tracking.distributorId !== auth.userId) {
    throw createError({ statusCode: 403, statusMessage: "This tracking session belongs to another distributor" });
  }
  return tracking;
}

export { isValidLongitude as a, getActiveTrackingForEvent as g, isValidLatitude as i, serializeLocation as s, validateTrackedLocation as v };
//# sourceMappingURL=tracking.mjs.map
