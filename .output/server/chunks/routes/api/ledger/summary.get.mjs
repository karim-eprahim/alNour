import { d as defineEventHandler, f as getQuery } from '../../../nitro/nitro.mjs';
import { b as buildLedgerWhere } from '../../../_/ledger.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';
import '@prisma/client';
import '@prisma/adapter-pg';
import 'pg';

const summary_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const where = buildLedgerWhere(query);
  const entries = await prisma.ledgerEntry.findMany({
    where,
    select: { amount: true, type: true }
  });
  const totalDebit = entries.filter((e) => e.type === "DEBIT").reduce((sum, e) => sum + e.amount.toNumber(), 0);
  const totalCredit = entries.filter((e) => e.type === "CREDIT").reduce((sum, e) => sum + e.amount.toNumber(), 0);
  return {
    totalDebit,
    totalCredit,
    balance: totalDebit - totalCredit,
    totalEntries: entries.length
  };
});

export { summary_get as default };
//# sourceMappingURL=summary.get.mjs.map
