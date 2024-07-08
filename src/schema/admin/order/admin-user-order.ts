import { UserOrderSchema } from '../../order/order-schema'
import { UserDataSchema } from '../../user/user-schema'
import { z } from 'zod'

export const UserOrderByAdmin = z.object({
  ...UserOrderSchema.shape,
  OrderTracking: z
    .object({
      id: z.string(),
      company: z.string(),
      trackingCode: z.string()
    })
    .nullable(),
  user: UserDataSchema
})
