import cloudinary from '../config/cloudinary.js'

export const uploadImageToCloudinary = async (file, folder) => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary credentials are not configured')
  }

  const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'image',
  })

  return result.secure_url
}
