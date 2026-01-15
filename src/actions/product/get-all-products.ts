"use server"

import { prisma } from "@/lib/prisma-config"

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    where: {
      stock: {
        gt: 0
      },
      isProductDeleted: false
    },
    include: {
      productImage: true,
      category: true
    }
  })
  return products
}
