import type { CartSchema } from '@/schema'
import type { z } from 'zod'

export type Cart = z.infer<typeof CartSchema>
