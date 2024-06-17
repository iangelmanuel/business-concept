import type { cartSchema } from '@/schema'
import type { z } from 'zod'

export type Cart = z.infer<typeof cartSchema>
