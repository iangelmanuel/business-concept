"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma-config"

export async function getAllUsers() {
  try {
    const session = await auth()
    if (!session) return []

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) return []

    const users = await prisma.user.findMany()

    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...rest } = user
      return rest
    })

    return usersWithoutPassword
  } catch (error) {
    return []
  }
}
