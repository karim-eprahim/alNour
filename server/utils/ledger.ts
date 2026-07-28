import type { H3Event } from 'h3'
import type { Prisma } from '@prisma/client'

export interface LedgerOwner {
  field: 'customerId' | 'supplierId' | 'workerId' | 'distributorId'
  value: string
}

const OWNER_FIELDS = ['customerId', 'supplierId', 'workerId', 'distributorId'] as const

export function resolveLedgerOwner(body: Record<string, any>): LedgerOwner {
  const provided = OWNER_FIELDS.filter((f) => body[f])

  if (provided.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Exactly one owner is required: customerId, supplierId, workerId, or distributorId',
    })
  }

  if (provided.length > 1) {
    throw createError({
      statusCode: 400,
      statusMessage: `Only one owner allowed. Provided: ${provided.join(', ')}`,
    })
  }

  return { field: provided[0], value: body[provided[0]] }
}

export function assertExactlyOneOwner(body: Record<string, any>): void {
  resolveLedgerOwner(body)
}

export function getOwnerFilter(body: Record<string, any>): Record<string, string> {
  const { field, value } = resolveLedgerOwner(body)
  return { [field]: value }
}

export function buildLedgerWhere(query: Record<string, any>): Prisma.LedgerEntryWhereInput {
  const where: Prisma.LedgerEntryWhereInput = {}

  for (const field of OWNER_FIELDS) {
    if (query[field]) {
      where[field] = query[field]
    }
  }

  if (query.type) {
    where.type = query.type
  }

  if (query.search) {
    where.description = { contains: query.search as string, mode: 'insensitive' }
  }

  if (query.dateFrom || query.dateTo) {
    where.createdAt = {}
    if (query.dateFrom) {
      where.createdAt.gte = new Date(query.dateFrom as string)
    }
    if (query.dateTo) {
      where.createdAt.lte = new Date(query.dateTo as string)
    }
  }

  if (query.amountMin || query.amountMax) {
    where.amount = {}
    if (query.amountMin) {
      where.amount.gte = parseFloat(query.amountMin as string)
    }
    if (query.amountMax) {
      where.amount.lte = parseFloat(query.amountMax as string)
    }
  }

  return where
}

export function parsePagination(query: Record<string, any>): { page: number; limit: number; skip: number } {
  const page = parseInt(query.page as string) || 1
  const limit = Math.min(parseInt(query.limit as string) || 50, 200)
  const skip = (page - 1) * limit
  return { page, limit, skip }
}

export function parseSort(query: Record<string, any>, defaultField = 'createdAt', defaultDir: 'asc' | 'desc' = 'desc'): Prisma.LedgerEntryOrderByWithRelationInput {
  const field = (query.sortBy as string) || defaultField
  const dir = (query.sortDir as string) || defaultDir
  return { [field]: dir } as Prisma.LedgerEntryOrderByWithRelationInput
}

export function calculateBalance(entries: { type: string; amount: number | { toNumber(): number } }[]): number {
  return entries.reduce((sum, e) => {
    const amount = typeof e.amount === 'number' ? e.amount : e.amount.toNumber()
    return e.type === 'DEBIT' ? sum + amount : sum - amount
  }, 0)
}

export function getPaginationParams(event: H3Event) {
  const query = getQuery(event)
  return parsePagination(query)
}
