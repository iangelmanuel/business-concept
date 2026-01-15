"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma-config"

export async function getUserAddress() {
  try {
    const session = await auth()
    if (!session) {
      return []
    }

    const userId = session.user.id
    const address = await prisma.userAddress.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        typeOfIdentification: true,
        identification: true,
        address: true,
        address2: true,
        postalCode: true,
        department: true,
        city: true,
        phone: true,
        extraData: true,
        userId: true
      }
    })
    return address
  } catch (error) {
    return []
  }
}
