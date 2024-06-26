import type { CategorySchema } from '@/schema'
import type { z } from 'zod'

export type CategoryType = z.infer<typeof CategorySchema>
