import { CategoryGenralSchema } from '../category/category-schema'
import { z } from 'zod'

export const ProductGeneralSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50),
  description: z.string().min(5).max(500),
  price: z.number().min(0),
  discount: z.number().min(0).max(1),
  stock: z.number(),
  slug: z.string().min(3).max(50),
  createdAt: z.date(),
  updatedAt: z.date()
})

// Product Image Schema
export const ProductImage = z.object({
  id: z.string(),
  url: z.string().startsWith('http'),
  publicId: z.string().nullable(),
  productId: ProductGeneralSchema.shape.id
})

// Product Schema with All Properties
export const ProductsSchema = z
  .object({
    category: CategoryGenralSchema,
    productImage: z.array(ProductImage)
  })
  .extend(ProductGeneralSchema.shape)
