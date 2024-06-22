'use server'

import { signIn } from '@/auth.config'
import { loginUserSchema } from '@/schema'
import type { LoginUser } from '@/types'
import { AuthError } from 'next-auth'

export async function loginUser(data: LoginUser) {
  const response = loginUserSchema.safeParse(data)
  if (!response) {
    return {
      ok: false,
      message: 'Ocurrio un error al validar los datos'
    }
  }
  try {
    const { ...emailAndPassword } = response.data
    await signIn('credentials', {
      redirect: false,
      ...emailAndPassword
    })
    return {
      ok: true,
      message: 'Usuario logueado correctamente. Bienvenido'
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
