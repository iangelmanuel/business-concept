'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib'

export async function getProductDeleted() {
  try {
    const session = await auth()
    if (!session) {
      return null
    }

    const isAdmin = session.user.role.includes('admin')
    if (!isAdmin) {
      return null
    }

    const productsDeleted = await prisma.product.findMany({
      where: {
        isProductDeleted: true
      },
      include: {
        productImage: true
      }
    })

    return productsDeleted
  } catch (error) {
    return null
  }
}
