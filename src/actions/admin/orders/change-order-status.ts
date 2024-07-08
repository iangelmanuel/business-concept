'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import type { UserOrderByAdmin } from '@/types'
import { z } from 'zod'

export async function changeOrderStatus(
  id: UserOrderByAdmin['id'],
  orderStatus: UserOrderByAdmin['orderStatus']
) {
  try {
    const session = await auth()
    if (!session) return { ok: false, message: 'No autorizado' }

    const isAdmin = session.user.role.includes('admin')
    if (!isAdmin) return { ok: false, message: 'No autorizado' }

    // TODO: Arreglar este schema

    const result = z
      .object({
        id: z.string(),
        orderStatus: z.enum([
          'pending',
          'processing',
          'approved',
          'shipped',
          'delivered',
          'cancelled'
        ])
      })
      .safeParse({ id, orderStatus })
    if (!result.success) {
      return { ok: false, message: 'No se pudo cambiar el estado de la orden' }
    }

    const { data } = result

    await prisma.order.update({
      where: {
        id: data.id
      },
      data: {
        orderStatus: data.orderStatus
      }
    })

    revalidatePath('/admin/orders')

    return {
      ok: true,
      message: 'Estado de la orden cambiado correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo cambiar el estado de la orden'
    }
  }
}
