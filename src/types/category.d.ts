import type { CategoryGenralSchema } from '@/schema'
import type { z } from 'zod'

export type CategoryType = z.infer<typeof CategoryGenralSchema>
