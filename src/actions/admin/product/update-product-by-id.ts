"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import { ProductUpdateActionSchema } from "@/schema"
import type { ProductType } from "@/types"
import type { z } from "zod"

export async function updateProductById(
  id: ProductType["id"],
  product: z.infer<typeof ProductUpdateActionSchema>
) {
  try {
    const session = await auth()
    if (!session) {
      return {
        ok: false,
        message: "No autorizado"
      }
    }

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) {
      return {
        ok: false,
        message: "No autorizado"
      }
    }

    const result = ProductUpdateActionSchema.safeParse(product)
    if (!result.success) {
      return {
        ok: false,
        message: "Datos incorrectos"
      }
    }

    await prisma.product.update({
      where: {
        id
      },
      data: {
        ...product
      }
    })

    revalidatePath("/admin/products")
    revalidatePath("/")
    revalidatePath("/shop/products")
    revalidatePath("/shop/products/[category]", "page")
    revalidatePath("/shop/product/[slug]", "page")
    revalidatePath("/shop/cart")
    revalidatePath("/shop/checkout")

    return {
      ok: true,
      message: "Producto actualizado correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar el producto"
    }
  }
}
