import { writeFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ image: string; name?: string }>(event)

  if (!body.image) {
    throw createError({ statusCode: 400, statusMessage: 'Image data is required' })
  }

  const base64Data = body.image.replace(/^data:image\/\w+;base64,/, '')
  const ext = body.image.startsWith('data:image/png') ? '.png' : '.jpg'
  const filename = `${body.name || Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`

  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })
  await writeFile(join(uploadDir, filename), base64Data, 'base64')

  return { url: `/uploads/${filename}` }
})
