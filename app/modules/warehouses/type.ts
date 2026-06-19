export interface Warehouse {
  id: string
  name: string
  location?: string | null
  createdAt: string
  updatedAt: string
  _count?: { stocks: number; movements: number }
}

export interface StockItem {
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

export interface CreateWarehousePayload {
  name: string
  location?: string
}

export interface UpdateWarehousePayload {
  name?: string
  location?: string | null
}

export interface WarehousesListResponse {
  warehouses: Warehouse[]
  total: number
}

export interface WarehouseResponse {
  warehouse: Warehouse & { stocks: StockItem[] }
}
