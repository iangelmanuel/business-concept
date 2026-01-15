"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma-config"
import { UpdateUserByAdmin } from "@/schema"
import type { UpdateUserByAdminType, UserType } from "@/types"

export async function updateUserById(
  id: UserType["id"],
  data: UpdateUserByAdminType
) {
  try {
    const session = await auth()
    if (!session) {
      return {
        ok: false,
        message: "No hay una sesión activa"
      }
    }

    const isAdmin = session.user.role === "admin"
    if (!isAdmin) {
      return {
        ok: false,
        message: "No tienes permisos para realizar esta acción"
      }
    }

    const result = UpdateUserByAdmin.safeParse(data)
    if (!result.success) {
      return {
        ok: false,
        message: "Datos incorrectos"
      }
    }

    await prisma.user.update({
      where: {
        id
      },
      data: {
        name: result.data.name,
        lastname: result.data.lastname,
        email: result.data.email,
        phone: result.data.phone,
        role: result.data.role,
        isConfirmed: result.data.isConfirmed,
        isUserDeleted: result.data.isUserDeleted
      }
    })

    revalidatePath("/admin/users")
    revalidatePath("/dashboard/profile")

    return {
      ok: true,
      message: "Usuario actualizado correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar el usuario"
    }
  }
}
