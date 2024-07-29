"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import type { UserType } from "@/types"

export const getUserOrdersById = async (userId: UserType["id"]) => {
  try {
    const session = await auth()
    if (!session) return []

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) return []

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
    return []
  }
}
