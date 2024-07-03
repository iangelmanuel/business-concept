import { z } from 'zod'

export const UpdateUserByAdmin = z.object({
  name: z.string().min(3).max(50),
  lastname: z.string().min(3).max(50),
  email: z.string().email().trim(),
  phone: z.string(),
  role: z.enum(['user', 'admin']),
  isConfirmed: z.boolean(),
  isUserDeleted: z.boolean()
})
