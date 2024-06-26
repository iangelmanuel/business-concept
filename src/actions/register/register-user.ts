'use server'

import { prisma } from '@/lib'
import { registerUserSchema } from '@/schema'
import type { RegisterUser } from '@/types'
import bcrypt from 'bcrypt'

export async function registerUser(data: RegisterUser) {
  try {
    const response = registerUserSchema.safeParse(data)
    if (!response.success) {
      return {
        ok: false,
        message: 'Ocurrio un error al validar los datos'
      }
    }

    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (user) {
      return {
        ok: false,
        message: 'El correo ya se encuentra registrado'
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword: _, password, ...userData } = response.data
    const hashedPassword = bcrypt.hashSync(password, 10)
    await prisma.user.create({
      data: { ...userData, password: hashedPassword }
    })

    return {
      ok: true,
      message: 'Usuario registrado correctamente. Por favor inicie sesión'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Ocurrio un error al registrar el usuario'
    }
  }
}
