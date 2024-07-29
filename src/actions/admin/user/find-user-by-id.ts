"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import type { UserType } from "@/types"

export async function findUserById(id: UserType["id"]) {
  try {
    const session = await auth()
    if (!session) return null

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) return null

    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) return null

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = user

    return rest
  } catch (error) {
    return null
  }
}
