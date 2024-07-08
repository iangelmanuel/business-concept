import { CategoryGenralSchema } from '../category/category-schema'
import { z } from 'zod'

export const ProductGeneralSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

// Product Image Schema
export const ProductImage = z.object({
  id: z.string(),
  url: z.string().startsWith('http'),
  productId: ProductGeneralSchema.shape.id
})

// Product Schema with All Properties
export const ProductsSchema = z
  .object({
    category: CategoryGenralSchema,
    productImage: z.array(ProductImage)
  })
  .extend(ProductGeneralSchema.shape)
