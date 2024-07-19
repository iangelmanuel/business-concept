'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import type { ProductType } from '@/types'

export async function recoverProductDeleted(
  productId: ProductType['id'],
  stock: ProductType['stock']
) {
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
        id: productId
      },
      data: {
        isProductDeleted: false,
        stock
      }
    })

    revalidatePath('/admin/products')
    revalidatePath('/admin/products-archived')
    revalidatePath('/')
    revalidatePath('/shop/products')
    revalidatePath('/shop/products/[category]', 'page')
    revalidatePath('/shop/product/[slug]', 'page')

    return {
      ok: true,
      message: 'Producto recuperado correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al recuperar el producto'
    }
  }
}
