import type {
  AddressFormSchema,
  AddressGeneralSchema,
  LocationSchema
} from '@/schema'
import type { z } from 'zod'

export type AddressType = z.infer<typeof AddressGeneralSchema>
export type AddressForm = z.infer<typeof AddressFormSchema>

export type LocationType = z.infer<typeof LocationSchema>
