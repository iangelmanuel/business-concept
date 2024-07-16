import { ProductImage } from '../products/products-schema'
import { z } from 'zod'

export const CartGeneralSchema = z.object({
  id: z.string(),
  slug: z.string().min(3).max(50),
  name: z.string().min(3).max(50),
  price: z.number().min(0),
  discount: z.number(),
  stock: z.number(),
  quantity: z.number(),
  image: z.array(ProductImage)
})
