'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import type { ProductImage } from '@/types'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function deleteProductImage(imageId: ProductImage['id']) {
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

    const productImageDb = await prisma.productImage.findUnique({
      where: {
        id: imageId
      }
    })

    if (!productImageDb) {
      return {
        ok: false,
        message: 'La imagen no existe'
      }
    }

    if (productImageDb.publicId !== null) {
      const { publicId } = productImageDb
      await cloudinary.uploader.destroy(publicId)

      await prisma.productImage.delete({
        where: {
          id: productImageDb.id
        }
      })
    } else {
      await prisma.productImage.delete({
        where: {
          id: productImageDb.id
        }
      })
    }

    revalidatePath('/admin/products')
    revalidatePath('/')
    revalidatePath('/shop/products')
    revalidatePath('/shop/products/[category]', 'page')
    revalidatePath('/shop/product/[slug]', 'page')
    revalidatePath('/shop/cart')
    revalidatePath('/shop/checkout')

    return {
      ok: true,
      message: 'Imagen eliminada correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al eliminar la imagen del producto'
    }
  }
}
