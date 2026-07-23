import { f as getQuery } from '../nitro/nitro.mjs';

function parseLookupQuery(event) {
  const query = getQuery(event);
  return {
    q: query.q,
    cursor: query.cursor,
    take: Math.min(parseInt(query.take) || 20, 100),
    includeInactive: query.includeInactive === "true",
    warehouseId: query.warehouseId,
    categoryId: query.categoryId
  };
}
function buildSearchWhere(search, fields) {
  if (!search || search.length < 2) return {};
  return {
    OR: fields.map((field) => ({
      [field]: { contains: search, mode: "insensitive" }
    }))
  };
}
async function paginatedLookup(model, args) {
  const findArgs = {
    where: args.where,
    take: args.take + 1,
    orderBy: args.orderBy || { id: "asc" }
  };
  if (args.select) findArgs.select = args.select;
  if (args.cursor) {
    findArgs.cursor = { id: args.cursor };
    findArgs.skip = 1;
  }
  const items = await model.findMany(findArgs);
  const hasMore = items.length > args.take;
  if (hasMore) items.pop();
  return {
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null
  };
}
function toLookupItem(item, labelField, valueField = "id", subtitleField) {
  return {
    value: String(item[valueField]),
    label: item[labelField],
    subtitle: subtitleField ? item[subtitleField] : void 0,
    disabled: false
  };
}

export { paginatedLookup as a, buildSearchWhere as b, parseLookupQuery as p, toLookupItem as t };
//# sourceMappingURL=lookup.mjs.map
