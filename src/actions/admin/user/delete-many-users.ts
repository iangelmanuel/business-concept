"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import type { UserType } from "@/types"

export async function deleteManyUsers(ids: UserType["id"][]) {
  try {
    const session = await auth()
    if (!session) {
      return {
        ok: false,
        message: "No tienes permisos para realizar esta acción"
      }
    }

    const isAdmin = session.user.role.includes("admin")
    if (!isAdmin) {
      return {
        ok: false,
        message: "No tienes permisos para realizar esta acción"
      }
    }

    await prisma.user.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    revalidatePath("/admin/users")

    return {
      ok: true,
      message: "Usuarios eliminados correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al eliminar los usuarios"
    }
  }
}
