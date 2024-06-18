import { productImage } from '@/schema'
import { z } from 'zod'

export const cartSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  quantity: z.number(),
  image: z.array(productImage)
})
