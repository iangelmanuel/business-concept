import type { ProductGeneralSchema, ProductsSchema } from '@/schema'
import type { z } from 'zod'

export type ProductType = z.infer<typeof ProductGeneralSchema>

export type ProductAllType = z.infer<typeof ProductsSchema>
