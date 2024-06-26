'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib'

export async function getUserAddress() {
  try {
    const user = await auth()
    if (!user) {
      return []
    }

    const address = await prisma.userAddress.findMany({
      where: {
        userId: user.user.id
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
