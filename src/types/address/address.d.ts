import type {
  AddressFormSchema,
  LocationSchema,
  OrderGridSchema,
  UserAddressSchema
} from '@/schema'
import type { z } from 'zod'

export type AddressType = z.infer<typeof UserAddressSchema>
export type AddressForm = z.infer<typeof AddressFormSchema>

export type LocationType = z.infer<typeof LocationSchema>

export type OrderGridType = z.infer<typeof OrderGridSchema>
