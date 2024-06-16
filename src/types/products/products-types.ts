import { ProductsFullDbSchema } from '@/schema'
import { z } from 'zod'

export type ProductWithImageAndCategory = z.infer<typeof ProductsFullDbSchema>
export type ProductWithImage = Omit<ProductWithImageAndCategory, 'category'>
export type ProductWithCategory = Omit<
  ProductWithImageAndCategory,
  'productImage'
>
