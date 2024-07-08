import { ProductImage } from '../products/products-schema'
import { z } from 'zod'

export const CartGeneralSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  discount: z.number().optional(),
  stock: z.number(),
  quantity: z.number(),
  image: z.array(ProductImage)
})
