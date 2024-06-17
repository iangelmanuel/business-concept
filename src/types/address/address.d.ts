import type { addressSchema } from '@/schema'
import type { z } from 'zod'

export type AddressType = z.infer<typeof addressSchema>
