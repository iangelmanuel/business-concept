import type { ProductType } from '@/types'

export type ProductImageType = Omit<ProductType, 'category'>
