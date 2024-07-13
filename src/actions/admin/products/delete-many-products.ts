'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import type { ProductAllType } from '@/types'

export async function deleteManyProducts(id: ProductAllType['id'][]) {
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

    await prisma.product.deleteMany({
      where: {
        id: {
          in: id
        }
      }
    })

    revalidatePath('/api/products')

    return {
      ok: true,
      message: 'Productos eliminados correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al eliminar los productos'
    }
  }
}
