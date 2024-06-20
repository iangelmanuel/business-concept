import type { addressSchema, locationSchema } from '@/schema'
import type { z } from 'zod'

export type AddressType = z.infer<typeof addressSchema>
export type AddressForm = Pick<
  AddressType,
  | 'firstName'
  | 'lastName'
  | 'typeOfIdentification'
  | 'identification'
  | 'address'
  | 'address2'
  | 'postalCode'
  | 'department'
  | 'city'
  | 'phone'
  | 'extraData'
>

export type LocationType = z.infer<typeof locationSchema>
