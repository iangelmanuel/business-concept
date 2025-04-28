"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import { ChangeUserPasswordSchema } from "@/schema"
import type { ChangeUserPassword } from "@/types"
import bcrypt from "bcryptjs"

export async function changeUserPassword(data: ChangeUserPassword) {
  try {
    const session = await auth()
    if (!session) {
      return { ok: false, message: "No autorizado" }
    }

    const userIdSession = session.user.id
    const user = await prisma.user.findUnique({
      where: {
        id: userIdSession
      },
      select: {
        password: true
      }
    })
    if (!user) {
      return { ok: false, message: "Usuario no encontrado" }
    }

    const result = ChangeUserPasswordSchema.safeParse(data)
    if (!result.success) {
      return { ok: false, message: "Datos inválidos" }
    }

    const { password, newPassword, confirmNewPassword } = result.data
    if (newPassword !== confirmNewPassword) {
      return { ok: false, message: "Las contraseñas no coinciden" }
    }

    const matchPassword = bcrypt.compareSync(password, user.password)
    if (!matchPassword) {
      return { ok: false, message: "La contraseña actual no coincide" }
    }

    const newUserPassword = bcrypt.hashSync(newPassword, 10)
    await prisma.user.update({
      where: {
        id: userIdSession
      },
      data: {
        password: newUserPassword
      }
    })

    return { ok: true, message: "Contraseña cambiada correctamente" }
  } catch (error) {
    return { ok: false, message: "Error al cambiar la contraseña" }
  }
}
