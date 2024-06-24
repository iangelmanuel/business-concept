import { addressSchema } from '@/schema'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  lastname: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'user']),
  avatar: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
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
    avatar: z.string().optional()
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword']
  })

export const loginUserSchema = z.object({
  email: z.string().email().trim(),
  password: z.string()
})

export const authUserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  lastname: z.string(),
  role: z.enum(['admin', 'user']),
  avatar: z.string().nullable(),
  emailVerified: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const updateUserSchema = z.object({
  name: z.string().min(3).max(50),
  lastname: z.string().min(3).max(50),
  email: z.string().email().trim(),
  avatar: z.string().optional()
})
