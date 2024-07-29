"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import { ChangeOrderStatusSchema } from "@/schema"
import type { UserOrderByAdmin } from "@/types"

export async function changeOrderStatus(
  orderId: UserOrderByAdmin["id"],
  orderStatus: UserOrderByAdmin["orderStatus"]
) {
  try {
    const session = await auth()
    if (!session) return { ok: false, message: "No autorizado" }

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) return { ok: false, message: "No autorizado" }

    const result = ChangeOrderStatusSchema.safeParse({ orderId, orderStatus })
    if (!result.success) {
      return { ok: false, message: "No se pudo cambiar el estado de la orden" }
    }

    const { data } = result

    await prisma.order.update({
      where: {
        id: data.orderId
      },
      data: {
        orderStatus: data.orderStatus
      }
    })

    revalidatePath("/admin/orders")
    revalidatePath("/admin/orders/[id]", "page")
    revalidatePath("/dashboard/purchases")
    revalidatePath("/dashboard/purchases/[id]", "page")

    return {
      ok: true,
      message: "Estado de la orden cambiado correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo cambiar el estado de la orden"
    }
  }
}
