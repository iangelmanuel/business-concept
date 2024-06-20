import { z } from 'zod'

export const addressSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  typeOfIdentification: z.string(),
  identification: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  postalCode: z.string(),
  department: z.string(),
  city: z.string(),
  phone: z.string(),
  extraData: z.string().optional(),
  userId: z.number()
})

export const addressFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  typeOfIdentification: z.string(),
  identification: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  postalCode: z.string(),
  department: z.string(),
  city: z.string(),
  phone: z.string(),
  extraData: z.string().optional()
})

export const locationSchema = z.object({
  id: z.number(),
  department: z.string(),
  cities: z.array(z.string())
})

export const locationsSchema = z.array(locationSchema)
