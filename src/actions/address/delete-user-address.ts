'use server'

import { prisma } from '@/lib'
import { revalidatePath } from 'next/cache'

export const deleteUserAddress = async (id: string) => {
  try {
    await prisma.userAddress.delete({
      where: {
        id
      }
    })
    revalidatePath('/shop/address')
    return {
      ok: true,
      message: 'Dirección eliminada correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo eliminar la dirección'
    }
  }
}
