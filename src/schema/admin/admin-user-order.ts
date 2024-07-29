import { OrderGeneralSchema, UserOrderSchema } from "../order-schema"
import { UserGeneralSchema } from "../user-schema"
import { z } from "zod"

export const UserOrderByAdmin = z.object({
  ...UserOrderSchema.shape,
  OrderTracking: z
    .object({
      id: z.string(),
      company: z.string(),
      trackingCode: z.string()
    })
    .nullable(),
  user: UserGeneralSchema
})

export const AdminDashboardSchema = z.object({
  id: OrderGeneralSchema.shape.id,
  total: OrderGeneralSchema.shape.total,
  discount: OrderGeneralSchema.shape.discount,
  orderStatus: OrderGeneralSchema.shape.orderStatus,
  paidAt: OrderGeneralSchema.shape.paidAt,
  createdAt: OrderGeneralSchema.shape.createdAt,
  user: z.object({
    name: UserGeneralSchema.shape.name,
    lastname: UserGeneralSchema.shape.lastname,
    email: UserGeneralSchema.shape.email
  })
})
