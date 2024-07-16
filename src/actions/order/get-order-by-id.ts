'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib'

export const getOrderById = async (id: string) => {
  try {
    const session = await auth()
    const userRoleSession = session?.user.role
    const userIdSession = session?.user.id

    if (!session) return null

    const order = await prisma.order.findUnique({
      where: {
        id
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            id: true,
            price: true,
            discount: true,
            quantity: true,

            product: {
              select: {
                name: true,
                slug: true,
                productImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        },
        OrderTracking: {
          select: {
            id: true,
            company: true,
            trackingCode: true
          }
        }
      }
    })

    if (userRoleSession === 'user') {
      if (userIdSession !== order?.userId) return null
    }

    return order
  } catch (error) {
    return null
  }
}
