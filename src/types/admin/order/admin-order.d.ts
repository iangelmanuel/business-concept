import type { UserOrderByAdmin } from '@/schema'
import type { z } from 'zod'

export type UserOrderByAdmin = z.infer<typeof UserOrderByAdmin>
