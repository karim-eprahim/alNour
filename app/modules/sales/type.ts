export interface SalesOrder {
  id: string
  orderNumber: string
  customerId: string
  warehouseId: string
  createdById: string
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
  customer?: { id: string; name: string }
  warehouse?: { id: string; name: string }
  createdBy?: { id: string; name: string }
  items?: SalesOrderItem[]
  invoices?: Invoice[]
  _count?: { items: number; invoices: number }
}

export interface SalesOrderItem {
  id: string
  salesOrderId: string
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  product?: { id: string; name: string; sku: string; image?: string }
}

export interface Invoice {
  id: string
  invoiceNumber: string
  salesOrderId: string
  customerId: string
  createdById: string
  totalAmount: number
  paidAmount: number
  status: 'UNPAID' | 'PARTIAL' | 'PAID' | 'CANCELLED'
  createdAt: string
  customer?: { id: string; name: string }
  salesOrder?: { id: string; orderNumber: string }
  createdBy?: { id: string; name: string }
  payments?: Payment[]
  _count?: { payments: number }
}

export interface Payment {
  id: string
  invoiceId: string
  createdById: string
  amount: number
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'CHECK'
  notes?: string | null
  createdAt: string
  createdBy?: { id: string; name: string }
}

export interface CreateSalesOrderPayload {
  customerId: string
  warehouseId: string
  paidAmount?: number
  paymentMethod?: string
  paymentNotes?: string
  items: { productId: string; quantity: number; unitPrice: number }[]
}

export interface CreatePaymentPayload {
  amount: number
  paymentMethod: string
  notes?: string
}
