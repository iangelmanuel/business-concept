"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma-config"
import { UpdateUserSchema } from "@/schema"
import type { UpdateUser } from "@/types"

export const updateUser = async (data: UpdateUser) => {
  try {
    const session = await auth()
    const user = session?.user
    if (!user) {
      return {
        ok: false,
        message: "No autorizado"
      }
    }

    const result = UpdateUserSchema.safeParse(data)
    if (!result.success) {
      return {
        ok: false,
        message: "Datos incorrectos"
      }
    }

    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        lastname: data.lastname,
        email: data.email
      }
    })

    revalidatePath("/admin/users")
    revalidatePath("/admin/users/[id]", "page")
    revalidatePath("/dashboard/profile")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = newUser
    return {
      ok: true,
      message: "Usuario actualizado correctamente",
      user: rest
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar el usuario"
    }
  }
}
