"use server"

import { prisma } from "@/lib"
import type { UserType } from "@/types"

export async function getUserById(id: UserType["id"]) {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) return null

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    return userWithoutPassword
  } catch (error) {
    return null
  }
}
