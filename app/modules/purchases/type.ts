export interface PurchaseInvoice {
  id: string
  invoiceNumber: string
  supplierId: string
  warehouseId: string
  totalAmount: number
  paidAmount: number
  invoiceDate: string
  createdAt: string
  supplier?: { id: string; name: string; company?: string | null }
  warehouse?: { id: string; name: string }
  items?: PurchaseInvoiceItem[]
  weightTickets?: WeightTicket[]
  _count?: { weightTickets: number; items: number }
}

export interface PurchaseInvoiceItem {
  id: string
  purchaseInvoiceId: string
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  product?: { id: string; name: string; sku: string; type?: string }
}

export interface WeightTicket {
  id: string
  ticketNumber: string
  purchaseInvoiceId: string
  grossWeight: number
  tareWeight: number
  netWeight: number
  carNumber?: string | null
  createdAt: string
}

export interface CreatePurchasePayload {
  supplierId: string
  warehouseId: string
  invoiceDate?: string
  paidAmount?: number
  approveStock?: boolean
  items: { productId: string; quantity: number; unitPrice: number }[]
}

export interface CreateWeightTicketPayload {
  purchaseInvoiceId: string
  ticketNumber: string
  grossWeight: number
  tareWeight: number
  carNumber?: string
}

export interface PurchaseReportSummary {
  totalInvoices: number
  totalAmount: number
  totalPaid: number
  totalDue: number
  totalItems: number
}
