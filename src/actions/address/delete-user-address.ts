'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'

export const deleteUserAddress = async (id: string) => {
  try {
    const session = await auth()
    if (!session) return { ok: false, message: 'No autorizado' }

    await prisma.userAddress.delete({
      where: {
        id
      }
    })

    revalidatePath('/shop/address')
    revalidatePath('/dashboard/addresses')
    revalidatePath('/admin/users/[id]')

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
