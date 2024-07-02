'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import type { EpaycoResponse, UserOrder } from '@/types'
import { revalidatePath } from 'next/cache'

export async function saveRefEpayco(
  refPayco: string,
  orderId: UserOrder['id']
) {
  try {
    const session = auth()
    if (!session) return { ok: false }
    if (!refPayco) return { ok: false }

    const isOrderExists = await prisma.order.findUnique({
      where: {
        id: orderId
      }
    })
    if (!isOrderExists) return { ok: false }

    const isOrderPaid = await checkIfOrderSuccess(refPayco)
    await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        transactionId: refPayco,
        isPaid: isOrderPaid,
        paidAt: new Date()
      }
    })

    revalidatePath('/shop/payment')
    revalidatePath('/dashboard/purchases/order')
    revalidatePath('/dashboard/purchases/order/[id]')

    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}

async function checkIfOrderSuccess(refPayco: string) {
  const url = `https://secure.epayco.co/validation/v1/reference/${refPayco}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.EPAYCO_PUBLIC_KEY}`
    },
    cache: 'force-cache'
  })
  const data = (await response.json()) as EpaycoResponse

  const isStatusOk =
    data.data.x_response === 'Aceptada' &&
    data.data.x_response_reason_text === 'Aprobada'

  return isStatusOk
}
