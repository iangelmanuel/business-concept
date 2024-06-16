import { ProductsFullDbSchema } from '@/schema'
import { z } from 'zod'

export type ProductType = z.infer<typeof ProductsFullDbSchema>
