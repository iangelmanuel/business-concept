'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib'

export const getOrdersByUser = async () => {
  const session = await auth()

  if (!session) {
    return []
  }

  const userId = session.user.id
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })

    return orders
  } catch (error) {
    console.log(error)
    return []
  }
}
