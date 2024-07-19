'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import type { ProductAllType } from '@/types'

export async function archiveProductById(id: ProductAllType['id']) {
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

    await prisma.product.update({
      where: {
        id
      },
      data: {
        isProductDeleted: true
      }
    })

    revalidatePath('/admin/products')
    revalidatePath('/admin/products-archived')
    revalidatePath('/')
    revalidatePath('/shop/products')
    revalidatePath('/shop/products/[category]', 'page')
    revalidatePath('/shop/product/[slug]', 'page')
    revalidatePath('/shop/cart')
    revalidatePath('/shop/checkout')

    return {
      ok: true,
      message: 'Producto eliminado correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al eliminar el producto'
    }
  }
}
