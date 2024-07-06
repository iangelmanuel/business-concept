'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import type { UserOrderByAdmin } from '@/types'

export async function deleteOrderById(orderId: UserOrderByAdmin['id']) {
  try {
    const session = await auth()
    if (!session) return { ok: false, message: 'No autorizado' }

    const isAdmin = session.user.role.includes('admin')
    if (!isAdmin) return { ok: false, message: 'No autorizado' }

    await prisma.orderItem.deleteMany({
      where: {
        orderId
      }
    })

    await prisma.orderAddress.delete({
      where: {
        orderId
      }
    })

    await prisma.order.delete({
      where: {
        id: orderId
      }
    })

    revalidatePath('/admin/orders')

    return {
      ok: true,
      message: 'Orden eliminada correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al eliminar la orden'
    }
  }
}
