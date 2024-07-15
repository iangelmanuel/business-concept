'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import { AddProductsDiscount } from '@/schema'
import type { ProductAllType } from '@/types'

export async function addProductsDiscount(
  ids: ProductAllType['id'][],
  discount: ProductAllType['discount']
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

    const result = AddProductsDiscount.safeParse({ discount })
    if (!result.success) {
      return {
        ok: false,
        message: 'Datos incorrectos'
      }
    }

    await prisma.product.updateMany({
      where: {
        id: {
          in: ids
        }
      },
      data: {
        discount
      }
    })

    revalidatePath('/admin/products')
    revalidatePath('/shop/products')
    revalidatePath('/shop/cart')
    revalidatePath('/shop/checkout')
    revalidatePath('/')

    return {
      ok: true,
      message:
        'Descuento aplicado para todos los productos seleccionados correctamente'
    }
  } catch (error) {
    return {
      ok: true,
      message: 'Error al aplicar el descuento a los productos seleccionados'
    }
  }
}
