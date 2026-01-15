"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma-config"

export async function getUserAddressById(id: string) {
  try {
    const session = await auth()
    if (!session) return null

    const isAdmin = session.user?.role.includes("admin")
    if (!isAdmin) return null

    const userAddress = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        addresses: true
      }
    })

    return userAddress
  } catch (error) {
    return null
  }
}
