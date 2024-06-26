import { productImage } from '@/schema'
import { z } from 'zod'

export const cartSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  discount: z.number().optional(),
  stock: z.number(),
  quantity: z.number(),
  image: z.array(productImage)
})
