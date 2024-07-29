"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib"

export async function getSpecificsOrderDatas() {
  try {
    const session = await auth()
    if (!session) return null

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) return null

    const data = await prisma.order.findMany({
      select: {
        id: true,
        total: true,
        discount: true,
        orderStatus: true,
        paidAt: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            lastname: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return data
  } catch (error) {
    return null
  }
}

export async function getSpecificsUserDatas() {
  try {
    const session = await auth()
    if (!session) return null

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) return null

    const data = await prisma.user.findMany({
      where: {
        isUserDeleted: false
      },
      select: {
        id: true
      }
    })

    return data
  } catch (error) {
    return null
  }
}
