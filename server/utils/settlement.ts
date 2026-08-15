import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'

type SettlementDbClient = Prisma.TransactionClient | PrismaClient

export interface DistributorCustodySummary {
  /** Total customer payments collected by the distributor (not from cancelled invoices). */
  collected: number
  /** Total amount of confirmed settlements for the distributor. */
  confirmed: number
  /** Money currently held by the distributor that has not been handed to the company. */
  custody: number
}

export interface TotalDistributorCustody {
  /** Total outstanding custody across all distributors. */
  custody: number
  /** Number of distributors with an outstanding custody balance. */
  distributorsWithCustody: number
}

/**
 * Distributor Custody = Customer Payments Collected by Distributor − Confirmed Settlements.
 *
 * The balance is derived from authoritative financial records (payments + settlements)
 * instead of a manually maintained counter to avoid duplicated sources of truth.
 */
export async function getDistributorCustody(
  client: SettlementDbClient,
  distributorId: string,
): Promise<DistributorCustodySummary> {
  const [collectedAgg, confirmedAgg] = await Promise.all([
    client.payment.aggregate({
      _sum: { amount: true },
      where: {
        createdById: distributorId,
        invoice: { status: { not: 'CANCELLED' } },
      },
    }),
    client.settlement.aggregate({
      _sum: { amount: true },
      where: { distributorId, status: 'CONFIRMED' },
    }),
  ])

  const collected = collectedAgg._sum.amount?.toNumber() ?? 0
  const confirmed = confirmedAgg._sum.amount?.toNumber() ?? 0

  return {
    collected,
    confirmed,
    custody: Math.max(0, collected - confirmed),
  }
}

export interface SerializedSettlement {
  id: string
  settlementNumber: string
  distributorId: string
  amount: number
  paymentMethod: string
  status: string
  notes: string | null
  submittedAt: Date
  confirmedAt: Date | null
  confirmedBy: string | null
  rejectionReason: string | null
  createdAt: Date
  updatedAt: Date
  distributor?: { id: string; name: string } | null
  confirmedByUser?: { id: string; name: string } | null
}

/**
 * Converts a Prisma settlement record (with optional relations) into a plain
 * JSON-serializable object with numeric amounts.
 */
export function serializeSettlement(settlement: any): SerializedSettlement {
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
    distributor: settlement.distributor
      ? { id: settlement.distributor.id, name: settlement.distributor.name }
      : null,
    confirmedByUser: settlement.confirmedByUser
      ? { id: settlement.confirmedByUser.id, name: settlement.confirmedByUser.name }
      : null,
  }
}

/**
 * Aggregated custody across every distributor in the system.
 */
export async function getTotalDistributorCustody(
  client: SettlementDbClient,
): Promise<TotalDistributorCustody> {
  const [collectedGroups, confirmedGroups] = await Promise.all([
    client.payment.groupBy({
      by: ['createdById'],
      _sum: { amount: true },
      where: {
        createdBy: { role: { name: 'DISTRIBUTOR' } },
        invoice: { status: { not: 'CANCELLED' } },
      },
    }),
    client.settlement.groupBy({
      by: ['distributorId'],
      _sum: { amount: true },
      where: { status: 'CONFIRMED' },
    }),
  ])

  const collectedBy = new Map<string, number>(
    collectedGroups.map((g) => [g.createdById, g._sum.amount?.toNumber() ?? 0]),
  )
  const confirmedBy = new Map<string, number>(
    confirmedGroups.map((g) => [g.distributorId, g._sum.amount?.toNumber() ?? 0]),
  )

  const distributorIds = new Set<string>([...collectedBy.keys(), ...confirmedBy.keys()])

  let custody = 0
  let distributorsWithCustody = 0

  for (const id of distributorIds) {
    const balance = (collectedBy.get(id) ?? 0) - (confirmedBy.get(id) ?? 0)
    if (balance > 0) {
      custody += balance
      distributorsWithCustody++
    }
  }

  return { custody, distributorsWithCustody }
}
