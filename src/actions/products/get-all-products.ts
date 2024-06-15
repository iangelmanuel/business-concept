'use server'

import { prisma } from '@/config'

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: {
      ProductImage: true
    }
  })
  return products
}
