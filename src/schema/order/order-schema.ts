import { z } from 'zod'

export const OrderSchema = z.object({
  id: z.string(),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  itemsInOrder: z.number(),
  isPaid: z.boolean(),
  paidAt: z.date(),
  transactionId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string()
})

export const ProductToOrderSchema = z.object({
  productId: z.string(),
  quantity: z.number()
})
export const ProductsToOrderSchema = z.array(ProductToOrderSchema)
