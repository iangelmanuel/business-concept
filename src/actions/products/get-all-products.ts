'use server'

import { prisma } from '@/lib'

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: {
      productImage: true,
      category: true
    }
  })
  return products
}
