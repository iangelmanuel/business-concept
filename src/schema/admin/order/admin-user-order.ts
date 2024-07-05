import { z } from 'zod'
import { UserOrderSchema } from '../../order/order-schema'
import { UserDataSchema } from '../../user/user-schema'

export const UserOrderByAdmin = z.object({
  ...UserOrderSchema.shape,
  user: UserDataSchema
})
