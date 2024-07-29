"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import type { ContactType } from "@/types"

export async function deleteUserContact(contactId: ContactType["id"]) {
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

    await prisma.$transaction(async (trx) => {
      await trx.contactMessage.deleteMany({
        where: {
          contactId
        }
      })

      await trx.contact.delete({
        where: {
          id: contactId
        }
      })
    })

    revalidatePath("/admin/contacts")
    revalidatePath("/admin/contacts/[id]", "page")

    return {
      ok: true,
      message: "Contacto eliminado correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al eliminar el contacto"
    }
  }
}
