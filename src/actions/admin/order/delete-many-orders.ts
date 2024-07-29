"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import type { UserOrderByAdmin } from "@/types"

export async function deleteManyOrders(ids: UserOrderByAdmin["id"][]) {
  try {
    const session = await auth()
    if (!session) return { ok: false, message: "No autorizado" }

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) return { ok: false, message: "No autorizado" }

    await prisma.orderItem.deleteMany({
      where: {
        orderId: {
          in: ids
        }
      }
    })

    await prisma.orderAddress.deleteMany({
      where: {
        orderId: {
          in: ids
        }
      }
    })

    await prisma.orderTracking.deleteMany({
      where: {
        orderId: {
          in: ids
        }
      }
    })

    await prisma.order.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    revalidatePath("/admin/orders")
    revalidatePath("/admin/orders/[id]", "page")
    revalidatePath("/dashboard/purchases")
    revalidatePath("/dashboard/purchases/[id]", "page")

    return {
      ok: true,
      message: "Ordenes eliminadas correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al eliminar las ordenes"
    }
  }
}
