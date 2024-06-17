import type { ProductsSchema } from '@/schema'
import type { z } from 'zod'

export type ProductType = z.infer<typeof ProductsSchema>
