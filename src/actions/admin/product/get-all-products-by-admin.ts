"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma-config"

export async function getAllProductsByAdmin() {
  try {
    const session = await auth()
    if (!session) return null

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) return null

    const products = await prisma.product.findMany({
      where: {
        isProductDeleted: false
      },
      include: {
        category: true,
        productImage: true
      }
    })

    return products
  } catch (error) {
    return null
  }
}
