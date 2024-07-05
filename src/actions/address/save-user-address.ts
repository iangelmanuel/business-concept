'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import { AddressFormSchema } from '@/schema'
import type { AddressForm } from '@/types'
import { revalidatePath } from 'next/cache'

export async function saveUserAddress(addressFormData: AddressForm) {
  try {
    const session = await auth()
    if (!session) {
      return { ok: false, message: 'No estas autenticado' }
    }
    const userId = session.user.id

    const result = AddressFormSchema.safeParse(addressFormData)
    if (!result.success) {
      return { ok: false, message: 'Datos incorrectos' }
    }

    await prisma.userAddress.create({
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
        extraData: result.data.extraData,
        userId
      }
    })
    revalidatePath('/shop/address')
    revalidatePath('/dashboard/addresses')
    revalidatePath('/admin/users/[id]')

    return { ok: true, message: 'Dirección guardada correctamente' }
  } catch (error) {
    console.error(error)
    return { ok: false, message: 'Error al guardar la dirección' }
  }
}
