import { z } from 'zod'

export const addressSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  postalCode: z.string(),
  city: z.string(),
  phone: z.string(),
  userId: z.number()
})
