import sharp from 'sharp'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const imageBuffer = Buffer.from(body.image.split(',')[1], 'base64')

  const sizes = [16, 32, 48, 96, 144, 192]
  const favicons = await Promise.all(
    sizes.map(async (size) => {
      const resized = await sharp(imageBuffer)
        .resize(size, size)
        .png()
        .toBuffer()

      return {
        size,
        url: `data:image/png;base64,${resized.toString('base64')}`
      }
    })
  )

  return { favicons }
})
