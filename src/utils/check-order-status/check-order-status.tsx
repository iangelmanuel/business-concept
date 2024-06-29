import type { UserOrder } from '@/types'
import type { Order } from '@prisma/client'

export function checkOrderStatus(orderItem: UserOrder | Order) {
  if (orderItem.isPaid && orderItem.transactionId && orderItem.paidAt) {
    return 'success'
  }

  if (!orderItem.isPaid && !orderItem.transactionId) {
    return 'pending'
  }

  if (!orderItem.isPaid && orderItem.transactionId) {
    return 'destructive'
  }
}
