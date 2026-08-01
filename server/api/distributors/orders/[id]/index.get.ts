import type { Prisma } from '@prisma/client'

const orderInclude = {
  customer: { select: { id: true, name: true, phone: true, address: true } },
  items: {
    include: { product: { select: { id: true, name: true, sku: true } } },
  },
  invoices: {
    select: { id: true, invoiceNumber: true, status: true, totalAmount: true, paidAmount: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take: 1,
  },
} satisfies Prisma.SalesOrderInclude

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  await requirePermission(event, 'SALES', 'READ')

  const id = getRouterParam(event, 'id')
  const order = await prisma.salesOrder.findFirst({
    where: { id, assignedDistributorId: auth.userId, status: { not: 'PENDING' } },
    include: orderInclude,
  })

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  }

  return {
    order: {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      totalAmount: order.totalAmount.toNumber(),
      createdAt: order.createdAt,
      expectedDeliveryDate: order.expectedDeliveryDate,
      priority: order.priority,
      deliveryNotes: order.deliveryNotes,
      deliveryResult: order.deliveryResult,
      partialDeliveryReason: order.partialDeliveryReason,
      cancelReason: order.cancelReason,
      acceptedAt: order.acceptedAt,
      outForDeliveryAt: order.outForDeliveryAt,
      completedAt: order.completedAt,
      customer: order.customer,
      items: order.items.map((item: any) => ({
        product: item.product,
        quantity: item.quantity.toNumber(),
        unitPrice: item.unitPrice.toNumber(),
        totalPrice: item.totalPrice.toNumber(),
      })),
      invoice: order.invoices[0] || null,
    },
  }
})
