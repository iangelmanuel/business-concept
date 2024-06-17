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

export const userCreateSchema = z
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
