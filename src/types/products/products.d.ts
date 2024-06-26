import type { ProductType, ProductType } from '@/types'
import type { ProductsSchema } from '@/schema'
import type { z } from 'zod'

export type ProductType = z.infer<typeof ProductsSchema>

export type ProductCategoryType = Omit<ProductType, 'productImage'>

export type ProductImageType = Omit<ProductType, 'category'>
