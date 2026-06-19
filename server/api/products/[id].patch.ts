export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const existing = await prisma.product.findUnique({ where: { id } })
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  const data: any = {}
  if (body.name) data.name = body.name
  if (body.nameAr) data.nameAr = body.nameAr
  if (body.type) data.type = body.type
  if (body.image !== undefined) data.image = body.image
  if (body.weight !== undefined) data.weight = body.weight ? parseFloat(body.weight) : null
  if (body.purchaseCost !== undefined) data.purchaseCost = body.purchaseCost ? parseFloat(body.purchaseCost) : null
  if (body.sellingPrice !== undefined) data.sellingPrice = body.sellingPrice ? parseFloat(body.sellingPrice) : null

  const product = await prisma.product.update({
    where: { id },
    data,
    include: {
      stocks: { include: { warehouse: true } },
    },
  })

  return { product }
})
