"use server"

import { prisma } from "@/lib"

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug,
        isProductDeleted: false
      },
      include: {
        category: true,
        productImage: true
      }
    })

    return {
      ok: true,
      product
    }
  } catch (error) {
    return { ok: false }
  }
}
