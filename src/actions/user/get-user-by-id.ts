'use server'

import { prisma } from '@/lib'

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        lastname: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return {
      ok: true,
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener el usuario por id'
    }
  }
}
