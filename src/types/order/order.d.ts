import type {
  OrderCreateSchema,
  OrderSchema,
  ProductToOrderSchema
} from '@/schema'
import type { z } from 'zod'

export type Order = z.infer<typeof OrderSchema>

export type OrderCreate = z.infer<typeof OrderCreateSchema>

type ProductToOrderType = z.infer<typeof ProductToOrderSchema>
