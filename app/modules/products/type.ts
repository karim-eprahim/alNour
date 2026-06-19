export type ProductType = 'RAW_CHARCOAL' | 'PACKAGED_CHARCOAL' | 'OTHER'

export interface ProductStock {
  id: string
  warehouseId: string
  productId: string
  quantity: number
  warehouse: { id: string; name: string; location?: string | null }
}

export interface Product {
  id: string
  name: string
  nameAr: string
  type: ProductType
  sku: string
  image?: string | null
  weight?: number | null
  purchaseCost?: number | null
  sellingPrice?: number | null
  createdAt: string
  updatedAt: string
  stocks?: ProductStock[]
  _count?: { movements: number }
}

export interface CreateProductPayload {
  name: string
  nameAr: string
  type: ProductType
  image?: string
  weight?: number
  purchaseCost?: number
  sellingPrice?: number
}

export interface UpdateProductPayload {
  name?: string
  nameAr?: string
  type?: ProductType
  image?: string | null
  weight?: number | null
  purchaseCost?: number | null
  sellingPrice?: number | null
}

export interface ProductsListResponse {
  products: Product[]
  total: number
}

export interface ProductResponse {
  product: Product
}

export const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: 'RAW_CHARCOAL', label: 'Raw Charcoal' },
  { value: 'PACKAGED_CHARCOAL', label: 'Packaged Charcoal' },
  { value: 'OTHER', label: 'Other' },
]
