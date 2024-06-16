import type { ProductType } from '@/types'

export type ProductCategoryType = Omit<ProductType, 'productImage'>
