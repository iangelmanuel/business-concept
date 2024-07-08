'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import { AddressGeneralSchema } from '@/schema'
import type { AddressType } from '@/types'

export async function updateUserAddress(address: AddressType) {
  try {
    const session = await auth()
    if (!session) return { ok: false, message: 'No autorizado' }

    const userId = session.user.id
    if (userId !== address.userId) {
      return { ok: false, message: 'No autorizado' }
    }

    const result = AddressGeneralSchema.safeParse(address)
    if (!result.success) {
      return { ok: false, message: 'Datos incorrectos' }
    }

    const isAddressExist = await prisma.userAddress.findUnique({
      where: { id: address.id }
    })

    if (!isAddressExist) {
      return { ok: false, message: 'Dirección no encontrada' }
    }

    await prisma.userAddress.update({
      where: { id: address.id },
      data: {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        city: result.data.city,
        typeOfIdentification: result.data.typeOfIdentification,
        identification: result.data.identification,
        phone: result.data.phone,
        address: result.data.address,
        address2: result.data.address2,
        postalCode: result.data.postalCode,
        department: result.data.department,
        extraData: result.data.extraData
      }
    })

    revalidatePath('/shop/address')
    revalidatePath('/dashboard/addresses')
    revalidatePath('/admin/users/[id]')

    return {
      ok: true,
      message: 'Dirección actualizada'
    }
  } catch (error) {
    return { ok: false, message: 'Error al actualizar la dirección' }
  }
}
