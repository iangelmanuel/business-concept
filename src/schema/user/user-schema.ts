import { OrderSchema, UserAddressSchema } from '@/schema'
import { z } from 'zod'

export const UserSchema = z.object({
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
  orders: z.array(OrderSchema),
  addresses: z.array(UserAddressSchema)
})

export const RegisterUserSchema = z
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

export const LoginUserSchema = z.object({
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

export const UpdateUserSchema = z.object({
  name: z.string().min(3).max(50),
  lastname: z.string().min(3).max(50),
  email: z.string().email().trim()
})

export const ChangeUserPasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string()
})
