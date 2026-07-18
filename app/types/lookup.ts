export interface LookupItem {
  value: string
  label: string
  subtitle?: string
  disabled?: boolean
}

export interface LookupResponse {
  items: LookupItem[]
  nextCursor: string | null
}

export interface LookupQuery {
  q?: string
  cursor?: string
  take?: number
  includeInactive?: boolean
  warehouseId?: string
  categoryId?: string
  [key: string]: any
}
