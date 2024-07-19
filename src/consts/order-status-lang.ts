import type { OrderStatusLang } from '@/types'

export const orderStatusLang: OrderStatusLang = {
  pending: 'Pendiente',
  processing: 'Procesando',
  approved: 'Aprobado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado'
} as const
