"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib"

export async function getUserContacts() {
  try {
    const session = await auth()
    if (!session) return null

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) return null

    const userContacts = await prisma.contact.findMany({
      include: {
        ContactMessage: {
          include: {
            user: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return userContacts
  } catch (error) {
    return null
  }
}
