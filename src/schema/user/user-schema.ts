import { addressSchema } from '@/schema'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastname: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'user']),
  isConfirmed: z.boolean(),
  isUserDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  // TODO: Add the following fields
  orders: z.array(z.object({})),
  addresses: z.array(addressSchema)
})

export const registerUserSchema = z
  .object({
    email: z
      .string()
      .email()
      .trim()
      .transform((value) => value.toLowerCase()),
    name: z.string().min(3).max(50),
    lastname: z.string().min(3).max(50),
    password: z.string().min(8),
    repeatPassword: z.string(),
    phone: z.string().max(15)
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword']
  })

export const loginUserSchema = z.object({
  email: z.string().email().trim(),
  password: z.string()
})

export const authUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  lastname: z.string(),
  role: z.enum(['admin', 'user']),
  emailVerified: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const updateUserSchema = z.object({
  name: z.string().min(3).max(50),
  lastname: z.string().min(3).max(50),
  email: z.string().email().trim()
})

export const changeUserPasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string()
})
