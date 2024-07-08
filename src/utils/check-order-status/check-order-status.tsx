import type { Order } from '@prisma/client'
import type { UserOrder } from '@/types'

export function checkOrderStatusCn(
  orderStatus: UserOrder['orderStatus'] | Order
) {
  switch (orderStatus) {
    case 'pending':
      return 'pending'

    case 'processing':
      return 'pending'

    case 'cancelled':
      return 'destructive'

    case 'approved':
      return 'success'

    case 'shipped':
      return 'destructive'

    case 'delivered':
      return 'success'

    default:
      return 'pending'
  }
}
