import { c as createError } from '../nitro/nitro.mjs';

const OWNER_FIELDS = ["customerId", "supplierId", "workerId", "distributorId"];
function resolveLedgerOwner(body) {
  const provided = OWNER_FIELDS.filter((f) => body[f]);
  if (provided.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Exactly one owner is required: customerId, supplierId, workerId, or distributorId"
    });
  }
  if (provided.length > 1) {
    throw createError({
      statusCode: 400,
      statusMessage: `Only one owner allowed. Provided: ${provided.join(", ")}`
    });
  }
  const field = provided[0];
  if (!field) {
    throw createError({
      statusCode: 400,
      statusMessage: "Exactly one owner is required: customerId, supplierId, workerId, or distributorId"
    });
  }
  return { field, value: body[field] };
}
function assertExactlyOneOwner(body) {
  resolveLedgerOwner(body);
}
function getOwnerFilter(body) {
  const { field, value } = resolveLedgerOwner(body);
  return { [field]: value };
}
function buildLedgerWhere(query) {
  const where = {};
  for (const field of OWNER_FIELDS) {
    if (query[field]) {
      where[field] = query[field];
    }
  }
  if (query.type) {
    where.type = query.type;
  }
  if (query.search) {
    where.description = { contains: query.search, mode: "insensitive" };
  }
  if (query.dateFrom || query.dateTo) {
    where.createdAt = {};
    if (query.dateFrom) {
      where.createdAt.gte = new Date(query.dateFrom);
    }
    if (query.dateTo) {
      where.createdAt.lte = new Date(query.dateTo);
    }
  }
  if (query.amountMin || query.amountMax) {
    where.amount = {};
    if (query.amountMin) {
      where.amount.gte = parseFloat(query.amountMin);
    }
    if (query.amountMax) {
      where.amount.lte = parseFloat(query.amountMax);
    }
  }
  return where;
}
function parsePagination(query) {
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 50, 200);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
function parseSort(query, defaultField = "createdAt", defaultDir = "desc") {
  const field = query.sortBy || defaultField;
  const dir = query.sortDir || defaultDir;
  return { [field]: dir };
}

export { parseSort as a, buildLedgerWhere as b, assertExactlyOneOwner as c, getOwnerFilter as g, parsePagination as p };
//# sourceMappingURL=ledger.mjs.map
