'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth.config'
import { prisma } from '@/lib'
import type { UserType } from '@/types'

export async function deleteUserAccount(id: UserType['id']) {
  try {
    const session = await auth()
    if (!session) {
      return { ok: false, message: 'No autorizado' }
    }

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return { ok: false, message: 'Usuario no encontrado' }
    }

    if (session.user.id !== user.id) {
      return { ok: false, message: 'No autorizado' }
    }

    await prisma.user.update({
      where: { id },
      data: { isUserDeleted: true }
    })

    revalidatePath('/dashboard/profile')
    revalidatePath('/admin/users')
    revalidatePath('/admin/users/[id]')

    return {
      ok: true,
      message: 'Cuenta eliminada correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al eliminar la cuenta'
    }
  }
}
