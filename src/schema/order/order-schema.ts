import {
  AddressGeneralSchema,
  OrderAddressSchema
} from '../address/address-schema'
import { ProductGeneralSchema, ProductImage } from '../products/products-schema'
import { z } from 'zod'

export const OrderGeneralSchema = z.object({
  id: z.string(),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  itemsInOrder: z.number(),
  orderStatus: z.enum([
    'pending',
    'processing',
    'approved',
    'shipped',
    'delivered',
    'cancelled'
  ]),
  paidAt: z.date().nullable(),
  transactionId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string()
})

export const OrderTrackingGeneralSchema = z.object({
  id: z.string(),
  company: z.string(),
  trackingCode: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  orderId: z.string()
})

// Define a schema for ProductToOrder
export const ProductToOrderSchema = z.object({
  productId: z.string(),
  quantity: z.number()
})
export const ProductsToOrderSchema = z.array(ProductToOrderSchema)

export const UserOrderSchema = z.object({
  ...OrderGeneralSchema.shape,
  OrderAddress: OrderAddressSchema.nullable(),
  OrderItem: z.array(
    z.object({
      id: z.string(),
      price: z.number(),
      quantity: ProductToOrderSchema.shape.quantity,

      product: z.object({
        name: ProductGeneralSchema.shape.name,
        slug: ProductGeneralSchema.shape.slug,
        productImage: z.array(
          z.object({
            url: ProductImage.shape.url
          })
        )
      })
    })
  ),
  OrderTracking: z
    .object({
      id: OrderTrackingGeneralSchema.shape.id,
      company: OrderTrackingGeneralSchema.shape.company,
      trackingCode: OrderTrackingGeneralSchema.shape.trackingCode
    })
    .nullable()
})

export const OrderGridSchema = z.object({
  OrderAddress: z
    .object({
      firstName: AddressGeneralSchema.shape.firstName,
      lastName: AddressGeneralSchema.shape.lastName
    })
    .nullable(),
  id: OrderGeneralSchema.shape.id,
  subtotal: OrderGeneralSchema.shape.subtotal,
  tax: OrderGeneralSchema.shape.tax,
  total: OrderGeneralSchema.shape.total,
  itemsInOrder: OrderGeneralSchema.shape.itemsInOrder,
  orderStatus: OrderGeneralSchema.shape.orderStatus,
  paidAt: OrderGeneralSchema.shape.paidAt,
  transactionId: OrderGeneralSchema.shape.transactionId,
  createdAt: OrderGeneralSchema.shape.createdAt,
  updatedAt: OrderGeneralSchema.shape.updatedAt,
  userId: OrderGeneralSchema.shape.userId
})

export const ChangeOrderStatusSchema = z.object({
  orderId: OrderGeneralSchema.shape.id,
  orderStatus: OrderGeneralSchema.shape.orderStatus
})

export const DeleteOrderTracking = z.object({
  orderId: OrderGeneralSchema.shape.id,
  orderTrackingId: OrderTrackingGeneralSchema.shape.id
})
