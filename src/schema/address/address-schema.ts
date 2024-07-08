import { z } from 'zod'

export const UserAddressSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  typeOfIdentification: z.string(),
  identification: z.string(),
  address: z.string(),
  address2: z.string().nullable(),
  postalCode: z.string(),
  department: z.string(),
  city: z.string(),
  phone: z.string(),
  extraData: z.string().nullable(),
  userId: z.string()
})

export const OrderAddressSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  typeOfIdentification: z.string(),
  identification: z.string(),
  address: z.string(),
  address2: z.string().nullable(),
  postalCode: z.string(),
  department: z.string(),
  city: z.string(),
  phone: z.string(),
  extraData: z.string().nullable()
})

export const AddressFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  typeOfIdentification: z.string(),
  identification: z.string(),
  address: z.string(),
  address2: z.string().nullable(),
  postalCode: z.string(),
  department: z.string(),
  city: z.string(),
  phone: z.string(),
  extraData: z.string().nullable()
})

export const LocationSchema = z.object({
  id: z.string(),
  department: z.string(),
  cities: z.array(z.string())
})
export const LocationsSchema = z.array(LocationSchema)

export const OrderGridSchema = z.object({
  OrderAddress: z
    .object({
      firstName: z.string(),
      lastName: z.string()
    })
    .nullable(),
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
