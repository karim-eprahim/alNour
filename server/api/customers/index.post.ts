import { isValidLatitude, isValidLongitude } from '~~/server/utils/tracking'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'CUSTOMERS', 'CREATE')

  const body = await readBody(event)
  if (!body.name) {
    throw createError({ statusCode: 400, statusMessage: 'name is required' })
  }

  const data: any = { name: body.name, phone: body.phone || null, address: body.address || null }

  if (body.latitude !== undefined && body.latitude !== null && body.latitude !== '') {
    const latitude = Number(body.latitude)
    if (!isValidLatitude(latitude)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid latitude: must be between -90 and 90' })
    }
    data.latitude = latitude
  }
  if (body.longitude !== undefined && body.longitude !== null && body.longitude !== '') {
    const longitude = Number(body.longitude)
    if (!isValidLongitude(longitude)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid longitude: must be between -180 and 180' })
    }
    data.longitude = longitude
  }

  const customer = await prisma.customer.create({ data })

  if (body.linkedSupplierId) {
    const supplier = await prisma.supplier.findUnique({ where: { id: body.linkedSupplierId } })
    if (!supplier) throw createError({ statusCode: 404, statusMessage: 'Linked supplier not found' })
    await prisma.supplier.update({
      where: { id: body.linkedSupplierId },
      data: { linkedCustomerId: customer.id },
    }).catch(() => {
      throw createError({ statusCode: 400, statusMessage: 'Supplier already linked to another customer' })
    })
  }

  return { customer }
})