'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import type { UserOrderByAdmin, UserOrderTracking } from '@/types'

export async function addOrUpdateOrderTrackingCode(
  orderId: UserOrderByAdmin['id'],
  data: UserOrderTracking
) {
  try {
    const session = await auth()
    if (!session) return { ok: false, message: 'No autorizado' }

    const isAdmin = session.user.role.includes('admin')
    if (!isAdmin) return { ok: false, message: 'No autorizado' }

    const isOrderTrackingExists = await prisma.orderTracking.findFirst({
      where: {
        orderId
      }
    })

    let orderTrackingExists: boolean

    if (isOrderTrackingExists) {
      await prisma.orderTracking.update({
        where: {
          orderId
        },
        data: {
          company: data.company,
          trackingCode: data.trackingCode
        }
      })
      orderTrackingExists = true
    } else {
      await prisma.order.update({
        where: {
          id: orderId
        },
        data: {
          orderStatus: 'shipped',
          OrderTracking: {
            create: {
              company: data.company,
              trackingCode: data.trackingCode
            }
          }
        }
      })
      orderTrackingExists = false
    }

    revalidatePath('/admin/orders')

    const orderTrackingNotification = orderTrackingExists
      ? 'actualizado'
      : 'agregado'

    return {
      ok: true,
      message: `Código de seguimiento ${orderTrackingNotification} correctamente`
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al agregar el código de seguimiento al pedido'
    }
  }
}
