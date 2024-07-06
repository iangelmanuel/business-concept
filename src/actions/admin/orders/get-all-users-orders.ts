'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib'

export async function getAllUsersOrders() {
  try {
    const session = await auth()
    if (!session) return []

    const isAdmin = session.user?.role.includes('admin')
    if (!isAdmin) return []

    const usersOrders = await prisma.order.findMany({
      include: {
        OrderAddress: true,
        user: true,
        OrderItem: {
          include: {
            product: {
              include: {
                productImage: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return usersOrders
  } catch (error) {
    return []
  }
}
