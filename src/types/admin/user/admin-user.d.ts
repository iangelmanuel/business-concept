import type { z } from 'zod'
import type { UpdateUserByAdmin } from '@/schema'

export type UpdateUserByAdminType = z.infer<typeof UpdateUserByAdmin>
