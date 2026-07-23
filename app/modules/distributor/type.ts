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

export interface DistributorOrder {
  id: string
  orderNumber: string
  customerId: string
  warehouseId: string
  totalAmount: number
  status: string
  saleSource: string
  createdAt: string
  customer: { id: string; name: string; phone?: string; address?: string }
  warehouse: { id: string; name: string }
  createdBy: { id: string; name: string }
  items: DistributorOrderItem[]
  invoices?: { id: string; invoiceNumber: string; status: string; paidAmount: number; totalAmount: number }[]
}

export interface DistributorOrderItem {
  id: string
  salesOrderId: string
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  product?: { id: string; name: string; sku: string; sellingPrice?: number }
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

export interface CompleteDeliveryPayload {
  paidAmount?: number
  paymentMethod?: string
  paymentNotes?: string
}
