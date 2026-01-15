"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma-config"
import type { UserType } from "@/types"

export async function deleteUserById(id: UserType["id"]) {
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

    await prisma.user.delete({
      where: {
        id
      }
    })

    revalidatePath("/admin/users")

    return {
      ok: true,
      message: "Usuario eliminado correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al eliminar al usuario"
    }
  }
}
