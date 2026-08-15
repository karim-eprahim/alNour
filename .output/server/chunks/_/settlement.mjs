async function getDistributorCustody(client, distributorId) {
  var _a, _b, _c, _d;
  const [collectedAgg, confirmedAgg] = await Promise.all([
    client.payment.aggregate({
      _sum: { amount: true },
      where: {
        createdById: distributorId,
        invoice: { status: { not: "CANCELLED" } }
      }
    }),
    client.settlement.aggregate({
      _sum: { amount: true },
      where: { distributorId, status: "CONFIRMED" }
    })
  ]);
  const collected = (_b = (_a = collectedAgg._sum.amount) == null ? void 0 : _a.toNumber()) != null ? _b : 0;
  const confirmed = (_d = (_c = confirmedAgg._sum.amount) == null ? void 0 : _c.toNumber()) != null ? _d : 0;
  return {
    collected,
    confirmed,
    custody: Math.max(0, collected - confirmed)
  };
}
function serializeSettlement(settlement) {
  return {
    id: settlement.id,
    settlementNumber: settlement.settlementNumber,
    distributorId: settlement.distributorId,
    amount: settlement.amount.toNumber(),
    paymentMethod: settlement.paymentMethod,
    status: settlement.status,
    notes: settlement.notes,
    submittedAt: settlement.submittedAt,
    confirmedAt: settlement.confirmedAt,
    confirmedBy: settlement.confirmedBy,
    rejectionReason: settlement.rejectionReason,
    createdAt: settlement.createdAt,
    updatedAt: settlement.updatedAt,
    distributor: settlement.distributor ? { id: settlement.distributor.id, name: settlement.distributor.name } : null,
    confirmedByUser: settlement.confirmedByUser ? { id: settlement.confirmedByUser.id, name: settlement.confirmedByUser.name } : null
  };
}
async function getTotalDistributorCustody(client) {
  var _a, _b;
  const [collectedGroups, confirmedGroups] = await Promise.all([
    client.payment.groupBy({
      by: ["createdById"],
      _sum: { amount: true },
      where: {
        createdBy: { role: { name: "DISTRIBUTOR" } },
        invoice: { status: { not: "CANCELLED" } }
      }
    }),
    client.settlement.groupBy({
      by: ["distributorId"],
      _sum: { amount: true },
      where: { status: "CONFIRMED" }
    })
  ]);
  const collectedBy = new Map(
    collectedGroups.map((g) => {
      var _a2, _b2;
      return [g.createdById, (_b2 = (_a2 = g._sum.amount) == null ? void 0 : _a2.toNumber()) != null ? _b2 : 0];
    })
  );
  const confirmedBy = new Map(
    confirmedGroups.map((g) => {
      var _a2, _b2;
      return [g.distributorId, (_b2 = (_a2 = g._sum.amount) == null ? void 0 : _a2.toNumber()) != null ? _b2 : 0];
    })
  );
  const distributorIds = /* @__PURE__ */ new Set([...collectedBy.keys(), ...confirmedBy.keys()]);
  let custody = 0;
  let distributorsWithCustody = 0;
  for (const id of distributorIds) {
    const balance = ((_a = collectedBy.get(id)) != null ? _a : 0) - ((_b = confirmedBy.get(id)) != null ? _b : 0);
    if (balance > 0) {
      custody += balance;
      distributorsWithCustody++;
    }
  }
  return { custody, distributorsWithCustody };
}

export { getTotalDistributorCustody as a, getDistributorCustody as g, serializeSettlement as s };
//# sourceMappingURL=settlement.mjs.map
