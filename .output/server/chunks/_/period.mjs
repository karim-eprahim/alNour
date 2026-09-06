import { c as createError } from '../nitro/nitro.mjs';

const PERIOD_DAYS = {
  "7d": 7,
  "30d": 30,
  "6m": 180,
  "1y": 365
};
const DASHBOARD_PERIODS = Object.keys(PERIOD_DAYS);
function parseDashboardPeriod(query) {
  const end = /* @__PURE__ */ new Date();
  const start = /* @__PURE__ */ new Date();
  if (query.from || query.to) {
    if (query.from) start.setTime(new Date(query.from).getTime());
    if (query.to) end.setTime(new Date(query.to).getTime());
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw createError({ statusCode: 400, statusMessage: "Invalid date range" });
    }
    if (start > end) {
      throw createError({ statusCode: 400, statusMessage: "from must be before to" });
    }
    return { start, end };
  }
  const period = query.period || "30d";
  if (!(period in PERIOD_DAYS)) {
    throw createError({ statusCode: 400, statusMessage: `Invalid period. Allowed: ${DASHBOARD_PERIODS.join(", ")}` });
  }
  start.setDate(start.getDate() - PERIOD_DAYS[period]);
  return { start, end };
}
function dayKey(date) {
  return date.toISOString().slice(0, 10);
}
function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export { dayKey as d, monthKey as m, parseDashboardPeriod as p };
//# sourceMappingURL=period.mjs.map
