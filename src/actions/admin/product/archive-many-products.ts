"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma-config"
import type { ProductAllType } from "@/types"

export async function archiveManyProducts(id: ProductAllType["id"][]) {
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

    await prisma.product.updateMany({
      where: {
        id: {
          in: id
        }
      },
      data: {
        isProductDeleted: true
      }
    })

    revalidatePath("/admin/products")
    revalidatePath("/admin/products-archived")
    revalidatePath("/")
    revalidatePath("/shop/products")
    revalidatePath("/shop/products/[category]", "page")
    revalidatePath("/shop/product/[slug]", "page")
    revalidatePath("/shop/cart")
    revalidatePath("/shop/checkout")

    return {
      ok: true,
      message: "Productos eliminados correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al eliminar los productos"
    }
  }
}
