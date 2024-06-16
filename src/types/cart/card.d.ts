import { cartSchema } from '@/schema'
import { z } from 'zod'

export type Cart = z.infer<typeof cartSchema>
