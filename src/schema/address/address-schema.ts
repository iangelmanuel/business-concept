import { z } from 'zod'

export const AddressSchema = z.object({
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

export const AddressFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  typeOfIdentification: z.enum(['C.C', 'T.E', 'Pasaporte']),
  identification: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  postalCode: z.string(),
  department: z.string(),
  city: z.string(),
  phone: z.string(),
  extraData: z.string().optional()
})

export const LocationSchema = z.object({
  id: z.string(),
  department: z.string(),
  cities: z.array(z.string())
})

export const LocationsSchema = z.array(LocationSchema)
