import { addressSchema } from '@/schema'
import { z } from 'zod'

export type AddressType = z.infer<typeof addressSchema>
