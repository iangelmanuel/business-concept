import { UserOrderSchema } from '../../order/order-schema'
import { UserDataSchema } from '../../user/user-schema'
import { z } from 'zod'

export const UserOrderByAdmin = z.object({
  ...UserOrderSchema.shape,
  user: UserDataSchema
})
