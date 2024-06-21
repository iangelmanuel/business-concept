'use server'

import { prisma } from '@/lib'
import type { Category } from '@prisma/client'

export async function getProductByCategory(category: Category['name']) {
  try {
    const product = await prisma.product.findMany({
      where: {
        category: {
          name: category
        }
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
