'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import { DeleteOrderTracking } from '@/schema'

export async function deleteOrderTrackingById(
  orderId: string,
  orderTrackingId: string
) {
  try {
    const session = await auth()
    if (!session) return { ok: false, message: 'No autorizado' }

    const isAdmin = session.user.role.includes('admin')
    if (!isAdmin) return { ok: false, message: 'No autorizado' }

    const result = DeleteOrderTracking.safeParse({ orderId, orderTrackingId })
    if (!result.success) {
      return {
        ok: false,
        message: 'Datos incorrectos'
      }
    }

    const { data } = result

    await prisma.order.update({
      where: { id: data.orderId },
      data: {
        orderStatus: 'approved',
        OrderTracking: {
          delete: {
            id: data.orderTrackingId
          }
        }
      }
    })

    revalidatePath('/admin/orders')
    revalidatePath('/admin/orders/[id]', 'page')
    revalidatePath('/dashboard/purchases')
    revalidatePath('/dashboard/purchases/[id]', 'page')

    return {
      ok: true,
      message: 'Seguimiento de la orden eliminado correctamente.'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al eliminar el seguimiento de la orden.'
    }
  }
}
