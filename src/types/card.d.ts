import type { CartGeneralSchema } from '@/schema'
import type { z } from 'zod'

export type CartType = z.infer<typeof CartGeneralSchema>
