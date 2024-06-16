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
