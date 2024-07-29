"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib"

export const getOrdersByUser = async () => {
  try {
    const session = await auth()

    if (!session) {
      return []
    }

    const userId = session.user.id
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
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return orders
  } catch (error) {
    return []
  }
}
