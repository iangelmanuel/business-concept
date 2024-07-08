import type {
  OrderCreateSchema,
  OrderSchema,
  ProductToOrderSchema,
  UserOrderSchema,
  UserOrderTrackingSchema
} from '@/schema'
import type { z } from 'zod'

export type Order = z.infer<typeof OrderSchema>

export type OrderCreate = z.infer<typeof OrderCreateSchema>
export type ProductToOrderType = z.infer<typeof ProductToOrderSchema>

export type UserOrder = z.infer<typeof UserOrderSchema>

export type OrderStatusLang = {
  pending: 'Pendiente'
  processing: 'Procesando'
  approved: 'Aprobado'
  shipped: 'Enviado'
  delivered: 'Entregado'
  cancelled: 'Cancelado'
}

export type UserOrderTracking = z.infer<typeof UserOrderTrackingSchema>
