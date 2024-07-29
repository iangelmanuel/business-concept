"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import type { ContactType } from "@/types"

export async function getContactById(id: ContactType["id"]) {
  try {
    const session = await auth()
    if (!session) return null

    const isAdmin = session?.user?.role.includes("admin")
    if (!isAdmin) return null

    const contactData = await prisma.contact.findUnique({
      where: {
        id
      },
      include: {
        ContactMessage: true
      }
    })

    return contactData
  } catch (error) {
    return null
  }
}
