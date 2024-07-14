'use server'

import { auth } from '@/auth.config'
// import { prisma } from '@/lib'
import type { ProductAllType } from '@/types'
import { v2 as cloudinary } from 'cloudinary'

interface ImageBase64 {
  name: string
  type: string
  base64: unknown
}

export async function createProductImage(
  imageBase64: ImageBase64[],
  id: ProductAllType['id']
) {
  console.log({ imageBase64, id })
  try {
    const session = await auth()
    if (!session) {
      return {
        ok: false,
        message: 'No autorizado'
      }
    }

    const isAdmin = session.user.role.includes('admin')
    if (!isAdmin) {
      return {
        ok: false,
        message: 'No autorizado'
      }
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    // TODO: Finish de image upload
    // image.forEach(async (file) => {
    //   const cloudinaryResponse = await cloudinary.uploader.upload(file.name, {
    //     folder: 'Busines Concept',
    //     use_filename: true,
    //     unique_filename: false,
    //     overwrite: false
    //   })

    //   await prisma.product.update({
    //     where: {
    //       id
    //     },
    //     data: {
    //       productImage: {
    //         create: {
    //           url: cloudinaryResponse.secure_url,
    //           publicId: cloudinaryResponse.public_id
    //         }
    //       }
    //     }
    //   })
    // })

    return {
      ok: true,
      message: 'Imagen del producto subida correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al subir la imagen del producto'
    }
  }
}
