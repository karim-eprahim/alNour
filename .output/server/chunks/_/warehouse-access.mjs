import { c as createError } from '../nitro/nitro.mjs';
import { p as prisma } from './prisma.mjs';

const ADMIN_ROLE = "ADMIN";
function isAdmin(event) {
  var _a;
  return ((_a = event.context.auth) == null ? void 0 : _a.role) === ADMIN_ROLE;
}
async function getAccessibleWarehouseIds(event) {
  var _a;
  if (isAdmin(event)) return null;
  const userId = (_a = event.context.auth) == null ? void 0 : _a.userId;
  if (!userId) return [];
  const records = await prisma.userWarehouse.findMany({
    where: { userId },
    select: { warehouseId: true }
  });
  return records.map((r) => r.warehouseId);
}
async function validateWarehouseAccess(event, warehouseId) {
  var _a;
  if (isAdmin(event)) return;
  const userId = (_a = event.context.auth) == null ? void 0 : _a.userId;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "Not authenticated" });
  }
  const access = await prisma.userWarehouse.findUnique({
    where: { userId_warehouseId: { userId, warehouseId } }
  });
  if (!access) {
    throw createError({ statusCode: 403, statusMessage: "You do not have access to this warehouse" });
  }
}

export { getAccessibleWarehouseIds as g, validateWarehouseAccess as v };
//# sourceMappingURL=warehouse-access.mjs.map
