import type { OrderStatusLang } from '@/types'

export const orderStatusLang: OrderStatusLang = {
  pending: 'Pendiente',
  processing: 'Procesando',
  approved: 'Aprobada',
  shipped: 'Enviada',
  delivered: 'Entregada',
  cancelled: 'Cancelada'
} as const
