'use server'

import { prisma } from '@/lib'

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0
      }
    },
    include: {
      productImage: true,
      category: true
    }
  })
  return products
}
