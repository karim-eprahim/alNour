export type MovementType = 'PURCHASE' | 'PRODUCTION_CONSUME' | 'PRODUCTION_OUTPUT' | 'SALE' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'ADJUSTMENT'

export interface StockEntry {
  id: string
  warehouseId: string
  productId: string
  quantity: number
  updatedAt: string
  product: {
    id: string
    name: string
    nameAr: string
    sku: string
    type: string
    image?: string | null
  }
  warehouse: {
    id: string
    name: string
    location?: string | null
  }
}

export interface StockMovement {
  id: string
  productId: string
  warehouseId: string
  type: MovementType
  quantity: number
  referenceId?: string | null
  createdById: string
  createdAt: string
  product?: { id: string; name: string; sku: string }
  warehouse?: { id: string; name: string }
  createdBy?: { id: string; name: string }
}

export interface CreateMovementPayload {
  productId: string
  warehouseId: string
  type: MovementType
  quantity: number
  referenceId?: string
}

export interface StockTransfer {
  id: string
  transferNumber: string
  fromWarehouseId: string
  toWarehouseId: string
  status: string
  createdById: string
  createdAt: string
  updatedAt: string
  fromWarehouse: { id: string; name: string }
  toWarehouse: { id: string; name: string }
  items: StockTransferItem[]
}

export interface StockTransferItem {
  id: string
  stockTransferId: string
  productId: string
  quantity: number
  product: { id: string; name: string; sku: string }
}

export const MOVEMENT_TYPES: { value: MovementType; label: string; isIncrease: boolean }[] = [
  { value: 'PURCHASE', label: 'Purchase', isIncrease: true },
  { value: 'PRODUCTION_OUTPUT', label: 'Production Output', isIncrease: true },
  { value: 'TRANSFER_IN', label: 'Transfer In', isIncrease: true },
  { value: 'SALE', label: 'Sale', isIncrease: false },
  { value: 'PRODUCTION_CONSUME', label: 'Production Consume', isIncrease: false },
  { value: 'TRANSFER_OUT', label: 'Transfer Out', isIncrease: false },
  { value: 'ADJUSTMENT', label: 'Adjustment', isIncrease: false },
]
