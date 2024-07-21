import type { AdminDashboardSchema, UserOrderByAdmin } from '@/schema'
import type { z } from 'zod'

export type UserOrderByAdmin = z.infer<typeof UserOrderByAdmin>
export type AdminDashboard = z.infer<typeof AdminDashboardSchema>
