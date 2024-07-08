import type {
  OrderGeneralSchema,
  OrderGridSchema,
  ProductToOrderSchema,
  UserOrderSchema,
  UserOrderTrackingSchema
} from '@/schema'
import type { z } from 'zod'

export type Order = z.infer<typeof OrderGeneralSchema>
export type UserOrder = z.infer<typeof UserOrderSchema>

export type ProductToOrderType = z.infer<typeof ProductToOrderSchema>

export type UserOrderTracking = z.infer<typeof UserOrderTrackingSchema>

export type OrderGridType = z.infer<typeof OrderGridSchema>

export type OrderStatusLang = {
  pending: 'Pendiente'
  processing: 'Procesando'
  approved: 'Aprobado'
  shipped: 'Enviado'
  delivered: 'Entregado'
  cancelled: 'Cancelado'
}
