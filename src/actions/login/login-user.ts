'use server'

import { signIn } from '@/auth.config'
import { prisma } from '@/lib'
import { LoginUserSchema } from '@/schema'
import type { LoginUser } from '@/types'
import { AuthError } from 'next-auth'

export async function loginUser(data: LoginUser) {
  try {
    const response = LoginUserSchema.safeParse(data)
    if (!response.success) {
      return {
        ok: false,
        message: 'Ocurrio un error al validar los datos'
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        email: response.data.email
      },
      select: {
        isUserDeleted: true
      }
    })

    const isUserDeleted = user?.isUserDeleted
    if (isUserDeleted) {
      return {
        ok: false,
        message:
          'El usuario al que intentas acceder ha sido eliminado. Contacta con soporte para más información'
      }
    }

    const { ...emailAndPassword } = response.data
    await signIn('credentials', {
      redirect: false,
      ...emailAndPassword
    })

    return {
      ok: true,
      message: 'Usuario ingresado correctamente.'
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            ok: false,
            message: 'El correo o la contraseña son incorrectos'
          }
        default:
          return {
            ok: false,
            message: 'Ocurrio un error al iniciar sesión'
          }
      }
    }
    throw error
  }
}
