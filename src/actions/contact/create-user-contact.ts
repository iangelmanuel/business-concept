"use server"

import { auth } from "@/auth.config"
import { prisma } from "@/lib"
import { CreateContactSchema } from "@/schema"
import type { ContactFormType } from "@/types"

export async function createUserContact(data: ContactFormType) {
  try {
    const session = await auth()
    const userId = session?.user?.id ?? null

    const result = CreateContactSchema.safeParse(data)
    if (!result.success) {
      return {
        ok: false,
        message: "Error en los datos"
      }
    }

    const { message, ...restOfData } = result.data
    await prisma.$transaction(async (tx) => {
      const contactCreated = await tx.contact.create({
        data: {
          ...restOfData
        }
      })

      await tx.contactMessage.create({
        data: {
          message,
          userId,
          contactId: contactCreated.id
        }
      })
    })

    return {
      ok: true,
      message: "Tu contacto ha sido enviado correctamente"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error al crear el contacto"
    }
  }
}
