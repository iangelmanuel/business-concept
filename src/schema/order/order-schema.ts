import { OrderAddressSchema } from '../address/address-schema'
import { z } from 'zod'

export const OrderSchema = z.object({
  id: z.string(),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  itemsInOrder: z.number(),
  isPaid: z.boolean(),
  paidAt: z.date().nullable(),
  transactionId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string()
})

// Define a schema for ProductToOrder

export const ProductToOrderSchema = z.object({
  productId: z.string(),
  quantity: z.number()
})
export const ProductsToOrderSchema = z.array(ProductToOrderSchema)

// Define a schema for OrderItem

const ProductImage = z.object({
  url: z.string()
})

export const OrderItemSchema = z.object({
  price: z.number(),
  quantity: z.number(),
  product: z.object({
    name: z.string(),
    slug: z.string(),
    productImage: z.array(ProductImage)
  })
})

export const UserOrderSchema = z.object({
  id: z.string(),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  itemsInOrder: z.number(),
  isPaid: z.boolean(),
  paidAt: z.date().nullable(),
  transactionId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  OrderAddress: OrderAddressSchema.nullable(),
  OrderItem: z.array(OrderItemSchema)
})
