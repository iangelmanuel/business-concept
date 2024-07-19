import { z } from 'zod'

export const AddressGeneralSchema = z.object({
  id: z.string(),
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  typeOfIdentification: z.string(),
  identification: z.string(),
  address: z.string(),
  address2: z.string().nullable(),
  postalCode: z.string(),
  department: z.string(),
  city: z.string(),
  phone: z.string().max(15),
  extraData: z.string().nullable(),
  userId: z.string()
})

export const OrderAddressSchema = AddressGeneralSchema.omit({ userId: true })

export const AddressFormSchema = AddressGeneralSchema.omit({
  id: true,
  userId: true
})

export const LocationSchema = z.object({
  id: z.string(),
  department: z.string(),
  cities: z.array(z.string())
})
export const LocationsSchema = z.array(LocationSchema)
