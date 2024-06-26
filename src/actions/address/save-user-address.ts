'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import { addressFormSchema } from '@/schema'
import type { AddressForm } from '@/types'

export async function saveUserAddress(addressFormData: AddressForm) {
  try {
    const user = await auth()
    if (!user) {
      return { ok: false, message: 'No estas autenticado' }
    }

    const result = addressFormSchema.safeParse(addressFormData)
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
        userId: user.user.id
      }
    })
    return { ok: true }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}
