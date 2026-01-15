"use server"

import type { Category } from "@prisma/client"
import { prisma } from "@/lib/prisma-config"

export async function getProductByCategory(category: Category["name"]) {
  try {
    const product = await prisma.product.findMany({
      where: {
        category: {
          name: category
        },
        isProductDeleted: false
      },
      include: {
        productImage: true,
        category: true
      }
    })
    return product
  } catch (error) {
    return []
  }
}
