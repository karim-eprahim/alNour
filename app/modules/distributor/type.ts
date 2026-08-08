export interface DistributorCustodyItem {
  id: string
  distributorId: string
  productId: string
  quantity: number
  updatedAt: string
  product: {
    id: string
    name: string
    nameAr: string
    sku: string
    sellingPrice: number
    image?: string | null
  }
}

export interface DistributorTrackingLocation {
  latitude: number
  longitude: number
  accuracy?: number | null
  speed?: number | null
  heading?: number | null
  recordedAt: string
}

export interface DistributorTrackingSession {
  id: string
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  startedAt: string
  endedAt?: string | null
  lastUpdatedAt?: string
  location?: DistributorTrackingLocation | null
}

export interface DistributorOrder {
  id: string
  orderNumber: string
  status: 'PENDING' | 'ASSIGNED' | 'ACCEPTED' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'CANCELLED'
  totalAmount: number
  createdAt: string
  expectedDeliveryDate?: string | null
  priority: 'NORMAL' | 'URGENT'
  deliveryNotes?: string | null
  deliveryResult: 'NONE' | 'FULL' | 'PARTIAL' | 'FAILED' | 'CANCELLED'
  partialDeliveryReason?: string | null
  cancelReason?: string | null
  acceptedAt?: string | null
  outForDeliveryAt?: string | null
  completedAt?: string | null
  customer: { id: string; name: string; phone?: string | null; address?: string | null; latitude?: number | null; longitude?: number | null }
  items: DistributorOrderItem[]
  invoice: {
    id: string
    invoiceNumber: string
    status: string
    totalAmount: number
    paidAmount: number
    createdAt: string
  } | null
  tracking?: DistributorTrackingSession | null
}

export interface DistributorOrderItem {
  id: string
  product: { id: string; name: string; sku: string }
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface DistributorInvoice {
  id: string
  invoiceNumber: string
  salesOrderId?: string | null
  customerId: string
  warehouseId: string
  createdById: string
  totalAmount: number
  paidAmount: number
  status: string
  saleSource: string
  createdAt: string
  customer?: { id: string; name: string }
  warehouse?: { id: string; name: string }
  items?: DistributorInvoiceItem[]
  payments?: DistributorPayment[]
}

export interface DistributorInvoiceItem {
  id: string
  invoiceId: string
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  product?: { id: string; name: string; sku: string }
}

export interface DistributorPayment {
  id: string
  invoiceId: string
  createdById: string
  amount: number
  paymentMethod: string
  notes?: string | null
  createdAt: string
}

export interface DistributorCashMovement {
  id: string
  distributorId: string
  amount: number
  type: 'PAYMENT_COLLECTED' | 'CASH_HANDOVER' | 'ADJUSTMENT'
  referenceId?: string | null
  notes?: string | null
  createdAt: string
}

export interface CreateDirectSalePayload {
  customerId: string
  warehouseId: string
  paidAmount?: number
  paymentMethod?: string
  paymentNotes?: string
  items: { productId: string; quantity: number; unitPrice: number }[]
}

export type DeliveryResult = 'FULL' | 'PARTIAL' | 'FAILED' | 'CANCELLED'

export interface ConfirmDeliveryPayload {
  result: DeliveryResult
  items?: { productId: string; quantity: number }[]
  partialDeliveryReason?: string
  cancelReason?: string
  paidAmount?: number
  paymentMethod?: string
  paymentNotes?: string
}
